import type { Metadata } from "next"
import Script from "next/script"
import "./globals.css"
import CustomCursor from "@/components/CustomCursor"
import ScrollProgress from "@/components/ScrollProgress"
import Footer from "@/components/Footer"

export const metadata: Metadata = {
  metadataBase: new URL("https://buildwithkinetic.org"),
  title: {
    template: "%s | Kinetic",
    default: "Kinetic | The System Behind Your Growth",
  },
  description:
    "Kinetic builds websites, runs SEO, deploys CRM systems, automates workflows, and builds AI agents — then hands it over running. Growth systems for businesses.",
  keywords: [
    "growth systems for businesses India",
    "website development Kolkata",
    "digital marketing agency Kolkata",
    "SEO agency Kolkata",
    "lead generation system India",
    "automated growth systems business",
    "website development agency India",
    "CRM setup business India",
    "business automation Kolkata",
    "web app development agency India",
    "startup website development India",
    "business website development",
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
      "Automated growth systems for businesses and startups — websites, SEO, CRM, automation, and AI agents. Built and handed over running.",
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body
        className="antialiased"
        style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif" }}
      >
        <ScrollProgress />
        <CustomCursor />
        {children}
        <Footer />

        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-B73G9G4SBL"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-B73G9G4SBL', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </body>
    </html>
  )
}
