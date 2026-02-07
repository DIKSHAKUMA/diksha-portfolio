<script setup lang="ts">
  import { shallowRef, onMounted, onUnmounted, watch } from 'vue'
  import * as THREE from 'three'

  const colorMode = useColorMode()

  const canvasRef = shallowRef<HTMLCanvasElement | null>(null)
  const renderer = shallowRef<THREE.WebGLRenderer | null>(null)
  const material = shallowRef<THREE.ShaderMaterial | null>(null)
  const geometry = shallowRef<THREE.BufferGeometry | null>(null)
  const rafId = shallowRef<number>(0)
  const isVisible = shallowRef(true)
  let observer: IntersectionObserver | null = null

  // --- Data Buffers (Shared Scope) ---
  const count = 40000
  const radius = 1.2
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const strands = new Float32Array(count)

  // Color palettes
  const silverWarm1 = new THREE.Color(0.94, 0.92, 0.9)
  const silverWarm2 = new THREE.Color(0.98, 0.96, 0.94)
  const silverCool1 = new THREE.Color(0.9, 0.92, 0.96)
  const silverCool2 = new THREE.Color(0.96, 0.98, 1.0)
  const blackWarm1 = new THREE.Color(0x2f / 255, 0x45 / 255, 0x4b / 255)
  const blackWarm2 = new THREE.Color(0x37 / 255, 0x4d / 255, 0x53 / 255)
  const blackCool1 = new THREE.Color(0x2b / 255, 0x41 / 255, 0x47 / 255)
  const blackCool2 = new THREE.Color(0x33 / 255, 0x49 / 255, 0x4f / 255)

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
      gl_FragColor = vec4(vColor * strength * 1.5, strength * vAlpha * 0.95);
    }
  `

  // --- Reactive Logic ---
  const generateColors = () => {
    const isLight = colorMode.value === 'light'
    console.log('Logic thinks light is:', isLight)
    const warm1 = isLight ? blackWarm1 : silverWarm1
    const warm2 = isLight ? blackWarm2 : silverWarm2
    const cool1 = isLight ? blackCool1 : silverCool1
    const cool2 = isLight ? blackCool2 : silverCool2

    for (let i = 0; i < count; i++) {
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
    if (geometry.value) {
      console.log(
        'Updating geometry colors, needsUpdate:',
        geometry.value.attributes.color?.needsUpdate
      )
      if (geometry.value.attributes.color) {
        geometry.value.attributes.color.needsUpdate = true
      }
    } else {
      console.log('geometry.value is null, cannot update colors')
    }
  }

  const onResize = () => {
    if (renderer.value) renderer.value.setSize(window.innerWidth, 300)
  }

  /* Watch for color mode changes and recreate waves */
  const stopColorModeWatching = watch(
    () => colorMode.value,
    (newVal, oldVal) => {
      generateColors()
    },
    {
      immediate: true,
    }
  )

  onMounted(() => {
    if (!canvasRef.value) return

    // Init Geometry Buffers
    const scales = new Float32Array(count)
    const randomness = new Float32Array(count * 3)
    const radii = new Float32Array(count)

    for (let i = 0; i < count; i++) {
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

    material.value = new THREE.ShaderMaterial({
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      vertexShader,
      fragmentShader,
      uniforms: { uTime: { value: 0 } },
    })

    scene.add(new THREE.Points(geometry.value, material.value))
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
      renderer.value.render(scene, camera)
    }
    rafId.value = requestAnimationFrame(animate)
  })

  // REGISTER UNMOUNTED TOP-LEVEL
  onUnmounted(() => {
    cancelAnimationFrame(rafId.value)
    observer?.disconnect()
    window.removeEventListener('resize', onResize)
    geometry.value?.dispose()
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
    height: 100%;
    display: block;
  }
</style>
