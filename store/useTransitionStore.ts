import { defineStore } from 'pinia'

export const useTransitionStore = defineStore('anim', {
    state: () => {
        return {
            isTransitionFinished: false,
            isTransitionStarted: false
        }
    },

    actions: {
        // since we rely on `this`, we cannot use an arrow function
        stopLenis() {
            const { $lenis } = useNuxtApp();
            $lenis.stop()
        },

        startLenis() {
            const { $lenis } = useNuxtApp();
            $lenis.start()
        }
    }

})

