import ServicePageLayout from '@/components/ServicePageLayout'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SEO & Visibility — Kinetic',
  description: 'Technical SEO, Google Business Profile, local search, and content strategy to help the right people find you online.',
  alternates: { canonical: 'https://buildwithkinetic.org/services/seo' },
  openGraph: {
    title: 'SEO & Visibility | Kinetic',
    description: 'Technical SEO, Google Business Profile, and content strategy for businesses.',
    url: 'https://buildwithkinetic.org/services/seo',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SEO & Visibility | Kinetic',
    description: 'Technical SEO and local search strategy for businesses in India.',
    creator: '@buildwithkinetic',
  },
}

export default function SeoPage() {
  return (
    <ServicePageLayout
      badge="Service 02 — SEO & Visibility"
      headline="Rank on Google for what"
      headlineAccent="your clients are searching."
      subline="SEO is not magic and it is not instant. It is a set of specific, measurable actions that compound over time. Kinetic builds the technical foundation and content strategy that puts you in front of the right searches — and keeps you there."
      stats={[
        { value: '30 days', label: 'To first ranking improvements' },
        { value: '100', label: 'Lighthouse score foundation' },
        { value: 'Long-term', label: 'Compounding returns' },
        { value: '0', label: 'Paid ads needed' },
      ]}
      whatWeDeliver={[
        { num: '01', title: 'Technical SEO Audit', desc: 'A full crawl of your site covering Core Web Vitals, crawlability, indexation, canonical tags, structured data, and sitemap health. Every issue identified with a priority fix list.' },
        { num: '02', title: 'Google Business Profile', desc: 'Full setup or optimisation of your GBP listing — categories, service areas, description, photos, posts, and review strategy. Appear in Google Maps results for your service and location.' },
        { num: '03', title: 'On-Page Optimisation', desc: 'Title tags, meta descriptions, H1/H2 structure, internal linking, image alt text, and page speed — all corrected and optimised for your target keywords.' },
        { num: '04', title: 'Keyword Research & Strategy', desc: 'Identify the exact search terms your ideal clients use. Map them to pages on your site. Build a content plan that targets high-intent queries you can realistically rank for.' },
        { num: '05', title: 'Content Strategy', desc: 'A blog and page structure that builds authority on your topic over time. Not random posts — a deliberate plan to capture searches at every stage of your buyer journey.' },
        { num: '06', title: 'Monthly Reporting', desc: 'Clear reports showing keyword rankings, organic traffic, Google Business Profile impressions, and click-through rates. You always know what is working and what needs attention.' },
      ]}
      whyItMatters={[
        { title: 'Organic traffic compounds', desc: 'A paid ad stops the moment you stop paying. An SEO-optimised page keeps generating traffic months and years later. The return on investment grows over time.' },
        { title: 'Intent is everything', desc: 'Someone searching "website development for my startup" has already decided they need this. SEO puts you in front of people at the exact moment they are looking for what you offer.' },
        { title: 'Your competitors are doing it', desc: 'If you are not actively managing your SEO, the businesses ranking above you are. Every month without an SEO strategy is market share handed to someone else.' },
      ]}
      process={[
        { step: '01', title: 'Audit & Baseline', desc: 'We establish exactly where you rank today, what technical issues exist, and what your highest-opportunity keywords are.' },
        { step: '02', title: 'Technical Fixes', desc: 'We resolve all technical SEO issues — speed, crawlability, indexation, structured data. The foundation has to be right before content works.' },
        { step: '03', title: 'On-Page Optimisation', desc: 'Every key page is updated with the correct title, meta, headers, and content structure for its target keyword.' },
        { step: '04', title: 'Content & GBP', desc: 'New content is created or existing content is improved. GBP is optimised and a posting cadence is established.' },
        { step: '05', title: 'Monthly Monitoring', desc: 'Rankings are tracked, reports are delivered, and the strategy is adjusted based on what the data shows.' },
      ]}
      faq={[
        { q: 'How long does SEO take to work?', a: 'Technical fixes and GBP improvements can show results within weeks. Keyword rankings typically take 3–6 months of consistent work. Kinetic is honest about timelines — we do not promise Page 1 in 30 days.' },
        { q: 'Do I need to write the blog posts?', a: 'No. Kinetic researches, writes, and publishes content as part of the service. You review and approve before anything goes live.' },
        { q: 'Can you fix an existing website for SEO without rebuilding it?', a: 'Yes. If your site is on a manageable platform, we can implement on-page fixes without a rebuild. Some technical fixes require code access — we assess this on the discovery call.' },
        { q: 'Is this for local SEO or national?', a: 'Both. We build the right strategy based on your business type. Service businesses with a physical location benefit most from local SEO. Products and SaaS companies need broader keyword strategies.' },
      ]}
      relatedServices={[
        { title: 'Website Development', desc: 'Build an SEO-ready website from the ground up.', href: '/services/website-development' },
        { title: 'Full Stack Web Apps', desc: 'Need a technically solid foundation for complex SEO requirements?', href: '/services/full-stack' },
        { title: 'Lead Generation & CRM', desc: 'Convert the organic traffic SEO brings into tracked leads.', href: '/services/lead-generation' },
      ]}
    />
  )
}
