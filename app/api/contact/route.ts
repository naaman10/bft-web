import { NextResponse } from "next/server";
import {
  isValidServiceInterest,
  SERVICE_INTEREST_OPTIONS,
} from "@/lib/contact-form-options";
import { insertLead } from "@/lib/insert-lead";
import { getPgErrorInfo } from "@/lib/pg-error";
import { verifyTurnstileToken } from "@/lib/verify-turnstile";

type ContactBody = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  childAge: string;
  interestedIn: string;
};

/** Honeypot + Turnstile payload (stripped before validation). */
type IncomingContactJson = Partial<ContactBody> & {
  /** Must stay empty — bots often fill hidden “company” fields. */
  company?: string;
  turnstileToken?: string;
};

function trim(s: unknown): string {
  return typeof s === "string" ? s.trim() : "";
}

function validate(body: Partial<ContactBody>): ContactBody | null {
  const firstName = trim(body.firstName);
  const lastName = trim(body.lastName);
  const phone = trim(body.phone);
  const email = trim(body.email);
  const childAge = trim(body.childAge);
  const interestedIn = trim(body.interestedIn);

  if (
    !firstName ||
    !lastName ||
    !phone ||
    !email ||
    !childAge ||
    !isValidServiceInterest(interestedIn)
  ) {
    return null;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return null;
  }

  const ageNum = Number(childAge);
  if (!Number.isInteger(ageNum) || ageNum < 3 || ageNum > 18) {
    return null;
  }

  if (phone.replace(/\s/g, "").length < 8) {
    return null;
  }

  return {
    firstName,
    lastName,
    phone,
    email,
    childAge,
    interestedIn,
  };
}

function labelForInterest(value: string): string {
  const opt = SERVICE_INTEREST_OPTIONS.find((o) => o.value === value);
  return opt?.label ?? value;
}

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!json || typeof json !== "object") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const incoming = json as IncomingContactJson;

  // Honeypot: reject non-empty value (don’t reveal the reason to bots).
  if (trim(incoming.company).length > 0) {
    return NextResponse.json(
      { error: "Please check all fields and try again." },
      { status: 400 }
    );
  }

  const turnstileSecretConfigured = Boolean(process.env.TURNSTILE_SECRET_KEY);
  if (turnstileSecretConfigured) {
    const token = trim(incoming.turnstileToken);
    if (!token) {
      return NextResponse.json(
        { error: "Please complete the security check and try again." },
        { status: 400 }
      );
    }
    const forwarded = request.headers.get("x-forwarded-for");
    const remoteip = forwarded?.split(",")[0]?.trim();
    const ok = await verifyTurnstileToken(token, remoteip);
    if (!ok) {
      return NextResponse.json(
        { error: "Security verification failed. Please refresh and try again." },
        { status: 400 }
      );
    }
  }

  const data = validate(incoming);
  if (!data) {
    return NextResponse.json(
      { error: "Please check all fields and try again." },
      { status: 400 }
    );
  }

  try {
    await insertLead({
      firstName: data.firstName,
      lastName: data.lastName,
      contactNumber: data.phone,
      contactEmail: data.email,
      childAge: Number(data.childAge),
      interest: labelForInterest(data.interestedIn),
    });
  } catch (err) {
    const pg = getPgErrorInfo(err);
    console.error("[contact] Neon lead insert failed:", {
      code: pg.code,
      message: pg.message,
      detail: pg.detail,
    });

    if (pg.code === "23505") {
      return NextResponse.json(
        {
          error:
            "We already have an enquiry from this email address. If you need to add more detail, please email us directly.",
        },
        { status: 409 }
      );
    }

    const showDebug =
      process.env.NODE_ENV === "development" ||
      process.env.CONTACT_DEBUG === "1";

    return NextResponse.json(
      {
        error:
          "We could not save your message right now. Please try again later.",
        ...(showDebug
          ? {
              debug: pg.message,
              code: pg.code ?? null,
              detail: pg.detail ?? null,
            }
          : {}),
      },
      { status: 502 }
    );
  }

  const html = `
    <h2>New enquiry — Brighter Futures Tutoring</h2>
    <p><strong>Name:</strong> ${escapeHtml(data.firstName)} ${escapeHtml(data.lastName)}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>
    <p><strong>Child's age:</strong> ${escapeHtml(data.childAge)}</p>
    <p><strong>Interested in:</strong> ${escapeHtml(labelForInterest(data.interestedIn))}</p>
  `;

  const resendKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;

  if (resendKey && from && to) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject: `Enquiry from ${data.firstName} ${data.lastName}`,
        html,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("[contact] Resend error", res.status, text);
      return NextResponse.json(
        { error: "We could not send your message right now. Please try again later." },
        { status: 502 }
      );
    }
  } else {
    console.info(
      "[contact] New enquiry (configure RESEND_API_KEY, CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL to email):",
      JSON.stringify(data)
    );
  }

  return NextResponse.json({ ok: true });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
