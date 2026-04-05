import ServicePageLayout from '@/components/ServicePageLayout'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Automation Systems — Kinetic',
  description: 'Follow-ups, review requests, renewals, and repeat bookings — running on autopilot. Built with n8n and handed over to you.',
  alternates: { canonical: 'https://buildwithkinetic.org/services/automation' },
}

export default function AutomationPage() {
  return (
    <ServicePageLayout
      badge="Service 04 — Automation Systems"
      headline="Your business running"
      headlineAccent="while you sleep."
      subline="Every follow-up that does not happen is revenue left behind. Kinetic builds automation workflows that handle your repetitive business processes — follow-ups, reminders, review requests, renewals — without you being involved at all."
      stats={[
        { value: '0', label: 'Manual follow-ups needed' },
        { value: '24/7', label: 'System runs continuously' },
        { value: 'n8n', label: 'Open source — you own it' },
        { value: '2 wks', label: 'Typical build time' },
      ]}
      whatWeDeliver={[
        { num: '01', title: 'Lead Follow-Up Sequences', desc: 'Automated email or WhatsApp messages sent at defined intervals after a new enquiry. Day 1, Day 3, Day 7 — customised to your sales cycle and tone.' },
        { num: '02', title: 'Review Request Automation', desc: 'After a job is completed or a service delivered, an automatic message asks for a Google review — sent at exactly the right moment, with a direct link.' },
        { num: '03', title: 'Renewal & Retention Campaigns', desc: 'Clients with annual contracts, recurring services, or subscription models receive automated renewal reminders before their expiry date.' },
        { num: '04', title: 'Onboarding Flows', desc: 'When a new client signs on, an automated onboarding sequence sends them everything they need — documents, next steps, and check-in messages — without manual effort.' },
        { num: '05', title: 'Notification Routing', desc: 'Internal automations that notify the right team member when a lead changes stage, a form is submitted, or a deadline is approaching.' },
        { num: '06', title: 'Seasonal Campaigns', desc: 'Pre-built campaigns triggered by dates or time-based conditions. Pre-summer service offers, renewal pushes, or re-engagement campaigns for inactive clients.' },
      ]}
      whyItMatters={[
        { title: '80% of sales need 5+ touchpoints', desc: 'Most businesses follow up once or not at all. Automated sequences ensure every lead gets the right number of touchpoints — without relying on someone remembering to do it.' },
        { title: 'Consistency is the competitive advantage', desc: 'Your competitor forgets to follow up sometimes. Your automation never does. Consistency at scale is something humans cannot match — systems can.' },
        { title: 'n8n means you own the infrastructure', desc: 'Unlike Zapier or Make, n8n workflows are self-hosted and open source. No per-task fees, no platform risk. The workflows Kinetic builds belong to you.' },
      ]}
      process={[
        { step: '01', title: 'Workflow Mapping', desc: 'We map every repetitive process in your business that could be automated. Discovery, follow-up, onboarding, renewal, review collection — all documented.' },
        { step: '02', title: 'Message Writing & Approval', desc: 'Every automated message is written by Kinetic in your tone and reviewed by you before going live. Nothing sends without your sign-off.' },
        { step: '03', title: 'n8n Build & Testing', desc: 'Workflows are built in n8n, tested thoroughly with real data, and verified across all connected channels — email, WhatsApp, CRM.' },
        { step: '04', title: 'Integration', desc: 'Automations are connected to your existing CRM, forms, website, and communication channels. Everything talks to everything.' },
        { step: '05', title: 'Handover', desc: 'You receive access to the n8n dashboard, a walkthrough of every workflow, and documentation on how to modify triggers or messages yourself.' },
      ]}
      faq={[
        { q: 'What channels can you automate?', a: 'Email, WhatsApp (via WhatsApp Business API), SMS, Slack notifications, Google Sheets, and CRM updates. The right channel depends on your business and your clients.' },
        { q: 'Is WhatsApp automation legal?', a: 'Yes, using the official WhatsApp Business API. All messages are opt-in compliant. Kinetic sets up the API account and ensures all automations follow Meta messaging policies.' },
        { q: 'What if I want to change a message after launch?', a: 'n8n makes this straightforward — message templates can be updated without rebuilding the workflow. We walk you through this in the handover.' },
        { q: 'Can automation replace my sales team?', a: 'No — and it should not try to. Automation handles the volume tasks: initial acknowledgement, follow-up nudges, review requests. Your team handles the conversations that require judgment.' },
      ]}
      relatedServices={[
        { title: 'Lead Generation & CRM', desc: 'Build the pipeline that your automations will run on.', href: '/services/lead-generation' },
        { title: 'AI Agents', desc: 'Take automation further with AI that can reason and respond.', href: '/services/ai-agents' },
        { title: 'Full Stack Web Apps', desc: 'Need a custom dashboard or portal to support your workflows?', href: '/services/full-stack' },
      ]}
    />
  )
}
