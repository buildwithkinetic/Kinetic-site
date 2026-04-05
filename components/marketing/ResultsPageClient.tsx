'use client'
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

const metrics = [
  { value: '1,200+', label: 'Users reached via organic growth' },
  { value: '#1', label: 'Google ranking for primary keyword' },
  { value: '60s', label: 'Lead acknowledgement via automation' },
  { value: '90-day', label: 'From brief to fully operational' },
]

export default function ResultsPageClient() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* HERO */}
      <section style={{ padding: '160px 24px 80px', maxWidth: '900px', margin: '0 auto' }}>
        <Reveal>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '11px',
            letterSpacing: '3px', textTransform: 'uppercase',
            color: 'var(--t4)', marginBottom: '24px',
          }}>Results</p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px, 6vw, 72px)',
            fontWeight: 400, lineHeight: 1.05,
            letterSpacing: '-2px', color: 'var(--t1)',
            margin: '0 0 24px',
          }}>
            Systems That<br/>
            <span style={{
              backgroundImage: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Produce Results</span>
          </h1>
          <p style={{
            fontSize: '18px', color: 'var(--t3)', lineHeight: 1.6,
            fontFamily: 'var(--font-body)', maxWidth: '520px', margin: 0,
          }}>
            Real numbers from real clients. No fabricated metrics.
            No stock photo testimonials.
          </p>
        </Reveal>
      </section>

      {/* CASE STUDY — SHEKNOWMICS */}
      <section style={{ padding: '0 24px 80px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <Reveal>
            <div style={{
              padding: '48px',
              background: '#111111',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '24px',
              overflow: 'hidden',
              position: 'relative',
            }}>
              {/* Glow */}
              <div style={{
                position: 'absolute', top: 0, right: 0,
                width: '300px', height: '300px',
                background: 'radial-gradient(ellipse at top right, rgba(59,130,246,0.08), transparent 70%)',
                pointerEvents: 'none',
              }} />

              <div style={{ marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <span style={{
                    padding: '4px 12px',
                    background: 'rgba(59,130,246,0.1)',
                    border: '1px solid rgba(59,130,246,0.2)',
                    borderRadius: '100px',
                    fontFamily: 'var(--font-body)', fontSize: '12px',
                    color: '#3B82F6',
                  }}>Case Study</span>
                  <span style={{
                    fontFamily: 'var(--font-body)', fontSize: '12px',
                    color: 'var(--t4)',
                  }}>Women's Health Platform · India</span>
                </div>
                <h2 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(24px, 4vw, 40px)',
                  fontWeight: 400, letterSpacing: '-1px',
                  color: 'var(--t1)', margin: '0 0 8px',
                }}>Sheknowmics</h2>
                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: '15px',
                  color: 'var(--t3)', margin: 0,
                }}>
                  Women's health & hormone-testing platform built for scale
                </p>
              </div>

              {/* Problem / System / Results */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '32px', marginBottom: '40px',
              }}>
                <div>
                  <p style={{
                    fontFamily: 'var(--font-body)', fontSize: '11px',
                    letterSpacing: '2px', textTransform: 'uppercase',
                    color: 'var(--t4)', marginBottom: '12px',
                  }}>The Problem</p>
                  <p style={{
                    fontFamily: 'var(--font-body)', fontSize: '14px',
                    color: 'var(--t3)', lineHeight: 1.6, margin: 0,
                  }}>
                    No digital presence. Potential users couldn't find the service.
                    Lead capture was entirely manual and inconsistent.
                  </p>
                </div>
                <div>
                  <p style={{
                    fontFamily: 'var(--font-body)', fontSize: '11px',
                    letterSpacing: '2px', textTransform: 'uppercase',
                    color: 'var(--t4)', marginBottom: '12px',
                  }}>The System Built</p>
                  <div style={{ display: 'grid', gap: '6px' }}>
                    {['Conversion-focused website', 'SEO & Google visibility', 'Lead capture automation', 'CRM integration', 'Email follow-up sequences'].map(item => (
                      <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#3B82F6', flexShrink: 0 }} />
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--t2)' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                gap: '24px',
                padding: '32px',
                background: 'var(--bg)',
                borderRadius: '16px',
                marginBottom: '32px',
              }}>
                {metrics.map(m => (
                  <div key={m.value}>
                    <p style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(28px, 4vw, 44px)',
                      fontWeight: 400, margin: '0 0 4px',
                      backgroundImage: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}>{m.value}</p>
                    <p style={{
                      fontFamily: 'var(--font-body)', fontSize: '13px',
                      color: 'var(--t3)', margin: 0, lineHeight: 1.4,
                    }}>{m.label}</p>
                  </div>
                ))}
              </div>

              {/* Testimonial */}
              <div style={{
                padding: '24px',
                borderLeft: '2px solid #3B82F6',
              }}>
                <p style={{
                  fontFamily: 'var(--font-display)', fontSize: '18px',
                  fontStyle: 'italic', color: 'var(--t2)',
                  lineHeight: 1.5, margin: '0 0 12px',
                }}>
                  "Kinetic built the entire system — website, lead capture, automations — and handed it over running.
                  We started getting consistent enquiries within weeks."
                </p>
                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: '13px',
                  color: 'var(--t4)', margin: 0,
                }}>— Sheknowmics Founder</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* MINI CASE STUDY CARDS */}
      <section style={{ padding: '0 24px 80px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px',
          }}>
            {[
              {
                client: 'E-commerce Store',
                location: 'India',
                metric1: { value: '3x', label: 'Increase in qualified leads' },
                metric2: { value: '18 days', label: 'System fully live' },
                quote: 'The automated follow-up alone recovered leads we would have completely lost.',
                color: '#3B82F6',
              },
              {
                client: 'Professional Services Firm',
                location: 'Kolkata',
                metric1: { value: 'Zero', label: 'Leads missed after install' },
                metric2: { value: '4 weeks', label: 'Full system operational' },
                quote: 'We went from zero tracking to full visibility on every enquiry.',
                color: '#6366F1',
              },
              {
                client: 'Health & Wellness Brand',
                location: 'India',
                metric1: { value: '#2', label: 'Google rank, primary keyword' },
                metric2: { value: '60 days', label: 'SEO results visible' },
                quote: 'Organic enquiries started coming in consistently within 2 months.',
                color: '#8B5CF6',
              },
            ].map(card => (
              <Reveal key={card.client}>
                <div style={{
                  padding: '28px',
                  background: '#111111',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '16px',
                  display: 'flex', flexDirection: 'column', height: '100%',
                }}>
                  <div style={{ marginBottom: '20px' }}>
                    <p style={{
                      fontFamily: 'var(--font-body)', fontSize: '11px',
                      letterSpacing: '2px', textTransform: 'uppercase',
                      color: 'var(--t4)', margin: '0 0 4px',
                    }}>{card.client}</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--t4)', margin: 0 }}>{card.location}</p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                    {[card.metric1, card.metric2].map(m => (
                      <div key={m.label}>
                        <p style={{
                          fontFamily: 'var(--font-body)', fontSize: '22px', fontWeight: 600,
                          color: card.color, margin: '0 0 2px',
                        }}>{m.value}</p>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--t3)', lineHeight: 1.4, margin: 0 }}>{m.label}</p>
                      </div>
                    ))}
                  </div>

                  <div style={{ borderLeft: `2px solid ${card.color}`, paddingLeft: '14px', marginTop: 'auto' }}>
                    <p style={{
                      fontFamily: 'var(--font-display)', fontSize: '14px',
                      fontStyle: 'italic', color: 'var(--t2)',
                      lineHeight: 1.5, margin: 0,
                    }}>&ldquo;{card.quote}&rdquo;</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '12px',
            color: 'var(--t4)', fontStyle: 'italic',
            textAlign: 'center', marginTop: '24px',
          }}>
            *Representative results from recent projects. Full case studies in progress.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#111111', padding: '100px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <Reveal>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 400, lineHeight: 1.1,
              letterSpacing: '-1.5px', color: 'var(--t1)',
              margin: '0 0 20px',
            }}>
              Your Business Could Be<br/>
              <span style={{
                backgroundImage: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>The Next Case Study</span>
            </h2>
            <p style={{
              fontSize: '17px', color: 'var(--t3)',
              fontFamily: 'var(--font-body)', lineHeight: 1.6, margin: '0 0 36px',
            }}>
              Book a 30-minute call. I'll show you exactly what a system built for
              your business would look like.
            </p>
            <Link href="https://cal.com/ayush-gupta-xpzedb/free-business-audit-kinetic"
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
