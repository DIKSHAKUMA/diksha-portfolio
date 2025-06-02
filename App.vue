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
onMounted(() => {
    isLoaded.value = true
})

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
    visibility: hidden;
    pointer-events: none;

    &__blind {
        display: inline-block;
        position: relative;
        top: 0;
        overflow: hidden;
        width: 5%;
        height: 100vh;
        will-change: transform;
        background-color: $secondary;
    }
}
</style>