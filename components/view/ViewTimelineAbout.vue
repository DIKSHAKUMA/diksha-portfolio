<script setup lang="ts">
import { useFolioStore } from '~/store/useFolioStore'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ref, onMounted } from 'vue'
import { useNuxtApp } from '#app'

const store = useFolioStore()
const timelineLine = useTemplateRef('timelineLine')
const { $gsap } = useNuxtApp()

onMounted(() => {
    if (import.meta.client) {
        gsap.registerPlugin(ScrollTrigger)

        // Animate the timeline line height on scroll
        $gsap.to(timelineLine.value, {
            scrollTrigger: {
                trigger: '.timeline-wrapper',
                start: 'top center',
                end: 'bottom bottom',
                scrub: 0.5,
                onUpdate: (self) => {
                    // Update the height based on scroll progress
                    if (timelineLine.value) {
                        timelineLine.value.style.height = `${self.progress * 100}%`
                    }
                }
            }
        })
    }
})
</script>

<template>
    <main class="timeline-wrapper">
        <div class="timeline">
            <CommonAbstract class="front-header" :label="'Timeline'" :desc="''"
                :className="'timeline-intro'" />
            <div ref="timelineLine" class="timeline__line"></div>

            <div class="timeline__item">
                <div class="timeline__item__title">
                    <p>2022</p>
                </div>
                <div class="timeline__item__desc">
                    <p>Graduated from University of Applied Sciences</p>
                </div>
            </div>

        </div>
    </main>
</template>

<style lang="scss" scoped>
.timeline-wrapper {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    padding: 0 $px-16-spacer;
    height: 400vh;

    @include this-and-above('lg') {
        padding: 0 $px-64-spacer;
    }

    .timeline {
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        height:100%;

        &__line {
            width: 8px;
            height: 0%;
            background-color: $secondary;
            top: 0;
            will-change: height;
            transform-origin: top center;
        }

        &__item {
            position: relative;
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem 0;
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;

            &__title {
                font-size: 1.5rem;
                font-weight: bold;
                margin-bottom: 1rem;
            }

            &__desc {
                font-size: 1.1rem;
                line-height: 1.6;
            }

            // Fade in items as they come into view
            &.is-visible {
                opacity: 1;
                transform: translateY(0);
            }
        }
    }
}
</style>
