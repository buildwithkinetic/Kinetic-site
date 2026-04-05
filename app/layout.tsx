import type { Metadata } from "next"
import "./globals.css"
import CustomCursor from "@/components/CustomCursor"
import ScrollProgress from "@/components/ScrollProgress"

export const metadata: Metadata = {
  metadataBase: new URL("https://buildwithkinetic.org"),
  title: {
    template: "%s | Kinetic",
    default: "Kinetic | The System Behind Your Growth",
  },
  description:
    "Kinetic builds websites, runs SEO, deploys CRM systems, automates workflows, and builds AI agents — then hands it over running. Growth systems for small businesses.",
  keywords: [
    "growth systems for small businesses India",
    "website development Kolkata",
    "digital marketing agency Kolkata",
    "SEO agency Kolkata",
    "lead generation system India",
    "automated growth systems small business",
    "website development agency India",
    "CRM setup small business India",
    "business automation Kolkata",
    "web app development agency India",
    "startup website development India",
    "small business website development",
    "conversion focused website India",
    "AI agents for business India",
    "Google Business Profile optimisation Kolkata",
    "automated lead capture system",
    "Kinetic growth engineer Kolkata",
  ],
  authors: [{ name: "Kinetic", url: "https://buildwithkinetic.org" }],
  creator: "Kinetic",
  publisher: "Kinetic",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://buildwithkinetic.org",
    siteName: "Kinetic",
    title: "Kinetic | The System Behind Your Growth",
    description:
      "Automated growth systems for small businesses and startups — websites, SEO, CRM, automation, and AI agents. Built and handed over running.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kinetic | The System Behind Your Growth",
    description:
      "Websites, SEO, CRM, automation, full stack apps, and AI agents — built for growth, handed over running.",
    creator: "@buildwithkinetic",
  },
  verification: {
    google: "8kwBF9qJeR_0rOQYtenKoBkqNFPM0pCqq3h2h1k5q3M",
  },
  alternates: {
    canonical: "https://buildwithkinetic.org",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-IN">
      <body
        className="antialiased"
        style={{ fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" }}
      >
        <ScrollProgress />
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
