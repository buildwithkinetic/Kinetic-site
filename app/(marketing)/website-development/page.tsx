import type { Metadata } from "next"
import { ServicePageTemplate } from "@/components/marketing/ServicePageTemplate"
import type { ServicePageData } from "@/components/marketing/ServicePageTemplate"

export const metadata: Metadata = {
  title: "Website Development Services | Conversion-Focused Websites",
  description:
    "Kinetic builds conversion-focused websites for startups, service businesses, and gyms. Engineered to capture leads and grow revenue — not just look good.",
  alternates: {
    canonical: "https://buildwithkinetic.org/website-development",
  },
  openGraph: {
    title: "Website Development Services | Kinetic",
    description:
      "High-performance, conversion-focused websites engineered to capture leads and grow your business. Built on Next.js with Vercel hosting.",
    url: "https://buildwithkinetic.org/website-development",
  },
}

const data: ServicePageData = {
  slug: "website-development",
  badge: "Service // Website Development",
  headline: "Website Development",
  subheadline: "Conversion-Focused",
  heroDescription:
    "We don't build brochure websites. We build digital growth infrastructure — fast, accessible, and engineered to convert every visitor into a qualified lead for your business.",
  serviceType: "Website Development",
  problemTitle: "Most websites fail their business owners",
  problemBody:
    "Your website is your #1 salesperson — but most businesses are running websites that load slowly, confuse visitors, and fail to capture any leads. Agencies deliver pretty designs that win awards but don't win customers. The result is a site that costs money every month and contributes nothing to revenue. Kinetic was founded to fix this. We engineer websites that are built around one core metric: conversion.",
  problemStats: [
    { value: "53%", label: "Visitors abandon slow sites", sub: "If load time exceeds 3 seconds" },
    { value: "88%", label: "Won't return after bad UX", sub: "First impressions are permanent" },
    { value: "75%", label: "Judge credibility by website", sub: "Your site is your brand" },
  ],
  solutionTitle: "A website built to perform, not just impress",
  solutionBody:
    "Every Kinetic website starts with a conversion strategy — we map out exactly how your visitors should move through the site and what actions they should take. Then we build a technically excellent, visually compelling website that executes that strategy on every page, on every device.",
  features: [
    {
      icon: "⚡",
      title: "Lightning Performance",
      description:
        "Built on Next.js 14 with App Router, deployed on Vercel. Sub-2s load times are standard. We don't ship code that fails Core Web Vitals.",
    },
    {
      icon: "🎯",
      title: "Conversion Architecture",
      description:
        "Every page is structured around a goal. Hero, problem, solution, CTA — the psychology of conversion is baked into every section layout.",
    },
    {
      icon: "📱",
      title: "Mobile-First Design",
      description:
        "Over 60% of your visitors are on mobile. We design mobile-first and scale up, not the other way around.",
    },
    {
      icon: "🔍",
      title: "SEO-Engineered",
      description:
        "Semantic HTML, structured metadata, JSON-LD schema, sitemap, robots.txt — every technical SEO signal is built in from day one.",
    },
    {
      icon: "📊",
      title: "Analytics & Tracking",
      description:
        "Vercel Analytics, event tracking, and conversion funnels are set up so you know exactly what's working and what to improve.",
    },
    {
      icon: "🔧",
      title: "CMS Integration",
      description:
        "Need to update content yourself? We integrate headless CMS systems so your team can manage content without touching code.",
    },
  ],
  processSteps: [
    { number: "01", title: "Discovery & Strategy", description: "We audit your current site, map your buyer journey, and define the conversion goals for every page." },
    { number: "02", title: "Design System", description: "We create a design system aligned to your brand — typography, color, spacing, and components." },
    { number: "03", title: "Development", description: "We build in Next.js with TypeScript and Tailwind CSS. Every component is accessible and performant." },
    { number: "04", title: "Launch & Optimize", description: "We deploy on Vercel, set up analytics, and monitor performance for the first 30 days post-launch." },
  ],
  whyKineticPoints: [
    "We build in Next.js 14+ App Router — the most performant React framework available, used by industry leaders.",
    "Every website ships with full technical SEO: schema markup, sitemap, robots.txt, canonical tags, and Open Graph.",
    "We don't hand you a template. Everything is custom-built to your brand and conversion goals.",
    "Mobile-first, accessible by default — we meet WCAG 2.1 standards on every build.",
    "Vercel hosting means global CDN, automatic deployments, and 99.99% uptime out of the box.",
    "Our process is collaborative — you see the work in progress and have input at every stage.",
    "Post-launch support: we monitor Core Web Vitals and fix any performance issues within 48 hours.",
    "Transparent pricing with no hidden fees — you know exactly what you're getting before we start.",
  ],
  faqs: [
    {
      question: "How long does it take to build a website with Kinetic?",
      answer:
        "A standard marketing website takes 3–6 weeks from kick-off to launch. This includes discovery, design, development, content, and QA. Complex sites with custom integrations may take longer. We'll give you a precise timeline in your strategy call.",
    },
    {
      question: "What technology do you use to build websites?",
      answer:
        "We build on Next.js 14+ with React and TypeScript, styled with Tailwind CSS, and deployed on Vercel. This stack delivers the best performance, developer experience, and SEO capabilities available today.",
    },
    {
      question: "Do you provide website maintenance and support?",
      answer:
        "Yes. We offer ongoing maintenance packages that include security updates, performance monitoring, content updates, and feature additions. Ask about our retainer plans.",
    },
    {
      question: "Can I update the website content myself after launch?",
      answer:
        "Yes. We can integrate a headless CMS like Sanity or Contentful so your team can update content, blog posts, and media without any coding knowledge.",
    },
    {
      question: "What makes Kinetic different from other web development agencies?",
      answer:
        "Most agencies build for aesthetics. We build for conversion. Every decision — layout, copy placement, CTA positioning, page speed — is made to increase the number of leads your website generates. We measure success by your business outcomes, not our portfolio.",
    },
  ],
  relatedServices: [
    { href: "/conversion-focused-websites", label: "Conversion-Focused Website Design" },
    { href: "/lead-generation-websites", label: "Lead Generation Website Design" },
    { href: "/web-app-development", label: "Web Application Development" },
    { href: "/crm-dashboard-development", label: "CRM Dashboard Development" },
    { href: "/business-automation-systems", label: "Business Automation Systems" },
  ],
  relatedIndustries: [
    { href: "/startup-website-development", label: "Website Development for Startups" },
    { href: "/gym-website-development", label: "Gym & Fitness Website Development" },
    { href: "/small-business-website-development", label: "Small Business Website Development" },
    { href: "/service-business-websites", label: "Service Business Websites" },
  ],
  ctaHeadline: "Let's build a website that actually works for your business.",
  ctaSubtext:
    "Book a free 30-minute strategy call. We'll audit your current site and map out exactly what needs to change to start generating more leads.",
}

export default function WebsiteDevelopmentPage() {
  return <ServicePageTemplate data={data} />
}
