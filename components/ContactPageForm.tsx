"use client";

import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { useRef, useState } from "react";
import {
  SERVICE_INTEREST_OPTIONS,
  type ServiceInterestValue,
} from "@/lib/contact-form-options";

type ContactPageFormProps = {
  /** Pre-select when arriving from e.g. `/contact?service=one-to-one` */
  initialServiceInterest?: ServiceInterestValue;
};

const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

export function ContactPageForm({
  initialServiceInterest,
}: ContactPageFormProps = {}) {
  const turnstileRef = useRef<TurnstileInstance>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const turnstileEnabled = TURNSTILE_SITE_KEY.length > 0;
  const canSubmit = !turnstileEnabled || turnstileToken !== null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (turnstileEnabled && !turnstileToken) {
      setStatus("error");
      setErrorMessage("Please complete the security check below.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload = {
      firstName: String(fd.get("firstName") ?? ""),
      lastName: String(fd.get("lastName") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      email: String(fd.get("email") ?? ""),
      childAge: String(fd.get("childAge") ?? ""),
      interestedIn: String(fd.get("interestedIn") ?? ""),
      company: String(fd.get("company") ?? ""),
      turnstileToken: turnstileToken ?? "",
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const body = (await res.json()) as { error?: string };

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(
          body.error ?? "Something went wrong. Please try again."
        );
        turnstileRef.current?.reset();
        setTurnstileToken(null);
        return;
      }

      setStatus("success");
      form.reset();
      turnstileRef.current?.reset();
      setTurnstileToken(null);
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection.");
      turnstileRef.current?.reset();
      setTurnstileToken(null);
    }
  }

  const inputClass =
    "mt-1 block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20";

  const labelClass = "block text-sm font-semibold text-slate-700";

  return (
    <form onSubmit={handleSubmit} className="relative space-y-6" noValidate>
      {/* Honeypot: hidden from users; bots often autofill “company”. */}
      <div
        className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="contact-company">Company</label>
        <input
          type="text"
          id="contact-company"
          name="company"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className={labelClass}>
            First name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            required
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="lastName" className={labelClass}>
            Last name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            required
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className={labelClass}>
            Contact number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            className={inputClass}
            placeholder="e.g. 07123 456789"
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Contact email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="childAge" className={labelClass}>
            Child&apos;s age
          </label>
          <input
            id="childAge"
            name="childAge"
            type="number"
            inputMode="numeric"
            min={3}
            max={18}
            required
            className={inputClass}
            placeholder="Age (3–18)"
          />
        </div>
        <div>
          <label htmlFor="interestedIn" className={labelClass}>
            Interested in
          </label>
          <select
            id="interestedIn"
            name="interestedIn"
            required
            defaultValue={initialServiceInterest ?? ""}
            className={inputClass}
          >
            {SERVICE_INTEREST_OPTIONS.map((opt) => (
              <option
                key={opt.value === "" ? "placeholder" : opt.value}
                value={opt.value}
                disabled={opt.value === ""}
              >
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {turnstileEnabled && (
        <div className="flex flex-col gap-2">
          <span className={labelClass}>Security check</span>
          <Turnstile
            ref={turnstileRef}
            siteKey={TURNSTILE_SITE_KEY}
            onSuccess={setTurnstileToken}
            onExpire={() => setTurnstileToken(null)}
            onError={() => setTurnstileToken(null)}
            options={{ theme: "light" }}
          />
        </div>
      )}

      {status === "error" && errorMessage && (
        <p
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
          role="alert"
        >
          {errorMessage}
        </p>
      )}

      {status === "success" && (
        <p
          className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900"
          role="status"
        >
          Thank you — we&apos;ve received your message and will be in touch
          soon.
        </p>
      )}

      <div className="pt-2">
        <button
          type="submit"
          disabled={status === "loading" || !canSubmit}
          className="inline-flex w-full items-center justify-center rounded-2xl bg-primary-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary-900/15 transition hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {status === "loading" ? "Sending…" : "Send message"}
        </button>
        {turnstileEnabled && !canSubmit && status !== "loading" && (
          <p className="mt-2 text-xs text-slate-500">
            Complete the security check above to send your message.
          </p>
        )}
      </div>
    </form>
  );
}
