'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: 'How is this different from hiring a freelancer or agency?',
    answer: "Most freelancers build one thing and hand it over. Most agencies charge for activity, not results. Kinetic builds a complete system — website, CRM, automations, acquisition — and delivers it running. You're not buying a deliverable. You're buying infrastructure that generates leads.",
  },
  {
    question: 'Do I need to know anything technical?',
    answer: "No. You bring your business knowledge — who you serve, what you offer, what you want. I handle everything technical end to end. What I need from you: content, decisions, and feedback on time.",
  },
  {
    question: "What if it doesn't work?",
    answer: "Every tier comes with a real guarantee. Tier 3 clients see measurable lead growth in 90 days — or I keep working until they do. These aren't marketing promises. They're commitments I take seriously before I agree to a project.",
  },
  {
    question: 'How long does it take?',
    answer: 'Tier 1 goes live in 2 weeks. Tier 2 in 2–3 weeks. Tier 3 in 4 weeks. Tier 4 is scoped individually. Timelines hold when clients provide content and decisions on schedule.',
  },
  {
    question: 'Who is this not for?',
    answer: "Businesses looking for the cheapest option. Businesses that want to micromanage every design decision. Businesses not ready to move fast. Kinetic works best when the founder is bought in, responsive, and ready to invest in something that compounds.",
  },
  {
    question: 'Do you work with businesses outside India?',
    answer: 'The system works anywhere. Most current clients are India-based, but the infrastructure — Next.js, Supabase, n8n, Google and Meta Ads — is built for any market.',
  },
]

function FAQRow({ item, index }: { item: FAQItem; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.06 }}
      className={`faq-card${open ? ' faq-open' : ''}`}
      style={{
        backgroundColor: 'var(--card-bg)',
        border: `1px solid ${open ? 'rgba(255,255,255,0.15)' : 'var(--border-default)'}`,
        borderRadius: '12px',
        marginBottom: '12px',
        overflow: 'hidden',
        transition: 'border-color 300ms cubic-bezier(0.16,1,0.3,1), transform 300ms cubic-bezier(0.16,1,0.3,1), box-shadow 300ms cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      {/* Question row */}
      <button
        onClick={() => setOpen((p) => !p)}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '24px 28px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          gap: '16px',
        }}
      >
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', fontWeight: 500, color: 'var(--text-primary)', lineHeight: 1.5 }}>
          {item.question}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '1.125rem',
            color: open ? 'var(--text-primary)' : 'var(--text-muted)',
            flexShrink: 0,
            transition: 'transform 300ms ease, color 300ms ease',
            display: 'inline-block',
            transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
          }}
        >
          →
        </span>
      </button>

      {/* Answer */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div
              style={{
                padding: '0 28px 24px',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                paddingTop: '16px',
              }}
            >
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQSection() {
  return (
    <section
      id="faq"
      style={{
        backgroundColor: 'var(--background)',
        borderTop: '1px solid var(--border-default)',
        padding: 'clamp(80px, 10vw, 120px) clamp(24px, 8vw, 80px)',
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 'clamp(48px, 6vw, 64px)' }}
        >
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-secondary)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px' }}>
            FAQ
          </p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.1, margin: 0 }}>
            Common questions.
          </h2>
        </motion.div>

        {/* FAQ items */}
        <div>
          {faqs.map((item, index) => (
            <FAQRow key={item.question} item={item} index={index} />
          ))}
        </div>
      </div>

      <style>{`
        .faq-card:not(.faq-open):hover {
          transform: translateY(-4px) scale(1.01);
          border-color: rgba(255,255,255,0.15) !important;
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }
      `}</style>
    </section>
  )
}
