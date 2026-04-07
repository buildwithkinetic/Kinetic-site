import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const DASHBOARD_TOKEN = process.env.DASHBOARD_TOKEN || "kinetic2025"

export async function GET(request: Request) {
  // Token gate
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
    const [leadsRes, auditsRes] = await Promise.all([
      supabase
        .from("leads")
        .select("id, first_name, last_name, email, phone, source, status, notes, created_at")
        .order("created_at", { ascending: false })
        .limit(200),
      supabase
        .from("audit_submissions")
        .select("id, business_name, email, score, grade, offer_tag, submitted_at")
        .order("submitted_at", { ascending: false })
        .limit(100),
    ])

    if (leadsRes.error) {
      console.error("leads error:", leadsRes.error.message)
    }
    if (auditsRes.error) {
      console.error("audit_submissions error:", auditsRes.error.message)
    }

    const leads = leadsRes.data || []
    const audits = auditsRes.data || []

    // Compute stats server-side
    const now = new Date()
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

    const bySource: Record<string, number> = {}
    const byStatus: Record<string, number> = {}
    let newLeads = 0

    for (const lead of leads) {
      bySource[lead.source] = (bySource[lead.source] || 0) + 1
      byStatus[lead.status] = (byStatus[lead.status] || 0) + 1
      if (new Date(lead.created_at) > thirtyDaysAgo) newLeads++
    }

    return NextResponse.json({
      leads,
      audits,
      stats: {
        totalLeads: leads.length,
        newLeads,
        auditSubmissions: audits.length,
        bySource,
        byStatus,
      },
    })
  } catch (err) {
    console.error("dashboard-data error:", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
