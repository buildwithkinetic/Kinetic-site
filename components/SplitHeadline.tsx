'use client'
import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { gsap } from '@/lib/gsap'

interface SplitHeadlineProps {
  lines: { text: string; orange?: boolean }[]
  className?: string
}

export default function SplitHeadline({ lines, className = '' }: SplitHeadlineProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!ref.current || reduced) return

    const words = ref.current.querySelectorAll('.word-inner')

    gsap.fromTo(
      words,
      { y: '105%', opacity: 0 },
      {
        y: '0%',
        opacity: 1,
        duration: 0.9,
        ease: 'power4.out',
        stagger: 0.06,
        delay: 0.2,
      }
    )
  }, [reduced])

  return (
    <div ref={ref} className={className}>
      {lines.map((line, li) => (
        <div key={li} style={{ lineHeight: 1.05 }}>
          {line.text.split(' ').map((word, wi) => (
            <span
              key={wi}
              style={{
                display: 'inline-block',
                overflow: 'hidden',
                marginRight: '0.25em',
                verticalAlign: 'top',
              }}
            >
              <span
                className="word-inner"
                style={{
                  display: 'inline-block',
                  color: line.orange ? 'var(--orange)' : 'var(--t1)',
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(44px, 5.5vw, 82px)',
                  fontWeight: 400,
                  letterSpacing: '-2px',
                }}
              >
                {word}
              </span>
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}
