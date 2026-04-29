import type { Metadata } from "next"
import { IndustryPageTemplate } from "@/components/marketing/IndustryPageTemplate"
import type { IndustryPageData } from "@/components/marketing/IndustryPageTemplate"

export const metadata: Metadata = {
  title: "Website Development for Startups | Kinetic",
  description:
    "Startup websites built to convert early visitors into users and leads. Fast, conversion-focused, and ready in 2 weeks.",
}

const data: IndustryPageData = {
  slug: "startup-website-development",
  badge: "Industry // Startups",
  industryName: "Startups",
  subheadline: "Growth-Ready Websites for",
  headline: "Startup Website Development",
  heroDescription:
    "Your startup website is your pitch deck to the world. It needs to communicate your vision instantly, build credibility with investors, capture early users, and scale with you from MVP to Series A and beyond — all without breaking your runway.",
  problemTitle: "Startup websites are built for the wrong goal",
  problemBody:
    "Most startup websites are built by agencies that don't understand growth. They deliver beautiful branding but miss the fundamentals: clear value proposition, SEO architecture, investor-grade credibility signals, and a lead capture system that works before you have a marketing team. By the time you realize the site isn't working, you've burned budget and time.",
  problemPoints: [
    "No clear value proposition — visitors can't tell what the product does in 5 seconds",
    "Built on Wix or Squarespace — terrible performance, impossible to scale",
    "No SEO — zero organic discovery when competitors are gaining traction in search",
    "No waitlist or lead capture — pre-launch traffic wasted with no way to collect emails",
    "Doesn't scale — template site needs a rebuild the moment you raise your seed round",
    "No analytics — no idea what content resonates or where investors and users drop off",
  ],
  solutionTitle: "A website infrastructure that grows with your startup",
  solutionBody:
    "We build startup websites on Next.js — the same tech stack used by companies like Vercel, Loom, and Notion. That means blazing performance, scalable architecture, and a codebase you can grow into without rebuilding from scratch every 12 months.",
  features: [
    {
      icon: "🚀",
      title: "Product Story Architecture",
      description:
        "We craft the narrative flow: problem, solution, how it works, social proof, and CTA — structured to keep investors and users reading from top to bottom.",
    },
    {
      icon: "📧",
      title: "Waitlist & Early Access System",
      description:
        "Pre-launch landing pages with waitlist sign-up, referral mechanics, and automated email sequences to build anticipation before you launch.",
    },
    {
      icon: "🤝",
      title: "Investor Credibility Signals",
      description:
        "Backer logos, press mentions, team profiles, metrics, and case studies displayed with precision to build credibility with sophisticated investors.",
    },
    {
      icon: "⚡",
      title: "Core Web Vitals Excellence",
      description:
        "Perfect Lighthouse scores. Sub-2s load times globally via Vercel's edge network. Technical excellence that signals product quality to every visitor.",
    },
    {
      icon: "📈",
      title: "Growth Infrastructure",
      description:
        "Blog architecture, SEO configuration, analytics, and A/B test infrastructure built in from day one — ready for your growth team to activate.",
    },
    {
      icon: "🔌",
      title: "Product Integration",
      description:
        "App screenshots, demo videos, live product embeds, and interactive previews that let prospects experience your product before they sign up.",
    },
  ],
  resultsStats: [
    { value: "2wks", label: "From kick-off to live waitlist page", sub: "So you don't lose early momentum" },
    { value: "100", label: "Lighthouse performance score", sub: "Consistently achieved" },
    { value: "$0", label: "Rebuild cost when you raise", sub: "Built to scale from day one" },
  ],
  faqs: [
    {
      question: "We're pre-launch — should we build a full website or just a landing page?",
      answer:
        "Pre-launch, a high-converting single-page waitlist site is usually the right move — focused on capturing emails and validating demand. We build these in 1–2 weeks. Post-raise, we expand it into a full product website. We can build both in sequence with minimal rework.",
    },
    {
      question: "Can you work within our seed-round budget?",
      answer:
        "Yes. We've worked with pre-seed and seed-stage startups on budgets from $5k to $30k depending on scope. We scope honestly and tell you what's possible at your budget level. We'd rather do a great focused job than overpromise.",
    },
    {
      question: "What if we need to update the site frequently as our product evolves?",
      answer:
        "We can integrate a headless CMS (Sanity or Contentful) so your team can update product pages, blog, and marketing content without needing a developer. For startups that want developer control, we hand over clean, documented code your team can own.",
    },
    {
      question: "Do you understand technical products — B2B SaaS, API tools, developer platforms?",
      answer:
        "Yes. We've built websites for B2B SaaS, API-first products, developer tools, and AI platforms. We know how to make technical products understandable and compelling to both technical and non-technical audiences.",
    },
  ],
  relatedServices: [
    { href: "/website-development", label: "Website Development" },
    { href: "/web-app-development", label: "Web App Development" },
    { href: "/lead-generation-websites", label: "Lead Generation & Waitlist Systems" },
    { href: "/conversion-focused-websites", label: "Conversion-Focused Design" },
  ],
  relatedIndustries: [
    { href: "/small-business-website-development", label: "Small Business Websites" },
    { href: "/service-business-websites", label: "Service Business Websites" },
    { href: "/gym-website-development", label: "Gym & Fitness Websites" },
  ],
  ctaHeadline: "Let's build your startup's growth engine.",
  ctaSubtext:
    "Book a free strategy call. We'll help you figure out exactly what your website needs to do — and how to build it right the first time.",
}

export default function StartupWebsiteDevelopmentPage() {
  return <IndustryPageTemplate data={data} />
}
