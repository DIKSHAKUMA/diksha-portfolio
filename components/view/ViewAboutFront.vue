<script setup lang="ts">
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useFolioStore } from '~/store/useFolioStore'

// PINIA 🍍 
const store = useFolioStore()
const { $gsap } = useNuxtApp()
const colorMode = useColorMode()
const parallaxBg = useTemplateRef('parallaxBg')
let ctx: gsap.Context

const classObject = computed(() => ({
    'parallax__bg--dark': colorMode.preference === 'dark',
    'parallax__bg--light': colorMode.preference === 'light'
}))

onMounted(() => {

    $gsap.registerPlugin(ScrollTrigger)
    ctx = $gsap.context((self) => {

        // Pre-calculate the parallax distance to avoid function calls during scroll
        const parallaxDistance = -window.innerHeight * 0.25 // Reduced from 0.33 for better performance
        
        // Parallax background animation - optimized for performance
        $gsap.to('.parallax__bg', {
            y: parallaxDistance,
            scrollTrigger: {
                trigger: parallaxBg.value,
                start: "top bottom",
                end: "bottom top",
                scrub: 1, // Increased from 0.5 for less frequent updates
                pinSpacing: false,
                invalidateOnRefresh: true,
                refreshPriority: -1,
                // Add performance optimizations
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
    ctx.revert()
})
</script>

<template>
    <div class="about-wrapper">
        <main class="about">
            <span class="parallax__bg" :class="classObject" ref="parallaxBg"></span>
            <CommonAbstract class="about__label" :label="store.data.intro?.aboutIntroTitle"
                :desc="store.data.intro?.aboutIntroDesc" :className="'about-intro'" />

            <div v-if="colorMode.preference === 'dark'">
                <CommonInfoLabel :label="'Unsplash @ Cosmoh'" :className="'photo-label'"
                    :style="{ justifyContent: 'flex-end', alignItems: 'flex-end' }"
                    :link="'https://unsplash.com/@cosmoh'" />
            </div>
            <div v-else>
                <CommonInfoLabel :label="'Unsplash @ Joyce G'" :className="'photo-label'"
                    :style="{ justifyContent: 'flex-end', alignItems: 'flex-end' }"
                    :link="'https://unsplash.com/@joyce_'" />
            </div>
        </main>
    </div>
</template>

<style lang="scss" scoped>
.split-proj-w {
    will-change: transform;
}

.about__label {
    color: $secondary;
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

.parallax__bg {
    position: absolute;
    display: block; // Changed from inline-block for better performance
    top: 0;
    right: 0;
    height: 120vh; // Reduced from 130vh
    width: 120vw; // Reduced from 130vw
    z-index: 1;
    will-change: transform;
    overflow: hidden;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center top;
    
    // Performance optimizations
    transform: translateZ(0); // Force hardware acceleration
    backface-visibility: hidden;
    perspective: 1000px;
    contain: layout style paint; // CSS containment for better performance
    
    // Reduce repaints during animation
    image-rendering: optimizeSpeed;
    
    // Firefox-specific optimizations
    @-moz-document url-prefix() {
        transform: translate3d(0, 0, 0);
        image-rendering: optimizeSpeed;
    }

    &--dark {
        background-image: url('/img/cosmoh-love-unsplash.jpg');

        @supports (background-image: url('/img/cosmoh-love-unsplash.webp')) {
            background-image: url('/img/cosmoh-love-unsplash.webp');
        }
    }

    &--light {
        background-image: url('/img/joyce-g-unsplash.jpg');

        @supports (background-image: url('/img/joyce-g-unsplash.webp')) {
            background-image: url('/img/joyce-g-unsplash.webp');
        }
    }
}
</style>