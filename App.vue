<script setup lang="ts">
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { useHomeStore } from './store/useHomeStore'
import { useLayoutStore } from './store/useLayoutStore'

// PINIA 🍍 
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const isMounted = ref<boolean>(false)
const store1 = useHomeStore()
const store2 = useLayoutStore()

onMounted(() => {
    isMounted.value = true
})
</script>

<template>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
</template>

<style lang="scss">
html,
body {
    background-color: $primary;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-font-smoothing: antialiased;
    -o-font-smoothing: antialiased;
    font-family: $sans-text;
    margin: 0;
    padding: 0;
}

.html {
    /* Adjust font size */
    -webkit-text-size-adjust: 100%;
    /* Font varient */
    font-variant-ligatures: none;
    -webkit-font-variant-ligatures: none;
    /* Smoothing */
    text-rendering: optimizeLegibility;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
}

body {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
}
</style>