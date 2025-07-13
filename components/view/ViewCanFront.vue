<script setup lang="ts">
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useFolioStore } from '~/store/useFolioStore'
import SplitType from 'split-type';
import { gsap } from 'gsap';

// PINIA 🍍 
const store = useFolioStore()
let ctx: gsap.Context
const { $gsap } = useNuxtApp()

onMounted(() => {
    $gsap.registerPlugin(ScrollTrigger)
    ctx = $gsap.context((self) => {

        let sectionsChar = $gsap.utils.toArray('.split-skills-w');
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
            })
        })
    })
})

onUnmounted(() => {
    ctx.revert()
})
</script>

<template>
    <div class="can-wrapper">
        <main class="can">
            <CommonAbstract class="can__label" :label="store.data.intro?.techIntroTitle"
                :className="'can-intro'" />
            <section class="can__abstract"></section>
            <CommonInfoLabel :label="'FRONTEND DEVELOPER'" :className="'photo-label'"
                :style="{ justifyContent: 'center', alignItems: 'flex-star' }" />

            <section class="can__demo">
                <div class="can__demo-block">
                    <h2 class="can__demo-title split-skills-w">{{ store.data.intro?.techOneTitle }}</h2>
                    <div class="can__demo-desc split-skills-w">{{ store.data.intro?.techOneDesc }}</div>
                    <DemoSkills />
                </div>
                <div class="can__demo-block">
                    <h2 class="can__demo-title split-skills-w">{{ store.data.intro?.techTwoTitle }}</h2>
                    <div class="can__demo-desc split-skills-w">{{ store.data.intro?.techTwoDesc }}</div>
                    <DemoAnimation />
                </div>
                <div class="can__demo-block">
                    <h2 class="can__demo-title split-skills-w">{{ store.data.intro?.techThreeTitle }}</h2>
                    <div class="can__demo-desc split-skills-w">{{ store.data.intro?.techThreeDesc }}</div>
                    <DemoUX />
                </div>
            </section>
        </main>
    </div>
</template>

<style lang="scss" scoped>
.split-skills-w {
    will-change: transform;
}

.can {
    &__label {
        position: relative;
        margin-top: $px-128-spacer;

        :deep(.abstract-desc) {
            font-size: clamped(20px, 34px, 480px, 1920px);
        }
    }

    &__demo {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        margin-top: 128px;
        row-gap: 64px;
    }

    &__demo-block {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        min-width: 300px;

        @include this-and-above('md') {
            align-items: flex-end;
        }
    }

    &__demo-title,
    &__demo-desc {
        width: 100%;
        text-align: left;
    }

    &__demo-title {
        width: 60%;
        min-width: 300px;
        color: $secondary;
        text-transform: uppercase;
    }

    &__demo-desc {
        width: 60%;
        min-width: 300px;
        font-size: 1rem;
        color: $secondary;
        margin-bottom: 1.5em;
    }
}

/* same margins as project-wrapper in [id].vue */
.can-wrapper {
    position: relative;
    padding: 0 $px-16-spacer;
    background-color: $primary;

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

.can::before {
    background-color: $secondary;
    top: 0;
    content: '';
    display: block;
    height: 2px;
    left: 50%;
    position: absolute;
    transform: translate(-50%, 0);
    width: 95%;
    margin: $px-128-spacer 0;
}
</style>