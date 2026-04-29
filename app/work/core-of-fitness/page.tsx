import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import CoreOfFitnessPageClient from '@/components/marketing/CoreOfFitnessPageClient'
import { JsonLd, breadcrumbSchema } from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  title: "Core of Fitness — Gym Member Acquisition System | Kinetic",
  description:
    "How Kinetic built a custom website, CRM, AI chatbot, and Meta Ads system for Core of Fitness gym. Full case study.",
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
