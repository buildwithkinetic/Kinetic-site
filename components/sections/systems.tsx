'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface CardData {
  number: string
  title: string
  description: string
  image: string
  alt: string
  expandedDescription: string
  included: string[]
}

const cards: CardData[] = [
  {
    number: '01',
    title: 'Acquisition',
    description: 'Gets the right people finding your business.',
    image: '/system-1.jpeg',
    alt: 'Acquisition system',
    expandedDescription: 'Google Ads, Meta Ads, SEO, Google Business Profile, and local search optimisation. A complete inbound engine.',
    included: ['Google Ads', 'Meta Ads', 'SEO', 'GBP', 'Local Search'],
  },
  {
    number: '02',
    title: 'Conversion',
    description: 'Turns visitors into leads. Not a brochure — a lead capture machine.',
    image: '/system-2.jpeg',
    alt: 'Conversion system',
    expandedDescription: 'Conversion-focused website and dedicated landing pages built to capture enquiries, not just look good.',
    included: ['Conversion Website', 'Landing Pages', 'Lead Capture Forms', 'Mobile-First Build'],
  },
  {
    number: '03',
    title: 'Management',
    description: 'Every lead logged, tracked, and visible.',
    image: '/system-3.jpeg',
    alt: 'Management system',
    expandedDescription: 'Custom CRM dashboard built on Supabase. Pipeline stages, activity history, real-time notifications. No spreadsheets.',
    included: ['Custom CRM', 'Pipeline Tracking', 'Real-Time Notifications', 'Lead History'],
  },
  {
    number: '04',
    title: 'Automation',
    description: 'Zero manual effort from first touch to confirmed booking.',
    image: '/system-4.jpeg',
    alt: 'Automation system',
    expandedDescription: 'n8n workflows — instant lead acknowledgement, WhatsApp and email follow-up sequences, booking confirmations.',
    included: ['Instant Acknowledgement', 'Email Sequences', 'Booking Confirmations', 'WhatsApp Follow-Up'],
  },
  {
    number: '05',
    title: 'Retention',
    description: 'Your existing customers are your cheapest leads.',
    image: '/system-5.jpeg',
    alt: 'Retention system',
    expandedDescription: 'Google review automation, re-engagement campaigns, referral prompts, and upsell sequences.',
    included: ['Review Automation', 'Re-engagement', 'Referral Prompts', 'Upsell Sequences'],
  },
]

function SystemCard({ card, index }: { card: CardData; index: number }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
      onClick={() => setExpanded((prev) => !prev)}
      className="system-card"
      style={{
        backgroundColor: 'var(--card-bg)',
        border: expanded ? '1px solid rgba(255,255,255,0.2)' : '1px solid var(--border-default)',
        borderRadius: '16px',
        overflow: 'hidden',
        cursor: 'pointer',
        transform: expanded ? 'scale(1.05)' : undefined,
        boxShadow: expanded
          ? '0 0 0 2px rgba(255,255,255,0.3), 0 40px 80px rgba(0,0,0,0.6)'
          : undefined,
        transition: 'border-color 500ms cubic-bezier(0.16,1,0.3,1), box-shadow 500ms cubic-bezier(0.16,1,0.3,1), transform 500ms cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
        <Image
          src={card.image}
          alt={card.alt}
          fill={true}
          loading="lazy"
          unoptimized={true}
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Gradient fade to black */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, transparent 40%, #000000)',
          }}
        />
      </div>

      {/* Text */}
      <div style={{ padding: '24px' }}>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'var(--text-muted)',
            marginBottom: '8px',
          }}
        >
          {card.number}
        </p>
        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.25rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: '8px',
          }}
        >
          {card.title}
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.875rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          {card.description}
        </p>

        {/* Expanded content */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ paddingTop: '16px', borderTop: '1px solid var(--border-default)', marginTop: '16px' }}>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.875rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                    marginBottom: '16px',
                  }}
                >
                  {card.expandedDescription}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {card.included.map((item) => (
                    <li
                      key={item}
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.8125rem',
                        color: 'var(--text-secondary)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      <span style={{ color: 'var(--accent-green)', flexShrink: 0 }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default function SystemsSection() {
  return (
    <section
      id="systems"
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
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 'clamp(48px, 6vw, 72px)' }}
        >
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'var(--text-secondary)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            THE SYSTEM
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Five layers. One integrated system.
          </h2>
        </motion.div>

        {/* Cards grid — 2+2+1 layout */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
        >
          {/* Row 1 — 2 cards */}
          <div className="systems-row-2">
            {cards.slice(0, 2).map((card, i) => (
              <SystemCard key={card.number} card={card} index={i} />
            ))}
          </div>
          {/* Row 2 — 2 cards */}
          <div className="systems-row-2">
            {cards.slice(2, 4).map((card, i) => (
              <SystemCard key={card.number} card={card} index={i + 2} />
            ))}
          </div>
          {/* Row 3 — 1 card centered at 50% width */}
          <div className="systems-row-1">
            <SystemCard key={cards[4].number} card={cards[4]} index={4} />
          </div>
        </motion.div>
      </div>

      <style>{`
        .systems-row-2 {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
        }
        .systems-row-1 {
          display: flex;
          justify-content: center;
        }
        .systems-row-1 > * {
          width: 50%;
        }
        .system-card:not([style*="scale(1.05)"]):hover {
          transform: translateY(-8px) rotateX(4deg) scale(1.02) !important;
          border-color: rgba(255,255,255,0.2) !important;
          box-shadow: 0 30px 60px rgba(0,0,0,0.5) !important;
          background-color: var(--card-bg-hover) !important;
        }
        @media (max-width: 1024px) {
          .systems-row-2 {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .systems-row-1 > * {
            width: 50% !important;
          }
        }
        @media (max-width: 640px) {
          .systems-row-2 {
            grid-template-columns: 1fr !important;
          }
          .systems-row-1 > * {
            width: 100% !important;
          }
        }
      `}</style>
    </section>
  )
}
