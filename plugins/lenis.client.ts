import Lenis from 'lenis';

export default defineNuxtPlugin((nuxtApp) => {
    const lenis = new Lenis({
        autoRaf: true,
    });
    
    console.log("lenis instance", lenis)
    return {
        provide: {
            lenis
        }
    }
})