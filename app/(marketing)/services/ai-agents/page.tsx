import ServicePageLayout from '@/components/ServicePageLayout'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Agents — Kinetic',
  description: 'Custom AI agents that handle enquiries, qualify leads, and manage workflows — built for your specific business.',
  alternates: { canonical: 'https://buildwithkinetic.org/services/ai-agents' },
  openGraph: {
    title: 'AI Agents | Kinetic',
    description: 'Custom AI agents that qualify leads, answer questions, and manage workflows.',
    url: 'https://buildwithkinetic.org/services/ai-agents',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Agents | Kinetic',
    description: 'AI agents built for your business — lead qualification, support, and automation.',
    creator: '@buildwithkinetic',
  },
}

export default function AiAgentsPage() {
  return (
    <ServicePageLayout
      badge="Service 06 — AI Agents"
      headline="An AI that works"
      headlineAccent="for your business specifically."
      subline="Generic chatbots answer generic questions. Kinetic builds AI agents trained on your services, your pricing, your process, and your tone — that can qualify leads, answer real questions, and route the right conversations to you."
      stats={[
        { value: '24/7', label: 'Always available' },
        { value: 'Claude', label: 'Powered by Anthropic' },
        { value: '< 2s', label: 'Response time' },
        { value: '100%', label: 'Trained on your business' },
      ]}
      whatWeDeliver={[
        { num: '01', title: 'Lead Qualification Agents', desc: 'An AI agent embedded in your website or WhatsApp that asks the right questions, qualifies the prospect, and routes serious enquiries to you — filtering out time-wasters automatically.' },
        { num: '02', title: 'Customer Support Agents', desc: 'An AI that can answer your most common questions accurately — pricing, availability, process, policies — freeing you from repetitive enquiries while ensuring prospects get instant answers.' },
        { num: '03', title: 'Internal Workflow Agents', desc: 'AI agents that run internal operations — summarising meeting notes, drafting follow-up emails, categorising incoming requests, or updating CRM records based on conversation data.' },
        { num: '04', title: 'Document Intelligence', desc: 'AI that can read, extract, and act on information from documents — contracts, invoices, application forms, compliance documents — reducing manual data entry and processing time.' },
        { num: '05', title: 'Multi-Channel Deployment', desc: 'Deploy agents across your website chat, WhatsApp, email, or internal tools. One agent, multiple touchpoints, consistent responses.' },
        { num: '06', title: 'Ongoing Training & Refinement', desc: 'AI agents improve with real conversation data. Kinetic monitors agent performance, identifies gaps in responses, and refines the knowledge base over time.' },
      ]}
      whyItMatters={[
        { title: 'Availability is a conversion factor', desc: 'A prospect who gets an instant, accurate answer at 11pm is more likely to book than one who waits until the next morning. AI agents close that gap.' },
        { title: 'Not all enquiries deserve your time equally', desc: 'AI qualification filters out the wrong leads before they reach your calendar. You spend your time on prospects who are genuinely ready and qualified.' },
        { title: 'This is not the chatbot of 2018', desc: 'Modern AI agents built on Claude understand context, handle nuance, and can hold genuinely helpful conversations. The technology has changed fundamentally.' },
      ]}
      process={[
        { step: '01', title: 'Business Knowledge Mapping', desc: 'We document everything the agent needs to know — your services, pricing logic, process, FAQs, objection handling, and escalation rules.' },
        { step: '02', title: 'Agent Design & Prompting', desc: 'We design the agent architecture, write the system prompt, and define how it handles edge cases, unclear inputs, and escalation triggers.' },
        { step: '03', title: 'Build & Integration', desc: 'The agent is built using the Claude API and integrated into your chosen channels — website, WhatsApp, or internal tools.' },
        { step: '04', title: 'Testing & Red-Teaming', desc: 'We test extensively — including adversarial inputs — to ensure the agent responds correctly in edge cases and never gives wrong information about your business.' },
        { step: '05', title: 'Launch & Monitoring', desc: 'The agent goes live with monitoring in place. Conversation logs are reviewed regularly and the agent is updated as your business or offerings change.' },
      ]}
      faq={[
        { q: 'Can the AI make mistakes?', a: 'Yes — all AI can make mistakes. This is why agent design includes strict guardrails and escalation rules. When the agent is uncertain, it defers to a human rather than guessing.' },
        { q: 'What data does the AI have access to?', a: 'Only what you give it. Kinetic builds agents with the principle of minimum necessary access. The agent knows what it needs to do its job — nothing more.' },
        { q: 'Can it book appointments?', a: 'Yes, when integrated with your booking system. The agent can check availability, capture details, and create a booking — or route to a human for final confirmation, depending on your preference.' },
        { q: 'Is this suitable for regulated industries?', a: 'Depends on the use case. For financial advice, medical diagnosis, or legal counsel — AI agents should not replace qualified professionals. For administrative and intake tasks in those industries — yes, with appropriate disclaimers.' },
      ]}
      relatedServices={[
        { title: 'Automation Systems', desc: 'Connect your AI agent to automated follow-up workflows.', href: '/services/automation' },
        { title: 'Lead Generation & CRM', desc: 'Feed AI-qualified leads directly into your CRM pipeline.', href: '/services/lead-generation' },
        { title: 'Full Stack Web Apps', desc: 'Embed AI agents into a custom application.', href: '/services/full-stack' },
      ]}
    />
  )
}
