'use client'
import { useState } from 'react'
import Link from 'next/link'
import Reveal from '@/components/Reveal'

const btnPrimary: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: '8px',
  padding: '16px 32px',
  background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
  color: '#fff', borderRadius: '100px',
  fontSize: '16px', fontWeight: 600,
  textDecoration: 'none', fontFamily: 'var(--font-body)',
  border: 'none', cursor: 'pointer',
  transition: 'opacity 0.2s, transform 0.2s, box-shadow 0.2s',
  boxShadow: '0 0 0 rgba(59,130,246,0)',
}
const MeetIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M15 9.5V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2.5l4 3V6.5l-4 3Z"/>
  </svg>
)

const tiers = [
  {
    num: 'Tier 1',
    name: 'Starter System',
    tagline: "Get found. Start capturing leads.",
    priceLabel: 'Starting from',
    price: '₹25,000',
    timeline: 'Live in 2 weeks',
    what: 'The foundation. A conversion-focused website + Google visibility + basic lead capture form. Ideal for businesses with no digital presence.',
    includes: [
      'Conversion-focused website (Next.js)',
      'Google Business Profile setup & optimisation',
      'On-page SEO foundation',
      'Lead capture form + Supabase logging',
      'Basic email notification on new lead',
    ],
    guarantee: "If you don't appear on the first page of Google for your primary keyword in 30 days, I'll keep working at no extra charge.",
    badge: null,
    color: '#3B82F6',
  },
  {
    num: 'Tier 2',
    name: 'Lead Capture System',
    tagline: "Never miss a lead again.",
    priceLabel: 'Starting from',
    price: '₹45,000',
    timeline: 'Live in 2–3 weeks',
    what: 'Everything in Tier 1, plus a full CRM integration and automated follow-up workflows. Every lead is logged, tracked, and followed up — automatically.',
    includes: [
      'Everything in Tier 1',
      'Custom CRM dashboard (Supabase)',
      'n8n automation workflows',
      'Instant WhatsApp/email lead acknowledgement',
      'Lead pipeline management',
      'Booking calendar integration',
    ],
    guarantee: "If you miss a single lead due to a system failure in the first 90 days, I fix it free.",
    badge: 'Most Popular',
    color: '#6366F1',
  },
  {
    num: 'Tier 3',
    name: 'Growth System',
    tagline: "The full engine, installed and running.",
    priceLabel: 'Starting from',
    price: '₹75,000',
    timeline: 'Live in 4 weeks',
    what: 'The complete system: traffic, conversion, automation, CRM, analytics, and retention. Built for businesses serious about predictable, measurable lead growth.',
    includes: [
      'Everything in Tier 2',
      'Paid ads setup (Google + Meta)',
      'Advanced funnel pages & landing pages',
      'Full analytics & conversion tracking',
      'Review automation & retention flows',
      '90-day optimisation support',
    ],
    guarantee: "90-day performance guarantee — if the system doesn't generate measurable lead growth, I keep working until it does.",
    badge: 'Best Value',
    color: '#8B5CF6',
  },
  {
    num: 'Tier 4',
    name: 'Advanced System',
    tagline: "Enterprise-grade infrastructure.",
    priceLabel: 'Custom pricing',
    price: 'Scoped per project',
    timeline: 'Scoped per project',
    what: 'For businesses with complex requirements: multi-location, e-commerce, custom CRM workflows, AI integrations, or full-stack web application development.',
    includes: [
      'Everything in Tier 3',
      'Custom web application development',
      'AI agents & intelligent automation',
      'Multi-location system deployment',
      'Custom integrations & API work',
      'Dedicated support & SLA',
    ],
    guarantee: "Fully custom scope and guarantee — defined before project start.",
    badge: null,
    color: '#A855F7',
  },
]

export default function WorkWithUsPageClient() {
  const [activeTab, setActiveTab] = useState<'for' | 'not'>('for')

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* HERO */}
      <section style={{ padding: '160px 24px 80px', maxWidth: '900px', margin: '0 auto' }}>
        <Reveal>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '11px',
            letterSpacing: '3px', textTransform: 'uppercase',
            color: 'var(--t4)', marginBottom: '24px',
          }}>Work With Kinetic</p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px, 6vw, 72px)',
            fontWeight: 400, lineHeight: 1.05,
            letterSpacing: '-2px', color: 'var(--t1)',
            margin: '0 0 24px',
          }}>
            Install Your<br/>
            <span style={{
              backgroundImage: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Growth System</span>
          </h1>
          <p style={{
            fontSize: '18px', color: 'var(--t3)', lineHeight: 1.6,
            fontFamily: 'var(--font-body)', maxWidth: '560px', margin: 0,
          }}>
            Not services. Not retainers. System capability levels — each one more
            powerful than the last.
          </p>
        </Reveal>
      </section>

      {/* WHO IS THIS FOR */}
      <section style={{ padding: '0 24px 80px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <Reveal>
            <div style={{
              display: 'flex', gap: '8px', marginBottom: '40px',
            }}>
              {(['for', 'not'] as const).map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} style={{
                  padding: '10px 20px',
                  background: activeTab === tab ? 'rgba(59,130,246,0.15)' : 'transparent',
                  border: activeTab === tab ? '1px solid rgba(59,130,246,0.3)' : '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '100px', cursor: 'pointer',
                  fontFamily: 'var(--font-body)', fontSize: '14px',
                  color: activeTab === tab ? '#3B82F6' : 'var(--t3)',
                  transition: 'all 0.2s',
                }}>
                  {tab === 'for' ? 'Who this is for' : 'Who this is NOT for'}
                </button>
              ))}
            </div>
          </Reveal>

          {activeTab === 'for' && (
            <Reveal>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '16px',
              }}>
                {[
                  { title: 'Service businesses', desc: 'Clinics, consultants, agencies, salons, contractors — any business where leads become clients.' },
                  { title: 'Founders ready to scale', desc: "You've validated the business. Now you want growth that doesn't depend on you showing up every day." },
                  { title: 'Businesses tired of manual work', desc: "Following up manually, losing leads, no visibility — you know there's a better way." },
                  { title: 'Startups building for traction', desc: "You need the infrastructure to acquire users at scale — not just a website." },
                ].map(item => (
                  <div key={item.title} style={{
                    padding: '24px',
                    background: '#111111',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '16px',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3B82F6' }} />
                      <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 600, color: 'var(--t1)', margin: 0 }}>{item.title}</h3>
                    </div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--t3)', lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          )}

          {activeTab === 'not' && (
            <Reveal>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '16px',
              }}>
                {[
                  { title: 'Businesses wanting a brochure site', desc: "If you want a website with no lead capture, no tracking, and no automation — this isn't for you." },
                  { title: 'People looking for the cheapest option', desc: "Growth systems require investment. If you're comparing purely on price, we're probably not a fit." },
                  { title: 'Businesses unwilling to track results', desc: "If you don't want to measure what's working, there's no point in building a system." },
                  { title: 'No clear business model', desc: "I can't build a lead generation system for a business that doesn't have a clear offer or target customer." },
                ].map(item => (
                  <div key={item.title} style={{
                    padding: '24px',
                    background: '#111111',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '16px', opacity: 0.8,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(239,68,68,0.6)' }} />
                      <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 600, color: 'var(--t2)', margin: 0 }}>{item.title}</h3>
                    </div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--t3)', lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* SYSTEM TIERS */}
      <section style={{ background: '#111111', padding: '80px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <Reveal>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '11px',
              letterSpacing: '3px', textTransform: 'uppercase',
              color: 'var(--t4)', marginBottom: '12px',
            }}>System Tiers</p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 400, letterSpacing: '-1.5px', color: 'var(--t1)',
              margin: '0 0 48px',
            }}>
              Levels of System Capability
            </h2>
          </Reveal>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}>
            {tiers.map(tier => (
              <Reveal key={tier.num}>
                <div style={{
                  padding: '32px',
                  background: 'var(--bg)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '20px',
                  position: 'relative',
                  display: 'flex', flexDirection: 'column',
                  height: '100%',
                }}>
                  {tier.badge && (
                    <span style={{
                      position: 'absolute', top: '20px', right: '20px',
                      padding: '4px 12px',
                      background: `rgba(${tier.color === '#3B82F6' ? '59,130,246' : tier.color === '#8B5CF6' ? '139,92,246' : '99,102,241'}, 0.15)`,
                      border: `1px solid rgba(${tier.color === '#3B82F6' ? '59,130,246' : tier.color === '#8B5CF6' ? '139,92,246' : '99,102,241'}, 0.3)`,
                      borderRadius: '100px',
                      fontFamily: 'var(--font-body)', fontSize: '11px',
                      color: tier.color,
                    }}>{tier.badge}</span>
                  )}

                  <div style={{
                    width: '6px', height: '32px',
                    background: tier.color,
                    borderRadius: '3px',
                    marginBottom: '20px',
                  }} />

                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--t4)', letterSpacing: '2px', margin: '0 0 8px' }}>{tier.num}</p>
                  <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '20px', fontWeight: 700, color: 'var(--t1)', margin: '0 0 6px' }}>{tier.name}</h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: tier.color, margin: '0 0 16px' }}>{tier.tagline}</p>

                  {/* Price */}
                  <div style={{ marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--t4)', letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 4px' }}>{tier.priceLabel}</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '20px', fontWeight: 600, color: 'var(--t1)', margin: 0 }}>{tier.price}</p>
                    {tier.num !== 'Tier 4' && (
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--t4)', margin: '4px 0 0', fontStyle: 'italic' }}>
                        Final price depends on scope — confirmed before project start.
                      </p>
                    )}
                  </div>

                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--t3)', lineHeight: 1.5, margin: '0 0 20px' }}>{tier.what}</p>

                  <div style={{ marginBottom: '20px', flex: 1 }}>
                    {tier.includes.map(item => (
                      <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '6px' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={tier.color} strokeWidth="2.5" style={{ flexShrink: 0, marginTop: '2px' }}>
                          <path d="M20 6 9 17l-5-5"/>
                        </svg>
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--t2)' }}>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{
                    padding: '16px',
                    background: '#111111',
                    borderRadius: '10px',
                    marginBottom: '20px',
                  }}>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--t4)', margin: '0 0 6px' }}>{tier.timeline}</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--t4)', lineHeight: 1.4, margin: 0 }}>{tier.guarantee}</p>
                  </div>

                  <Link href="/book-call" style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    padding: '12px',
                    background: 'transparent',
                    border: `1px solid ${tier.color}`,
                    borderRadius: '10px',
                    fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600,
                    color: tier.color, textDecoration: 'none',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${tier.color}15` }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
                  >
                    Get This System Built →
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FREE BUSINESS AUDIT */}
      <section id="free-audit" style={{ padding: '80px 24px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <Reveal>
            <div style={{
              padding: '56px 48px',
              background: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(139,92,246,0.08))',
              border: '1px solid rgba(59,130,246,0.2)',
              borderRadius: '24px',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '600px', height: '300px',
                background: 'radial-gradient(ellipse, rgba(59,130,246,0.06) 0%, transparent 70%)',
                pointerEvents: 'none',
              }} />
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '11px',
                letterSpacing: '3px', textTransform: 'uppercase',
                color: '#3B82F6', marginBottom: '16px',
              }}>Free Business Audit</p>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 4vw, 48px)',
                fontWeight: 400, letterSpacing: '-1.5px', color: 'var(--t1)',
                margin: '0 0 20px', lineHeight: 1.1,
              }}>
                Not sure where to start?
              </h2>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '17px',
                color: 'var(--t3)', lineHeight: 1.6,
                maxWidth: '520px', margin: '0 auto 36px',
              }}>
                Let Kinetic audit your entire online presence and identify exactly
                where you are losing leads, what is broken, and what needs to be fixed.
              </p>
              <Link href="/book-call" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '16px 36px',
                background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                color: '#FFFFFF', borderRadius: '100px',
                fontSize: '15px', fontWeight: 600,
                textDecoration: 'none', fontFamily: 'var(--font-body)',
                boxShadow: '0 4px 24px rgba(59,130,246,0.25)',
                transition: 'opacity 0.2s, transform 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                Get Free Business Audit
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '12px',
                color: 'var(--t4)', marginTop: '16px',
              }}>No commitment. Delivered within 24 hours.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: '100px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <Reveal>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '13px',
              color: 'var(--t4)', marginBottom: '16px',
            }}>
              Not sure which tier is right for you?
            </p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: 400, lineHeight: 1.1,
              letterSpacing: '-1.5px', color: 'var(--t1)',
              margin: '0 0 20px',
            }}>
              Let's Figure It Out Together
            </h2>
            <p style={{
              fontSize: '17px', color: 'var(--t3)',
              fontFamily: 'var(--font-body)', lineHeight: 1.6, margin: '0 0 36px',
            }}>
              Book a 30-minute strategy call. I'll ask the right questions,
              understand your business, and recommend the exact system that fits.
            </p>
            <Link href="/book-call"
              style={btnPrimary}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)'; e.currentTarget.style.boxShadow = '0 10px 36px rgba(59,130,246,0.35)' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 0 0 rgba(59,130,246,0)' }}
            >
              <MeetIcon /> Book a Strategy Call
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </Reveal>
        </div>
      </section>

    </div>
  )
}
