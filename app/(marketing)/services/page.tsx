import type { Metadata } from "next"
import Navbar from "@/components/Navbar"
import ServicesPageClient from "@/components/marketing/ServicesPageClient"
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd"

export const metadata: Metadata = {
  title: "Growth Offers — Websites, CRM & Automation for Small Businesses | Kinetic",
  description:
    "5 outcome-driven growth offers for small businesses: visibility, lead capture, repeat revenue, full growth system, and quick-win audit.",
  alternates: {
    canonical: "https://buildwithkinetic.org/services",
  },
  openGraph: {
    title: "Growth Offers | Kinetic",
    description:
      "5 specific, outcome-driven offers — The Visibility Fix, Lead Capture System, Repeat Revenue Engine, Full Growth System, Quick Win Audit. Built and installed for you.",
    url: "https://buildwithkinetic.org/services",
  },
}

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", url: "https://buildwithkinetic.org" },
          { name: "Services", url: "https://buildwithkinetic.org/services" },
        ])}
      />

      <main className="bg-[#EDEAE3] min-h-screen text-[#0F0E0C]">
        <Navbar />
        <ServicesPageClient />
      </main>
    </>
  )
}
