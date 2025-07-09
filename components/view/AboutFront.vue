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

        /*
        // Clip words Selected Works and reveal with polygon path, best done separate from above
        let sectionsChar = $gsap.utils.toArray('.split-proj-w');
        sectionsChar.forEach((sec: any) => {
            const splitTxt = new SplitType(sec, { types: 'words' })
            $gsap.set(splitTxt.words, { autoAlpha: 0, clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)', })
            $gsap.to(splitTxt.words, {
                autoAlpha: 1,
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                scrollTrigger: {
                    trigger: sec,
                    start: 'top 90%',
                    scrub: false,
                    end: 'top 50%',
                    toggleActions: "restart none none reverse",
                    preventOverlaps: true, // <- HERE
                    //markers: { startColor: "green", endColor: "red", fontSize: "18px", fontWeight: "bold", indent: 20 }
                },
                duration: .4,
                stagger: .2
            })
        })
        */

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
                :desc="store.data.intro.aboutIntroDesc" :className="'about-intro'" />
            <section class="about__abstract"></section>
            <CommonInfoLabel :label="'Photo by Thomas Thorstensson'" :className="'photo-label'" :style="{ justifyContent: 'flex-end', alignItems: 'flex-end' }" :link="'https://thomasthorstensson.photography'" />
        </main>
    </div>
</template>

<style lang="scss" scoped>
.split-proj-w {
    will-change: transform;
}

.about__label {
    :deep(.abstract-desc) {
        font-size: clamped(20px, 34px, 480px, 1920px);
    }
}

/* Because parallax image case requires different margins */
:deep(.abstract-wrapper) {
    @include this-and-above('lg') {
        margin: $px-64-spacer $px-256-spacer 0 $px-64-spacer;
    }
}

.about {
    overflow: hidden;

    &__label {
        position: relative;
        z-index: 100;
        background-color: transparent;
        color: white;
        /* or your desired color */
    }

    &__label::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: black;
        mix-blend-mode: difference;
        opacity: 0;
        pointer-events: none;
    }
}

/* same margins as project-wrapper in [id].vue */
.about-wrapper {
    position: relative;
    padding: 0 $px-16-spacer;
    background-color: $accent3;
    overflow: hidden;
    height: 100vh;

    padding: $px-128-spacer $px-16-spacer;

    @include this-and-above('lg') {
        padding: $px-128-spacer $px-64-spacer;
    }

    @include this-and-above('xl') {
        padding: $px-128-spacer $px-128-spacer;
    }

    @include this-and-above('xxl') {
        padding: $px-128-spacer $px-256-spacer;
    }
}

.parallax__bg::before {
    filter: grayscale(100%);
}

.parallax__bg {
    position: absolute;
    display: inline-block;
    top: 0;
    right: 0;
    height: 140vh;
    width: 100vw;
    background-image: url('/img/360-5-opt.jpg');
    filter: brightness(70%);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 70% bottom;
    z-index: 1;
    will-change: transform;
    overflow: hidden;
    object-fit: cover;

    @include this-and-above('xxl') {
        height: 80vw;
    }

    @supports (background-image: url('/img/360-5-opt.webp')) {
        background-image: url('/img/360-5-opt.webp');
    }
}
</style>