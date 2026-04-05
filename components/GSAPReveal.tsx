'use client'
import { useEffect, useRef, ReactNode } from 'react'
import { useReducedMotion } from 'framer-motion'
import { gsap, ScrollTrigger } from '@/lib/gsap'

interface GSAPRevealProps {
  children: ReactNode
  delay?: number
  from?: 'bottom' | 'left' | 'scale'
  className?: string
}

export default function GSAPReveal({
  children,
  delay = 0,
  from = 'bottom',
  className = '',
}: GSAPRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!ref.current || reduced) return

    const fromVars: gsap.TweenVars =
      from === 'bottom' ? { y: 28, opacity: 0 } :
      from === 'left'   ? { x: -28, opacity: 0 } :
                          { scale: 0.95, opacity: 0 }

    const toVars: gsap.TweenVars = {
      y: 0, x: 0, scale: 1, opacity: 1,
      duration: 0.7,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current, fromVars, toVars)
    })

    return () => {
      ctx.revert()
    }
  }, [delay, from, reduced])

  return <div ref={ref} className={className}>{children}</div>
}
