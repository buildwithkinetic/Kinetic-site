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

    // Try full enriched insert first
    let insertError = null

    const fullInsert = await supabase.from('leads').insert({
      name: name.trim(),
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

    insertError = fullInsert.error

    // If enriched insert fails (columns not yet migrated), fall back to core columns only
    if (insertError) {
      console.warn('Full insert failed, trying core insert. Error:', insertError.message)

      const coreInsert = await supabase.from('leads').insert({
        name: name.trim(),
        email,
      })

      if (coreInsert.error) {
        console.error('Core insert also failed:', coreInsert.error.message)
        return NextResponse.json({ error: coreInsert.error.message }, { status: 500 })
      }

      // Core insert succeeded — proceed (email still fires)
      console.log('Core insert succeeded. Run migration 002 to capture enriched fields.')
    }

    // Fire welcome email (non-blocking — never block the response on this)
    try {
      const firstName = name.trim().split(' ')[0]
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://buildwithkinetic.org'
      await fetch(`${baseUrl}/api/send-welcome`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: firstName, email, source: source || 'website' }),
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
