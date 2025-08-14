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

        // Animate timeline items individually
        const timelineItems = document.querySelectorAll('.timeline__item')
        
        timelineItems.forEach((item, index) => {
            // Set initial state - hidden and offset
            $gsap.set(item, {
                opacity: 0,
                y: 50,
                x: index % 2 === 0 ? -50 : 50 // Odd items come from left, even from right
            })

            // Animate in on scroll
            $gsap.to(item, {
                opacity: 1,
                y: 0,
                x: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: item,
                    start: 'top 80%',
                    end: 'top 50%',
                    toggleActions: 'play none none reverse'
                }
            })
        })
    }
})
</script>

<template>
    <main class="timeline-wrapper">
        <main class="timeline">
            <CommonAbstract class="front-header" :label="'Timeline'" :desc="''" :className="'timeline-intro'" />
            <div ref="timelineLine" class="timeline__line"></div>

            <!-- Timeline items container -->
            <div class="timeline__items">
                <div class="timeline__item">
                    <div class="timeline__item__content">
                        <div class="timeline__item__title">
                            <p>2022</p>
                        </div>
                        <div class="timeline__item__desc">
                            <p>Graduated from University of Applied Sciences</p>
                        </div>
                    </div>
                    <div class="timeline__item__dot"></div>
                </div>

                <!-- Add more timeline items here -->
                <div class="timeline__item">
                    <div class="timeline__item__content">
                        <div class="timeline__item__title">
                            <p>2023</p>
                        </div>
                        <div class="timeline__item__desc">
                            <p>Started working as Frontend Developer</p>
                        </div>
                    </div>
                    <div class="timeline__item__dot"></div>
                </div>

                <div class="timeline__item">
                    <div class="timeline__item__content">
                        <div class="timeline__item__title">
                            <p>2023</p>
                        </div>
                        <div class="timeline__item__desc">
                            <p>Started working as Frontend Developer</p>
                        </div>
                    </div>
                    <div class="timeline__item__dot"></div>
                </div>

            </div>

        </main>
    </main>
</template>

<style lang="scss" scoped>
:deep(.abstract-wrapper) {
    align-items: center;
}

.timeline-wrapper {
    position: relative;
    height: 100vh;
    overflow: hidden;
    height: 400vh;

    padding: $px-64-spacer 0;

    .timeline {
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        height: 100%;

        &__line {
            width: 8px;
            height: 0%;
            background-color: $secondary;
            position: relative;
            will-change: height;
            transform-origin: top center;
        }

        &__items {
            position: absolute;
            width: 100%;
            max-width: 1200px;
        }

        &__item {
            position: relative;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            &__content {
                padding: 2rem;
                width: 45%;
                position: relative;
                transition: all 0.3s ease;
            }

            &__title {
                font-size: 1.5rem;
                font-weight: bold;
                margin-bottom: 1rem;
                color: $secondary;
            }

            &__desc {
                font-size: 1.1rem;
                line-height: 1.6;
                color: $secondary;
            }

            &__dot {
                width: 20px;
                height: 20px;
                background-color: $secondary;
                border: 4px solid $primary;
                border-radius: 50%;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                z-index: 2;
                transition: all 0.3s ease;

                &:hover {
                    transform: translate(-50%, -50%) scale(1.2);
                }
            }

            // Odd items (1st, 3rd, 5th...) - LEFT side
            &:nth-child(odd) {
                justify-content: flex-start;
                margin: $px-256-spacer 0;
                text-align: right;

                .timeline__item__content {
                    margin-right: calc(50% + 30px); // 30px gap from timeline
                }
            }

            // Even items (2nd, 4th, 6th...) - RIGHT side  
            &:nth-child(even) {
                justify-content: flex-end;
                margin: $px-256-spacer 0;

                .timeline__item__content {
                    margin-left: calc(50% + 30px); // 30px gap from timeline
                }
            }
        }
    }
}
</style>
