import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const DASHBOARD_TOKEN = process.env.DASHBOARD_TOKEN || "kinetic2025"

export async function PATCH(request: Request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get("token")
  if (token !== DASHBOARD_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 })
  }

  let body: { id: string; status?: string; notes?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  if (!body.id) {
    return NextResponse.json({ error: "Missing lead id" }, { status: 400 })
  }

  const updates: Record<string, string> = {}
  if (body.status !== undefined) updates.status = body.status
  if (body.notes !== undefined) updates.notes = body.notes

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: "Nothing to update" }, { status: 400 })
  }

  const supabase = createClient(supabaseUrl, serviceKey)
  const { data, error } = await supabase
    .from("leads")
    .update(updates)
    .eq("id", body.id)
    .select("id, status, notes")
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true, lead: data })
}
