'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

const transition = { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }

export default function ProblemSection() {
  return (
    <section
      id="problem"
      style={{
        backgroundColor: 'var(--background)',
        padding: 'clamp(80px, 10vw, 120px) clamp(24px, 8vw, 80px)',
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 'clamp(40px, 6vw, 80px)',
          alignItems: 'center',
        }}
        className="problem-grid"
      >
        {/* LEFT — image with CSS 3D hover */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          transition={{ ...transition, delay: 0 }}
          style={{ perspective: '1000px' }}
        >
          <div className="problem-image-wrap">
            <Image
              src="/problem.jpeg"
              alt="Overwhelmed founder at cluttered desk"
              width={700}
              height={600}
              loading="lazy"
              unoptimized={true}
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '600px',
                objectFit: 'cover',
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
          {/* Label */}
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'var(--text-secondary)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '24px',
            }}
          >
            THE PROBLEM
          </p>

          {/* Headline */}
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 600,
              color: 'var(--text-primary)',
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Most small businesses don&apos;t have a growth problem.
          </h2>

          {/* Sub-headline */}
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 600,
              color: 'var(--accent-green)',
              lineHeight: 1.1,
              margin: '0 0 32px',
            }}
          >
            They have a systems problem.
          </h2>

          {/* Body 1 */}
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              margin: 0,
            }}
          >
            You&apos;re following up on WhatsApp manually. Leads go cold because nobody responded in time. Your website looks fine but converts nothing.
          </p>

          {/* Divider */}
          <div style={{ height: '1px', backgroundColor: 'var(--border-default)', margin: '24px 0' }} />

          {/* Body 2 */}
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              color: 'var(--text-primary)',
              lineHeight: 1.8,
              margin: 0,
            }}
          >
            That&apos;s not a hustle problem. That&apos;s an infrastructure problem.
          </p>

          {/* Divider */}
          <div style={{ height: '1px', backgroundColor: 'var(--border-default)', margin: '24px 0' }} />

          {/* Body 3 */}
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              margin: 0,
            }}
          >
            Kinetic replaces the manual effort with a system that generates, captures, and converts leads automatically — and hands it over running.
          </p>
        </motion.div>
      </div>

      {/* CSS for 3D hover and responsive grid */}
      <style>{`
        .problem-image-wrap {
          transition: transform 600ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 600ms cubic-bezier(0.16, 1, 0.3, 1);
          transform-style: preserve-3d;
          border-radius: 12px;
        }
        .problem-image-wrap:hover {
          transform: rotateY(8deg) rotateX(4deg) translateZ(20px) scale(1.02);
          box-shadow: -20px 20px 60px rgba(0, 0, 0, 0.5);
        }
        @media (max-width: 768px) {
          .problem-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
