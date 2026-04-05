import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { clientBookingConfirmedHtml } from '@/lib/emails/client-booking-confirmed'
import { clientDiscoveryConfirmedHtml } from '@/lib/emails/client-discovery-confirmed'
import { clientAuditConfirmedHtml } from '@/lib/emails/client-audit-confirmed'
import { ayushNewSubmissionHtml } from '@/lib/emails/ayush-new-submission'

/*
  Supabase SQL — run once to create the submissions log table:

  CREATE TABLE IF NOT EXISTS submissions (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type         TEXT NOT NULL,           -- 'booking' | 'discovery' | 'audit'
    client_name  TEXT,
    business_name TEXT,
    client_email TEXT NOT NULL,
    client_phone TEXT,
    city         TEXT,
    offer_name   TEXT,
    website_url  TEXT,
    score        INTEGER,
    grade        TEXT,
    offer_tag    TEXT,
    notes        TEXT,
    submitted_at TIMESTAMPTZ DEFAULT NOW()
  );
*/

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const body = await req.json()
    const {
      submissionType,       // 'booking' | 'discovery' | 'audit'
      // ── shared fields ──────────────────────────────
      clientName,
      businessName,
      clientEmail,
      clientPhone,
      city,
      offerName,
      websiteUrl,
      challenge,
      // ── discovery-specific ─────────────────────────
      buildTypes,
      integrations,
      budget,
      timeline,
      description,
      // ── audit-specific ─────────────────────────────
      score,
      grade,
      offerTag,
    } = body

    const type: 'booking' | 'discovery' | 'audit' = submissionType || 'booking'
    const ayushEmail = process.env.KINETIC_EMAIL || 'ayushguptayush21@gmail.com'
    const name = clientName || businessName || 'there'
    const email = clientEmail

    // ── Validation ──────────────────────────────────────────────────────────────
    if (!email) {
      return NextResponse.json({ success: false, error: 'Email is required' }, { status: 400 })
    }
    if (type === 'booking' && (!clientName || !businessName)) {
      return NextResponse.json({ success: false, error: 'Name and business name are required' }, { status: 400 })
    }
    if (type === 'discovery' && (!clientName || !businessName)) {
      return NextResponse.json({ success: false, error: 'Name and business name are required' }, { status: 400 })
    }

    // ── Build client email ───────────────────────────────────────────────────────
    let clientSubject = 'Your Kinetic submission is confirmed'
    let clientHtml = ''

    if (type === 'booking') {
      clientSubject = `Booking received — ${offerName || 'Kinetic'}`
      clientHtml = clientBookingConfirmedHtml({
        clientName: name,
        businessName: businessName || '',
        offerName: offerName || '',
        websiteUrl: websiteUrl || '',
        challenge: challenge || '',
      })
    } else if (type === 'discovery') {
      clientSubject = 'Discovery call request received — Kinetic'
      clientHtml = clientDiscoveryConfirmedHtml({
        clientName: name,
        businessName: businessName || '',
        buildTypes: buildTypes || '',
        budget: budget || '',
        timeline: timeline || '',
      })
    } else if (type === 'audit') {
      clientSubject = `Your Digital Health Score: ${score ?? '?'}/110 — Kinetic`
      clientHtml = clientAuditConfirmedHtml({
        clientName: name,
        email,
        score: Number(score) || 0,
        grade: grade || '?',
        offerTag: offerTag || '',
      })
    }

    // ── Send client confirmation ─────────────────────────────────────────────────
    const clientResult = await resend.emails.send({
      from: 'Kinetic <bookings@buildwithkinetic.org>',
      to: email,
      subject: clientSubject,
      html: clientHtml,
    })

    if (clientResult.error) {
      console.error('Client email failed:', clientResult.error)
      return NextResponse.json({ success: false, error: 'Failed to send confirmation email' }, { status: 500 })
    }

    // ── Log to Supabase submissions table (non-blocking) ─────────────────────────
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      )
      await supabase.from('submissions').insert({
        type,
        client_name: name,
        business_name: businessName || null,
        client_email: email,
        client_phone: clientPhone || null,
        city: city || null,
        offer_name: offerName || null,
        website_url: websiteUrl || null,
        score: score !== undefined ? Number(score) : null,
        grade: grade || null,
        offer_tag: offerTag || null,
        notes: description || challenge || null,
        submitted_at: new Date().toISOString(),
      })
    } catch (err) {
      // Non-blocking — email already sent, don't fail the request
      console.error('Supabase submissions log error:', err)
    }

    // ── Build Ayush notification ─────────────────────────────────────────────────
    const ayushSubjectMap: Record<string, string> = {
      booking: `🔔 New booking — ${name} — ${offerName || 'Unknown offer'}`,
      discovery: `📞 Discovery call request — ${name} — ${businessName || ''}`,
      audit: `📊 Audit quiz — ${name} — Score ${score}/110`,
    }

    const ayushHtml = ayushNewSubmissionHtml({
      submissionType: type,
      clientName: name,
      businessName: businessName || '',
      clientEmail: email,
      clientPhone: clientPhone || '',
      city: city || '',
      offerName: offerName || '',
      websiteUrl: websiteUrl || '',
      challenge: challenge || '',
      buildTypes: buildTypes || '',
      integrations: integrations || '',
      budget: budget || '',
      timeline: timeline || '',
      description: description || '',
      score: score !== undefined ? Number(score) : undefined,
      grade: grade || '',
      offerTag: offerTag || '',
    })

    // Non-blocking — don't fail if Ayush's notification fails
    resend.emails.send({
      from: 'Kinetic Bookings <bookings@buildwithkinetic.org>',
      to: ayushEmail,
      subject: ayushSubjectMap[type] || `New Kinetic submission — ${name}`,
      html: ayushHtml,
    }).catch((err: unknown) => {
      console.error('Ayush notification email failed:', err)
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Send booking API error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
