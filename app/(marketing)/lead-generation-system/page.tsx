import type { Metadata } from "next"
import SystemPageClient from "@/components/marketing/SystemPageClient"
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd"

export const metadata: Metadata = {
  title: "Industry Systems | Kinetic",
  description:
    "Pre-built growth systems for your industry — installed end to end. Explore the Kinetic Systems Catalogue.",
  alternates: {
    canonical: "https://buildwithkinetic.org/lead-generation-system",
  },
  openGraph: {
    title: "Industry Systems | Kinetic",
    description:
      "Not custom. Not generic. Pre-built for your industry, installed into your business — end to end.",
    url: "https://buildwithkinetic.org/lead-generation-system",
  },
  twitter: {
    card: "summary_large_image",
    title: "Industry Systems | Kinetic",
    description:
      "Pre-built growth systems for your industry, installed end to end.",
    creator: "@buildwithkinetic",
  },
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
