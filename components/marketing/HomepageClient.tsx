'use client'
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'
import Reveal from '@/components/Reveal'
import dynamic from 'next/dynamic'
const HeroCanvas = dynamic(() => import('@/components/HeroCanvas'), { ssr: false })
const InfrastructureDiagram = dynamic(() => import('@/components/marketing/InfrastructureDiagram'), { ssr: false })
import { events } from '@/lib/analytics'
import { StickyCtaBanner } from '@/components/marketing/StickyCtaBanner'

/* ─── Shared primitives ─────────────────────────────────────────────── */
const btnPrimary: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: '10px',
  padding: '15px 30px',
  background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
  color: '#fff', borderRadius: '100px',
  fontSize: '15px', fontWeight: 600,
  textDecoration: 'none', fontFamily: 'var(--font-body)',
  border: 'none', cursor: 'pointer',
  transition: 'opacity 0.2s, transform 0.2s, box-shadow 0.2s',
  boxShadow: '0 0 0 rgba(59,130,246,0)',
  whiteSpace: 'nowrap',
}
const btnGhost: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: '8px',
  padding: '15px 30px',
  background: 'transparent', color: 'rgba(255,255,255,0.55)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '100px', fontSize: '15px', fontWeight: 500,
  textDecoration: 'none', fontFamily: 'var(--font-body)',
  cursor: 'pointer', transition: 'border-color 0.2s, color 0.2s, transform 0.2s',
  whiteSpace: 'nowrap',
}

/* ─── Icons ─────────────────────────────────────────────────────────── */
const MeetIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
    <path d="M15 9.5V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2.5l4 3V6.5l-4 3Z"/>
  </svg>
)
const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
)

/* ─── Variants ───────────────────────────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] } },
}
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}
const staggerSlow: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
}
const cardFadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] } },
}

/* ─── Cycling word component ─────────────────────────────────────────── */
const CYCLE_WORDS = ['Websites', 'Full-Stack Apps', 'AI Marketing', 'AI Agents', 'Custom Software', 'AI Chatbots']

function CyclingWord() {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex(i => (i + 1) % CYCLE_WORDS.length)
        setVisible(true)
      }, 350)
    }, 2400)
    return () => clearInterval(interval)
  }, [])

  return (
    <span style={{
      display: 'inline-block',
      backgroundImage: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(8px)',
      transition: 'opacity 0.35s cubic-bezier(0.16,1,0.3,1), transform 0.35s cubic-bezier(0.16,1,0.3,1)',
    }}>
      {CYCLE_WORDS[index]}
    </span>
  )
}

/* ─── Count-up component ─────────────────────────────────────────────── */
function MetricValue({ value }: { value: string }) {
  const [display, setDisplay] = useState(value)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const match = value.match(/^([#]?)(\d[\d,]*)([+sd]?)$/)
    if (!match) return
    const [, prefix, numStr, suffix] = match
    const target = parseInt(numStr.replace(/,/g, ''), 10)
    if (!target) return
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      obs.disconnect()
      const duration = 1600
      const start = Date.now()
      const tick = () => {
        const elapsed = Date.now() - start
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        const current = Math.round(eased * target)
        const formatted = current >= 1000 ? current.toLocaleString() : String(current)
        setDisplay(prefix + formatted + suffix)
        if (progress < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [value])

  return <span ref={ref}>{display}</span>
}

/* ─── Data ───────────────────────────────────────────────────────────── */
const problems = [
  {
    n: '01',
    title: 'Leads come in — then disappear.',
    desc: 'No follow-up. No tracking. Lost opportunities — every single day.',
  },
  {
    n: '02',
    title: 'Everything depends on you.',
    desc: 'Manual work. Missed messages. One dropped ball and you lose the client.',
  },
  {
    n: '03',
    title: "You don't know what's working.",
    desc: 'No data. No visibility. No control. You cannot grow what you cannot measure.',
  },
]

const servicePillars = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
    label: 'Digital Marketing',
    sub: 'AI-powered growth',
    color: '#10B981',
    outcomes: ['SEO that compounds over time', 'Paid ads managed with AI', 'Content that drives conversions'],
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
      </svg>
    ),
    label: 'Websites',
    sub: 'Convert & capture',
    color: '#3B82F6',
    outcomes: ['Conversion-first design', 'Built to rank on Google', 'Handed over in 2 weeks'],
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="12" cy="12" r="10"/><path d="M8 12h.01M12 12h.01M16 12h.01"/>
      </svg>
    ),
    label: 'AI Agents',
    sub: 'Automate & scale',
    color: '#F59E0B',
    outcomes: ['Leads qualified 24/7', 'Follow-ups on autopilot', 'Ops that run without you'],
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>
      </svg>
    ),
    label: 'Android Apps',
    sub: 'Mobile presence',
    color: '#8B5CF6',
    outcomes: ['Native Android builds', 'Production-ready in 4–6 weeks', 'Full source code handover'],
  },
]

const steps = [
  { n: '01', title: 'Strategy Call', desc: 'We spend 30 minutes understanding your business, goals, and gaps. No pitch — just a clear map of what to build first and why.' },
  { n: '02', title: 'Scope & Sprint', desc: 'We define exactly what gets built, lock the timeline, and start the sprint. You see progress within days, not weeks.' },
  { n: '03', title: 'Build & Launch', desc: 'Your website, app, AI system, or marketing engine goes live — fully tested, connected to your stack, and ready for real users.' },
  { n: '04', title: 'Measure & Compound', desc: 'We track what drives results and double down on it. Every system gets sharper over time. Revenue grows without adding headcount.' },
]

const components = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
      </svg>
    ),
    title: 'Websites & Landing Pages',
    desc: 'Conversion-first websites and high-performance landing pages built to capture leads and rank on Google.',
    color: '#3B82F6',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
        <path d="M7 8h2m2 0h2"/>
      </svg>
    ),
    title: 'Full Stack Apps',
    desc: 'Custom web applications, SaaS products, and dashboards — designed, built, and deployed end-to-end.',
    color: '#06B6D4',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
    title: 'Custom Software',
    desc: 'Bespoke business software — CRMs, internal tools, workflow platforms — built precisely for how you operate.',
    color: '#8B5CF6',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
    title: 'AI-Driven Marketing',
    desc: 'SEO, paid campaigns, and content — powered by AI to generate compounding, measurable growth.',
    color: '#10B981',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12"/>
        <path d="M8 12h.01M12 12h.01M16 12h.01"/>
      </svg>
    ),
    title: 'AI Agents',
    desc: 'Autonomous agents that qualify leads, run follow-ups, and handle operations — 24/7, without headcount.',
    color: '#F59E0B',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    title: 'AI Chatbots',
    desc: 'Intelligent chatbots trained on your business — answers questions, captures leads, books appointments automatically.',
    color: '#EC4899',
  },
]

const faqs = [
  {
    q: 'How is Kinetic different from a regular web agency?',
    a: "Most agencies build a website and hand over the login details. Kinetic designs and builds the entire product — website, app, software, or AI system — and installs it running in your business before handover. Not a template shop, not a freelancer marketplace. A focused build team.",
  },
  {
    q: 'How long does it take to go live?',
    a: 'Most systems are live in 2–3 weeks. The Quick Win Audit is delivered in 1 week. The Full Growth System takes up to 4 weeks given its scope.',
  },
  {
    q: 'What if I already have a website?',
    a: "We audit it, identify exactly what's leaking leads, and either rebuild it or layer the growth system on top — whichever makes more sense for your business.",
  },
  {
    q: 'Is there a guarantee?',
    a: 'Yes. Every service has a specific performance guarantee. Websites: first-page Google ranking in 30 days or we keep working free. AI agents and chatbots: if the system fails its core function in 90 days, we rebuild it free.',
  },
  {
    q: 'Do you work with US-based or international clients?',
    a: 'Yes — the entire process is remote. Strategy call, build, and handover all happen online. Kinetic works with founders, funded startups, and businesses across the US, UK, and India.',
  },
]

/* ═══════════════════════════════════════════════════════════════════════ */
export default function HomepageClient() {
  const [showMobileCta, setShowMobileCta] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  useEffect(() => {
    const onScroll = () => setShowMobileCta(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh', overflowX: 'hidden' }}>

      {/* ══ 1. HERO ══════════════════════════════════════════════════════ */}
      <section style={{
        minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '140px 24px 100px',
        position: 'relative', overflow: 'hidden',
        background: '#0A0A0A',
      }}>

        {/* 3D particle network — fills entire background */}
        <HeroCanvas />

        {/* Deep center glow — subtle, behind text */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -60%)',
          width: '800px', height: '500px', pointerEvents: 'none', zIndex: 1,
          background: 'radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.09) 0%, rgba(99,102,241,0.04) 45%, transparent 72%)',
          filter: 'blur(60px)',
        }} />

        {/* Split-layout container */}
        <div
          className="hero-split"
          style={{
            maxWidth: '1200px', width: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            alignItems: 'center',
            gap: '40px',
            position: 'relative', zIndex: 2,
          }}
        >
          {/* ─── Left column: Content ─────────────────────────────── */}
          <motion.div
            initial="hidden" animate="visible" variants={stagger}
            className="hero-content"
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            {/* Eyebrow — urgency */}
            <motion.div variants={fadeUp} style={{ marginBottom: '32px' }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                padding: '9px 18px 9px 12px',
                background: 'rgba(34,197,94,0.07)',
                border: '1px solid rgba(34,197,94,0.25)',
                borderRadius: '100px',
                fontFamily: 'var(--font-body)', fontSize: '13px',
                color: 'rgba(255,255,255,0.75)',
                letterSpacing: '-0.1px',
              }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  padding: '3px 10px',
                  background: 'rgba(34,197,94,0.15)',
                  border: '1px solid rgba(34,197,94,0.3)',
                  borderRadius: '100px',
                  fontSize: '11px', fontWeight: 600,
                  color: '#22C55E', letterSpacing: '0.3px',
                  textTransform: 'uppercase',
                }}>
                  <span style={{
                    width: '5px', height: '5px', borderRadius: '50%',
                    background: '#22C55E', boxShadow: '0 0 8px #22C55E',
                    flexShrink: 0, animation: 'pulse 2s ease-in-out infinite',
                  }} />
                  Open
                </span>
                Now onboarding — <strong style={{ color: '#fff', fontWeight: 600 }}>3 spots left for May</strong>
              </span>
            </motion.div>

            {/* Headline — single H1 for SEO */}
            <motion.h1 variants={fadeUp} style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(40px, 6vw, 76px)',
              fontWeight: 700,
              lineHeight: 1.06,
              letterSpacing: '-3px',
              color: '#FFFFFF',
              margin: '0 0 32px',
            }}>
              We build the digital<br />
              presence your<br />
              <span style={{
                backgroundImage: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 60%, #EC4899 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>competitors fear.</span>
            </motion.h1>

            {/* Diagram — mobile only (shows between headline and subheadline) */}
            <motion.div variants={fadeUp} className="hero-diagram-mobile" style={{ display: 'none' }}>
              <InfrastructureDiagram />
            </motion.div>

            {/* Subheadline */}
            <motion.p variants={fadeUp} style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(16px, 2vw, 20px)',
              color: 'rgba(255,255,255,0.5)',
              lineHeight: 1.55,
              maxWidth: '480px',
              margin: '0 0 48px',
              fontWeight: 400,
              letterSpacing: '-0.2px',
            }}>
              Marketing that converts. AI that runs your ops. Products that ship. One partner — no handoffs, no excuses, just results.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="hero-cta-row" style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => {
                    const el = document.getElementById('system-details')
                    if (el) el.scrollIntoView({ behavior: 'smooth' })
                  }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '16px 28px',
                    background: 'rgba(255,255,255,0.05)',
                    color: 'rgba(255,255,255,0.7)', borderRadius: '100px',
                    fontSize: '14px', fontWeight: 500,
                    textDecoration: 'none', fontFamily: 'var(--font-body)',
                    border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    letterSpacing: '-0.1px',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
                    e.currentTarget.style.color = '#fff'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                    e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: 0.6 }}>
                    <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2"/>
                  </svg>
                  See how it works
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: 0.5 }}>
                    <path d="M12 5v14M19 12l-7 7-7-7"/>
                  </svg>
                </button>

                <Link
                  href="/book-call"
                  onClick={() => events.bookCallClick('hero')}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '10px',
                    padding: '16px 28px',
                    background: '#3B82F6',
                    color: '#fff', borderRadius: '100px',
                    fontSize: '14px', fontWeight: 600,
                    textDecoration: 'none', fontFamily: 'var(--font-body)',
                    border: 'none', cursor: 'pointer',
                    transition: 'transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s cubic-bezier(0.16,1,0.3,1), background 0.2s',
                    boxShadow: '0 0 0 rgba(59,130,246,0)',
                    letterSpacing: '-0.2px',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)'
                    e.currentTarget.style.boxShadow = '0 16px 48px rgba(59,130,246,0.45), 0 0 0 1px rgba(59,130,246,0.4)'
                    e.currentTarget.style.background = '#2563EB'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'none'
                    e.currentTarget.style.boxShadow = '0 0 0 rgba(59,130,246,0)'
                    e.currentTarget.style.background = '#3B82F6'
                  }}
                >
                  <MeetIcon />
                  Book Free Strategy Call
                  <Arrow />
                </Link>
              </div>

              {/* Trust line */}
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '12px',
                color: 'rgba(255,255,255,0.22)', margin: 0,
                letterSpacing: '0.2px',
              }}>
                30-minute call &nbsp;·&nbsp; No pitch &nbsp;·&nbsp; No retainer
              </p>
            </motion.div>
          </motion.div>

          {/* ─── Right column: Diagram (desktop/tablet) ─────────── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="hero-diagram-desktop"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <InfrastructureDiagram />
          </motion.div>
        </div>
      </section>



      {/* ══ TRUST BAR ══════════════════════════════════════════════════ */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '0 24px',
        background: 'rgba(255,255,255,0.015)',
      }}>
        <div style={{
          maxWidth: '1100px', margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
          {[
            {
              icon: (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(34,197,94,0.8)" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4 12 14.01l-3-3"/>
                </svg>
              ),
              text: 'Results guaranteed or we keep working — free',
            },
            {
              icon: (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(59,130,246,0.8)" strokeWidth="2.5" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                </svg>
              ),
              text: 'Delivered in 2–4 weeks, every time',
            },
            {
              icon: (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(139,92,246,0.8)" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              ),
              text: 'Trusted by founders & funded startups',
            },
            {
              icon: (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(245,158,11,0.8)" strokeWidth="2.5" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              ),
              text: 'Remote-first · US, UK & India',
            },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '18px 24px',
                whiteSpace: 'nowrap',
              }}>
                {item.icon}
                <span style={{
                  fontFamily: 'var(--font-body)', fontSize: '12px',
                  color: 'rgba(255,255,255,0.38)',
                  letterSpacing: '-0.1px',
                }}>{item.text}</span>
              </div>
              {i < 3 && <span style={{ width: '1px', height: '16px', background: 'rgba(255,255,255,0.07)', flexShrink: 0 }} />}
            </div>
          ))}
        </div>
      </div>

      {/* ══ 2. PROBLEM ══════════════════════════════════════════════════ */}
      <section style={{ padding: '140px 24px' }} className="homepage-section-lg">
        <div style={{ maxWidth: '1040px', margin: '0 auto' }}>

          <Reveal>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '24px' }}>
              The problem
            </p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(38px, 5.5vw, 72px)',
              fontWeight: 600, lineHeight: 1.06, letterSpacing: '-2.5px',
              color: '#FFFFFF', margin: '0 0 20px',
            }}>
              Most businesses<br/>
              <span style={{ color: 'rgba(255,255,255,0.3)' }}>don&apos;t have a system.</span>
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '18px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.65, maxWidth: '480px', margin: '0 0 80px' }}>
              They have effort. Hustle. Hope. That is not a growth strategy &mdash; that is a liability.
            </p>
          </Reveal>

          {/* Staggered problem cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerSlow}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2px' }}
            className="problem-grid"
          >
            {problems.map((p, i) => (
              <motion.div key={p.n} variants={cardFadeUp}>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    padding: '48px 40px',
                    background: i === 1 ? 'rgba(59,130,246,0.04)' : 'transparent',
                    border: '1px solid rgba(255,255,255,0.05)',
                    transition: 'background 0.25s, border-color 0.25s',
                    cursor: 'default', height: '100%',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(59,130,246,0.07)'
                    ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(59,130,246,0.2)'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = i === 1 ? 'rgba(59,130,246,0.04)' : 'transparent'
                    ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.05)'
                  }}
                >
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(59,130,246,0.5)', letterSpacing: '3px', margin: '0 0 24px' }}>{p.n}</p>
                  <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '20px', fontWeight: 600, color: '#FFFFFF', margin: '0 0 14px', lineHeight: 1.3 }}>{p.title}</h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'rgba(255,255,255,0.38)', lineHeight: 1.65, margin: 0 }}>{p.desc}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ 3. FOUR PILLARS ══════════════════════════════════════════════ */}
      <section id="system-details" style={{ padding: '140px 24px', background: 'rgba(255,255,255,0.015)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

          <Reveal>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '24px' }}>
              What we do
            </p>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px', marginBottom: '72px' }}>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(34px, 5vw, 62px)',
                fontWeight: 600, lineHeight: 1.06, letterSpacing: '-2px',
                color: '#FFFFFF', margin: 0,
              }}>
                Four things we build.<br/>
                <span style={{ color: 'rgba(255,255,255,0.28)' }}>One company to call.</span>
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.6, maxWidth: '380px', margin: 0 }}>
                Each service delivers standalone. Together, they make your business impossible to compete with.
              </p>
            </div>
          </Reveal>

          {/* 4 Pillar cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '2px',
              borderRadius: '20px', overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
            className="pillars-grid"
          >
            {servicePillars.map((pillar, i) => (
              <motion.div
                key={pillar.label}
                variants={cardFadeUp}
                whileHover={{ scale: 1.02, zIndex: 2 }}
                transition={{ duration: 0.2 }}
                style={{
                  padding: '44px 32px',
                  background: 'rgba(255,255,255,0.02)',
                  borderRight: i < servicePillars.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  cursor: 'default', position: 'relative', overflow: 'hidden',
                  transition: 'background 0.3s ease',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = pillar.color + '0d' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)' }}
              >
                {/* Glow */}
                <div style={{
                  position: 'absolute', top: 0, right: 0,
                  width: '200px', height: '160px',
                  background: `radial-gradient(ellipse at top right, ${pillar.color}0a, transparent 70%)`,
                  pointerEvents: 'none',
                }} />

                {/* Icon */}
                <div style={{
                  width: '52px', height: '52px', borderRadius: '14px',
                  background: pillar.color + '14',
                  border: `1px solid ${pillar.color}28`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: pillar.color, marginBottom: '24px',
                  boxShadow: `0 0 20px ${pillar.color}18`,
                }}>
                  {pillar.icon}
                </div>

                {/* Label */}
                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: '18px', fontWeight: 700,
                  color: '#FFFFFF', margin: '0 0 6px', lineHeight: 1.2,
                }}>{pillar.label}</p>
                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: '12px',
                  color: pillar.color, margin: '0 0 24px', letterSpacing: '0.3px',
                  opacity: 0.85,
                }}>{pillar.sub}</p>

                {/* Outcomes */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {pillar.outcomes.map(o => (
                    <div key={o} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={pillar.color} strokeWidth="2.5" style={{ flexShrink: 0, marginTop: '2px', opacity: 0.8 }}>
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.45 }}>{o}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <Reveal>
            <div style={{ marginTop: '40px', display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'rgba(255,255,255,0.22)', lineHeight: 1.65, margin: 0 }}>
                Not sure which one you need? Book a free call — we&apos;ll map it out in 30 minutes.
              </p>
              <Link href="/book-call" style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500,
                color: '#3B82F6', textDecoration: 'none', whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
                onMouseEnter={e => { e.currentTarget.style.color = '#60A5FA' }}
                onMouseLeave={e => { e.currentTarget.style.color = '#3B82F6' }}
              >
                Book free strategy call
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </Reveal>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .pillars-grid { grid-template-columns: 1fr 1fr !important; }
          }
          @media (max-width: 480px) {
            .pillars-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ══ 4. HOW IT WORKS ═════════════════════════════════════════════ */}
      <section style={{ padding: '140px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>

          <Reveal>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '24px' }}>
              Process
            </p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 5vw, 60px)',
              fontWeight: 600, lineHeight: 1.08, letterSpacing: '-2px',
              color: '#FFFFFF', margin: '0 0 80px',
            }}>
              How we go from<br/>
              <span style={{ color: 'rgba(255,255,255,0.3)' }}>idea to live in weeks.</span>
            </h2>
          </Reveal>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerSlow}
            style={{ display: 'grid', gap: '0' }}
          >
            {steps.map((step, i) => (
              <motion.div key={step.n} variants={cardFadeUp}>
                <motion.div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '80px 1fr',
                    gap: '32px',
                    padding: '48px 0',
                    borderBottom: i < steps.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                    alignItems: 'start',
                    cursor: 'default',
                    transition: 'padding-left 0.3s ease',
                  }}
                  whileHover={{ paddingLeft: '12px' }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div>
                    <p style={{
                      fontFamily: 'var(--font-mono)', fontSize: '13px',
                      backgroundImage: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                      margin: 0, fontWeight: 700,
                    }}>{step.n}</p>
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '22px', fontWeight: 600, color: '#FFFFFF', margin: '0 0 12px', lineHeight: 1.3 }}>{step.title}</h3>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'rgba(255,255,255,0.38)', lineHeight: 1.7, margin: 0 }}>{step.desc}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ 5. WHO WE WORK WITH ═════════════════════════════════════════ */}
      <section style={{ padding: '140px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

          <Reveal>
            <div style={{ marginBottom: '72px' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '16px' }}>
                Who we work with
              </p>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(36px, 5vw, 58px)',
                fontWeight: 700, lineHeight: 1.06, letterSpacing: '-2.5px',
                color: '#FFFFFF', margin: '0 0 20px',
              }}>
                Built for founders<br />
                <span style={{ color: 'rgba(255,255,255,0.28)' }}>who need it done right.</span>
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '17px', color: 'rgba(255,255,255,0.32)', lineHeight: 1.65, maxWidth: '520px', margin: 0 }}>
                We work with a specific kind of company — one that values execution over decks and outcomes over activity.
              </p>
            </div>
          </Reveal>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className="who-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}
          >
            {[
              {
                emoji: '🚀',
                title: 'Startup founders with a validated idea',
                desc: 'You have traction and need a real product shipped fast — not a mock-up from a freelancer. We scope, build, and hand it over production-ready in weeks.',
                tags: ['MVP builds', 'AI products', 'Fast execution'],
                color: '#3B82F6',
              },
              {
                emoji: '📈',
                title: 'Funded companies that need a build partner',
                desc: 'You have runway and a roadmap. You need a technical partner who ships predictably and doesn\'t require hand-holding. We plug in and execute.',
                tags: ['Web apps', 'AI agents', 'Ongoing builds'],
                color: '#8B5CF6',
              },
              {
                emoji: '🏢',
                title: 'Business owners ready to automate and scale',
                desc: 'You\'re stuck doing things manually that should run themselves. We map your bottlenecks and install automation that works in the background.',
                tags: ['Lead automation', 'CRM systems', 'Digital marketing'],
                color: '#10B981',
              },
              {
                emoji: '⚡',
                title: 'Companies that have outgrown their current setup',
                desc: 'Your old website or system no longer reflects the business. You need a rebuild that performs — not a refresh. We start from outcomes, not templates.',
                tags: ['Full rebuilds', 'Performance SEO', 'Conversion systems'],
                color: '#F59E0B',
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                variants={cardFadeUp}
                style={{
                  padding: '40px',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '20px',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'background 0.3s, border-color 0.3s, transform 0.3s',
                  cursor: 'default',
                }}
                whileHover={{ y: -3 }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = `${card.color}06`
                  el.style.borderColor = `${card.color}20`
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = 'rgba(255,255,255,0.02)'
                  el.style.borderColor = 'rgba(255,255,255,0.07)'
                }}
              >
                {/* Glow */}
                <div style={{
                  position: 'absolute', top: 0, right: 0,
                  width: '180px', height: '140px',
                  background: `radial-gradient(ellipse at top right, ${card.color}0a, transparent 70%)`,
                  pointerEvents: 'none',
                }} />

                <p style={{ fontSize: '32px', margin: '0 0 20px', lineHeight: 1 }}>{card.emoji}</p>

                <h3 style={{
                  fontFamily: 'var(--font-body)', fontSize: '18px', fontWeight: 600,
                  color: '#FFFFFF', margin: '0 0 12px', lineHeight: 1.3,
                }}>{card.title}</h3>

                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: '14px',
                  color: 'rgba(255,255,255,0.38)', lineHeight: 1.7, margin: '0 0 24px',
                }}>{card.desc}</p>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {card.tags.map(tag => (
                    <span key={tag} style={{
                      fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 500,
                      padding: '4px 10px', borderRadius: '100px',
                      background: `${card.color}10`,
                      color: card.color,
                      border: `1px solid ${card.color}22`,
                      letterSpacing: '0.2px',
                    }}>{tag}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <Reveal>
            <div style={{ marginTop: '40px', display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'rgba(255,255,255,0.22)', lineHeight: 1.65, margin: 0 }}>
                Not sure if we&apos;re the right fit? Book a free call and we&apos;ll tell you honestly.
              </p>
              <Link href="/book-call" style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500,
                color: '#3B82F6', textDecoration: 'none', whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
                onMouseEnter={e => { e.currentTarget.style.color = '#60A5FA' }}
                onMouseLeave={e => { e.currentTarget.style.color = '#3B82F6' }}
              >
                Book free strategy call
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </Reveal>
        </div>

        <style>{`
          @media (max-width: 640px) {
            .who-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ══ LEAD MAGNET ══════════════════════════════════════════════════ */}
      <section style={{ padding: '80px 24px', position: 'relative' }}>
        <div style={{
          maxWidth: '1040px', margin: '0 auto',
          background: 'linear-gradient(135deg, rgba(59,130,246,0.05), rgba(139,92,246,0.05))',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '32px', padding: '80px 48px',
          textAlign: 'center', position: 'relative', overflow: 'hidden',
        }}>
          {/* Subtle glow */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(59,130,246,0.1), transparent 70%)',
            filter: 'blur(60px)', pointerEvents: 'none',
          }} />

          <Reveal>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: '#3B82F6', marginBottom: '24px', fontWeight: 600 }}>
              Free — no commitment
            </p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 5.5vw, 56px)',
              fontWeight: 600, lineHeight: 1.1, letterSpacing: '-2px',
              color: '#FFFFFF', margin: '0 0 24px',
            }}>
              Not ready for a call?<br/>
              <span style={{ color: 'rgba(255,255,255,0.3)' }}>Get a free audit first.</span>
            </h2>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '18px', color: 'rgba(255,255,255,0.4)',
              lineHeight: 1.6, maxWidth: '580px', margin: '0 auto 48px',
            }}>
              We&apos;ll audit your current website, SEO, and lead funnel.
              You&apos;ll get a PDF report with exactly where you&apos;re leaking revenue — delivered in 24 hours.
            </p>
            <Link
              href="/free-website-audit"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                padding: '16px 32px',
                background: 'rgba(255,255,255,0.1)',
                color: '#fff', borderRadius: '100px',
                fontSize: '15px', fontWeight: 600,
                textDecoration: 'none', fontFamily: 'var(--font-body)',
                border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLElement>) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.15)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLElement>) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                e.currentTarget.style.transform = 'none'
              }}
            >
              Get My Free Audit Report
              <Arrow />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ══ 6. PROOF ════════════════════════════════════════════════════ */}
      <section style={{ padding: '140px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>

          <Reveal>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '24px' }}>
              Proof
            </p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(34px, 4.5vw, 56px)',
              fontWeight: 600, lineHeight: 1.1, letterSpacing: '-2px',
              color: '#FFFFFF', margin: '0 0 64px',
            }}>
              Systems that<br/>
              <span style={{ backgroundImage: 'linear-gradient(135deg, #3B82F6, #8B5CF6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                produce results.
              </span>
            </h2>
          </Reveal>

          {/* ── Latest: Core of Fitness ── */}
          <Reveal>
            <div style={{
              border: '1px solid rgba(16,185,129,0.15)',
              borderRadius: '24px', overflow: 'hidden', marginBottom: '20px',
            }}>
              <div style={{
                padding: '48px 48px 0',
                background: 'linear-gradient(180deg, rgba(16,185,129,0.06) 0%, transparent 100%)',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                  <span style={{
                    padding: '4px 14px',
                    background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)',
                    borderRadius: '100px', fontFamily: 'var(--font-body)', fontSize: '12px', color: '#10B981',
                  }}>Latest Project</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.3)' }}>
                    Fitness &amp; Gym &middot; Member Acquisition System
                  </span>
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(28px, 4vw, 44px)',
                  fontWeight: 400, letterSpacing: '-1.5px', color: '#FFFFFF',
                  margin: '0 0 48px',
                }}>Core of Fitness</h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  {[
                    { v: '4wk', l: 'Full system live' },
                    { v: '5', l: 'System layers built' },
                    { v: '<30s', l: 'WhatsApp response' },
                    { v: '₹5k', l: 'Monthly infra cost' },
                  ].map((m, i) => (
                    <div key={m.v} style={{
                      padding: '32px 28px',
                      borderRight: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                    }}>
                      <p style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(30px, 4vw, 44px)',
                        fontWeight: 400, margin: '0 0 6px',
                        backgroundImage: 'linear-gradient(135deg, #10B981, #3B82F6)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                      }}><MetricValue value={m.v} /></p>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.3)', margin: 0 }}>{m.l}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ padding: '40px 48px', display: 'flex', gap: '40px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '280px', borderLeft: '2px solid rgba(16,185,129,0.35)', paddingLeft: '24px' }}>
                  <p style={{
                    fontFamily: 'var(--font-display)', fontSize: '18px',
                    fontStyle: 'italic', color: 'rgba(255,255,255,0.65)',
                    lineHeight: 1.6, margin: '0 0 12px',
                  }}>
                    &ldquo;Before Kinetic, we had no system. Leads came in and disappeared. Now every inquiry is tracked, followed up automatically, and we can actually see what&apos;s converting.&rdquo;
                  </p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.25)', margin: 0 }}>
                    &mdash; Core of Fitness, Kolkata
                  </p>
                </div>
                <Link href="/work/core-of-fitness" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  fontFamily: 'var(--font-body)', fontSize: '14px',
                  color: '#10B981', textDecoration: 'none',
                  whiteSpace: 'nowrap', alignSelf: 'flex-end',
                  transition: 'gap 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.gap = '12px' }}
                onMouseLeave={e => { e.currentTarget.style.gap = '8px' }}
                >
                  View full case study <Arrow />
                </Link>
              </div>
            </div>
          </Reveal>

          {/* ── Sheknowmics ── */}
          <Reveal>
            <div style={{
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '24px', overflow: 'hidden',
            }}>
              <div style={{
                padding: '40px 48px 0',
                background: 'linear-gradient(180deg, rgba(59,130,246,0.05) 0%, transparent 100%)',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <span style={{
                    padding: '4px 14px',
                    background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)',
                    borderRadius: '100px', fontFamily: 'var(--font-body)', fontSize: '12px', color: '#60A5FA',
                  }}>Case Study</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.3)' }}>
                    Women&apos;s Health Platform &middot; Sheknowmics
                  </span>
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(22px, 3vw, 34px)',
                  fontWeight: 400, letterSpacing: '-1px', color: '#FFFFFF',
                  margin: '0 0 32px',
                }}>Sheknowmics</h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  {[
                    { v: '1,200+', l: 'Waitlist users' },
                    { v: '#1', l: 'Google rank, 60 days' },
                    { v: '<60s', l: 'Lead response time' },
                    { v: '5', l: 'Modules built end-to-end' },
                  ].map((m, i) => (
                    <div key={m.v} style={{
                      padding: '24px 28px',
                      borderRight: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                    }}>
                      <p style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(24px, 3vw, 36px)',
                        fontWeight: 400, margin: '0 0 4px',
                        backgroundImage: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                      }}><MetricValue value={m.v} /></p>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(255,255,255,0.3)', margin: 0 }}>{m.l}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ padding: '32px 48px', display: 'flex', gap: '32px', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'rgba(255,255,255,0.4)', fontStyle: 'italic', margin: 0, flex: 1, minWidth: '200px' }}>
                  India&apos;s first AI-native women&apos;s health platform — built end to end from zero.
                </p>
                <Link href="/work/sheknowmics" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  fontFamily: 'var(--font-body)', fontSize: '14px',
                  color: '#3B82F6', textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  transition: 'gap 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.gap = '12px' }}
                onMouseLeave={e => { e.currentTarget.style.gap = '8px' }}
                >
                  View case study <Arrow />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ 7. FAQ ══════════════════════════════════════════════════════ */}
      <section style={{ padding: '140px 24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <Reveal>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '24px' }}>
              FAQ
            </p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(34px, 4.5vw, 56px)',
              fontWeight: 600, lineHeight: 1.08, letterSpacing: '-2px',
              color: '#FFFFFF', margin: '0 0 64px',
            }}>
              Questions people ask<br/>
              <span style={{ color: 'rgba(255,255,255,0.3)' }}>before they book a call.</span>
            </h2>
          </Reveal>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: '100%', textAlign: 'left',
                    padding: '28px 0',
                    background: 'none', border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px',
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(16px, 2vw, 18px)', fontWeight: 500, color: '#FFFFFF', lineHeight: 1.4 }}>
                    {faq.q}
                  </span>
                  <span style={{
                    flexShrink: 0, width: '24px', height: '24px',
                    borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: '16px', lineHeight: 1,
                    transition: 'transform 0.25s, border-color 0.25s',
                    transform: openFaq === i ? 'rotate(45deg)' : 'none',
                    borderColor: openFaq === i ? 'rgba(59,130,246,0.5)' : 'rgba(255,255,255,0.15)',
                  }}>+</span>
                </button>
                {openFaq === i && (
                  <p style={{
                    fontFamily: 'var(--font-body)', fontSize: '16px',
                    color: 'rgba(255,255,255,0.45)', lineHeight: 1.75,
                    margin: '0 0 28px', paddingRight: '48px',
                  }}>
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 8. FINAL CTA ════════════════════════════════════════════════ */}
      <section style={{
        padding: '160px 24px',
        position: 'relative', overflow: 'hidden',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}>
        {/* Breathing glow */}
        <div className="cta-glow" style={{
          position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '700px', height: '400px', pointerEvents: 'none',
          background: 'radial-gradient(ellipse, rgba(139,92,246,0.14) 0%, rgba(59,130,246,0.07) 40%, transparent 70%)',
          filter: 'blur(60px)',
        }} />

        <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <Reveal>
            <>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '28px' }}>
                Get started
              </p>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(42px, 7vw, 88px)',
                fontWeight: 400, lineHeight: 1.02, letterSpacing: '-3.5px',
                color: '#FFFFFF', margin: '0 0 28px',
              }}>
                Ready to fix your<br/>
                <span style={{ backgroundImage: 'linear-gradient(135deg, #3B82F6, #8B5CF6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  growth system?
                </span>
              </h2>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '18px',
                color: 'rgba(255,255,255,0.38)', lineHeight: 1.7,
                margin: '0 auto 56px', maxWidth: '500px',
              }}>
                30 minutes. We&apos;ll map out exactly what a system built for
                your business would look like &mdash; no pitch, no pressure.
              </p>
              <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link
                  href="/book-call"
                  className="cta-btn-pulse"
                  onClick={() => events.bookCallClick('cta_section')}
                  style={{ ...btnPrimary, padding: '18px 36px', fontSize: '16px' }}
                  onMouseEnter={(e: React.MouseEvent<HTMLElement>) => {
                    e.currentTarget.style.opacity = '0.9'
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)'
                    e.currentTarget.style.boxShadow = '0 20px 56px rgba(59,130,246,0.45)'
                    e.currentTarget.classList.add('cta-btn-hover')
                  }}
                  onMouseLeave={(e: React.MouseEvent<HTMLElement>) => {
                    e.currentTarget.style.opacity = '1'
                    e.currentTarget.style.transform = 'none'
                    e.currentTarget.style.boxShadow = '0 0 0 rgba(59,130,246,0)'
                    e.currentTarget.classList.remove('cta-btn-hover')
                  }}
                >
                  <MeetIcon />
                  Book a Strategy Call
                  <Arrow />
                </Link>
                <Link
                  href="/work-with-us"
                  style={{ ...btnGhost, padding: '18px 36px', fontSize: '16px' }}
                  onMouseEnter={(e: React.MouseEvent<HTMLElement>) => {
                    e.currentTarget.style.borderColor = 'rgba(59,130,246,0.35)'
                    e.currentTarget.style.color = 'rgba(255,255,255,0.8)'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={(e: React.MouseEvent<HTMLElement>) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                    e.currentTarget.style.color = 'rgba(255,255,255,0.55)'
                    e.currentTarget.style.transform = 'none'
                  }}
                >
                  View System Tiers
                </Link>
              </div>
              <p style={{ marginTop: '28px', fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(255,255,255,0.18)', letterSpacing: '0.5px' }}>
                No pressure. No hard sell. If we&apos;re not a fit, you still walk away with a clear growth plan.
              </p>
              <p style={{ marginTop: '16px', fontFamily: 'var(--font-body)', fontSize: '14px', color: 'rgba(255,255,255,0.3)' }}>
                Or{' '}
                <Link href="/free-website-audit" style={{
                  color: 'rgba(255,255,255,0.5)',
                  textDecoration: 'underline', textUnderlineOffset: '3px',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.color = 'rgba(255,255,255,0.8)' }}
                onMouseLeave={(e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)' }}
                >get a free audit of your current setup</Link>
                {' '}— no commitment, delivered in 24 hours.
              </p>
            </>
          </Reveal>
        </div>
      </section>

      {/* ── Sticky CTA Banner (desktop) ─────────────────────────────── */}
      <StickyCtaBanner />

      {/* ── Floating Mobile CTA ─────────────────────────────────────── */}
      {showMobileCta && (
        <a
          href="/book-call"
          onClick={() => events.bookCallClick('mobile_floating')}
          style={{
            position: 'fixed', bottom: '24px', left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 998,
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '14px 28px',
            background: '#3B82F6',
            color: '#fff',
            borderRadius: '100px',
            fontSize: '15px', fontWeight: 600,
            textDecoration: 'none',
            boxShadow: '0 8px 32px rgba(59,130,246,0.55)',
            whiteSpace: 'nowrap',
          }}
          className="mobile-floating-cta"
        >
          <MeetIcon />
          Book a Free Call
        </a>
      )}
      <style>{`
        @media (min-width: 768px) {
          .mobile-floating-cta { display: none !important; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 10px #3B82F6; }
          50% { opacity: 0.6; box-shadow: 0 0 20px #3B82F6; }
        }

        /* ── Hero split-layout responsive ──────────────────────── */

        /* Desktop: diagram on right, hide mobile diagram */
        .hero-diagram-mobile { display: none !important; }
        .hero-diagram-desktop { display: flex !important; }

        /* Tablet landscape (768–1023): stack vertically, show desktop diagram centered */
        @media (max-width: 1023px) {
          .hero-split {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
            text-align: center;
          }
          .hero-content { align-items: center !important; }
          .hero-cta-row { justify-content: center !important; }
          .hero-diagram-desktop { justify-content: center !important; }
        }

        /* Mobile (≤640): hide desktop diagram, show inline mobile diagram */
        @media (max-width: 640px) {
          .hero-split {
            grid-template-columns: 1fr !important;
            gap: 0 !important;
          }
          .hero-content { align-items: flex-start !important; text-align: left !important; }
          .hero-diagram-desktop { display: none !important; }
          .hero-diagram-mobile { display: block !important; margin: 0 0 28px !important; }
          .hero-cta-row {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .hero-cta-row > * {
            justify-content: center !important;
            text-align: center !important;
          }
        }

        /* ── Mobile responsiveness ─────────────────────────────── */
        @media (min-width: 641px) and (max-width: 1023px) {
          .components-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .components-grid > div { border-radius: 0 !important; }
          .components-grid > div:first-child { border-radius: 16px 0 0 0 !important; }
          .components-grid > div:nth-child(2) { border-radius: 0 16px 0 0 !important; }
          .components-grid > div:nth-child(5) { border-radius: 0 0 0 16px !important; }
          .components-grid > div:last-child { border-radius: 0 0 16px 0 !important; }
        }
        @media (max-width: 640px) {
          /* Reduce section padding on mobile */
          .homepage-section-lg { padding-top: 80px !important; padding-bottom: 80px !important; }

          /* Hero: tighten spacing */
          .hero-sub { max-width: 100% !important; margin-bottom: 40px !important; }
          .hero-stats { gap: 24px !important; margin-top: 48px !important; }
          .hero-stats > div { min-width: 80px !important; }

          /* Problem cards: single column */
          .problem-grid { grid-template-columns: 1fr !important; }

          /* Flow bar: scroll horizontally */
          .flow-bar { overflow-x: auto !important; -webkit-overflow-scrolling: touch; }

          /* System component cards: 1 col on mobile, 2 col on tablet */
          .components-grid { grid-template-columns: 1fr !important; gap: 2px !important; }
          .components-grid > div { padding: 28px 24px !important; border-radius: 0 !important; }
          .components-grid > div:first-child { border-radius: 16px 16px 0 0 !important; }
          .components-grid > div:last-child { border-radius: 0 0 16px 16px !important; }

          /* How it works steps: reduce gap */
          .steps-item { grid-template-columns: 48px 1fr !important; gap: 20px !important; padding: 32px 0 !important; }

          /* Service cards padding */
          .service-card { padding: 28px 20px !important; }

          /* CTA section button group: stack vertically */
          .cta-btn-group { flex-direction: column !important; align-items: stretch !important; }
          .cta-btn-group > * { text-align: center !important; justify-content: center !important; }

          /* FAQ accordion */
          .faq-question { font-size: 16px !important; }
        }

        @media (max-width: 480px) {
          .goal-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

    </div>
  )
}
