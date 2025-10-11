<script setup lang="ts">
  const colorMode = useColorMode()
  let p5Instance: any = null
  let isVisible = true /* Track visibility state */

  /* We used Pixi and GSAP, now lets use P5 library, but stay on theme! */

  const getCurrentBgColor = () => {
    if (colorMode.preference === 'light') {
      return '#f3f3f3'
    }
    return '#171717'
  }

  /* Function to get ring colors based on color mode */
  const getRingColors = () => {
    if (typeof window !== 'undefined') {
      /* If primary is light (#faf7ff), we're in light mode - use black variations */
      if (colorMode.preference === 'light') {
        return [
          [23, 23, 23], /* #171717 - your black */
          [80, 80, 80], /* even lighter */
          [23, 23, 23], /* back to black for smooth cycling */
        ]
      }
      /* Dark mode - use original brand colors */
      return [
        [250, 247, 255], /* secondary light (#faf7ff) */
        [255, 240, 232], /* accent1 light (#fff0e8) */
        [74, 68, 83], /* accent2 dark (#4a4453) */
        [250, 247, 255], /* secondary light again for smooth cycling */
      ]
    }
    /* Fallback to dark mode colors */
    return [
      [250, 247, 255], /* secondary light (#faf7ff) */
      [255, 240, 232], /* accent1 light (#fff0e8) */
      [74, 68, 83], /* accent2 dark (#4a4453) */
      [250, 247, 255], /* secondary light again for smooth cycling */
    ]
  }

  onMounted(async () => {
    if (import.meta.client) {
      const p5 = await import('p5')
      const rings = 20
      let frameCount = 0

      /* Set up Intersection Observer to watch timeline section: Keep Firefox happy */
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            /* When timeline section is visible, pause rings animation */
            const shouldPause = entry.isIntersecting
            if (p5Instance) {
              if (shouldPause) {
                p5Instance.noLoop() /* Pause animation when timeline is visible */
              } else {
                p5Instance.loop() /* Resume animation when timeline not visible */
              }
            }
            isVisible = !shouldPause /* Invert logic for draw function */
          })
        },
        {
          threshold: 0,
          rootMargin: '0px 0px -20% 0px', /* Trigger when timeline is 20% above bottom of viewport */
        }
      )

      /* Wait for DOM to be ready, then observe parallax section */
      nextTick(() => {
        const parallaxElement = document.querySelector('.parallax__wrapper')
        if (parallaxElement) {
          observer.observe(parallaxElement)
        } else {
          console.warn(
            '⚠ ViewParallaxAbout .parallax__wrapper not found - P5 rings will run continuously'
          )
        }
      })

      p5Instance = new p5.default((p: any) => {
        p.setup = () => {
          /* Reduce canvas height on mobile to give space for title */
          const isMobile = window.innerWidth < 768
          const canvasHeight = isMobile ? window.innerHeight * 0.75 : window.innerHeight
          const canvas = p.createCanvas(window.innerWidth, canvasHeight)
          canvas.parent('rings')
          p.background(getCurrentBgColor()) /* Dynamic background from color mode */
          p.noStroke()
          p.colorMode(p.RGB, 255) /* Switch to RGB for brand colors */
          p.pixelDensity(1) /* Force 1:1 pixel ratio for Firefox performance */
          p.frameRate(24) /* Reduce to 24fps for better Firefox performance */
        }

        p.draw = () => {
          /* Only draw if visible - extra safety check */
          if (!isVisible) return

          p.background(getCurrentBgColor()) /* Dynamic background from color mode */

          p.push()
          /* Center rings vertically on mobile, keep centered on desktop */
          const isMobile = p.width < 768
          /* For mobile: use actual viewport center, not canvas center */
          const centerY = isMobile ? (window.innerHeight * 0.45) : p.height / 2
          p.translate(p.width / 2, centerY)

          const time = p.millis() * 0.001 /* Use seconds for smoother animation */
          const speed = time * 0.5

          /* Pre-calculate values to reduce Firefox math overhead */
          const timeForAlpha = time * 2
          const timeForSize = time * 3

          for (let i = 1; i < rings; i++) {
            /* Start from 1, render all rings */
            p.push()
            p.rotate(speed * (i * 0.02))

            /* Cycle through colors based on current color mode */
            const currentColors = getRingColors()
            const colorIndex = Math.floor(
              (time * 2 + i * 0.5) % currentColors.length
            )
            const color = currentColors[colorIndex]
            /* Simplified alpha calculation for Firefox */
            const alpha = 150 + 30 * p.sin(timeForAlpha + i * 0.3) /* Reduced amplitude */
            p.fill(color[0], color[1], color[2], alpha)

            /* Optimized dots per ring */
            const dotsPerRing = Math.max(4, Math.floor(i * 1.2))
            for (let j = 0; j < dotsPerRing; j++) {
              const angle = (j / dotsPerRing) * p.TWO_PI
              /* Dynamic spacing based on screen size */
              const isMobile = p.width < 768
              const space = isMobile ? 8 : 15 /* Smaller spacing on mobile */
              const radius = space * i
              /* Smaller dots on mobile */
              const baseSize = isMobile ? 3 : 5
              const size = baseSize + 2 * p.sin(i * 0.3 + timeForSize)

              p.ellipse(
                radius * p.cos(angle),
                radius * p.sin(angle),
                size,
                size
              )
            }
            p.pop()
          }
          p.pop()
        }

        p.windowResized = () => {
          /* Maintain mobile sizing on resize */
          const isMobile = window.innerWidth < 768
          const canvasHeight = isMobile ? window.innerHeight * 0.75 : window.innerHeight
          p.resizeCanvas(window.innerWidth, canvasHeight)
        }
      })

      /* Store observer reference for cleanup */
      p5Instance._observer = observer
    }
  })

  onUnmounted(() => {
    if (p5Instance) {
      /* Clean up intersection observer */
      if (p5Instance._observer) {
        p5Instance._observer.disconnect()
      }
      p5Instance.remove()
      p5Instance = null
    }
  })
</script>

<template>
  <div class="rings-wrapper">
    <section class="rings" id="rings"></section>
  </div>
</template>

<style scoped lang="scss">
  .rings-wrapper {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
  }

  /* Allow touch scrolling on mobile - prevent canvas from blocking scroll */
  :deep(canvas) {
    touch-action: pan-y; /* Allow vertical scrolling */
    pointer-events: none; /* Canvas doesn't need to capture pointer events */
  }
</style>
