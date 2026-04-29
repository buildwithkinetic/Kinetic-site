import ServicePageLayout from '@/components/ServicePageLayout'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lead Generation & CRM — Kinetic',
  description: 'End-to-end lead capture systems — forms, pipelines, auto-responses, and full visibility over every enquiry.',
  alternates: { canonical: 'https://buildwithkinetic.org/services/lead-generation' },
  openGraph: {
    title: 'Lead Generation & CRM | Kinetic',
    description: 'Capture every lead with forms, CRM pipelines, and automated follow-ups.',
    url: 'https://buildwithkinetic.org/services/lead-generation',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lead Generation & CRM | Kinetic',
    description: 'End-to-end lead capture and CRM systems for businesses.',
    creator: '@buildwithkinetic',
  },
}

export default function LeadGenerationPage() {
  return (
    <ServicePageLayout
      badge="Service 03 — Lead Generation & CRM"
      headline="Every enquiry captured."
      headlineAccent="Nothing falls through."
      subline="Most businesses get enquiries. Most businesses also lose them — to slow responses, missed messages, or no system to follow up. Kinetic builds the complete capture and tracking infrastructure so every lead is seen, responded to, and followed up."
      stats={[
        { value: '60s', label: 'Auto-response time' },
        { value: '100%', label: 'Enquiries tracked' },
        { value: '3 wks', label: 'Fully live' },
        { value: '0', label: 'Leads lost to slow response' },
      ]}
      whatWeDeliver={[
        { num: '01', title: 'Multi-Step Lead Capture Forms', desc: 'Forms that qualify leads before they reach you — capturing service interest, timing, budget, and source. Every submission routes directly into your CRM.' },
        { num: '02', title: 'CRM Dashboard', desc: 'A clean, simple pipeline showing every lead by stage — New, Contacted, Proposal, Closed. See your conversion rate, follow-up dues, and open enquiries at a glance.' },
        { num: '03', title: '60-Second Auto-Response', desc: 'The moment someone submits a form, they receive an automatic acknowledgement. You beat every competitor who takes hours to respond — before you have even seen the enquiry.' },
        { num: '04', title: 'Source Tracking', desc: 'Every lead tagged by where it came from — Google, Instagram, referral, direct. You know exactly which channels are working and which are not.' },
        { num: '05', title: 'Email Notifications', desc: 'You get an immediate email with every new lead — full details, contact info, and their specific enquiry. No need to log into a dashboard to stay updated.' },
        { num: '06', title: 'Weekly Pipeline Reports', desc: 'Every week, a summary of new leads, conversion rates, and open follow-ups — delivered to your inbox automatically.' },
      ]}
      whyItMatters={[
        { title: 'Response time determines who gets hired', desc: 'Studies consistently show that responding to a lead within 5 minutes makes you 21x more likely to qualify them. Kinetic automates the first response so you are always first.' },
        { title: 'You cannot improve what you cannot see', desc: 'Without a CRM, you have no idea how many leads you receive, which sources convert, or where leads drop off. Data-driven decisions start with visibility.' },
        { title: 'WhatsApp is not a CRM', desc: 'Managing leads through WhatsApp means lost context, missed follow-ups, and no reporting. A proper system costs less than the leads you are currently losing.' },
      ]}
      process={[
        { step: '01', title: 'Discovery & Mapping', desc: 'We map your current lead flow — where enquiries come from, how they are handled, and where they get lost. This defines exactly what to build.' },
        { step: '02', title: 'Form & CRM Build', desc: 'We build your lead capture forms and configure the CRM pipeline. Stages, fields, and labels are set up to match how your business actually operates.' },
        { step: '03', title: 'Auto-Response Setup', desc: 'Email templates are written and approved by you. The auto-response is tested across multiple devices and email clients before going live.' },
        { step: '04', title: 'Integration & Testing', desc: 'Forms are embedded on your website. Every submission is tested end-to-end. We confirm you receive notifications correctly and the CRM populates as expected.' },
        { step: '05', title: 'Handover & Training', desc: 'A 30-minute walkthrough covering how to use the CRM dashboard, how to update pipeline stages, and how to read your weekly reports.' },
      ]}
      faq={[
        { q: 'What CRM platform do you use?', a: 'We build custom CRM dashboards using Supabase as the database. This means you own the data completely — no monthly SaaS fees, no platform lock-in.' },
        { q: 'Can this connect to my existing website?', a: 'Yes. The lead capture form can be embedded into any website — Next.js, WordPress, Webflow, or custom. It does not require a rebuild.' },
        { q: 'What if I get enquiries through Instagram DMs or WhatsApp?', a: 'We can set up a simple intake page that you share with prospects — a clean form that routes everything into the same CRM. All leads in one place regardless of where they started.' },
        { q: 'Can the CRM handle multiple team members?', a: 'Yes. Multiple users can access the dashboard with different permission levels. Useful for businesses with sales staff or admin support.' },
      ]}
      relatedServices={[
        { title: 'Automation Systems', desc: 'Follow up with leads automatically — without manual effort.', href: '/services/automation' },
        { title: 'Website Development', desc: 'Build a website that feeds your new lead system.', href: '/services/website-development' },
        { title: 'AI Agents', desc: 'Use AI to qualify and respond to leads around the clock.', href: '/services/ai-agents' },
      ]}
    />
  )
}
