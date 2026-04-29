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

const offers = [
  {
    num: '01', name: 'The Visibility Fix',
    problem: 'Nobody can find you on Google.',
    what: 'A conversion-focused local SEO website with Google Business Profile setup, on-page optimisation, and structured data — built to rank for the searches your customers are already making.',
    outcomes: ['First page of Google in 30 days', 'Consistent inbound enquiries without paid ads', 'Website that works as your 24/7 salesperson'],
    timeline: 'Live in 2 weeks',
    guarantee: "If you don't appear on the first page of Google for your primary keyword in 30 days, I'll keep working at no extra charge.",
    badge: null, color: '#3B82F6',
  },
  {
    num: '02', name: 'The Lead Capture System',
    problem: 'Leads come in — and go cold before you even see them.',
    what: 'Automated lead capture and response system: contact forms, WhatsApp triggers, email sequences, and a CRM pipeline — every inquiry acknowledged within 60 seconds, automatically.',
    outcomes: ['Every lead acknowledged in 60 seconds', 'Automated follow-up sequences that nurture leads overnight', 'Full pipeline visibility — every lead, status, and next action'],
    timeline: 'Live in 2–3 weeks',
    guarantee: 'If you miss a single lead due to a system failure in the first 90 days, I fix it free.',
    badge: 'Most Popular', color: '#6366F1',
  },
  {
    num: '03', name: 'The Repeat Revenue Engine',
    problem: 'You finish a job — and the client disappears.',
    what: 'A post-project automation system: job-completion triggers, review request flows, re-engagement emails, and loyalty prompts — all running automatically after every completed job.',
    outcomes: ['Turn every completed job into a repeat client on autopilot', '25–40% increase in repeat bookings within 90 days', 'Growing bank of 5-star reviews that compound your SEO'],
    timeline: 'Live in 2 weeks',
    guarantee: "If your Google review count doesn't increase within 60 days, I'll audit and rebuild the flow free.",
    badge: null, color: '#8B5CF6',
  },
  {
    num: '04', name: 'The Full Growth System',
    problem: "You've tried a website. Maybe some ads. Nothing sticks.",
    what: 'Your complete digital growth engine — visibility website, lead capture automation, CRM dashboard, post-sale revenue flows, and analytics — built as one integrated system.',
    outcomes: ['Fully automated growth engine running 24/7', 'Leads captured, followed up, converted, and re-engaged — systematically', 'Complete data visibility: traffic, leads, conversions, and revenue in one dashboard'],
    timeline: 'Live in 4 weeks',
    guarantee: "90-day performance guarantee — if the system doesn't generate measurable lead growth, I keep working until it does.",
    badge: 'Best Value', color: '#A855F7',
  },
  {
    num: '05', name: 'The Quick Win Audit',
    problem: "You know something is broken — you just don't know what to fix first.",
    what: 'A deep-dive audit of your website, Google presence, and lead flow — followed by a written report with the top 3 problems costing you leads, and I fix all three in the same week.',
    outcomes: ['Know exactly what is costing you leads — in plain English', 'Top 3 problems identified and fixed within one week', 'A prioritised roadmap for what to build next'],
    timeline: 'Done in 1 week',
    guarantee: "If you don't find the audit valuable, I'll refund it in full — no questions asked.",
    badge: null, color: '#C026D3',
  },
  {
    num: '06', name: 'Web App / SaaS Build',
    problem: 'Your idea needs a real product — not just a landing page.',
    what: 'End-to-end web application development: architecture, backend, frontend, and deployment. Built with modern stack (Next.js, Supabase, or your chosen tools) — ready for real users on day one.',
    outcomes: ['Production-ready web app in 4–8 weeks', 'Auth, database, API, and UI — all handled', 'Clean codebase you own and can scale independently'],
    timeline: 'Live in 4–8 weeks',
    guarantee: 'I deliver a working, deployed application with full handover documentation — or I keep building.',
    badge: 'New', color: '#06B6D4',
  },
  {
    num: '07', name: 'AI Agent System',
    problem: 'Repetitive tasks are eating your time — and costing you money.',
    what: 'Custom AI agents and automation workflows: lead qualification bots, AI-powered follow-up sequences, internal tools, and intelligent process automation — built on n8n, OpenAI, and your existing stack.',
    outcomes: ['Leads qualified and followed up with automatically — 24/7', 'Hours of manual work eliminated every week', 'AI that understands your business context, not just generic responses'],
    timeline: 'Live in 2–3 weeks',
    guarantee: 'If the agent fails to perform its core function within 60 days, I rebuild it free.',
    badge: 'New', color: '#10B981',
  },
]

export default function ServicesPageClient() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* HERO */}
      <section style={{ padding: '160px 24px 80px', maxWidth: '900px', margin: '0 auto' }}>
        <Reveal>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--t4)', marginBottom: '20px' }}>7 Growth Offers</p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px, 6vw, 72px)',
            fontWeight: 600, lineHeight: 1.05, letterSpacing: '-2px',
            color: 'var(--t1)', margin: '0 0 24px',
          }}>
            Pick Your Problem.<br/>
            <span style={{ backgroundImage: 'linear-gradient(135deg, #3B82F6, #8B5CF6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>I Fix It.</span>
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '18px', color: 'var(--t3)', lineHeight: 1.6, maxWidth: '600px', margin: 0 }}>
            Websites, web apps, AI agents, and automation. Clear outcomes. Built and installed before handover.
          </p>
        </Reveal>
      </section>

      {/* OFFER CARDS */}
      <section id="growth-offers" style={{ padding: '0 24px 80px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gap: '24px' }}>
          {offers.map(offer => (
            <Reveal key={offer.num}>
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="offer-card"
                style={{
                  padding: '40px',
                  background: '#111111',
                  border: `1px solid ${offer.badge ? offer.color + '30' : 'rgba(255,255,255,0.07)'}`,
                  borderRadius: '20px',
                  position: 'relative', overflow: 'hidden',
                }}
              >
                {offer.badge && (
                  <span style={{
                    position: 'absolute', top: '20px', right: '20px',
                    padding: '4px 14px',
                    background: offer.color + '18',
                    border: `1px solid ${offer.color}40`,
                    borderRadius: '100px',
                    fontFamily: 'var(--font-body)', fontSize: '11px', color: offer.color,
                  }}>{offer.badge}</span>
                )}

                {/* Glow accent */}
                <div style={{
                  position: 'absolute', top: 0, right: 0, width: '300px', height: '200px',
                  background: `radial-gradient(ellipse at top right, ${offer.color}08, transparent 70%)`,
                  pointerEvents: 'none',
                }} />

                <div style={{ position: 'relative' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: offer.color, letterSpacing: '2px' }}>{offer.num}</span>
                    <div style={{ width: '24px', height: '1px', background: offer.color + '40' }} />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: offer.color }}>{offer.name}</span>
                  </div>

                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 400, letterSpacing: '-1px', color: 'var(--t1)', margin: '0 0 20px' }}>
                    {offer.problem}
                  </h2>

                  <div style={{
                    padding: '20px', background: 'var(--bg)',
                    borderRadius: '12px', marginBottom: '24px',
                  }}>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--t4)', marginBottom: '8px' }}>What I build</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--t3)', lineHeight: 1.6, margin: 0 }}>{offer.what}</p>
                  </div>

                  <div style={{ marginBottom: '24px' }}>
                    {offer.outcomes.map(o => (
                      <div key={o} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '8px' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={offer.color} strokeWidth="2.5" style={{ flexShrink: 0, marginTop: '2px' }}>
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
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: offer.color, margin: '0 0 4px' }}>{offer.timeline}</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--t4)', lineHeight: 1.4, margin: 0 }}>{offer.guarantee}</p>
                  </div>

                  <Link href="/book-call"
                    style={{ ...btnPrimary, background: `linear-gradient(135deg, ${offer.color}, ${offer.color === '#3B82F6' ? '#8B5CF6' : offer.color})` }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)'; e.currentTarget.style.boxShadow = `0 8px 28px ${offer.color}35` }}
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
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--t4)', marginBottom: '16px' }}>Not sure which offer?</p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 600, lineHeight: 1.1, letterSpacing: '-1.5px',
              color: 'var(--t1)', margin: '0 0 20px',
            }}>
              Start with the Free Audit.<br/>
              <span style={{ backgroundImage: 'linear-gradient(135deg, #3B82F6, #8B5CF6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                I'll tell you exactly what to fix.
              </span>
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '17px', color: 'var(--t3)', lineHeight: 1.6, margin: '0 0 36px' }}>
              I personally review every submission and deliver a written diagnosis within 24 hours — free, no strings attached.
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
          .offer-card { padding: 28px 20px !important; }
        }
      `}</style>
    </div>
  )
}
