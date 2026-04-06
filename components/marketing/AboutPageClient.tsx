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

const principles = [
  {
    title: 'Systems over campaigns',
    desc: 'A campaign runs for a few weeks. A system runs forever. I build infrastructure, not one-offs.',
  },
  {
    title: 'Measurement over assumption',
    desc: "If you can't measure it, you can't improve it. Every system I build has tracking built in from day one.",
  },
  {
    title: 'Outcomes over deliverables',
    desc: 'A website is not an outcome. Consistent inbound leads are. I stay focused on what actually matters.',
  },
  {
    title: 'Simplicity over complexity',
    desc: "The best system is the one that works reliably. I don't add complexity for its own sake.",
  },
]

export default function AboutPageClient() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* HERO */}
      <section style={{ padding: '160px 24px 80px', maxWidth: '900px', margin: '0 auto' }}>
        <Reveal>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '11px',
            letterSpacing: '3px', textTransform: 'uppercase',
            color: 'var(--t4)', marginBottom: '24px',
          }}>About Kinetic</p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px, 6vw, 72px)',
            fontWeight: 400, lineHeight: 1.05,
            letterSpacing: '-2px', color: 'var(--t1)',
            margin: '0 0 24px',
          }}>
            Built for Performance,<br/>
            <span style={{
              backgroundImage: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Not Vanity</span>
          </h1>
          <p style={{
            fontSize: '18px', color: 'var(--t3)', lineHeight: 1.6,
            fontFamily: 'var(--font-body)', maxWidth: '560px', margin: 0,
          }}>
            Most agencies build you a website and disappear.
            Most platforms give you a tool and leave you to figure it out.
            Kinetic does neither — I build the system, install it in your business, and make sure it runs.
          </p>
        </Reveal>
      </section>

      {/* WHY SYSTEMS */}
      <section style={{ background: '#111111', padding: '80px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <Reveal>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 400, lineHeight: 1.1,
              letterSpacing: '-1.5px', color: 'var(--t1)',
              margin: '0 0 24px',
            }}>Why Systems Matter</h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '40px',
              maxWidth: '700px',
            }}
            className="about-grid">
              <div>
                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: '11px',
                  letterSpacing: '2px', textTransform: 'uppercase',
                  color: 'rgba(239,68,68,0.7)', marginBottom: '12px',
                }}>Without a system</p>
                {['Revenue is unpredictable', 'Leads depend on referrals', 'Follow-ups are manual', 'No visibility into what works', 'Growth requires more of you'].map(p => (
                  <div key={p} style={{ display: 'flex', gap: '10px', marginBottom: '8px', alignItems: 'flex-start' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(239,68,68,0.5)', marginTop: '6px', flexShrink: 0 }} />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--t3)' }}>{p}</span>
                  </div>
                ))}
              </div>
              <div>
                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: '11px',
                  letterSpacing: '2px', textTransform: 'uppercase',
                  color: '#3B82F6', marginBottom: '12px',
                }}>With a system</p>
                {['Revenue is predictable', 'Leads come in consistently', 'Follow-ups are automatic', 'Full tracking and data', 'Growth scales independently'].map(p => (
                  <div key={p} style={{ display: 'flex', gap: '10px', marginBottom: '8px', alignItems: 'flex-start' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#3B82F6', marginTop: '6px', flexShrink: 0 }} />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--t2)' }}>{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
        <style>{`.about-grid { grid-template-columns: 1fr !important; } @media (min-width: 600px) { .about-grid { grid-template-columns: 1fr 1fr !important; } }`}</style>
      </section>

      {/* PRINCIPLES */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <Reveal>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '11px',
              letterSpacing: '3px', textTransform: 'uppercase',
              color: 'var(--t4)', marginBottom: '24px',
            }}>How I Work</p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 400, lineHeight: 1.1,
              letterSpacing: '-1.5px', color: 'var(--t1)',
              margin: '0 0 48px',
            }}>Four Principles</h2>
          </Reveal>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px',
          }}>
            {principles.map((p, i) => (
              <Reveal key={p.title}>
                <div style={{
                  padding: '28px',
                  background: '#111111',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '16px',
                }}>
                  <p style={{
                    fontFamily: 'var(--font-mono)', fontSize: '11px',
                    color: '#3B82F6', letterSpacing: '2px', marginBottom: '12px',
                  }}>0{i + 1}</p>
                  <h3 style={{
                    fontFamily: 'var(--font-body)', fontSize: '16px',
                    fontWeight: 600, color: 'var(--t1)', margin: '0 0 10px',
                  }}>{p.title}</h3>
                  <p style={{
                    fontFamily: 'var(--font-body)', fontSize: '14px',
                    color: 'var(--t3)', lineHeight: 1.5, margin: 0,
                  }}>{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section style={{ background: '#111111', padding: '80px 24px' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <Reveal>
            <div style={{
              display: 'flex', gap: '32px', alignItems: 'flex-start',
              flexWrap: 'wrap',
            }}>
              {/* Photo placeholder */}
              <div style={{
                width: '80px', height: '80px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden',
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/ayush.jpg" alt="Ayush Gupta" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { e.currentTarget.style.display = 'none' }} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: '11px',
                  letterSpacing: '2px', textTransform: 'uppercase',
                  color: 'var(--t4)', marginBottom: '8px',
                }}>The founder</p>
                <h2 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '32px', fontWeight: 400,
                  color: 'var(--t1)', margin: '0 0 4px', letterSpacing: '-1px',
                }}>Ayush Gupta</h2>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--t4)', margin: '0 0 20px' }}>
                  Growth Engineer · Kolkata, India
                </p>
                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: '15px',
                  color: 'var(--t3)', lineHeight: 1.6, margin: '0 0 20px',
                }}>
                  I started Kinetic because I kept seeing the same pattern: businesses with real potential
                  held back by the absence of reliable growth infrastructure. Not strategy problems.
                  Not product problems. System problems.
                </p>
                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: '15px',
                  color: 'var(--t3)', lineHeight: 1.6, margin: '0 0 24px',
                }}>
                  I build each system myself — end to end. That means one point of contact,
                  total accountability, and no account managers in between.
                </p>
                <a href="https://www.linkedin.com/in/21-ayushgupta" target="_blank" rel="noopener noreferrer" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  fontFamily: 'var(--font-body)', fontSize: '13px',
                  color: '#3B82F6', textDecoration: 'none',
                }}>
                  Connect on LinkedIn
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17 17 7M7 7h10v10"/>
                  </svg>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '100px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <Reveal>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 400, lineHeight: 1.1,
              letterSpacing: '-1.5px', color: 'var(--t1)',
              margin: '0 0 20px',
            }}>
              Ready to Build<br/>
              <span style={{
                backgroundImage: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Your Growth System?</span>
            </h2>
            <p style={{
              fontSize: '17px', color: 'var(--t3)',
              fontFamily: 'var(--font-body)', lineHeight: 1.6, margin: '0 0 36px',
            }}>
              Book a 30-minute strategy call. No pitch. Just a clear map of what a
              growth system would look like for your business.
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
