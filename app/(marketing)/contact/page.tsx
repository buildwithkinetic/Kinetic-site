import type { Metadata } from "next"
import ContactPageClient from "@/components/marketing/ContactPageClient"
import { JsonLd, localBusinessSchema, breadcrumbSchema } from "@/components/seo/JsonLd"

export const metadata: Metadata = {
  title: "Book a Free Strategy Call | Kinetic — Growth Systems",
  description:
    "Book a free 30-minute strategy call with Ayush Gupta, founder of Kinetic. No pitch, no retainer.",
  keywords: [
    "book free strategy call Kinetic",
    "growth systems consultation",
    "free website audit",
    "AI systems consultation",
    "contact Kinetic",
  ],
  alternates: {
    canonical: "https://buildwithkinetic.org/contact",
  },
  openGraph: {
    title: "Book a Free Strategy Call | Kinetic",
    description:
      "30-minute call, no pitch, no retainer. Tell me about your business and I'll show you the growth system that fits.",
    url: "https://buildwithkinetic.org/contact",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Free Strategy Call | Kinetic",
    description:
      "30-minute call with Ayush. No pitch, no retainer. Book in under 60 seconds.",
    creator: "@buildwithkinetic",
  },
}

export default function ContactPage() {
  return (
    <>
      <JsonLd schema={localBusinessSchema()} />
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", url: "https://buildwithkinetic.org" },
          { name: "Contact", url: "https://buildwithkinetic.org/contact" },
        ])}
      />
      <ContactPageClient />
    </>
  )
}
