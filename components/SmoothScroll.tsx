'use client'
import { useEffect } from 'react'
import Lenis from 'lenis'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      syncTouch: false,
    })

    // Sync Lenis with GSAP ScrollTrigger if available
    const setupScrollTrigger = async () => {
      try {
        const { ScrollTrigger } = await import('gsap/ScrollTrigger')
        lenis.on('scroll', ScrollTrigger.update)
      } catch (e) {
        // ScrollTrigger not loaded yet, that's okay
      }
    }

    setupScrollTrigger()

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    ;(window as any).__lenis = lenis

    return () => {
      lenis.destroy()
      ;(window as any).__lenis = null
    }
  }, [])

  return <>{children}</>
}
