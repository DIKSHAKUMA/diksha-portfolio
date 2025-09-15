import { useTransitionStore } from "~/store/useTransitionStore"
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default defineNuxtRouteMiddleware((to, from) => {
    const store = useTransitionStore()
    const { $gsap } = useNuxtApp()

    if (import.meta.server || useNuxtApp().isHydrating) return

    // Cache DOM queries for performance
    const blinds = $gsap.utils.toArray('.venice__blind')
    const veniceEl = document.querySelector('.venice')

    from.meta.pageTransition.onLeave = (el, done) => {

        store.isTransitionFinished = false
        store.isTransitionStarted = false
        store.isTransitionStarted = true
        store.stopLenis()

        let tl = $gsap.timeline({
            onComplete() {
                $gsap.set('.venice__blind', {
                    clearProps: 'all'
                })

                ScrollTrigger.getAll().filter(st => {
                    if (st.trigger && st.trigger.closest(`.${from.name as String}`)) {
                        st.kill()
                    }
                })
                done()
            }
        })

        // Optimized with cached elements
        tl.set(veniceEl, { opacity: 1, visibility: 'visible', force3D: true })
        tl.fromTo(blinds, { scaleX: 0, opacity: 0 }, { duration: .2, scaleX: 1.1, opacity: 1, stagger: .05, transformOrigin: "0% 50%", force3D: true, ease: "power2.out" })
    }

    to.meta.pageTransition.onBeforeEnter = (el, done) => {
        $gsap.set(blinds, { scaleX: 0, opacity: 0, force3D: true })
    }

    to.meta.pageTransition.onEnter = (el, done) => {

        let tl = $gsap.timeline({
            onComplete() {
                $gsap.set(blinds, {
                    clearProps: 'transform,opacity'
                })

                $gsap.set(veniceEl, { opacity: 0, visibility: 'hidden' })

                store.isTransitionFinished = true
                store.isTransitionStarted = false
                store.startLenis()
                done()
            }
        })

        tl.fromTo(blinds, { scaleX: 1.1, opacity: 1 }, { duration: .2, scaleX: 0, opacity: 0, stagger: .05, transformOrigin: "0% 50%", force3D: true, ease: "power2.out" })
    }
})