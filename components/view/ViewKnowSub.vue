<script setup lang="ts">
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useFolioStore } from '~/store/useFolioStore'
import SplitType from 'split-type';
import { ref, onMounted } from 'vue'

// PINIA 🍍 
const store = useFolioStore()
const { $gsap } = useNuxtApp()
let ctx: gsap.Context
const splitInstances: SplitType[] = []

const canLine = ref<HTMLElement | null>(null)

onMounted(() => {
    $gsap.registerPlugin(ScrollTrigger)

    ctx = $gsap.context((self) => {

        let sectionsChar = $gsap.utils.toArray('.split-skills-w');
        sectionsChar.forEach((sec: any) => {
            const splitTxt = new SplitType(sec, { types: 'words' })
            splitInstances.push(splitTxt)
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
    <div class="know-wrapper">
        <CommonLine />
        <main class="know">
            <CommonAbstract class="know__label" :desc="''" :label="store.data.intro?.knowIntroTitle"
                :className="'know-intro'" :is-secondary="true" />
            <CommonInfoLabel :label="'FRONTEND DEVELOPER'" :className="'photo-label'"
                :style="{ justifyContent: 'center', alignItems: 'flex-start' }" />

            <section class="know__demo">
                <div class="know__demo-block">
                    <h2 class="know__demo-title split-skills-w">{{ store.data.intro?.knowOneTitle }}</h2>
                    <div class="know__demo-desc split-skills-w">{{ store.data.intro?.knowOneDesc }}</div>
                    <AnimSkills class="know__demo-comp" />
                </div>
                <div class="know__demo-block">
                    <h2 class="know__demo-title split-skills-w">{{ store.data.intro?.knowTwoTitle }}</h2>
                    <div class="know__demo-desc split-skills-w">{{ store.data.intro?.knowTwoDesc }}</div>
                    <AnimDemo class="know__demo-comp" />
                </div>
                <div class="know__demo-block">
                    <h2 class="know__demo-title split-skills-w">{{ store.data.intro?.knowThreeTitle }}</h2>
                    <div class="know__demo-desc split-skills-w">{{ store.data.intro?.knowThreeDesc }}</div>
                    <AnimUX class="know__demo-comp" />
                </div>
            </section>
        </main>
    </div>
</template>

<style lang="scss" scoped>
.split-skills-w {
    will-change: transform;
}

/* same margins as other home (sub) components; ViewParallaxHome varies slightly due to parallax */
.know-wrapper {
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

.know {
    &__label {
        position: relative;
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
        border-radius:12px;

        @include this-and-above('md') {
            width: 60%;
            min-width: 300px;
            height: 42vh;
        }
    }
}
</style>