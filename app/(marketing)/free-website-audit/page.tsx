import type { Metadata } from "next"
import FreeAuditClient from "./FreeAuditClient"
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd"

export const metadata: Metadata = {
  title: "Free Website Audit | Kinetic",
  description:
    "Get a free website audit covering SEO gaps, conversion issues, and growth opportunities. Delivered within 24 hours.",
  alternates: {
    canonical: "https://buildwithkinetic.org/free-website-audit",
  },
  openGraph: {
    title: "Free Website Audit | Kinetic",
    description:
      "Get a free, personalised audit of your website — SEO, conversion, and growth opportunities — delivered within 24 hours.",
    url: "https://buildwithkinetic.org/free-website-audit",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Website Audit | Kinetic",
    description:
      "Free website audit covering SEO, conversion, and growth. Delivered in 24 hours.",
    creator: "@buildwithkinetic",
  },
}

export default function FreeAuditPage() {
  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", url: "https://buildwithkinetic.org" },
          { name: "Free Website Audit", url: "https://buildwithkinetic.org/free-website-audit" },
        ])}
      />
      <FreeAuditClient />
    </>
  )
}
