'use client'
import { useEffect, ReactNode } from 'react'
import Lenis from 'lenis'
import { initGSAP, gsap, ScrollTrigger } from '@/lib/gsap-init'

export default function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    initGSAP()

    const lenis = new Lenis({
      lerp: 0.07,
      smoothWheel: true,
      syncTouch: false,
    })

    // CRITICAL: sync Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', () => ScrollTrigger.update())

    // Drive Lenis via GSAP ticker
    const gsapTicker = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(gsapTicker)
    gsap.ticker.lagSmoothing(0)

    // Refresh ScrollTrigger after Lenis is ready
    setTimeout(() => ScrollTrigger.refresh(), 100)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(gsapTicker)
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return <>{children}</>
}
