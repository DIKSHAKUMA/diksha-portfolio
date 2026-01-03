import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.server) return // Guard for SSR

  gsap.registerPlugin(ScrollTrigger)

  // 1. Configure GSAP to ignore the iOS address bar resize
  ScrollTrigger.config({ ignoreMobileResize: true })

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  const lenis = new Lenis({
    // Disable autoRaf so we can sync it perfectly with GSAP
    autoRaf: false,
    touchMultiplier: 1.2,
    wheelMultiplier: 1,
    syncTouch: true, // Fixes the iOS direction-change jump

    duration: isMobile ? 1 : 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
  })

  // 2. Synchronize ScrollTrigger with Lenis
  lenis.on('scroll', ScrollTrigger.update)

  // 3. Use GSAP's ticker for a single, unified animation loop
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)

  // 4. Handle Nuxt-specific lifecycle (Route changes)
  // This prevents "jumps" when navigating between pages
  nuxtApp.hook('page:finish', () => {
    lenis.scrollTo(0, { immediate: true })
    setTimeout(() => {
      ScrollTrigger.refresh()
      lenis.resize()
    }, 100) // Small delay to ensure DOM is rendered
  })

  return {
    provide: {
      lenis,
    },
  }
})
