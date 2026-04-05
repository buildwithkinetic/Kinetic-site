'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}
const transition = { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }

const workItems = [
  { label: 'No account managers.', desc: 'You work directly with me, start to finish.' },
  { label: 'No juniors.', desc: 'Every line of code, every automation, every ad — built by me.' },
  { label: 'No scope creep.', desc: 'Scope agreed before work starts. No surprise invoices.' },
  { label: 'No hidden fees.', desc: "What you're quoted is what you pay." },
  { label: 'Systems that compound.', desc: 'I build infrastructure that gets more valuable over time.' },
]

export default function AboutSection() {
  return (
    <section
      id="about"
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
          transition={transition}
          style={{ marginBottom: 'clamp(48px, 6vw, 72px)' }}
        >
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-secondary)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px' }}>
            THE BUILDER
          </p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.1, margin: 0 }}>
            Built by a growth engineer. Not an agency.
          </h2>
        </motion.div>

        {/* Two columns */}
        <div className="about-grid">
          {/* LEFT — founder photo */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            transition={{ ...transition, delay: 0 }}
            style={{ perspective: '1000px' }}
          >
            <div className="about-image-wrap">
              <Image
                src="/founder.jpg"
                alt="Ayush Gupta — Founder & Growth Engineer"
                width={600}
                height={600}
                loading="lazy"
                unoptimized={true}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '600px',
                  objectFit: 'cover',
                  objectPosition: 'top center',
                  borderRadius: '12px',
                  border: '1px solid var(--border-default)',
                  display: 'block',
                }}
              />
            </div>
          </motion.div>

          {/* RIGHT — text */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            transition={{ ...transition, delay: 0.15 }}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            {/* Name block */}
            <div style={{ marginBottom: '32px' }}>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 4px' }}>
                Ayush Gupta
              </p>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>
                Founder &amp; Growth Engineer · Kolkata, India
              </p>
            </div>

            {/* Intro */}
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '40px' }}>
              I&apos;m a full-stack engineer who got tired of watching good businesses bleed leads to broken websites and zero automation. So I stopped building things and started building systems.
            </p>

            {/* How I work */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {workItems.map((item) => (
                <div key={item.label} className="about-work-item">
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: '0.9375rem', fontWeight: 500, color: 'var(--text-primary)', flexShrink: 0 }}>
                    {item.label}
                  </span>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    {item.desc}
                  </span>
                </div>
              ))}
            </div>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/21-ayushgupta"
              target="_blank"
              rel="noopener noreferrer"
              className="about-linkedin"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.875rem',
                color: '#64748b',
                marginTop: '24px',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'color 200ms ease',
              }}
            >
              linkedin.com/in/21-ayushgupta
            </a>
          </motion.div>
        </div>
      </div>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(40px, 6vw, 80px);
          align-items: start;
        }
        .about-image-wrap {
          transition: transform 600ms cubic-bezier(0.16,1,0.3,1), box-shadow 600ms cubic-bezier(0.16,1,0.3,1);
          transform-style: preserve-3d;
          border-radius: 12px;
        }
        .about-image-wrap:hover {
          transform: rotateY(-8deg) rotateX(4deg) translateZ(20px) scale(1.02);
          box-shadow: 20px 20px 60px rgba(0,0,0,0.5);
        }
        .about-work-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 16px 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding-left: 0;
          border-left: 2px solid transparent;
          transition: background 300ms ease, transform 300ms ease, border-left-color 300ms ease, padding-left 300ms ease;
        }
        .about-work-item:hover {
          background: rgba(255,255,255,0.03);
          transform: translateX(8px);
          border-left-color: var(--text-primary);
          padding-left: 12px;
        }
        .about-linkedin:hover {
          color: var(--text-primary) !important;
        }
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
