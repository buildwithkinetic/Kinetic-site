import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import SheknowmicsPageClient from '@/components/marketing/SheknowmicsPageClient'

export const metadata: Metadata = {
  title: "Sheknowmics Case Study | AI Women's Health Platform — Kinetic",
  description:
    "How Kinetic built India's first AI-native women's health platform — cycle intelligence, home diagnostics, doctor consultations, and AI risk prediction.",
  alternates: {
    canonical: "https://buildwithkinetic.org/work/sheknowmics",
  },
  openGraph: {
    title: "Sheknowmics Case Study | Kinetic",
    description:
      "How Kinetic built India's first AI-native women's health platform end to end — from zero to a full-stack product with 1,200+ waitlist users.",
    url: "https://buildwithkinetic.org/work/sheknowmics",
  },
}

export default function SheknowmicsCaseStudy() {
  return (
    <main style={{ background: "var(--bg)" }} className="min-h-screen text-[#0F0E0C]">
      <Navbar />
      <SheknowmicsPageClient />
    </main>
  )
}
