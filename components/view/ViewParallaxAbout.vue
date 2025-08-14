<script setup lang="ts">
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useFolioStore } from '~/store/useFolioStore'

// PINIA 🍍 
const store = useFolioStore()
const { $gsap } = useNuxtApp()
const parallaxWrapper = useTemplateRef('parallaxWrapper')
let ctx: gsap.Context

onMounted(() => {

    $gsap.registerPlugin(ScrollTrigger)
    ctx = $gsap.context((self) => {

        // Pre-calculate the parallax distance to avoid function calls during scroll
        const parallaxDistance = -window.innerHeight * 0.25 // Reduced from 0.33 for better performance

        // Parallax background animation - optimized for performance
        $gsap.to('.parallax__bg', {
            y: parallaxDistance,
            scrollTrigger: {
                trigger: parallaxWrapper.value, // This now references the wrapper
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
                pinSpacing: false,
                invalidateOnRefresh: true,
                refreshPriority: -1,
                anticipatePin: 1,
                fastScrollEnd: true,
            },
            force3D: true,
            transformOrigin: "center center",
            ease: "none"
        })
    })
})

onUnmounted(() => {
    ctx?.revert()
})
</script>
<template>
    <div class="about-wrapper">
        <main class="about">
            <div class="parallax__wrapper" ref="parallaxWrapper">
                <span class="parallax__bg"></span>
            </div>
            <CommonAbstract class="about__label" :label="store.data.intro?.aboutIntroTitle"
                :desc="store.data.intro?.aboutIntroDesc" :className="'about-intro'" />
            <CommonInfoLabel :label="'Unsplash @ Joyce G'" :className="'photo-label'"
                :style="{ justifyContent: 'flex-end', alignItems: 'flex-end' }"
                :link="'https://unsplash.com/@joyce_'" />
        </main>
    </div>
</template>

<style lang="scss" scoped>
.split-proj-w {
    will-change: transform;
}

.about__label {
    color: #faf7ff;
}

.about {
    overflow: hidden;


    &__label {
        position: relative;
        z-index: 100;
    }
}

/* same margins as project-wrapper in [id].vue */
.about-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background-color: $primary;
    overflow: hidden;
    height: 100vh;
    padding: $px-64-spacer $px-16-spacer;

    @include this-and-above('sm') {
        padding: $px-128-spacer $px-32-spacer;
    }

    @include this-and-above('md') {
        padding: $px-128-spacer $px-64-spacer;
    }

    @include this-and-above('xl') {
        padding: $px-128-spacer $px-128-spacer;
    }

    @include this-and-above('xxl') {
        padding: $px-128-spacer $px-256-spacer;
    }
}

.parallax__wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    z-index: 1;
}

.parallax__bg {
    position: absolute;
    display: block; // Changed from inline-block for better performance
    right: 0;
    height: 130vh; // Reduced from 130vh
    width: 100vw; // Reduced from 130vw
    z-index: 1;
    will-change: transform;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center top;
    transform: translateZ(0); // Force hardware acceleration
    backface-visibility: hidden;
    perspective: 1000px;
    contain: layout style paint; // CSS containment for better performance
    image-rendering: optimizeSpeed;
    background-image: url('/img/bilali-esmir.jpg');

    // Firefox-specific optimizations
    @-moz-document url-prefix() {
        transform: translate3d(0, 0, 0);
        image-rendering: optimizeSpeed;
    }

    @supports (background-image: url('/img/bilali-esmir.webp')) {
        background-image: url('/img/bilali-esmir.webp');
        /* Create the parallax scrolling effect */

        @include this-and-above('sm') {
            background-position: center 0%;

        }
    }

}
</style>