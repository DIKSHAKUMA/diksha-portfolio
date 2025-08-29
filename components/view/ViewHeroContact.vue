<script setup lang="ts">
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useFolioStore } from '~/store/useFolioStore'
import SplitType from 'split-type';

// PINIA 🍍 
const store = useFolioStore()
const { $gsap } = useNuxtApp()
let ctx: gsap.Context


onMounted(() => {

    $gsap.registerPlugin(ScrollTrigger)

    ctx = $gsap.context((self) => {

        let sectionsChar = $gsap.utils.toArray('.split-label-w');
        sectionsChar.forEach((sec: any) => {
            const splitTxt = new SplitType(sec, { types: 'words' })
            $gsap.set(splitTxt.words, { autoAlpha: 0, clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)', })
            $gsap.to(splitTxt.words, {
                autoAlpha: 1,
                delay: 1.5,
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
    ctx?.revert()
})
</script>

<template>
    <main ref="main" class="hero-wrapper">
        <AnimContact />
        <CommonInfoLabel class="ilabel" :label="'CC-BY. 2025. MADE BY THOMAS'" :className="'photo-label'"
            :style="{ justifyContent: 'flex-end', alignItems: 'flex-end' }" />
        <div class="contact">
            <div class="contact__label split-label-w">{{ store.data.contact?.emailTitle }}</div>
            <a class="contact__email action split-label-w" data-name="menu" data-text="Tell me!"
                :href="`mailto:${store.data.contact?.email}`">{{
                    store.data.contact?.email }}</a>
        </div>
        <!--:className here is for gsap is-hero changes bottom margins for wrapper and header-->
        <CommonAbstract class="front-header" :label="store.data.contact?.viewHeroTitle" :delay="1.5" :desc="''"
            :className="'front-intro'" :is-hero="true" />
    </main>
</template>

<style lang="scss" scoped>
.hero-wrapper {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    padding: 0 $px-16-spacer;

    @include this-and-above('md') {
        padding: 0 $px-64-spacer;
    }
}

.ilabel {
    color: #faf7ff;
}

.front-header {
    position: absolute;
    bottom: 0px;
    color: #faf7ff;
}

.contact {
    position: absolute;
    top: $px-64-spacer;
    color: #faf7ff;
    z-index: 200;

    &__label {
        font-size: clamped(30px, 52px, 480px, 1920px);
    }

    &__email {
        font-size: clamped(40px, 72px, 480px, 1920px);
        color: #faf7ff;

        text-decoration: underline;
        text-underline-offset: 15px;
        text-decoration-thickness: 4px;
        text-decoration-color: #faf7ff;
        transition: color 0.2s cubic-bezier(.17, .67, .83, .67), text-decoration-color 0.2s cubic-bezier(.17, .67, .83, .67);

        &:hover {
            color: $accent2;
            text-decoration-color: $accent2;
        }
    }

    @include this-and-above('sm') {
        top: $px-128-spacer;
    }
}
</style>