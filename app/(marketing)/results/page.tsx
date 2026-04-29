import type { Metadata } from "next"
import ResultsPageClient from "@/components/marketing/ResultsPageClient"
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd"

export const metadata: Metadata = {
  title: "Results — Case Studies & Proof | Kinetic",
  description:
    "Real results from real systems. Sheknowmics: 1,200+ users in 3 weeks, #1 Google rank in 60 days. Core of Fitness: custom CRM, AI chatbot, Meta Ads.",
}

export default function ResultsPage() {
  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", url: "https://buildwithkinetic.org" },
          { name: "Results", url: "https://buildwithkinetic.org/results" },
        ])}
      />
      <ResultsPageClient />
    </>
  )
}
