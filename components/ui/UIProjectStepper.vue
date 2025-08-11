<script setup lang="ts">
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as PIXI from 'pixi.js'
import { Assets, DisplacementFilter } from 'pixi.js'
import { useHygraphParser } from '~/composable/useHygraphParser'

const { $gsap } = useNuxtApp()

const { hygraphLoader } = useHygraphParser()

const props = defineProps<{ prevImg: string, nextImg: string, prev: string, next: string, prevName: string, nextName: string, prevSynop: string[], nextSynop: string[] }>()

let ctx: gsap.Context
let prevPixiApp: PIXI.Application
let nextPixiApp: PIXI.Application
let prevDisplaceSprite: PIXI.Sprite
let nextDisplaceSprite: PIXI.Sprite

// Setup PIXI displacement effect for stepper images
const setupPixiEffect = async (canvasElement: HTMLCanvasElement, imageHandle: string, isNext: boolean = false) => {
    const app = new PIXI.Application()
    const pixelRatio = window.devicePixelRatio || 1

    // Get the actual image dimensions from the img element in the same container
    const parentElement = canvasElement.parentElement as HTMLElement
    const imgElement = parentElement.querySelector('img') as HTMLImageElement
    const containerWidth = imgElement.offsetWidth
    const containerHeight = imgElement.offsetHeight

    await app.init({
        backgroundAlpha: 0,
        canvas: canvasElement,
        width: containerWidth,
        height: containerHeight,
        resolution: pixelRatio,
        autoDensity: true,
        resizeTo: parentElement || window // Enable auto-resize to parent container or window
    })

    // Construct proper Hygraph image URL
    const imageUrl = `https://eu-west-2.graphassets.com/cm4tev3k1008n01uo6egngvzu/${imageHandle}`
    const image = await Assets.load(imageUrl)
    const imageSprite = PIXI.Sprite.from(image)

    // Make imageSprite fill the canvas using container dimensions
    imageSprite.width = containerWidth
    imageSprite.height = containerHeight
    imageSprite.position.set(0, 0)
    imageSprite.anchor.set(0, 0)

    const displacementTexture = await Assets.load({ src: '/img/displacemap-2.jpg', format: 'jpg' })
    const displaceSprite = PIXI.Sprite.from(displacementTexture)

    app.stage.interactive = true;
    app.stage.addChild(imageSprite)
    app.stage.addChild(displaceSprite)

    const filter = new DisplacementFilter(displaceSprite)
    app.stage.filters = [filter]
    filter.scale.set(0) // Start with no displacement
    displaceSprite.anchor.set(0.5)
    displaceSprite.setSize(containerWidth, containerHeight)

    let hasMouseMoved = false

    const activateDisplacement = (e: any) => {
        // Activate displacement on first interaction
        if (!hasMouseMoved) {
            filter.scale.set(100)
            hasMouseMoved = true
        }
        displaceSprite.position.set(e.data.global.x - 25, e.data.global.y);
    }

    app.stage.on('mousemove', activateDisplacement)
        .on('touchmove', activateDisplacement)
        .on('pointermove', activateDisplacement);

    // Store references
    if (isNext) {
        nextPixiApp = app
        nextDisplaceSprite = displaceSprite
    } else {
        prevPixiApp = app
        prevDisplaceSprite = displaceSprite
    }

    return { app, displaceSprite }
}

onMounted(async () => {
    // Register the custom Hygraph loader
    Assets.loader.parsers.push(hygraphLoader)

    ctx = $gsap.context(() => {
        $gsap.registerPlugin(ScrollTrigger)

        // Vertical blind reveal effect for stepper images
        $gsap.utils.toArray('.project-stepper-image-reveal').forEach((imageContainer: any) => {
            // Set initial state - hidden with scale
            $gsap.set(imageContainer, {
                '--position': '0%',
                opacity: 0,
                scale: 1.05,
            })

            // Animate the mask position on scroll
            $gsap.to(imageContainer, {
                '--position': '100%',
                opacity: 1,
                scale: 1,
                duration: .5,
                ease: 'power1.out',
                scrollTrigger: {
                    trigger: imageContainer,
                    start: 'top 85%',
                    end: 'top 35%',
                    toggleActions: 'play none none reverse'
                }
            })
        })
    })

    // Setup PIXI effects after a short delay to ensure DOM is ready
    setTimeout(async () => {
        const prevCanvas = document.querySelector('.prev-pixi-canvas') as HTMLCanvasElement
        const nextCanvas = document.querySelector('.next-pixi-canvas') as HTMLCanvasElement

        if (prevCanvas && nextCanvas) {
            await setupPixiEffect(prevCanvas, props.prevImg, false)
            await setupPixiEffect(nextCanvas, props.nextImg, true)
        }
    }, 100)
})

onUnmounted(() => {
    ctx.revert()
    if (prevPixiApp) prevPixiApp.destroy()
    if (nextPixiApp) nextPixiApp.destroy()
})
</script>

<template>
    <div class="project-stepper-wrapper">
        <CommonAbstract class="stepper__label" :label="'Explore  Archive'" :className="'stepper__intro'" />
        <main class="project-stepper">
            <div class="project-stepper__prev">
                <div class="project-stepper-image-reveal">
                    <NuxtLink :to="prev" class="action" data-name="proj" data-text="Previous">
                        <NuxtImg :src="prevImg" provider="hygraph" alt="Project image" format="png"
                            sizes="sm:100vw md:40vw lg:35vw xl:80vw" densities="x1 x2" />
                        <canvas class="prev-pixi-canvas pixi-overlay"></canvas>
                    </NuxtLink>
                </div>
                <h3 class="project-stepper__name split-proj-w">{{ prevName }}</h3>
                <p class="project-stepper__synop">{{ prevSynop[0] }}</p>
            </div>
            <div class="project-stepper__next">
                <div class="project-stepper-image-reveal">
                    <NuxtLink :to="next" class="action" data-name="proj" data-text="Next">
                        <NuxtImg :src="nextImg" provider="hygraph" alt="Project image" format="png"
                            sizes="sm:100vw md:70vw lg:35vw xl:80vw" densities="x1 x2" />
                        <canvas class="next-pixi-canvas pixi-overlay"></canvas>
                    </NuxtLink>
                </div>
                <h3 class="project-stepper__name split-proj-w ">{{ nextName }}</h3>
                <p class="project-stepper__synop">{{ nextSynop[0] }}</p>
            </div>
        </main>
    </div>
</template>

<style scoped lang="scss">
/* Eliminate any baseline gaps */

img {
    display: block;
    width: 100%;
    height: 100%;
    pointer-events: none;
    font-size: 0;
}

/* Position canvas absolutely to prevent layout interference */
.pixi-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100% !important;
    height: 100% !important;
    z-index: 9999;
    -o-object-fit: cover;
    object-fit: cover;
    pointer-events: auto;
    padding: 0;
    margin: 0;
}

/* Vertical blind reveal effect */
.project-stepper-image-reveal {
    position: relative;
    overflow: hidden;
    --position: 0%;
    /* Eliminate any font-related spacing */
    font-size: 0;
    line-height: 0;
}

/* Ensure NuxtLink containers don't expand beyond image size */
.project-stepper-image-reveal .action {
    display: inline-block;
    position: relative;
    vertical-align: top;
}

.project-stepper-image-reveal::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg,
            transparent var(--position),
            $primary calc(var(--position) + 1%),
            $primary calc(var(--position) + 2%),
            transparent calc(var(--position) + 3%));
    z-index: 2;
    pointer-events: none;
    contain: layout style;
}

.project-stepper-image-reveal img {
    transition: opacity 0.5s ease;
}

.project-stepper-wrapper {
    position: relative;
    padding: $px-16-spacer;

    @include this-and-above('sm') {
        padding: $px-128-spacer 0;
    }

    @include this-and-above('md') {
        padding: $px-128-spacer 0;
    }

    @include this-and-above('xl') {
        padding: $px-128-spacer 0;
    }

    @include this-and-above('xxl') {
        padding: $px-128-spacer 0;
    }
}

.project-stepper {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: $px-64-spacer;
    color: $secondary;

    &__synop {
        font-size: clamped(16px, 20px, 380px, 1920px);
    }

    @include this-and-above('md') {
        column-gap: $px-32-spacer;
    }

    @include this-and-above('md') {
        flex-flow: row;
    }

    &__prev {
        flex: 1;
    }

    &__next {
        flex: 1;
    }

    &__name {
        margin-top: $px-16-spacer;
    }
}
</style>