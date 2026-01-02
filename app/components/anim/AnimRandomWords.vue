<script setup lang="ts">
  const colorMode = useColorMode()
  let p5Instance: any = null

  /* Octavio Paz */
  const words = [
    'Listen',
    'to',
    'me',
    'as',
    'one',
    'listens',
    'to',
    'the',
    'rain',
    'not',
    'attentive',
    'not',
    'distracted',
    'light',
    'footsteps',
    'thin',
    'drizzle',
    'water',
    'that',
    'is',
    'air',
    'air',
    'that',
    'is',
    'time',
    'the',
    'day',
    'is',
    'still',
    'leaving',
    'the',
    'night',
    'has',
    'yet',
    'to',
    'arrive',
    'figurations',
    'of',
    'mist',
    'at',
    'the',
    'turn',
    'of',
    'the',
    'corner',
    'figurations',
    'of',
    'time',
    'at',
    'the',
    'bend',
    'in',
    'this',
    'pause',
    'listen',
    'to',
    'me',
    'as',
    'one',
    'listens',
    'to',
    'the',
    'rain',
    'without',
    'listening',
    'hear',
    'what',
    'I',
    'say',
    'with',
    'eyes',
    'open',
    'inward',
    'asleep',
    'with',
    'all',
    'five',
    'senses',
    'awake',
    "it's",
    'raining',
    'light',
    'footsteps',
    'a',
    'murmur',
    'of',
    'syllables',
    'air',
    'and',
    'water',
    'words',
    'with',
    'no',
    'weight',
    'what',
    'we',
    'are',
    'and',
    'are',
    'the',
    'days',
    'and',
    'years',
    'this',
    'moment',
    'weightless',
    'time',
    'and',
    'heavy',
    'sorrow',
    'listen',
    'to',
    'me',
    'as',
    'one',
    'listens',
    'to',
    'the',
    'rain',
    'wet',
    'asphalt',
    'is',
    'shining',
    'steam',
    'rises',
    'and',
    'walks',
    'away',
    'night',
    'unfolds',
    'and',
    'looks',
    'at',
    'me',
    'you',
    'are',
    'you',
    'and',
    'your',
    'body',
    'of',
    'steam',
    'you',
    'and',
    'your',
    'face',
    'of',
    'night',
    'you',
    'and',
    'your',
    'hair',
    'unhurried',
    'lightning',
    'you',
    'cross',
    'the',
    'street',
    'and',
    'enter',
    'my',
    'forehead',
    'footsteps',
    'of',
    'water',
    'across',
    'my',
    'eyes',
    'listen',
    'to',
    'me',
    'as',
    'one',
    'listens',
    'to',
    'the',
    'rain',
  ]

  const wordCount = 15
  let hue: number
  let position: number
  let wordObjects: any[] = []

  const getCurrentBgColor = () => {
    if (colorMode.value === 'light') {
      return [250, 250, 250] /* #fafafa in RGB */
    }
    return [24, 24, 27] /* #18181b in RGB */
  }

  onMounted(async () => {
    if (import.meta.client) {
      const p5 = await import('p5')

      if (!p5Instance) {
        // Only start if not already destroyed
        p5Instance = new p5.default((p: any) => {
          p.setup = () => {
            /* Create canvas with full window dimensions */
            const canvas = p.createCanvas(window.innerWidth, window.innerHeight)
            canvas.parent('random-words')

            /* Performance optimizations */
            p.pixelDensity(
              1
            ) /* Force 1:1 pixel ratio for Firefox performance */
            p.frameRate(24) /* Reduce to 24fps for better Firefox performance */
            p.noStroke()

            /* Set color mode and text properties */
            p.colorMode(p.RGB, 255)
            p.textAlign(p.CENTER)
            p.textFont('TWK Everett')

            /* Define hue as a random value */
            hue = p.random(180, 360)

            /* Define the random starting point for selecting words */
            position = p.floor(p.random(0, words.length - wordCount))

            /* Create word objects with floating properties
             * Reserve minimal space for CommonAbstract (about 120px from bottom) */
            const reservedBottomSpace = 120
            wordObjects = []
            for (let i = 0; i < wordCount; i++) {
              const randomWord = words[position + i] || words[i % words.length]
              wordObjects.push({
                text: randomWord,
                x: p.random(p.width),
                y: p.random(
                  0,
                  p.height - reservedBottomSpace
                ) /* Avoid bottom 200px */,
                size: p.random(48, 144),
                offsetX: p.random(0, p.TWO_PI),
                offsetY: p.random(0, p.TWO_PI),
                speed: p.random(0.001, 0.003),
              })
            }
          }

          p.draw = () => {
            /* Set background based on color mode */
            const bgColor = getCurrentBgColor()
            p.background(bgColor[0], bgColor[1], bgColor[2])

            /* Cache time calculations once per frame for performance */
            const frameTime = p.millis()
            const time = frameTime * 0.001

            /* Draw floating words with dynamic colors */
            for (let i = 0; i < wordObjects.length; i++) {
              const word = wordObjects[i]
              p.textSize(word.size)

              /* Calculate floating position - cached time */
              const floatX =
                word.x + p.sin(frameTime * word.speed + word.offsetX) * 20
              const floatY =
                word.y + p.cos(frameTime * word.speed + word.offsetY) * 15

              /* Simplified color calculation for performance */
              const colorShift = p.sin(time + word.offsetX) * 30

              if (colorMode.value === 'light') {
                /* Light mode: variations of accent1 (#4a4453) with opacity */
                p.fill(
                  74 + colorShift,
                  68 + colorShift * 0.8,
                  83 + colorShift * 1.2,
                  50 /* Add opacity (0-255, 145 = ~57% opacity) */
                )
              } else {
                /* Dark mode: variations of accent2 (#fff0e8) with opacity */
                p.fill(
                  255 - colorShift * 0.3,
                  240 + colorShift * 0.2,
                  232 + colorShift * 0.5,
                  50 /* Add opacity (0-255, 125 = ~49% opacity) */
                )
              }

              p.text(word.text, floatX, floatY)
            }
          }

          /* Handle window resize - only reposition on significant size changes */
          let lastWidth = window.innerWidth
          let lastHeight = window.innerHeight

          p.windowResized = () => {
            const newWidth = window.innerWidth
            const newHeight = window.innerHeight

            /* Only reposition if there's a significant size change (>50px) */
            /* This prevents repositioning during iOS Safari scroll viewport changes */
            const widthDiff = Math.abs(newWidth - lastWidth)
            const heightDiff = Math.abs(newHeight - lastHeight)

            if (widthDiff > 50 && heightDiff > 50) {
              p.resizeCanvas(newWidth, newHeight)

              /* Update existing word positions for significant resizes */
              const reservedBottomSpace = 120
              for (let i = 0; i < wordObjects.length; i++) {
                /* Keep existing properties, just update positions */
                wordObjects[i].x = p.random(p.width)
                wordObjects[i].y = p.random(0, p.height - reservedBottomSpace)
              }

              /* Update last known dimensions */
              lastWidth = newWidth
              lastHeight = newHeight
            } else {
              /* For minor changes, just resize canvas without repositioning */
              p.resizeCanvas(newWidth, newHeight)
            }
          }
        })
      }
    }
  })

  onUnmounted(() => {
    if (p5Instance) {
      p5Instance.remove()
      p5Instance = null
    }
  })
</script>

<template>
  <div id="random-words"></div>
</template>

<style lang="scss" scoped>
  #random-words {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100dvh;
    min-height: 100vh;
    pointer-events: none;
  }
</style>
