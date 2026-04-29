import type { Metadata } from "next"
import BookCallClient from "./BookCallClient"

export const metadata: Metadata = {
  title: "Book a Strategy Call | Kinetic",
  description:
    "30 minutes. No pitch. No hard sell. Walk away with a clear growth plan for your business — whether we work together or not.",
}

export default function BookCallPage() {
  return <BookCallClient />
}
