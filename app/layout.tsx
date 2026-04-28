import type { Metadata } from "next"
import Script from "next/script"
import "./globals.css"
import CustomCursor from "@/components/CustomCursor"
import ScrollProgress from "@/components/ScrollProgress"
import Footer from "@/components/Footer"
import SchemaMarkup from "@/components/SchemaMarkup"

export const metadata: Metadata = {
  metadataBase: new URL("https://buildwithkinetic.org"),
  title: {
    template: "%s | Kinetic",
    default: "Kinetic | The System Behind Your Growth",
  },
  description:
    "Kinetic builds websites, full stack apps, custom software, AI-driven marketing systems, AI agents, and AI chatbots — production-grade and handed over running.",
  keywords: [
    "website development agency",
    "full stack app development",
    "custom software development",
    "AI-driven marketing",
    "AI agents for business",
    "AI chatbot development",
    "web app development agency",
    "business automation",
    "automated growth systems",
    "startup website development",
    "Kinetic Ayush Gupta",
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
      "Websites, full stack apps, custom software, AI marketing, AI agents, and chatbots — built to production standard and handed over running.",
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
        <SchemaMarkup />
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
