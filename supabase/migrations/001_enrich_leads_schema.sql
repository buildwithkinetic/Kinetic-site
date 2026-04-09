-- ============================================================
-- Kinetic — Lead enrichment migration
-- Paste into Supabase SQL Editor and Run
-- ============================================================

-- 1. Enrich the existing leads table
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS company        TEXT,
  ADD COLUMN IF NOT EXISTS website        TEXT,
  ADD COLUMN IF NOT EXISTS industry       TEXT,
  ADD COLUMN IF NOT EXISTS city           TEXT,
  ADD COLUMN IF NOT EXISTS service_interest TEXT,   -- which offer they asked about
  ADD COLUMN IF NOT EXISTS budget_range   TEXT,     -- e.g. "₹25k–₹50k"
  ADD COLUMN IF NOT EXISTS lead_score     INT DEFAULT 0,  -- 0–100, set manually or by automation
  ADD COLUMN IF NOT EXISTS utm_source     TEXT,
  ADD COLUMN IF NOT EXISTS utm_medium     TEXT,
  ADD COLUMN IF NOT EXISTS utm_campaign   TEXT,
  ADD COLUMN IF NOT EXISTS updated_at     TIMESTAMPTZ DEFAULT NOW();

-- Auto-update updated_at on every row change
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS leads_updated_at ON leads;
CREATE TRIGGER leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ============================================================
-- 2. Lead notes — one lead can have many interaction records
--    lead_id is BIGINT to match leads.id type
-- ============================================================
CREATE TABLE IF NOT EXISTS lead_notes (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  lead_id     BIGINT NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  type        TEXT NOT NULL DEFAULT 'note',  -- 'note' | 'call' | 'email' | 'meeting' | 'whatsapp'
  content     TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS lead_notes_lead_id_idx ON lead_notes(lead_id);

-- ============================================================
-- 3. Deals — track the sales pipeline per lead
--    lead_id is BIGINT to match leads.id type
-- ============================================================
CREATE TABLE IF NOT EXISTS deals (
  id                  BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  lead_id             BIGINT NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  offer_name          TEXT NOT NULL,   -- one of the 5 growth offers
  value               NUMERIC(10,2),   -- deal value in INR
  stage               TEXT NOT NULL DEFAULT 'discovery',
  -- stages: discovery | proposal_sent | negotiation | won | lost
  probability         INT DEFAULT 20,  -- 0–100 %, your estimate of closing
  expected_close_date DATE,
  lost_reason         TEXT,            -- filled in if stage = 'lost'
  notes               TEXT,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS deals_lead_id_idx    ON deals(lead_id);
CREATE INDEX IF NOT EXISTS deals_stage_idx      ON deals(stage);

DROP TRIGGER IF EXISTS deals_updated_at ON deals;
CREATE TRIGGER deals_updated_at
  BEFORE UPDATE ON deals
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ============================================================
-- 4. Enable RLS (row-level security) on new tables
--    Service role key bypasses RLS so your API still works.
-- ============================================================
ALTER TABLE lead_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE deals      ENABLE ROW LEVEL SECURITY;

-- Service role has full access (your API uses this key)
CREATE POLICY "service role full access" ON lead_notes
  USING (true) WITH CHECK (true);

CREATE POLICY "service role full access" ON deals
  USING (true) WITH CHECK (true);
