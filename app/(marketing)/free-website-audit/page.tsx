import type { Metadata } from "next"
import FreeAuditClient from "./FreeAuditClient"

export const metadata: Metadata = {
  title: "Free Website Audit — Get Your Growth Diagnosis in 24 Hours | Kinetic",
  description:
    "Submit your website URL and I'll send a personalised audit covering SEO gaps, conversion issues, and the #1 thing holding your site back from generating leads. Delivered within 24 hours.",
  alternates: {
    canonical: "https://buildwithkinetic.org/free-website-audit",
  },
  openGraph: {
    title: "Free Website Audit | Kinetic",
    description:
      "Get a free, personalised audit of your website — SEO, conversion, and growth opportunities — delivered within 24 hours.",
    url: "https://buildwithkinetic.org/free-website-audit",
  },
}

export default function FreeAuditPage() {
  return <FreeAuditClient />
}
