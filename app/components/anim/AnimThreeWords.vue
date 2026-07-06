<script setup lang="ts">
  import { shallowRef, onMounted, onUnmounted, watch, ref } from 'vue'
  import * as THREE from 'three'

  const colorMode = useColorMode()

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

  // Color palettes (same as AnimThreeRibbon)
  const silverWarm1 = new THREE.Color(0.94, 0.92, 0.9)
  const silverWarm2 = new THREE.Color(0.98, 0.96, 0.94)
  const silverCool1 = new THREE.Color(0.9, 0.92, 0.96)
  const silverCool2 = new THREE.Color(0.96, 0.98, 1.0)
  // #18181b variations for light mode (R=24, G=24, B=27)
  const greenLight1 = new THREE.Color(0x18 / 255, 0x18 / 255, 0x1b / 255) // #18181b
  const greenLight2 = new THREE.Color(0x20 / 255, 0x20 / 255, 0x23 / 255) // Lighter variation
  const greenDark1 = new THREE.Color(0x10 / 255, 0x10 / 255, 0x13 / 255) // Darker variation
  const greenDark2 = new THREE.Color(0x08 / 255, 0x08 / 255, 0x0b / 255) // Even darker

  const canvasRef = shallowRef<HTMLCanvasElement | null>(null)
  const renderer = shallowRef<THREE.WebGLRenderer | null>(null)
  const scene = shallowRef<THREE.Scene | null>(null)
  const camera = shallowRef<THREE.PerspectiveCamera | null>(null)
  const rafId = shallowRef<number>(0)
  const isVisible = shallowRef(true)
  let observer: IntersectionObserver | null = null
  let wordSprites: THREE.Sprite[] = []
  let wordMaterials: THREE.SpriteMaterial[] = []
  const selectedWords = ref<string[]>([])

  // Get current color based on color mode
  const getCurrentColor = (index: number, distance: number): string => {
    const isLight = colorMode.value === 'light'
    const warm1 = isLight ? greenLight1 : silverWarm1
    const warm2 = isLight ? greenLight2 : silverWarm2
    const cool1 = isLight ? greenDark1 : silverCool1
    const cool2 = isLight ? greenDark2 : silverCool2

    const t = Math.min(distance / 8, 1)
    const useWarm = index % 2 === 0
    const mixedColor = useWarm
      ? warm1.clone().lerp(warm2, t)
      : cool1.clone().lerp(cool2, t)

    return `rgb(${Math.floor(mixedColor.r * 255)}, ${Math.floor(mixedColor.g * 255)}, ${Math.floor(mixedColor.b * 255)})`
  }

  const createTextTexture = (
    text: string,
    color: string
  ): THREE.CanvasTexture => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    if (!context) throw new Error('Could not get canvas context')

    // Calculate font size based on word length
    const baseSize = 48
    const lengthFactor = Math.max(0.8, 1.5 - text.length * 0.03)
    const fontSize = Math.floor(baseSize * lengthFactor)

    // Set canvas size based on text
    context.font = `${fontSize}px 'Switzer', -apple-system, BlinkMacSystemFont, sans-serif`
    const metrics = context.measureText(text)

    // Add generous padding to ensure text fits naturally
    const padding = 60
    canvas.width = Math.ceil(metrics.width * 3.0) + padding * 2
    canvas.height = Math.ceil(fontSize * 2.0) + padding * 2

    // Clear and draw text
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.font = `${fontSize}px 'Switzer', -apple-system, BlinkMacSystemFont, sans-serif`
    context.fillStyle = color
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.fillText(text, canvas.width / 2, canvas.height / 2)

    return new THREE.CanvasTexture(canvas)
  }

  const selectRandomWords = (): string[] => {
    const shuffled = [...words].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 50)
  }

  const onResize = () => {
    if (camera.value && renderer.value) {
      camera.value.aspect = window.innerWidth / window.innerHeight
      camera.value.updateProjectionMatrix()
      renderer.value.setSize(window.innerWidth, window.innerHeight)
    }
  }

  onMounted(() => {
    if (!canvasRef.value) return

    // Select 50 random words
    selectedWords.value = selectRandomWords()

    // Create scene
    scene.value = new THREE.Scene()

    // Create camera
    camera.value = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.value.position.z = 10
    camera.value.position.y = 3

    // Create WebGL renderer
    renderer.value = new THREE.WebGLRenderer({
      canvas: canvasRef.value,
      alpha: true,
      antialias: true,
    })
    renderer.value.setSize(window.innerWidth, window.innerHeight)
    renderer.value.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Create word sprites
    const spreadRadius = 8
    for (let i = 0; i < selectedWords.value.length; i++) {
      const word = selectedWords.value[i]
      if (!word) continue

      // Random position within a sphere
      const radius = Math.random() * spreadRadius
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta)
      const z = radius * Math.cos(phi)

      const distance = Math.sqrt(x * x + y * y + z * z)
      const color = getCurrentColor(i, distance)

      // Create canvas texture
      const texture = createTextTexture(word, color)
      texture.needsUpdate = true

      // Create sprite material
      const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0.5,
        depthTest: true,
        depthWrite: false,
      })

      // Create sprite
      const sprite = new THREE.Sprite(material)
      sprite.position.set(x, y, z)

      // Fix aspect ratio to match canvas texture proportions
      const aspect = texture.image.width / texture.image.height
      const baseHeight = 0.96 // Adjust this to change word size globally (20% larger)
      sprite.scale.set(baseHeight * aspect, baseHeight, 1)

      scene.value.add(sprite)
      wordSprites.push(sprite)
      wordMaterials.push(material)
    }

    // Add subtle ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
    scene.value.add(ambientLight)

    // Add directional light for depth
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    directionalLight.position.set(10, 10, 10)
    scene.value.add(directionalLight)

    // Intersection observer for performance
    observer = new IntersectionObserver(([e]) => {
      if (e) isVisible.value = e.isIntersecting
    })
    observer.observe(canvasRef.value)

    window.addEventListener('resize', onResize)

    // Animation loop
    const animate = (time: number) => {
      rafId.value = requestAnimationFrame(animate)
      if (!isVisible.value || !scene.value || !camera.value || !renderer.value)
        return

      // Rotate camera around the word cluster
      const elapsedTime = time * 0.001
      camera.value.position.x = Math.cos(elapsedTime * 0.08) * 10
      camera.value.position.z = Math.sin(elapsedTime * 0.08) * 10
      camera.value.lookAt(0, 0, 0)

      // Update sprite opacity based on distance from camera
      wordSprites.forEach((sprite, i) => {
        const distanceToCamera = sprite.position.distanceTo(
          camera.value!.position
        )

        // Fade based on distance — camera orbits at radius 10
        const fadeDistance = 12
        const opacity = Math.min(
          0.7,
          Math.max(0.05, 1 - distanceToCamera / fadeDistance)
        )
        if (wordMaterials[i]) {
          wordMaterials[i].opacity = opacity
        }
      })

      renderer.value.render(scene.value, camera.value)
    }
    rafId.value = requestAnimationFrame(animate)
  })

  // Watch for color mode changes
  watch(
    () => colorMode.value,
    () => {
      if (!scene.value || wordSprites.length === 0) return

      // Update colors of all word sprites
      wordSprites.forEach((sprite, i) => {
        const position = sprite.position
        const distance = Math.sqrt(
          position.x * position.x +
            position.y * position.y +
            position.z * position.z
        )
        const color = getCurrentColor(i, distance)
        const word = selectedWords.value[i]

        if (word && wordMaterials[i]) {
          // Create new texture with updated color
          const newTexture = createTextTexture(word, color)
          newTexture.needsUpdate = true
          wordMaterials[i].map = newTexture
          wordMaterials[i].needsUpdate = true
        }
      })
    }
  )

  // Cleanup
  onUnmounted(() => {
    cancelAnimationFrame(rafId.value)
    observer?.disconnect()
    window.removeEventListener('resize', onResize)

    // Clean up word sprites and materials
    wordSprites.forEach((sprite) => {
      if (scene.value) {
        scene.value.remove(sprite)
      }
      if (sprite.material) {
        const material = sprite.material as THREE.SpriteMaterial
        if (material.map) {
          material.map.dispose()
        }
        material.dispose()
      }
    })
    wordSprites = []
    wordMaterials = []

    renderer.value?.dispose()
  })
</script>

<template>
  <div class="words-container">
    <canvas ref="canvasRef" class="words-canvas" />
  </div>
</template>

<style lang="scss" scoped>
  .words-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100dvh;
    min-height: 100vh;
    pointer-events: none;
  }

  .words-canvas {
    width: 100%;
    height: 100%;
    display: block;
  }
</style>
