import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import CoreOfFitnessPageClient from '@/components/marketing/CoreOfFitnessPageClient'
import { JsonLd, breadcrumbSchema } from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  title: "Core of Fitness — Gym Member Acquisition System | Kinetic",
  description:
    "How Kinetic built a custom website, CRM, AI chatbot, and Meta Ads system for Core of Fitness gym. Full case study.",
  openGraph: {
    title: "Core of Fitness — Gym Member Acquisition System",
    description: "Custom website, CRM, AI chatbot, and Meta Ads system. Full case study.",
    url: "https://buildwithkinetic.org/work/core-of-fitness",
    siteName: "Kinetic",
    images: [{ url: "https://buildwithkinetic.org/og-image.png", width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
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
