import type { Metadata } from 'next'
import HomepageClient from '@/components/marketing/HomepageClient'
import { JsonLd, websiteSchema, organizationSchema, localBusinessSchema } from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  title: 'Kinetic — Automated Growth Systems for Small Businesses | Kolkata',
  description:
    'Kinetic builds automated growth systems for small businesses in India — websites, SEO, CRM, lead capture, and automation — installed and running before handover. Based in Kolkata.',
  keywords: [
    'growth systems for small businesses India',
    'website development Kolkata',
    'digital marketing agency Kolkata',
    'SEO agency Kolkata',
    'lead generation system India',
    'CRM setup small business',
    'business automation Kolkata',
    'automated lead capture system',
    'conversion focused website India',
    'website development agency India',
    'small business website development',
    'startup website development India',
    'Google Business Profile optimisation Kolkata',
    'automated growth systems',
    'Kinetic growth engineer',
  ],
  alternates: { canonical: 'https://buildwithkinetic.org' },
  openGraph: {
    title: 'Kinetic — Automated Growth Systems for Small Businesses',
    description:
      'Most agencies build you a website and disappear. Kinetic builds the system, installs it in your business, and makes sure it runs.',
    url: 'https://buildwithkinetic.org',
    siteName: 'Kinetic',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kinetic — Automated Growth Systems for Small Businesses',
    description:
      'Websites, SEO, CRM, automation — built and handed over running. The system behind your growth.',
    creator: '@buildwithkinetic',
  },
}

export default function HomePage() {
  return (
    <>
      <JsonLd schema={websiteSchema()} />
      <JsonLd schema={organizationSchema()} />
      <JsonLd schema={localBusinessSchema()} />
      <HomepageClient />
    </>
  )
}
