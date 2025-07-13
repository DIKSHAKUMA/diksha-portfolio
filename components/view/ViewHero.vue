<script setup lang="ts">
import * as PIXI from 'pixi.js';
import { Assets, DisplacementFilter } from 'pixi.js'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useFolioStore } from '~/store/useFolioStore'
import { Layout } from '@pixi/layout'

// PINIA 🍍 
const store = useFolioStore()
const pixiCtx = useTemplateRef<any>('pixi')
const imgFrames = useTemplateRef<any>('imgFrames')

const { $lenis } = useNuxtApp()
const { $gsap } = useNuxtApp()

const colorMode = useColorMode()
const imagesWrapper = useTemplateRef<any>('imagesWrapper')

let app: PIXI.Application
let filter: DisplacementFilter
let ripple: PIXI.Sprite
let sprite: PIXI.Sprite
let ctx: gsap.Context

/**
 * Do we rock. We rock!
 */
onMounted(async () => {
    if (import.meta.client) {

        $lenis.scrollTo(0, { force: true })

        pixiCtx.value.fillStyle = '#1E201E'

        $gsap.registerPlugin(ScrollTrigger)
        app = new PIXI.Application()

        $gsap.set(imagesWrapper.value, { alpha: 0 })

        // Initialize the application
        app.init({ backgroundAlpha: 0, canvas: pixiCtx.value, width: 400, height: 300 })

        const image = await Assets.load('/img/front.png')
        sprite = PIXI.Sprite.from(image)
        sprite.alpha = 0

        const displacer = await Assets.load('/img/displacemap.png')

        ripple = PIXI.Sprite.from(displacer)

        app.stage.addChild(sprite)
        app.stage.addChild(ripple)

        filter = new DisplacementFilter(ripple)
        app.stage.filters = [filter]

        sprite.anchor.set(0.5)

        ripple.anchor.set(0.5)
        ripple.scale.set(0.05)
        filter.scale.set(100)

        watch(() => colorMode.value, (newValue, oldValue) => {
            (colorMode.preference == "light") ? sprite.tint = 0x000000 : sprite.tint = 0xFFFFFF
        }, { flush: 'post', immediate: true })

        sprite.position.set(pixiCtx.value.width / 2, pixiCtx.value.height / 2)
        ripple.position.set(pixiCtx.value.width / 2, pixiCtx.value.height / 2)
        imgFrames.value.style.width = pixiCtx.value.clientWidth + 'px'
        imgFrames.value.style.height = pixiCtx.value.clientHeight + 'px'

        app.stage.layout = {
            objectFit: 'contain',
            width: pixiCtx.value.clientWidth,
            height: pixiCtx.value.clientHeight,
        }

        // Context! The friendly GSAP garbage collector
        ctx = $gsap.context((self) => {
            // For the sprite animate a pixi displacement pulse
            let pixiTl = $gsap.timeline({ repeat: 0 })
            pixiTl.fromTo(sprite, { alpha: 0 }, { duration: 1, alpha: 1, delay: 0 })
                .fromTo(imagesWrapper.value, { opacity: 0 }, { opacity: 1 }, "<")
                .to(ripple.scale, { duration: 1.5, x: 1.5, y: 1.5 }, "ripple")
                .to(filter.scale, { duration: 1.5, x: 0, y: 0 }, "ripple")
                .to(sprite, { duration: 1, alpha: 0 }, "+=1")
            $gsap.fromTo(imgFrames.value, { autoAlpha: 0 }, { autoAlpha: 1, delay: 3 })

            // Fade out author intro
            let authorTl = $gsap.timeline({
                // Pin intro is actually in ViewProjectsFront.vue; fade out author intro when pin intro moves above bottom of browser window
                scrollTrigger: {
                    trigger: '.about-intro',
                    pinSpacing: true,
                    start: 'top bottom', // when the top of the trigger hits the bottom of the viewport
                    end: '+=100',
                    scrub: .5,
                    toggleActions: "restart none reverse reset",
                }
            })
            authorTl.addLabel('start')
                .fromTo(".front-label", { duration: .1, opacity: 1 }, { duration: .1, y: -100, opacity: 0 })
        })
    }
})

onBeforeUnmount(() => {
    ctx.revert()
    app.destroy()
})
</script>

<template>
    <main ref="main" class="hero-wrapper">
        <div class="pin">
            <div class="images-wrapper" ref="imagesWrapper">
                <div>
                    <canvas class="img-pixi" ref="pixi" id="pixi"></canvas>
                    <img class="img-frames" src="/img/front.png" ref="imgFrames" />
                </div>
            </div>
        </div>
        <!--:className here is for gsap-->
        <CommonAbstract class="front-label" :label="store.data.about?.intro" :desc="''" :className="'front-intro'" />
    </main>
</template>

<style lang="scss" scoped>
.pin {
    height: 100vh;
}

.hero-wrapper {
    padding: 0 $px-16-spacer;

    @include this-and-above('lg') {
        padding: 0 $px-64-spacer;
    }

}

:deep(.abstract-header) {
    margin-top: 0px;
    font-size: clamped(40px, 90px, 480px, 1920px);
    width: 100%;
}

.front-label {
    position: sticky;
    bottom: 20px;
}

img {
    object-fit: cover;
}

.images-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80%;
    overflow: hidden;
}

.img-pixi {
    position: absolute;
}

.img-frames {
    position: relative;
    border: $primary solid 1px;
}

canvas {
    width: 300px;

    @include this-and-above('sm') {
        width: 400px;
    }
}
</style>