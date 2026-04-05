'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import gsap from 'gsap'

const CAL_URL = 'https://cal.com/ayush-gupta-kinetic/discovery'
const SLIDE_COUNT = 3

interface Slide {
  id: number
  image?: string
  alt?: string
  overlay: string
  contentPosition: 'center' | 'bottom-left'
  headline: string
  headlineSize: string
  sub?: string
  isCtaSlide?: boolean
}

const slides: Slide[] = [
  {
    id: 0,
    image: '/hero-1.jpeg',
    alt: 'Dark network grid background',
    overlay: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)',
    contentPosition: 'center',
    headline: 'KINETIC',
    headlineSize: 'clamp(5rem, 15vw, 14rem)',
    sub: 'The System Behind Your Growth',
  },
  {
    id: 1,
    image: '/hero-2.jpeg',
    alt: 'Indian founder on WhatsApp with notebook',
    overlay: 'rgba(0,0,0,0.55)',
    contentPosition: 'bottom-left',
    headline: "You're managing leads on WhatsApp.",
    headlineSize: 'clamp(2.5rem, 6vw, 5rem)',
    sub: 'Manual. Slow. Broken.',
  },
  {
    id: 2,
    image: '/hero-3.png',
    alt: 'Indian founder at dual monitors',
    overlay: 'rgba(0,0,0,0.65)',
    contentPosition: 'bottom-left',
    headline: 'We replace the chaos with a system that runs.',
    headlineSize: 'clamp(2.5rem, 6vw, 5rem)',
    sub: 'Website. CRM. Automations. Acquisition. End to end.',
    isCtaSlide: true,
  },
]

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const slideEls = useRef<(HTMLDivElement | null)[]>([])
  const imgWrapEls = useRef<(HTMLDivElement | null)[]>([])
  const currentSlide = useRef(0)
  const [dotIndex, setDotIndex] = useState(0)

  // Initialize: slide 0 visible, rest hidden
  useEffect(() => {
    slides.forEach((_, i) => {
      const el = slideEls.current[i]
      if (!el) return
      gsap.set(el, { opacity: i === 0 ? 1 : 0, scale: 1, zIndex: i === 0 ? 2 : 0 })
    })
  }, [])

  const runTransition = useCallback((from: number, to: number) => {
    const incoming = slideEls.current[to]
    const outgoing = slideEls.current[from]
    const incomingImg = imgWrapEls.current[to]

    if (!incoming || !outgoing) return

    gsap.killTweensOf([incoming, outgoing])
    if (incomingImg) gsap.killTweensOf(incomingImg)

    // Incoming slide layers on top
    gsap.set(incoming, { zIndex: 10, scale: 1.06, opacity: 0 })
    gsap.set(outgoing, { zIndex: 5 })

    const tl = gsap.timeline({
      onComplete: () => {
        // Normalize all slides after transition
        slides.forEach((_, i) => {
          const el = slideEls.current[i]
          if (!el) return
          gsap.set(el, {
            zIndex: i === to ? 2 : 0,
            opacity: i === to ? 1 : 0,
            scale: 1,
          })
        })
      },
    })

    // Incoming: fade in + scale to 1 — ~500ms (35% faster than original 800ms)
    tl.to(incoming, { opacity: 1, scale: 1, duration: 0.52, ease: 'power3.out' })
    // Outgoing: fades out after incoming starts — creates the layer/overlap feel
    tl.to(outgoing, { opacity: 0, duration: 0.32, ease: 'power2.in' }, 0.18)

    // Background image parallax on incoming slide
    if (incomingImg) {
      gsap.fromTo(
        incomingImg,
        { scale: 1.1 },
        { scale: 1, duration: 0.75, ease: 'power3.out' }
      )
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current
      if (!section) return
      const relativeScroll = window.scrollY - section.offsetTop
      const newSlide = Math.max(
        0,
        Math.min(SLIDE_COUNT - 1, Math.floor(relativeScroll / window.innerHeight))
      )

      if (newSlide !== currentSlide.current) {
        const prev = currentSlide.current
        currentSlide.current = newSlide
        setDotIndex(newSlide)
        runTransition(prev, newSlide)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [runTransition])

  return (
    <section
      id="hero"
      ref={sectionRef}
      style={{ position: 'relative', height: `${SLIDE_COUNT * 100}vh` }}
    >
      {/* Sticky viewport */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            ref={el => { slideEls.current[index] = el }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              overflow: 'hidden',
              backgroundColor: '#000000',
              // GSAP controls opacity, scale, zIndex — no CSS transition
            }}
          >
            {/* Background image wrapper (GSAP parallax target) */}
            {slide.image && (
              <div
                ref={el => { imgWrapEls.current[index] = el }}
                style={{ position: 'absolute', inset: 0, zIndex: 0 }}
              >
                <Image
                  src={slide.image}
                  alt={slide.alt ?? ''}
                  fill
                  priority
                  unoptimized
                  style={{
                    objectFit: 'cover',
                    // Hero 3: zoom out ~10% to give bottom-right space for CTA
                    ...(index === 2 ? { transform: 'scale(0.9)', transformOrigin: 'center center' } : {}),
                  }}
                  sizes="100vw"
                />
              </div>
            )}

            {/* Overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: slide.overlay,
                zIndex: 1,
              }}
            />

            {/* Content */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: slide.contentPosition === 'center' ? 'center' : 'flex-end',
                alignItems: slide.contentPosition === 'center' ? 'center' : 'flex-start',
                padding:
                  slide.contentPosition === 'bottom-left'
                    ? 'clamp(40px, 8vw, 80px)'
                    : '0',
              }}
            >
              {/* Slide 0 — Brand intro */}
              {index === 0 && (
                <div style={{ textAlign: 'left' }}>
                  <p
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      color: 'var(--accent-green)',
                      letterSpacing: '0.15em',
                      marginBottom: '16px',
                    }}
                  >
                    DIGITAL GROWTH SYSTEMS
                  </p>
                  <h1
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 'clamp(5rem, 15vw, 14rem)',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      letterSpacing: '-0.03em',
                      lineHeight: 0.9,
                      margin: 0,
                    }}
                  >
                    KINETIC
                  </h1>
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'clamp(1rem, 2vw, 1.5rem)',
                      fontWeight: 400,
                      color: 'var(--text-secondary)',
                      marginTop: '16px',
                    }}
                  >
                    The System Behind Your Growth
                  </p>
                </div>
              )}

              {/* Slide 1 — Problem (label removed) */}
              {index === 1 && (
                <div style={{ maxWidth: '700px' }}>
                  <h2
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: slide.headlineSize,
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      lineHeight: 1.1,
                      margin: 0,
                    }}
                  >
                    {slide.headline}
                  </h2>
                  {slide.sub && (
                    <p
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 'clamp(1rem, 2vw, 1.5rem)',
                        color: 'var(--text-secondary)',
                        marginTop: '16px',
                      }}
                    >
                      {slide.sub}
                    </p>
                  )}
                </div>
              )}

              {/* Slide 2 — Solution + CTA bottom right (label removed) */}
              {index === 2 && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    width: '100%',
                    gap: 'clamp(24px, 4vw, 60px)',
                    flexWrap: 'wrap',
                  }}
                >
                  {/* Left: headline + sub */}
                  <div style={{ maxWidth: '560px', flex: '1 1 280px' }}>
                    <h2
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: slide.headlineSize,
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        lineHeight: 1.1,
                        margin: 0,
                      }}
                    >
                      {slide.headline}
                    </h2>
                    {slide.sub && (
                      <p
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: 'clamp(1rem, 2vw, 1.5rem)',
                          color: 'var(--text-secondary)',
                          marginTop: '16px',
                        }}
                      >
                        {slide.sub}
                      </p>
                    )}
                  </div>

                  {/* Right: CTA */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                      gap: '14px',
                      flex: '0 0 auto',
                    }}
                  >
                    <motion.a
                      href={CAL_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{
                        y: -4,
                        scale: 1.03,
                        boxShadow: '0 20px 40px rgba(255,255,255,0.2)',
                      }}
                      whileTap={{ y: -1, scale: 0.99 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '10px',
                        background: '#ffffff',
                        color: '#000000',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '1rem',
                        fontWeight: 600,
                        padding: '16px 40px',
                        borderRadius: '4px',
                        textDecoration: 'none',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {/* Google Meet icon */}
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/9/9b/Google_Meet_icon_%282020%29.svg"
                        alt=""
                        aria-hidden="true"
                        width={20}
                        height={20}
                        style={{ display: 'block', flexShrink: 0 }}
                      />
                      Book a Call
                    </motion.a>
                    <motion.p
                      whileHover={{ color: '#ffffff', letterSpacing: '0.05em' }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.875rem',
                        color: '#64748b',
                        cursor: 'default',
                        display: 'inline-block',
                        margin: 0,
                      }}
                    >
                      admin@buildwithkinetic.org
                    </motion.p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Slide indicator dots */}
        <div
          style={{
            position: 'absolute',
            bottom: '32px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '8px',
            zIndex: 10,
          }}
        >
          {slides.map((_, index) => (
            <div
              key={index}
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor:
                  index === dotIndex ? 'var(--text-primary)' : 'rgba(255,255,255,0.3)',
                transition: 'background-color 300ms ease',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
