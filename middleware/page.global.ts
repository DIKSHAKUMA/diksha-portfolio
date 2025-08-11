import { useTransitionStore } from "~/store/useTransitionStore"
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default defineNuxtRouteMiddleware((to, from) => {
    const store = useTransitionStore()
    const { $gsap } = useNuxtApp()

    if (import.meta.server || useNuxtApp().isHydrating) return

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

        // simple test
        tl.set('.venice', { autoAlpha: 1, force3D: true })
        tl.fromTo('.venice__blind', { scaleX: 0, autoAlpha: 0 }, { duration: .2, scaleX: 1.1, autoAlpha: 1, stagger: .05, transformOrigin: "0% 50%", roundProps: ["opacity"], force3D: true })
    }

    to.meta.pageTransition.onBeforeEnter = (el, done) => {
        $gsap.set(".venice__blind", { scaleX: 0, autoAlpha: 0, force3D: true })
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

        // simple test, for complex we need watchers for transitionState in relevant components
        tl.fromTo('.venice__blind', { scaleX: 1.2, autoAlpha: 1 }, { duration: .2, scaleX: 0, autoAlpha: 0, stagger: .05, transformOrigin: "0% 50%", force3D: true })
    }
})