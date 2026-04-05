import type { Metadata } from 'next'
import HomepageClient from '@/components/marketing/HomepageClient'

export const metadata: Metadata = {
  title: 'Kinetic — The System Behind Your Growth | Kolkata',
  description: 'Kinetic builds digital growth systems for small businesses — websites, SEO, CRM, automation, and lead capture — installed and running before handover.',
  alternates: { canonical: 'https://buildwithkinetic.org' },
  openGraph: {
    title: 'Kinetic — The System Behind Your Growth',
    description: 'We build systems that generate, capture, and convert leads automatically.',
    url: 'https://buildwithkinetic.org',
    siteName: 'Kinetic',
    locale: 'en_IN',
    type: 'website',
  },
}

export default function HomePage() {
  return <HomepageClient />
}
