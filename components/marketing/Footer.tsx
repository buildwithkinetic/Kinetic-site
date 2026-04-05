'use client'
import Link from 'next/link'

const nav = [
  {
    label: 'System',
    links: [
      { label: 'How It Works', href: '/lead-generation-system' },
      { label: 'Acquisition Layer', href: '/lead-generation-system#acquisition' },
      { label: 'Automation Layer', href: '/lead-generation-system#automation' },
    ],
  },
  {
    label: 'Company',
    links: [
      { label: 'Results', href: '/results' },
      { label: 'About', href: '/about' },
      { label: 'Work With Us', href: '/work-with-us' },
    ],
  },
  {
    label: 'Get Started',
    links: [
      { label: 'Book a Strategy Call', href: 'https://cal.com/ayush-gupta-xpzedb/free-business-audit-kinetic' },
      { label: 'Free Business Audit', href: '/work-with-us#free-audit' },
      { label: 'View System Tiers', href: '/work-with-us#tiers' },
    ],
  },
]

export function Footer() {
  return (
    <footer style={{
      background: '#050505',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '64px 24px 32px',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Top */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '48px', marginBottom: '64px',
        }}
        className="footer-grid">

          {/* Brand */}
          <div>
            <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 700, fontSize: '13px',
                letterSpacing: '2.5px', textTransform: 'uppercase',
                color: '#FFFFFF',
              }}>KINETIC</span>
              <span style={{
                width: '6px', height: '6px', borderRadius: '50%',
                background: '#3B82F6',
                boxShadow: '0 0 8px rgba(59,130,246,0.6)',
              }} />
            </Link>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '14px',
              color: 'var(--t4)', lineHeight: 1.6,
              maxWidth: '280px', margin: '0 0 20px',
            }}>
              Digital Growth Systems for small businesses and startups.
              Built and installed — not just designed and delivered.
            </p>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '12px',
              color: 'var(--t4)',
            }}>Kolkata, India</p>
          </div>

          {/* Nav columns */}
          {nav.map(col => (
            <div key={col.label}>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '11px',
                letterSpacing: '2px', textTransform: 'uppercase',
                color: 'var(--t4)', marginBottom: '16px',
              }}>{col.label}</p>
              {col.links.map(l => (
                <Link key={l.href} href={l.href} style={{
                  display: 'block',
                  fontFamily: 'var(--font-body)', fontSize: '14px',
                  color: 'var(--t3)', textDecoration: 'none',
                  marginBottom: '10px',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#FFFFFF' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--t3)' }}
                >{l.label}</Link>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '24px',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          flexWrap: 'wrap', gap: '12px',
        }}>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '12px',
            color: 'var(--t4)', margin: 0,
          }}>
            © {new Date().getFullYear()} Kinetic. All rights reserved.
          </p>
          <a href="mailto:hello@buildwithkinetic.org" style={{
            fontFamily: 'var(--font-body)', fontSize: '12px',
            color: 'var(--t4)', textDecoration: 'none',
          }}>hello@buildwithkinetic.org</a>
        </div>
      </div>

      <style>{`
        .footer-grid {
          grid-template-columns: 1fr !important;
        }
        @media (min-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (min-width: 900px) {
          .footer-grid {
            grid-template-columns: 2fr 1fr 1fr 1fr !important;
          }
        }
      `}</style>
    </footer>
  )
}
