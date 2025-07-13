<script setup lang="ts">
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'

const { $gsap } = useNuxtApp()

const scrambleChars = 'upperAndLowerCase'

onMounted(() => {
    $gsap.registerPlugin(ScrambleTextPlugin)

    const quotes = $gsap.utils.toArray<HTMLElement>('.quote')

    // Initialize all quotes
    quotes.forEach((quote, index) => {
        $gsap.set(quote, {
            position: 'absolute',
            opacity: 0,
            whiteSpace: 'nowrap',
            transform: 'translateY(0)',
            y: 0,
        })
    })

    // Create a master timeline for all animations
    const masterTimeline = $gsap.timeline({ repeat: -1, repeatDelay: 1 })

    // Add each quote to the timeline with proper delays
    quotes.forEach((quote, index) => {
        const text = quote.textContent || ''
        // Scramble in
        masterTimeline.to(quote, {
            duration: 1,
            opacity: 1,
            scrambleText: { text, chars: scrambleChars, revealDelay: 1, speed: 0.5},
            ease: 'power2.out',
        }, index * 3) // Start each word 3 seconds after the previous one

            // Scramble out
            .to(quote, {
                duration: 1,
                scrambleText: { text: '', chars: scrambleChars },
                opacity: 0,
                ease: 'power2.in',
            }, `+=2`) // Start 2 seconds after becoming visible
    })
})

onUnmounted(() => {
    $gsap.killTweensOf('.quote')
})
</script>

<template>
    <div class="tech-wrapper">
        <div class="text">
            <span class="quote">Nuxt / Vue</span>
            <span class="quote">TypeScript</span>
            <span class="quote">GraphQL</span>
            <span class="quote">GSAP</span>
        </div>
    </div>
</template>

<style scoped lang="scss">
.tech-wrapper {
    position: relative;
    width: 60%;
    min-width: 300px;
    height: 500px;
    background-color: $secondary;
}

.text {
    display: flex;
    position: absolute;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: $primary;
}

.quote {
    font-size: clamped(50px, 60px, 480px, 1920px);
    font-weight: 400;
    opacity: 0;
    position: absolute;
    z-index: 1;
}
</style>