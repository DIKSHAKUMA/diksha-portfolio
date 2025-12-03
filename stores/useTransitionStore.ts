import { defineStore } from 'pinia'

export const useTransitionStore = defineStore('anim', {
    state: () => {
        return {
            isTransitionFinished: true,  /* Default to true for direct page visits */
            isTransitionStarted: false
        }
    },

    actions: {
        /* since we rely on `this`, we cannot use an arrow function */
        stopLenis() {
            const { $lenis } = useNuxtApp();
            $lenis.stop()
        },

        startLenis() {
            const { $lenis } = useNuxtApp();
            // Ensure DOM is ready before starting and refresh scroll bounds
            nextTick(() => {
                $lenis.start()
                // Refresh Lenis to recalculate scroll bounds after DOM changes
                if (($lenis as any).refresh) {
                    ($lenis as any).refresh()
                }
            })
        }
    }

})

