<script setup lang="ts">
  import { shallowRef, onMounted, onUnmounted, watch } from 'vue'
  import type * as T from 'three'

  let THREE: typeof T

  const colorMode = useColorMode()

  const canvasRef = shallowRef<HTMLCanvasElement | null>(null)
  const renderer = shallowRef<T.WebGLRenderer | null>(null)
  const material = shallowRef<T.ShaderMaterial | null>(null)
  const geometry = shallowRef<T.BufferGeometry | null>(null)
  const pointsObj = shallowRef<T.Points | null>(null)
  const sceneObj = shallowRef<T.Scene | null>(null)
  const rafId = shallowRef<number>(0)
  const isVisible = shallowRef(true)
  let observer: IntersectionObserver | null = null

  // --- Data Buffers (Shared Scope) ---
  const count = shallowRef(40000)
  const getDesiredCount = (width: number) =>
    Math.max(8000, Math.round(40000 * (width / 1920)))
  const radius = 1.2
  let positions = new Float32Array(count.value * 3)
  let colors = new Float32Array(count.value * 3)
  let strands = new Float32Array(count.value)

  // Color palettes — initialized after Three.js loads
  let silverWarm1: T.Color
  let silverWarm2: T.Color
  let silverCool1: T.Color
  let silverCool2: T.Color
  let greenLight1: T.Color
  let greenLight2: T.Color
  let greenDark1: T.Color
  let greenDark2: T.Color

  const initPalettes = (T3: typeof T) => {
    silverWarm1 = new T3.Color(1.0, 0.98, 0.96)
    silverWarm2 = new T3.Color(0.96, 0.98, 1.0)
    silverCool1 = new T3.Color(1.0, 1.0, 0.98)
    silverCool2 = new T3.Color(1.0, 1.0, 1.0)
    greenLight1 = new T3.Color(0x2e / 255, 0x8b / 255, 0x57 / 255)
    greenLight2 = new T3.Color(0x3c / 255, 0xb3 / 255, 0x71 / 255)
    greenDark1 = new T3.Color(0x22 / 255, 0x8b / 255, 0x22 / 255)
    greenDark2 = new T3.Color(0x00 / 255, 0x64 / 255, 0x00 / 255)
  }

  /**
   * Three.js
   * DNA String
   */

  const vertexShader = `
    uniform float uTime;
    attribute float aScale;
    attribute vec3 aRandomness;
    attribute float aRadius;
    attribute float aStrand;
    varying vec3 vColor;
    varying float vAlpha;
    void main() {
      vec3 pos = position;
      float strandOffset = (aStrand - 0.5) * 0.6;
      pos.y += strandOffset;
      float twistAngle = pos.x * 0.5 + uTime * 0.4;
      float c = cos(twistAngle); float s = sin(twistAngle);
      float y = pos.y * c - pos.z * s;
      float z = pos.y * s + pos.z * c;
      pos.y = y; pos.z = z;
      pos.y *= aRadius;
      pos.z *= aRadius * 0.6;
      float wave = sin(pos.x * 0.5 + uTime * 0.8) * 0.1725;
      pos.y += wave;
      pos.xyz += aRandomness;
      vec4 viewPosition = viewMatrix * vec4(pos, 1.0);
      gl_Position = projectionMatrix * viewPosition;
      gl_PointSize = 32.0 * aScale * (1.0 / -viewPosition.z);
      vColor = color;
      vAlpha = 0.6 + 0.4 * sin(uTime * 2.0 + pos.x * 5.0 + aStrand * 3.0 + aScale * 10.0);
    }
  `

  const fragmentShader = `
    varying vec3 vColor;
    varying float vAlpha;
    void main() {
      vec2 uv = gl_PointCoord - 0.5;
      float strength = 1.0 - length(uv);
      strength = pow(strength, 4.0);
      if (strength < 0.01) discard;
      gl_FragColor = vec4(vColor * strength * 2.0, strength * vAlpha * 1.0);
    }
  `

  // --- Reactive Logic ---
  const generateColors = () => {
    const isLight = colorMode.value === 'light'
    const warm1 = isLight ? greenLight1 : silverWarm1
    const warm2 = isLight ? greenLight2 : silverWarm2
    const cool1 = isLight ? greenDark1 : silverCool1
    const cool2 = isLight ? greenDark2 : silverCool2

    for (let i = 0; i < count.value; i++) {
      const i3 = i * 3
      const strand = strands[i]
      const r = Math.sqrt(
        (positions[i3 + 1] ?? 0) ** 2 + (positions[i3 + 2] ?? 0) ** 2
      )
      const t = Math.min(r / radius, 1)
      const mixedColor =
        strand === 0
          ? warm1.clone().lerp(warm2, t)
          : cool1.clone().lerp(cool2, t)
      colors[i3] = mixedColor.r
      colors[i3 + 1] = mixedColor.g
      colors[i3 + 2] = mixedColor.b
    }
    if (geometry.value?.attributes?.color) {
      geometry.value.attributes.color.needsUpdate = true
    }
  }

  const rebuildParticles = () => {
    const n = count.value

    // Allocate fresh arrays
    positions = new Float32Array(n * 3)
    colors = new Float32Array(n * 3)
    strands = new Float32Array(n)
    const scales = new Float32Array(n)
    const randomness = new Float32Array(n * 3)
    const radii = new Float32Array(n)

    for (let i = 0; i < n; i++) {
      const i3 = i * 3
      strands[i] = i % 2
      const x = (Math.random() - 0.5) * 24
      const r = Math.pow(Math.random(), 2) * radius
      const angle = Math.random() * Math.PI * 2
      positions[i3] = x
      positions[i3 + 1] = Math.cos(angle) * r
      positions[i3 + 2] = Math.sin(angle) * r
      randomness[i3] = (Math.random() - 0.5) * 0.1
      randomness[i3 + 1] = (Math.random() - 0.5) * 0.1
      randomness[i3 + 2] = (Math.random() - 0.5) * 0.1
      radii[i] = 0.5 + Math.random() * 0.5
      scales[i] = 0.5 + Math.random() * 0.5
    }

    generateColors()

    // Swap geometry
    const oldGeom = geometry.value
    geometry.value = new THREE.BufferGeometry()
    geometry.value.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    )
    geometry.value.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geometry.value.setAttribute('aScale', new THREE.BufferAttribute(scales, 1))
    geometry.value.setAttribute(
      'aRandomness',
      new THREE.BufferAttribute(randomness, 3)
    )
    geometry.value.setAttribute('aRadius', new THREE.BufferAttribute(radii, 1))
    geometry.value.setAttribute(
      'aStrand',
      new THREE.BufferAttribute(strands, 1)
    )

    if (pointsObj.value) pointsObj.value.geometry = geometry.value
    oldGeom?.dispose()
  }

  const onResize = () => {
    if (renderer.value) renderer.value.setSize(window.innerWidth, 300)
    const desired = getDesiredCount(window.innerWidth)
    if (desired !== count.value) {
      count.value = desired
      rebuildParticles()
    }
  }

  /* Watch for color mode changes and recreate waves */
  const stopColorModeWatching = watch(
    () => colorMode.value,
    () => {
      generateColors()
    }
  )

  onMounted(() => {
    setTimeout(async () => {
      THREE = (await import('three')) as unknown as typeof T
      initPalettes(THREE)

      if (!canvasRef.value) return

      // Init Geometry Buffers
      const scales = new Float32Array(count.value)
      const randomness = new Float32Array(count.value * 3)
      const radii = new Float32Array(count.value)

      for (let i = 0; i < count.value; i++) {
        const i3 = i * 3
        strands[i] = i % 2
        const x = (Math.random() - 0.5) * 24
        const r = Math.pow(Math.random(), 2) * radius
        const angle = Math.random() * Math.PI * 2
        positions[i3] = x
        positions[i3 + 1] = Math.cos(angle) * r
        positions[i3 + 2] = Math.sin(angle) * r
        randomness[i3] = (Math.random() - 0.5) * 0.1
        randomness[i3 + 1] = (Math.random() - 0.5) * 0.1
        randomness[i3 + 2] = (Math.random() - 0.5) * 0.1
        radii[i] = 0.5 + Math.random() * 0.5
        scales[i] = 0.5 + Math.random() * 0.5
      }

      const scene = new THREE.Scene()
      const camera = new THREE.OrthographicCamera(-12, 12, 2, -2, 0.1, 100)
      camera.position.z = 10

      renderer.value = new THREE.WebGLRenderer({
        canvas: canvasRef.value,
        alpha: true,
        antialias: false,
      })
      renderer.value.setSize(window.innerWidth, 300)
      renderer.value.setPixelRatio(1)

      geometry.value = new THREE.BufferGeometry()
      geometry.value.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3)
      )
      geometry.value.setAttribute('color', new THREE.BufferAttribute(colors, 3))
      geometry.value.setAttribute(
        'aScale',
        new THREE.BufferAttribute(scales, 1)
      )
      geometry.value.setAttribute(
        'aRandomness',
        new THREE.BufferAttribute(randomness, 3)
      )
      geometry.value.setAttribute(
        'aRadius',
        new THREE.BufferAttribute(radii, 1)
      )
      geometry.value.setAttribute(
        'aStrand',
        new THREE.BufferAttribute(strands, 1)
      )

      material.value = new THREE.ShaderMaterial({
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
        vertexShader,
        fragmentShader,
        uniforms: { uTime: { value: 0 } },
      })

      pointsObj.value = new THREE.Points(geometry.value!, material.value!)
      scene.add(pointsObj.value)
      sceneObj.value = scene
      // I try to use guards for three so as to save cpu
      observer = new IntersectionObserver(([e]) => {
        if (e) isVisible.value = e.isIntersecting
      })
      observer.observe(canvasRef.value)
      window.addEventListener('resize', onResize)

      const animate = (time: number) => {
        rafId.value = requestAnimationFrame(animate)
        if (!isVisible.value || !material.value || !renderer.value) return
        if (material.value?.uniforms.uTime) {
          material.value.uniforms.uTime.value = time * 0.001
        }
        renderer.value.render(sceneObj.value!, camera)
      }
      rafId.value = requestAnimationFrame(animate)

      generateColors()

      // Apply correct count for current screen width
      onResize()
    })
  })

  // REGISTER UNMOUNTED TOP-LEVEL
  onUnmounted(() => {
    cancelAnimationFrame(rafId.value)
    observer?.disconnect()
    window.removeEventListener('resize', onResize)
    geometry.value?.dispose()
    pointsObj.value?.geometry?.dispose()
    material.value?.dispose()
    renderer.value?.dispose()
  })
</script>

<template>
  <div class="ribbon-container">
    <canvas ref="canvasRef" class="ribbon-canvas" />
  </div>
</template>

<style lang="scss" scoped>
  .ribbon-container {
    width: 100vw;
    height: 100vh;
    height: 100dvh;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    overflow: hidden;
    pointer-events: none;
    display: flex;
    align-items: center;
  }

  .ribbon-canvas {
    width: 100%;
    display: block;
  }
</style>
