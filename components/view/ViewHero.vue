<script setup lang="ts">
import SplitType from 'split-type';
import * as PIXI from 'pixi.js';
import { Assets, DisplacementFilter } from 'pixi.js'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useHomeStore } from '~/store/useHomeStore'

// PINIA 🍍 
const store = useHomeStore()
const pixiCtx = useTemplateRef<any>('pixi')

const { $lenis } = useNuxtApp()
const { $gsap } = useNuxtApp()

const colorMode = useColorMode()
const logoEl = useTemplateRef<any>('mylogo')
const mainEl = useTemplateRef<any>('main')

let app: PIXI.Application
let filter: DisplacementFilter
let ripple: PIXI.Sprite
let logo: PIXI.Sprite
let ctx: gsap.Context

onMounted(async () => {
    if (import.meta.client) {

        $lenis.scrollTo(0, { force: true })

        pixiCtx.value.fillStyle = '#1E201E'

        $gsap.registerPlugin(ScrollTrigger)
        app = new PIXI.Application()

        $gsap.set(logoEl.value, { alpha: 0 })

        // Initialize the application
        app.init({ backgroundAlpha: 0, canvas: pixiCtx.value })

        const image = await Assets.load('/img/indian.png')
        logo = PIXI.Sprite.from(image)
        logo.alpha = 0
        logo.scale = .7

        const displacer = await Assets.load('/img/displacemap.png')

        ripple = PIXI.Sprite.from(displacer)

        app.stage.addChild(logo)
        app.stage.addChild(ripple)

        filter = new DisplacementFilter(ripple)
        app.stage.filters = [filter]

        logo.anchor.set(0.5)

        ripple.anchor.set(0.5)
        ripple.scale.set(0.05)
        filter.scale.set(100)

        watch(() => colorMode.value, (newValue, oldValue) => {
            (colorMode.preference == "light") ? logo.tint = 0x000000 : logo.tint = 0xFFFFFF
        }, { flush: 'post' })

        setTimeout(() => {
            logo.position.set(pixiCtx.value.width / 2, pixiCtx.value.height / 2)
            ripple.position.set(pixiCtx.value.width / 2, pixiCtx.value.height / 2)
        }, 500)

        // Context! The friendly garbage collector
        ctx = $gsap.context((self) => {

            // Animate in author intro automatically
            let sectionsChar = $gsap.utils.toArray('.split-author-w');
            sectionsChar.forEach((sec: any) => {
                const splitTxt = new SplitType(sec, { types: 'words' })
                $gsap.set(splitTxt.words, { autoAlpha: 0, clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)', })
                $gsap.to(splitTxt.words, { autoAlpha: 1, delay: 1, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' })

            })

            // And for the logo also auto animate a pixi displacement pulse
            $gsap.fromTo(logo, { alpha: 0 }, { duration: 1, alpha: 1, delay: 1 })
            let pixiTl = $gsap.timeline({ repeat: 1 })
            pixiTl.to(ripple.scale, { duration: 1.5, x: 1.5, y: 1.5 }, "ripple")
                .to(filter.scale, { duration: 1.5, x: 0, y: 0 }, "ripple")

            // Then we set scrolltrigger for logo, fromTo so timeline is easiest, more of same stuff
            let logoTl = $gsap.timeline({
                scrollTrigger: {
                    trigger: '.logo',
                    pinSpacing: true,
                    start: 'top top', // When the top of the trigger hits the top of the viewport
                    end: '+=100',
                    scrub: .5,
                    toggleActions: "restart none reverse reset",
                }
            })
            // Some more ripples now via ST
            logoTl.addLabel('start')
                .fromTo(logoEl.value, { opacity: 1 }, { opacity: 1 }, "ripple")
                .fromTo(ripple.scale, { x: 0, y: 0 }, { x: 5.5, y: 5.5 }, "ripple")
                .to(filter.scale, { x: 5.5, y: 5.5 }, "ripple")

            // Fade out author intro
            let authorTl = $gsap.timeline({
                // Pin intro is actually in ViewSelProjects.vue; fade out author intro when pin intro moves above bottom of browser window
                scrollTrigger: {
                    trigger: '.pin-intro',
                    pinSpacing: true,
                    start: 'top bottom', // when the top of the trigger hits the bottom of the viewport
                    end: '+=100',
                    scrub: .5,
                    toggleActions: "restart none reverse reset",
                }
            })
            authorTl.addLabel('start')
                .fromTo(".auth-intro__header,.auth-intro__text", { duration: .1, opacity: 1 }, { duration: .1, opacity: 0 })
        })
    }
})

onBeforeUnmount(() => {
    ctx.revert()
    app.destroy()
})
</script>

<template>
    <div ref="main">
        <div class="pin">
            <section class="logo" ref="mylogo">
                <canvas class="logo__pixi" ref="pixi" id="pixi"></canvas>
            </section>
        </div>
        <!--Not a place for h1, h2 etc, quite designy part -->
        <section class="auth-intro" aria-label="Quick summary" ref="title">
            <div class="auth-intro__header split-author-w">{{ store.data.author?.name }}</div>
            <div class="auth-intro__text split-author-w">{{ store.data.author?.intro }}</div>
        </section>
    </div>
</template>

<style lang="scss" scoped>
.pin {
    height: 100vh;
}

.split-author-w {
    opacity: 0;
}

.logo {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    &__pixi {
        width: clamp(300px, 40vw, 600px);
        height: auto;
        background-color: $primary ;
        background: $primary ;
        margin-bottom: 150px;
    }
}

.auth-intro {
    display: flex;
    flex-flow: column;
    position: fixed;
    bottom: 20px;
    color: $secondary;
    align-items: flex-start;

    &__header {
        font-size: clamped(50px, 120px, 480px, 1920px);
        font-weight: 500;
        line-height: .9;
        font-family: $sans-text;
        text-wrap: wrap;

        @include this-and-above('lg') {
            flex: 0;
        }
    }

    &__text {
        font-size: clamped(15px, 22px, 480px, 1920px);
        font-weight: 400;
        max-width: 500px;
        margin: 20px 0 5px 10px;
        line-height: 1.2;

        @include this-and-above('lg') {
            margin: 20px 0 5px 120px;
        }
    }

    @include this-and-above('lg') {
        flex-flow: row;
        align-items: flex-end;
        justify-content: flex-start;
        gap: 20px;
    }

    canvas {
        background-color: $primary;
    }
}
</style>