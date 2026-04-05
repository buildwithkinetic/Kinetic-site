import type { Metadata } from "next"
import ResultsPageClient from "@/components/marketing/ResultsPageClient"

export const metadata: Metadata = {
  title: "Results | Kinetic",
  description:
    "Real results from real businesses. See how Kinetic's growth systems generate leads, increase visibility, and create measurable revenue growth.",
  alternates: {
    canonical: "https://buildwithkinetic.org/results",
  },
  openGraph: {
    title: "Results | Kinetic",
    description:
      "No stock photos. No fabricated metrics. Real results from Kinetic-installed growth systems.",
    url: "https://buildwithkinetic.org/results",
  },
}

export default function ResultsPage() {
  return <ResultsPageClient />
}
