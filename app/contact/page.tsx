import type { Metadata } from 'next'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'Book a Free Business Audit — Kinetic | Digital Growth Agency India',
  description:
    'Book a free 20-minute business audit with Ayush at Kinetic. Get a complete review of your digital presence in 24 hours. No pitch. No commitment.',
  alternates: {
    canonical: 'https://buildwithkinetic.org/contact',
  },
}

const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Book a Free Business Audit — Kinetic',
  description:
    'Book a free 20-minute business audit with Ayush at Kinetic. Get a complete review of your digital presence in 24 hours.',
  url: 'https://buildwithkinetic.org/contact',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'admin@buildwithkinetic.org',
    availableLanguage: ['English', 'Hindi'],
    areaServed: 'IN',
  },
}

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <main
        style={{
          minHeight: '100vh',
          backgroundColor: '#000000',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 24px',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: '#94a3b8',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '24px',
          }}
        >
          BOOK A FREE AUDIT
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.1,
            marginBottom: '16px',
          }}
        >
          Let&apos;s talk about your growth.
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '1rem',
            color: '#94a3b8',
            maxWidth: '480px',
            lineHeight: 1.7,
            marginBottom: '40px',
          }}
        >
          Email us directly to schedule your free 20-minute audit. 24-hour turnaround guaranteed.
        </p>
        <a
          href="mailto:admin@buildwithkinetic.org"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '1.125rem',
            fontWeight: 600,
            color: '#000000',
            backgroundColor: '#ffffff',
            padding: '16px 40px',
            borderRadius: '4px',
            textDecoration: 'none',
          }}
        >
          admin@buildwithkinetic.org
        </a>
      </main>
      <Footer />
    </>
  )
}
