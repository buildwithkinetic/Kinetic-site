import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Book a Kinetic Growth Offer | Kinetic",
  description:
    "Book your Kinetic growth offer — Quick Win Audit, Visibility Fix, Lead Capture System, Repeat Revenue Engine, or Full Growth System. Kinetic will contact you within 24 hours to confirm next steps.",
  alternates: {
    canonical: "https://buildwithkinetic.org/book",
  },
  openGraph: {
    title: "Book a Kinetic Growth Offer",
    description:
      "Select your offer, fill in your details, and Kinetic will be in touch within 24 hours to confirm next steps.",
    url: "https://buildwithkinetic.org/book",
  },
}

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
