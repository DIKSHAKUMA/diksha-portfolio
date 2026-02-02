import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { nextTick } from 'vue' // Add this import

export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.server) return

  gsap.registerPlugin(ScrollTrigger)
  ScrollTrigger.config({ ignoreMobileResize: true })

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

  const lenis = new Lenis({
    autoRaf: false,
    syncTouch: true,
    touchMultiplier: isMobile ? 1 : 1.2,
    wheelMultiplier: 1,
    duration: isMobile ? 1.4 : 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
  })

  // 2. Sync
  lenis.on('scroll', ScrollTrigger.update)

  // 3. Unified Animation Loop (HMR Safe)
  const rafUpdate = (time: number) => lenis.raf(time * 1000)
  gsap.ticker.remove(rafUpdate) // Prevents double-tickers on hot-reload
  gsap.ticker.add(rafUpdate)
  gsap.ticker.lagSmoothing(0)

  // 4. Nuxt Lifecycle Hook: Handle route changes
  nuxtApp.hook('page:finish', async () => {
    await nextTick() // Wait for Vue to update the DOM

    // Use requestAnimationFrame to wait for the browser to paint
    requestAnimationFrame(() => {
      lenis.scrollTo(0, { immediate: true })
      ScrollTrigger.refresh()
      lenis.resize()
    })
  })

  return {
    provide: {
      lenis,
    },
  }
})
