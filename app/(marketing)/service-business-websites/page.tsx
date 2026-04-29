import type { Metadata } from "next"
import { IndustryPageTemplate } from "@/components/marketing/IndustryPageTemplate"
import type { IndustryPageData } from "@/components/marketing/IndustryPageTemplate"

export const metadata: Metadata = {
  title: "Service Business Website Development | Get More Clients",
  description:
    "Kinetic builds websites for service businesses — consultants, agencies, law firms, and contractors. Generate inbound leads and close more clients.",
  alternates: {
    canonical: "https://buildwithkinetic.org/service-business-websites",
  },
  openGraph: {
    title: "Service Business Website Development | Kinetic",
    description:
      "Websites for service businesses that build authority, generate leads, and close more clients. Built on Next.js with full SEO.",
    url: "https://buildwithkinetic.org/service-business-websites",
  },
}

const data: IndustryPageData = {
  slug: "service-business-websites",
  badge: "Industry // Service Businesses",
  industryName: "Service Businesses",
  subheadline: "Authority-Building Websites for",
  headline: "Service Business Website Development",
  heroDescription:
    "Service businesses win on credibility and trust — and your website is where that trust is built or lost. We design websites for consultants, agencies, contractors, law firms, and service businesses that establish authority, attract high-quality leads, and convert them into clients.",
  problemTitle: "Service businesses lose clients before the first conversation",
  problemBody:
    "When a potential client is evaluating service providers, they will Google you. What they find in that moment determines whether they book a call or move to your competitor. A generic, template website signals low credibility. A slow, outdated site signals you're not invested in your business. A site with no testimonials or case studies offers no reason to choose you. Your website is doing one of two things: building trust or destroying it.",
  problemPoints: [
    "Generic template sites that look identical to hundreds of competitors",
    "No case studies or proof of results — just vague claims about being 'dedicated'",
    "No clear process — prospects can't tell how working with you actually works",
    "No SEO — missing all the organic search traffic for your services",
    "No lead magnet or content strategy — no way to capture prospects who aren't ready to buy yet",
    "Pricing buried or absent — wasting both your time and theirs on unqualified calls",
  ],
  solutionTitle: "A website that positions you as the obvious choice",
  solutionBody:
    "We build service business websites that establish you as an authority in your field — with clear positioning, compelling case studies, and a content strategy that attracts your ideal clients through organic search. Paired with smart lead capture, your website becomes a system that generates qualified calls while you deliver results for existing clients.",
  features: [
    {
      icon: "🏆",
      title: "Authority Positioning",
      description:
        "Clear, differentiated positioning that explains exactly who you serve, what you do, and why you're the best at it. No generic buzzwords — real specificity.",
    },
    {
      icon: "📖",
      title: "Case Study Architecture",
      description:
        "Detailed case study pages that show the problem, process, and results — the most powerful sales tool a service business can have.",
    },
    {
      icon: "🔄",
      title: "Process Showcase",
      description:
        "A clear, visual representation of how you work — removing uncertainty and letting clients understand exactly what they're buying.",
    },
    {
      icon: "✍️",
      title: "Content & Blog Strategy",
      description:
        "A blog and resource section that attracts your ideal clients through SEO — positioning you as the expert they want to hire.",
    },
    {
      icon: "📅",
      title: "Booking & Qualification",
      description:
        "Calendly or custom booking integration with qualification questions so you only spend time on calls with the right prospects.",
    },
    {
      icon: "💡",
      title: "Lead Magnet System",
      description:
        "Free audits, guides, or templates that capture email addresses from prospects not yet ready to buy — and nurture them toward a call.",
    },
  ],
  resultsStats: [
    { value: "4x", label: "More qualified inbound leads", sub: "Vs. previous template site" },
    { value: "60%", label: "Reduction in unqualified calls", sub: "With intake qualification" },
    { value: "2x", label: "Average close rate improvement", sub: "When prospects are better informed" },
  ],
  faqs: [
    {
      question: "What types of service businesses do you work with?",
      answer:
        "We work with consultants, marketing agencies, law firms, accounting firms, financial advisors, contractors, coaches, recruiting firms, and any other service business that generates revenue through expertise and client relationships.",
    },
    {
      question: "How important is a blog for a service business website?",
      answer:
        "For service businesses, a blog is one of the highest-ROI investments you can make. Well-written articles targeting the questions your clients Google establish you as an expert, drive organic traffic, and capture leads at the top of the funnel. We build the architecture and can help with an initial content strategy.",
    },
    {
      question: "Should we show pricing on our service business website?",
      answer:
        "It depends on your service model. For productized services with clear scope, yes — showing pricing filters out unqualified leads and builds trust. For custom-scope engagements, a 'starting from' price or pricing framework explanation is a good middle ground. We'll help you make the right decision for your specific business.",
    },
    {
      question: "Can you help us write the copy for our website?",
      answer:
        "Yes. Copywriting is included in our service business website projects. We research your clients, competitors, and offer, then write positioning statements, service descriptions, and CTA copy that speaks directly to your buyer's mindset.",
    },
  ],
  relatedServices: [
    { href: "/website-development", label: "Website Development" },
    { href: "/lead-generation-websites", label: "Lead Generation Websites" },
    { href: "/conversion-focused-websites", label: "Conversion-Focused Design" },
    { href: "/crm-dashboard-development", label: "CRM Dashboard Development" },
  ],
  relatedIndustries: [
    { href: "/small-business-website-development", label: "Small Business Websites" },
    { href: "/startup-website-development", label: "Startup Website Development" },
    { href: "/gym-website-development", label: "Gym & Fitness Websites" },
  ],
  ctaHeadline: "Position your service business as the obvious choice.",
  ctaSubtext:
    "Book a free audit. We'll review your current site and show you exactly what changes would generate more qualified leads.",
}

export default function ServiceBusinessWebsitesPage() {
  return <IndustryPageTemplate data={data} />
}
