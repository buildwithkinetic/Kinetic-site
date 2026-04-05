// Environment variables used: NEXT_PUBLIC_GTM_ID
import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter, JetBrains_Mono, Sora } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  preload: true,
  fallback: ['Courier New', 'monospace'],
})

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  weight: ['400', '600', '700'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
})

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Kinetic',
  description:
    'Kinetic builds digital growth systems for small businesses and startups — websites, CRMs, automations, and acquisition layers, installed end to end.',
  url: 'https://buildwithkinetic.org',
  telephone: '+918697451427',
  email: 'admin@buildwithkinetic.org',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '3B Biswambher Mullick Lane',
    addressLocality: 'Kolkata',
    addressRegion: 'West Bengal',
    postalCode: '700005',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 22.5726,
    longitude: 88.3639,
  },
  openingHours: 'Mo-Su 00:00-23:59',
  areaServed: 'India',
  founder: {
    '@type': 'Person',
    name: 'Ayush Gupta',
    jobTitle: 'Founder & Growth Engineer',
    url: 'https://linkedin.com/in/21-ayushgupta',
  },
}

export const metadata: Metadata = {
  title: {
    template: '%s | Kinetic',
    default: 'Digital Growth Agency India — Websites, CRM & Lead Automation | Kinetic',
  },
  description:
    'Kinetic builds complete digital growth systems for small businesses in India — website, CRM, automations, and acquisition, installed end to end. Book a free audit.',
  keywords: [
    'digital growth agency India',
    'website development company Kolkata',
    'CRM automation India',
    'lead generation system',
    'digital marketing Kolkata',
  ],
  authors: [{ name: 'Ayush Gupta' }],
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'Digital Growth Agency India — Websites, CRM & Lead Automation | Kinetic',
    description:
      'Kinetic builds complete digital growth systems for small businesses in India — website, CRM, automations, and acquisition, installed end to end.',
    type: 'website',
    url: 'https://buildwithkinetic.org',
    siteName: 'Kinetic',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://buildwithkinetic.org',
  },
}

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${sora.variable}`}
    >
      <head>
        {GTM_ID && (
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
            }}
          />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        {children}
        <Analytics />
      </body>
    </html>
  )
}
