import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import SheknowmicsPageClient from '@/components/marketing/SheknowmicsPageClient'
import { JsonLd, breadcrumbSchema } from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  title: "Sheknowmics Case Study | Kinetic",
  description:
    "How Kinetic built India's first AI-native women's health platform — from zero to 1,200+ waitlist users.",
  alternates: {
    canonical: "https://buildwithkinetic.org/work/sheknowmics",
  },
  openGraph: {
    title: "Sheknowmics Case Study | Kinetic",
    description:
      "How Kinetic built India's first AI-native women's health platform end to end.",
    url: "https://buildwithkinetic.org/work/sheknowmics",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sheknowmics Case Study | Kinetic",
    description:
      "How Kinetic built India's first AI-native women's health platform — zero to 1,200+ users.",
    creator: "@buildwithkinetic",
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
