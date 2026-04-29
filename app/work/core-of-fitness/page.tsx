import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import CoreOfFitnessPageClient from '@/components/marketing/CoreOfFitnessPageClient'
import { JsonLd, breadcrumbSchema } from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  title: "Core of Fitness Case Study | Kinetic",
  description:
    "How Kinetic built a 5-layer member acquisition system for Core of Fitness — conversion website, lead pipeline, WhatsApp automation, dead lead reactivation, and an AI booking agent. Live in 4 weeks.",
  alternates: {
    canonical: "https://buildwithkinetic.org/work/core-of-fitness",
  },
  openGraph: {
    title: "Core of Fitness Case Study | Kinetic",
    description:
      "How Kinetic built a complete gym member acquisition system — live in 4 weeks.",
    url: "https://buildwithkinetic.org/work/core-of-fitness",
  },
  twitter: {
    card: "summary_large_image",
    title: "Core of Fitness Case Study | Kinetic",
    description:
      "5-layer gym member acquisition system — website, CRM, WhatsApp automation, AI agent. Live in 4 weeks.",
    creator: "@buildwithkinetic",
  },
}

export default function CoreOfFitnessCaseStudy() {
  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", url: "https://buildwithkinetic.org" },
          { name: "Work", url: "https://buildwithkinetic.org/results" },
          { name: "Core of Fitness", url: "https://buildwithkinetic.org/work/core-of-fitness" },
        ])}
      />
      <main style={{ background: "var(--bg)" }} className="min-h-screen">
        <Navbar />
        <CoreOfFitnessPageClient />
      </main>
    </>
  )
}
