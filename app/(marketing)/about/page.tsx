import type { Metadata } from "next"
import AboutPageClient from "@/components/marketing/AboutPageClient"
import { JsonLd, organizationSchema, breadcrumbSchema } from "@/components/seo/JsonLd"

export const metadata: Metadata = {
  title: "About | Kinetic",
  description:
    "Kinetic is a digital growth engineering studio. We build websites, web apps, and automation systems that help businesses generate leads and grow revenue.",
  alternates: {
    canonical: "https://buildwithkinetic.org/about",
  },
  openGraph: {
    title: "About | Kinetic",
    description:
      "Kinetic builds conversion-focused digital systems for startups, service businesses, and founders who want to grow.",
    url: "https://buildwithkinetic.org/about",
  },
}

export default function AboutPage() {
  return (
    <>
      <JsonLd schema={organizationSchema()} />
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
