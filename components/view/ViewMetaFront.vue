<script setup lang="ts">
import * as PIXI from 'pixi.js';
import { Assets, DisplacementFilter } from 'pixi.js'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useFolioStore } from '~/store/useFolioStore'
import SplitType from 'split-type'

// PINIA 🍍 
const store = useFolioStore()
const { $lenis } = useNuxtApp()
const { $gsap } = useNuxtApp()
const colorMode = useColorMode()

const pixiCtx = useTemplateRef<any>('pixi')
const metaLine = ref<HTMLElement | null>(null)


let ctx: gsap.Context
let app: PIXI.Application

const classObject = computed(() => ({
    'meta__img--darkhue': colorMode.preference === 'dark',
    'meta__img--lighthue': colorMode.preference === 'light'
}))

/**
 * Rock on sista.
 */
onMounted(async () => {
    if (import.meta.client) {

        // $lenis.scrollTo(0, { force: true })

        $gsap.registerPlugin(ScrollTrigger)
        app = new PIXI.Application()

        // Initialize the application
        app.init({ backgroundAlpha: 0, canvas: pixiCtx.value, width: 800, height: 600 })

        const image = await Assets.load('/img/commodore.jpg')
        const imageSprite = PIXI.Sprite.from(image)

        // Make imageSprite fill the 800x600 canvas
        imageSprite.width = 800
        imageSprite.height = 600
        imageSprite.position.set(0, 0)
        imageSprite.anchor.set(0, 0)

        const imageMap = await Assets.load('/img/displacemap-2.jpg')

        const displaceSprite = PIXI.Sprite.from(imageMap)

        app.stage.interactive = true;
        app.stage.addChild(imageSprite)
        app.stage.addChild(displaceSprite)

        const filter = new DisplacementFilter(displaceSprite)

        app.stage.filters = [filter]
        filter.scale.set(100)
        displaceSprite.anchor.set(0.5)
        displaceSprite.setSize(800, 600)

        app.stage.on('mousemove', (e: any) => {
            displaceSprite.position.set(e.data.global.x - 25, e.data.global.y);
        }).on('touchmove', (e: any) => {
            displaceSprite.position.set(e.data.global.x - 25, e.data.global.y);
        });

        // Context! The friendly GSAP garbage collector
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
                        preventOverlaps: true,
                    },
                    duration: .4,
                })
            })

            $gsap.ticker.add((delta: any) => {
                displaceSprite.rotation += 0.001
            })
        })
    }
})

onBeforeUnmount(() => {
    //ctx.revert()
    app.destroy()
})
</script>

<template>

    <div class="meta-wrapper">
        <main class="meta">
            <CommonLine />
            <!--:className here is for gsap-->
            <CommonAbstract class="meta__header" :label="'META'" :desc="''" :className="'meta-intro'" />
            <CommonInfoLabel :label="'ABOUT THIS SITE'" :className="'meta-label'"
                :style="{ justifyContent: 'center', alignItems: 'flex-start' }" />
            <div class="meta__canvas">
                <div class="meta__tech">
                    <h2 class="split-skills-w">{{ store.data.intro?.metaTechTitle }}</h2>
                    <div class="meta__tech-item split-skills-w">{{ store.data.intro?.metaTechDesc }}</div>
                    <h2 class="split-skills-w">{{ store.data.intro?.metaCreativeTitle }}</h2>
                    <div class="meta__tech-item split-skills-w">{{ store.data.intro?.metaCreativeDesc }}</div>
                    <h2 class="split-skills-w">{{ store.data.intro?.metaIdeTitle }}</h2>
                    <div class="meta__tech-item split-skills-w">{{ store.data.intro?.metaIdeDesc }}</div>
                    <h2 class="split-skills-w">{{ store.data.intro?.metaPublishTitle }}</h2>
                    <div class="meta__tech-item split-skills-w">{{ store.data.intro?.metaPublishDesc }}</div>
                </div>
                <div class="action" data-name="yo" data-text="Home"><canvas :class="classObject" class="meta__img" ref="pixi"></canvas></div>
            </div>
        </main>
    </div>
</template>

<style lang="scss" scoped>
canvas {
    display: block;
    margin: 0 auto;
    pointer-events: none; // Allow mouse events to pass through to parent
}

.meta-index {
    position: absolute;
}

.meta-wrapper {
    position: relative;
    padding: 0 $px-16-spacer;
    overflow: hidden;
    height: 100vh;
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

.meta {
    overflow: hidden;
    color: $secondary;

    &__img--darkhue {
        filter: hue-rotate(245deg) opacity(.7);
    }

    &__img--lighthue {
        filter: hue-rotate(338deg) opacity(.7);
    }

    &__header {
        position: relative;
        background-color: transparent;
    }

    &__canvas {
        display: flex;
        justify-content: center;
        margin: 0 auto;
        width: -moz-fit-content;
    }

    &__tech {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        align-self: center;
        z-index: 1;

        &-item {
            font-size: clamped(16px, 20px, 380px, 1920px);
        }

        &-item:nth-child(even) {
            margin-bottom: $px-32-spacer;
        }
    }
}
</style>