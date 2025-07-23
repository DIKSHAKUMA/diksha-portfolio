<script setup lang="ts">
import SplitType from 'split-type';
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const props = defineProps<{
    name: string
    agency: string
    text: string
}>()

let ctx: gsap.Context

onMounted(() => {
    const { $gsap } = useNuxtApp()

    $gsap.registerPlugin(ScrollTrigger)
    // Context! The friendly GSAP garbage collector
    ctx = $gsap.context((self) => {

        let sectionsChar = $gsap.utils.toArray('.testimonial-w');
        sectionsChar.forEach((sec: any) => {
            const splitTxt = new SplitType(sec, { types: 'words' })
            $gsap.set(splitTxt.words, { autoAlpha: 0, clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)', })
            $gsap.to(splitTxt.words, {
                autoAlpha: 1,
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                scrollTrigger: {
                    trigger: sec,
                    start: 'top bottom',
                    scrub: false,
                    end: 'top 50%',
                    toggleActions: "restart none none reverse",
                    preventOverlaps: true,
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
    <div class="testimonial-wrapper">
        <blockquote class="testimonial">
            <div class="testimonial-w">{{ text }}</div>
            <div class="testimonial__cite">
                <cite class="testimonial-w">{{ name }} - </cite>
                <cite class="testimonial-w">{{ agency }}</cite>
            </div>
        </blockquote>
    </div>
</template>


<style scoped lang="scss">
.testimonial-wrapper {
    position: relative;
    margin: 0 $px-16-spacer;

    @include this-and-above('sm') {
        flex-direction: row;
        margin: 0 $px-32-spacer;
    }

    @include this-and-above('md') {
        margin: 0 $px-64-spacer;
    }

    @include this-and-above('lg') {
        margin: 0 $px-64-spacer;
    }

    @include this-and-above('xl') {
        margin: 0 $px-128-spacer;
    }

    .testimonial {
        font-family: $sans-text;
        display: flex;
        flex-direction: column;
    }

    blockquote {
        font-size: clamped(20px, 34px, 480px, 1920px);
        color: $secondary;
        margin:0;
    }

    cite {
        font-size: clamped(16px, 20px, 380px, 1920px);
    }

    .testimonial__cite {
        text-align: right;
    }
}
</style>