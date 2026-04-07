import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const DASHBOARD_TOKEN = process.env.DASHBOARD_TOKEN || "kinetic2025"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get("token")
  if (token !== DASHBOARD_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ error: "Supabase environment variables not configured" }, { status: 500 })
  }

  const supabase = createClient(supabaseUrl, serviceKey)

  try {
    // Use SELECT * so the query never fails due to a missing column.
    // If a column doesn't exist yet the row still comes back — we just
    // treat it as undefined in the stats loop below.
    const leadsRes = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200)

    if (leadsRes.error) {
      console.error("leads query error:", leadsRes.error.message)
      // Return a minimal valid response instead of crashing
      return NextResponse.json({
        leads: [], audits: [], deals: [],
        stats: { totalLeads: 0, newLeads: 0, auditSubmissions: 0, bySource: {}, byStatus: {}, byService: {}, pipeline: { totalDeals: 0, pipelineValue: 0, wonValue: 0, byStage: {} } },
        _error: leadsRes.error.message,
      })
    }

    const leads = leadsRes.data || []

    // Audits — table may not exist yet, handle gracefully
    let audits: Record<string, unknown>[] = []
    const auditsRes = await supabase
      .from("audit_submissions")
      .select("*")
      .order("submitted_at", { ascending: false })
      .limit(100)
    if (auditsRes.error) {
      console.error("audit_submissions error:", auditsRes.error.message)
    } else {
      audits = auditsRes.data || []
    }

    // Deals — table may not exist yet (migration 001), handle gracefully
    let deals: Record<string, unknown>[] = []
    const dealsRes = await supabase
      .from("deals")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200)
    if (dealsRes.error) {
      console.error("deals error:", dealsRes.error.message)
    } else {
      deals = dealsRes.data || []
    }

    // Compute stats — use optional chaining so missing columns don't crash
    const now = new Date()
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

    const bySource: Record<string, number> = {}
    const byStatus: Record<string, number> = {}
    const byService: Record<string, number> = {}
    let newLeads = 0

    for (const lead of leads) {
      const src = (lead.source as string) || "unknown"
      const st  = (lead.status as string) || "new"
      bySource[src] = (bySource[src] || 0) + 1
      byStatus[st]  = (byStatus[st]  || 0) + 1
      if (lead.service_interest) {
        const svc = lead.service_interest as string
        byService[svc] = (byService[svc] || 0) + 1
      }
      if (lead.created_at && new Date(lead.created_at as string) > thirtyDaysAgo) newLeads++
    }

    const pipelineValue = deals
      .filter(d => d.stage !== "lost")
      .reduce((sum, d) => sum + (Number(d.value) || 0), 0)

    const wonValue = deals
      .filter(d => d.stage === "won")
      .reduce((sum, d) => sum + (Number(d.value) || 0), 0)

    const byDealStage: Record<string, number> = {}
    for (const deal of deals) {
      const s = (deal.stage as string) || "unknown"
      byDealStage[s] = (byDealStage[s] || 0) + 1
    }

    return NextResponse.json({
      leads,
      audits,
      deals,
      stats: {
        totalLeads: leads.length,
        newLeads,
        auditSubmissions: audits.length,
        bySource,
        byStatus,
        byService,
        pipeline: {
          totalDeals: deals.length,
          pipelineValue,
          wonValue,
          byStage: byDealStage,
        },
      },
    })
  } catch (err) {
    console.error("dashboard-data error:", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
