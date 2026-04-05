// Environment variables used:
// NEXT_PUBLIC_SUPABASE_URL
// NEXT_PUBLIC_SUPABASE_ANON_KEY
//
// leads table schema:
//   id          uuid primary key default gen_random_uuid()
//   name        text
//   email       text
//   phone       text
//   message     text
//   source      text default 'kinetic-website'
//   created_at  timestamptz default now()

function requireEnv(key: string): string {
  const value = process.env[key]
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
  return value
}

const supabaseUrl = requireEnv('NEXT_PUBLIC_SUPABASE_URL')
const supabaseAnonKey = requireEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY')

export interface Lead {
  name: string
  email: string
  phone?: string
  message?: string
  source: 'kinetic-website'
}

export async function insertLead(lead: Lead): Promise<void> {
  const response = await fetch(`${supabaseUrl}/rest/v1/leads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${supabaseAnonKey}`,
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(lead),
  })

  if (!response.ok) {
    throw new Error(`Supabase insert failed: ${response.status} ${response.statusText}`)
  }
}
