import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const {
      name,
      email,
      phone,
      company,
      website,
      industry,
      city,
      service_interest,
      budget_range,
      message,
      source,
      utm_source,
      utm_medium,
      utm_campaign,
    } = await request.json()

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const nameParts = name.trim().split(' ')
    const firstName = nameParts[0]
    const lastName = nameParts.slice(1).join(' ') || null

    const { error: insertError } = await supabase.from('leads').insert({
      first_name: firstName,
      last_name: lastName,
      email,
      phone: phone || null,
      company: company || null,
      website: website || null,
      industry: industry || null,
      city: city || null,
      service_interest: service_interest || null,
      budget_range: budget_range || null,
      source: source || 'website',
      status: 'new',
      notes: message || null,
      utm_source: utm_source || null,
      utm_medium: utm_medium || null,
      utm_campaign: utm_campaign || null,
    })

    if (insertError) {
      console.error('Insert error:', insertError)
      return NextResponse.json({ error: insertError.message }, { status: 500 })
    }

    // Fire welcome email (non-blocking — don't fail if email fails)
    try {
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
      await fetch(`${baseUrl}/api/send-welcome`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: firstName, email }),
      })
    } catch (emailErr) {
      console.error('Welcome email failed (non-blocking):', emailErr)
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('Unexpected error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
