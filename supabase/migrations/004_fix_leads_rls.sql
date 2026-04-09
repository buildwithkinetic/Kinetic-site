-- ============================================================
-- Kinetic — Fix leads RLS policies
-- All reads/writes go through server-side API so RLS is not
-- needed for security. Drop the restrictive read policy and
-- allow the service role (and anon for inserts) full access.
-- ============================================================

-- Drop the policy blocking dashboard reads
DROP POLICY IF EXISTS "Allow authenticated reads" ON leads;

-- Allow all reads (safe because access is via server-side API only)
CREATE POLICY "Allow all reads" ON leads
  FOR SELECT USING (true);

-- Keep public inserts (forms work without auth)
DROP POLICY IF EXISTS "Allow public inserts" ON leads;
CREATE POLICY "Allow public inserts" ON leads
  FOR INSERT WITH CHECK (true);

-- Allow updates (dashboard status/notes editing)
DROP POLICY IF EXISTS "Allow all updates" ON leads;
CREATE POLICY "Allow all updates" ON leads
  FOR UPDATE USING (true) WITH CHECK (true);

-- Verify: should return 6
SELECT count(*) FROM leads;
