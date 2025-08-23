<script setup lang="ts">

import SplitType from 'split-type';
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const { $gsap } = useNuxtApp()
let ctx: gsap.Context
const splitInstances: SplitType[] = []

const props = defineProps({
    label: {
        type: String,
        default: ''
    },
    desc: {
        type: String,
        default: ''
    },
    className: {
        type: String,
        default: ''
    },
    delay: {
        type: Number,
        default: 0
    },
    isHero: {
        type: Boolean,
        default: false
    },
    isSecondary: {
        type: Boolean,
        default: false
    },
    author: {
        type: String,
        default: ''
    },
    date: {
        type: String,
        default: ''
    },
    length: {
        type: String,
        default: ''
    }
})

onMounted(() => {

    $gsap.registerPlugin(ScrollTrigger)
    // Context! The friendly GSAP garbage collector
    ctx = $gsap.context((self) => {

        let secChar = $gsap.utils.toArray(`.${props.className}`);
        secChar.forEach((sec: any) => {
            const splitTxt = new SplitType(sec, { types: 'words' })
            splitInstances.push(splitTxt)
            $gsap.set(splitTxt.words, { autoAlpha: 0, clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)', })
            $gsap.to(splitTxt.words, {
                autoAlpha: 1,
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                delay: props.delay,
                scrollTrigger: {
                    trigger: sec,
                    start: 'top bottom',
                    scrub: false,
                    end: 'top top',
                    toggleActions: "restart none none reverse",
                    preventOverlaps: true,
                    anticipatePin: 1
                },
                duration: .4,
                ease: "power1.out"
            })
        })
    })
})

onUnmounted(() => {
    // Clean up GSAP context
    ctx?.revert()

    // Clean up SplitType instances
    splitInstances.forEach(instance => {
        instance.revert()
    })

    // Clear the array
    splitInstances.length = 0
})

</script>

<template>
    <div class="abstract-wrapper" :class="{ 'abstract-wrapper--hero': isHero }">
        <div class="abstract">
            <header v-if="label && label.trim()" class="abstract__header"
                :class="[className, { 'abstract__header--hero': isHero }, { 'abstract__header--secondary': isSecondary }]">
                <div>{{ label }}</div>
            </header>
            <div v-if="desc && desc.trim()">
                <div class="abstract__desc" :class="className">{{ desc }}</div>
            </div>

            <!-- For blog posts -->
            <div class="abstract__info">
                <div v-if="author && author.trim()">
                    <h4 class="abstract__author" :class="className">by: {{ author }}</h4>
                </div>
                <div v-if="date && date.trim()">
                    <h4 class="abstract__date" :class="className">on: {{ date }}</h4>
                </div>
                <div v-if="length && length.trim()">
                    <h4 class="abstract__length" :class="className">{{ length }}</h4>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.abstract-wrapper {
    display: flex;
    flex-flow: column;
    align-items: flex-start;
    color: $secondary;
    margin: 0;
    height: fit-content;

    width: 80%;
    margin-bottom: $px-32-spacer;

    &--hero {
        margin-bottom: $px-16-spacer;
    }

    @include this-and-above('md') {
        margin-bottom: $px-64-spacer;

        &.abstract-wrapper--hero {
            margin-bottom: $px-16-spacer;
        }
    }
}

.abstract {
    &__header {
        position: relative;
        font-size: clamped(56px, 110px, 480px, 1920px);
        flex-wrap: wrap;
        height: max-content;
        margin-bottom: $px-32-spacer;

        &--hero {
            margin-bottom: 0;
        }

        /* When we need a sub header (smaller) */
        &--secondary {
            font-size: clamped(36px, 52px, 480px, 1920px);
        }

        @include this-and-above('md') {
            margin-bottom: $px-64-spacer;

            &.abstract__header--hero {
                margin-bottom: 0;
            }
        }
    }

    &__desc {
        font-size: clamped(20px, 36px, 480px, 1920px); // Increased from 16px to 20px for better mobile readability
    }

    &__info {
        display: flex;
        flex-wrap: wrap;
        gap: $px-16-spacer;
    }

    &__author,
    &__date,
    &__length {

        position: relative;
        display: inline-block;
        // Increased from 16px to 20px for better mobile readability
        font-style: italic;
        font-variation-settings: "wght" 500, "ital" 900;
    }

}
</style>
