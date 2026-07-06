<script setup lang="ts">
  import { ref, onMounted, onUnmounted, watch } from 'vue'
  import * as THREE from 'three'
  import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
  import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
  import { AfterimagePass } from 'three/addons/postprocessing/AfterimagePass.js'
  import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'

  const colorMode = useColorMode()

  const container = ref<HTMLDivElement>()
  const isVisible = ref(true)
  let observer: IntersectionObserver | null = null

  let renderer: THREE.WebGLRenderer | null = null
  let scene: THREE.Scene | null = null
  let camera: THREE.PerspectiveCamera | null = null
  let composer: EffectComposer | null = null
  let particles: THREE.Points | null = null
  let geometry: THREE.BufferGeometry | null = null
  let animationId: number | null = null
  let particleColors: Float32Array | null = null

  // Uniforms — audio bands replaced with time-driven oscillation
  const uniforms = {
    uTime: { value: 0 },
    uPlaying: { value: 1 },
    uBass: { value: 0 },
    uMid: { value: 0 },
    uHigh: { value: 0 },
    uGlobalAmp: { value: 0 },
    uCamZ: { value: 1000 },
  }

  // Ribbon color palettes
  const silverWarm1 = new THREE.Color(1.0, 0.98, 0.96)
  const silverWarm2 = new THREE.Color(0.96, 0.98, 1.0)
  const silverCool1 = new THREE.Color(1.0, 1.0, 0.98)
  const silverCool2 = new THREE.Color(1.0, 1.0, 1.0)
  const greenLight1 = new THREE.Color(0x2e / 255, 0x8b / 255, 0x57 / 255)
  const greenLight2 = new THREE.Color(0x3c / 255, 0xb3 / 255, 0x71 / 255)
  const greenDark1 = new THREE.Color(0x22 / 255, 0x8b / 255, 0x22 / 255)
  const greenDark2 = new THREE.Color(0x00 / 255, 0x64 / 255, 0x00 / 255)

  /** Pre-generated circle sprite texture */
  let spriteTexture: THREE.Texture | null = null

  const generateParticleColors = () => {
    if (!geometry || !particleColors) return
    const isLight = colorMode.value === 'light'
    const total = particleColors.length / 3
    const warm1 = isLight ? greenLight1 : silverWarm1
    const warm2 = isLight ? greenLight2 : silverWarm2
    const cool1 = isLight ? greenDark1 : silverCool1
    const cool2 = isLight ? greenDark2 : silverCool2

    for (let i = 0; i < total; i++) {
      const i3 = i * 3
      const useWarm = i % 2 === 0
      const t = i / total
      const color = useWarm
        ? warm1.clone().lerp(warm2, t)
        : cool1.clone().lerp(cool2, t)
      particleColors[i3] = color.r
      particleColors[i3 + 1] = color.g
      particleColors[i3 + 2] = color.b
    }

    geometry.attributes.color!.needsUpdate = true
  }

  /**
   * Generate a soft circle sprite as a canvas texture
   */
  const generateSpriteTexture = () => {
    const canvas = document.createElement('canvas')
    canvas.width = 64
    canvas.height = 64
    const ctx = canvas.getContext('2d')!

    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
    gradient.addColorStop(0, 'rgba(255,255,255,1)')
    gradient.addColorStop(0.3, 'rgba(255,255,255,0.6)')
    gradient.addColorStop(1, 'rgba(255,255,255,0)')

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 64, 64)

    spriteTexture = new THREE.CanvasTexture(canvas)
  }

  /**
   * Initialize Three.js scene
   */
  const initThree = () => {
    if (!container.value) return

    generateSpriteTexture()

    const width = window.innerWidth
    const height = window.innerHeight

    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance',
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    container.value.appendChild(renderer.domElement)

    scene = new THREE.Scene()

    camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000)
    camera.position.z = 1000

    // --- Particle System ---
    const particleCount = 25000
    const radius = 600

    geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    particleColors = new Float32Array(particleCount * 3)
    const offsets = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      const pos = getRandomPointOnSphere(radius)
      positions[i * 3] = pos.x
      positions[i * 3 + 1] = pos.y
      positions[i * 3 + 2] = pos.z

      offsets[i] = i / particleCount
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3))
    geometry.setAttribute('offset', new THREE.BufferAttribute(offsets, 1))

    generateParticleColors()

    // Vertex shader with ribbon colors + strength modulation
    const vertexShader = /* glsl */ `
    attribute vec3 color;
    attribute float offset;
    varying vec3 vColor;
    varying float vAlpha;

    uniform float uTime;
    uniform float uPlaying;
    uniform float uBass;
    uniform float uMid;
    uniform float uHigh;
    uniform float uGlobalAmp;
    uniform float uCamZ;

    void main() {
      vec3 pos = position;

      // --- Position animation ---
      float t = mod(uTime * 0.1 + offset, 1.0);

      // Idle: gentle wobble
      float idleWobble = sin(uTime * 0.5 + offset * 6.28) * 5.0;
      vec3 idlePos = pos + normalize(pos) * idleWobble;

      // Spiral animates at constant smooth speed
      float st = mod(uTime * 0.1 + offset, 1.0);
      float accTime = st * st;
      float angle = accTime * 40.0;

      vec3 playPos = vec3(
        pos.x * accTime + sin(angle) * 20.0,
        pos.y * accTime + cos(angle) * 20.0,
        pos.z * accTime * 1.75
      );

      float blend = smoothstep(0.0, 1.0, uPlaying);
      vec3 finalPos = mix(idlePos, playPos, blend);

      // --- Color: ribbon palette + strength modulation ---
      float total = uBass + uMid + uHigh;
      float brightness = 0.4 + total * 0.6;

      // Mute colors when camera zooms in
      float camFactor = clamp((uCamZ - 200.0) / 500.0, 0.35, 1.0);
      brightness *= camFactor;
      brightness = min(brightness, 0.35);

      vColor = color * brightness;

      // --- Alpha ---
      float fadeIn = uPlaying > 0.5 ? 1.0 : 0.15;
      if (uPlaying > 0.5) {
        fadeIn = smoothstep(0.0, 0.15, st) * (1.0 - smoothstep(0.6, 0.9, st));
        fadeIn = mix(fadeIn, 1.0, uBass * 0.7);
      }
      vAlpha = fadeIn;

      vec4 mvPosition = modelViewMatrix * vec4(finalPos, 1.0);
      gl_PointSize = 5.0 * (300.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `

    const fragmentShader = /* glsl */ `
    varying vec3 vColor;
    varying float vAlpha;
    uniform sampler2D uTexture;

    void main() {
      vec4 texColor = texture2D(uTexture, gl_PointCoord);
      gl_FragColor = vec4(vColor, texColor.a * vAlpha);
    }
  `

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: uniforms.uTime,
        uPlaying: uniforms.uPlaying,
        uBass: uniforms.uBass,
        uMid: uniforms.uMid,
        uHigh: uniforms.uHigh,
        uGlobalAmp: uniforms.uGlobalAmp,
        uCamZ: uniforms.uCamZ,
        uTexture: { value: spriteTexture! },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    particles = new THREE.Points(geometry, material)
    scene.add(particles)

    // --- Post-processing ---
    composer = new EffectComposer(renderer)

    const renderPass = new RenderPass(scene, camera)
    composer.addPass(renderPass)

    const afterimagePass = new AfterimagePass(0.82)
    composer.addPass(afterimagePass)

    const outputPass = new OutputPass()
    composer.addPass(outputPass)

    window.addEventListener('resize', onWindowResize)
  }

  /**
   * Get a random point on a sphere surface
   */
  const getRandomPointOnSphere = (r: number) => {
    const angle = Math.random() * Math.PI * 2
    const u = Math.random() * 2 - 1
    return new THREE.Vector3(
      Math.cos(angle) * Math.sqrt(1 - u * u) * r,
      Math.sin(angle) * Math.sqrt(1 - u * u) * r,
      u * r
    )
  }

  /**
   * Handle window resize
   */
  const onWindowResize = () => {
    if (!camera || !renderer || !composer) return

    const width = window.innerWidth
    const height = window.innerHeight

    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
    composer.setSize(width, height)
  }

  /**
   * Animation loop — time-driven oscillation replaces audio bands
   */
  const animate = (time: number) => {
    animationId = requestAnimationFrame(animate)

    if (!composer || !particles || !scene || !isVisible.value) return

    const t = time * 0.001

    uniforms.uTime.value = t
    uniforms.uPlaying.value = 1

    // Time-driven oscillation replacing audio frequency bands
    uniforms.uBass.value = 0.25 + 0.15 * Math.sin(t * 1.3)
    uniforms.uMid.value = 0.25 + 0.15 * Math.cos(t * 1.7)
    uniforms.uHigh.value = 0.25 + 0.15 * Math.sin(t * 2.1 + 1.0)
    uniforms.uGlobalAmp.value =
      (uniforms.uBass.value + uniforms.uMid.value + uniforms.uHigh.value) / 3

    particles.rotation.z = t * 0.3

    // Camera breathing — time-driven zoom
    if (camera) {
      const targetZ = 1000 - uniforms.uBass.value * 700
      camera.position.z += (targetZ - camera.position.z) * 0.08
      uniforms.uCamZ.value = camera.position.z
    }

    composer.render()
  }

  onMounted(() => {
    initThree()

    // Stop animation when next section scrolls halfway in
    observer = new IntersectionObserver(
      ([e]) => {
        if (e) isVisible.value = !e.isIntersecting
      },
      { threshold: 0.5 }
    )
    // Find the next section after the hero
    const hero = container.value?.closest('.hero-wrapper')
    const nextSection = hero?.parentElement?.nextElementSibling
    if (nextSection) observer.observe(nextSection)

    animationId = requestAnimationFrame(animate)
  })

  watch(
    () => colorMode.value,
    () => {
      generateParticleColors()
    }
  )

  onUnmounted(() => {
    if (animationId) {
      cancelAnimationFrame(animationId)
    }
    observer?.disconnect()

    if (spriteTexture) spriteTexture.dispose()
    if (renderer) {
      renderer.dispose()
      renderer.domElement.remove()
    }
    if (composer) composer.dispose()

    window.removeEventListener('resize', onWindowResize)
  })
</script>

<template>
  <div ref="container" class="three-container"></div>
</template>

<style scoped lang="scss">
  .three-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 0;
    pointer-events: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
  }
</style>
