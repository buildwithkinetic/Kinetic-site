'use client'
import Link from 'next/link'
import Reveal from '@/components/Reveal'
import { useState } from 'react'

/* ── Shared button styles ─────────────────────────────────────────────────── */
const btnPrimary: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: '8px',
  padding: '14px 28px',
  background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
  color: '#fff', borderRadius: '100px',
  fontSize: '15px', fontWeight: 600,
  textDecoration: 'none', fontFamily: 'var(--font-body)',
  border: 'none', cursor: 'pointer',
  transition: 'opacity 0.2s, transform 0.2s, box-shadow 0.2s',
  boxShadow: '0 0 0 rgba(59,130,246,0)',
}

/* ── System data ──────────────────────────────────────────────────────────── */
interface SystemCard {
  name: string
  slug: string
  status: 'live' | 'coming-soon'
  industry: string
  oneLiner: string
  caseStudyUrl?: string
  caseStudyClient?: string
  /** Future: content for expanded view */
  expandedContent?: string
}

const systems: SystemCard[] = [
  {
    name: 'Kinetic Gym OS',
    slug: 'gym-os',
    status: 'live',
    industry: 'Fitness & Gyms',
    oneLiner:
      'A 5-layer member acquisition system — conversion website, lead pipeline dashboard, WhatsApp automation, dead lead reactivation, and an AI booking agent. Live in 4 weeks.',
    caseStudyUrl: '/work/core-of-fitness',
    caseStudyClient: 'Core of Fitness, Kolkata',
  },
  {
    name: 'Kinetic Cafe OS',
    slug: 'cafe-os',
    status: 'coming-soon',
    industry: 'Cafes & Restaurants',
    oneLiner:
      'Reservations, WiFi capture, review automation, and re-engagement flows — built for hospitality.',
  },
]

/* ── Pulsing Live Dot ─────────────────────────────────────────────────────── */
function LiveDot() {
  return (
    <span style={{
      position: 'relative',
      display: 'inline-block',
      width: '8px', height: '8px',
      marginRight: '6px',
      verticalAlign: 'middle',
    }}>
      {/* Ping ring */}
      <span style={{
        position: 'absolute', inset: '-3px',
        borderRadius: '50%',
        background: 'var(--green)',
        opacity: 0.4,
        animation: 'livePulse 2s ease-in-out infinite',
      }} />
      {/* Solid dot */}
      <span style={{
        position: 'absolute', inset: 0,
        borderRadius: '50%',
        background: 'var(--green)',
        boxShadow: '0 0 6px var(--green)',
      }} />
    </span>
  )
}

/* ── System Card Component ────────────────────────────────────────────────── */
function SystemCardComponent({ system }: { system: SystemCard }) {
  const [hovered, setHovered] = useState(false)
  const isLive = system.status === 'live'

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'rgba(17,17,17,1)' : 'rgba(17,17,17,0.7)',
        border: `1px solid ${hovered ? 'rgba(59,130,246,0.2)' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: '20px',
        padding: '40px',
        transition: 'all 0.35s var(--ease-out)',
        transform: hovered ? 'translateY(-2px)' : 'none',
        boxShadow: hovered
          ? '0 16px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(59,130,246,0.08)'
          : '0 2px 8px rgba(0,0,0,0.15)',
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '24px',
      }}
    >
      {/* Top row: Status badge + Industry tag */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        {/* Status badge */}
        <span style={{
          display: 'inline-flex', alignItems: 'center',
          padding: '4px 12px',
          borderRadius: '100px',
          fontSize: '11px', fontWeight: 600,
          letterSpacing: '0.5px',
          fontFamily: 'var(--font-body)',
          ...(isLive ? {
            background: 'rgba(34,197,94,0.1)',
            color: 'var(--green)',
            border: '1px solid rgba(34,197,94,0.2)',
          } : {
            background: 'rgba(255,255,255,0.04)',
            color: 'var(--t4)',
            border: '1px solid rgba(255,255,255,0.06)',
          }),
        }}>
          {isLive ? <LiveDot /> : null}
          {isLive ? 'Live' : 'Coming Soon'}
        </span>

        {/* Industry tag */}
        <span style={{
          display: 'inline-flex', alignItems: 'center',
          padding: '4px 12px',
          borderRadius: '100px',
          fontSize: '11px', fontWeight: 500,
          letterSpacing: '0.3px',
          fontFamily: 'var(--font-body)',
          background: 'rgba(255,255,255,0.04)',
          color: 'var(--t3)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}>
          {system.industry}
        </span>
      </div>

      {/* System name */}
      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(24px, 3vw, 32px)',
        fontWeight: 500,
        color: 'var(--t1)',
        letterSpacing: '-0.5px',
        margin: 0,
        lineHeight: 1.2,
      }}>
        {system.name}
      </h3>

      {/* One-liner */}
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: '15px',
        color: 'var(--t3)',
        lineHeight: 1.65,
        margin: 0,
        maxWidth: '480px',
      }}>
        {system.oneLiner}
      </p>

      {/* Metrics strip — live systems only */}
      {isLive && (
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '0', borderTop: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '12px', overflow: 'hidden',
          background: 'rgba(255,255,255,0.02)',
          marginTop: '8px',
        }}>
          {[
            { v: '4 weeks', l: 'Live' },
            { v: '<30s', l: 'WhatsApp reply' },
            { v: '₹5k/mo', l: 'Infra cost' },
          ].map((m, i) => (
            <div key={m.l} style={{
              padding: '14px 16px',
              borderRight: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none',
            }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 600, color: 'var(--green)', margin: '0 0 2px' }}>{m.v}</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--t4)', margin: 0 }}>{m.l}</p>
            </div>
          ))}
        </div>
      )}

      {/* Case study link — live systems with a real client */}
      {isLive && system.caseStudyUrl && (
        <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--t4)', margin: 0, fontStyle: 'italic' }}>
            Deployed for {system.caseStudyClient}
          </p>
          <Link href={system.caseStudyUrl} style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '8px 16px',
            borderRadius: '100px',
            fontSize: '12px', fontWeight: 600,
            fontFamily: 'var(--font-body)',
            color: 'var(--green)',
            background: 'rgba(34,197,94,0.08)',
            border: '1px solid rgba(34,197,94,0.2)',
            textDecoration: 'none',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(34,197,94,0.14)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(34,197,94,0.08)' }}
          >
            View Case Study
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      )}

      {/* Collapsed content area — ready for future expansion */}
      <div
        data-expandable-content
        style={{
          maxHeight: 0,
          overflow: 'hidden',
          transition: 'max-height 0.5s var(--ease-out), opacity 0.3s ease',
          opacity: 0,
        }}
      >
        {system.expandedContent && (
          <div style={{ padding: '24px 0 0' }}>
            <div style={{
              borderTop: '1px solid rgba(255,255,255,0.06)',
              paddingTop: '24px',
            }}>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                color: 'var(--t3)',
                lineHeight: 1.6,
              }}>
                {system.expandedContent}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Main Page ────────────────────────────────────────────────────────────── */
export default function SystemPageClient() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* PAGE HEADER */}
      <section style={{
        padding: '160px 24px 80px',
        maxWidth: '900px', margin: '0 auto',
      }}>
        <Reveal>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '11px',
            letterSpacing: '3px', textTransform: 'uppercase',
            color: 'var(--t4)', marginBottom: '24px',
          }}>Systems Catalogue</p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(40px, 7vw, 80px)',
            fontWeight: 400, lineHeight: 1.05,
            letterSpacing: '-2.5px', color: 'var(--t1)',
            margin: '0 0 28px',
          }}>
            Industry{' '}
            <span style={{
              backgroundImage: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Systems.</span>
          </h1>
          <p style={{
            fontSize: '18px', color: 'var(--t3)', lineHeight: 1.6,
            fontFamily: 'var(--font-body)', maxWidth: '580px', margin: '0',
          }}>
            Not custom. Not generic. Pre-built for your industry, 
            installed into your business — end to end.
          </p>
        </Reveal>
      </section>

      {/* SYSTEMS CATALOGUE GRID */}
      <section style={{ padding: '0 24px 120px' }}>
        <div style={{
          maxWidth: '900px', margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '24px',
        }} className="systems-grid">
          {systems.map((system, i) => (
            <Reveal key={system.slug} delay={i * 0.1}>
              <SystemCardComponent system={system} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* BOTTOM CTA SECTION */}
      <section style={{
        background: '#111111',
        padding: '100px 24px',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <Reveal>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 400, lineHeight: 1.1,
              letterSpacing: '-1.5px', color: 'var(--t1)',
              margin: '0 0 20px',
            }}>
              Don&apos;t See Your{' '}
              <span style={{
                backgroundImage: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Industry?</span>
            </h2>
            <p style={{
              fontSize: '17px', color: 'var(--t3)',
              fontFamily: 'var(--font-body)', lineHeight: 1.6,
              margin: '0 0 36px',
            }}>
              Every system starts with an audit. Book a free 30-minute call and
              we&apos;ll map out exactly what a system built for your business looks like.
            </p>
            <Link href="/book-call"
              style={btnPrimary}
              onMouseEnter={e => {
                e.currentTarget.style.opacity = '0.88'
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)'
                e.currentTarget.style.boxShadow = '0 10px 36px rgba(59,130,246,0.35)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.opacity = '1'
                e.currentTarget.style.transform = 'none'
                e.currentTarget.style.boxShadow = '0 0 0 rgba(59,130,246,0)'
              }}
            >
              Book a Free Strategy Call
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Inline styles for pulse animation + responsive grid */}
      <style>{`
        @keyframes livePulse {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50%      { transform: scale(1.8); opacity: 0; }
        }
        @media (max-width: 768px) {
          .systems-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
