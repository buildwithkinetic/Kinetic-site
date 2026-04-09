-- ============================================================
-- Kinetic — Add missing base columns to leads table
-- Paste into Supabase SQL Editor and Run
-- ============================================================

ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS phone           TEXT,
  ADD COLUMN IF NOT EXISTS source          TEXT DEFAULT 'website',
  ADD COLUMN IF NOT EXISTS status          TEXT DEFAULT 'new',
  ADD COLUMN IF NOT EXISTS notes           TEXT,
  ADD COLUMN IF NOT EXISTS company         TEXT,
  ADD COLUMN IF NOT EXISTS website         TEXT,
  ADD COLUMN IF NOT EXISTS industry        TEXT,
  ADD COLUMN IF NOT EXISTS city            TEXT,
  ADD COLUMN IF NOT EXISTS service_interest TEXT,
  ADD COLUMN IF NOT EXISTS budget_range    TEXT,
  ADD COLUMN IF NOT EXISTS lead_score      INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS utm_source      TEXT,
  ADD COLUMN IF NOT EXISTS utm_medium      TEXT,
  ADD COLUMN IF NOT EXISTS utm_campaign    TEXT,
  ADD COLUMN IF NOT EXISTS updated_at      TIMESTAMPTZ DEFAULT NOW();
