import type { Metadata } from "next"
import Navbar from "@/components/Navbar"
import ServicesPageClient from "@/components/marketing/ServicesPageClient"
import { JsonLd, breadcrumbSchema, faqSchema, localBusinessSchema } from "@/components/seo/JsonLd"

export const metadata: Metadata = {
  title: "What We Build — Websites, Apps, Software & AI Systems | Kinetic",
  description:
    "6 things Kinetic builds exceptionally well: Websites & Landing Pages, Full Stack Apps, Custom Software, AI-Driven Marketing, AI Agents, and AI Chatbots. Production-grade. Handed over running.",
  keywords: [
    "website development India",
    "full stack app development Kolkata",
    "custom software development India",
    "AI marketing automation India",
    "AI agents for business India",
    "AI chatbot development Kolkata",
    "web app development India",
    "business automation systems India",
    "AI-driven digital marketing",
    "custom software Kolkata",
  ],
  alternates: {
    canonical: "https://buildwithkinetic.org/services",
  },
  openGraph: {
    title: "What We Build — Websites, Apps, Software & AI Systems | Kinetic",
    description:
      "Websites, full stack apps, custom software, AI marketing, AI agents, and chatbots — built to production standard and handed over running.",
    url: "https://buildwithkinetic.org/services",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "What We Build | Kinetic",
    description:
      "Websites, Apps, Custom Software, AI Marketing, AI Agents, AI Chatbots — production-grade and handed over running.",
    creator: "@buildwithkinetic",
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
