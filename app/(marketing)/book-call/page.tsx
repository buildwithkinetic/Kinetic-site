import type { Metadata } from "next"
import BookCallClient from "./BookCallClient"

export const metadata: Metadata = {
  title: "Book a Strategy Call | Kinetic",
  description:
    "30 minutes. No pitch. No hard sell. Walk away with a clear growth plan for your business — whether we work together or not.",
  openGraph: {
    title: "Book a Strategy Call | Kinetic",
    description: "30 minutes. No pitch. Walk away with a clear growth plan.",
    url: "https://buildwithkinetic.org/book-call",
    siteName: "Kinetic",
    images: [{ url: "https://buildwithkinetic.org/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
}

export default function BookCallPage() {
  return <BookCallClient />
}
