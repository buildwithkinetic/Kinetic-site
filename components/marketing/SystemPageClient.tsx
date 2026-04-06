'use client'
import Link from 'next/link'
import Reveal from '@/components/Reveal'

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
const btnSecondary: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center',
  padding: '14px 28px',
  background: 'transparent', color: 'var(--t2)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: '100px', fontSize: '15px', fontWeight: 500,
  textDecoration: 'none', fontFamily: 'var(--font-body)',
  cursor: 'pointer', transition: 'border-color 0.2s, color 0.2s, transform 0.2s',
}
const MeetIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M15 9.5V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2.5l4 3V6.5l-4 3Z"/>
  </svg>
)

const layers = [
  {
    num: '01',
    title: 'Acquisition Layer',
    subtitle: 'How leads find you',
    desc: 'Google Ads, Meta Ads, and SEO working in parallel. Paid channels fill the funnel immediately. SEO builds compounding organic traffic over time. Both feed the same system.',
    components: ['Google Search Ads', 'Meta (Facebook/Instagram) Ads', 'Technical SEO', 'Google Business Profile', 'Local Search Optimization'],
    color: '#3B82F6',
  },
  {
    num: '02',
    title: 'Conversion Layer',
    subtitle: 'How visitors become leads',
    desc: 'A high-performance website built with one goal: turn qualified visitors into leads. Every page, every headline, every CTA is engineered for conversion — not aesthetics.',
    components: ['Conversion-Optimized Website', 'Landing Pages', 'Lead Capture Forms', 'Call Booking Integration', 'Mobile-First Design'],
    color: '#6366F1',
  },
  {
    num: '03',
    title: 'Management Layer',
    subtitle: 'How you track every lead',
    desc: 'A custom CRM dashboard built on Supabase. Every lead is logged, scored, and visible. Pipeline stages, activity history, conversation threads — all in one place.',
    components: ['Custom CRM Dashboard', 'Lead Pipeline (Kanban)', 'Lead Scoring', 'Activity Logging', 'Real-Time Notifications'],
    color: '#8B5CF6',
  },
  {
    num: '04',
    title: 'Automation Layer',
    subtitle: 'How follow-ups happen without you',
    desc: 'n8n workflows that trigger the moment a lead enters the system. Instant acknowledgement. Scheduled follow-ups. WhatsApp and email sequences. Zero manual effort.',
    components: ['Instant Lead Acknowledgement', 'WhatsApp Follow-Up Sequences', 'Email Drip Campaigns', 'Lead Routing Rules', 'Booking Confirmations'],
    color: '#A855F7',
  },
  {
    num: '05',
    title: 'Retention Layer',
    subtitle: 'How customers come back',
    desc: 'Automated review requests, re-engagement campaigns, and loyalty flows. Your existing customers are your cheapest leads — this layer turns them into repeat revenue.',
    components: ['Google Review Automation', 'Re-Engagement Campaigns', 'Customer Retention Flows', 'Referral Prompts', 'Upsell Sequences'],
    color: '#C026D3',
  },
]

export default function SystemPageClient() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* HERO */}
      <section style={{
        padding: '160px 24px 80px',
        maxWidth: '900px', margin: '0 auto',
      }}>
        <Reveal>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '11px',
            letterSpacing: '3px', textTransform: 'uppercase',
            color: 'var(--t4)', marginBottom: '24px',
          }}>The Growth System</p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px, 6vw, 72px)',
            fontWeight: 400, lineHeight: 1.05,
            letterSpacing: '-2px', color: 'var(--t1)',
            margin: '0 0 24px',
          }}>
            The System Behind<br/>
            <span style={{
              backgroundImage: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Predictable Growth</span>
          </h1>
          <p style={{
            fontSize: '18px', color: 'var(--t3)', lineHeight: 1.6,
            fontFamily: 'var(--font-body)', maxWidth: '560px', margin: '0 0 40px',
          }}>
            Five interconnected layers. Each one solves a specific problem.
            Together they create a business that generates, captures, and converts
            leads without depending on you.
          </p>
        </Reveal>

        {/* Flow */}
        <Reveal>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            flexWrap: 'wrap', padding: '20px 24px',
            background: '#111111',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '12px',
            fontFamily: 'var(--font-body)', fontSize: '12px',
          }}>
            {['Ads / SEO', 'Website', 'Lead Captured', 'CRM', 'Automation', 'Conversion'].map((step, i, arr) => (
              <span key={step} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: i < 2 ? '#3B82F6' : i > 3 ? '#8B5CF6' : 'var(--t2)' }}>{step}</span>
                {i < arr.length - 1 && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--t4)', opacity: 0.4, flexShrink: 0 }}>
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                )}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* LAYERS */}
      <section style={{ padding: '0 24px 120px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gap: '24px' }}>
          {layers.map((layer) => (
            <Reveal key={layer.num}>
              <div style={{
                padding: '40px 48px',
                background: '#111111',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '20px',
                borderLeft: `4px solid ${layer.color}`,
              }}>
                <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: '280px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                      <span style={{
                        fontFamily: 'var(--font-mono)', fontSize: '11px',
                        color: layer.color, letterSpacing: '2px',
                      }}>{layer.num}</span>
                      <span style={{
                        fontFamily: 'var(--font-body)', fontSize: '12px',
                        color: 'var(--t4)',
                      }}>{layer.subtitle}</span>
                    </div>
                    <h2 style={{
                      fontFamily: 'var(--font-body)', fontSize: '22px',
                      fontWeight: 600, color: 'var(--t1)',
                      margin: '0 0 16px',
                    }}>{layer.title}</h2>
                    <p style={{
                      fontFamily: 'var(--font-body)', fontSize: '15px',
                      color: 'var(--t3)', lineHeight: 1.6, margin: 0,
                    }}>{layer.desc}</p>
                  </div>
                  <div style={{ minWidth: '200px' }}>
                    <p style={{
                      fontFamily: 'var(--font-body)', fontSize: '11px',
                      color: 'var(--t4)', letterSpacing: '2px',
                      textTransform: 'uppercase', marginBottom: '12px',
                    }}>Components</p>
                    {layer.components.map(c => (
                      <div key={c} style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        marginBottom: '8px',
                      }}>
                        <div style={{
                          width: '6px', height: '6px', borderRadius: '50%',
                          background: layer.color, flexShrink: 0, opacity: 0.7,
                        }} />
                        <span style={{
                          fontFamily: 'var(--font-body)', fontSize: '13px',
                          color: 'var(--t2)',
                        }}>{c}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{
        background: '#111111', padding: '100px 24px', textAlign: 'center',
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
              Ready to Install This<br/>
              <span style={{
                backgroundImage: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>In Your Business?</span>
            </h2>
            <p style={{
              fontSize: '17px', color: 'var(--t3)',
              fontFamily: 'var(--font-body)', lineHeight: 1.6,
              margin: '0 0 36px',
            }}>
              Book a 30-minute strategy call. I'll map out your growth system
              and show you exactly what we'd build.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
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
              <Link href="/work-with-us"
                style={btnSecondary}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(59,130,246,0.4)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'var(--t2)'; e.currentTarget.style.transform = 'none' }}
              >
                See System Tiers
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  )
}
