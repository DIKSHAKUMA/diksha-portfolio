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

    return {
        provide: {
            lenis
        }
    }
})