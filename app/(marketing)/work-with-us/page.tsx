import type { Metadata } from "next"
import WorkWithUsPageClient from "@/components/marketing/WorkWithUsPageClient"
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd"

export const metadata: Metadata = {
  title: "Work With Us — Engagement Tiers & Pricing | Kinetic",
  description:
    "Five engagement tiers from Website & Visibility to Full-Stack Product. Clear scope, clear pricing, clear outcomes.",
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
