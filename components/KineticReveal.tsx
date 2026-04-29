'use client'
import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export default function KineticReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!ref.current || reduced) return

    const chars = ref.current.querySelectorAll('.kinetic-char')

    const ctx = gsap.context(() => {
      gsap.fromTo(
        chars,
        { y: 60, opacity: 0, scale: 0.7 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.04,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 70%',
          },
        }
      )
    })

    return () => ctx.revert()
  }, [reduced])

  return (
    <div ref={ref} style={{ display: 'flex', gap: '0.02em', overflow: 'hidden' }}>
      {'KINETIC'.split('').map((char, i) => (
        <span
          key={i}
          className="kinetic-char"
          style={{
            display: 'inline-block',
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(80px, 10vw, 160px)',
            fontWeight: 400,
            color: i % 2 === 0 ? 'var(--t1)' : 'var(--orange)',
            letterSpacing: '-4px',
            lineHeight: 0.95,
            fontStyle: i % 3 === 2 ? 'italic' : 'normal',
          }}
        >
          {char}
        </span>
      ))}
    </div>
  )
}
