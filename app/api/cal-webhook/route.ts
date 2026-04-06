import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"
import { Resend } from "resend"

// Cal.com sends webhook events for: BOOKING_CREATED, BOOKING_RESCHEDULED,
// BOOKING_CANCELLED, BOOKING_COMPLETED
// Docs: https://cal.com/docs/core-features/webhooks

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { triggerEvent, payload } = body

    // Only process new bookings
    if (triggerEvent !== "BOOKING_CREATED") {
      return NextResponse.json({ received: true, action: "ignored", event: triggerEvent })
    }

    const {
      attendees,
      title,
      startTime,
      endTime,
      uid,
      description,
      location,
    } = payload

    // Attendees[0] is the person booking (not the host)
    const attendee = attendees?.find((a: { email: string; name: string }) => !a.email?.includes("buildwithkinetic")) || attendees?.[0]
    const name = attendee?.name || "Unknown"
    const email = attendee?.email || ""
    const nameParts = name.trim().split(" ")
    const firstName = nameParts[0]
    const lastName = nameParts.slice(1).join(" ") || null

    if (!email) {
      return NextResponse.json({ received: true, action: "skipped", reason: "no email" })
    }

    // ── Log to Supabase ────────────────────────────────────────────────────────
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (supabaseUrl && serviceKey) {
      const supabase = createClient(supabaseUrl, serviceKey)

      // Insert into leads table
      const { error: leadError } = await supabase.from("leads").insert({
        first_name: firstName,
        last_name: lastName,
        email,
        source: "cal-booking",
        status: "new",
        notes: `Cal.com booking: ${title || "Strategy Call"} | Scheduled: ${startTime ? new Date(startTime).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) : "TBC"} | Meeting UID: ${uid || ""}${description ? " | Notes: " + description : ""}`,
      })

      if (leadError) {
        console.error("leads insert error:", leadError.message)
      }

      // Log to submissions table
      const { error: submissionError } = await supabase.from("submissions").insert({
        type: "booking",
        client_name: name,
        client_email: email,
        offer_name: title || "Strategy Call",
        notes: description || null,
        submitted_at: new Date().toISOString(),
      })
      if (submissionError) console.error("submissions log error:", submissionError.message)
    }

    // ── Notify Ayush ───────────────────────────────────────────────────────────
    const resendKey = process.env.RESEND_API_KEY
    const ayushEmail = process.env.KINETIC_EMAIL || "ayushguptayush21@gmail.com"

    if (resendKey) {
      const resend = new Resend(resendKey)
      const bookingTime = startTime
        ? new Date(startTime).toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })
        : "TBC"

      await resend.emails.send({
        from: "Kinetic Bookings <bookings@buildwithkinetic.org>",
        to: ayushEmail,
        subject: `📅 New Cal.com booking — ${name}`,
        html: `
          <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:32px;background:#0F0E0C;color:#F5F0E8;border-radius:12px;">
            <div style="font-size:22px;font-weight:700;color:#C8440A;margin-bottom:4px;">New Booking</div>
            <div style="font-size:13px;color:#6B6560;margin-bottom:28px;">via Cal.com → Kinetic</div>
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:10px 0;border-bottom:1px solid #1A1916;color:#9E9890;font-size:13px;width:130px;">Name</td><td style="padding:10px 0;border-bottom:1px solid #1A1916;font-size:14px;font-weight:600;">${name}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #1A1916;color:#9E9890;font-size:13px;">Email</td><td style="padding:10px 0;border-bottom:1px solid #1A1916;font-size:14px;"><a href="mailto:${email}" style="color:#3B82F6;">${email}</a></td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #1A1916;color:#9E9890;font-size:13px;">Meeting</td><td style="padding:10px 0;border-bottom:1px solid #1A1916;font-size:14px;">${title || "Strategy Call"}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #1A1916;color:#9E9890;font-size:13px;">Time (IST)</td><td style="padding:10px 0;border-bottom:1px solid #1A1916;font-size:14px;color:#10B981;font-weight:600;">${bookingTime}</td></tr>
              ${description ? `<tr><td style="padding:10px 0;color:#9E9890;font-size:13px;vertical-align:top;">Notes</td><td style="padding:10px 0;font-size:13px;color:#9E9890;">${description}</td></tr>` : ""}
            </table>
            <div style="margin-top:24px;padding:16px;background:#1A1916;border-radius:8px;font-size:12px;color:#6B6560;">
              This lead has been automatically logged to your <a href="https://buildwithkinetic.org/dashboard?token=kinetic2025" style="color:#C8440A;">Kinetic dashboard</a>.
            </div>
          </div>
        `,
      }).catch((e: unknown) => console.error("Ayush notification failed:", e))
    }

    return NextResponse.json({ received: true, action: "logged", email })
  } catch (err) {
    console.error("cal-webhook error:", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
