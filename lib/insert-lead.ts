import { neon } from "@neondatabase/serverless";

export type LeadInsert = {
  firstName: string;
  lastName: string;
  contactNumber: string;
  contactEmail: string;
  childAge: number;
  /** Human-readable service interest (stored in `interest`). */
  interest: string;
  /** e.g. `website` — override with env `LEAD_SOURCE`. */
  source?: string;
};

function clip(s: string, max: number): string {
  if (s.length <= max) return s;
  return s.slice(0, max);
}

/** Safe PostgreSQL identifier for table name (no injection). */
function quotedTableIdentifier(raw: string): string {
  const name = raw.trim();
  if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name)) {
    throw new Error(
      `Invalid LEAD_TABLE_NAME "${raw}" — use letters, numbers, underscore only.`
    );
  }
  return `"${name}"`;
}

/**
 * Inserts a contact form submission into Neon (`lead` table by default).
 * If `DATABASE_URL` is unset, skips (logs in development only).
 *
 * Set `LEAD_TABLE_NAME` if your table is not `lead` (e.g. `leads`).
 */
export async function insertLead(data: LeadInsert): Promise<void> {
  const url = process.env.DATABASE_URL?.trim();
  if (!url) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[contact] DATABASE_URL not set; skipping Neon insert for lead"
      );
    }
    return;
  }

  const source =
    data.source?.trim() ||
    process.env.LEAD_SOURCE?.trim() ||
    "website";

  const tableIdent = quotedTableIdentifier(
    process.env.LEAD_TABLE_NAME?.trim() || "lead"
  );

  const sql = neon(url);
  await sql`
    INSERT INTO ${sql.unsafe(tableIdent)} (
      first_name,
      last_name,
      contact_email,
      contact_number,
      child_age,
      interest,
      source,
      status
    )
    VALUES (
      ${clip(data.firstName, 100)},
      ${clip(data.lastName, 100)},
      ${clip(data.contactEmail, 255)},
      ${clip(data.contactNumber, 20)},
      ${data.childAge},
      ${data.interest},
      ${source},
      'new'
    )
  `;
}
