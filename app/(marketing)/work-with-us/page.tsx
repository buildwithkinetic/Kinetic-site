import type { Metadata } from "next"
import WorkWithUsPageClient from "@/components/marketing/WorkWithUsPageClient"

export const metadata: Metadata = {
  title: "Work With Us | Kinetic",
  description:
    "Four levels of growth system capability. From starter visibility to full enterprise infrastructure. Each tier is a complete system — not a list of services.",
  alternates: {
    canonical: "https://buildwithkinetic.org/work-with-us",
  },
  openGraph: {
    title: "Work With Us | Kinetic",
    description:
      "Not services. Levels of system capability. Pick the system that matches where your business is and where you want to go.",
    url: "https://buildwithkinetic.org/work-with-us",
  },
}

export default function WorkWithUsPage() {
  return <WorkWithUsPageClient />
}
