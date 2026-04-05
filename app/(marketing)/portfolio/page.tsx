import type { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "https://buildwithkinetic.org/work/sheknowmics",
  },
}

export default function Page() {
  redirect("/work/sheknowmics")
}

