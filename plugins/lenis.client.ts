import Lenis from 'lenis';

export default defineNuxtPlugin((nuxtApp) => {
    // Detect iOS for ScrollTrigger compatibility
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    
    const lenis = new Lenis({
        autoRaf: true,
        // Revert to default multipliers for proper scroll distance
        touchMultiplier: 2,
        wheelMultiplier: 1,
    });

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