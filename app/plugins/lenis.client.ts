import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default defineNuxtPlugin((nuxtApp) => {
  // Guard for SSR
  if (import.meta.server) return

  gsap.registerPlugin(ScrollTrigger)

  // 1. Force GSAP to ignore viewport height changes (prevents address bar jumps)
  ScrollTrigger.config({ ignoreMobileResize: true })

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

  const lenis = new Lenis({
    autoRaf: false, // Managed by GSAP Ticker

    // 2026 Optimization: syncTouch is required for Chrome address bar fix,
    // but we use 1.0 multiplier to prevent the "slippery/too fast" feeling.
    syncTouch: true,
    touchMultiplier: isMobile ? 1 : 1.2,
    wheelMultiplier: 1,

    // Increase duration slightly for mobile to simulate inertia lost by syncTouch
    duration: isMobile ? 1.4 : 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),

    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
  })

  // 2. Sync ScrollTrigger with Lenis
  lenis.on('scroll', ScrollTrigger.update)

  // 3. Unified Animation Loop using GSAP Ticker
  // This ensures your OpenToWork badge and scroll are perfectly in sync
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })

  // Set lagSmoothing to 0 to prevent "jumps" after heavy tab inactivity
  gsap.ticker.lagSmoothing(0)

  // 4. Nuxt Lifecycle Hook: Handle route changes
  nuxtApp.hook('page:finish', () => {
    // Reset scroll to top on new page
    lenis.scrollTo(0, { immediate: true })

    // Delay refresh to ensure DOM is fully painted
    setTimeout(() => {
      ScrollTrigger.refresh()
      lenis.resize()
    }, 150)
  })

  // 5. Clean up on plugin destruction (good practice)
  onUnmounted(() => {
    lenis.destroy()
    gsap.ticker.remove(lenis.raf)
  })

  return {
    provide: {
      lenis,
    },
  }
})
