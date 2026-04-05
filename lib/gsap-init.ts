import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let initialised = false

export function initGSAP() {
  if (typeof window === 'undefined' || initialised) return
  initialised = true
  gsap.registerPlugin(ScrollTrigger)
  ScrollTrigger.defaults({ markers: false })
}

export { gsap, ScrollTrigger }
