import ServicePageLayout from '@/components/ServicePageLayout'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Full Stack Web Apps — Kinetic',
  description: 'Custom web apps, portals, dashboards, and SaaS products built on Next.js and Supabase — owned by you.',
  alternates: { canonical: 'https://buildwithkinetic.org/services/full-stack' },
  openGraph: {
    title: 'Full Stack Web Apps | Kinetic',
    description: 'Custom web applications, portals, and dashboards built on Next.js and Supabase.',
    url: 'https://buildwithkinetic.org/services/full-stack',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Full Stack Web Apps | Kinetic',
    description: 'Custom web apps and SaaS products — built to last, owned by you.',
    creator: '@buildwithkinetic',
  },
}

export default function FullStackPage() {
  return (
    <ServicePageLayout
      badge="Service 05 — Full Stack Web Apps"
      headline="A custom app built"
      headlineAccent="exactly for how you work."
      subline="Off-the-shelf software makes you fit your business around its limitations. Kinetic builds the other way — starting from how your business actually operates and building the tool that fits it perfectly."
      stats={[
        { value: 'Next.js', label: 'Production-grade framework' },
        { value: 'Supabase', label: 'Scalable database' },
        { value: '100%', label: 'Owned by you' },
        { value: '4–8 wks', label: 'Typical build timeline' },
      ]}
      whatWeDeliver={[
        { num: '01', title: 'Booking & Scheduling Systems', desc: 'Custom booking flows with availability management, confirmations, reminders, and calendar integration. Built for your specific service model — not a generic plugin.' },
        { num: '02', title: 'Client Portals', desc: 'Secure portals where your clients can log in to view project status, upload documents, approve deliverables, or access their account. Reduces email back-and-forth and positions you as professional.' },
        { num: '03', title: 'Internal Dashboards', desc: 'Custom operations dashboards that surface the data your team actually needs — job status, client activity, revenue, team assignments. No more spreadsheets.' },
        { num: '04', title: 'SaaS Products', desc: 'If you have an idea for a software product, Kinetic can scope, architect, and build the MVP. Authentication, subscription billing, and core product logic included.' },
        { num: '05', title: 'API Integrations', desc: 'Connect your app to third-party tools — payment gateways, CRMs, ERPs, communication platforms, government APIs. Kinetic builds the integration layer.' },
        { num: '06', title: 'Database Design', desc: 'Supabase-powered databases designed for performance and scalability. Row-level security, real-time capabilities, and clean schema design from the start.' },
      ]}
      whyItMatters={[
        { title: 'Generic software is a ceiling', desc: 'Every workaround you build around off-the-shelf software is technical debt. Custom tools built around your actual workflow are faster, cleaner, and more adoptable.' },
        { title: 'You own the IP', desc: 'A custom-built application is an asset. It can scale with your business, be extended as needs change, and does not carry monthly per-seat SaaS fees that grow with your team.' },
        { title: 'The stack matters', desc: 'Next.js on Vercel with Supabase is not just modern — it is the stack that top startups and scale-ups use because it genuinely performs at scale without expensive infrastructure.' },
      ]}
      process={[
        { step: '01', title: 'Scoping Call', desc: 'A detailed call to understand the requirements, users, and edge cases. We build a spec document covering every feature, user role, and data model before writing code.' },
        { step: '02', title: 'Architecture & Design', desc: 'Database schema, API structure, and UI wireframes are agreed before the build begins. You know exactly what you are getting.' },
        { step: '03', title: 'Build in Sprints', desc: 'Development happens in 1-week sprints. You see working features regularly — not a big reveal months later.' },
        { step: '04', title: 'Testing & QA', desc: 'Each feature is tested across browsers and devices before being considered complete. Edge cases, error states, and load scenarios are all covered.' },
        { step: '05', title: 'Launch & Documentation', desc: 'The app is deployed, the codebase is documented, and you receive full access. Any developer can pick up the project and understand it.' },
      ]}
      faq={[
        { q: 'How is this different from your website development service?', a: 'Websites are primarily informational — designed to convert visitors into enquiries. Full stack apps have backend logic, user authentication, databases, and complex interactions. They are built for doing, not reading.' },
        { q: 'Can you build mobile apps?', a: 'Web apps built with Next.js are fully functional on mobile browsers and can be installed as Progressive Web Apps (PWAs). For native iOS or Android apps, that is a separate scope — discuss on the discovery call.' },
        { q: 'What if my requirements change during the build?', a: 'We scope carefully upfront to minimise this. When requirements do change, we assess the impact on timeline and cost transparently before implementing.' },
        { q: 'Do I need a technical co-founder to maintain it?', a: 'No. Kinetic documents the codebase thoroughly, and Next.js/Supabase has a large developer ecosystem. Any competent web developer can maintain and extend what Kinetic builds.' },
      ]}
      relatedServices={[
        { title: 'AI Agents', desc: 'Add AI capabilities to your custom application.', href: '/services/ai-agents' },
        { title: 'Automation Systems', desc: 'Connect your app to automated workflows.', href: '/services/automation' },
        { title: 'Lead Generation & CRM', desc: 'Build the capture layer that feeds your application.', href: '/services/lead-generation' },
      ]}
    />
  )
}
