<script setup lang="ts">
  import * as PIXI from 'pixi.js'
  import { Assets, DisplacementFilter } from 'pixi.js'

  const pixiCtx = useTemplateRef<any>('pixi')
  const { $gsap } = useNuxtApp()

  const emit = defineEmits<{
    loaded: []
  }>()

  let app: PIXI.Application
  let displaceSprite: PIXI.Sprite
  let imageSprite: PIXI.Sprite
  let filter: DisplacementFilter
  let rippleTimeout: NodeJS.Timeout | null = null
  let rippleAnimation: gsap.core.Timeline | null = null

  const resizeToCover = (sprite: PIXI.Sprite) => {
    // Ensure app and texture are loaded
    if (!app?.renderer || !app.screen || !sprite.texture?.source) return

    const screenWidth = app.screen.width
    const screenHeight = app.screen.height
    const textureWidth = sprite.texture.width
    const textureHeight = sprite.texture.height

    // Calculate ratio to "cover" the screen (like background-size: cover)
    const scale = Math.max(
      screenWidth / textureWidth,
      screenHeight / textureHeight
    )

    sprite.scale.set(scale)
    sprite.anchor.set(0.5)
    sprite.x = screenWidth / 2
    sprite.y = screenHeight / 2
  }

  /**
   * Create a ripple effect at a random position
   */
  const createRipple = () => {
    if (!displaceSprite || !filter || !app || !app.screen) return

    // 1. Position the ripple
    const randomX = Math.random() * app.screen.width
    const randomY = Math.random() * app.screen.height

    displaceSprite.position.set(randomX, randomY)
    displaceSprite.scale.set(0) // Start at zero size
    displaceSprite.alpha = 1

    // 2. Set high initial distortion
    filter.scale.set(60)

    // 3. Animate size and intensity simultaneously
    rippleAnimation = $gsap
      .timeline({
        onComplete: scheduleNextRipple,
      })
      .to(displaceSprite.scale, {
        x: 2.5, // Physical ripple size
        y: 2.5,
        duration: 1.5,
        ease: 'power1.out',
      })
      .to(
        filter.scale,
        {
          x: 0, // Fade out the warping intensity
          y: 0,
          duration: 1.5,
          ease: 'power2.out',
        },
        0
      ) // Start at same time as scale
      .to(
        displaceSprite,
        {
          alpha: 0,
          duration: 0.5,
        },
        '-=0.5'
      ) // Fade out sprite at the end
  }

  /**
   * Schedule the next ripple with random delay (2-4 seconds)
   */
  const scheduleNextRipple = () => {
    if (rippleTimeout) {
      clearTimeout(rippleTimeout)
    }

    // Random delay between 2000ms (2s) and 4000ms (4s)
    const delay = 2000 + Math.random() * 2000

    rippleTimeout = setTimeout(() => {
      createRipple()
    }, delay)
  }

  /**
   * Initialize PIXI and start ripple effects
   */
  onMounted(async () => {
    if (import.meta.client) {
      app = new PIXI.Application()

      /* Initialize the application, full screen */
      await app.init({
        backgroundAlpha: 0,
        canvas: pixiCtx.value,
        resizeTo: window,
        autoDensity: true, // Handles high DPI displays
      })

      const image = await Assets.load('/img/moon-contact.jpg')
      imageSprite = PIXI.Sprite.from(image)
      // Set pos top left
      imageSprite.position.set(0, 0)
      // And set origin point (the handle) as well
      imageSprite.anchor.set(0, 0)

      const imageMap = await Assets.load('/img/displacemap.png')
      displaceSprite = PIXI.Sprite.from(imageMap)

      // Emit loaded event when both images are ready
      emit('loaded')

      app.stage.addChild(imageSprite)
      app.stage.addChild(displaceSprite)

      filter = new DisplacementFilter({
        sprite: displaceSprite,
        scale: 0, // 1. Start at 0
      })

      app.stage.filters = [filter]

      displaceSprite.anchor.set(0.5)
      displaceSprite.alpha = 0 // Start invisible

      // Initial resize to fill screen
      resizeToCover(displaceSprite)
      resizeToCover(imageSprite)

      app.renderer.on('resize', () => {
        if (app && app.screen && displaceSprite) {
          displaceSprite.setSize(app.screen.width, app.screen.height)
          resizeToCover(displaceSprite)
          resizeToCover(imageSprite)
        }
      })

      // Start the first ripple after a 2 second delay
      setTimeout(() => {
        createRipple()
      }, 2000)
    }
  })

  onUnmounted(() => {
    /* Clean up animations and timeouts */
    if (rippleAnimation) {
      rippleAnimation.kill()
    }

    if (rippleTimeout) {
      clearTimeout(rippleTimeout)
    }

    /* Clean up PIXI resources */
    if (app) {
      /* Remove event listeners from stage */
      if (app.stage) {
        app.stage.removeAllListeners()
        app.stage.filters = []
      }

      /* Destroy individual PIXI objects */
      filter?.destroy()
      imageSprite?.destroy()
      displaceSprite?.destroy()

      /* Destroy the application */
      app.destroy()
    }
  })
</script>

<template>
  <div class="canvas-wrapper">
    <canvas ref="pixi"></canvas>
  </div>
</template>

<style lang="scss" scoped>
  .canvas-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 1s ease-out;

    &.fade-in {
      opacity: 1;
    }
  }
</style>
