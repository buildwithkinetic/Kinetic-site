-- ============================================================
-- Kinetic — Create submissions table
-- Paste into Supabase SQL Editor and Run
-- ============================================================

CREATE TABLE IF NOT EXISTS submissions (
  id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  type          TEXT NOT NULL,           -- 'booking' | 'discovery' | 'audit'
  client_name   TEXT,
  business_name TEXT,
  client_email  TEXT NOT NULL,
  client_phone  TEXT,
  city          TEXT,
  offer_name    TEXT,
  website_url   TEXT,
  score         INTEGER,
  grade         TEXT,
  offer_tag     TEXT,
  notes         TEXT,
  submitted_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS submissions_email_idx ON submissions(client_email);
CREATE INDEX IF NOT EXISTS submissions_type_idx  ON submissions(type);

ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "service role full access" ON submissions
  USING (true) WITH CHECK (true);
