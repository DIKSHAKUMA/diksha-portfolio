<script setup lang="ts">
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useFolioStore } from '~/store/useFolioStore'
import * as PIXI from 'pixi.js'

// PINIA 🍍 
const store = useFolioStore()
const { $gsap } = useNuxtApp()
const colorMode = useColorMode()

let ctx: gsap.Context

onMounted(() => {

    if (import.meta.client) {

        ctx = $gsap.context((self) => {

            // Pin the hero section, slide ViewHeroAbout on top, yaman
            ScrollTrigger.create({
                trigger: '.hero-wrapper',
                start: 'top top',
                endTrigger: '.about-wrapper',
                end: 'top 5%',
                pin: true,
                pinSpacing: false,
                anticipatePin: 1
            });
        })

    }
})
</script>

<template>
    <div>
        <main ref="main" class="hero-wrapper">
            <AnimP5Rings />
            <CommonAbstract class="front-header" :label="store.data.about?.aboutHeroTitle" :delay="1.5" :desc="''"
                :className="'front-intro'" :is-hero="true" />
        </main>
    </div>
</template>

<style lang="scss" scoped>
:deep(.abstract-wrapper) {
    position: absolute;
    bottom: 0;
    margin-bottom: 0;
}

.hero-wrapper {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    padding: 0 $px-16-spacer;

    @include this-and-above('lg') {
        padding: 0 $px-64-spacer;
    }
}
</style>