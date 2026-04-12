import type { Metadata } from "next"
import BookCallClient from "./BookCallClient"

export const metadata: Metadata = {
  title: "Book a Strategy Call | Kinetic",
  description: "Book a free 30-minute strategy call. Tell us about your business, then pick a time. Takes 60 seconds.",
  alternates: {
    canonical: "https://buildwithkinetic.org/book-call",
  },
  robots: { index: false },
  openGraph: {
    title: "Book a Strategy Call | Kinetic",
    description: "Book a free 30-minute strategy call with Kinetic. No pitch, no retainer.",
    url: "https://buildwithkinetic.org/book-call",
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Strategy Call | Kinetic",
    description: "Book a free 30-minute strategy call with Kinetic. No pitch, no retainer.",
    creator: "@buildwithkinetic",
  },
}

export default function BookCallPage() {
  return <BookCallClient />
}
