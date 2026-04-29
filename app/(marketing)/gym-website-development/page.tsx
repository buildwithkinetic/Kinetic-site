import type { Metadata } from "next"
import { IndustryPageTemplate } from "@/components/marketing/IndustryPageTemplate"
import type { IndustryPageData } from "@/components/marketing/IndustryPageTemplate"

export const metadata: Metadata = {
  title: "Gym Website Development | Fitness Studio Websites",
  description:
    "Kinetic builds conversion-focused websites for gyms, fitness studios, and personal trainers. Generate leads, showcase classes, and drive membership sign-ups.",
  alternates: {
    canonical: "https://buildwithkinetic.org/gym-website-development",
  },
  openGraph: {
    title: "Gym & Fitness Website Development | Kinetic",
    description:
      "Gym and fitness studio websites that capture leads, showcase your brand, and drive membership sign-ups. Built for performance and conversion.",
    url: "https://buildwithkinetic.org/gym-website-development",
  },
}

const data: IndustryPageData = {
  slug: "gym-website-development",
  badge: "Industry // Gyms & Fitness",
  industryName: "Gym & Fitness",
  subheadline: "High-Performance Websites for",
  headline: "Gym & Fitness Website Development",
  heroDescription:
    "Your gym deserves a website as strong as your athletes. We build conversion-focused websites for gyms, CrossFit boxes, martial arts studios, and personal training businesses that capture leads, showcase your culture, and turn visitors into paying members.",
  problemTitle: "Most gym websites lose members before they walk in the door",
  problemBody:
    "People searching for a gym are high-intent buyers — they've already decided to join one. If your website loads slowly, looks outdated, or buries the sign-up button, you're handing them to your competitor. Gym websites have a unique challenge: they need to sell a feeling, not just features. We know how to do both.",
  problemPoints: [
    "Slow-loading template websites that fail on mobile — where most gym searches happen",
    "No clear CTA — visitors can't figure out how to book a trial or get a membership",
    "Generic stock photos that don't reflect your gym's culture and community",
    "No lead capture system — visitors browse and leave without any contact info",
    "Missing class schedules, pricing, and FAQ that prospects need to make a decision",
    "No SEO — not showing up for 'gym near me' or '[city] gym' searches",
  ],
  solutionTitle: "A website that sells memberships 24/7",
  solutionBody:
    "We build gym websites that lead with your culture, back it up with results, and make it ridiculously easy to sign up for a trial class or membership. Every page is designed to convert the high-intent visitor who's ready to join — so your website does the selling while you focus on coaching.",
  features: [
    {
      icon: "🏋️",
      title: "Culture-First Design",
      description:
        "Photography, video, and design that captures the energy and community of your gym. We make visitors feel like they're already part of it.",
    },
    {
      icon: "📋",
      title: "Trial Class Lead Capture",
      description:
        "Prominent, frictionless forms for booking trial classes. New leads flow directly into your CRM with instant automated follow-up.",
    },
    {
      icon: "📅",
      title: "Class Schedule Integration",
      description:
        "Live class schedules, timetables, and booking links integrated with your class management software (Mindbody, Glofox, etc.).",
    },
    {
      icon: "💳",
      title: "Membership Pricing Pages",
      description:
        "Clear, compelling pricing pages that address common objections and make the value of your membership undeniable.",
    },
    {
      icon: "⭐",
      title: "Review & Social Proof",
      description:
        "Google reviews, transformation stories, and member testimonials displayed prominently to build trust and FOMO.",
    },
    {
      icon: "📍",
      title: "Local SEO Optimization",
      description:
        "Structured data, local business schema, Google My Business optimization, and location-targeted content to rank for 'gym near me' searches.",
    },
  ],
  resultsStats: [
    { value: "3x", label: "More trial class bookings", sub: "With optimized lead capture" },
    { value: "2s", label: "Load time on mobile", sub: "Where 75%+ of searches happen" },
    { value: "Top 3", label: "Local search ranking", sub: "For 'gym near me' keywords" },
  ],
  faqs: [
    {
      question: "Do you integrate with gym management software like Mindbody or Glofox?",
      answer:
        "Yes. We integrate with all major gym management platforms — Mindbody, Glofox, Zen Planner, Pike13 — so class schedules, booking, and membership purchases are live and synced with your existing system.",
    },
    {
      question: "How do you handle trial class and membership lead capture?",
      answer:
        "We build dedicated landing pages and forms for trial class sign-ups, with instant email confirmation to the prospect and automated notification to your team. Leads are also fed into your CRM automatically so nothing falls through the cracks.",
    },
    {
      question: "Can you help with local SEO so we show up in Google searches?",
      answer:
        "Absolutely. We build full local SEO into every gym website: structured data markup, Google My Business optimization guidance, location-specific landing pages, and on-page optimization for 'gym in [city]' and related queries.",
    },
    {
      question: "Do you work with personal trainers and small studios, not just large gyms?",
      answer:
        "Yes — we work with gyms of all sizes, from solo personal trainers to multi-location fitness chains. The website strategy is tailored to your scale, services, and growth goals.",
    },
    {
      question: "How long does it take to build a gym website?",
      answer:
        "A standard gym website takes 3–5 weeks from strategy call to launch. This includes design, copywriting, development, content integration, and go-live QA.",
    },
  ],
  relatedServices: [
    { href: "/website-development", label: "Website Development" },
    { href: "/conversion-focused-websites", label: "Conversion-Focused Websites" },
    { href: "/lead-generation-websites", label: "Lead Generation Websites" },
    { href: "/crm-dashboard-development", label: "CRM Dashboard Development" },
    { href: "/business-automation-systems", label: "Lead Follow-Up Automation" },
  ],
  relatedIndustries: [
    { href: "/service-business-websites", label: "Service Business Websites" },
    { href: "/small-business-website-development", label: "Small Business Website Development" },
    { href: "/startup-website-development", label: "Startup Website Development" },
  ],
  ctaHeadline: "Ready for a website that fills your gym?",
  ctaSubtext:
    "Book a free strategy call. We'll audit your current site and map out exactly what it'll take to start generating consistent trial class bookings.",
}

export default function GymWebsiteDevelopmentPage() {
  return <IndustryPageTemplate data={data} />
}
