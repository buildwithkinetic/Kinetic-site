'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'The System', href: '/lead-generation-system' },
  { label: 'Results', href: '/results' },
  { label: 'Work With Us', href: '/work-with-us' },
  { label: 'About', href: '/about' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const path = usePathname()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      {/* Floating pill nav */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        style={{
          position: 'fixed', top: '20px', left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '8px 8px 8px 20px',
          background: scrolled ? 'rgba(10,10,10,0.92)' : 'rgba(10,10,10,0.7)',
          backdropFilter: 'blur(24px) saturate(1.4)',
          WebkitBackdropFilter: 'blur(24px) saturate(1.4)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '100px',
          transition: 'background 0.3s ease',
          whiteSpace: 'nowrap',
        }}
        className="nav-pill"
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', marginRight: '8px' }}>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 700, fontSize: '13px',
            letterSpacing: '2.5px', textTransform: 'uppercase',
            color: '#FFFFFF',
          }}>KINETIC</span>
          <span style={{
            width: '6px', height: '6px', borderRadius: '50%',
            background: '#3B82F6', display: 'inline-block',
            boxShadow: '0 0 8px rgba(59,130,246,0.8)',
          }} />
        </Link>

        {/* Nav links — desktop */}
        <nav style={{ display: 'flex', gap: '4px' }} className="nav-links">
          {links.map(l => (
            <Link key={l.href} href={l.href} style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px', fontWeight: 400,
              color: path === l.href ? '#FFFFFF' : 'rgba(255,255,255,0.5)',
              textDecoration: 'none',
              padding: '7px 14px',
              borderRadius: '100px',
              background: path === l.href ? 'rgba(59,130,246,0.15)' : 'transparent',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              if (path !== l.href) {
                e.currentTarget.style.color = '#FFFFFF'
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
              }
            }}
            onMouseLeave={e => {
              if (path !== l.href) {
                e.currentTarget.style.color = 'rgba(255,255,255,0.5)'
                e.currentTarget.style.background = 'transparent'
              }
            }}
            >{l.label}</Link>
          ))}
        </nav>

        {/* CTA button */}
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }} className="nav-cta">
          <Link href="https://cal.com/ayush-gupta-xpzedb/free-business-audit-kinetic" style={{
            display: 'inline-flex', alignItems: 'center',
            padding: '9px 18px',
            background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)', color: '#FFFFFF',
            borderRadius: '100px', fontSize: '13px', fontWeight: 600,
            textDecoration: 'none', fontFamily: 'var(--font-body)',
            transition: 'opacity 0.2s ease',
            letterSpacing: '-0.1px',
          }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '0.9' }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
          >Book a Strategy Call</Link>
        </motion.div>

        {/* Mobile hamburger */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="nav-hamburger"
          aria-label="Toggle menu"
          style={{ background: 'none', border: 'none', padding: '8px', cursor: 'pointer',
            display: 'none', flexDirection: 'column', gap: '4px', marginLeft: '4px' }}>
          <motion.span animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 6 : 0 }}
            style={{ display: 'block', width: '18px', height: '1.5px', background: '#F0F0EE', borderRadius: '1px', transformOrigin: 'center' }}
            transition={{ duration: 0.2 }} />
          <motion.span animate={{ opacity: mobileOpen ? 0 : 1 }}
            style={{ display: 'block', width: '18px', height: '1.5px', background: '#F0F0EE', borderRadius: '1px' }}
            transition={{ duration: 0.2 }} />
          <motion.span animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -6 : 0 }}
            style={{ display: 'block', width: '18px', height: '1.5px', background: '#F0F0EE', borderRadius: '1px', transformOrigin: 'center' }}
            transition={{ duration: 0.2 }} />
        </button>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16,1,0.3,1] }}
            style={{
              position: 'fixed', top: '80px', left: '16px', right: '16px', zIndex: 999,
              background: 'rgba(10,10,10,0.97)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '20px', padding: '20px',
            }}
          >
            {links.map((l, i) => (
              <motion.div key={l.href} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                <Link href={l.href} onClick={() => setMobileOpen(false)} style={{
                  display: 'block', fontSize: '22px',
                  fontFamily: 'var(--font-display)', color: '#FFFFFF',
                  textDecoration: 'none', padding: '14px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                }}>{l.label}</Link>
              </motion.div>
            ))}
            <Link href="https://cal.com/ayush-gupta-xpzedb/free-business-audit-kinetic" onClick={() => setMobileOpen(false)} style={{
              display: 'inline-flex', marginTop: '16px', padding: '12px 24px',
              background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)', color: '#FFFFFF',
              borderRadius: '100px', fontSize: '14px', fontWeight: 600,
              textDecoration: 'none', fontFamily: 'var(--font-body)',
            }}>Book a Strategy Call</Link>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .nav-cta { display: none !important; }
          .nav-hamburger { display: flex !important; }
          .nav-pill { padding: 8px 8px 8px 16px !important; top: 12px !important; }
        }
        @media (max-width: 1000px) {
          .nav-links a[href="/lead-generation-system"] { display: none; }
        }
      `}</style>
    </>
  )
}
