<script setup lang="ts">
import SplitType from 'split-type';
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const { $gsap } = useNuxtApp()
let ctx: gsap.Context

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
    }
})

onMounted(() => {

    $gsap.registerPlugin(ScrollTrigger)
    // Context! The friendly GSAP garbage collector
    ctx = $gsap.context((self) => {

        let secChar = $gsap.utils.toArray(`.${props.className}`);
        secChar.forEach((sec: any) => {
            const splitTxt = new SplitType(sec, { types: 'words' })
            $gsap.set(splitTxt.words, { autoAlpha: 0, clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)', })
            $gsap.to(splitTxt.words, {
                autoAlpha: 1,
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                scrollTrigger: {
                    trigger: sec,
                    start: 'top bottom',
                    scrub: false,
                    end: 'top top',
                    toggleActions: "restart none none reverse",
                    preventOverlaps: true,
                },
                duration: .4,

                ease: "power1.out"
            })
        })
    })
})

onUnmounted(() => {
    ctx.revert()
})

</script>

<template>
    <div class="abstract-wrapper">
        <header class="abstract-header" :class="className">
            <span>{{ label }}</span>
        </header>
        <div v-if="desc">
            <div class="abstract-desc" :class="className">{{ desc }}</div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.abstract-wrapper {
    display: flex;
    flex-flow: column;
    align-items: flex-start;
    margin: 0 0;
    color: $secondary;
    text-transform: uppercase;
    font-weight: 500;
    line-height: .9;
    margin: 0;
    overflow: hidden;

    @include this-and-above('lg') {
        margin: 0 $px-64-spacer;
    }
}

.abstract-header {
    font-size: clamped(40px, 90px, 480px, 1920px);
    flex-wrap: wrap;
    width: 60%;
    margin-bottom: $px-32-spacer;
    line-height: 1;
}

.abstract-desc {
    font-weight: 500;
    line-height: .9;
    line-height: 1.2;
    font-size: clamped(16px, 20px, 480px, 1920px);
}
</style>
