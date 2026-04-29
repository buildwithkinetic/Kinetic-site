import type { Metadata } from "next"
import FreeAuditClient from "./FreeAuditClient"
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd"

export const metadata: Metadata = {
  title: "Free Website Audit — Find Where You're Losing Leads | Kinetic",
  description:
    "We'll audit your website, SEO, and lead funnel. You get a PDF report showing exactly where you're leaking revenue — delivered in 24 hours.",
  openGraph: {
    title: "Free Website Audit — Find Where You're Losing Leads",
    description: "PDF report delivered in 24 hours. No commitment.",
    url: "https://buildwithkinetic.org/free-website-audit",
    siteName: "Kinetic",
    images: [{ url: "https://buildwithkinetic.org/og?title=Free+Website+Audit&description=Find+where+you%27re+losing+leads+%E2%80%94+delivered+in+24+hours&type=page", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
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
