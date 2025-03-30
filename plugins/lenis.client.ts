import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'
export default defineNuxtPlugin((nuxtApp) => {

    console.log("OOPS")
    const lenis = new Lenis({
        autoRaf: true,
    });

    return {
        provide: {
            lenis
        }
    }
})