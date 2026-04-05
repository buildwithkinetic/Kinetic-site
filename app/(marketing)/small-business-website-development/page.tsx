import type { Metadata } from "next"
import { IndustryPageTemplate } from "@/components/marketing/IndustryPageTemplate"
import type { IndustryPageData } from "@/components/marketing/IndustryPageTemplate"

export const metadata: Metadata = {
  title: "Small Business Website Development | Grow Your Revenue",
  description:
    "Kinetic builds professional websites for small businesses. Capture more leads, rank on Google, and build credibility with a site that works hard.",
  alternates: {
    canonical: "https://buildwithkinetic.org/small-business-website-development",
  },
  openGraph: {
    title: "Small Business Website Development | Kinetic",
    description:
      "Professional websites for small businesses that capture leads, rank on Google, and build credibility in your market.",
    url: "https://buildwithkinetic.org/small-business-website-development",
  },
}

const data: IndustryPageData = {
  slug: "small-business-website-development",
  badge: "Industry // Small Business",
  industryName: "Small Business",
  subheadline: "Revenue-Generating Websites for",
  headline: "Small Business Website Development",
  heroDescription:
    "Your small business deserves a website that punches above its weight. We build professional, fast, and conversion-focused websites that help small businesses compete with larger competitors, rank in Google, and generate consistent inbound leads.",
  problemTitle: "Small business websites are failing their owners",
  problemBody:
    "Most small business websites were built years ago on a cheap template, haven't been updated since, and aren't generating a single lead. Meanwhile, your competitor with a better website is capturing all the organic search traffic for your services. A professional, SEO-optimized website is no longer optional — it's your most important marketing asset.",
  problemPoints: [
    "Outdated design that makes your business look less credible than it is",
    "Not mobile-friendly — 60%+ of your potential customers are on phones",
    "Invisible on Google — not ranking for any local or service keywords",
    "No way to capture leads — visitors come and go with no contact mechanism",
    "DIY website that's slow, insecure, and impossible to update",
    "No social proof or trust signals — no reviews, no case studies, no results",
  ],
  solutionTitle: "A professional website that levels the playing field",
  solutionBody:
    "We build small business websites with the same quality and technical excellence we apply to enterprise clients — but scoped and priced for your stage. Fast, mobile-perfect, SEO-optimized, and built to convert the visitors who find you into customers who call you.",
  features: [
    {
      icon: "🎨",
      title: "Professional Design",
      description:
        "A custom design that reflects your brand, builds credibility, and looks better than 95% of competitors in your local market.",
    },
    {
      icon: "📍",
      title: "Local SEO Optimization",
      description:
        "Rank in Google for '[service] in [city]' searches. Local business schema, Google My Business setup guidance, and location-optimized content.",
    },
    {
      icon: "📞",
      title: "Lead Capture System",
      description:
        "Contact forms, click-to-call buttons, and quote request forms that capture high-intent leads at the moment they're ready to buy.",
    },
    {
      icon: "⭐",
      title: "Reviews & Social Proof",
      description:
        "Google reviews integration, testimonials, and before/after galleries that build the trust small businesses need to convert new customers.",
    },
    {
      icon: "📱",
      title: "Mobile-First",
      description:
        "Built mobile-first so the experience is perfect on the phone — where most local searches happen — not just an afterthought.",
    },
    {
      icon: "🔐",
      title: "Secure & Maintained",
      description:
        "SSL certificate, regular security updates, automated backups, and uptime monitoring — so your site is always safe and live.",
    },
  ],
  resultsStats: [
    { value: "Page 1", label: "Google ranking for local keywords", sub: "Achievable within 60–90 days" },
    { value: "5x", label: "More leads than DIY website", sub: "Average improvement" },
    { value: "48hrs", label: "Response time for updates", sub: "On our maintenance plans" },
  ],
  faqs: [
    {
      question: "How is Kinetic different from Wix, Squarespace, or a local web designer?",
      answer:
        "We build on Next.js — a professional-grade framework used by companies like Netflix and Airbnb — not template drag-and-drop tools. The difference is performance (faster), SEO (better), and conversion (more leads). Vs. a local designer, we combine technical excellence with a proven conversion strategy.",
    },
    {
      question: "How much does a small business website cost?",
      answer:
        "A standard small business website (5–8 pages, contact form, local SEO) starts at $4,500. Prices vary based on the number of pages, custom features, and integrations. We provide a fixed-price quote after a discovery call — no surprises.",
    },
    {
      question: "Do you offer payment plans?",
      answer:
        "Yes. We offer flexible payment plans split across project milestones. Typically 50% at kick-off, 25% at design approval, and 25% at launch.",
    },
    {
      question: "Can you update my existing website instead of building a new one?",
      answer:
        "Depends on what it's built on. If it's on WordPress, Webflow, or a custom CMS, we can often update and improve it. If it's on a proprietary platform or page builder that's limiting performance, a rebuild is usually the better long-term investment.",
    },
  ],
  relatedServices: [
    { href: "/website-development", label: "Website Development" },
    { href: "/conversion-focused-websites", label: "Conversion-Focused Websites" },
    { href: "/lead-generation-websites", label: "Lead Generation Websites" },
    { href: "/business-automation-systems", label: "Business Automation" },
  ],
  relatedIndustries: [
    { href: "/service-business-websites", label: "Service Business Websites" },
    { href: "/gym-website-development", label: "Gym & Fitness Websites" },
    { href: "/startup-website-development", label: "Startup Website Development" },
  ],
  ctaHeadline: "Your business deserves a website that works.",
  ctaSubtext:
    "Book a free consultation. We'll audit your current site and show you exactly what's costing you customers.",
}

export default function SmallBusinessWebsiteDevelopmentPage() {
  return <IndustryPageTemplate data={data} />
}
