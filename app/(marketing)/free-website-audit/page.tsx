import type { Metadata } from "next"
import FreeAuditClient from "./FreeAuditClient"
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd"

export const metadata: Metadata = {
  title: "Free Website Audit — Find Where You're Losing Leads | Kinetic",
  description:
    "We'll audit your website, SEO, and lead funnel. You get a PDF report showing exactly where you're leaking revenue — delivered in 24 hours.",
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
