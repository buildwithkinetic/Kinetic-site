import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import SheknowmicsPageClient from '@/components/marketing/SheknowmicsPageClient'
import { JsonLd, breadcrumbSchema } from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  title: "Sheknowmics — From Zero to #1 Google Rank in 60 Days | Kinetic",
  description:
    "How Kinetic took Sheknowmics from zero digital presence to 1,200+ users, #1 Google ranking, and sub-60s lead response in 90 days.",
  openGraph: {
    title: "Sheknowmics — From Zero to #1 Google Rank in 60 Days",
    description: "1,200+ users, #1 Google rank, sub-60s lead response. 90 days from zero to live.",
    url: "https://buildwithkinetic.org/work/sheknowmics",
    siteName: "Kinetic",
    images: [{ url: "https://buildwithkinetic.org/og-image.png", width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
}

export default function SheknowmicsCaseStudy() {
  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", url: "https://buildwithkinetic.org" },
          { name: "Work", url: "https://buildwithkinetic.org/work" },
          { name: "Sheknowmics", url: "https://buildwithkinetic.org/work/sheknowmics" },
        ])}
      />
      <main style={{ background: "var(--bg)" }} className="min-h-screen text-[#0F0E0C]">
        <Navbar />
        <SheknowmicsPageClient />
      </main>
    </>
  )
}
