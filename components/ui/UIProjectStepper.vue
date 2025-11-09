<script setup lang="ts">
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  import * as PIXI from 'pixi.js'
  import { Assets, DisplacementFilter } from 'pixi.js'
  import { useHygraphParser } from '~/composable/useHygraphParser'

  /**
   * We Swedes like neat and tidy interface typing
   * Two sugars, black.
   */
  interface Props {
    prevImg: string
    nextImg: string
    prev: string
    next: string
    prevName: string
    nextName: string
    prevSynop: string[]
    nextSynop: string[]
  }

  const props = withDefaults(defineProps<Props>(), {
    prevImg: '',
    nextImg: '',
    prev: '',
    next: '',
    prevName: '',
    nextName: '',
    prevSynop: () => [],
    nextSynop: () => [],
  })

  const { $gsap } = useNuxtApp()
  const { hygraphLDR } = useHygraphParser()

  let ctx: gsap.Context
  let prevPixiApp: PIXI.Application
  let nextPixiApp: PIXI.Application
  let prevDisplaceSprite: PIXI.Sprite
  let nextDisplaceSprite: PIXI.Sprite
  let prevImageSprite: PIXI.Sprite
  let nextImageSprite: PIXI.Sprite

  /* Template refs */
  const prevCanvas = useTemplateRef<HTMLCanvasElement>('prevCanvas')
  const nextCanvas = useTemplateRef<HTMLCanvasElement>('nextCanvas')

  /* Setup PIXI displacement effect for stepper images */
  const setupPixiEffect = async (
    canvasElement: HTMLCanvasElement,
    imageHandle: string,
    isNext: boolean = false
  ) => {
    const app = new PIXI.Application()
    const pixelRatio = window.devicePixelRatio || 1

    /* Get the actual image dimensions from the img element in the same container */
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
      resizeTo:
        parentElement ||
        window /* Enable auto-resize to parent container or window */,
    })

    /* Construct proper Hygraph image URL */
    const imageUrl = `https://eu-west-2.graphassets.com/cm4tev3k1008n01uo6egngvzu/${imageHandle}`
    const image = await Assets.load(imageUrl)
    const imageSprite = PIXI.Sprite.from(image)

    /* Make imageSprite fill the canvas using container dimensions */
    imageSprite.width = containerWidth
    imageSprite.height = containerHeight
    imageSprite.position.set(0, 0)
    imageSprite.anchor.set(0, 0)

    const displacementTexture = await Assets.load({
      src: '/img/displacemap-2.jpg',
      format: 'jpg',
    })
    const displaceSprite = PIXI.Sprite.from(displacementTexture)

    app.stage.interactive = true
    app.stage.addChild(imageSprite)
    app.stage.addChild(displaceSprite)

    const filter = new DisplacementFilter(displaceSprite)
    app.stage.filters = [filter]
    filter.scale.set(0) /* Start with no displacement */
    displaceSprite.anchor.set(0.5)
    displaceSprite.setSize(containerWidth, containerHeight)

    let hasMouseMoved = false

    const activateDisplacement = (e: any) => {
      /* Activate displacement on first interaction */
      if (!hasMouseMoved) {
        filter.scale.set(100)
        hasMouseMoved = true
      }
      displaceSprite.position.set(e.data.global.x - 25, e.data.global.y)
    }

    const resetDisplacement = () => {
      /* Reset displacement when mouse leaves */
      if (hasMouseMoved) {
        filter.scale.set(0)
        hasMouseMoved = false
      }
    }

    app.stage
      .on('mousemove', activateDisplacement)
      .on('mouseout', resetDisplacement)
      .on('mouseleave', resetDisplacement)

    /* Store references */
    if (isNext) {
      nextPixiApp = app
      nextDisplaceSprite = displaceSprite
      nextImageSprite = imageSprite
    } else {
      prevPixiApp = app
      prevDisplaceSprite = displaceSprite
      prevImageSprite = imageSprite
    }

    return { app, displaceSprite }
  }

  /* Debounced resize handler */
  const handleResize = () => {
    if (prevPixiApp && prevImageSprite && prevCanvas.value) {
      const prevParent = prevCanvas.value.parentElement as HTMLElement
      const prevImg = prevParent?.querySelector('img') as HTMLImageElement

      if (prevImg) {
        const newWidth = prevImg.offsetWidth
        const newHeight = prevImg.offsetHeight

        prevPixiApp.renderer.resize(newWidth, newHeight)
        prevImageSprite.width = newWidth
        prevImageSprite.height = newHeight
        prevDisplaceSprite.setSize(newWidth, newHeight)
      }
    }

    if (nextPixiApp && nextImageSprite && nextCanvas.value) {
      const nextParent = nextCanvas.value.parentElement as HTMLElement
      const nextImg = nextParent?.querySelector('img') as HTMLImageElement

      if (nextImg) {
        const newWidth = nextImg.offsetWidth
        const newHeight = nextImg.offsetHeight

        nextPixiApp.renderer.resize(newWidth, newHeight)
        nextImageSprite.width = newWidth
        nextImageSprite.height = newHeight
        nextDisplaceSprite.setSize(newWidth, newHeight)
      }
    }
  }

  let resizeTimeout: NodeJS.Timeout
  const debouncedResize = () => {
    clearTimeout(resizeTimeout)
    resizeTimeout = setTimeout(handleResize, 150)
  }

  onMounted(async () => {
    /* Register the custom Hygraph loader */
    Assets.loader.parsers.push(hygraphLDR)

    ctx = $gsap.context(() => {
      $gsap.registerPlugin(ScrollTrigger)

      /* Vertical blind reveal effect for stepper images */
      $gsap.utils
        .toArray('.project-stepper-image-reveal')
        .forEach((imageContainer: any) => {
          /* Set initial state - hidden with scale */
          $gsap.set(imageContainer, {
            opacity: 0,
            scale: 1.05,
          })

          /* Animate the mask position on scroll */
          $gsap.to(imageContainer, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: imageContainer,
              start: 'top 85%',
              end: 'top 35%',
              toggleActions: 'play none none reverse',
            },
          })
        })
    })

    /* Setup PIXI effects immediately - DOM should be ready by onMounted */
    nextTick(async () => {
      if (prevCanvas.value && nextCanvas.value) {
        /* Run both PIXI setups in parallel instead of sequential */
        await Promise.all([
          setupPixiEffect(prevCanvas.value, props.prevImg, false),
          setupPixiEffect(nextCanvas.value, props.nextImg, true),
        ])
      }
    })

    window.addEventListener('resize', debouncedResize)
  })

  onUnmounted(() => {
    ctx?.revert()
    if (prevPixiApp) prevPixiApp.destroy()
    if (nextPixiApp) nextPixiApp.destroy()
    window.removeEventListener('resize', debouncedResize)
  })
</script>

<template>
  <div class="project-stepper-wrapper">
    <h1>Explore Archive</h1>
    <main class="project-stepper">
      <div class="project-stepper__prev">
        <div class="project-stepper-image-reveal">
          <NuxtLink :to="prev" class="action" data-name="proj" data-text="Prev">
            <NuxtImg
              :src="prevImg"
              provider="hygraph"
              alt="Project image"
              format="png"
              sizes="sm:100vw md:40vw lg:35vw xl:80vw"
              densities="x1 x2"
            />
            <canvas
              ref="prevCanvas"
              class="prev-pixi-canvas pixi-overlay"
            ></canvas>
          </NuxtLink>
        </div>
        <h3 class="project-stepper__name split-proj-w">{{ prevName }}</h3>
        <p class="project-stepper__synop">{{ prevSynop[0] }}</p>
      </div>
      <div class="project-stepper__next">
        <div class="project-stepper-image-reveal">
          <NuxtLink :to="next" class="action" data-name="proj" data-text="Next">
            <NuxtImg
              :src="nextImg"
              provider="hygraph"
              alt="Project image"
              format="png"
              sizes="sm:100vw md:40vw lg:35vw xl:80vw"
              densities="x1 x2"
            />
            <canvas
              ref="nextCanvas"
              class="next-pixi-canvas pixi-overlay"
            ></canvas>
          </NuxtLink>
        </div>
        <h3 class="project-stepper__name split-proj-w">{{ nextName }}</h3>
        <p class="project-stepper__synop">{{ nextSynop[0] }}</p>
      </div>
    </main>
  </div>
</template>

<style scoped lang="scss">
  /* Eliminate any baseline gaps */

  h3 {
    margin-bottom: 0;
  }

  img {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 2048/1150;
    object-fit: cover;
    pointer-events: auto;
    touch-action: pan-y;
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
    pointer-events:none;
    padding: 0;
    margin: 0;
  }

  canvas {
    pointer-events: none;
  }

  .project-stepper-wrapper {
    position: relative;
    padding: $px-64-spacer 0;

    @include this-and-above('sm') {
      padding: $px-64-spacer 0;
    }

    @include this-and-above('md') {
      padding: $px-64-spacer 0;
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
       margin-left: $px-16-spacer;
      font-family: $sans-ui-mono;
      font-size: clamped(12px, 14px, 380px, 1920px);
    }

    &__name {
       margin-left: $px-16-spacer;
      font-size: clamped(16px, 18px, 380px, 1920px);
      font-family: $sans-ui-mono;
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
