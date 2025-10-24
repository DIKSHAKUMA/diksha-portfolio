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
  const hslToRgb = (h: number, s: number, l: number): [number, number, number] => {
    l /= 100
    const a = s * Math.min(l, 1 - l) / 100
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
          hslToRgb(baseHue, baseSat + 10, 15), /* Darker teal */
          hslToRgb(baseHue, baseSat + 5, 25),  /* Medium teal */
          hslToRgb(baseHue, baseSat, 35),      /* Lighter teal */
          hslToRgb(baseHue, baseSat + 15, 20), /* Rich teal */
        ]
      }
      /* Dark mode: Use lighter shades of the teal-blue */
      return [
        hslToRgb(baseHue, baseSat, 40),      /* Light teal */
        hslToRgb(baseHue, baseSat + 10, 50), /* Bright teal */
        hslToRgb(baseHue, baseSat + 5, 30),  /* Medium teal */
        hslToRgb(baseHue, baseSat + 20, 45), /* Vibrant teal */
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

            /* Create radiating star rays */
            const numRays = Math.max(6, Math.floor(i * 0.6)) /* Fewer rays for cleaner star effect */
            for (let j = 0; j < numRays; j++) {
              const rayAngle = (j / numRays) * p.TWO_PI
              
              /* Dynamic spacing based on screen size */
              const isMobile = p.width < 768
              const baseSpace = isMobile ? 8 : 15
              
              /* Create multiple dots along each ray */
              const dotsPerRay = Math.max(2, Math.floor(i * 0.4))
              for (let k = 1; k <= dotsPerRay; k++) {
                const rayProgress = k / dotsPerRay
                const rayLength = baseSpace * i * rayProgress
                
                /* Add pulsing motion to the rays */
                const pulse = p.sin(time * 2 + i * 0.5 + rayAngle + rayProgress * p.PI) * 0.2
                const finalRadius = rayLength * (1 + pulse)
                
                /* Vary dot size along the ray - smaller towards center, bigger at tips */
                const baseSize = isMobile ? 2 : 4
                const rayTipMultiplier = 0.5 + rayProgress * 1.5 /* Grow towards ray tips */
                const size = (baseSize * rayTipMultiplier) + p.sin(i * 0.3 + timeForSize) * 1.5

                p.ellipse(
                  finalRadius * p.cos(rayAngle),
                  finalRadius * p.sin(rayAngle),
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
              if (entry.isIntersecting) {
                /* Pause animation when parallax enters viewport */
                if (p5Instance) p5Instance.noLoop()
              } else {
                /* Resume animation when parallax leaves viewport */
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
