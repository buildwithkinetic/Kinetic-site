import type { Metadata } from 'next'
import StickyBookingBar from '@/components/sticky-booking-bar'
import HeroSection from '@/components/sections/hero'
import ProblemSection from '@/components/sections/problem'
import SystemsSection from '@/components/sections/systems'
import ResultsSection from '@/components/sections/results'
import AboutSection from '@/components/sections/about'
import TechStackSection from '@/components/sections/tech-stack'
import FAQSection from '@/components/sections/faq'
import GetStartedSection from '@/components/sections/get-started'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'Kinetic — The Digital Growth System for Small Businesses India',
  description:
    'Kinetic builds complete digital growth systems — website, CRM, automations, and acquisition, installed end to end. Book a free audit.',
  keywords: [
    'digital growth agency India',
    'CRM automation India',
    'lead generation system',
    'website development India',
    'digital marketing Kolkata',
  ],
  alternates: {
    canonical: 'https://buildwithkinetic.org',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How is Kinetic different from hiring a freelancer or agency?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Most freelancers build one thing and hand it over. Most agencies charge for activity, not results. Kinetic builds a complete system — website, CRM, automations, acquisition — and delivers it running. You're not buying a deliverable. You're buying infrastructure that generates leads.",
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need to know anything technical?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. You bring your business knowledge — who you serve, what you offer, what you want. Kinetic handles everything technical end to end.',
      },
    },
    {
      '@type': 'Question',
      name: "What if the system doesn't work?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Every tier comes with a real guarantee. Tier 3 clients see measurable lead growth in 90 days — or work continues until they do.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does it take to go live?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Tier 1 goes live in 2 weeks. Tier 2 in 2–3 weeks. Tier 3 in 4 weeks. Tier 4 is scoped individually.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who is Kinetic not for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Businesses looking for the cheapest option, businesses that want to micromanage every design decision, and businesses not ready to move fast.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you work with businesses outside India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The system works anywhere. Most current clients are India-based, but the infrastructure is built for any market.',
      },
    },
  ],
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main>
        <StickyBookingBar />
        <HeroSection />
        <ProblemSection />
        <SystemsSection />
        <ResultsSection />
        <AboutSection />
        <TechStackSection />
        <FAQSection />
        <GetStartedSection />
        <Footer />
      </main>
    </>
  )
}
