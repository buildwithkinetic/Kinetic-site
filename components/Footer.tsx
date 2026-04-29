'use client'
import React from 'react'
import Link from 'next/link'

interface FooterLink {
  label: string
  href: string
}

const footerLinks: Record<string, FooterLink[]> = {
  Services: [
    { label: 'Websites & Landing Pages', href: '/services' },
    { label: 'AI-Driven Marketing', href: '/services' },
    { label: 'AI Agents', href: '/services' },
    { label: 'Android Apps', href: '/services' },
    { label: 'Custom Software', href: '/services' },
  ],
  Solutions: [
    { label: 'Industry Systems', href: '/lead-generation-system' },
    { label: 'Startup Growth', href: '/work-with-us' },
    { label: 'Free Website Audit', href: '/free-website-audit' },
    { label: 'Work With Us', href: '/work-with-us' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Results', href: '/results' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
    { label: 'Free Website Audit', href: '/free-website-audit' },
  ],
}

export default function Footer() {
  return (
    <footer style={{
      background: '#0A0A0A',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      padding: '100px 24px 60px',
      color: 'rgba(255,255,255,0.4)',
      fontFamily: 'var(--font-body)',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '60px',
          marginBottom: '80px',
        }}>
          {/* Brand Column */}
          <div style={{ gridColumn: 'span 1' }}>
            <Link href="/" style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              textDecoration: 'none', marginBottom: '24px',
            }}>
              <span style={{
                fontWeight: 800, fontSize: '16px', letterSpacing: '3px',
                color: '#fff', textTransform: 'uppercase',
              }}>KINETIC</span>
              <span style={{
                width: '6px', height: '6px', borderRadius: '50%',
                background: '#3B82F6', boxShadow: '0 0 10px #3B82F6',
              }} />
            </Link>
            <p style={{ fontSize: '14px', lineHeight: 1.6, maxWidth: '240px' }}>
              Websites, AI-driven marketing, AI agents, and mobile apps — built to production standard and handed over running.
            </p>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, linksArray]) => (
            <div key={title}>
              <h4 style={{
                color: '#fff', fontSize: '13px', fontWeight: 600,
                letterSpacing: '1px', textTransform: 'uppercase',
                marginBottom: '24px',
              }}>{title}</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '12px' }}>
                {linksArray.map(link => (
                  <li key={link.label}>
                    <Link href={link.href} style={{
                      color: 'inherit', textDecoration: 'none', fontSize: '14px',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e: React.MouseEvent<HTMLElement>) => e.currentTarget.style.color = '#fff'}
                    onMouseLeave={(e: React.MouseEvent<HTMLElement>) => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
                    >{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          paddingTop: '40px', borderTop: '1px solid rgba(255,255,255,0.03)',
          flexWrap: 'wrap', gap: '24px',
        }}>
          <p style={{ fontSize: '12px', letterSpacing: '0.5px' }}>
            © {new Date().getFullYear()} KINETIC. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '32px', fontSize: '12px' }}>
            <Link href="/privacy" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</Link>
            <Link href="/terms" style={{ color: 'inherit', textDecoration: 'none' }}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
