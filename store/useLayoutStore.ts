import { defineStore } from 'pinia';

const _data = ref()
const _error = ref()

export const useLayoutStore = defineStore('layout', {
    state: () => ({
        data: _data,
        error: _error,
    }),

    persist: true,

    actions: {
        async fetchData() {
            const { data, error } = await useAsyncGql({
                operation: 'layout',
            })
            
            _data.value = data
            _error.value = error

            if (error.value) {
                console.log("store error:", error.value)
            }
        },
    },
});