'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function GetStartedSection() {
  return (
    <section
      id="get-started"
      style={{
        backgroundColor: 'var(--background)',
        borderTop: '1px solid var(--border-default)',
        padding: 'clamp(100px, 12vw, 160px) clamp(24px, 8vw, 80px)',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '24px' }}
        >
          GET STARTED
        </motion.p>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.05, margin: '0 0 16px' }}
        >
          Your leads are going cold right now.
        </motion.h2>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          style={{ fontFamily: 'var(--font-sans)', fontSize: '1.125rem', color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto 48px', lineHeight: 1.6 }}
        >
          Every day without a system is a day of lost revenue. The audit is free. 24-hour turnaround.
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}
        >
          {/* Google Meet logo */}
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/9/9b/Google_Meet_icon_%282020%29.svg"
            alt="Google Meet"
            width={40}
            height={40}
            unoptimized={true}
            style={{ display: 'inline-block', verticalAlign: 'middle' }}
          />

          {/* Button */}
          <motion.a
            href="https://cal.com/ayush-gupta-kinetic/discovery"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -4, scale: 1.03, boxShadow: '0 20px 40px rgba(255,255,255,0.15)' }}
            whileTap={{ y: -1, scale: 0.99 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'inline-block',
              background: '#ffffff',
              color: '#000000',
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              fontWeight: 600,
              padding: '16px 40px',
              borderRadius: '4px',
              border: 'none',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            Book a Call
          </motion.a>
        </motion.div>

        {/* Email */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          whileHover={{ color: '#ffffff', letterSpacing: '0.05em' }}
          style={{
            fontFamily: 'Inter, var(--font-sans)',
            fontSize: '0.875rem',
            color: '#64748b',
            marginTop: '20px',
            cursor: 'default',
            display: 'inline-block',
          }}
        >
          admin@buildwithkinetic.org
        </motion.p>
      </div>
    </section>
  )
}
