<script setup lang="ts">
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useFolioStore } from '~/store/useFolioStore'

// PINIA 🍍 
const store = useFolioStore()
const { $gsap } = useNuxtApp()
const parallaxBg = useTemplateRef('parallaxBg')
let ctx: gsap.Context


const getRatio = computed(() => {
    return window!.innerHeight / (window!.innerHeight + parallaxBg.value!.offsetHeight)
})

onMounted(() => {

    $gsap.registerPlugin(ScrollTrigger)
    ctx = $gsap.context((self) => {

        // Parallax background animation
        $gsap.to('.parallax__bg', {
            y: () => -window.innerHeight * .33, // Move background up by half the viewport height
            scrollTrigger: {
                trigger: parallaxBg.value,
                start: "top bottom",
                end: "bottom top",
                scrub: 1, // Smoother scrubbing
                pinSpacing: false,
                invalidateOnRefresh: true,
            },
            force3D: true,
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
            <span class="parallax__bg" ref="parallaxBg"></span>
            <CommonAbstract class="about__label" :label="store.data.intro?.aboutIntroTitle"
                :desc="store.data.intro?.aboutIntroDesc" :className="'about-intro'" />
            <CommonInfoLabel :label="'Photo by Bruno Kelzer'" :className="'photo-label'"
                :style="{ justifyContent: 'flex-end', alignItems: 'flex-end' }"
                :link="'https://unsplash.com/@bruno_kelzer'" />
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
        background-color: transparent;
        /* or your desired color */
    }
}

/* same margins as project-wrapper in [id].vue */
.about-wrapper {
    position: relative;
    padding: 0 $px-16-spacer;
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
    position: relative;
}

.parallax__bg::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #171717;
    mix-blend-mode: overlay;
    z-index: 2;
    pointer-events: none;
}

.parallax__bg {
    position: absolute;
    display: inline-block;
    top: 0;
    right: 0;
    height: 130vh;
    width: 130vw;
    background-image: url('/img/manet-3.jpg');
    filter: grayscale(100%) brightness(1.7) contrast(1.1);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: bottom center;
    z-index: 1;
    will-change: transform;
    overflow: hidden;
    object-fit: cover;

    @supports (background-image: url('/img/manet-3.webp')) {
        background-image: url('/img/manet-3.webp');
    }
}
</style>