"use client"
import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"

// ── Types ────────────────────────────────────────────────────────────────────
interface Lead {
  id: string
  first_name: string
  last_name: string | null
  email: string
  phone: string | null
  company: string | null
  source: string
  status: string
  notes: string | null
  created_at: string
}

interface AuditSubmission {
  id: string
  business_name: string
  email: string
  score: number
  grade: string
  offer_tag: string
  submitted_at: string
}

interface Stats {
  totalLeads: number
  newLeads: number
  auditSubmissions: number
  bySource: Record<string, number>
  byStatus: Record<string, number>
}

// ── Supabase (client-side only, anon key — read-only view) ───────────────────
function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

// ── Colour helpers ────────────────────────────────────────────────────────────
const statusColors: Record<string, string> = {
  new: "#C8440A",
  contacted: "#3B82F6",
  qualified: "#8B5CF6",
  proposal: "#F59E0B",
  won: "#10B981",
  lost: "#6B7280",
}

const sourceLabels: Record<string, string> = {
  website: "Contact Form",
  "quick-win-audit": "Free Audit",
  "free-website-audit": "Free Audit",
  cal: "Cal.com Booking",
  referral: "Referral",
}

// ── Dashboard ────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [audits, setAudits] = useState<AuditSubmission[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [accessGranted, setAccessGranted] = useState(false)
  const [tokenInput, setTokenInput] = useState("")

  // Simple token gate (set DASHBOARD_TOKEN env var or default "kinetic2025")
  const DASHBOARD_TOKEN = "kinetic2025"

  useEffect(() => {
    // Check URL token
    const params = new URLSearchParams(window.location.search)
    if (params.get("token") === DASHBOARD_TOKEN) {
      setAccessGranted(true)
    }
  }, [])

  useEffect(() => {
    if (!accessGranted) return
    loadData()
  }, [accessGranted])

  async function loadData() {
    const supabase = getSupabase()
    if (!supabase) {
      setError("Supabase not configured")
      setLoading(false)
      return
    }

    try {
      const [leadsRes, auditsRes] = await Promise.all([
        supabase.from("leads").select("*").order("created_at", { ascending: false }).limit(100),
        supabase.from("audit_submissions").select("*").order("submitted_at", { ascending: false }).limit(50),
      ])

      if (leadsRes.error) throw leadsRes.error
      if (auditsRes.error) console.warn("audit_submissions:", auditsRes.error.message)

      const leadsData: Lead[] = leadsRes.data || []
      const auditsData: AuditSubmission[] = auditsRes.data || []

      setLeads(leadsData)
      setAudits(auditsData)

      // Compute stats
      const now = new Date()
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
      const newLeads = leadsData.filter(l => new Date(l.created_at) > thirtyDaysAgo).length

      const bySource: Record<string, number> = {}
      const byStatus: Record<string, number> = {}
      for (const l of leadsData) {
        bySource[l.source] = (bySource[l.source] || 0) + 1
        byStatus[l.status] = (byStatus[l.status] || 0) + 1
      }

      setStats({
        totalLeads: leadsData.length,
        newLeads,
        auditSubmissions: auditsData.length,
        bySource,
        byStatus,
      })
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  // ── Token gate ──────────────────────────────────────────────────────────────
  if (!accessGranted) {
    return (
      <div style={{ minHeight: "100vh", background: "#0F0E0C", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ background: "#1A1916", border: "1px solid #2A2926", borderRadius: "16px", padding: "48px", width: "100%", maxWidth: "400px", textAlign: "center" }}>
          <div style={{ fontSize: "28px", fontWeight: 700, color: "#F5F0E8", marginBottom: "8px" }}>Kinetic</div>
          <div style={{ color: "#6B6560", fontSize: "14px", marginBottom: "32px" }}>Lead & Performance Dashboard</div>
          <input
            type="password"
            placeholder="Enter access token"
            value={tokenInput}
            onChange={e => setTokenInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && tokenInput === DASHBOARD_TOKEN) setAccessGranted(true) }}
            style={{ width: "100%", padding: "12px 16px", background: "#0F0E0C", border: "1px solid #2A2926", borderRadius: "8px", color: "#F5F0E8", fontSize: "14px", marginBottom: "12px", outline: "none", boxSizing: "border-box" }}
          />
          <button
            onClick={() => { if (tokenInput === DASHBOARD_TOKEN) setAccessGranted(true) }}
            style={{ width: "100%", padding: "12px", background: "#C8440A", color: "#fff", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}
          >
            Access Dashboard
          </button>
          <div style={{ color: "#6B6560", fontSize: "11px", marginTop: "16px" }}>Or add ?token=kinetic2025 to the URL</div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#0F0E0C", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "#C8440A", fontSize: "16px" }}>Loading dashboard…</div>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ minHeight: "100vh", background: "#0F0E0C", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "#ef4444", textAlign: "center" }}>
          <div style={{ fontSize: "18px", marginBottom: "8px" }}>Error loading data</div>
          <div style={{ color: "#6B6560", fontSize: "14px" }}>{error}</div>
        </div>
      </div>
    )
  }

  // ── Main dashboard ──────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", background: "#0F0E0C", color: "#F5F0E8", fontFamily: "system-ui, sans-serif" }}>
      {/* Header */}
      <div style={{ borderBottom: "1px solid #1A1916", padding: "20px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <span style={{ fontSize: "20px", fontWeight: 700, color: "#F5F0E8" }}>Kinetic</span>
          <span style={{ color: "#6B6560", marginLeft: "12px", fontSize: "14px" }}>Lead Dashboard</span>
        </div>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <a href="https://analytics.google.com" target="_blank" rel="noreferrer"
            style={{ padding: "8px 16px", background: "#1A1916", border: "1px solid #2A2926", borderRadius: "8px", color: "#9E9890", fontSize: "13px", textDecoration: "none" }}>
            Open GA4 →
          </a>
          <a href="https://supabase.com/dashboard" target="_blank" rel="noreferrer"
            style={{ padding: "8px 16px", background: "#1A1916", border: "1px solid #2A2926", borderRadius: "8px", color: "#9E9890", fontSize: "13px", textDecoration: "none" }}>
            Open Supabase →
          </a>
          <button onClick={loadData} style={{ padding: "8px 16px", background: "#C8440A", border: "none", borderRadius: "8px", color: "#fff", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
            Refresh
          </button>
        </div>
      </div>

      <div style={{ padding: "32px", maxWidth: "1400px", margin: "0 auto" }}>
        {/* Stats cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "32px" }}>
          {[
            { label: "Total Leads", value: stats?.totalLeads ?? 0, color: "#C8440A" },
            { label: "New (30 days)", value: stats?.newLeads ?? 0, color: "#3B82F6" },
            { label: "Audit Submissions", value: stats?.auditSubmissions ?? 0, color: "#8B5CF6" },
            { label: "Won", value: stats?.byStatus?.won ?? 0, color: "#10B981" },
          ].map(card => (
            <div key={card.label} style={{ background: "#1A1916", border: "1px solid #2A2926", borderRadius: "12px", padding: "24px" }}>
              <div style={{ fontSize: "13px", color: "#6B6560", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{card.label}</div>
              <div style={{ fontSize: "36px", fontWeight: 700, color: card.color }}>{card.value}</div>
            </div>
          ))}
        </div>

        {/* Pipeline + Source breakdown */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "32px" }}>
          {/* Status pipeline */}
          <div style={{ background: "#1A1916", border: "1px solid #2A2926", borderRadius: "12px", padding: "24px" }}>
            <div style={{ fontSize: "14px", fontWeight: 600, color: "#F5F0E8", marginBottom: "16px" }}>Pipeline Status</div>
            {Object.entries(stats?.byStatus || {}).map(([status, count]) => (
              <div key={status} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: statusColors[status] || "#6B6560", flexShrink: 0 }} />
                <div style={{ flex: 1, fontSize: "13px", color: "#9E9890", textTransform: "capitalize" }}>{status}</div>
                <div style={{ fontSize: "13px", fontWeight: 600, color: "#F5F0E8" }}>{count}</div>
                <div style={{ width: "80px", height: "6px", background: "#0F0E0C", borderRadius: "3px", overflow: "hidden" }}>
                  <div style={{ height: "100%", background: statusColors[status] || "#6B6560", width: `${Math.round((count / (stats?.totalLeads || 1)) * 100)}%` }} />
                </div>
              </div>
            ))}
          </div>

          {/* Source breakdown */}
          <div style={{ background: "#1A1916", border: "1px solid #2A2926", borderRadius: "12px", padding: "24px" }}>
            <div style={{ fontSize: "14px", fontWeight: 600, color: "#F5F0E8", marginBottom: "16px" }}>Lead Sources</div>
            {Object.entries(stats?.bySource || {}).map(([source, count]) => (
              <div key={source} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
                <div style={{ flex: 1, fontSize: "13px", color: "#9E9890" }}>{sourceLabels[source] || source}</div>
                <div style={{ fontSize: "13px", fontWeight: 600, color: "#F5F0E8" }}>{count}</div>
                <div style={{ width: "80px", height: "6px", background: "#0F0E0C", borderRadius: "3px", overflow: "hidden" }}>
                  <div style={{ height: "100%", background: "#C8440A", width: `${Math.round((count / (stats?.totalLeads || 1)) * 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent leads table */}
        <div style={{ background: "#1A1916", border: "1px solid #2A2926", borderRadius: "12px", marginBottom: "32px" }}>
          <div style={{ padding: "20px 24px", borderBottom: "1px solid #2A2926", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ fontSize: "14px", fontWeight: 600, color: "#F5F0E8" }}>All Leads</div>
            <div style={{ fontSize: "12px", color: "#6B6560" }}>{leads.length} total</div>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #2A2926" }}>
                  {["Name", "Email", "Company", "Source", "Status", "Date"].map(h => (
                    <th key={h} style={{ padding: "12px 20px", textAlign: "left", fontSize: "11px", color: "#6B6560", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 500 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leads.slice(0, 20).map((lead, i) => (
                  <tr key={lead.id} style={{ borderBottom: i < leads.length - 1 ? "1px solid #1A1916" : "none", background: i % 2 === 0 ? "transparent" : "#0F0E0C11" }}>
                    <td style={{ padding: "14px 20px", fontSize: "14px", color: "#F5F0E8", fontWeight: 500 }}>
                      {lead.first_name} {lead.last_name || ""}
                    </td>
                    <td style={{ padding: "14px 20px", fontSize: "13px", color: "#9E9890" }}>{lead.email}</td>
                    <td style={{ padding: "14px 20px", fontSize: "13px", color: "#9E9890" }}>{lead.company || "—"}</td>
                    <td style={{ padding: "14px 20px", fontSize: "12px", color: "#9E9890" }}>
                      <span style={{ padding: "3px 8px", background: "#0F0E0C", border: "1px solid #2A2926", borderRadius: "4px" }}>
                        {sourceLabels[lead.source] || lead.source}
                      </span>
                    </td>
                    <td style={{ padding: "14px 20px" }}>
                      <span style={{ padding: "3px 10px", background: `${statusColors[lead.status]}22`, border: `1px solid ${statusColors[lead.status]}55`, borderRadius: "4px", fontSize: "12px", color: statusColors[lead.status] || "#9E9890", fontWeight: 500, textTransform: "capitalize" }}>
                        {lead.status}
                      </span>
                    </td>
                    <td style={{ padding: "14px 20px", fontSize: "12px", color: "#6B6560" }}>
                      {new Date(lead.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Audit submissions */}
        {audits.length > 0 && (
          <div style={{ background: "#1A1916", border: "1px solid #2A2926", borderRadius: "12px" }}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #2A2926" }}>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "#F5F0E8" }}>Audit Submissions</div>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #2A2926" }}>
                    {["Business", "Email", "Score", "Grade", "Top Offer", "Date"].map(h => (
                      <th key={h} style={{ padding: "12px 20px", textAlign: "left", fontSize: "11px", color: "#6B6560", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 500 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {audits.slice(0, 15).map((a, i) => (
                    <tr key={a.id} style={{ borderBottom: i < audits.length - 1 ? "1px solid #1A1916" : "none" }}>
                      <td style={{ padding: "14px 20px", fontSize: "14px", color: "#F5F0E8", fontWeight: 500 }}>{a.business_name}</td>
                      <td style={{ padding: "14px 20px", fontSize: "13px", color: "#9E9890" }}>{a.email}</td>
                      <td style={{ padding: "14px 20px", fontSize: "14px", color: "#C8440A", fontWeight: 700 }}>{a.score}</td>
                      <td style={{ padding: "14px 20px" }}>
                        <span style={{ padding: "3px 10px", background: "#C8440A22", border: "1px solid #C8440A55", borderRadius: "4px", fontSize: "12px", color: "#C8440A", fontWeight: 600 }}>
                          {a.grade}
                        </span>
                      </td>
                      <td style={{ padding: "14px 20px", fontSize: "12px", color: "#9E9890" }}>{a.offer_tag || "—"}</td>
                      <td style={{ padding: "14px 20px", fontSize: "12px", color: "#6B6560" }}>
                        {new Date(a.submitted_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div style={{ marginTop: "32px", padding: "20px", background: "#1A1916", border: "1px solid #2A2926", borderRadius: "12px", fontSize: "12px", color: "#6B6560", lineHeight: "1.6" }}>
          <strong style={{ color: "#9E9890" }}>Access:</strong> Share this dashboard at{" "}
          <code style={{ color: "#C8440A", background: "#0F0E0C", padding: "2px 6px", borderRadius: "4px" }}>
            buildwithkinetic.org/dashboard?token=kinetic2025
          </code>
          {" "}— change the token by updating <code style={{ color: "#C8440A", background: "#0F0E0C", padding: "2px 6px", borderRadius: "4px" }}>DASHBOARD_TOKEN</code> in this file.
          {" "}For website traffic analytics, open <a href="https://analytics.google.com" target="_blank" rel="noreferrer" style={{ color: "#3B82F6" }}>GA4</a> directly.
        </div>
      </div>
    </div>
  )
}
