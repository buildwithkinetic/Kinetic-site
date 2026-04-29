import type { Metadata } from "next"
import AboutPageClient from "@/components/marketing/AboutPageClient"
import { JsonLd, organizationSchema, personSchema, breadcrumbSchema } from "@/components/seo/JsonLd"

export const metadata: Metadata = {
  title: "About Ayush Gupta — Founder & Growth Engineer | Kinetic",
  description:
    "Kinetic is built by Ayush Gupta — full-stack engineer and growth systems builder. No account managers, no juniors. You work directly with the founder.",
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
