import { useTransitionStore } from '../../stores/useTransitionStore'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Venice Blind transitions in Nuxt?
 * Si, es posible!
 */

export default defineNuxtRouteMiddleware((to, from) => {
  const store = useTransitionStore()
  const { $gsap } = useNuxtApp()

  if (import.meta.server || useNuxtApp().isHydrating) return

  /* Cache elements once */
  const veniceEl = document.querySelector('.venice') as HTMLElement
  /* Only animate visible blinds (exclude hidden mobile ones) */
  const allBlinds = document.querySelectorAll('.venice__blind')
  const blinds = Array.from(allBlinds).filter((blind) => {
    const computedStyle = window.getComputedStyle(blind)
    return computedStyle.display !== 'none'
  })

  /* Ensure pageTransition objects exist and are not just boolean true */
  if (!from.meta.pageTransition || from.meta.pageTransition === true) {
    from.meta.pageTransition = {}
  }
  if (!to.meta.pageTransition || to.meta.pageTransition === true) {
    to.meta.pageTransition = {}
  }

  from.meta.pageTransition.onLeave = (el: Element, done: () => void) => {
    store.isTransitionFinished = false
    store.isTransitionStarted = false
    store.isTransitionStarted = true
    store.stopLenis()

    let tl = $gsap.timeline({
      onComplete() {
        $gsap.set('.venice__blind', {
          clearProps: 'all',
        })

        ScrollTrigger.getAll().filter((st) => {
          if (st.trigger && st.trigger.closest(`.${from.name as String}`)) {
            st.kill()
          }
        })
        done()
      },
    })

    /* Optimized with cached elements */
    tl.set(veniceEl, { opacity: 1, visibility: 'visible', force3D: true })
    /* Venetian blind scale effect */
    tl.fromTo(
      blinds,
      { scaleX: 0, opacity: 0 },
      {
        duration: 1,
        scaleX: 1,
        opacity: 1,
        transformOrigin: 'left center',
        stagger: 0.05,
      }
    )
  }

  to.meta.pageTransition.onBeforeEnter = (el: Element) => {
    $gsap.set(blinds, { scaleX: 0, opacity: 0 })
  }

  to.meta.pageTransition.onEnter = (el: Element, done: () => void) => {
    let tl = $gsap.timeline({
      onComplete() {
        $gsap.set(blinds, {
          clearProps: 'transform,opacity',
        })

        $gsap.set(veniceEl, { opacity: 0, visibility: 'hidden' })

        store.isTransitionFinished = true
        store.isTransitionStarted = false
        store.startLenis()
        done()
      },
    })

    /* Venetian blind scale exit */
    tl.fromTo(
      blinds,
      { scaleX: 1, opacity: 1 },
      {
        duration: 1,
        scaleX: 0,
        opacity: 0,
        transformOrigin: 'left center',
        stagger: 0.05,
      }
    )
  }
})
