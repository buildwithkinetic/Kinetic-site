import type { Metadata } from "next"
import AboutPageClient from "@/components/marketing/AboutPageClient"
import { JsonLd, organizationSchema, personSchema, breadcrumbSchema } from "@/components/seo/JsonLd"

export const metadata: Metadata = {
  title: "About Kinetic — Built by Ayush Gupta, Founder",
  description:
    "Ayush Gupta is the founder of Kinetic — a company that builds websites, full stack apps, custom software, AI marketing systems, AI agents, and AI chatbots for businesses in India.",
  keywords: [
    "Ayush Gupta Kinetic founder",
    "Kinetic automated growth systems",
    "website and app development",
    "AI agents and chatbots for founders",
    "custom software development",
    "AI-driven marketing",
  ],
  alternates: {
    canonical: "https://buildwithkinetic.org/about",
  },
  openGraph: {
    title: "About Kinetic — Built by Ayush Gupta",
    description:
      "Websites, apps, custom software, AI marketing, AI agents, and chatbots — built to production standard and handed over running.",
    url: "https://buildwithkinetic.org/about",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Kinetic — Built by Ayush Gupta",
    description:
      "Kinetic builds websites, apps, custom software, AI marketing, AI agents, and chatbots for businesses in India.",
    creator: "@buildwithkinetic",
  },
}

export default function AboutPage() {
  return (
    <>
      <JsonLd schema={organizationSchema()} />
      <JsonLd schema={personSchema()} />
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", url: "https://buildwithkinetic.org" },
          { name: "About", url: "https://buildwithkinetic.org/about" },
        ])}
      />

      <main className="min-h-screen text-[#0F0E0C]" style={{ background: "var(--bg)" }}>
        <AboutPageClient />
      </main>
    </>
  )
}
