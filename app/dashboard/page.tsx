"use client"
import { useEffect, useState, useCallback } from "react"

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

interface DashboardData {
  leads: Lead[]
  audits: AuditSubmission[]
  stats: {
    totalLeads: number
    newLeads: number
    auditSubmissions: number
    bySource: Record<string, number>
    byStatus: Record<string, number>
  }
}

// ── Constants ─────────────────────────────────────────────────────────────────
const DASHBOARD_TOKEN = "kinetic2025"

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

// ── Dashboard ─────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [accessGranted, setAccessGranted] = useState(false)
  const [tokenInput, setTokenInput] = useState("")
  const [activeTab, setActiveTab] = useState<"leads" | "audits">("leads")

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get("token") === DASHBOARD_TOKEN) {
      setAccessGranted(true)
    }
  }, [])

  const loadData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/dashboard-data?token=${DASHBOARD_TOKEN}`)
      if (!res.ok) {
        const json = await res.json()
        throw new Error(json.error || `HTTP ${res.status}`)
      }
      const json = await res.json()
      setData(json)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Unknown error")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (accessGranted) loadData()
  }, [accessGranted, loadData])

  // ── Token gate ───────────────────────────────────────────────────────────────
  if (!accessGranted) {
    return (
      <div style={{ minHeight: "100vh", background: "#0F0E0C", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
        <div style={{ background: "#1A1916", border: "1px solid #2A2926", borderRadius: "16px", padding: "48px", width: "100%", maxWidth: "400px", textAlign: "center" }}>
          <div style={{ fontSize: "28px", fontWeight: 700, color: "#F5F0E8", marginBottom: "4px" }}>Kinetic</div>
          <div style={{ color: "#6B6560", fontSize: "14px", marginBottom: "32px" }}>Lead & Performance Dashboard</div>
          <input
            type="password"
            placeholder="Enter access token"
            value={tokenInput}
            onChange={e => setTokenInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && tokenInput === DASHBOARD_TOKEN) setAccessGranted(true) }}
            style={{ width: "100%", padding: "12px 16px", background: "#0F0E0C", border: "1px solid #2A2926", borderRadius: "8px", color: "#F5F0E8", fontSize: "14px", marginBottom: "12px", outline: "none", boxSizing: "border-box" }}
            autoFocus
          />
          <button
            onClick={() => { if (tokenInput === DASHBOARD_TOKEN) setAccessGranted(true) }}
            style={{ width: "100%", padding: "12px", background: "#C8440A", color: "#fff", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}
          >
            Access Dashboard
          </button>
          <div style={{ color: "#6B6560", fontSize: "11px", marginTop: "16px" }}>Or add <code style={{ color: "#9E9890" }}>?token=kinetic2025</code> to the URL</div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#0F0E0C", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ color: "#C8440A", fontSize: "14px", marginBottom: "8px" }}>Loading dashboard…</div>
          <div style={{ color: "#6B6560", fontSize: "12px" }}>Fetching leads from Supabase</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ minHeight: "100vh", background: "#0F0E0C", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", maxWidth: "480px" }}>
          <div style={{ color: "#ef4444", fontSize: "18px", marginBottom: "8px" }}>Error loading data</div>
          <div style={{ color: "#6B6560", fontSize: "14px", marginBottom: "24px" }}>{error}</div>
          <button onClick={loadData} style={{ padding: "10px 20px", background: "#C8440A", border: "none", borderRadius: "8px", color: "#fff", fontSize: "14px", cursor: "pointer" }}>Retry</button>
        </div>
      </div>
    )
  }

  const { leads, audits, stats } = data!

  // ── Main dashboard ────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", background: "#0F0E0C", color: "#F5F0E8", fontFamily: "system-ui, -apple-system, sans-serif" }}>

      {/* Header */}
      <div style={{ borderBottom: "1px solid #1A1916", padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "18px", fontWeight: 700, color: "#F5F0E8" }}>Kinetic</span>
          <span style={{ color: "#2A2926" }}>|</span>
          <span style={{ color: "#6B6560", fontSize: "13px" }}>Lead Dashboard</span>
        </div>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <a href="https://analytics.google.com" target="_blank" rel="noreferrer"
            style={{ padding: "7px 14px", background: "#1A1916", border: "1px solid #2A2926", borderRadius: "6px", color: "#9E9890", fontSize: "12px", textDecoration: "none" }}>
            GA4 ↗
          </a>
          <a href="https://supabase.com/dashboard" target="_blank" rel="noreferrer"
            style={{ padding: "7px 14px", background: "#1A1916", border: "1px solid #2A2926", borderRadius: "6px", color: "#9E9890", fontSize: "12px", textDecoration: "none" }}>
            Supabase ↗
          </a>
          <button onClick={loadData}
            style={{ padding: "7px 14px", background: "#C8440A", border: "none", borderRadius: "6px", color: "#fff", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}>
            ↺ Refresh
          </button>
        </div>
      </div>

      <div style={{ padding: "28px 32px", maxWidth: "1400px", margin: "0 auto" }}>

        {/* Stat cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "24px" }}>
          {[
            { label: "Total Leads", value: stats.totalLeads, sub: "all time", color: "#C8440A" },
            { label: "New This Month", value: stats.newLeads, sub: "last 30 days", color: "#3B82F6" },
            { label: "Audit Submissions", value: stats.auditSubmissions, sub: "free audit form", color: "#8B5CF6" },
            { label: "Won", value: stats.byStatus?.won ?? 0, sub: "closed deals", color: "#10B981" },
          ].map(card => (
            <div key={card.label} style={{ background: "#1A1916", border: "1px solid #2A2926", borderRadius: "10px", padding: "20px 24px" }}>
              <div style={{ fontSize: "11px", color: "#6B6560", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{card.label}</div>
              <div style={{ fontSize: "32px", fontWeight: 700, color: card.color, lineHeight: 1 }}>{card.value}</div>
              <div style={{ fontSize: "11px", color: "#6B6560", marginTop: "4px" }}>{card.sub}</div>
            </div>
          ))}
        </div>

        {/* Pipeline + Source */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "24px" }}>
          <div style={{ background: "#1A1916", border: "1px solid #2A2926", borderRadius: "10px", padding: "20px 24px" }}>
            <div style={{ fontSize: "12px", fontWeight: 600, color: "#9E9890", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "16px" }}>Pipeline</div>
            {Object.entries(stats.byStatus || {}).length === 0 && (
              <div style={{ color: "#6B6560", fontSize: "13px" }}>No leads yet</div>
            )}
            {Object.entries(stats.byStatus || {}).map(([status, count]) => (
              <div key={status} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: statusColors[status] || "#6B6560", flexShrink: 0 }} />
                <div style={{ flex: 1, fontSize: "13px", color: "#9E9890", textTransform: "capitalize" }}>{status}</div>
                <div style={{ fontSize: "13px", fontWeight: 600, color: "#F5F0E8", minWidth: "24px", textAlign: "right" }}>{count}</div>
                <div style={{ width: "80px", height: "4px", background: "#0F0E0C", borderRadius: "2px", overflow: "hidden" }}>
                  <div style={{ height: "100%", background: statusColors[status] || "#6B6560", width: `${Math.round((count / (stats.totalLeads || 1)) * 100)}%`, borderRadius: "2px" }} />
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: "#1A1916", border: "1px solid #2A2926", borderRadius: "10px", padding: "20px 24px" }}>
            <div style={{ fontSize: "12px", fontWeight: 600, color: "#9E9890", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "16px" }}>Lead Sources</div>
            {Object.entries(stats.bySource || {}).length === 0 && (
              <div style={{ color: "#6B6560", fontSize: "13px" }}>No data yet</div>
            )}
            {Object.entries(stats.bySource || {}).map(([source, count]) => (
              <div key={source} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                <div style={{ flex: 1, fontSize: "13px", color: "#9E9890" }}>{sourceLabels[source] || source}</div>
                <div style={{ fontSize: "13px", fontWeight: 600, color: "#F5F0E8", minWidth: "24px", textAlign: "right" }}>{count}</div>
                <div style={{ width: "80px", height: "4px", background: "#0F0E0C", borderRadius: "2px", overflow: "hidden" }}>
                  <div style={{ height: "100%", background: "#C8440A", width: `${Math.round((count / (stats.totalLeads || 1)) * 100)}%`, borderRadius: "2px" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "4px", marginBottom: "16px" }}>
          {(["leads", "audits"] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              style={{ padding: "8px 16px", background: activeTab === tab ? "#1A1916" : "transparent", border: activeTab === tab ? "1px solid #2A2926" : "1px solid transparent", borderRadius: "6px", color: activeTab === tab ? "#F5F0E8" : "#6B6560", fontSize: "13px", fontWeight: activeTab === tab ? 600 : 400, cursor: "pointer", textTransform: "capitalize" }}>
              {tab === "leads" ? `Leads (${leads.length})` : `Audits (${audits.length})`}
            </button>
          ))}
        </div>

        {/* Leads table */}
        {activeTab === "leads" && (
          <div style={{ background: "#1A1916", border: "1px solid #2A2926", borderRadius: "10px", overflow: "hidden" }}>
            {leads.length === 0 ? (
              <div style={{ padding: "48px", textAlign: "center", color: "#6B6560" }}>No leads yet — they'll show up here when someone fills a form</div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid #2A2926" }}>
                      {["Name", "Email", "Phone", "Company", "Source", "Status", "Date"].map(h => (
                        <th key={h} style={{ padding: "11px 18px", textAlign: "left", fontSize: "10px", color: "#6B6560", textTransform: "uppercase", letterSpacing: "0.07em", fontWeight: 500, whiteSpace: "nowrap" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead, i) => (
                      <tr key={lead.id} style={{ borderBottom: i < leads.length - 1 ? "1px solid #0F0E0C" : "none" }}>
                        <td style={{ padding: "13px 18px", fontSize: "13px", color: "#F5F0E8", fontWeight: 500, whiteSpace: "nowrap" }}>
                          {lead.first_name} {lead.last_name || ""}
                        </td>
                        <td style={{ padding: "13px 18px", fontSize: "12px", color: "#9E9890" }}>{lead.email}</td>
                        <td style={{ padding: "13px 18px", fontSize: "12px", color: "#9E9890" }}>{lead.phone || "—"}</td>
                        <td style={{ padding: "13px 18px", fontSize: "12px", color: "#9E9890" }}>{lead.company || "—"}</td>
                        <td style={{ padding: "13px 18px" }}>
                          <span style={{ padding: "2px 8px", background: "#0F0E0C", border: "1px solid #2A2926", borderRadius: "4px", fontSize: "11px", color: "#9E9890" }}>
                            {sourceLabels[lead.source] || lead.source}
                          </span>
                        </td>
                        <td style={{ padding: "13px 18px" }}>
                          <span style={{ padding: "2px 10px", background: `${statusColors[lead.status] || "#6B6560"}18`, border: `1px solid ${statusColors[lead.status] || "#6B6560"}44`, borderRadius: "4px", fontSize: "11px", color: statusColors[lead.status] || "#9E9890", fontWeight: 600, textTransform: "capitalize" }}>
                            {lead.status}
                          </span>
                        </td>
                        <td style={{ padding: "13px 18px", fontSize: "11px", color: "#6B6560", whiteSpace: "nowrap" }}>
                          {new Date(lead.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Audit submissions */}
        {activeTab === "audits" && (
          <div style={{ background: "#1A1916", border: "1px solid #2A2926", borderRadius: "10px", overflow: "hidden" }}>
            {audits.length === 0 ? (
              <div style={{ padding: "48px", textAlign: "center", color: "#6B6560" }}>No audit submissions yet</div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid #2A2926" }}>
                      {["Business", "Email", "Score", "Grade", "Top Offer", "Date"].map(h => (
                        <th key={h} style={{ padding: "11px 18px", textAlign: "left", fontSize: "10px", color: "#6B6560", textTransform: "uppercase", letterSpacing: "0.07em", fontWeight: 500 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {audits.map((a, i) => (
                      <tr key={a.id} style={{ borderBottom: i < audits.length - 1 ? "1px solid #0F0E0C" : "none" }}>
                        <td style={{ padding: "13px 18px", fontSize: "13px", color: "#F5F0E8", fontWeight: 500 }}>{a.business_name}</td>
                        <td style={{ padding: "13px 18px", fontSize: "12px", color: "#9E9890" }}>{a.email}</td>
                        <td style={{ padding: "13px 18px" }}>
                          <span style={{ fontSize: "15px", fontWeight: 700, color: "#C8440A" }}>{a.score}</span>
                          <span style={{ fontSize: "11px", color: "#6B6560" }}>/110</span>
                        </td>
                        <td style={{ padding: "13px 18px" }}>
                          <span style={{ padding: "2px 10px", background: "#C8440A18", border: "1px solid #C8440A44", borderRadius: "4px", fontSize: "12px", color: "#C8440A", fontWeight: 700 }}>{a.grade}</span>
                        </td>
                        <td style={{ padding: "13px 18px", fontSize: "12px", color: "#9E9890" }}>{a.offer_tag || "—"}</td>
                        <td style={{ padding: "13px 18px", fontSize: "11px", color: "#6B6560" }}>
                          {new Date(a.submitted_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        <div style={{ marginTop: "24px", padding: "16px 20px", background: "#1A1916", border: "1px solid #2A2926", borderRadius: "8px", fontSize: "11px", color: "#6B6560" }}>
          Access URL:{" "}
          <code style={{ color: "#C8440A" }}>buildwithkinetic.org/dashboard?token=kinetic2025</code>
          {" · "}Data from Supabase · Traffic analytics in{" "}
          <a href="https://analytics.google.com" target="_blank" rel="noreferrer" style={{ color: "#3B82F6" }}>GA4</a>
        </div>
      </div>
    </div>
  )
}
