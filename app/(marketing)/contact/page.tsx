import type { Metadata } from "next"
import ContactPageClient from "@/components/marketing/ContactPageClient"
import { JsonLd, localBusinessSchema, breadcrumbSchema } from "@/components/seo/JsonLd"

export const metadata: Metadata = {
  title: "Contact Kinetic | hello@buildwithkinetic.org",
  description:
    "Get in touch with Kinetic. Email hello@buildwithkinetic.org or fill out the form — we respond within 24 hours.",
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
