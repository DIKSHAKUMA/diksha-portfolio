import { defineStore } from 'pinia';

const _data = ref()
const _error = ref()

export const useFolioStore = defineStore('folio', {
    state: () => ({
        data: _data,
        error: _error,
    }),
    
    persist:true,

    actions: {
        async fetchData() {
            const { data, error, } = await useAsyncGql({
                operation: 'folio',
            })
            _data.value = data
            _error.value = error

            if (error.value) {
                console.log("store error:", error.value)
            }
        }
    }
});