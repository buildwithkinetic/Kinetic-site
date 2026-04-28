'use client'
import { motion, type Variants } from 'framer-motion'
import Link from 'next/link'
import Reveal from '@/components/Reveal'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] } },
}

const MeetIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M15 9.5V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2.5l4 3V6.5l-4 3Z"/>
  </svg>
)

const btnPrimary: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: '8px',
  padding: '14px 28px',
  background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
  color: '#fff', borderRadius: '100px',
  fontSize: '15px', fontWeight: 600,
  textDecoration: 'none', fontFamily: 'var(--font-body)',
  border: 'none', cursor: 'pointer',
  transition: 'opacity 0.2s, transform 0.2s, box-shadow 0.2s',
}

const services = [
  {
    num: '01',
    name: 'Websites & Landing Pages',
    tagline: 'Your business deserves a website that converts, not just looks good.',
    what: 'Conversion-focused websites and landing pages — built fast, designed to rank on Google, and wired up with lead capture, analytics, and automation from day one. No templates. No drag-and-drop.',
    outcomes: [
      'Live and ranking in 2 weeks',
      'Lead capture forms, CTAs, and tracking built in',
      'Optimised for Google and Core Web Vitals',
      'Handed over with CMS access and full documentation',
    ],
    timeline: 'Live in 2 weeks',
    guarantee: "If you don't appear on the first page of Google for your primary keyword in 30 days, we keep working at no extra charge.",
    badge: null,
    color: '#3B82F6',
  },
  {
    num: '02',
    name: 'Full Stack Apps',
    tagline: 'Your idea deserves a real product — not a prototype nobody ships.',
    what: 'End-to-end web application development: backend, frontend, database, auth, and deployment. Built with modern stack (Next.js, Supabase, Node) — production-ready on day one, with clean code you actually own.',
    outcomes: [
      'Production-ready app in 4–8 weeks',
      'Auth, database, API, and UI — all handled end-to-end',
      'Full handover: codebase, docs, and deployment pipeline',
      'Built to scale — not to be rebuilt in 12 months',
    ],
    timeline: 'Live in 4–8 weeks',
    guarantee: 'We deliver a working, deployed application with full handover documentation — or we keep building.',
    badge: null,
    color: '#06B6D4',
  },
  {
    num: '03',
    name: 'Custom Software',
    tagline: 'Off-the-shelf software is someone else\'s fit. Build yours.',
    what: 'Bespoke software solutions built around your exact workflow — internal tools, dashboards, CRMs, booking systems, or anything that doesn\'t exist yet. Scoped, built, and delivered with full ownership transferred to you.',
    outcomes: [
      'Software built to your exact process — not adapted from a SaaS template',
      'Internal tools that save hours per week from day one',
      'Full source code ownership with documentation',
      'Maintenance and iteration support available post-handover',
    ],
    timeline: 'Scoped per project',
    guarantee: "If the software doesn't perform its core function as specified, we fix it — no additional cost.",
    badge: null,
    color: '#8B5CF6',
  },
  {
    num: '04',
    name: 'AI-Driven Marketing',
    tagline: 'Stop guessing what to post. Build a marketing system that runs itself.',
    what: 'AI-powered content and marketing automation: SEO systems, automated content pipelines, personalised email sequences, lead nurturing flows, and performance dashboards — built on real data, running continuously.',
    outcomes: [
      'Consistent content and SEO output without manual effort',
      'Automated email sequences that qualify and nurture leads overnight',
      'Full attribution: know exactly which channel drives revenue',
      'System compounds over time — gets better the longer it runs',
    ],
    timeline: 'Live in 2–3 weeks',
    guarantee: "If the system doesn't generate measurable lead growth within 90 days, we rebuild and optimise it free.",
    badge: 'Most Popular',
    color: '#10B981',
  },
  {
    num: '05',
    name: 'AI Agents',
    tagline: 'Repetitive tasks are eating your margin. Let an agent handle them.',
    what: 'Custom AI agents that work inside your business: lead qualification agents, research bots, proposal generators, internal knowledge bases, and workflow automations — built on OpenAI, Claude, and n8n, wired into your existing stack.',
    outcomes: [
      'Leads qualified, scored, and routed automatically — 24/7',
      'Hours of manual research and admin eliminated every week',
      'AI that understands your business context, not generic responses',
      'Scales without adding headcount',
    ],
    timeline: 'Live in 2–3 weeks',
    guarantee: 'If the agent fails to perform its core function within 60 days, we rebuild it free.',
    badge: null,
    color: '#F59E0B',
  },
  {
    num: '06',
    name: 'AI Chatbots',
    tagline: 'Your website gets visitors at 2am. Make sure something answers.',
    what: 'Intelligent chatbots trained on your business — FAQ bots, lead qualification bots, booking assistants, and support agents — embedded on your site or WhatsApp, converting visitors around the clock without you lifting a finger.',
    outcomes: [
      'Qualified leads captured even when you\'re offline',
      'Instant, accurate answers to customer questions 24/7',
      'Seamlessly hands off to you when human input is needed',
      'Integrated with your CRM and notification system',
    ],
    timeline: 'Live in 1–2 weeks',
    guarantee: 'If the chatbot misses a qualified lead due to a system failure in the first 90 days, we fix it free.',
    badge: null,
    color: '#EC4899',
  },
]

export default function ServicesPageClient() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* HERO */}
      <section style={{ padding: '160px 24px 80px', maxWidth: '900px', margin: '0 auto' }}>
        <Reveal>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--t4)', marginBottom: '20px' }}>6 Things We Build</p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px, 6vw, 72px)',
            fontWeight: 600, lineHeight: 1.05, letterSpacing: '-2px',
            color: 'var(--t1)', margin: '0 0 24px',
          }}>
            Tell us what you need.<br/>
            <span style={{ backgroundImage: 'linear-gradient(135deg, #3B82F6, #8B5CF6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>We build it.</span>
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '18px', color: 'var(--t3)', lineHeight: 1.6, maxWidth: '640px', margin: 0 }}>
            Websites, full stack apps, custom software, AI marketing, agents, and chatbots — built to production-grade standard and handed over running.
          </p>
        </Reveal>
      </section>

      {/* SERVICE CARDS */}
      <section id="services" style={{ padding: '0 24px 80px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gap: '24px' }}>
          {services.map(service => (
            <Reveal key={service.num}>
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="service-card"
                style={{
                  padding: '40px',
                  background: '#111111',
                  border: `1px solid ${service.badge ? service.color + '30' : 'rgba(255,255,255,0.07)'}`,
                  borderRadius: '20px',
                  position: 'relative', overflow: 'hidden',
                }}
              >
                {service.badge && (
                  <span style={{
                    position: 'absolute', top: '20px', right: '20px',
                    padding: '4px 14px',
                    background: service.color + '18',
                    border: `1px solid ${service.color}40`,
                    borderRadius: '100px',
                    fontFamily: 'var(--font-body)', fontSize: '11px', color: service.color,
                  }}>{service.badge}</span>
                )}

                {/* Glow accent */}
                <div style={{
                  position: 'absolute', top: 0, right: 0, width: '300px', height: '200px',
                  background: `radial-gradient(ellipse at top right, ${service.color}08, transparent 70%)`,
                  pointerEvents: 'none',
                }} />

                <div style={{ position: 'relative' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: service.color, letterSpacing: '2px' }}>{service.num}</span>
                    <div style={{ width: '24px', height: '1px', background: service.color + '40' }} />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: service.color }}>{service.name}</span>
                  </div>

                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 2.8vw, 28px)', fontWeight: 400, letterSpacing: '-0.5px', color: 'var(--t1)', margin: '0 0 20px', lineHeight: 1.3 }}>
                    {service.tagline}
                  </h2>

                  <div style={{
                    padding: '20px', background: 'var(--bg)',
                    borderRadius: '12px', marginBottom: '24px',
                  }}>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--t4)', marginBottom: '8px' }}>What we build</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--t3)', lineHeight: 1.6, margin: 0 }}>{service.what}</p>
                  </div>

                  <div style={{ marginBottom: '24px' }}>
                    {service.outcomes.map(o => (
                      <div key={o} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '8px' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={service.color} strokeWidth="2.5" style={{ flexShrink: 0, marginTop: '2px' }}>
                          <path d="M20 6 9 17l-5-5"/>
                        </svg>
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--t2)', lineHeight: 1.5 }}>{o}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{
                    padding: '16px', background: 'var(--bg)',
                    borderRadius: '10px', marginBottom: '24px',
                  }}>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: service.color, margin: '0 0 4px' }}>{service.timeline}</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--t4)', lineHeight: 1.4, margin: 0 }}>{service.guarantee}</p>
                  </div>

                  <Link href="/book-call"
                    style={{ ...btnPrimary, background: `linear-gradient(135deg, ${service.color}, ${service.color === '#3B82F6' ? '#8B5CF6' : service.color}dd)` }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)'; e.currentTarget.style.boxShadow = `0 8px 28px ${service.color}35` }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
                  >
                    <MeetIcon /> Get This Built
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </Link>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ background: '#111111', padding: '100px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          width: '500px', height: '300px', pointerEvents: 'none',
          background: 'radial-gradient(ellipse, rgba(139,92,246,0.10) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }} />
        <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <Reveal>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--t4)', marginBottom: '16px' }}>Not sure where to start?</p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 600, lineHeight: 1.1, letterSpacing: '-1.5px',
              color: 'var(--t1)', margin: '0 0 20px',
            }}>
              Get a free audit first.<br/>
              <span style={{ backgroundImage: 'linear-gradient(135deg, #3B82F6, #8B5CF6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                We'll tell you exactly what to build.
              </span>
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '17px', color: 'var(--t3)', lineHeight: 1.6, margin: '0 0 36px' }}>
              Submit your site and we'll personally review it — delivering a written diagnosis and priority action plan within 24 hours. Free, no strings attached.
            </p>
            <Link href="/free-website-audit"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '16px 36px',
                background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                color: '#FFFFFF', borderRadius: '100px',
                fontSize: '15px', fontWeight: 600,
                textDecoration: 'none', fontFamily: 'var(--font-body)',
                transition: 'opacity 0.2s, transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)'; e.currentTarget.style.boxShadow = '0 10px 36px rgba(59,130,246,0.35)' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <MeetIcon /> Get Free Business Audit
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--t4)', marginTop: '16px' }}>
              No spam. No credit card. Just your audit.
            </p>
          </Reveal>
        </div>
      </section>

      <style>{`
        @media (max-width: 640px) {
          .service-card { padding: 28px 20px !important; }
        }
      `}</style>
    </div>
  )
}
