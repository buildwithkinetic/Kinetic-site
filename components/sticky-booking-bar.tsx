'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'

export default function StickyBookingBar() {
  const barRef = useRef<HTMLDivElement>(null)
  const pillRef = useRef<HTMLDivElement>(null)
  const isVisible = useRef(false)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    gsap.set(bar, { y: -80, opacity: 0, pointerEvents: 'none' })

    const hero = document.getElementById('hero')
    const getStarted = document.getElementById('get-started')
    if (!hero) return

    const showBar = () => {
      if (isVisible.current) return
      isVisible.current = true
      gsap.to(bar, { y: 0, opacity: 1, duration: 0.52, ease: 'power3.out', pointerEvents: 'auto' })
    }

    const hideBar = (slideRight = false) => {
      if (!isVisible.current) return
      isVisible.current = false

      if (slideRight && pillRef.current) {
        gsap.to(pillRef.current, { x: 300, opacity: 0, duration: 0.38, ease: 'power2.in' })
      }

      gsap.to(bar, {
        y: -80,
        opacity: 0,
        duration: 0.42,
        ease: 'power2.in',
        delay: slideRight ? 0.08 : 0,
        onComplete: () => {
          gsap.set(bar, { pointerEvents: 'none' })
          if (slideRight && pillRef.current) {
            gsap.set(pillRef.current, { x: 0, opacity: 1 })
          }
        },
      })
    }

    const heroObserver = new IntersectionObserver(
      ([entry]) => { if (!entry.isIntersecting) showBar(); else hideBar() },
      { threshold: 0 }
    )
    heroObserver.observe(hero)

    let gsObserver: IntersectionObserver | null = null
    if (getStarted) {
      gsObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) hideBar(true)
          else { const r = hero.getBoundingClientRect(); if (r.bottom < 0) showBar() }
        },
        { threshold: 0 }
      )
      gsObserver.observe(getStarted)
    }

    return () => { heroObserver.disconnect(); gsObserver?.disconnect() }
  }, [])

  return (
    <div
      ref={barRef}
      role="status"
      aria-label="Currently booking — April 2026"
      style={{ position: 'fixed', top: '24px', right: '24px', zIndex: 9999 }}
    >
      <motion.div
        ref={pillRef}
        whileHover={{
          y: -3,
          scale: 1.03,
          boxShadow: '0 8px 20px rgba(0,200,83,0.4), 0 4px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
        }}
        whileTap={{ y: -1, scale: 0.99 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: '#00C853',
          borderRadius: '9999px',
          padding: '8px 18px',
          cursor: 'default',
          boxShadow: '0 4px 6px rgba(0,0,0,0.3), 0 1px 3px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.2)',
        }}
      >
        <span
          className="animate-pulse-dot"
          style={{
            display: 'inline-block',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: '#ffffff',
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: '#ffffff',
            letterSpacing: '0.1em',
            whiteSpace: 'nowrap',
          }}
        >
          CURRENTLY BOOKING — APRIL 2026
        </span>
      </motion.div>
    </div>
  )
}
