<script setup lang="ts">
import { useHaikuStore } from '~/store/useHaikuStore';
import { useHomeStore } from '~/store/useHomeStore'

// Pinia 🍍
const store = useHomeStore()
await callOnce('home', () => store.fetchData())

const store2 = useHaikuStore();
await callOnce('haiku', () => store2.fetchData())

const isLoaded = ref(false)
const { $gsap } = useNuxtApp()

// we can use this later for landig hook animation
// TODO : need to plug in blend animation in on mounted stage

onMounted(() => {
    isLoaded.value = true;
    $gsap.set(".venice__blind", { scaleX: 0 })
    $gsap.fromTo('.venice__blind', { scaleX: 1, autoAlpha: 1 }, { duration: .2, autoAlpha: 0, scaleX: 0, stagger: .05, transformOrigin: "0% 50%", onComplete: clearProps })
})

const clearProps = () => {
    $gsap.set('.venice__blind', {
        clearProps: 'all'
    })
    $gsap.set('.venice', { autoAlpha: 0 })
}


const nuxtApp = useNuxtApp()
const loading = ref(false)



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
    background-color: $primary;
    -webkit-font-smoothing: antialiased;
    -moz-font-smoothing: antialiased;
    -o-font-smoothing: antialiased;
    font-family: $sans-text;
    margin: 0;
    padding: 0;
    min-height: 100vh;
    transition: background-color 1s;
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