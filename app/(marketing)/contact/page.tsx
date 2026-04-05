import type { Metadata } from "next"
import ContactPageClient from "@/components/marketing/ContactPageClient"

export const metadata: Metadata = {
  title: "Contact | Kinetic",
  description:
    "Book a free 30-minute strategy call with the Kinetic team. Tell us about your business and we'll design the growth system that fits. Response within 24 hours.",
  alternates: {
    canonical: "https://buildwithkinetic.org/contact",
  },
  openGraph: {
    title: "Contact | Kinetic",
    description:
      "Book a free strategy call. Tell us about your business and we'll show you exactly how to generate more leads from your website.",
    url: "https://buildwithkinetic.org/contact",
  },
}

export default function ContactPage() {
  return <ContactPageClient />
}
