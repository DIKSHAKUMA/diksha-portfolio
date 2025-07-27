<script setup lang="ts">
import { useFolioStore } from '~/store/useFolioStore'

// Pinia 🍍
const store = useFolioStore()
await callOnce('projects', () => store.fetchData())

const isLoaded = ref(false)
const { $gsap } = useNuxtApp()

onMounted(() => {
    isLoaded.value = true;
    $gsap.set(".venice__blind", { scaleX: 0 })
    $gsap.fromTo('.venice__blind', { scaleX: 1, autoAlpha: 1 }, { duration: .2, autoAlpha: 0, scaleX: 0, stagger: .05, transformOrigin: "0% 50%", onComplete: clearProps })
})

const clearProps = () => {
    $gsap.set('.venice__blind', {
        clearProps: 'scaleX, autoAlpha'
    })
    $gsap.set('.venice', { autoAlpha: 0 })
}
</script>

<template>
    <div class="venice">
        <div class="venice__blind"></div>
        <div class="venice__blind"></div>
        <div class="venice__blind"></div>
        <div class="venice__blind"></div>
        <div class="venice__blind"></div>
        <div class="venice__blind"></div>
        <div class="venice__blind"></div>
        <div class="venice__blind"></div>
        <div class="venice__blind"></div>
        <div class="venice__blind"></div>
        <div class="venice__blind"></div>
        <div class="venice__blind"></div>
        <div class="venice__blind"></div>
        <div class="venice__blind"></div>
        <div class="venice__blind"></div>
        <div class="venice__blind"></div>
        <div class="venice__blind"></div>
        <div class="venice__blind"></div>
        <div class="venice__blind"></div>
        <div class="venice__blind"></div>
    </div>
    <UINavBar />
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
    <CommonFooter />
</template>

<style lang="scss">
html,
body {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    transition: background-color 1s;
    background-color: $primary;
    -webkit-font-smoothing: antialiased;
    -moz-font-smoothing: antialiased;
    -o-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: $sans-text;
    font-variation-settings: "slnt" 0, "wght" 500;
    overscroll-behavior: none;
}

.html {
    -webkit-text-size-adjust: none;
    height: 100%;
    overflow-y: auto;
}

body {
    display: flex;
    flex-direction: column;
}

.venice {
    width: 100%;
    height: 100vh;
    position: fixed;
    z-index: 9999;
    pointer-events: none;
    background-repeat: no-repeat;
    background-position: center center;
    visibility: visible;
    overflow: hidden;

    &__blind {
        display: inline-block;
        position: relative;
        top: 0;
        overflow: hidden;
        width: 5%;
        height: 100vh;
        background-color: $secondary;
    }
}
</style>