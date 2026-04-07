import type { Metadata } from "next"
import Navbar from "@/components/Navbar"
import ServicesPageClient from "@/components/marketing/ServicesPageClient"
import { JsonLd, breadcrumbSchema, faqSchema, localBusinessSchema } from "@/components/seo/JsonLd"

export const metadata: Metadata = {
  title: "Growth Offers — Websites, CRM & Automation for Businesses | Kinetic",
  description:
    "5 outcome-driven growth offers for small businesses in India: The Visibility Fix (\u20b925k), Lead Capture System (\u20b940k), Repeat Revenue Engine (\u20b930k), Full Growth System (\u20b975k), Quick Win Audit (\u20b98k). All built and installed for you.",
  keywords: [
    "growth offers for businesses India",
    "website development packages India",
    "SEO packages Kolkata",
    "lead generation system price India",
    "CRM automation package",
    "digital marketing packages Kolkata",
    "The Visibility Fix",
    "Lead Capture System",
    "Repeat Revenue Engine",
    "Full Growth System",
    "Quick Win Audit",
    "business automation price India",
  ],
  alternates: {
    canonical: "https://buildwithkinetic.org/services",
  },
  openGraph: {
    title: "Growth Offers — Websites, CRM & Automation for Businesses | Kinetic",
    description:
      "5 specific, outcome-driven offers starting at \u20b98,000 — built and installed for your business. No retainers. No ambiguity.",
    url: "https://buildwithkinetic.org/services",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "5 Growth Offers for Businesses | Kinetic",
    description:
      "Visibility Fix, Lead Capture System, Repeat Revenue Engine, Full Growth System, Quick Win Audit. Starting at \u20b98,000.",
    creator: "@buildwithkinetic",
  },
}

const serviceFAQs = [
  {
    question: "What does Kinetic actually build for my business?",
    answer:
      "Kinetic builds end-to-end growth systems — not just websites. Depending on your offer, this could include an SEO-optimised website, Google Business Profile setup, an automated lead capture and CRM system, review automation, and AI-powered follow-up flows. Everything is installed and running before handover.",
  },
  {
    question: "How much does it cost to work with Kinetic?",
    answer:
      "Kinetic offers 5 fixed-price packages: The Visibility Fix (\u20b925,000), The Lead Capture System (\u20b940,000), The Repeat Revenue Engine (\u20b930,000), The Full Growth System (\u20b975,000), and The Quick Win Audit (\u20b98,000). All prices are one-time — no retainers.",
  },
  {
    question: "How long does it take to go live?",
    answer:
      "Most systems are live within 2–3 weeks. The Quick Win Audit is delivered in 1 week. The Full Growth System takes up to 4 weeks given the scope.",
  },
  {
    question: "Is there a guarantee?",
    answer:
      "Yes. Each offer has a specific guarantee: The Visibility Fix guarantees first-page Google ranking within 30 days or continued work at no extra charge. The Lead Capture System guarantees no missed leads in 90 days or it gets fixed free. The Full Growth System has a 90-day performance guarantee.",
  },
  {
    question: "Do you work with businesses outside Kolkata?",
    answer:
      "Yes. Kinetic works with small businesses and startups across India. The entire process is remote — strategy call, build, and handover all happen online.",
  },
]

export default function ServicesPage() {
  return (
    <>
      <JsonLd schema={localBusinessSchema()} />
      <JsonLd schema={faqSchema(serviceFAQs)} />
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", url: "https://buildwithkinetic.org" },
          { name: "Growth Offers", url: "https://buildwithkinetic.org/services" },
        ])}
      />

      <main className="bg-[#EDEAE3] min-h-screen text-[#0F0E0C]">
        <Navbar />
        <ServicesPageClient />
      </main>
    </>
  )
}
