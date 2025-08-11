<script setup lang="ts">
import { useFolioStore } from '~/store/useFolioStore'

// Pinia 🍍
const store = useFolioStore()
await callOnce('projects', () => store.fetchData())

const isLoaded = ref(false)
const { $gsap } = useNuxtApp()

onMounted(() => {
    isLoaded.value = true;
    const blinds = $gsap.utils.toArray('.venice__blind')
    $gsap.set(blinds, { scaleX: 0, force3D: true })
    $gsap.fromTo(blinds, 
        { scaleX: 1, opacity: 1, force3D: true }, 
        { 
            duration: .2, 
            opacity: 0, 
            scaleX: 0, 
            stagger: .05, 
            transformOrigin: "0% 50%", 
            force3D: true,
            ease: "power2.out",
            onComplete: clearProps 
        }
    )
})

const clearProps = () => {
    const blinds = $gsap.utils.toArray('.venice__blind')
    $gsap.set(blinds, {
        clearProps: 'transform,opacity'
    })
    $gsap.set('.venice', { visibility: 'hidden', opacity: 0 })
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
    display: flex;
    contain: layout style paint;
    will-change: opacity, visibility;
    transform: translateZ(0); // Force hardware acceleration
    backface-visibility: hidden;

    &__blind {
        position: relative;
        top: 0;
        overflow: hidden;
        flex: 1;
        height: 100vh;
        background-color: $secondary;
        margin-left: -1px;
        will-change: transform, opacity;
        transform: translateZ(0); // Force hardware acceleration
        backface-visibility: hidden;
        contain: layout style paint;
        
        &:first-child {
            margin-left: 0;
        }
    }
}
</style>