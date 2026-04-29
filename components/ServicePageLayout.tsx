'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import DiscoveryButton from '@/components/DiscoveryButton'
import Reveal from '@/components/Reveal'

interface Stat { value: string; label: string }
interface Deliverable { num: string; title: string; desc: string }
interface WhyItem { title: string; desc: string }
interface ProcessStep { step: string; title: string; desc: string }
interface FaqItem { q: string; a: string }
interface RelatedService { title: string; desc: string; href: string }

interface ServicePageLayoutProps {
  badge: string
  headline: string
  headlineAccent: string
  subline: string
  stats: Stat[]
  whatWeDeliver: Deliverable[]
  whyItMatters: WhyItem[]
  process: ProcessStep[]
  faq: FaqItem[]
  relatedServices: RelatedService[]
}

function RelatedCard({ title, desc, href }: { title: string; desc: string; href: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block',
        padding: '28px',
        background: hovered ? 'var(--bg-card-2)' : 'var(--bg-card)',
        borderRadius: '10px',
        border: `1px solid ${hovered ? 'var(--orange)' : 'var(--border)'}`,
        textDecoration: 'none',
        transition: 'border-color 200ms ease, background 200ms ease',
      }}
    >
      <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--t1)', margin: '0 0 8px', fontFamily: 'var(--font-body)' }}>{title}</h3>
      <p style={{ fontSize: '13px', color: 'var(--t3)', lineHeight: 1.5, margin: '0 0 16px', fontFamily: 'var(--font-body)' }}>{desc}</p>
      <span style={{ fontSize: '13px', color: 'var(--orange)', fontWeight: 500, fontFamily: 'var(--font-body)' }}>Learn more →</span>
    </Link>
  )
}

export default function ServicePageLayout({
  badge,
  headline,
  headlineAccent,
  subline,
  stats,
  whatWeDeliver,
  whyItMatters,
  process,
  faq,
  relatedServices,
}: ServicePageLayoutProps) {
  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* HERO */}
      <section style={{ padding: '120px 80px 80px', maxWidth: '1100px', margin: '0 auto' }} className="section-pad">
        <Reveal>
          <span style={{
            display: 'inline-block',
            background: 'var(--orange-dim)',
            border: '1px solid rgba(200,251,76,0.2)',
            color: 'var(--orange)',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            padding: '6px 14px',
            borderRadius: '100px',
            marginBottom: '32px',
            fontFamily: 'var(--font-mono)',
          }}>
            {badge}
          </span>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(40px, 5.5vw, 76px)',
            fontWeight: 400,
            lineHeight: 1.05,
            letterSpacing: '-1.5px',
            color: 'var(--t1)',
            margin: 0,
            maxWidth: '800px',
          }}>
            {headline}{' '}
            <span style={{ color: 'var(--orange)', fontStyle: 'italic' }}>{headlineAccent}</span>
          </h1>
        </Reveal>

        <Reveal delay={0.14}>
          <p style={{
            fontSize: '18px',
            color: 'var(--t3)',
            lineHeight: 1.65,
            marginTop: '28px',
            maxWidth: '560px',
            fontFamily: 'var(--font-body)',
            fontWeight: 300,
          }}>
            {subline}
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div style={{ marginTop: '44px' }}>
            <DiscoveryButton size="md" />
          </div>
        </Reveal>
      </section>

      {/* STATS */}
      <section style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '0 80px',
            display: 'grid',
            gridTemplateColumns: `repeat(${stats.length}, 1fr)`,
            gap: 0,
          }}
          className="stats-grid section-pad"
        >
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div style={{
                padding: '40px 0',
                borderRight: i < stats.length - 1 ? '1px solid var(--border)' : 'none',
                paddingRight: i < stats.length - 1 ? '40px' : '0',
                paddingLeft: i > 0 ? '40px' : '0',
              }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(28px, 3.5vw, 44px)',
                  fontWeight: 400,
                  color: 'var(--orange)',
                  letterSpacing: '-1px',
                  lineHeight: 1,
                }}>
                  {s.value}
                </div>
                <div style={{
                  fontSize: '11px', color: 'var(--t4)',
                  marginTop: '8px', fontFamily: 'var(--font-mono)',
                  letterSpacing: '1.5px', textTransform: 'uppercase',
                }}>
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* WHAT WE DELIVER */}
      <section style={{ padding: '100px 80px', maxWidth: '1100px', margin: '0 auto' }} className="section-pad">
        <Reveal>
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '11px',
            letterSpacing: '3px', color: 'var(--t4)',
            textTransform: 'uppercase', marginBottom: '48px',
          }}>
            / WHAT WE DELIVER
          </p>
        </Reveal>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px' }}
          className="deliver-grid"
        >
          {whatWeDeliver.map((item, i) => (
            <motion.div
              key={i}
              variants={{ hidden: { y: 16, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } } }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              style={{
                background: 'var(--bg-card)',
                padding: '36px',
                borderRadius:
                  i === 0 ? '12px 0 0 0'
                  : i === 1 ? '0 12px 0 0'
                  : i === whatWeDeliver.length - 2 && whatWeDeliver.length % 2 === 0 ? '0 0 0 12px'
                  : i === whatWeDeliver.length - 1 ? '0 0 12px 0'
                  : '0',
              }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--t4)', letterSpacing: '1px' }}>{item.num}</span>
              <h3 style={{
                fontFamily: 'var(--font-body)',
                fontSize: '18px', fontWeight: 700,
                color: 'var(--t1)', margin: '10px 0 10px',
                letterSpacing: '-0.3px',
              }}>{item.title}</h3>
              <p style={{ fontSize: '14px', color: 'var(--t2)', lineHeight: 1.65, margin: 0, fontFamily: 'var(--font-body)' }}>{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* WHY IT MATTERS */}
      <section style={{ background: 'var(--bg-dark)', padding: '100px 80px' }} className="section-pad">
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <Reveal>
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: '11px',
              letterSpacing: '3px', color: 'var(--t4)',
              textTransform: 'uppercase', marginBottom: '48px',
            }}>
              / WHY IT MATTERS
            </p>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }} className="matters-grid">
            {whyItMatters.map((item, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '28px' }}>
                  <h3 style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '16px', fontWeight: 700,
                    color: 'var(--t1)', margin: '0 0 12px',
                    letterSpacing: '-0.2px',
                  }}>{item.title}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--t3)', lineHeight: 1.65, margin: 0, fontFamily: 'var(--font-body)' }}>{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section style={{ padding: '100px 80px', maxWidth: '1100px', margin: '0 auto' }} className="section-pad">
        <Reveal>
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '11px',
            letterSpacing: '3px', color: 'var(--t4)',
            textTransform: 'uppercase', marginBottom: '48px',
          }}>
            / HOW WE WORK
          </p>
        </Reveal>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {process.map((item, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <div style={{
                display: 'flex',
                gap: '40px',
                alignItems: 'flex-start',
                padding: '36px 0',
                borderBottom: i < process.length - 1 ? '1px solid var(--border)' : 'none',
              }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '12px',
                  color: 'var(--t4)', flexShrink: 0,
                  paddingTop: '4px', minWidth: '28px',
                }}>{item.step}</span>
                <div>
                  <h3 style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '18px', fontWeight: 700,
                    color: 'var(--t1)', margin: '0 0 8px',
                    letterSpacing: '-0.3px',
                  }}>{item.title}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--t2)', lineHeight: 1.65, margin: 0, fontFamily: 'var(--font-body)' }}>{item.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: 'var(--bg-card)', padding: '100px 80px' }} className="section-pad">
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <Reveal>
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: '11px',
              letterSpacing: '3px', color: 'var(--t4)',
              textTransform: 'uppercase', marginBottom: '48px',
            }}>
              / COMMON QUESTIONS
            </p>
          </Reveal>
          {faq.map((item, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '28px', marginBottom: '28px' }}>
                <h3 style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '16px', fontWeight: 700,
                  color: 'var(--t1)', margin: '0 0 10px',
                  letterSpacing: '-0.2px',
                }}>{item.q}</h3>
                <p style={{ fontSize: '14px', color: 'var(--t2)', lineHeight: 1.65, margin: 0, fontFamily: 'var(--font-body)' }}>{item.a}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* RELATED SERVICES */}
      <section style={{ padding: '100px 80px', maxWidth: '1100px', margin: '0 auto' }} className="section-pad">
        <Reveal>
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '11px',
            letterSpacing: '3px', color: 'var(--t4)',
            textTransform: 'uppercase', marginBottom: '48px',
          }}>
            / RELATED SERVICES
          </p>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }} className="related-grid">
          {relatedServices.map((s, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <RelatedCard title={s.title} desc={s.desc} href={s.href} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ background: 'var(--bg-dark)', padding: '120px 80px', textAlign: 'center' }} className="section-pad">
        <Reveal>
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '11px',
            letterSpacing: '3px', color: 'var(--t4)',
            textTransform: 'uppercase', marginBottom: '32px',
          }}>
            / READY TO START
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(32px, 4.5vw, 60px)',
            fontWeight: 400,
            color: 'var(--t1)', margin: '0 0 20px',
            letterSpacing: '-1.5px', lineHeight: 1.05,
            fontStyle: 'normal',
          }}>
            {"Let's build this"}<br />
            <span style={{ color: 'var(--orange)', fontStyle: 'italic' }}>for your business.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.14}>
          <p style={{
            fontSize: '16px', color: 'var(--t3)', maxWidth: '460px',
            margin: '0 auto 44px', lineHeight: 1.6,
            fontFamily: 'var(--font-body)', fontWeight: 300,
          }}>
            Free 30-minute discovery call. I&apos;ll scope exactly what you need and tell you if this is the right fit.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <DiscoveryButton size="lg" darkMode />
        </Reveal>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .section-pad { padding-left: 24px !important; padding-right: 24px !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .deliver-grid { grid-template-columns: 1fr !important; }
          .matters-grid { grid-template-columns: 1fr !important; }
          .related-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}
