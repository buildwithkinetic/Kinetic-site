import type { Metadata } from 'next'
import HomepageClient from '@/components/marketing/HomepageClient'
import { JsonLd, websiteSchema, organizationSchema, localBusinessSchema, faqSchema } from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  title: 'Kinetic — Automated Growth Systems for Businesses | Kolkata',
  description:
    'Kinetic builds websites, full stack apps, custom software, AI-driven marketing, AI agents, and AI chatbots for businesses in India — production-grade and handed over running.',
  keywords: [
    'website development Kolkata',
    'full stack app development India',
    'custom software development India',
    'AI marketing automation India',
    'AI agents for business India',
    'AI chatbot development Kolkata',
    'web app development India',
    'business automation Kolkata',
    'automated growth systems India',
    'Kinetic Ayush Gupta Kolkata',
  ],
  alternates: { canonical: 'https://buildwithkinetic.org' },
  openGraph: {
    title: 'Kinetic — Automated Growth Systems for Businesses',
    description:
      'Most agencies build you a website and disappear. Kinetic builds the full system — websites, apps, software, AI marketing, AI agents, chatbots — and hands it over running.',
    url: 'https://buildwithkinetic.org',
    siteName: 'Kinetic',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kinetic — Automated Growth Systems for Businesses',
    description:
      'Websites, apps, software, AI marketing, AI agents, chatbots — built to production standard and handed over running.',
    creator: '@buildwithkinetic',
  },
}

export default function HomePage() {
  const homeFaqs = [
    { question: 'What does Kinetic build?', answer: "Kinetic builds 6 things: conversion-focused websites and landing pages, full stack web applications, custom software, AI-driven marketing systems, AI agents, and AI chatbots. Everything is production-grade and handed over running." },
    { question: 'How long does it take to go live?', answer: 'Websites and chatbots are typically live in 1–2 weeks. AI agents and marketing systems in 2–3 weeks. Full stack apps and custom software are scoped per project — typically 4–8 weeks.' },
    { question: 'What if I already have a website?', answer: "We audit it, identify exactly what's leaking leads, and either rebuild it or layer the right system on top — whichever makes more sense for your business." },
    { question: 'Is there a guarantee?', answer: 'Yes. Every service comes with a specific performance guarantee. Websites come with a 30-day Google ranking guarantee. AI agents and chatbots come with a 60–90 day failure guarantee — if the system fails its core function, we rebuild it free.' },
    { question: 'Do you work with businesses outside Kolkata?', answer: 'Yes — the entire process is remote. Strategy call, build, and handover all happen online. Kinetic works with founders and businesses across India.' },
  ]

  return (
    <>
      <JsonLd schema={websiteSchema()} />
      <JsonLd schema={organizationSchema()} />
      <JsonLd schema={localBusinessSchema()} />
      <JsonLd schema={faqSchema(homeFaqs)} />
      <HomepageClient />
    </>
  )
}
