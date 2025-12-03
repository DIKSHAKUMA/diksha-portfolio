import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default defineNuxtPlugin((nuxtApp) => {
    // Detect iOS for ScrollTrigger compatibility
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    
    const lenis = new Lenis({
        autoRaf: true,
        // Revert to default multipliers for proper scroll distance
        touchMultiplier: 1,
        wheelMultiplier: 1,
    });

    // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
    lenis.on('scroll', ScrollTrigger.update);

    // Add refresh method to recalculate scroll bounds
    const refreshLenis = () => {
        // Wait for DOM to settle, then refresh
        requestAnimationFrame(() => {
            lenis.resize()
        })
    }

    // Extend lenis with refresh method
    ;(lenis as any).refresh = refreshLenis

    return {
        provide: {
            lenis
        }
    }
})