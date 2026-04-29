import type { Metadata } from "next"
import SystemPageClient from "@/components/marketing/SystemPageClient"
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd"

export const metadata: Metadata = {
  title: "Industry Systems — Gym OS, Cafe OS & More | Kinetic",
  description:
    "Pre-built growth systems for specific industries. Kinetic Gym OS is live. Cafe OS coming soon. Plug in and run.",
}

export default function SystemPage() {
  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", url: "https://buildwithkinetic.org" },
          { name: "Industry Systems", url: "https://buildwithkinetic.org/lead-generation-system" },
        ])}
      />
      <SystemPageClient />
    </>
  )
}
