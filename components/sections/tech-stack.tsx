'use client'

import { useRef, type JSX } from 'react'
import Image from 'next/image'
import { motion, useAnimation } from 'framer-motion'

const FigmaLogo = () => (
  <svg width="48" height="48" viewBox="0 0 38 57" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE"/>
    <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-19 0z" fill="#0ACF83"/>
    <path d="M19 0v19h9.5a9.5 9.5 0 0 0 0-19H19z" fill="#FF7262"/>
    <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E"/>
    <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF"/>
  </svg>
)

type TechItem =
  | { name: string; type: 'img'; src: string; filter?: string }
  | { name: string; type: 'svg'; Logo: () => JSX.Element }

const techItems: TechItem[] = [
  { name: 'Next.js', type: 'img', src: 'https://cdn.simpleicons.org/nextdotjs/ffffff' },
  { name: 'Tailwind CSS', type: 'img', src: 'https://cdn.worldvectorlogo.com/logos/tailwindcss.svg' },
  { name: 'n8n', type: 'img', src: 'https://cdn.simpleicons.org/n8n/ffffff' },
  { name: 'Claude', type: 'img', src: 'https://cdn.simpleicons.org/anthropic/ffffff' },
  { name: 'Figma', type: 'svg', Logo: FigmaLogo },
]

function TechCard({ item, index }: { item: TechItem; index: number }) {
  const controls = useAnimation()
  const isFlipping = useRef(false)

  const handleFlip = async () => {
    if (isFlipping.current) return
    isFlipping.current = true
    await controls.start({ rotateY: 180, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } })
    await controls.start({ rotateY: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } })
    isFlipping.current = false
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: index * 0.07 }}
      style={{ width: '100%', perspective: '800px' }}
    >
      <motion.div
        animate={controls}
        whileHover={{
          y: -8,
          rotateX: 8,
          scale: 1.05,
          borderColor: 'rgba(255,255,255,0.2)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
          backgroundColor: 'var(--card-bg-hover)',
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onClick={handleFlip}
        title={item.name}
        style={{
          aspectRatio: '1',
          backgroundColor: 'var(--card-bg)',
          border: '1px solid var(--border-default)',
          borderRadius: '12px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          cursor: 'pointer',
          transformStyle: 'preserve-3d',
        }}
      >
        {item.type === 'img' ? (
          <Image
            src={item.src}
            alt={item.name}
            width={48}
            height={48}
            unoptimized={true}
            style={{
              width: '48px',
              height: '48px',
              objectFit: 'contain',
              filter: item.filter,
            }}
          />
        ) : (
          <item.Logo />
        )}
        <span style={{ fontFamily: 'Inter, var(--font-sans)', fontSize: '0.75rem', color: '#64748b', textAlign: 'center', marginTop: '8px', display: 'block' }}>
          {item.name}
        </span>
      </motion.div>
    </motion.div>
  )
}

export default function TechStackSection() {
  return (
    <section
      id="tech"
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
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-secondary)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px' }}>
            THE STACK
          </p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.1, margin: 0 }}>
            What I build with.
          </h2>
        </motion.div>

        {/* Logo grid — 5 col desktop, 3 tablet, 2 mobile */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="tech-grid"
        >
          {techItems.map((item, index) => (
            <TechCard key={item.name} item={item} index={index} />
          ))}
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.875rem',
            color: 'var(--text-muted)',
            textAlign: 'center',
            marginTop: '48px',
          }}
        >
          Sub-2s load times. TypeScript throughout. Accessibility by default. 100 Lighthouse score on every delivered project.
        </motion.p>
      </div>

      <style>{`
        .tech-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 24px;
          justify-items: center;
        }
        @media (max-width: 1024px) {
          .tech-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 640px) {
          .tech-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </section>
  )
}
