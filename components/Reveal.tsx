'use client'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef, ReactNode } from 'react'
import { ease } from '@/lib/animations'

interface RevealProps {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'p' | 'h1' | 'h2' | 'h3' | 'span' | 'li'
  variant?: 'fadeUp' | 'fadeIn' | 'scaleIn'
}

export default function Reveal({
  children,
  delay = 0,
  y = 20,
  className = '',
  as = 'div',
  variant = 'fadeUp'
}: RevealProps) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const MotionTag = motion[as] as any

  let initialVars: any = { y, opacity: 0 }
  let animateVars: any = { y: 0, opacity: 1 }

  if (variant === 'fadeIn') {
    initialVars = { opacity: 0 }
    animateVars = { opacity: 1 }
  } else if (variant === 'scaleIn') {
    initialVars = { scale: 0.95, opacity: 0 }
    animateVars = { scale: 1, opacity: 1 }
  }

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial={reduced ? {} : initialVars}
      animate={inView ? animateVars : {}}
      transition={{ duration: 0.6, ease, delay }}
    >
      {children}
    </MotionTag>
  )
}
