'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'
import Reveal from '@/components/Reveal'
import dynamic from 'next/dynamic'
const HeroCanvas = dynamic(() => import('@/components/HeroCanvas'), { ssr: false })
import { events } from '@/lib/analytics'
import { Footer } from '@/components/marketing/Footer'
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

const flowSteps = [
  { label: 'Traffic', sub: 'Ads & SEO', color: '#3B82F6' },
  { label: 'Website', sub: 'Conversion', color: '#5B7FEF' },
  { label: 'Lead Captured', sub: 'Forms & CRM', color: '#6B6BEE' },
  { label: 'Automation', sub: 'Follow-ups', color: '#8B5CF6' },
  { label: 'Conversion', sub: 'Revenue', color: '#A855F7' },
]

const steps = [
  { n: '01', title: 'Audit & Blueprint', desc: 'We map your funnel, identify every leak, and design your complete growth system.' },
  { n: '02', title: 'Build & Install', desc: 'We build and install everything — website, CRM, automations — directly into your business.' },
  { n: '03', title: 'Launch & Measure', desc: 'Your system goes live. Real leads come in. Data shows exactly what is working.' },
  { n: '04', title: 'Scale Predictably', desc: 'Double down on what works. Remove what does not. Grow without adding complexity.' },
]

const components = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
      </svg>
    ),
    title: 'Conversion Website',
    desc: 'Built to turn visitors into leads. Not a brochure — a lead-capture machine.',
    color: '#3B82F6',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
      </svg>
    ),
    title: 'SEO & Visibility',
    desc: 'Google finds you before competitors. Organic leads, compounding over time.',
    color: '#4F7CF5',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'CRM & Pipeline',
    desc: 'Every lead logged, tracked, and visible. Never lose a prospect again.',
    color: '#7B68EE',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
        <path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/>
        <path d="M16 16h5v5"/>
      </svg>
    ),
    title: 'Automation',
    desc: 'Instant lead acknowledgement. Scheduled follow-ups. Zero manual effort.',
    color: '#8B5CF6',
  },
]

const faqs = [
  {
    q: 'How is Kinetic different from a regular web agency?',
    a: "Most agencies build a website and hand over the login details. Kinetic builds the complete growth system — website, CRM, automation, and SEO — and installs it running in your business before handover.",
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
    a: 'Yes. Every offer has a specific performance guarantee. The Visibility Fix: first-page Google ranking in 30 days or I keep working free. Lead Capture System: zero missed leads in 90 days or I fix it free. Full Growth System: 90-day performance guarantee.',
  },
  {
    q: 'Do you work with businesses outside Kolkata?',
    a: 'Yes — the entire process is remote. Strategy call, build, and handover all happen online. Kinetic works with founders and small businesses across India.',
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
        padding: '160px 24px 140px',
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

        <motion.div
          initial="hidden" animate="visible" variants={stagger}
          style={{ maxWidth: '880px', textAlign: 'center', position: 'relative', zIndex: 2 }}
        >
          {/* Eyebrow — earned, specific */}
          <motion.div variants={fadeUp} style={{ marginBottom: '40px' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              padding: '8px 18px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '100px',
              fontFamily: 'var(--font-body)', fontSize: '12px',
              color: 'rgba(255,255,255,0.45)', letterSpacing: '2px',
              textTransform: 'uppercase',
            }}>
              <span style={{
                width: '5px', height: '5px', borderRadius: '50%',
                background: '#3B82F6', boxShadow: '0 0 10px #3B82F6',
                flexShrink: 0,
                animation: 'pulse 2s ease-in-out infinite',
              }} />
              Growth Systems · Kolkata, India
            </span>
          </motion.div>

          {/* Headline — clean, confident, no gradient */}
          <motion.h1 variants={fadeUp} style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(52px, 8vw, 96px)',
            fontWeight: 400,
            lineHeight: 1.04,
            letterSpacing: '-3px',
            color: '#FFFFFF',
            margin: '0 0 8px',
          }}>
            Turn your website into
          </motion.h1>
          <motion.h1 variants={fadeUp} style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(52px, 8vw, 96px)',
            fontWeight: 400,
            lineHeight: 1.04,
            letterSpacing: '-3px',
            color: 'rgba(255,255,255,0.92)',
            margin: '0 0 52px',
          }}>
            your best salesperson.
          </motion.h1>

          {/* Sub — one clean sentence */}
          <motion.p variants={fadeUp} style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(17px, 2vw, 20px)',
            color: 'rgba(255,255,255,0.42)',
            lineHeight: 1.7,
            maxWidth: '520px',
            margin: '0 auto 64px',
            fontWeight: 300,
            letterSpacing: '0.1px',
          }}>
            We install a complete client acquisition system — website, CRM, and automation — that captures and converts leads while you sleep.
          </motion.p>

          {/* Single primary CTA */}
          <motion.div variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <Link
              href="https://cal.com/ayush-gupta-xpzedb/free-business-audit-kinetic"
              onClick={() => events.bookCallClick('hero')}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                padding: '18px 36px',
                background: '#3B82F6',
                color: '#fff', borderRadius: '100px',
                fontSize: '16px', fontWeight: 600,
                textDecoration: 'none', fontFamily: 'var(--font-body)',
                border: 'none', cursor: 'pointer',
                transition: 'transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s cubic-bezier(0.16,1,0.3,1), background 0.2s',
                boxShadow: '0 0 0 rgba(59,130,246,0)',
                letterSpacing: '-0.2px',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px) scale(1.04)'
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(59,130,246,0.5), 0 0 0 1px rgba(59,130,246,0.4)'
                e.currentTarget.style.background = '#2563EB'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'none'
                e.currentTarget.style.boxShadow = '0 0 0 rgba(59,130,246,0)'
                e.currentTarget.style.background = '#3B82F6'
              }}
            >
              <MeetIcon />
              Book a Free Strategy Call
              <Arrow />
            </Link>

            {/* Trust line */}
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '13px',
              color: 'rgba(255,255,255,0.25)', margin: 0,
              letterSpacing: '0.2px',
            }}>
              30-minute call &nbsp;·&nbsp; No pitch &nbsp;·&nbsp; No retainer
            </p>
          </motion.div>

          {/* Social proof strip */}
          <motion.div variants={fadeUp} style={{
            marginTop: '80px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '40px', flexWrap: 'wrap',
          }}>
            {[
              { value: '30', label: 'Day delivery' },
              { value: '90', label: 'Day guarantee' },
              { value: '100%', label: 'Done-for-you' },
            ].map(({ value, label }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(28px, 3.5vw, 40px)',
                  fontWeight: 400,
                  color: '#FFFFFF',
                  letterSpacing: '-1.5px',
                  lineHeight: 1,
                  marginBottom: '4px',
                }}>
                  {value}
                </div>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.3)',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                }}>
                  {label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>


      {/* ══ TRUST BAR ══════════════════════════════════════════════════ */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        padding: '20px 24px',
        background: 'rgba(255,255,255,0.01)',
      }}>
        <div style={{
          maxWidth: '800px', margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: '0', flexWrap: 'wrap',
        }}>
          {[
            '50+ systems built',
            'Delivered in 2–4 weeks',
            'Used by founders across India',
          ].map((item, i) => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
              <span style={{
                fontFamily: 'var(--font-body)', fontSize: '12px',
                color: 'rgba(255,255,255,0.28)', letterSpacing: '0.5px',
                padding: '0 28px',
                whiteSpace: 'nowrap',
              }}>{item}</span>
              {i < 2 && <span style={{ width: '1px', height: '16px', background: 'rgba(255,255,255,0.08)', flexShrink: 0 }} />}
            </div>
          ))}
        </div>
      </div>

      {/* ══ 2. PROBLEM ══════════════════════════════════════════════════ */}
      <section style={{ padding: '140px 24px' }}>
        <div style={{ maxWidth: '1040px', margin: '0 auto' }}>

          <Reveal>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '24px' }}>
              The problem
            </p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(38px, 5.5vw, 72px)',
              fontWeight: 400, lineHeight: 1.06, letterSpacing: '-2.5px',
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

      {/* ══ 3. THE SYSTEM ════════════════════════════════════════════════ */}
      <section style={{ padding: '140px 24px', background: 'rgba(255,255,255,0.015)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '1040px', margin: '0 auto' }}>

          <Reveal>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '24px' }}>
              How your business scales without you
            </p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 5vw, 66px)',
              fontWeight: 400, lineHeight: 1.06, letterSpacing: '-2px',
              color: '#FFFFFF', margin: '0 0 72px',
            }}>
              The System Behind<br/>
              <span style={{ backgroundImage: 'linear-gradient(135deg, #3B82F6, #8B5CF6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Predictable Growth
              </span>
            </h2>
          </Reveal>

          {/* Flow bar with stagger */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            style={{
              display: 'flex', alignItems: 'stretch',
              overflowX: 'auto', gap: '0',
              borderRadius: '16px', overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            {flowSteps.map((step, i) => (
              <motion.div
                key={step.label}
                variants={fadeUp}
                whileHover={{ scale: 1.03, zIndex: 2 }}
                transition={{ duration: 0.2 }}
                style={{
                  flex: 1, minWidth: '140px',
                  padding: '36px 24px',
                  background: i === 0
                    ? 'rgba(59,130,246,0.08)'
                    : i === flowSteps.length - 1
                    ? 'rgba(168,85,247,0.08)'
                    : `rgba(${59 + i * 18},${130 - i * 10},${246 - i * 20},0.04)`,
                  borderRight: i < flowSteps.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  textAlign: 'center', position: 'relative',
                  cursor: 'default',
                  transition: 'background 0.25s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = step.color + '15'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = i === 0
                    ? 'rgba(59,130,246,0.08)'
                    : i === flowSteps.length - 1
                    ? 'rgba(168,85,247,0.08)'
                    : `rgba(${59 + i * 18},${130 - i * 10},${246 - i * 20},0.04)`
                }}
              >
                {i < flowSteps.length - 1 && (
                  <div style={{
                    position: 'absolute', right: '-8px', top: '50%', transform: 'translateY(-50%)',
                    width: '16px', height: '16px', zIndex: 2,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                )}
                <div style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  background: step.color + '20',
                  border: `1px solid ${step.color}40`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '16px',
                  boxShadow: `0 0 12px ${step.color}20`,
                }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: step.color }} />
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, color: '#FFFFFF', margin: '0 0 6px' }}>{step.label}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(255,255,255,0.3)', margin: 0 }}>{step.sub}</p>
              </motion.div>
            ))}
          </motion.div>

          <Reveal>
            <p style={{ marginTop: '40px', fontFamily: 'var(--font-body)', fontSize: '14px', color: 'rgba(255,255,255,0.25)', lineHeight: 1.65, maxWidth: '600px' }}>
              Five interconnected layers working together. Each one solves a specific problem.
              Together they create a business that generates leads without depending on you.
            </p>
          </Reveal>
        </div>
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
              fontWeight: 400, lineHeight: 1.08, letterSpacing: '-2px',
              color: '#FFFFFF', margin: '0 0 80px',
            }}>
              Four steps to a<br/>
              <span style={{ color: 'rgba(255,255,255,0.3)' }}>system that runs itself.</span>
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

      {/* ══ 5. SYSTEM COMPONENTS ════════════════════════════════════════ */}
      <section style={{ padding: '140px 24px', background: 'rgba(255,255,255,0.015)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '1040px', margin: '0 auto' }}>

          <Reveal>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '24px' }}>
              What&apos;s inside
            </p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 5vw, 60px)',
              fontWeight: 400, lineHeight: 1.08, letterSpacing: '-2px',
              color: '#FFFFFF', margin: '0 0 16px',
            }}>
              Parts of the system.
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '17px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.65, maxWidth: '460px', margin: '0 0 72px' }}>
              Not a menu of services. One integrated system with four layers &mdash; all working together.
            </p>
          </Reveal>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px', overflow: 'hidden' }}
          >
            {components.map((c) => (
              <motion.div
                key={c.title}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  padding: '40px 36px',
                  background: '#0A0A0A',
                  cursor: 'default', height: '100%',
                  border: '1px solid transparent',
                  transition: 'background 0.25s, border-color 0.25s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = c.color + '0A'
                  ;(e.currentTarget as HTMLElement).style.borderColor = c.color + '20'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = '#0A0A0A'
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'transparent'
                }}
              >
                <div style={{
                  width: '48px', height: '48px', borderRadius: '14px',
                  background: c.color + '15',
                  border: `1px solid ${c.color}25`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: c.color, marginBottom: '24px',
                  transition: 'box-shadow 0.25s, background 0.25s',
                }}
                className={`icon-${c.title.toLowerCase().replace(/[^a-z]/g, '')}`}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${c.color}30`
                  ;(e.currentTarget as HTMLElement).style.background = c.color + '25'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none'
                  ;(e.currentTarget as HTMLElement).style.background = c.color + '15'
                }}
                >
                  {c.icon}
                </div>
                <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '17px', fontWeight: 600, color: '#FFFFFF', margin: '0 0 10px' }}>{c.title}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.65, margin: 0 }}>{c.desc}</p>
              </motion.div>
            ))}
          </motion.div>
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
              fontWeight: 400, lineHeight: 1.1, letterSpacing: '-2px',
              color: '#FFFFFF', margin: '0 0 64px',
            }}>
              Systems that<br/>
              <span style={{ backgroundImage: 'linear-gradient(135deg, #3B82F6, #8B5CF6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                produce results.
              </span>
            </h2>
          </Reveal>

          <Reveal>
            <div style={{
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '24px', overflow: 'hidden',
            }}>
              {/* Case study header */}
              <div style={{
                padding: '48px 48px 0',
                background: 'linear-gradient(180deg, rgba(59,130,246,0.06) 0%, transparent 100%)',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                  <span style={{
                    padding: '4px 14px',
                    background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)',
                    borderRadius: '100px', fontFamily: 'var(--font-body)', fontSize: '12px', color: '#60A5FA',
                  }}>Case Study</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.3)' }}>
                    Women&apos;s Health Platform &middot; India
                  </span>
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(28px, 4vw, 44px)',
                  fontWeight: 400, letterSpacing: '-1.5px', color: '#FFFFFF',
                  margin: '0 0 48px',
                }}>Sheknowmics</h3>

                {/* Metrics with count-up */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  {[
                    { v: '1,200+', l: 'Users in 3 weeks' },
                    { v: '#1', l: 'Google rank in 60 days' },
                    { v: '<60s', l: 'Lead response time' },
                    { v: '90d', l: 'Zero to full system' },
                  ].map((m, i) => (
                    <div key={m.v} style={{
                      padding: '32px 28px',
                      borderRight: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                    }}>
                      <p style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(30px, 4vw, 44px)',
                        fontWeight: 400, margin: '0 0 6px',
                        backgroundImage: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                      }}><MetricValue value={m.v} /></p>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.3)', margin: 0 }}>{m.l}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonial + link */}
              <div style={{ padding: '40px 48px', display: 'flex', gap: '40px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '280px', borderLeft: '2px solid rgba(59,130,246,0.35)', paddingLeft: '24px' }}>
                  <p style={{
                    fontFamily: 'var(--font-display)', fontSize: '18px',
                    fontStyle: 'italic', color: 'rgba(255,255,255,0.65)',
                    lineHeight: 1.6, margin: '0 0 12px',
                  }}>
                    &ldquo;Kinetic built the entire system &mdash; website, lead capture, automations &mdash; and handed it over running. We started getting consistent enquiries within weeks.&rdquo;
                  </p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.25)', margin: 0 }}>
                    &mdash; Sheknowmics Founder
                  </p>
                </div>
                <Link href="/results" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  fontFamily: 'var(--font-body)', fontSize: '14px',
                  color: '#3B82F6', textDecoration: 'none',
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
              fontWeight: 400, lineHeight: 1.08, letterSpacing: '-2px',
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
              30 minutes. I&apos;ll map out exactly what a system built for
              your business would look like &mdash; no pitch, no pressure.
            </p>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                href="https://cal.com/ayush-gupta-xpzedb/free-business-audit-kinetic"
                className="cta-btn-pulse"
                onClick={() => events.bookCallClick('cta_section')}
                style={{ ...btnPrimary, padding: '18px 36px', fontSize: '16px' }}
                onMouseEnter={e => {
                  e.currentTarget.style.opacity = '0.9'
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)'
                  e.currentTarget.style.boxShadow = '0 20px 56px rgba(59,130,246,0.45)'
                  e.currentTarget.classList.add('cta-btn-hover')
                }}
                onMouseLeave={e => {
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
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(59,130,246,0.35)'
                  e.currentTarget.style.color = 'rgba(255,255,255,0.8)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={e => {
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
              onMouseEnter={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.8)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)' }}
              >get a free audit of your current setup</Link>
              {' '}— no commitment, delivered in 24 hours.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <Footer />

      {/* ── Sticky CTA Banner (desktop) ─────────────────────────────── */}
      <StickyCtaBanner />

      {/* ── Floating Mobile CTA ─────────────────────────────────────── */}
      {showMobileCta && (
        <a
          href="https://cal.com/ayush-gupta-xpzedb/free-business-audit-kinetic"
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
      `}</style>

    </div>
  )
}
