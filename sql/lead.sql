-- Reference schema for the Neon `lead` table (quoted name: reserved word LEAD).
-- Skip this file if the table already exists in your project.

CREATE TABLE IF NOT EXISTS "lead" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  contact_email VARCHAR(255) NOT NULL,
  contact_number VARCHAR(20),
  child_age INTEGER,
  interest TEXT,
  source TEXT,
  status VARCHAR(50) NOT NULL DEFAULT 'new',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT lead_contact_email_key UNIQUE (contact_email)
);

CREATE INDEX IF NOT EXISTS lead_created_at_idx ON "lead" (created_at DESC);
CREATE INDEX IF NOT EXISTS lead_status_idx ON "lead" (status);
