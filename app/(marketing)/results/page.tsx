import type { Metadata } from "next"
import ResultsPageClient from "@/components/marketing/ResultsPageClient"
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd"

export const metadata: Metadata = {
  title: "Results — Real Growth Metrics | Kinetic",
  description:
    "Real results from real businesses. See how Kinetic's growth systems generate leads and create measurable revenue growth.",
  alternates: {
    canonical: "https://buildwithkinetic.org/results",
  },
  openGraph: {
    title: "Results | Kinetic",
    description:
      "No stock photos. No fabricated metrics. Real results from Kinetic-installed growth systems.",
    url: "https://buildwithkinetic.org/results",
  },
  twitter: {
    card: "summary_large_image",
    title: "Results | Kinetic",
    description:
      "Real results from Kinetic-installed growth systems. No fabricated metrics.",
    creator: "@buildwithkinetic",
  },
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
