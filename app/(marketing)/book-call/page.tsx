import type { Metadata } from "next"
import BookCallClient from "./BookCallClient"

export const metadata: Metadata = {
  title: "Book a Strategy Call — Kinetic",
  description: "Tell us about your business first, then pick a time. Takes 60 seconds.",
  robots: { index: false },
}

export default function BookCallPage() {
  return <BookCallClient />
}
