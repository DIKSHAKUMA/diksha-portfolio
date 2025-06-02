import { useTransitionStore } from "~/store/useTransitionStore"
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default defineNuxtRouteMiddleware((to, from) => {
    const store = useTransitionStore()
    const { $gsap } = useNuxtApp()

    from.meta.pageTransition.onLeave = (el, done) => {

        store.isTransitionFinished = false
        store.isTransitionStarted = false
        store.isTransitionStarted = true
        store.stopLenis()

        let tl = $gsap.timeline({
            onComplete() {
                $gsap.set([
                    //select what to reset here
                ], {
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
        tl.set('.venice', { autoAlpha: 1 })
        tl.fromTo('.venice__blind', { scaleX: 0, autoAlpha: 0 }, { duration: .2, scaleX: 1.1, autoAlpha: 1, stagger: .05, transformOrigin: "0% 50%", roundProps:["opacity"] })
        console.log('onLeave')

    }

    to.meta.pageTransition.onBeforeEnter = (el, done) => {
        $gsap.set(".venice__blind", { scaleX: 0, opacity:0 })
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
        tl.fromTo('.venice__blind', { scaleX: 1.2, autoAlpha: 1 }, { duration: .2, scaleX: 0, autoAlpha: 0, stagger: .05, transformOrigin: "0% 50%" })
    }

})