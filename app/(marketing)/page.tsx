import type { Metadata } from 'next'
import HomepageClient from '@/components/marketing/HomepageClient'
import { JsonLd, websiteSchema, organizationSchema, localBusinessSchema, faqSchema } from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  title: "Kinetic — Digital Growth Systems for Startups & Businesses",
  description:
    "Kinetic builds websites, web apps, AI agents, and growth systems for startups and businesses globally. Installed end to end, not just designed and delivered.",
}

export default function HomePage() {
  const homeFaqs = [
    { question: 'What does Kinetic build?', answer: "Kinetic builds 6 things: conversion-focused websites and landing pages, full stack web applications, custom software, AI-driven marketing systems, AI agents, and AI chatbots. Everything is production-grade and handed over running." },
    { question: 'How long does it take to go live?', answer: 'Websites and chatbots are typically live in 1–2 weeks. AI agents and marketing systems in 2–3 weeks. Full stack apps and custom software are scoped per project — typically 4–8 weeks.' },
    { question: 'What if I already have a website?', answer: "We audit it, identify exactly what's leaking leads, and either rebuild it or layer the right system on top — whichever makes more sense for your business." },
    { question: 'Is there a guarantee?', answer: 'Yes. Every service comes with a specific performance guarantee. Websites come with a 30-day Google ranking guarantee. AI agents and chatbots come with a 60–90 day failure guarantee — if the system fails its core function, we rebuild it free.' },
    { question: 'Do you work with US-based or international clients?', answer: 'Yes — the entire process is remote. Strategy call, build, and handover all happen online. Kinetic works with funded startups and founders across the US, UK, and India.' },
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
