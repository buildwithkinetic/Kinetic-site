import type { Metadata } from "next"
import { ServicePageTemplate } from "@/components/marketing/ServicePageTemplate"
import type { ServicePageData } from "@/components/marketing/ServicePageTemplate"

export const metadata: Metadata = {
  title: "Web App Development Agency | Custom Web Applications",
  description:
    "Kinetic builds scalable web applications for startups and businesses. From SaaS platforms to internal tools — full-stack on Next.js and Supabase.",
  alternates: {
    canonical: "https://buildwithkinetic.org/web-app-development",
  },
  openGraph: {
    title: "Web App Development Agency | Kinetic",
    description:
      "Full-stack web application development for startups and growing businesses. Built on Next.js, React, and Supabase.",
    url: "https://buildwithkinetic.org/web-app-development",
  },
}

const data: ServicePageData = {
  slug: "web-app-development",
  badge: "Service // Web App Development",
  headline: "Web App Development",
  subheadline: "Full-Stack",
  heroDescription:
    "We build production-ready web applications that scale with your business — from MVP to enterprise. Real-time dashboards, SaaS platforms, internal tools, and customer portals built on modern, battle-tested technology.",
  serviceType: "Web Application Development",
  problemTitle: "Off-the-shelf software is holding your business back",
  problemBody:
    "Generic SaaS tools are designed for the average business — not yours. You're paying for features you don't need, missing features you do, and watching your team build workarounds. A custom web application built for your exact workflow can eliminate those bottlenecks, reduce overhead, and give you a competitive edge no competitor can copy.",
  problemStats: [
    { value: "42%", label: "Of SaaS costs are waste", sub: "On unused features and seats" },
    { value: "3.5hrs", label: "Lost per employee weekly", sub: "To manual workarounds" },
    { value: "10x", label: "ROI on custom tools", sub: "Average across clients" },
  ],
  solutionTitle: "Custom software engineered for your workflow",
  solutionBody:
    "We architect, design, and build full-stack web applications from scratch. Our tech stack — Next.js, React, TypeScript, Supabase, PostgreSQL — gives you a modern, maintainable codebase that your team can own for years to come. No legacy bloat. No vendor lock-in.",
  features: [
    {
      icon: "🏗️",
      title: "Full-Stack Architecture",
      description:
        "Frontend (Next.js / React), backend (Node.js / Supabase), and database (PostgreSQL) — all designed as an integrated system, not stitched-together pieces.",
    },
    {
      icon: "🔐",
      title: "Auth & Permissions",
      description:
        "Role-based access control, Supabase Auth with SSO support, row-level security — enterprise-grade auth patterns baked in from day one.",
    },
    {
      icon: "📡",
      title: "Real-Time Features",
      description:
        "Live dashboards, instant notifications, collaborative features — built on Supabase Realtime and WebSockets without the complexity.",
    },
    {
      icon: "🔌",
      title: "Third-Party Integrations",
      description:
        "Stripe payments, CRM sync, email automation, analytics APIs — we integrate the tools your business already uses.",
    },
    {
      icon: "📱",
      title: "Responsive & PWA-Ready",
      description:
        "Every app works flawlessly on mobile. For field teams or high-frequency users, we can package as a Progressive Web App.",
    },
    {
      icon: "🚀",
      title: "CI/CD & DevOps",
      description:
        "Automated testing, staging environments, and Vercel deployment pipelines — so your app ships reliably and updates safely.",
    },
  ],
  processSteps: [
    { number: "01", title: "Product Discovery", description: "We map your user flows, define the data model, and architect the system before writing a single line of code." },
    { number: "02", title: "MVP Sprint", description: "We ship a working MVP in 4–8 weeks — enough to validate with real users and gather feedback." },
    { number: "03", title: "Iteration", description: "Based on usage data and feedback, we prioritize and build the next feature set in two-week sprints." },
    { number: "04", title: "Scale & Handoff", description: "We document the system, train your team, and hand over a maintainable, well-tested codebase." },
  ],
  whyKineticPoints: [
    "We've built SaaS platforms, internal tools, customer portals, and AI-powered products — we've seen the edge cases.",
    "TypeScript throughout — no silent type errors shipping to production. Ever.",
    "Supabase gives you PostgreSQL, auth, storage, and realtime out of the box — no backend infrastructure to manage.",
    "We write tests. Unit tests, integration tests, and E2E tests with Playwright — so refactoring doesn't cause regressions.",
    "You own everything: source code, database, hosting, domain. No lock-in to Kinetic.",
    "We don't disappear post-launch. Our retainer clients get ongoing feature work, monitoring, and support.",
    "Security first: Row-Level Security in Postgres, input validation, CSRF protection, rate limiting on all APIs.",
    "Performance-first architecture: SSR where needed, static generation where possible, edge functions for global speed.",
  ],
  faqs: [
    {
      question: "How long does it take to build a web application?",
      answer:
        "An MVP typically takes 4–10 weeks depending on complexity. A full-featured product with auth, dashboards, integrations, and admin panels takes 3–6 months. We give you an accurate estimate after a discovery session.",
    },
    {
      question: "What is your tech stack for web applications?",
      answer:
        "We build on Next.js 14+ (App Router), React 18, TypeScript, Tailwind CSS, Supabase (PostgreSQL, Auth, Storage, Realtime), and deploy on Vercel. This is a modern, production-proven stack used by thousands of companies.",
    },
    {
      question: "Do you build mobile apps as well?",
      answer:
        "We specialize in web applications, but our apps are fully responsive and can be packaged as PWAs (Progressive Web Apps) for a native-like mobile experience. For native iOS/Android apps, we can recommend partners.",
    },
    {
      question: "Who owns the source code after the project?",
      answer:
        "You own 100% of the source code, database, and all assets from day one. We deliver clean, documented code in a Git repository you control.",
    },
    {
      question: "Can you take over an existing web application?",
      answer:
        "Yes. We've taken over several codebases that needed refactoring, modernization, or feature additions. We start with a technical audit to understand the current state and give you an honest assessment.",
    },
  ],
  relatedServices: [
    { href: "/website-development", label: "Website Development" },
    { href: "/crm-dashboard-development", label: "CRM Dashboard Development" },
    { href: "/business-automation-systems", label: "Business Automation Systems" },
    { href: "/conversion-focused-websites", label: "Conversion-Focused Websites" },
  ],
  relatedIndustries: [
    { href: "/startup-website-development", label: "Website Development for Startups" },
    { href: "/small-business-website-development", label: "Small Business Web Apps" },
    { href: "/service-business-websites", label: "Service Business Portals" },
  ],
  ctaHeadline: "Have an app idea? Let's turn it into a product.",
  ctaSubtext:
    "Book a free 30-minute discovery call. We'll scope your project, recommend the right architecture, and give you a realistic timeline and cost.",
}

export default function WebAppDevelopmentPage() {
  return <ServicePageTemplate data={data} />
}
