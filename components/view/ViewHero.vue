<script setup lang="ts">
import * as PIXI from 'pixi.js';
import { Assets, DisplacementFilter } from 'pixi.js'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useHomeStore } from '~/store/useHomeStore'

const { $lenis } = useNuxtApp()
const { $gsap } = useNuxtApp()

// PINIA 🍍 
const store = useHomeStore()
const pixiCtx = useTemplateRef<any>('pixi')
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

        const image = await Assets.load('/img/electrohead.png')
        logo = PIXI.Sprite.from(image)
        logo.alpha = 0
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

        setTimeout(() => {
            logo.position.set(pixiCtx.value.width / 2, pixiCtx.value.height / 2)
            ripple.position.set(pixiCtx.value.width / 2, pixiCtx.value.height / 2)
        }, 500)

        ctx = $gsap.context((self) => {
            //set a pulse
            $gsap.fromTo(logo, { alpha: 0 }, { duration: 1, alpha: 1, delay: 1 })
            let tl = $gsap.timeline({ repeat: 1 })
            tl.to(ripple.scale, { duration: 1.5, x: 1.5, y: 1.5 }, "ripple")
                .to(filter.scale, { duration: 1.5, x: 0, y: 0 }, "ripple")

            // set scrolltriggers
            let st = $gsap.timeline({
                // yes, we can add it to an entire timeline!
                scrollTrigger: {
                    trigger: '.logo',
                    pinSpacing: true,
                    start: 'top top', // when the top of the trigger hits the top of the viewport
                    end: '+=100', // end after scrolling 500px beyond the start
                    scrub: .5, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
                    toggleActions: "restart none reverse reset",
                }
            })

            st.addLabel('start')
                .fromTo(logoEl.value, { opacity: 1 }, { opacity: 1 }, "ripple")

                .fromTo(ripple.scale, { x: 0, y: 0 }, { x: 5.5, y: 5.5 }, "ripple")
                .to(filter.scale, { x: 5.5, y: 5.5 }, "ripple")

            let tt = $gsap.timeline({
                // yes, we can add it to an entire timeline!
                scrollTrigger: {
                    trigger: '.pin-intro',
                    pinSpacing: true,
                    start: 'top bottom', // when the top of the trigger hits the top of the viewport
                    end: '+=100', // end after scrolling 500px beyond the start
                    scrub: .5, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
                    toggleActions: "restart none reverse reset",
                }
            })

            tt.addLabel('start')
                .fromTo(".auth-intro__header,.auth-intro__text", { duration: .1, opacity: 1 }, { duration: .1, opacity: 0 })
        })
    }
})

onUnmounted(() => {
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
            <div class="auth-intro__header">{{ store.data.author?.name }}</div>
            <div class="auth-intro__text">{{ store.data.author?.intro }}</div>
        </section>
    </div>
</template>

<style lang="scss" scoped>
.pin {
    height: 100vh;
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
        font-size: clamped(50px, 128px, 480px, 1920px);
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