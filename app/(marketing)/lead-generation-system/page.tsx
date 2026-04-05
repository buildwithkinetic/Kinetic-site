import type { Metadata } from "next"
import SystemPageClient from "@/components/marketing/SystemPageClient"

export const metadata: Metadata = {
  title: "The Growth System | Kinetic",
  description:
    "Five interconnected layers: acquisition, conversion, management, automation, and retention. This is the system Kinetic builds and installs in your business.",
  alternates: {
    canonical: "https://buildwithkinetic.org/lead-generation-system",
  },
  openGraph: {
    title: "The Growth System | Kinetic",
    description:
      "Not marketing. Growth infrastructure. See how each layer works together to generate, capture, and convert leads automatically.",
    url: "https://buildwithkinetic.org/lead-generation-system",
  },
}

export default function SystemPage() {
  return <SystemPageClient />
}
