'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface Metric {
  value: string
  numericEnd: number
  prefix: string
  suffix: string
  label: string
}

const metrics: Metric[] = [
  { value: '1,200+', numericEnd: 1200, prefix: '', suffix: '+', label: 'Users reached in 3 weeks' },
  { value: '#1', numericEnd: 1, prefix: '#', suffix: '', label: 'Google ranking in 60 days' },
  { value: '90', numericEnd: 90, prefix: '', suffix: '', label: 'Days to full system' },
  { value: '<60s', numericEnd: 60, prefix: '<', suffix: 's', label: 'Lead response time' },
]

const tags = [
  'Full-Stack Web App',
  'SEO',
  'Lead Automation',
  'CRM',
  'Email Sequences',
]

function useCountUp(end: number, started: boolean, duration = 2000) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!started) return
    let startTime: number | null = null
    const startVal = 0

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(startVal + (end - startVal) * eased))
      if (progress < 1) requestAnimationFrame(step)
    }

    requestAnimationFrame(step)
  }, [started, end, duration])

  return count
}

function MetricItem({ metric, started }: { metric: Metric; started: boolean }) {
  const count = useCountUp(metric.numericEnd, started)
  const display =
    metric.prefix === '#'
      ? `#${count}`
      : metric.prefix === '<'
      ? `<${count}${metric.suffix}`
      : `${count.toLocaleString()}${metric.suffix}`

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '2.5rem',
          fontWeight: 400,
          color: 'var(--text-primary)',
          lineHeight: 1,
        }}
      >
        {display}
      </span>
      <span
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.75rem',
          color: 'var(--text-secondary)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}
      >
        {metric.label}
      </span>
    </div>
  )
}

export default function ResultsSection() {
  const [expanded, setExpanded] = useState(false)
  const [countStarted, setCountStarted] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setCountStarted(true) },
      { threshold: 0.2 }
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="results"
      ref={sectionRef}
      style={{
        backgroundColor: 'var(--background)',
        borderTop: '1px solid var(--border-default)',
        padding: 'clamp(80px, 10vw, 120px) clamp(24px, 8vw, 80px)',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 'clamp(48px, 6vw, 72px)' }}
        >
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'var(--text-secondary)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            RESULTS
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Brands we&apos;ve helped.
          </h2>
        </motion.div>

        {/* Case study card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          onClick={() => setExpanded((p) => !p)}
          className="results-card"
          style={{
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--border-default)',
            borderRadius: '16px',
            overflow: 'hidden',
            cursor: 'pointer',
          }}
        >
          {/* Main layout — two columns */}
          <div className="results-inner">
            {/* LEFT — 55% */}
            <div style={{ padding: 'clamp(32px, 4vw, 48px)', display: 'flex', flexDirection: 'column' }}>
              {/* Client */}
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  margin: '0 0 4px',
                }}
              >
                Sheknowmics
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary)',
                  margin: '0 0 32px',
                }}
              >
                Women&apos;s Health &amp; Hormone Testing Platform
              </p>

              {/* Metrics 2×2 */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '24px',
                  marginBottom: '32px',
                }}
              >
                {metrics.map((m) => (
                  <MetricItem key={m.label} metric={m} started={countStarted} />
                ))}
              </div>

              {/* Divider */}
              <div style={{ height: '1px', backgroundColor: 'var(--border-default)', marginBottom: '32px' }} />

              {/* Quote */}
              <blockquote
                style={{
                  borderLeft: '3px solid rgba(255,255,255,0.2)',
                  paddingLeft: '20px',
                  margin: '0 0 24px',
                  fontFamily: 'var(--font-sans)',
                  fontStyle: 'italic',
                  fontSize: '1rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                }}
              >
                &ldquo;Zero to fully operational in 90 days. Organic growth, top Google ranking, consistent enquiries — the system just works.&rdquo;
              </blockquote>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.7rem',
                      color: 'var(--text-secondary)',
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '4px',
                      padding: '4px 10px',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* RIGHT — 45% */}
            <div
              style={{
                padding: 'clamp(32px, 4vw, 48px)',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                backgroundColor: 'rgba(255,255,255,0.01)',
              }}
            >
              <Image
                src="/Screenshot-1.png"
                alt="Sheknowmics app screenshot 1"
                width={600}
                height={300}
                loading="lazy"
                unoptimized={true}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '300px',
                  objectFit: 'contain',
                  borderRadius: '8px',
                  border: '1px solid var(--border-default)',
                  display: 'block',
                }}
              />
              <Image
                src="/Screenshot-2.png"
                alt="Sheknowmics app screenshot 2"
                width={600}
                height={300}
                loading="lazy"
                unoptimized={true}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '300px',
                  objectFit: 'contain',
                  borderRadius: '8px',
                  border: '1px solid var(--border-default)',
                  display: 'block',
                }}
              />
            </div>
          </div>

          {/* Expanded content */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                style={{ overflow: 'hidden' }}
              >
                <div
                  style={{
                    padding: 'clamp(24px, 4vw, 40px) clamp(32px, 4vw, 48px)',
                    borderTop: '1px solid var(--border-default)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                  }}
                >
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>
                    Sheknowmics came to Kinetic with a strong product but no digital infrastructure. No website, no CRM, no way to capture or follow up on leads. Within 90 days, the full system was live — website, automations, SEO, and CRM all running together.
                  </p>
                  <div>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'var(--text-primary)', marginBottom: '12px', fontWeight: 600 }}>
                      What Kinetic built:
                    </p>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {['Full-stack Next.js web application', 'Custom Supabase CRM with pipeline tracking', 'n8n automation: instant lead acknowledgement + follow-up sequences', 'SEO + Google Business Profile optimisation → #1 ranking in 60 days', 'Email nurture sequences for lead conversion'].map((item) => (
                        <li key={item} style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                          <span style={{ color: 'var(--accent-green)', flexShrink: 0, marginTop: '2px' }}>✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <a
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.875rem',
                        color: 'var(--text-primary)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        background: 'transparent',
                        padding: '10px 24px',
                        borderRadius: '4px',
                        textDecoration: 'none',
                        transition: 'background 200ms ease',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
                    >
                      Visit Sheknowmics →
                    </a>
                    <span
                      style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', color: 'var(--text-muted)', cursor: 'pointer' }}
                      onClick={() => setExpanded(false)}
                    >
                      ↑ Collapse
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <style>{`
        .results-card {
          transition: transform 500ms cubic-bezier(0.16,1,0.3,1), border-color 500ms cubic-bezier(0.16,1,0.3,1), box-shadow 500ms cubic-bezier(0.16,1,0.3,1);
        }
        .results-card:hover {
          transform: translateY(-6px) rotateX(2deg);
          border-color: rgba(255,255,255,0.2) !important;
          box-shadow: 0 40px 80px rgba(0,0,0,0.5);
        }
        .results-inner {
          display: grid;
          grid-template-columns: 55fr 45fr;
        }
        @media (max-width: 900px) {
          .results-inner {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
