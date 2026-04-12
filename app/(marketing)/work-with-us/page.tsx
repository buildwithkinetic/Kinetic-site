import type { Metadata } from "next"
import WorkWithUsPageClient from "@/components/marketing/WorkWithUsPageClient"
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd"

export const metadata: Metadata = {
  title: "Work With Us — Growth System Tiers | Kinetic",
  description:
    "Four tiers of growth system capability. From starter visibility to full enterprise infrastructure. Each tier is a complete system.",
  alternates: {
    canonical: "https://buildwithkinetic.org/work-with-us",
  },
  openGraph: {
    title: "Work With Us | Kinetic",
    description:
      "Not services. Levels of system capability. Pick the system that matches where your business is.",
    url: "https://buildwithkinetic.org/work-with-us",
  },
  twitter: {
    card: "summary_large_image",
    title: "Work With Us | Kinetic",
    description:
      "Four tiers of growth system capability. Pick the system that matches your business.",
    creator: "@buildwithkinetic",
  },
}

export default function WorkWithUsPage() {
  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", url: "https://buildwithkinetic.org" },
          { name: "Work With Us", url: "https://buildwithkinetic.org/work-with-us" },
        ])}
      />
      <WorkWithUsPageClient />
    </>
  )
}
