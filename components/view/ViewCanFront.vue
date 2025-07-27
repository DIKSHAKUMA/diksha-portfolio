<script setup lang="ts">
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useFolioStore } from '~/store/useFolioStore'
import SplitType from 'split-type';
import { ref, onMounted } from 'vue'

// PINIA 🍍 
const store = useFolioStore()
const { $gsap } = useNuxtApp()
let ctx: gsap.Context

const canLine = ref<HTMLElement | null>(null)

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
    ctx.revert();
})
</script>

<template>
    <div class="can-wrapper">
        <CommonLine />
        <main class="can">
            <CommonAbstract class="can__label" :label="store.data.intro?.techIntroTitle" :className="'can-intro'" />
            <CommonInfoLabel :label="'FRONTEND DEVELOPER'" :className="'photo-label'"
                :style="{ justifyContent: 'center', alignItems: 'flex-start' }" />

            <section class="can__demo">
                <div class="can__demo-block">
                    <h2 class="can__demo-title split-skills-w">{{ store.data.intro?.techOneTitle }}</h2>
                    <div class="can__demo-desc split-skills-w">{{ store.data.intro?.techOneDesc }}</div>
                    <DemoSkills class="can__demo-comp" />
                </div>
                <div class="can__demo-block">
                    <h2 class="can__demo-title split-skills-w">{{ store.data.intro?.techTwoTitle }}</h2>
                    <div class="can__demo-desc split-skills-w">{{ store.data.intro?.techTwoDesc }}</div>
                    <DemoAnimation class="can__demo-comp" />
                </div>
                <div class="can__demo-block">
                    <h2 class="can__demo-title split-skills-w">{{ store.data.intro?.techThreeTitle }}</h2>
                    <div class="can__demo-desc split-skills-w">{{ store.data.intro?.techThreeDesc }}</div>
                    <DemoUX class="can__demo-comp" />
                </div>
            </section>
        </main>
    </div>
</template>

<style lang="scss" scoped>
.split-skills-w {
    will-change: transform;
}

/* same margins as other home (front) components; ViewAboutFront varies slightly due to parallax */
.can-wrapper {
    position: relative;
    background-color: $primary;
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

.can {
    &__label {
        position: relative;

        :deep(.abstract-desc) {
            font-size: clamped(20px, 34px, 480px, 1920px);
        }
    }

    &__demo {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        row-gap: 64px;
    }

    &__demo-block {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        width: 100%;
        height: 100%;
        min-width: 300px;
    }

    &__demo-title,
    &__demo-desc {
        width: 100%;
        text-align: left;
    }

    &__demo-title {
        width: 100%;
        min-width: 300px;
        color: $secondary;
        text-transform: uppercase;

        @include this-and-above('md') {
            width: 60%;
            min-width: 300px;
        }
    }

    &__demo-desc {
        width: 100%;
        min-width: 300px;
        color: $secondary;
        margin-bottom: 1.5em;
        font-size: clamped(16px, 20px, 380px, 1920px);

        @include this-and-above('md') {
            width: 60%;
            min-width: 300px;
        }
    }

    &__demo-comp {
        height: 450px;
        position: relative;
        width: 100%;
        min-width: 300px;
        background-color: $secondary;

        @include this-and-above('md') {
            width: 60%;
            min-width: 300px;
            height: 42vh;
        }
    }
}
</style>