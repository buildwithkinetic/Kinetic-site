import type { Metadata } from 'next'
import HomepageClient from '@/components/marketing/HomepageClient'
import { JsonLd, websiteSchema, organizationSchema, localBusinessSchema, faqSchema } from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  title: 'Kinetic | Growth Systems for Businesses & Startups | Kolkata, India',
  description:
    'Kinetic builds growth systems for businesses in India — websites, SEO, CRM, and automation — installed and running before handover.',
  keywords: [
    'growth systems for businesses India',
    'website development Kolkata',
    'digital marketing agency Kolkata',
    'SEO agency Kolkata',
    'lead generation system India',
    'CRM setup for businesses',
    'business automation Kolkata',
    'automated lead capture system',
    'conversion focused website India',
    'website development agency India',
    'business website development',
    'startup website development India',
    'Google Business Profile optimisation Kolkata',
    'automated growth systems',
    'Kinetic growth engineer',
  ],
  alternates: { canonical: 'https://buildwithkinetic.org' },
  openGraph: {
    title: 'Kinetic — Automated Growth Systems for Businesses',
    description:
      'Most agencies build you a website and disappear. Kinetic builds the system, installs it in your business, and makes sure it runs.',
    url: 'https://buildwithkinetic.org',
    siteName: 'Kinetic',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kinetic — Automated Growth Systems for Businesses',
    description:
      'Websites, SEO, CRM, automation — built and handed over running. The system behind your growth.',
    creator: '@buildwithkinetic',
  },
}

export default function HomePage() {
  const homeFaqs = [
    { question: 'How is Kinetic different from a regular web agency?', answer: "Most agencies build a website and hand over the login details. Kinetic builds the complete growth system — website, CRM, automation, and SEO — and installs it running in your business before handover." },
    { question: 'How long does it take to go live?', answer: 'Most systems are live in 2–3 weeks. The Quick Win Audit is delivered in 1 week. The Full Growth System takes up to 4 weeks given its scope.' },
    { question: 'What if I already have a website?', answer: "We audit it, identify exactly what's leaking leads, and either rebuild it or layer the growth system on top — whichever makes more sense for your business." },
    { question: 'Is there a guarantee?', answer: 'Yes. Every offer has a specific performance guarantee. The Visibility Fix: first-page Google ranking in 30 days or I keep working free. Lead Capture System: zero missed leads in 90 days or I fix it free. Full Growth System: 90-day performance guarantee.' },
    { question: 'Do you work with businesses outside Kolkata?', answer: 'Yes — the entire process is remote. Strategy call, build, and handover all happen online. Kinetic works with founders and small businesses across India.' },
  ]

  return (
    <>
      <JsonLd schema={websiteSchema()} />
      <JsonLd schema={organizationSchema()} />
      <JsonLd schema={localBusinessSchema()} />
      <JsonLd schema={faqSchema(homeFaqs)} />
      <HomepageClient />
    </>
  )
}
