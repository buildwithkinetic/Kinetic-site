import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { business_name, email, score, grade, offer_tag, answers_json } = body

    if (!business_name || !email) {
      return NextResponse.json({ error: "Business name and email are required" }, { status: 400 })
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // Insert into audit_submissions table
    const { error: auditError } = await supabase.from("audit_submissions").insert({
      business_name,
      email,
      score,
      grade,
      offer_tag,
      answers_json,
      submitted_at: new Date().toISOString(),
    })

    if (auditError) {
      // Table might not exist yet — log and continue to leads insert
      console.error("audit_submissions insert error (table may not exist yet):", auditError.message)
    }

    // Also insert into leads CRM pipeline
    const { data: profile } = await supabase
      .from("profiles")
      .select("id")
      .limit(1)
      .single()

    if (profile) {
      await supabase.from("leads").insert({
        profile_id: profile.id,
        first_name: business_name,
        email,
        source: "quick-win-audit",
        status: "new",
        notes: `Quick Win Audit submission — Score: ${score}/110 (Grade: ${grade}). Highest-priority offer tag: ${offer_tag}. Answers: ${JSON.stringify(answers_json)}`,
      })
    }

    // Non-blocking audit confirmation email via unified send-booking route
    try {
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
      await fetch(`${baseUrl}/api/send-booking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submissionType: "audit",
          clientName: business_name,
          clientEmail: email,
          businessName: business_name,
          score,
          grade,
          offerTag: offer_tag,
        }),
      })
    } catch {
      // Non-blocking — don't fail the submission
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Audit submission error:", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
