import type { Metadata } from "next"
import { ServicePageTemplate } from "@/components/marketing/ServicePageTemplate"
import type { ServicePageData } from "@/components/marketing/ServicePageTemplate"

export const metadata: Metadata = {
  title: "CRM Dashboard Development | Custom CRM Systems",
  description:
    "Kinetic builds custom CRM dashboards for businesses that outgrew off-the-shelf tools. Real-time pipelines, analytics, and role-based views — built to scale.",
  alternates: {
    canonical: "https://buildwithkinetic.org/crm-dashboard-development",
  },
  openGraph: {
    title: "CRM Dashboard Development | Kinetic",
    description:
      "Custom CRM systems with real-time dashboards, lead pipelines, and automation — built exactly for how your business operates.",
    url: "https://buildwithkinetic.org/crm-dashboard-development",
  },
}

const data: ServicePageData = {
  slug: "crm-dashboard-development",
  badge: "Service // CRM Development",
  headline: "CRM Dashboard Development",
  subheadline: "Custom-Built",
  heroDescription:
    "Generic CRMs force your team to work around their limitations. A custom CRM dashboard built for your exact sales process eliminates friction, automates routine tasks, and gives your team the visibility they need to close more deals — faster.",
  serviceType: "CRM Dashboard Development",
  problemTitle: "Off-the-shelf CRMs are costing you deals",
  problemBody:
    "Salesforce, HubSpot, Pipedrive — great tools for the average business. But if your sales process has unique stages, custom fields, or specific automations, you're fighting the tool instead of using it. Your team builds spreadsheet workarounds, data lives in multiple places, and managers can't see an accurate pipeline. A custom CRM solves all of this.",
  problemStats: [
    { value: "79%", label: "Of CRM leads never convert", sub: "Due to poor follow-up process" },
    { value: "4.5hrs", label: "Weekly per rep lost to manual CRM work", sub: "Data entry and status updates" },
    { value: "30%", label: "Revenue uplift from CRM optimization", sub: "Industry average" },
  ],
  solutionTitle: "A CRM built around how you actually sell",
  solutionBody:
    "We build fully custom CRM dashboards with the exact pipeline stages, data fields, automations, and reporting that your business needs. Built on Next.js and Supabase, your CRM gets real-time updates, role-based access, and can scale from 5 to 500 users without breaking.",
  features: [
    {
      icon: "🔄",
      title: "Drag-and-Drop Pipeline",
      description:
        "Visual Kanban pipeline with custom stages, drag-and-drop cards, and instant status updates synced in real-time across your entire team.",
    },
    {
      icon: "👥",
      title: "Lead & Contact Management",
      description:
        "Full lead profiles with custom fields, activity timeline, communication history, and tags. Segment and filter your contacts in any way you need.",
    },
    {
      icon: "📊",
      title: "Analytics & Reporting",
      description:
        "Real-time dashboards showing pipeline value, conversion rates, rep performance, and revenue forecasts. Custom reports for any metric that matters to your team.",
    },
    {
      icon: "⚙️",
      title: "Workflow Automation",
      description:
        "Automated follow-up tasks, email sequences, stage-change triggers, and notifications — so your team focuses on conversations, not admin.",
    },
    {
      icon: "🔗",
      title: "Integration Hub",
      description:
        "Connect your CRM to your website, email, calendar, invoicing, and any other tool in your stack via API integrations or webhooks.",
    },
    {
      icon: "🔐",
      title: "Role-Based Access",
      description:
        "Granular permissions — reps see their own leads, managers see their team, leadership sees everything. Built on PostgreSQL Row-Level Security.",
    },
  ],
  processSteps: [
    { number: "01", title: "Process Mapping", description: "We document your sales process in detail — stages, fields, automations, and reporting needs." },
    { number: "02", title: "Data Architecture", description: "We design the database schema to support your exact workflow, now and as you scale." },
    { number: "03", title: "Build & Integrate", description: "We build the CRM and connect it to your existing tools — website forms, email, calendar, and more." },
    { number: "04", title: "Training & Adoption", description: "We train your team and provide documentation so adoption is smooth and immediate." },
  ],
  whyKineticPoints: [
    "We built the Kinetic CRM — our own internal system — so we eat our own cooking.",
    "Real-time updates via Supabase Realtime mean your pipeline is always live, never stale.",
    "PostgreSQL Row-Level Security means your data access rules are enforced at the database level, not just the app.",
    "We integrate with any external service: Stripe, Calendly, Slack, HubSpot, Resend, and more.",
    "Mobile-responsive dashboards — your team can update leads from any device, anywhere.",
    "We build the migration from your existing CRM — no data loss, no downtime.",
  ],
  faqs: [
    {
      question: "Can you migrate my existing CRM data to the new system?",
      answer:
        "Yes. We handle full data migration from your existing CRM — HubSpot, Salesforce, spreadsheets, or any other source. We clean, map, and import your data with zero loss.",
    },
    {
      question: "How much does a custom CRM dashboard cost?",
      answer:
        "A basic CRM with pipeline, contacts, and reporting starts around $8–15k. Full-featured systems with automations, integrations, and multi-team access range from $15–40k. We provide a detailed quote after a discovery session.",
    },
    {
      question: "Can the CRM integrate with our website's lead forms?",
      answer:
        "Yes — this is one of the first integrations we set up. New leads from your website flow directly into the CRM with source attribution, automatically assigned to the right rep, and triggering an automated follow-up sequence.",
    },
    {
      question: "What if our process changes and we need to update the CRM?",
      answer:
        "Custom systems are built to evolve. We offer retainer plans for ongoing development. Small configuration changes can often be made by your admin team through the settings panel we build.",
    },
  ],
  relatedServices: [
    { href: "/web-app-development", label: "Web Application Development" },
    { href: "/business-automation-systems", label: "Business Automation Systems" },
    { href: "/lead-generation-websites", label: "Lead Generation Websites" },
    { href: "/website-development", label: "Website Development" },
  ],
  relatedIndustries: [
    { href: "/gym-website-development", label: "Gym CRM & Lead Management" },
    { href: "/service-business-websites", label: "Service Business CRM" },
    { href: "/startup-website-development", label: "Startup CRM Systems" },
  ],
  ctaHeadline: "Ready to replace your CRM frustration with clarity?",
  ctaSubtext:
    "Book a free discovery call. We'll map your sales process and show you exactly what a custom CRM would look like for your team.",
}

export default function CrmDashboardDevelopmentPage() {
  return <ServicePageTemplate data={data} />
}
