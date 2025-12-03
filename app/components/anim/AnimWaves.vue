<script setup lang="ts">
  import * as PIXI from 'pixi.js'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'

  const isMobile = ref(false)
  const { $gsap } = useNuxtApp()
  const pixiCtx = useTemplateRef<any>('pixi')
  const route = useRoute()
  const colorMode = useColorMode()

  let ctx: gsap.Context

  let app: PIXI.Application
  let pixiReady = false
  let rafId = 0
  let stopWatching: (() => void) | null = null
  let pixiDestroyed = false
  let resizeListener: (() => void) | null = null
  let observer: IntersectionObserver | null = null
  let isWavesPaused = false
  let waves: Array<{
    graphics: PIXI.Graphics
    phase: number
    amplitude: number
    frequency: number
    speed: number
    colorOffset: number
    colorSpeed: number
  }> = []

  const checkIfMobile = () => {
    if (import.meta.client) {
      isMobile.value = window.innerWidth < 1024
    }
  }

  /* Helper function to safely destroy PIXI resources */
  const destroyPixiResources = () => {
    if (pixiDestroyed || !app) return

    pixiDestroyed = true
    waves.forEach((wave) => wave.graphics.destroy())
    waves = []
    app.destroy(true)
  }

  /* Helper function to convert HSL to hex color . */
  const hslToHex = (h: number, s: number, l: number): number => {
    // Okey, normalize to decimal
    l /= 100
    const a = (s * Math.min(l, 1 - l)) / 100
    const f = (n: number) => {
      const k = (n + h / 30) % 12
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
      return Math.round(255 * color)
    }
    const r = f(0)
    const g = f(8)
    const b = f(4)
    return (r << 16) | (g << 8) | b
  }

  /* Get color for wave segment based on position and time */
  const getWaveColor = (
    waveIndex: number,
    segmentRatio: number,
    time: number
  ): number => {
    const isLightMode = colorMode.value === 'light'

    if (isLightMode) {
      const baseHue = 194
      const baseSat = 16
      const baseLight = 65

      const lightnessOffset = waveIndex * 4
      const colorSpeed = 0.6 + waveIndex * 0.25

      const travelingLight =
        baseLight +
        lightnessOffset +
        /* 
        Using Math.sin(angle), the function expects the angle to repeat its behavior every 2pi radians. 
        Sometimes called a periodic effect. Great for creating smooth, continuous motion. And for notebook.
        */
        Math.sin(segmentRatio * Math.PI * 2 + time * colorSpeed) * 16
      const travelingSat =
        baseSat +
        Math.sin(segmentRatio * Math.PI * 3 + time * colorSpeed * 0.7) * 8

      const finalLight = Math.max(55, Math.min(85, travelingLight))
      const finalSat = Math.max(10, Math.min(25, travelingSat))

      return hslToHex(baseHue, finalSat, finalLight)
    } else {
      const baseHue = 200
      const baseSat = 25
      const baseLight = 5

      const lightnessOffset = waveIndex * 5
      const colorSpeed = 0.8 + waveIndex * 0.3

      // Create traveling shade effect with MUCH more contrast
      const travelingLight =
        baseLight +
        lightnessOffset +
        Math.sin(segmentRatio * Math.PI * 2 + time * colorSpeed) * 20
      const travelingSat =
        baseSat +
        Math.sin(segmentRatio * Math.PI * 3 + time * colorSpeed * 0.7) * 15

      // WIDER range for more dramatic shades of #2f454b
      const finalLight = Math.max(5, Math.min(50, travelingLight))
      const finalSat = Math.max(8, Math.min(45, travelingSat))

      return hslToHex(baseHue, finalSat, finalLight)
    }
  }

  /* Create animated sinus waves */
  const createWaves = () => {
    for (let i = 0; i < 6; i++) {
      const graphics = new PIXI.Graphics()
      const wave = {
        graphics,
        phase: Math.random() * Math.PI * 2,
        amplitude: 50 + Math.random() * 70,
        frequency: 0.005 + Math.random() * 0.01,
        speed: 0.01 + Math.random() * 0.02,
        colorOffset: i * 0.5,
        colorSpeed: 0.3 + Math.random() * 0.4,
      }

      waves.push(wave)
      app.stage.addChild(graphics)
    }
  }

  let cachedWidth = 0
  let cachedHeight = 0

  const animateWaves = () => {
    if (pixiDestroyed || !app || isWavesPaused) return

    const currentTime = Date.now() * 0.001

    if (
      cachedWidth !== app.screen.width ||
      cachedHeight !== app.screen.height
    ) {
      cachedWidth = app.screen.width
      cachedHeight = app.screen.height
    }

    waves.forEach((wave, index) => {
      wave.graphics.clear()
      const centerY = cachedHeight / 2 + (index - 2.5) * 20
      const segmentSize = 8

      /*
      x * wave.frequency determines the wave's position in its cycle
      + wave.phase shifts the wave left/right
      * wave.amplitude scales the height
      + centerY positions the wave vertically
        The wave is not moving in x; the phase is changing over time
      */

      const points = []
      for (let x = 0; x <= cachedWidth; x += segmentSize) {
        const y =
          centerY + Math.sin(x * wave.frequency + wave.phase) * wave.amplitude
        const segmentRatio = x / cachedWidth
        const segmentColor = getWaveColor(
          index,
          segmentRatio,
          currentTime + wave.colorOffset
        )
        points.push({ x, y, color: segmentColor })
      }

      for (let i = 0; i < points.length - 1; i++) {
        const current = points[i]
        const next = points[i + 1]

        wave.graphics.setStrokeStyle({
          width: 4,
          color: current!.color,
          alpha: 1,
        })
        wave.graphics.moveTo(current!.x, current!.y)
        wave.graphics.lineTo(next!.x, next!.y)
        wave.graphics.stroke()
      }

      wave.phase += wave.speed
    })
    // Request next frame using requestAnimationFrame cannot use PixiJS ticker here or it would keep adding up
    rafId = requestAnimationFrame(animateWaves)
  }

  /* Resize canvas to fit container */
  const resizeCanvas = () => {
    if (!app || !pixiCtx.value) return

    const width = window.innerWidth
    const height = window.innerHeight
    app.renderer.resize(width, height)
    cachedWidth = 0
    cachedHeight = 0
  }

  /* Watch for route changes and resize canvas */
  stopWatching = watch(
    () => route.path,
    (newPath, oldPath) => {
      nextTick(() => {
        resizeCanvas()
      })
    }
  )

  /* Watch for color mode changes and recreate waves */
  const stopColorModeWatching = watch(
    () => colorMode.value,
    (newMode, oldMode) => {
      if (pixiReady && app && !pixiDestroyed) {
        // Clear existing waves
        waves.forEach((wave) => wave.graphics.destroy())
        waves = []
        // Recreate with new colors
        createWaves()
      }
    }
  )

  onMounted(async () => {
    if (import.meta.client) {
      // Set initial mobile state
      checkIfMobile()

      // Add resize listener
      resizeListener = () => {
        checkIfMobile()
        resizeCanvas()
      }
      window.addEventListener('resize', resizeListener)

      $gsap.registerPlugin(ScrollTrigger)
      app = new PIXI.Application()

      /* Initialize the application */
      await app.init({
        backgroundAlpha: 0,
        canvas: pixiCtx.value,
        width: window.innerWidth,
        height: window.innerHeight,
        antialias: true,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
      })

      /* Create waves but delay animation start to avoid Venice blind collision */
      createWaves()

      /* Mark PIXI as ready but delay animation start */
      pixiReady = true

      // Delay wave animation to let Venice blind complete
      setTimeout(() => {
        if (!pixiDestroyed && app) {
          animateWaves()
        }
      }, 1200)

      /* Setup IntersectionObserver for parallax section */
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              isWavesPaused = true
            } else {
              isWavesPaused = false
              if (!pixiDestroyed && app) {
                animateWaves()
              }
            }
          })
        },
        {
          threshold: 0,
          rootMargin: '-50% 0px -50% 0px',
        }
      )

      nextTick(() => {
        const parallaxSection = document.querySelector('.parallax__wrapper')
        if (parallaxSection && observer) {
          observer.observe(parallaxSection)
        }
      })

      /* Resize canvas to fit */
      resizeCanvas()

      /* Context! The friendly GSAP garbage collector */
      ctx = $gsap.context((self) => {
        /* Fade in the canvas */
        $gsap.fromTo(
          pixiCtx.value,
          { opacity: 0 },
          { duration: 2, opacity: 1, delay: 1.5 }
        )
      })
    }
  })

  onUnmounted(() => {
    // Cancel any pending animation frame
    if (rafId) {
      cancelAnimationFrame(rafId)
    }
    /* Clean up route watcher */
    if (stopWatching) {
      stopWatching()
    }

    /* Clean up color mode watcher */
    if (stopColorModeWatching) {
      stopColorModeWatching()
    }

    /* Clean up resize listener */
    if (resizeListener && import.meta.client) {
      window.removeEventListener('resize', resizeListener)
    }

    /* Clean up IntersectionObserver */
    if (observer) {
      observer.disconnect()
      observer = null
    }

    /* Clean up GSAP context */
    ctx?.revert()

    /* Clean up PIXI resources explicitly */
    destroyPixiResources()
  })
</script>

<template>
    <div class="waves-container">
      <canvas class="waves-canvas" ref="pixi" id="pixi"></canvas>
    </div>
</template>

<style lang="scss" scoped>
  .waves-container {
    width: 100vw;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
  }

  .waves-canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 10;
  }
</style>
