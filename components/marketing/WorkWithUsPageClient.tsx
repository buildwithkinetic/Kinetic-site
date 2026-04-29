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
    name: 'Website & Visibility',
    tagline: "Get found. Convert visitors into leads.",
    priceLabel: 'Starting from',
    price: '₹25,000',
    timeline: 'Live in 2 weeks',
    what: 'A conversion-focused website built to rank on Google and capture leads from day one. Fast delivery, clean code, full handover — no templates, no drag-and-drop.',
    includes: [
      'Conversion-focused website (Next.js)',
      'On-page SEO foundation',
      'Lead capture forms + CRM logging',
      'Google Analytics + Core Web Vitals optimised',
      'Full handover with CMS access and documentation',
    ],
    guarantee: "If you don't appear on the first page of Google for your primary keyword in 30 days, we keep working at no extra charge.",
    badge: null,
    color: '#3B82F6',
  },
  {
    num: 'Tier 2',
    name: 'AI-Driven Marketing',
    tagline: "Build a marketing system that runs itself.",
    priceLabel: 'Starting from',
    price: '₹45,000',
    timeline: 'Live in 2–3 weeks',
    what: 'AI-powered SEO, automated content pipelines, email sequences, and performance dashboards — built on real data, running continuously without manual effort.',
    includes: [
      'SEO system with AI content pipeline',
      'Automated email sequences (lead nurture)',
      'Paid ads setup — Google + Meta',
      'Full attribution dashboard',
      'Monthly performance reporting',
    ],
    guarantee: "If the system doesn't generate measurable lead growth within 90 days, we rebuild and optimise it free.",
    badge: 'Most Popular',
    color: '#10B981',
  },
  {
    num: 'Tier 3',
    name: 'AI Agents & Automation',
    tagline: "Eliminate manual work. Let AI handle operations.",
    priceLabel: 'Starting from',
    price: '₹75,000',
    timeline: 'Live in 2–3 weeks',
    what: 'Custom AI agents and automation workflows wired into your business stack — lead qualification, follow-ups, proposal generation, and internal operations on autopilot.',
    includes: [
      'Custom AI agent (OpenAI / Claude)',
      'Lead qualification + scoring workflows',
      'n8n automation pipelines',
      'CRM + WhatsApp / email integration',
      '60-day post-launch support',
    ],
    guarantee: "If the agent fails to perform its core function within 60 days, we rebuild it free.",
    badge: 'Best Value',
    color: '#8B5CF6',
  },
  {
    num: 'Tier 4',
    name: 'Mobile App (Android)',
    tagline: "Ship a production-grade Android app your users will keep.",
    priceLabel: 'Starting from',
    price: '₹1,00,000',
    timeline: 'Live in 4–6 weeks',
    what: 'Native Android application — designed, built, and shipped to the Play Store. Full source code handover with documentation and a deployment pipeline you own.',
    includes: [
      'Native Android app (Kotlin / React Native)',
      'Backend API + authentication',
      'Play Store deployment',
      'Full source code + documentation handover',
      'Post-launch iteration support',
    ],
    guarantee: "We deliver a working, deployed application or we keep building.",
    badge: null,
    color: '#A855F7',
  },
  {
    num: 'Tier 5',
    name: 'Full-Stack Product',
    tagline: "Website, marketing, AI, and app — one integrated build.",
    priceLabel: 'Custom pricing',
    price: 'Scoped per project',
    timeline: 'Scoped per project',
    what: 'The complete Kinetic stack — web product or SaaS, AI agents, marketing automation, and analytics — built as one integrated system and handed over running.',
    includes: [
      'Full-stack web app or SaaS (Next.js + Supabase)',
      'AI agents for lead qualification and ops',
      'AI-driven marketing system',
      'Android app if required',
      'Dedicated build + support for 90 days post-launch',
    ],
    guarantee: "90-day performance guarantee — if the system doesn't generate measurable revenue growth, we keep working until it does.",
    badge: 'New',
    color: '#10B981',
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
            Choose What<br/>
            <span style={{
              backgroundImage: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>We Build Together</span>
          </h1>
          <p style={{
            fontSize: '18px', color: 'var(--t3)', lineHeight: 1.6,
            fontFamily: 'var(--font-body)', maxWidth: '560px', margin: 0,
          }}>
            Websites, marketing systems, AI agents, or full product builds —
            pick the capability you need, and we ship it.
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
                  { title: 'Startup founders', desc: "You've validated the business. Now you need the digital infrastructure to acquire customers at scale." },
                  { title: 'Funded companies', desc: 'You have budget and timelines. You need execution — clean code, real products, shipped without drama.' },
                  { title: 'Businesses ready to automate', desc: "Manual follow-ups, no visibility, leads falling through the cracks — you know there's a better way." },
                  { title: 'Builders who want to own their stack', desc: "Full source code, full documentation, full handover. No lock-in, no ongoing dependency on us." },
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
                  { title: 'People looking for the cheapest option', desc: "Quality products require investment. If you're comparing purely on price, we're probably not a fit." },
                  { title: 'Businesses unwilling to track results', desc: "If you don't want to measure what's working, there's no point in building a system." },
                  { title: 'No clear business model', desc: "We can't build marketing or AI systems for a business that doesn't have a clear offer or target customer." },
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
            }}>What We Build</p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 400, letterSpacing: '-1.5px', color: 'var(--t1)',
              margin: '0 0 48px',
            }}>
              Pick a Capability. We Ship It.
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
                      background: `rgba(${tier.color === '#3B82F6' ? '59,130,246' : tier.color === '#8B5CF6' ? '139,92,246' : tier.color === '#10B981' ? '16,185,129' : '168,85,247'}, 0.15)`,
                      border: `1px solid rgba(${tier.color === '#3B82F6' ? '59,130,246' : tier.color === '#8B5CF6' ? '139,92,246' : tier.color === '#10B981' ? '16,185,129' : '168,85,247'}, 0.3)`,
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
                    {tier.num !== 'Tier 5' && (
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
                    Get This Built →
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
                We'll audit your entire online presence and identify exactly
                where you're losing leads, what's broken, and what needs to be fixed.
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
              Let&apos;s Figure It Out Together
            </h2>
            <p style={{
              fontSize: '17px', color: 'var(--t3)',
              fontFamily: 'var(--font-body)', lineHeight: 1.6, margin: '0 0 36px',
            }}>
              Book a 30-minute strategy call. We'll ask the right questions,
              understand your business, and recommend the exact build that fits.
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
