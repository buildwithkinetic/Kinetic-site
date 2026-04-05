import type { Metadata } from "next"
import { ServicePageTemplate } from "@/components/marketing/ServicePageTemplate"
import type { ServicePageData } from "@/components/marketing/ServicePageTemplate"

export const metadata: Metadata = {
  title: "Business Automation Systems | Automate Your Operations",
  description:
    "Kinetic builds automation systems that eliminate repetitive work and scale operations. Lead follow-up, onboarding, billing, and reporting — automated.",
  alternates: {
    canonical: "https://buildwithkinetic.org/business-automation-systems",
  },
  openGraph: {
    title: "Business Automation Systems | Kinetic",
    description:
      "Custom automation systems that eliminate manual work and scale your business. Lead nurture, onboarding, billing, and ops — automated.",
    url: "https://buildwithkinetic.org/business-automation-systems",
  },
}

const data: ServicePageData = {
  slug: "business-automation-systems",
  badge: "Service // Automation",
  headline: "Business Automation Systems",
  subheadline: "Eliminate Manual Work With",
  heroDescription:
    "Every hour your team spends on repetitive tasks is an hour not spent on growth. We identify the manual workflows slowing your business down and replace them with automated systems — so your team can focus on high-value work.",
  serviceType: "Business Process Automation",
  problemTitle: "Manual processes are your biggest hidden cost",
  problemBody:
    "Most businesses have dozens of manual workflows that are ripe for automation: following up with leads, sending onboarding emails, generating reports, processing bookings, sending invoices, updating spreadsheets. These tasks seem small individually but collectively represent thousands of hours of labor annually — and they're prone to human error. Automation doesn't just save time, it eliminates mistakes and creates consistency at scale.",
  problemStats: [
    { value: "94%", label: "Of businesses do repetitive, automatable tasks", sub: "McKinsey research" },
    { value: "€35k", label: "Average annual cost of manual data entry per employee", sub: "Including error correction" },
    { value: "5hrs", label: "Saved per week with basic automation", sub: "Per team member" },
  ],
  solutionTitle: "Custom automation engineered for your exact workflow",
  solutionBody:
    "Unlike no-code tools that hit ceilings when your needs grow complex, we build custom automation systems using code and APIs. That means no per-action limits, no tool lock-in, and automation that does exactly what your process requires — not a generic approximation.",
  features: [
    {
      icon: "📬",
      title: "Lead Nurture Automation",
      description:
        "Automated email sequences, follow-up tasks, and CRM updates triggered by lead behavior. Every new lead gets instant, personalized outreach — even at 3am.",
    },
    {
      icon: "🎯",
      title: "Client Onboarding Flows",
      description:
        "When a new client signs, the system automatically sends welcome emails, creates accounts, assigns tasks to your team, and schedules onboarding calls.",
    },
    {
      icon: "📊",
      title: "Automated Reporting",
      description:
        "Weekly performance reports, pipeline summaries, and KPI dashboards delivered automatically to stakeholders — no manual compilation needed.",
    },
    {
      icon: "💳",
      title: "Billing & Invoicing",
      description:
        "Stripe-powered subscription billing, automated invoice generation, payment reminders, and failed payment recovery — all handled without human intervention.",
    },
    {
      icon: "🔔",
      title: "Intelligent Notifications",
      description:
        "The right people get notified about the right events at the right time — Slack, email, or in-app — based on rules you define.",
    },
    {
      icon: "🔄",
      title: "Data Sync & Integration",
      description:
        "Keep your CRM, email platform, accounting software, and project management tools in sync automatically. No more manual data migration between tools.",
    },
  ],
  processSteps: [
    { number: "01", title: "Automation Audit", description: "We map every manual workflow in your business and prioritize by time cost, error rate, and automation potential." },
    { number: "02", title: "Architecture Design", description: "We design the automation architecture — triggers, conditions, actions, and error handling — before writing code." },
    { number: "03", title: "Build & Test", description: "We build automations with extensive testing across edge cases to ensure they work reliably in production." },
    { number: "04", title: "Monitor & Expand", description: "We monitor automations post-launch and iterate — expanding to new workflows as your needs evolve." },
  ],
  whyKineticPoints: [
    "We build with code, not no-code tools — which means no arbitrary limits, no per-action pricing, and no ceilings.",
    "Every automation has error handling and monitoring — if something breaks, you get alerted immediately.",
    "We've automated everything from lead follow-up sequences to complex multi-step client onboarding systems.",
    "We use Resend, Supabase Edge Functions, and custom webhooks — stable, scalable, and cost-effective.",
    "We document every automation so your team understands what runs, when, and why.",
    "We integrate with your existing stack — no ripping and replacing what already works.",
  ],
  faqs: [
    {
      question: "What kinds of tasks can be automated?",
      answer:
        "Any repetitive, rule-based task can typically be automated: email follow-ups, data entry, report generation, notifications, onboarding sequences, invoicing, appointment reminders, and social media posting. We'll help you identify your highest-value automation opportunities.",
    },
    {
      question: "Don't tools like Zapier or Make already do this?",
      answer:
        "Zapier and Make are great for simple automations. But they have step limits, per-action costs that scale rapidly, and break on complex logic. For mission-critical automations with custom business rules, error handling, and high volume, custom code is more reliable and cheaper at scale.",
    },
    {
      question: "How do you handle errors in automated workflows?",
      answer:
        "Every automation we build includes error handling and monitoring. Failed runs are logged, alerts are sent to your team, and we implement retry logic for transient failures. We aim for 99.9% reliability on all production automations.",
    },
    {
      question: "Can you automate our client communication?",
      answer:
        "Yes — automated client communication is one of our most common requests. We build email sequences, SMS notifications, and in-app messages triggered by client actions or time delays, personalized with client data from your CRM.",
    },
  ],
  relatedServices: [
    { href: "/crm-dashboard-development", label: "CRM Dashboard Development" },
    { href: "/web-app-development", label: "Web App Development" },
    { href: "/lead-generation-websites", label: "Lead Generation Websites" },
    { href: "/website-development", label: "Website Development" },
  ],
  relatedIndustries: [
    { href: "/gym-website-development", label: "Gym Business Automation" },
    { href: "/service-business-websites", label: "Service Business Automation" },
    { href: "/startup-website-development", label: "Startup Automation Systems" },
  ],
  ctaHeadline: "How many hours a week does manual work cost you?",
  ctaSubtext:
    "Book a free automation audit. We'll identify your three biggest time-wasting workflows and show you exactly what automating them would look like.",
}

export default function BusinessAutomationSystemsPage() {
  return <ServicePageTemplate data={data} />
}
