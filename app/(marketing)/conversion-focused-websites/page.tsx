import type { Metadata } from "next"
import { ServicePageTemplate } from "@/components/marketing/ServicePageTemplate"
import type { ServicePageData } from "@/components/marketing/ServicePageTemplate"

export const metadata: Metadata = {
  title: "Conversion-Focused Website Design | Turn Visitors Into Leads",
  description:
    "Kinetic builds conversion-focused websites that turn visitors into leads. CRO best practices, persuasive copy, and high-intent landing pages — built to perform.",
  alternates: {
    canonical: "https://buildwithkinetic.org/conversion-focused-websites",
  },
  openGraph: {
    title: "Conversion-Focused Website Design | Kinetic",
    description:
      "Websites engineered around conversion rate optimization — every element placed and tested to turn more visitors into paying customers.",
    url: "https://buildwithkinetic.org/conversion-focused-websites",
  },
}

const data: ServicePageData = {
  slug: "conversion-focused-websites",
  badge: "Service // Conversion Optimization",
  headline: "Conversion-Focused Website Design",
  subheadline: "Turn More Visitors Into Leads With",
  heroDescription:
    "A beautiful website that doesn't convert is just an expensive art project. We design websites with conversion as the primary objective — using proven CRO frameworks, persuasive copy architecture, and technical performance that keeps visitors engaged.",
  serviceType: "Conversion Rate Optimization & Website Design",
  problemTitle: "High traffic, low leads — the conversion problem",
  problemBody:
    "Getting traffic to your website is only half the battle. If visitors arrive but don't take action — don't fill out a form, don't call, don't buy — your marketing spend is wasted. Conversion rate optimization is the discipline of systematically improving the percentage of visitors who become leads or customers. It's the highest-ROI activity in digital marketing.",
  problemStats: [
    { value: "2.35%", label: "Average website conversion rate", sub: "Most sites leave 97% behind" },
    { value: "11.45%", label: "Top 10% of sites convert at", sub: "The ceiling is much higher" },
    { value: "5x", label: "Revenue increase from 2→10% CVR", sub: "Same traffic, 5x leads" },
  ],
  solutionTitle: "Every page engineered to convert",
  solutionBody:
    "We apply a systematic CRO methodology to every website we build. That means clear value propositions, friction-reduced user flows, strategic CTA placement, trust signals, social proof, and persuasive copywriting — all working together to move visitors toward action.",
  features: [
    {
      icon: "📐",
      title: "CRO Framework",
      description:
        "Every layout decision follows proven conversion frameworks — above-the-fold messaging, F-pattern scanning, progressive disclosure, and benefit-led copy.",
    },
    {
      icon: "✍️",
      title: "Persuasive Copywriting",
      description:
        "Copy that speaks to your buyer's pain, presents a clear solution, handles objections, and drives action. Written by humans who understand sales psychology.",
    },
    {
      icon: "🔑",
      title: "Trust Signal Architecture",
      description:
        "Testimonials, case studies, credentials, security badges, and social proof placed precisely where visitors need reassurance to move forward.",
    },
    {
      icon: "🎯",
      title: "High-Intent Landing Pages",
      description:
        "Dedicated landing pages for each service, campaign, or audience segment — designed to match intent and maximize conversion from paid and organic traffic.",
    },
    {
      icon: "📊",
      title: "A/B Test Ready",
      description:
        "We build sites structured for testing. Headlines, CTAs, layouts, and offers can be A/B tested without developer involvement.",
    },
    {
      icon: "🚦",
      title: "Conversion Funnel Analytics",
      description:
        "We set up funnel tracking, heatmaps, scroll depth, and form analytics — so you have data to make every optimization decision.",
    },
  ],
  processSteps: [
    { number: "01", title: "Conversion Audit", description: "We analyze your current site's conversion funnel, identify drop-off points, and define a performance baseline." },
    { number: "02", title: "Strategy & Wireframes", description: "We wireframe each page as a conversion flow — messaging hierarchy, CTA strategy, and trust signal placement." },
    { number: "03", title: "Design & Develop", description: "Pixel-perfect design execution with high-performance code. Every animation and interaction is purposeful." },
    { number: "04", title: "Test & Optimize", description: "Post-launch, we monitor conversion data and run A/B tests on high-traffic pages to continuously improve CVR." },
  ],
  whyKineticPoints: [
    "Every Kinetic website is built with a documented conversion strategy — not just a design brief.",
    "We write the copy. Not placeholder lorem ipsum — real, conversion-tested headlines and section copy.",
    "We've studied what works: Basecamp, Stripe, and Linear all have conversion architectures we've studied and applied.",
    "We don't just build and leave — we set up analytics and review conversion data with you after launch.",
    "Our sites are built for both human conversion and search engine discovery — CRO and SEO together.",
    "We design mobile-first because most of your audience is on mobile and mobile conversion is often far lower.",
  ],
  faqs: [
    {
      question: "What is conversion rate optimization (CRO)?",
      answer:
        "CRO is the practice of improving the percentage of website visitors who take a desired action — filling out a form, calling your business, or making a purchase. A site converting 2% to 4% doubles your leads with the same traffic.",
    },
    {
      question: "How do you measure conversion improvements?",
      answer:
        "We establish a conversion baseline before any changes, set up goal tracking in analytics, and measure lift after changes go live. We track form submissions, clicks on key CTAs, time on page, and scroll depth.",
    },
    {
      question: "Do you redesign existing websites for better conversions?",
      answer:
        "Yes — CRO audits and redesigns are one of our most requested services. We'll audit your current site, identify the biggest conversion opportunities, and implement targeted improvements.",
    },
    {
      question: "How long before I see results from a conversion-focused redesign?",
      answer:
        "Most clients see measurable conversion improvements within the first 30 days post-launch. Significant lifts in organic traffic from SEO improvements typically take 60–90 days.",
    },
  ],
  relatedServices: [
    { href: "/website-development", label: "Website Development" },
    { href: "/lead-generation-websites", label: "Lead Generation Websites" },
    { href: "/web-app-development", label: "Web App Development" },
    { href: "/business-automation-systems", label: "Business Automation Systems" },
  ],
  relatedIndustries: [
    { href: "/gym-website-development", label: "Gym & Fitness Websites" },
    { href: "/startup-website-development", label: "Startup Website Development" },
    { href: "/service-business-websites", label: "Service Business Websites" },
    { href: "/small-business-website-development", label: "Small Business Website Development" },
  ],
  ctaHeadline: "Your website should be working harder for you.",
  ctaSubtext:
    "Get a free conversion audit. We'll show you exactly where visitors are dropping off and what it'll take to fix it.",
}

export default function ConversionFocusedWebsitesPage() {
  return <ServicePageTemplate data={data} />
}
