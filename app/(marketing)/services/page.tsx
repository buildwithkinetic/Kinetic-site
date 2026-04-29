import type { Metadata } from "next"
import Navbar from "@/components/Navbar"
import ServicesPageClient from "@/components/marketing/ServicesPageClient"
import { JsonLd, breadcrumbSchema, faqSchema, localBusinessSchema } from "@/components/seo/JsonLd"

export const metadata: Metadata = {
  title: "Services — Websites, AI Agents, SEO & Web Apps | Kinetic",
  description:
    "Four core services: conversion websites, full-stack web apps, AI agents & automation, and SEO. Built as systems, not one-off deliverables.",
  openGraph: {
    title: "Services — Websites, AI Agents, SEO & Web Apps",
    description: "Four core services built as systems, not one-off deliverables.",
    url: "https://buildwithkinetic.org/services",
    siteName: "Kinetic",
    images: [{ url: "https://buildwithkinetic.org/og?title=Services+%E2%80%94+Websites%2C+AI+Agents%2C+SEO+%26+Web+Apps&description=Four+core+services+built+as+systems&type=service", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
}

const serviceFAQs = [
  {
    question: "What does Kinetic actually build?",
    answer:
      "Kinetic builds 6 things: conversion-focused websites and landing pages, full stack web applications, custom software, AI-driven marketing systems, AI agents, and AI chatbots. Everything is production-grade and handed over running — not handed over as a prototype.",
  },
  {
    question: "How long does it take to go live?",
    answer:
      "Websites and chatbots are typically live in 1–2 weeks. AI agents and marketing systems go live in 2–3 weeks. Full stack apps and custom software are scoped per project — typically 4–8 weeks.",
  },
  {
    question: "Is there a guarantee on the work?",
    answer:
      "Yes. Every service comes with a specific performance guarantee. Websites come with a 30-day Google ranking guarantee. AI agents and chatbots come with a 60–90 day failure guarantee — if the system fails its core function, we rebuild it free.",
  },
  {
    question: "Do you work with businesses outside Kolkata?",
    answer:
      "Yes. Kinetic works with businesses and startups across India. The entire process — strategy call, build, and handover — happens remotely.",
  },
  {
    question: "What if I'm not sure which service I need?",
    answer:
      "Book a free strategy call or submit your site for a free audit. We'll review your current setup and tell you exactly what to build first — no pitch, no retainer.",
  },
]

export default function ServicesPage() {
  return (
    <>
      <JsonLd schema={localBusinessSchema()} />
      <JsonLd schema={faqSchema(serviceFAQs)} />
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", url: "https://buildwithkinetic.org" },
          { name: "Services", url: "https://buildwithkinetic.org/services" },
        ])}
      />

      <main className="bg-[#EDEAE3] min-h-screen text-[#0F0E0C]">
        <Navbar />
        <ServicesPageClient />
      </main>
    </>
  )
}
