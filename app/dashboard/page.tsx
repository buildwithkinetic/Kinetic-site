"use client"
import { useEffect, useState, useCallback, useRef } from "react"

// ── Types ────────────────────────────────────────────────────────────────────
interface Lead {
  id: string
  name: string
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

const STATUS_OPTIONS = ["new", "contacted", "qualified", "proposal", "won", "lost"]

const statusColors: Record<string, string> = {
  new: "#C8440A",
  contacted: "#3B82F6",
  qualified: "#8B5CF6",
  proposal: "#F59E0B",
  won: "#10B981",
  lost: "#6B7280",
}

const statusBg: Record<string, string> = {
  new: "#C8440A20",
  contacted: "#3B82F620",
  qualified: "#8B5CF620",
  proposal: "#F59E0B20",
  won: "#10B98120",
  lost: "#6B728020",
}

const sourceLabels: Record<string, string> = {
  website: "Contact Form",
  "quick-win-audit": "Free Audit",
  "free-website-audit": "Free Audit",
  "cal-booking": "Cal.com Booking",
  cal: "Cal.com Booking",
  referral: "Referral",
}

// Offer values for pipeline calculation
const offerValues: Record<string, number> = {
  new: 40000,
  contacted: 40000,
  qualified: 50000,
  proposal: 60000,
  won: 60000,
  lost: 0,
}

// ── Mini Sparkline Chart (SVG) ─────────────────────────────────────────────
function SparkChart({ leads }: { leads: Lead[] }) {
  const days = 30
  const buckets: number[] = Array(days).fill(0)
  const now = Date.now()
  leads.forEach((l) => {
    const age = Math.floor((now - new Date(l.created_at).getTime()) / 86400000)
    if (age >= 0 && age < days) buckets[days - 1 - age]++
  })

  const max = Math.max(...buckets, 1)
  const W = 280
  const H = 60
  const pts = buckets.map((v, i) => {
    const x = (i / (days - 1)) * W
    const y = H - (v / max) * H * 0.85 - 4
    return `${x},${y}`
  })
  const path = `M ${pts.join(" L ")}`
  const area = `M 0,${H} L ${pts.join(" L ")} L ${W},${H} Z`

  return (
    <svg width={W} height={H} style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="spark-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#spark-grad)" />
      <path d={path} fill="none" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ── CSV Export ────────────────────────────────────────────────────────────────
function exportCsv(leads: Lead[]) {
  const headers = ["Name", "Email", "Phone", "Company", "Source", "Status", "Notes", "Date"]
  const rows = leads.map((l) => [
    l.name,
    l.email,
    l.phone || "",
    l.company || "",
    sourceLabels[l.source] || l.source,
    l.status,
    (l.notes || "").replace(/,/g, ";"),
    new Date(l.created_at).toLocaleDateString("en-IN"),
  ])
  const csv = [headers, ...rows].map((r) => r.map((v) => `"${v}"`).join(",")).join("\n")
  const blob = new Blob([csv], { type: "text/csv" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `kinetic-leads-${new Date().toISOString().slice(0, 10)}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

// ── Status Badge ──────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  return (
    <span style={{
      padding: "2px 10px",
      background: statusBg[status] || "#6B728020",
      border: `1px solid ${statusColors[status] || "#6B7280"}44`,
      borderRadius: "4px",
      fontSize: "11px",
      color: statusColors[status] || "#9E9890",
      fontWeight: 600,
      textTransform: "capitalize",
    }}>
      {status}
    </span>
  )
}

// ── Inline Status Editor ──────────────────────────────────────────────────────
function StatusCell({ lead, token, onUpdate }: { lead: Lead; token: string; onUpdate: (id: string, status: string) => void }) {
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setEditing(false)
    }
    if (editing) document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [editing])

  const pick = async (s: string) => {
    setSaving(true)
    setEditing(false)
    try {
      const res = await fetch(`/api/update-lead?token=${token}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: lead.id, status: s }),
      })
      if (res.ok) onUpdate(lead.id, s)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setEditing(!editing)}
        title="Click to change status"
        style={{ background: "none", border: "none", cursor: "pointer", padding: 0, opacity: saving ? 0.5 : 1 }}
      >
        <StatusBadge status={lead.status} />
        <span style={{ color: "#6B6560", fontSize: "10px", marginLeft: "4px" }}>▾</span>
      </button>
      {editing && (
        <div style={{
          position: "absolute", top: "calc(100% + 4px)", left: 0, zIndex: 100,
          background: "#1A1916", border: "1px solid #2A2926",
          borderRadius: "8px", padding: "4px", minWidth: "130px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.6)",
        }}>
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s}
              onClick={() => pick(s)}
              style={{
                display: "block", width: "100%", padding: "7px 12px",
                background: s === lead.status ? "#0F0E0C" : "transparent",
                border: "none", borderRadius: "5px",
                cursor: "pointer", textAlign: "left",
                color: statusColors[s] || "#9E9890",
                fontSize: "12px", fontWeight: 600,
                textTransform: "capitalize",
              }}
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Notes Cell ────────────────────────────────────────────────────────────────
function NotesCell({ lead, token, onUpdate }: { lead: Lead; token: string; onUpdate: (id: string, notes: string) => void }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(lead.notes || "")
  const [saving, setSaving] = useState(false)

  const save = async () => {
    setSaving(true)
    try {
      const res = await fetch(`/api/update-lead?token=${token}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: lead.id, notes: draft }),
      })
      if (res.ok) { onUpdate(lead.id, draft); setEditing(false) }
    } finally {
      setSaving(false)
    }
  }

  if (editing) {
    return (
      <div style={{ display: "flex", gap: "6px", alignItems: "flex-start", minWidth: "180px" }}>
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          autoFocus
          rows={2}
          style={{
            width: "100%", padding: "6px 8px",
            background: "#0F0E0C", border: "1px solid #3B82F6",
            borderRadius: "6px", color: "#F5F0E8",
            fontSize: "12px", resize: "vertical", outline: "none",
            fontFamily: "system-ui, sans-serif",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: "4px", flexShrink: 0 }}>
          <button onClick={save} disabled={saving} style={{ padding: "5px 10px", background: "#10B981", border: "none", borderRadius: "5px", color: "#fff", fontSize: "11px", cursor: "pointer" }}>✓</button>
          <button onClick={() => { setEditing(false); setDraft(lead.notes || "") }} style={{ padding: "5px 10px", background: "#2A2926", border: "none", borderRadius: "5px", color: "#9E9890", fontSize: "11px", cursor: "pointer" }}>✕</button>
        </div>
      </div>
    )
  }

  return (
    <button
      onClick={() => setEditing(true)}
      title="Click to add notes"
      style={{ background: "none", border: "none", cursor: "pointer", padding: 0, textAlign: "left", maxWidth: "160px" }}
    >
      {lead.notes ? (
        <span style={{ fontSize: "12px", color: "#9E9890", display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "160px" }}>
          {lead.notes}
        </span>
      ) : (
        <span style={{ fontSize: "11px", color: "#3A3530", fontStyle: "italic" }}>Add note…</span>
      )}
    </button>
  )
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [accessGranted, setAccessGranted] = useState(false)
  const [tokenInput, setTokenInput] = useState("")
  const [tokenError, setTokenError] = useState("")
  const [activeTab, setActiveTab] = useState<"leads" | "audits" | "insights">("leads")
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get("token") === DASHBOARD_TOKEN) setAccessGranted(true)
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
      const json: DashboardData = await res.json()
      setData(json)
      setLeads(json.leads)
      setLastRefreshed(new Date())
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Unknown error")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (accessGranted) loadData()
  }, [accessGranted, loadData])

  const handleStatusUpdate = (id: string, status: string) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)))
  }

  const handleNotesUpdate = (id: string, notes: string) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, notes } : l)))
  }

  const filteredLeads = leads.filter((l) => {
    const q = search.toLowerCase()
    const matchesSearch =
      !q ||
      l.name.toLowerCase().includes(q) ||
      l.email.toLowerCase().includes(q) ||
      (l.company || "").toLowerCase().includes(q)
    const matchesStatus = statusFilter === "all" || l.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Pipeline value
  const pipelineValue = leads
    .filter((l) => l.status !== "lost")
    .reduce((sum, l) => sum + (offerValues[l.status] || 40000), 0)

  const wonValue = leads
    .filter((l) => l.status === "won")
    .reduce((sum, l) => sum + (offerValues["won"] || 60000), 0)

  // ── Token gate ───────────────────────────────────────────────────────────────
  if (!accessGranted) {
    return (
      <div style={{ minHeight: "100vh", background: "#0F0E0C", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
        <div style={{ background: "#1A1916", border: "1px solid #2A2926", borderRadius: "16px", padding: "48px", width: "100%", maxWidth: "400px", textAlign: "center" }}>
          <div style={{ width: "48px", height: "48px", background: "#C8440A18", border: "1px solid #C8440A44", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C8440A" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <div style={{ fontSize: "22px", fontWeight: 700, color: "#F5F0E8", marginBottom: "4px" }}>Kinetic Dashboard</div>
          <div style={{ color: "#6B6560", fontSize: "13px", marginBottom: "32px" }}>Lead & Performance Command Centre</div>
          <input
            type="password"
            placeholder="Enter access token"
            value={tokenInput}
            onChange={(e) => { setTokenInput(e.target.value); setTokenError("") }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (tokenInput === DASHBOARD_TOKEN) { setAccessGranted(true) }
                else { setTokenError("Incorrect token. Try again.") }
              }
            }}
            style={{ width: "100%", padding: "12px 16px", background: "#0F0E0C", border: `1px solid ${tokenError ? "#ef4444" : "#2A2926"}`, borderRadius: "8px", color: "#F5F0E8", fontSize: "14px", marginBottom: "8px", outline: "none", boxSizing: "border-box" }}
            autoFocus
          />
          {tokenError && (
            <div style={{ color: "#f87171", fontSize: "12px", marginBottom: "8px" }}>{tokenError}</div>
          )}
          <button
            onClick={() => {
              if (tokenInput === DASHBOARD_TOKEN) { setAccessGranted(true) }
              else { setTokenError("Incorrect token. Try again.") }
            }}
            style={{ width: "100%", padding: "13px", background: "#3B82F6", color: "#fff", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: 600, cursor: "pointer", marginTop: "4px" }}
          >
            Access Dashboard
          </button>
          <div style={{ color: "#6B6560", fontSize: "11px", marginTop: "14px" }}>Hint: check your URL bar for <code style={{ color: "#9E9890" }}>?token=...</code> or ask Ayush.</div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#0F0E0C", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: "36px", height: "36px", border: "2px solid #2A2926", borderTopColor: "#C8440A", borderRadius: "50%", margin: "0 auto 16px", animation: "spin 0.7s linear infinite" }} />
          <div style={{ color: "#6B6560", fontSize: "13px" }}>Loading your data…</div>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
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

  const { audits, stats } = data!

  return (
    <div style={{ minHeight: "100vh", background: "#0A0A08", color: "#F5F0E8", fontFamily: "system-ui, -apple-system, sans-serif" }}>

      {/* ── Header ───────────────────────────────────────────────────────────── */}
      <div style={{ borderBottom: "1px solid #1E1C19", padding: "14px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#0F0E0C" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#C8440A", boxShadow: "0 0 8px #C8440A" }} />
            <span style={{ fontSize: "15px", fontWeight: 700, color: "#F5F0E8", letterSpacing: "-0.3px" }}>Kinetic</span>
          </div>
          <span style={{ color: "#2A2926", fontSize: "16px" }}>|</span>
          <span style={{ color: "#6B6560", fontSize: "12px", letterSpacing: "0.5px" }}>Command Centre</span>
          {lastRefreshed && (
            <span style={{ color: "#3A3530", fontSize: "11px" }}>
              · Updated {lastRefreshed.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
            </span>
          )}
        </div>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <button
            onClick={() => exportCsv(leads)}
            title="Export leads as CSV"
            style={{ padding: "7px 14px", background: "#1A1916", border: "1px solid #2A2926", borderRadius: "6px", color: "#9E9890", fontSize: "12px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            CSV
          </button>
          <a href="https://analytics.google.com" target="_blank" rel="noreferrer"
            style={{ padding: "7px 14px", background: "#1A1916", border: "1px solid #2A2926", borderRadius: "6px", color: "#9E9890", fontSize: "12px", textDecoration: "none" }}>
            GA4 ↗
          </a>
          <a href={`https://cal.com/ayush-gupta-xpzedb`} target="_blank" rel="noreferrer"
            style={{ padding: "7px 14px", background: "#1A1916", border: "1px solid #2A2926", borderRadius: "6px", color: "#9E9890", fontSize: "12px", textDecoration: "none" }}>
            Cal.com ↗
          </a>
          <button onClick={loadData}
            style={{ padding: "7px 14px", background: "#C8440A", border: "none", borderRadius: "6px", color: "#fff", fontSize: "12px", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
            Refresh
          </button>
        </div>
      </div>

      <div style={{ padding: "24px 28px", maxWidth: "1500px", margin: "0 auto" }}>

        {/* ── Stat Cards ───────────────────────────────────────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "10px", marginBottom: "20px" }} className="stat-grid">
          {[
            { label: "Total Leads", value: stats.totalLeads, sub: "all time", color: "#C8440A", icon: "👤" },
            { label: "New This Month", value: stats.newLeads, sub: "last 30 days", color: "#3B82F6", icon: "📅" },
            { label: "Audit Submissions", value: stats.auditSubmissions, sub: "free audit form", color: "#8B5CF6", icon: "📋" },
            { label: "Won", value: stats.byStatus?.won ?? 0, sub: "closed deals", color: "#10B981", icon: "🏆" },
            { label: "Pipeline Value", value: `₹${(pipelineValue / 1000).toFixed(0)}k`, sub: "estimated open deals", color: "#F59E0B", icon: "💰" },
            { label: "Revenue Won", value: `₹${(wonValue / 1000).toFixed(0)}k`, sub: "total closed value", color: "#10B981", icon: "✅" },
          ].map((card) => (
            <div key={card.label} style={{ background: "#1A1916", border: "1px solid #1E1C19", borderRadius: "10px", padding: "18px 20px" }}>
              <div style={{ fontSize: "10px", color: "#4A4540", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.08em", display: "flex", alignItems: "center", gap: "6px" }}>
                <span>{card.icon}</span> {card.label}
              </div>
              <div style={{ fontSize: "28px", fontWeight: 700, color: card.color, lineHeight: 1, letterSpacing: "-1px" }}>{card.value}</div>
              <div style={{ fontSize: "10px", color: "#4A4540", marginTop: "5px" }}>{card.sub}</div>
            </div>
          ))}
        </div>

        {/* ── Charts Row ───────────────────────────────────────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "10px", marginBottom: "20px" }} className="chart-grid">

          {/* Leads over time */}
          <div style={{ background: "#1A1916", border: "1px solid #1E1C19", borderRadius: "10px", padding: "20px 24px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
              <div>
                <div style={{ fontSize: "12px", fontWeight: 600, color: "#9E9890", textTransform: "uppercase", letterSpacing: "0.07em" }}>Leads — Last 30 Days</div>
                <div style={{ fontSize: "22px", fontWeight: 700, color: "#3B82F6", marginTop: "2px" }}>{stats.newLeads}</div>
              </div>
              <div style={{ fontSize: "11px", color: "#4A4540" }}>Trend</div>
            </div>
            <SparkChart leads={leads} />
          </div>

          {/* Pipeline by status */}
          <div style={{ background: "#1A1916", border: "1px solid #1E1C19", borderRadius: "10px", padding: "20px 24px" }}>
            <div style={{ fontSize: "12px", fontWeight: 600, color: "#9E9890", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "16px" }}>Pipeline</div>
            {Object.entries(stats.byStatus || {}).length === 0 ? (
              <div style={{ color: "#4A4540", fontSize: "13px" }}>No leads yet</div>
            ) : (
              Object.entries(stats.byStatus || {}).map(([status, count]) => (
                <div key={status} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                  <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: statusColors[status] || "#6B6560", flexShrink: 0 }} />
                  <div style={{ flex: 1, fontSize: "12px", color: "#9E9890", textTransform: "capitalize" }}>{status}</div>
                  <div style={{ fontSize: "12px", fontWeight: 600, color: "#F5F0E8", minWidth: "20px", textAlign: "right" }}>{count}</div>
                  <div style={{ width: "60px", height: "3px", background: "#0A0A08", borderRadius: "2px", overflow: "hidden" }}>
                    <div style={{ height: "100%", background: statusColors[status] || "#6B6560", width: `${Math.round((count / (stats.totalLeads || 1)) * 100)}%`, borderRadius: "2px" }} />
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Lead Sources */}
          <div style={{ background: "#1A1916", border: "1px solid #1E1C19", borderRadius: "10px", padding: "20px 24px" }}>
            <div style={{ fontSize: "12px", fontWeight: 600, color: "#9E9890", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "16px" }}>Sources</div>
            {Object.entries(stats.bySource || {}).length === 0 ? (
              <div style={{ color: "#4A4540", fontSize: "13px" }}>No data yet</div>
            ) : (
              Object.entries(stats.bySource || {}).map(([source, count]) => (
                <div key={source} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                  <div style={{ flex: 1, fontSize: "12px", color: "#9E9890" }}>{sourceLabels[source] || source}</div>
                  <div style={{ fontSize: "12px", fontWeight: 600, color: "#F5F0E8", minWidth: "20px", textAlign: "right" }}>{count}</div>
                  <div style={{ width: "60px", height: "3px", background: "#0A0A08", borderRadius: "2px", overflow: "hidden" }}>
                    <div style={{ height: "100%", background: "#C8440A", width: `${Math.round((count / (stats.totalLeads || 1)) * 100)}%`, borderRadius: "2px" }} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ── Tabs ─────────────────────────────────────────────────────────── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px", flexWrap: "wrap", gap: "10px" }}>
          <div style={{ display: "flex", gap: "4px" }}>
            {(["leads", "audits", "insights"] as const).map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                style={{ padding: "8px 16px", background: activeTab === tab ? "#1A1916" : "transparent", border: activeTab === tab ? "1px solid #2A2926" : "1px solid transparent", borderRadius: "6px", color: activeTab === tab ? "#F5F0E8" : "#6B6560", fontSize: "12px", fontWeight: activeTab === tab ? 600 : 400, cursor: "pointer", textTransform: "capitalize" }}>
                {tab === "leads" ? `Leads (${leads.length})` : tab === "audits" ? `Audits (${audits.length})` : "Insights"}
              </button>
            ))}
          </div>

          {activeTab === "leads" && (
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <input
                type="text"
                placeholder="Search name, email, company…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ padding: "7px 12px", background: "#1A1916", border: "1px solid #2A2926", borderRadius: "6px", color: "#F5F0E8", fontSize: "12px", outline: "none", width: "220px" }}
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{ padding: "7px 12px", background: "#1A1916", border: "1px solid #2A2926", borderRadius: "6px", color: "#9E9890", fontSize: "12px", outline: "none", cursor: "pointer" }}
              >
                <option value="all">All Statuses</option>
                {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
              </select>
            </div>
          )}
        </div>

        {/* ── Leads Table ──────────────────────────────────────────────────── */}
        {activeTab === "leads" && (
          <div style={{ background: "#1A1916", border: "1px solid #1E1C19", borderRadius: "10px", overflow: "hidden" }}>
            {filteredLeads.length === 0 ? (
              <div style={{ padding: "48px", textAlign: "center", color: "#4A4540" }}>
                {leads.length === 0 ? "No leads yet — they'll appear when someone fills a form or books via Cal.com" : "No leads match your search"}
              </div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid #1E1C19" }}>
                      {["Name", "Email", "Phone", "Company", "Source", "Status", "Notes", "Date"].map((h) => (
                        <th key={h} style={{ padding: "11px 16px", textAlign: "left", fontSize: "10px", color: "#4A4540", textTransform: "uppercase", letterSpacing: "0.07em", fontWeight: 500, whiteSpace: "nowrap" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.map((lead, i) => (
                      <tr key={lead.id} style={{ borderBottom: i < filteredLeads.length - 1 ? "1px solid #0F0E0C" : "none" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#1E1C19" }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent" }}
                      >
                        <td style={{ padding: "13px 16px", fontSize: "13px", color: "#F5F0E8", fontWeight: 500, whiteSpace: "nowrap" }}>
                          {lead.name}
                        </td>
                        <td style={{ padding: "13px 16px" }}>
                          <a href={`mailto:${lead.email}`} style={{ fontSize: "12px", color: "#3B82F6", textDecoration: "none" }}>{lead.email}</a>
                        </td>
                        <td style={{ padding: "13px 16px", fontSize: "12px", color: "#9E9890" }}>{lead.phone || "—"}</td>
                        <td style={{ padding: "13px 16px", fontSize: "12px", color: "#9E9890" }}>{lead.company || "—"}</td>
                        <td style={{ padding: "13px 16px" }}>
                          <span style={{ padding: "2px 8px", background: "#0A0A08", border: "1px solid #2A2926", borderRadius: "4px", fontSize: "11px", color: "#9E9890" }}>
                            {sourceLabels[lead.source] || lead.source}
                          </span>
                        </td>
                        <td style={{ padding: "13px 16px" }}>
                          <StatusCell lead={lead} token={DASHBOARD_TOKEN} onUpdate={handleStatusUpdate} />
                        </td>
                        <td style={{ padding: "13px 16px" }}>
                          <NotesCell lead={lead} token={DASHBOARD_TOKEN} onUpdate={handleNotesUpdate} />
                        </td>
                        <td style={{ padding: "13px 16px", fontSize: "11px", color: "#4A4540", whiteSpace: "nowrap" }}>
                          {new Date(lead.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div style={{ padding: "10px 16px", borderTop: "1px solid #1E1C19", fontSize: "11px", color: "#4A4540", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span>Showing {filteredLeads.length} of {leads.length} leads</span>
                  <button onClick={() => exportCsv(filteredLeads)} style={{ background: "none", border: "none", color: "#6B6560", fontSize: "11px", cursor: "pointer", textDecoration: "underline" }}>
                    Export {filteredLeads.length} rows as CSV
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Audits Table ─────────────────────────────────────────────────── */}
        {activeTab === "audits" && (
          <div style={{ background: "#1A1916", border: "1px solid #1E1C19", borderRadius: "10px", overflow: "hidden" }}>
            {audits.length === 0 ? (
              <div style={{ padding: "48px", textAlign: "center", color: "#4A4540" }}>No audit submissions yet</div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid #1E1C19" }}>
                      {["Business", "Email", "Score", "Grade", "Top Offer Recommended", "Date"].map((h) => (
                        <th key={h} style={{ padding: "11px 16px", textAlign: "left", fontSize: "10px", color: "#4A4540", textTransform: "uppercase", letterSpacing: "0.07em", fontWeight: 500 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {audits.map((a, i) => (
                      <tr key={a.id} style={{ borderBottom: i < audits.length - 1 ? "1px solid #0F0E0C" : "none" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#1E1C19" }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent" }}
                      >
                        <td style={{ padding: "13px 16px", fontSize: "13px", color: "#F5F0E8", fontWeight: 500 }}>{a.business_name}</td>
                        <td style={{ padding: "13px 16px" }}>
                          <a href={`mailto:${a.email}`} style={{ fontSize: "12px", color: "#3B82F6", textDecoration: "none" }}>{a.email}</a>
                        </td>
                        <td style={{ padding: "13px 16px" }}>
                          <span style={{ fontSize: "16px", fontWeight: 700, color: a.score >= 80 ? "#10B981" : a.score >= 50 ? "#F59E0B" : "#C8440A" }}>{a.score}</span>
                          <span style={{ fontSize: "11px", color: "#4A4540" }}>/110</span>
                        </td>
                        <td style={{ padding: "13px 16px" }}>
                          <span style={{ padding: "2px 10px", background: "#C8440A18", border: "1px solid #C8440A44", borderRadius: "4px", fontSize: "12px", color: "#C8440A", fontWeight: 700 }}>{a.grade}</span>
                        </td>
                        <td style={{ padding: "13px 16px", fontSize: "12px", color: "#9E9890" }}>{a.offer_tag || "—"}</td>
                        <td style={{ padding: "13px 16px", fontSize: "11px", color: "#4A4540" }}>
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

        {/* ── Insights Tab ─────────────────────────────────────────────────── */}
        {activeTab === "insights" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }} className="insights-grid">

            {/* Conversion rates */}
            <div style={{ background: "#1A1916", border: "1px solid #1E1C19", borderRadius: "10px", padding: "24px" }}>
              <div style={{ fontSize: "12px", fontWeight: 600, color: "#9E9890", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "20px" }}>Funnel Conversion</div>
              {[
                { label: "Leads → Contacted", from: stats.totalLeads, to: (stats.byStatus?.contacted || 0) + (stats.byStatus?.qualified || 0) + (stats.byStatus?.proposal || 0) + (stats.byStatus?.won || 0) },
                { label: "Contacted → Qualified", from: (stats.byStatus?.contacted || 0), to: (stats.byStatus?.qualified || 0) + (stats.byStatus?.proposal || 0) + (stats.byStatus?.won || 0) },
                { label: "Qualified → Proposal", from: (stats.byStatus?.qualified || 0), to: (stats.byStatus?.proposal || 0) + (stats.byStatus?.won || 0) },
                { label: "Proposal → Won", from: (stats.byStatus?.proposal || 0), to: stats.byStatus?.won || 0 },
              ].map((row) => {
                const rate = row.from > 0 ? Math.round((row.to / row.from) * 100) : 0
                return (
                  <div key={row.label} style={{ marginBottom: "16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                      <span style={{ fontSize: "12px", color: "#9E9890" }}>{row.label}</span>
                      <span style={{ fontSize: "12px", fontWeight: 600, color: rate >= 50 ? "#10B981" : rate >= 25 ? "#F59E0B" : "#C8440A" }}>{rate}%</span>
                    </div>
                    <div style={{ height: "4px", background: "#0A0A08", borderRadius: "2px" }}>
                      <div style={{ height: "100%", background: rate >= 50 ? "#10B981" : rate >= 25 ? "#F59E0B" : "#C8440A", width: `${rate}%`, borderRadius: "2px", transition: "width 0.6s ease" }} />
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Quick email templates */}
            <div style={{ background: "#1A1916", border: "1px solid #1E1C19", borderRadius: "10px", padding: "24px" }}>
              <div style={{ fontSize: "12px", fontWeight: 600, color: "#9E9890", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "20px" }}>Quick Email Templates</div>
              {[
                {
                  label: "Follow-up (no response)",
                  body: "Hi [Name], just following up on our previous chat about building your growth system. Happy to jump on a quick 20-minute call this week to map out what the right system would look like for your business. Let me know what works. — Ayush",
                },
                {
                  label: "Post-call proposal",
                  body: "Hi [Name], great talking earlier. Based on what you shared, I think [Offer Name] would be the right fit. I'll send a detailed breakdown shortly, but the key outcomes are: [outcomes]. Timeline: 2–3 weeks. Ready to get started? — Ayush",
                },
                {
                  label: "Audit delivery",
                  body: "Hi [Name], your free website audit is ready. I've looked at your site and found [X] issues costing you leads. The biggest one: [main issue]. I've put together a full breakdown with fixes. Want to go through it on a call? — Ayush",
                },
              ].map((tpl) => (
                <EmailTemplate key={tpl.label} label={tpl.label} body={tpl.body} />
              ))}
            </div>

            {/* Recommendations */}
            <div style={{ background: "#1A1916", border: "1px solid #1E1C19", borderRadius: "10px", padding: "24px", gridColumn: "1 / -1" }}>
              <div style={{ fontSize: "12px", fontWeight: 600, color: "#9E9890", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "20px" }}>Growth Recommendations</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }} className="rec-grid">
                {[
                  {
                    icon: "🎯",
                    title: stats.byStatus?.new > 0 ? `${stats.byStatus.new} new leads need follow-up` : "Pipeline looks clean",
                    desc: stats.byStatus?.new > 0 ? "Move them to contacted within 24 hours — speed matters most in the first window." : "All new leads have been actioned. Keep your pipeline healthy.",
                    color: stats.byStatus?.new > 0 ? "#C8440A" : "#10B981",
                  },
                  {
                    icon: "📈",
                    title: stats.auditSubmissions > 0 ? `${stats.auditSubmissions} audit submissions` : "No audit submissions yet",
                    desc: stats.auditSubmissions > 0 ? "Follow up with audit leads — they've shown high intent by sharing their business details." : "Drive more traffic to /free-website-audit to generate warm leads.",
                    color: "#F59E0B",
                  },
                  {
                    icon: "💡",
                    title: "Book 2 strategy calls per week",
                    desc: "At your current conversion rate, 2 qualified calls/week = 1 new client every 2 weeks. Consistency is the system.",
                    color: "#3B82F6",
                  },
                ].map((rec) => (
                  <div key={rec.title} style={{ padding: "16px", background: "#0F0E0C", borderRadius: "8px", border: `1px solid ${rec.color}22` }}>
                    <div style={{ fontSize: "20px", marginBottom: "8px" }}>{rec.icon}</div>
                    <div style={{ fontSize: "13px", fontWeight: 600, color: rec.color, marginBottom: "6px" }}>{rec.title}</div>
                    <div style={{ fontSize: "12px", color: "#6B6560", lineHeight: 1.6 }}>{rec.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Footer ───────────────────────────────────────────────────────── */}
        <div style={{ marginTop: "20px", padding: "14px 16px", background: "#1A1916", border: "1px solid #1E1C19", borderRadius: "8px", fontSize: "11px", color: "#4A4540", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
          <span>
            <code style={{ color: "#C8440A" }}>buildwithkinetic.org/dashboard?token=kinetic2025</code>
            {" · "}Data from Supabase · Analytics in{" "}
            <a href="https://analytics.google.com" target="_blank" rel="noreferrer" style={{ color: "#3B82F6" }}>GA4</a>
          </span>
          <span style={{ color: "#3A3530" }}>Click status badge to edit · Click notes cell to add/edit notes</span>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 1200px) { .stat-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 900px) { .stat-grid { grid-template-columns: repeat(2, 1fr) !important; } .chart-grid { grid-template-columns: 1fr !important; } .insights-grid { grid-template-columns: 1fr !important; } .rec-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  )
}

// ── Email Template Component ──────────────────────────────────────────────────
function EmailTemplate({ label, body }: { label: string; body: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(body)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div style={{ marginBottom: "12px", padding: "12px", background: "#0F0E0C", borderRadius: "8px", border: "1px solid #1E1C19" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
        <span style={{ fontSize: "12px", color: "#9E9890", fontWeight: 500 }}>{label}</span>
        <button onClick={copy} style={{ padding: "4px 10px", background: copied ? "#10B981" : "#1A1916", border: "1px solid #2A2926", borderRadius: "4px", color: copied ? "#fff" : "#6B6560", fontSize: "11px", cursor: "pointer", transition: "all 0.2s" }}>
          {copied ? "✓ Copied" : "Copy"}
        </button>
      </div>
      <p style={{ fontSize: "11px", color: "#4A4540", lineHeight: 1.6, margin: 0 }}>{body}</p>
    </div>
  )
}
