<script setup lang="ts">
  const colorMode = useColorMode()
  let p5Instance: any = null
  let observer: IntersectionObserver | null = null

  /* We used Pixi and GSAP, now lets use P5 library, but stay on theme! */

  const getCurrentBgColor = () => {
    if (colorMode.value === 'light') {
      return '#dbdbdb'
    }
    return '#171717'
  }

  /* Helper function to convert HSL to RGB */
  const hslToRgb = (
    h: number,
    s: number,
    l: number
  ): [number, number, number] => {
    l /= 100
    const a = (s * Math.min(l, 1 - l)) / 100
    const f = (n: number) => {
      const k = (n + h / 30) % 12
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
      return Math.round(255 * color)
    }
    return [f(0), f(8), f(4)]
  }

  /* Function to get ring colors based on color mode - matching PIXI animation */
  const getRingColors = () => {
    if (typeof window !== 'undefined') {
      /* Base color from PIXI: #2f454b (HSL: h=194°, s=21%, l=24%) */
      const baseHue = 194
      const baseSat = 21

      if (colorMode.value === 'light') {
        /* Light mode: Use darker shades of the teal-blue */
        return [
          hslToRgb(baseHue, baseSat + 10, 15) /* Darker teal */,
          hslToRgb(baseHue, baseSat + 5, 25) /* Medium teal */,
          hslToRgb(baseHue, baseSat, 35) /* Lighter teal */,
          hslToRgb(baseHue, baseSat + 15, 20) /* Rich teal */,
        ]
      }
      /* Dark mode: Use lighter shades of the teal-blue */
      return [
        hslToRgb(baseHue, baseSat, 40) /* Light teal */,
        hslToRgb(baseHue, baseSat + 10, 50) /* Bright teal */,
        hslToRgb(baseHue, baseSat + 5, 30) /* Medium teal */,
        hslToRgb(baseHue, baseSat + 20, 45) /* Vibrant teal */,
      ]
    }
    /* Fallback to dark mode colors */
    return [
      hslToRgb(194, 21, 40),
      hslToRgb(194, 31, 50),
      hslToRgb(194, 26, 30),
      hslToRgb(194, 41, 45),
    ]
  }

  onMounted(async () => {
    if (import.meta.client) {
      const p5 = await import('p5')
      const rings = 20
      let frameCount = 0
      let cachedColors = getRingColors()
      let cachedBgColor = getCurrentBgColor()
      let isMobile = false

      const isFirefox = navigator.userAgent.toLowerCase().includes('firefox')

      p5Instance = new p5.default((p: any) => {
        p.setup = () => {
          isMobile = window.innerWidth < 768
          const canvasHeight = isMobile
            ? window.innerHeight * 0.75
            : window.innerHeight
          const canvas = p.createCanvas(window.innerWidth, canvasHeight)
          canvas.parent('rings')
          p.background(cachedBgColor)
          p.noStroke()
          p.colorMode(p.RGB, 255)
          p.pixelDensity(1)
          p.frameRate(24)
        }

        p.draw = () => {
          p.background(cachedBgColor)

          p.push()
          const centerY = isMobile ? window.innerHeight * 0.45 : p.height / 2
          p.translate(p.width / 2, centerY)

          const time = p.millis() * 0.001
          const speed = time * 0.5
          const timeForAlpha = time * 2
          const timeForSize = time * 3
          const baseSpace = isMobile ? 8 : 15
          const baseSize = isMobile ? 2 : 4

          for (let i = 1; i < rings; i++) {
            p.push()
            p.rotate(speed * (i * 0.02))

            const colorIndex = Math.floor(
              (time * 2 + i * 0.5) % cachedColors.length
            )
            const color = cachedColors[colorIndex]
            const alpha = 150 + 30 * p.sin(timeForAlpha + i * 0.3)
            p.fill(color[0], color[1], color[2], alpha)

            const numRays = Math.max(6, Math.floor(i * 0.6))
            for (let j = 0; j < numRays; j++) {
              const rayAngle = (j / numRays) * p.TWO_PI
              const cosAngle = p.cos(rayAngle)
              const sinAngle = p.sin(rayAngle)

              const dotsPerRay = Math.max(2, Math.floor(i * 0.4))
              for (let k = 1; k <= dotsPerRay; k++) {
                const rayProgress = k / dotsPerRay
                const rayLength = baseSpace * i * rayProgress

                const pulse =
                  p.sin(time * 2 + i * 0.5 + rayAngle + rayProgress * p.PI) *
                  0.2
                const finalRadius = rayLength * (1 + pulse)

                const rayTipMultiplier = 0.5 + rayProgress * 1.5
                const size =
                  baseSize * rayTipMultiplier +
                  p.sin(i * 0.3 + timeForSize) * 1.5

                p.ellipse(
                  finalRadius * cosAngle,
                  finalRadius * sinAngle,
                  size,
                  size
                )
              }
            }
            p.pop()
          }
          p.pop()
        }

        p.windowResized = () => {
          isMobile = window.innerWidth < 768
          const canvasHeight = isMobile
            ? window.innerHeight * 0.75
            : window.innerHeight
          p.resizeCanvas(window.innerWidth, canvasHeight)
        }
      })

      /* Watch for color mode changes and update cached values */
      watch(
        () => colorMode.value,
        () => {
          cachedColors = getRingColors()
          cachedBgColor = getCurrentBgColor()
        }
      )

      /* Intersection Observer to pause P5 rings when ViewParallaxAbout is halfway up */
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
              if (p5Instance) p5Instance.noLoop()
            } else {
              if (p5Instance) p5Instance.loop()
            }
          })
        },
        {
          threshold: [0, 0.5, 1] /* Trigger at 0%, 50%, and 100% visibility */,
          rootMargin: '0px 0px 0px 0px',
        }
      )

      /* Wait for DOM to be ready, then observe the parallax section */
      nextTick(() => {
        const parallaxSection = document.querySelector('.parallax__wrapper')
        if (parallaxSection && observer) {
          observer.observe(parallaxSection)
        } else {
          console.warn('P5 Rings: Parallax section not found for observer')
        }
      })
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
