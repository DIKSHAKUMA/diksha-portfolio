<script setup lang="ts">
  import * as PIXI from 'pixi.js'
  import { Assets, DisplacementFilter } from 'pixi.js'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  import { useFolioStore } from '~/store/useFolioStore'
  import { useHead } from '#imports' /* Nuxt composable for managing head tags */

  /* PINIA */
  const store = useFolioStore()

  useHead({
    link: [
      {
        rel: 'preload',
        as: 'image',
        href: '/img/front.webp',
        type: 'image/webp',
      },
    ],
  })

  const isMobile = ref(false)
  const { $gsap } = useNuxtApp()
  const pixiCtx = useTemplateRef<any>('pixi')
  const imgFrames = useTemplateRef<any>('imgFrames')
  const imagesWrapper = useTemplateRef<any>('imagesWrapper')
  const route = useRoute()

  let app: PIXI.Application
  let filter: DisplacementFilter
  let ripple: PIXI.Sprite
  let sprite: PIXI.Sprite
  let ctx: gsap.Context
  let pixiReady = false
  let rafId = 0
  let stopWatching: (() => void) | null = null
  let pixiDestroyed = false
  let resizeListener: (() => void) | null = null

  const checkIfMobile = () => {
    if (import.meta.client) {
      isMobile.value = window.innerWidth < 768
    }
  }

  /* Helper function to safely destroy PIXI resources */
  const destroyPixiResources = () => {
    if (pixiDestroyed || !app) return

    pixiDestroyed = true
    app.stage.filters = []
    filter?.destroy()
    sprite?.destroy()
    ripple?.destroy()
    app.destroy()
  }

  /* Function to set image dimensions to make sure canvas is initialized if user returns using back button */
  const setImageDimensions = () => {
    if (imgFrames.value && pixiCtx.value && pixiReady) {
      const canvasWidth = pixiCtx.value.clientWidth || 400
      // Maintain 4:3 aspect ratio to match 1600x1200 images
      const aspectRatio = 4 / 3
      const calculatedHeight = canvasWidth / aspectRatio

      imgFrames.value.style.width = canvasWidth + 'px'
      imgFrames.value.style.height = calculatedHeight + 'px'
    } else if (imgFrames.value && !pixiReady) {
      /* If PIXI isn't ready yet, wait for it; more solid than a setTimeout */
      const checkReady = () => {
        if (pixiReady) {
          setImageDimensions()
          $gsap.to(imagesWrapper.value, { duration: 0.5, autoAlpha: 1 })
        } else {
          rafId = requestAnimationFrame(checkReady)
        }
      }
      checkReady()
    }
  }

  /* Watch for route changes and reset dimensions */
  stopWatching = watch(
    () => route.path,
    (newPath, oldPath) => {
      nextTick(() => {
        setImageDimensions()
      })
    }
  )

  onMounted(async () => {
    if (import.meta.client) {
      // Note: Page-level component handles scrollTo(0) - don't duplicate here

      // Set initial mobile state
      checkIfMobile()

      // Add resize listener for both mobile check and image dimensions
      resizeListener = () => {
        checkIfMobile()
        setImageDimensions()
      }
      window.addEventListener('resize', resizeListener)

      pixiCtx.value.fillStyle = '#1E201E'

      $gsap.registerPlugin(ScrollTrigger)
      app = new PIXI.Application()

      /* Initialize the application */
      await app.init({
        backgroundAlpha: 0,
        canvas: pixiCtx.value,
        width: 400,
        height: 300,
      })

      const image = await Assets.load('/img/front.jpg')
      sprite = PIXI.Sprite.from(image)
      sprite.alpha = 0

      const displacer = await Assets.load('/img/displacemap.png')

      ripple = PIXI.Sprite.from(displacer)
      ripple.alpha = 0

      app.stage.addChild(sprite)
      app.stage.addChild(ripple)

      filter = new DisplacementFilter(ripple)
      app.stage.filters = [filter]

      sprite.anchor.set(0.5)

      /* Scale sprite to cover canvas dimensions (like object-fit: cover) */
      const scaleX = pixiCtx.value.width / sprite.texture.width
      const scaleY = pixiCtx.value.height / sprite.texture.height
      const scale = Math.max(scaleX, scaleY)
      sprite.scale.set(scale)

      ripple.anchor.set(0.5)
      ripple.scale.set(0.05)
      filter.scale.set(0) /* Start with no displacement effect */

      sprite.position.set(pixiCtx.value.width / 2, pixiCtx.value.height / 2)
      ripple.position.set(pixiCtx.value.width / 2, pixiCtx.value.height / 2)

      /* Mark PIXI as ready */
      pixiReady = true

      /* Set image dimensions using the shared function */
      setImageDimensions()

      /* Context! The friendly GSAP garbage collector */
      ctx = $gsap.context((self) => {
        /* For the sprite animate a pixi displacement pulse */
        let pixiTl = $gsap.timeline({ repeat: 0 })
        pixiTl
          .fromTo(sprite, { alpha: 0 }, { duration: 1, alpha: 1, delay: 1.5 })
          .fromTo(imagesWrapper.value, { opacity: 0 }, { opacity: 1 }, '<')
          .fromTo(
            filter.scale,
            { x: 0, y: 0 },
            { duration: 0.3, x: 100, y: 100 },
            'ripple'
          )
          .to(ripple.scale, { duration: 1.5, x: 1.5, y: 1.5 }, 'ripple')
          .to(filter.scale, { duration: 1.2, x: 0, y: 0 }, '-=0.3')
          .to(sprite, { duration: 1, alpha: 0 }, '+=1')
          .fromTo(
            imgFrames.value,
            { autoAlpha: 0 },
            { duration: 0.5, autoAlpha: 1 },
            '<'
          ) /* Start img-frames as sprite fades out */
          .to(
            pixiCtx.value,
            { duration: 0.1, alpha: 0 },
            '>'
          ) /* Hide canvas after sprite fades out */
          .call(() => {
            /* Destroy PIXI resources after animation completes */
            destroyPixiResources()
          })

        /* Move abstract wrapper up when user starts scrolling */
        $gsap.to('.front-header', {
          y: -40,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.hero-wrapper', // Use hero wrapper itself as trigger
            start: 'bottom bottom-=200', // Start when hero bottom is 200px from viewport bottom
            end: 'bottom top',
            scrub: 1,
          },
        })

        /* Fade out author intro */
        let authorTl = $gsap.timeline({
          /* Pin intro is actually in ViewProjects.vue; fade out author intro when pin intro moves above bottom of browser window */
          scrollTrigger: {
            trigger: '.about-wrapper',
            pinSpacing: true,
            start:
              'top bottom' /* when the top of the trigger hits the bottom of the viewport */,
            end: '+=50',
            scrub: 3,
          },
        })
      })
    }
  })

  onUnmounted(() => {
    /* Clean up animation frame if still pending */
    if (rafId) {
      cancelAnimationFrame(rafId)
    }

    /* Clean up route watcher */
    if (stopWatching) {
      stopWatching()
    }

    /* Clean up resize listener */
    if (resizeListener && import.meta.client) {
      window.removeEventListener('resize', resizeListener)
    }

    /* Clean up GSAP context */
    ctx?.revert()

    /* Clean up PIXI resources explicitly */
    destroyPixiResources()
  })
</script>

<template>
  <main class="hero-wrapper">
    <div class="pin">
      <div class="images-wrapper" ref="imagesWrapper">
        <div>
          <canvas class="img-pixi" ref="pixi" id="pixi"></canvas>
          <img
            class="img-frames"
            src="/img/front.webp"
            ref="imgFrames"
            width="400"
            height="300"
          />
        </div>
      </div>
    </div>
    <!--:className here is for gsap is-hero changes bottom margins for wrapper and header-->
    <CommonAbstract
      class="front-header"
      :label="store.data.intro?.heroIntroTitle"
      :delay="1"
      :desc="store.data.intro?.heroIntroDesc"
      :class-name="'home-intro'"
      :is-hero="true"
      :is-full-width="false"
      :is-secondary="false"
      :is-two-lines="!isMobile"
      :author="''"
      :date="''"
      :is-page-title="false"
    />
  </main>
</template>

<style lang="scss" scoped>
  .hero-wrapper {
    position: relative;
    min-height: 100vh;
    padding: 0 $px-16-spacer;
    @supports (height: 100svh) {
      min-height: 100svh;
    }

    @include this-and-above('md') {
      padding: 0 $px-64-spacer;
    }
  }

  .front-header {
    position: absolute;
    bottom: 0px;
    &--ios-safari {
      bottom: 0px;
    }
  }

  .images-wrapper {
    display: flex;
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    width: 60vw;
    max-width: 400px;

    @include this-and-above('md') {
      top:25%;
      width: 400px;
    }
  }

  .img-pixi {
    position: absolute;
    pointer-events: none;
  }

  .img-frames {
    position: relative;
    border: $primary solid 1px;
    aspect-ratio: 4 / 3;
    width: 100%;
    height: auto;
    border: none;
    border-radius: 12px;
  }

  canvas {
    width: 100%;
    height: auto;
    aspect-ratio: 4 / 3;
    border-radius: 12px;
  }
</style>
