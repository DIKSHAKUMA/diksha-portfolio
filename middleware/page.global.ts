import { useTransitionStore } from "~/store/useTransitionStore"
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default defineNuxtRouteMiddleware((to, from) => {
    // skip middleware on server
    if (import.meta.server) return

    if (useNuxtApp().isHydrating) return

    const store = useTransitionStore()
    const { $gsap } = useNuxtApp()

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

        tl.set('.venice', { autoAlpha: 1 })
        tl.fromTo('.venice__blind', { scaleX: 0 }, { duration: .2, scaleX: 1.1, stagger: .05, transformOrigin: "0% 50%" })
    }

    to.meta.pageTransition.onBeforeEnter = (el, done) => {
        $gsap.set(".venice__blind", { scaleX: 0 })
    }

    to.meta.pageTransition.onEnter = (el, done) => {
        let tl = $gsap.timeline({
            onComplete() {
                $gsap.set('.venice__blind', {
                    clearProps: 'all'
                })

                $gsap.set('.venice', { autoAlpha: 0 })

                store.isTransitionFinished = true
                store.isTransitionStarted = false
                store.startLenis()
                done()
            }
        })

        tl.fromTo('.venice__blind', { scaleX: 1.2 }, { duration: .2, scaleX: 0, stagger: .05, transformOrigin: "0% 50%" })
    }
})