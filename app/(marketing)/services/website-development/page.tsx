import ServicePageLayout from '@/components/ServicePageLayout'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Website Development — Kinetic',
  description: 'Conversion-focused websites built on Next.js. Fast, mobile-first, and engineered to turn visitors into leads and clients.',
  alternates: { canonical: 'https://buildwithkinetic.org/services/website-development' },
}

export default function WebsiteDevelopmentPage() {
  return (
    <ServicePageLayout
      badge="Service 01 — Website Development"
      headline="A website that actually"
      headlineAccent="does something."
      subline="Most websites are digital brochures. Kinetic builds conversion systems — fast, mobile-first, engineered to turn the right visitors into booked clients and qualified leads."
      stats={[
        { value: 'Sub-2s', label: 'Load time on mobile' },
        { value: '100', label: 'Lighthouse performance score' },
        { value: '2–4 wks', label: 'From brief to live' },
        { value: '100%', label: 'Owned by you' },
      ]}
      whatWeDeliver={[
        { num: '01', title: 'Conversion-First Architecture', desc: 'Every page is structured to guide visitors toward one clear action. No confusion, no dead ends. The information hierarchy is built around how your clients actually make decisions.' },
        { num: '02', title: 'Next.js + Vercel Stack', desc: 'Built on the same stack used by Vercel, Anthropic, and top-tier startups. Sub-2 second load times globally, automatically scaling, zero maintenance downtime.' },
        { num: '03', title: 'Mobile-First Design', desc: 'Over 70% of your clients will see your website on a phone first. Every layout, font size, touch target, and interaction is designed for mobile before desktop.' },
        { num: '04', title: 'SEO-Ready Foundation', desc: 'Semantic HTML, proper heading hierarchy, meta tags, Open Graph, structured data, sitemap, and robots.txt — all configured correctly from day one.' },
        { num: '05', title: 'Lead Capture Integration', desc: 'Contact forms, enquiry flows, and CTA buttons connected to your email or CRM. Every visitor who takes action is captured and tracked.' },
        { num: '06', title: 'Full Handover', desc: 'You get the GitHub repository, Vercel project, domain configuration, and a walkthrough of how to make basic updates yourself. No dependency on Kinetic after delivery.' },
      ]}
      whyItMatters={[
        { title: 'First impressions happen in 50ms', desc: 'Before a visitor reads a word, they have already judged your credibility. A slow, dated, or cluttered website loses clients before the conversation starts.' },
        { title: 'Speed is a revenue metric', desc: 'Every 1-second delay in page load reduces conversions by 7%. A site that loads in 1.8 seconds vs 6 seconds is not a technical difference — it is a business difference.' },
        { title: 'You should own your platform', desc: 'Wix, Squarespace, and similar platforms lock you in. Kinetic-built sites live in your GitHub account, deployed on your Vercel project. You own every line of code.' },
      ]}
      process={[
        { step: '01', title: 'Discovery Call — 30 minutes', desc: 'We understand your business, your clients, your competitors, and what a successful website looks like for you specifically.' },
        { step: '02', title: 'Sitemap & Wireframe', desc: 'We define every page, every section, and every call to action before writing a single line of code. You approve the structure before we build.' },
        { step: '03', title: 'Design & Build Sprint', desc: 'The site is built in a focused 2–3 week sprint. You see real progress every few days, not a big reveal at the end.' },
        { step: '04', title: 'Review & Refinement', desc: 'You review the live staging URL and request any changes. We implement them until you are satisfied.' },
        { step: '05', title: 'Launch & Handover', desc: 'We connect your domain, run final checks, and hand over every login, credential, and access detail. The site is yours.' },
      ]}
      faq={[
        { q: 'Do I need to provide the copy and images?', a: 'We can work with whatever you have. If you have existing content, we structure and refine it. If you need copy written, we include that in the scope discussion.' },
        { q: 'What if I already have a website?', a: 'We assess your current site on the discovery call. Sometimes a full rebuild makes sense. Sometimes specific improvements are the right move. We will tell you honestly which one applies.' },
        { q: 'Can you build e-commerce?', a: 'Yes. Stripe, Razorpay, and custom checkout flows are all in scope. Discuss your requirements on the discovery call.' },
        { q: 'How do I make updates after launch?', a: 'We include a handover walkthrough covering how to edit content. For ongoing updates, we offer maintenance retainers — or you can hire any Next.js developer to work on the codebase.' },
        { q: 'What is the typical cost?', a: 'Every project is scoped individually on the discovery call. We give you a fixed price before any work begins — no hourly billing, no scope creep surprises.' },
      ]}
      relatedServices={[
        { title: 'SEO & Visibility', desc: 'Make sure the right people can actually find your new website.', href: '/services/seo' },
        { title: 'Lead Generation & CRM', desc: 'Connect your website to a full lead capture and tracking system.', href: '/services/lead-generation' },
        { title: 'Full Stack Web Apps', desc: 'Need something more complex than a marketing website?', href: '/services/full-stack' },
      ]}
    />
  )
}
