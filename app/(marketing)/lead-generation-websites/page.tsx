import type { Metadata } from "next"
import { ServicePageTemplate } from "@/components/marketing/ServicePageTemplate"
import type { ServicePageData } from "@/components/marketing/ServicePageTemplate"

export const metadata: Metadata = {
  title: "Lead Generation Website Design & Development | Kinetic",
  description:
    "Websites built specifically to capture and convert leads — not just look good. Forms, CTAs, and automation included.",
}

const data: ServicePageData = {
  slug: "lead-generation-websites",
  badge: "Service // Lead Generation",
  headline: "Lead Generation Website Design",
  subheadline: "Build a 24/7 Lead Machine With",
  heroDescription:
    "Your website should be your hardest-working salesperson — generating qualified leads while you sleep. We build lead generation systems that attract high-intent visitors, capture their information, and automatically route them into your sales process.",
  serviceType: "Lead Generation Website Design",
  problemTitle: "Your pipeline dries up when outreach stops",
  problemBody:
    "If your lead flow depends entirely on cold outreach, referrals, or paid ads, you're one campaign away from a dry pipeline. A well-built inbound lead generation website creates a compound asset — it attracts leads organically through SEO, converts them through smart design, and nurtures them through automated follow-up. Businesses with strong inbound systems grow faster and more predictably.",
  problemStats: [
    { value: "61%", label: "Of marketers say lead gen is #1 challenge", sub: "Consistent lead flow is rare" },
    { value: "3x", label: "More leads from content + SEO", sub: "vs. paid ads alone" },
    { value: "14.6%", label: "Inbound close rate", sub: "vs. 1.7% for outbound" },
  ],
  solutionTitle: "A systematic inbound lead generation engine",
  solutionBody:
    "We don't build websites — we build lead generation systems. Every component serves the goal of attracting the right visitors, engaging them with relevant content, and converting them into qualified leads that land in your CRM ready for follow-up.",
  features: [
    {
      icon: "🧲",
      title: "Lead Magnet Integration",
      description:
        "Free audits, guides, templates, and tools that capture visitor information in exchange for genuine value. We design and build the entire lead magnet funnel.",
    },
    {
      icon: "📋",
      title: "High-Converting Forms",
      description:
        "Multi-step forms, qualification questions, and instant-response confirmations that maximize form completion rates and pre-qualify leads.",
    },
    {
      icon: "🔗",
      title: "CRM Integration",
      description:
        "Leads flow directly into your CRM — HubSpot, Salesforce, Pipedrive, or custom — with source attribution, tags, and automated follow-up sequences.",
    },
    {
      icon: "🌐",
      title: "SEO Content Architecture",
      description:
        "Blog, resources, and service pages engineered to rank for the keywords your ideal customers search. Organic traffic that compounds over time.",
    },
    {
      icon: "📧",
      title: "Email Capture & Nurture",
      description:
        "Opt-in forms, pop-ups timed by scroll depth, and email sequences that nurture leads who aren't ready to buy today.",
    },
    {
      icon: "📈",
      title: "Lead Quality Scoring",
      description:
        "Qualification questions in your forms help identify hot leads vs. tire-kickers so your sales team focuses on the highest-value opportunities.",
    },
  ],
  processSteps: [
    { number: "01", title: "Lead Journey Mapping", description: "We map every stage of your lead journey — from first touch to qualified conversation — and design a system for each." },
    { number: "02", title: "Content & Offer Strategy", description: "We identify what your ideal customers want and create lead magnets and content that attract and qualify them." },
    { number: "03", title: "Build & Integrate", description: "We build the website and connect all lead capture systems — forms, CRM, email, and analytics." },
    { number: "04", title: "SEO & Growth", description: "Post-launch, we execute SEO content strategy to drive compounding organic lead growth." },
  ],
  whyKineticPoints: [
    "We've built lead generation systems for gyms, law firms, agencies, SaaS startups, and service businesses.",
    "Every lead capture form is connected to analytics — you know where every lead came from.",
    "We understand both the technical (SEO, performance) and psychological (CRO, copy) sides of lead generation.",
    "We integrate with your existing CRM and sales process — no ripping and replacing tools that work.",
    "Our sites are built for organic search from day one — blog architecture, schema markup, and internal linking included.",
    "We include email automation setup so leads get an immediate, personalized follow-up the moment they convert.",
  ],
  faqs: [
    {
      question: "What types of businesses benefit most from a lead generation website?",
      answer:
        "Any business that relies on inbound leads: service businesses (law, accounting, consulting), local businesses (gyms, clinics, contractors), B2B companies, and agencies. If you sell a service or product that requires a conversation before purchase, a lead generation website is essential.",
    },
    {
      question: "Do you build landing pages for paid ad campaigns?",
      answer:
        "Yes. We build dedicated landing pages optimized for specific campaigns — Google Ads, Meta Ads, LinkedIn — with message match and conversion tracking. Landing pages consistently outperform sending ad traffic to your homepage.",
    },
    {
      question: "How does the CRM integration work?",
      answer:
        "When a visitor submits a form, their information and source data is sent directly to your CRM via API or webhook. We set up the integration and test it before launch. We work with HubSpot, Salesforce, Pipedrive, and most other major CRMs.",
    },
    {
      question: "How long until the website starts generating leads?",
      answer:
        "From paid traffic, you can see leads within days of launch. From SEO, it typically takes 2–4 months to rank for your target keywords. We recommend running both in parallel — paid to generate immediate leads, SEO to build a long-term organic engine.",
    },
  ],
  relatedServices: [
    { href: "/conversion-focused-websites", label: "Conversion-Focused Website Design" },
    { href: "/website-development", label: "Website Development" },
    { href: "/crm-dashboard-development", label: "CRM Dashboard Development" },
    { href: "/business-automation-systems", label: "Business Automation Systems" },
  ],
  relatedIndustries: [
    { href: "/gym-website-development", label: "Gym & Fitness Lead Generation" },
    { href: "/service-business-websites", label: "Service Business Lead Generation" },
    { href: "/startup-website-development", label: "Startup Lead Generation Websites" },
  ],
  ctaHeadline: "Build a pipeline that fills itself.",
  ctaSubtext:
    "Book a free lead generation audit. We'll show you exactly what's costing you leads and how to fix it.",
}

export default function LeadGenerationWebsitesPage() {
  return <ServicePageTemplate data={data} />
}
