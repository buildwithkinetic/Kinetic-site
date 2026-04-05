import type { Metadata } from "next"
import AboutPageClient from "@/components/marketing/AboutPageClient"
import { JsonLd, organizationSchema, personSchema, breadcrumbSchema } from "@/components/seo/JsonLd"

export const metadata: Metadata = {
  title: "About Kinetic — Built by Ayush Gupta, Growth Engineer | Kolkata",
  description:
    "Ayush Gupta is a solo growth engineer based in Kolkata. Kinetic builds automated growth systems for small businesses — websites, SEO, CRM, lead capture, and automation — installed and running before handover.",
  keywords: [
    "Ayush Gupta growth engineer Kolkata",
    "Kinetic growth systems founder",
    "digital growth engineer India",
    "solo founder growth agency Kolkata",
    "automated growth systems India",
  ],
  alternates: {
    canonical: "https://buildwithkinetic.org/about",
  },
  openGraph: {
    title: "About Kinetic — Built by Ayush Gupta, Growth Engineer | Kolkata",
    description:
      "Solo growth engineer. Kinetic builds the full system — websites, SEO, CRM, automation — and hands it over running.",
    url: "https://buildwithkinetic.org/about",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Kinetic — Built by Ayush Gupta, Growth Engineer",
    description:
      "Solo growth engineer based in Kolkata. Kinetic installs automated growth systems in small businesses.",
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
