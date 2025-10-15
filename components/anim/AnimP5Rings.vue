<script setup lang="ts">
  const colorMode = useColorMode()
  let p5Instance: any = null
  let observer: IntersectionObserver | null = null

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
      
      /* Detect Firefox for performance optimization */
      const isFirefox = navigator.userAgent.toLowerCase().includes('firefox')

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
      
      /* Firefox-only Intersection Observer for performance */
      if (isFirefox) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              console.log('Parallax intersection:', entry.isIntersecting, entry.intersectionRatio)
              if (entry.isIntersecting) {
                /* Pause animation when parallax enters viewport */
                console.log('Pausing P5 rings animation')
                if (p5Instance) p5Instance.noLoop()
              } else {
                /* Resume animation when parallax leaves viewport */
                console.log('Resuming P5 rings animation')
                if (p5Instance) p5Instance.loop()
              }
            })
          },
          {
            threshold: 0.05, /* Trigger when parallax is 5% visible */
            rootMargin: '0px 0px 0px 0px', /* No margin - detect exact entry */
          }
        )
        
        /* Wait for DOM to be ready, then observe the parallax section */
        nextTick(() => {
          const parallaxSection = document.querySelector('.parallax__wrapper')
          if (parallaxSection && observer) {
            console.log('Observing parallax section for P5 rings')
            observer.observe(parallaxSection)
          } else {
            console.warn('Parallax section not found for P5 rings observer')
          }
        })
      }

    }
  })

  onUnmounted(() => {
    /* Clean up Intersection Observer */
    if (observer) {
      observer.disconnect()
      observer = null
    }
    
    /* Clean up P5 instance */
    if (p5Instance) {
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
