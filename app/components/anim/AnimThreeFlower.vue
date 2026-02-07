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
  const count = 30000
  const flowerRadius = 1.0
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const petalLayers = new Float32Array(count)

  // Color palettes (same as AnimThreeRibbon)
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
   * Flower Petal Animation
   */

  const vertexShader = `
    uniform float uTime;
    uniform float uFlowerRadius;
    attribute float aScale;
    attribute vec3 aRandomness;
    attribute float aPetal;
    attribute float aPhase;
    varying vec3 vColor;
    varying float vAlpha;

    void main() {
      vec3 pos = position;

      // Top view of rose - circular petal arrangement
      float layer = aPetal; // Which concentric layer (0-1 from center to edge)
      float angle = atan(pos.z, pos.x);
      float dist = length(pos.xz);

      // Create petal shapes in circular arrangement
      float petalCount = 12.0; // Number of petals
      float petalAngle = floor(angle * petalCount / 6.283) * 6.283 / petalCount;
      float petalOffset = angle - petalAngle;

      // Petal shape - wider at base, narrower at tip
      float petalWidth = 0.3 + layer * 0.4; // Wider petals toward outside
      float petalShape = cos(petalOffset * 3.0) * petalWidth;
      dist *= 1.0 + petalShape;

      // Reposition with petal shape
      pos.x = cos(petalAngle) * dist;
      pos.z = sin(petalAngle) * dist;

      // Gentle vertical movement for 3D effect
      float wave = sin(uTime * 0.3 + aPhase * 6.283 + layer * 5.0) * 0.05;
      pos.y += wave * (0.5 + layer * 0.5);

      // Add subtle rotation
      float rotation = uTime * 0.05;
      float cosR = cos(rotation);
      float sinR = sin(rotation);
      float newX = pos.x * cosR - pos.z * sinR;
      float newZ = pos.x * sinR + pos.z * cosR;
      pos.x = newX;
      pos.z = newZ;

      // Add organic randomness
      pos.xyz += aRandomness * 0.02;

      vec4 viewPosition = viewMatrix * vec4(pos, 1.0);
      gl_Position = projectionMatrix * viewPosition;

      // Point size - smaller toward center, larger toward petal edges
      float centerDist = length(pos.xz);
      float sizeFactor = 0.3 + layer * 0.7; // Larger particles in outer layers
      float edgeFactor = 1.0 - abs(petalOffset * 3.0); // Highlight petal edges
      gl_PointSize = 40.0 * aScale * sizeFactor * edgeFactor * (1.0 / -viewPosition.z);

      vColor = color;

      // Alpha - more transparent toward center, opaque at petal edges
      float pulse = sin(uTime * 0.8 + aPhase * 6.283 + layer * 3.0) * 0.15 + 0.85;
      float petalEdgeAlpha = 0.5 + abs(petalOffset * 2.0); // Highlight petal edges
      float centerAlpha = 1.0 - clamp(centerDist / uFlowerRadius, 0.0, 0.7);
      vAlpha = 0.9 * pulse * petalEdgeAlpha * centerAlpha;
    }
  `

  const fragmentShader = `
    varying vec3 vColor;
    varying float vAlpha;

    void main() {
      vec2 uv = gl_PointCoord - 0.5;
      float dist = length(uv);

      // Simple circular point
      float strength = 1.0 - dist * 2.0;
      strength = clamp(strength, 0.0, 1.0);
      strength = pow(strength, 2.0);

      if (strength < 0.01) discard;

      gl_FragColor = vec4(vColor, strength * vAlpha);
    }
  `

  // --- Reactive Logic ---
  const generateColors = () => {
    const isLight = colorMode.value === 'light'
    const warm1 = isLight ? blackWarm1 : silverWarm1
    const warm2 = isLight ? blackWarm2 : silverWarm2
    const cool1 = isLight ? blackCool1 : silverCool1
    const cool2 = isLight ? blackCool2 : silverCool2

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const layer = petalLayers[i]
      const x = positions[i3] || 0
      const y = positions[i3 + 1] || 0
      const z = positions[i3 + 2] || 0

      // Distance from center for gradient
      const distance = Math.sqrt(x * x + z * z)
      const t = Math.min(distance / flowerRadius, 1)

      // Color based on layer and position
      const layerValue = petalLayers[i] || 0
      const angle = Math.atan2(z, x)
      const petalIndex =
        Math.floor(((angle + Math.PI) / (Math.PI * 2)) * 12) % 12
      const useWarm = petalIndex % 2 === 0

      const mixedColor = useWarm
        ? warm1.clone().lerp(warm2, t * 0.7 + layerValue * 0.3)
        : cool1.clone().lerp(cool2, t * 0.7 + layerValue * 0.3)

      colors[i3] = mixedColor.r
      colors[i3 + 1] = mixedColor.g
      colors[i3 + 2] = mixedColor.b
    }

    if (geometry.value && geometry.value.attributes.color) {
      geometry.value.attributes.color.needsUpdate = true
    }
  }

  const onResize = () => {
    if (renderer.value) {
      renderer.value.setSize(window.innerWidth, window.innerHeight)
    }
  }

  /* Watch for color mode changes */
  const stopColorModeWatching = watch(
    () => colorMode.value,
    () => {
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
    const phases = new Float32Array(count)

    // Create top view of rose - circular petal arrangement
    const petalCount = 12
    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      // Layer from center (0) to edge (1)
      const layer = Math.pow(Math.random(), 0.7)
      petalLayers[i] = layer

      // Angle around center
      const angle = Math.random() * Math.PI * 2

      // Distance from center - petals are denser toward center
      const baseDistance = layer * flowerRadius
      const distanceVariation = (Math.random() - 0.5) * 0.2 * flowerRadius
      const distance = Math.max(0.1, baseDistance + distanceVariation)

      // Determine which petal this particle belongs to
      const petalIndex = Math.floor((angle / (Math.PI * 2)) * petalCount)
      const petalCenterAngle = (petalIndex / petalCount) * Math.PI * 2
      const angleOffset = angle - petalCenterAngle

      // Petal shape - wider at base, curves inward
      const petalWidth = 0.3 + layer * 0.4
      const petalShape = Math.cos(angleOffset * 3) * petalWidth
      const shapedDistance = distance * (1 + petalShape)

      // Position in 3D space
      positions[i3] = Math.cos(angle) * shapedDistance
      positions[i3 + 1] = (Math.random() - 0.5) * 0.15 // Very slight vertical variation
      positions[i3 + 2] = Math.sin(angle) * shapedDistance

      // Randomness for organic look
      randomness[i3] = (Math.random() - 0.5) * 0.015
      randomness[i3 + 1] = (Math.random() - 0.5) * 0.015
      randomness[i3 + 2] = (Math.random() - 0.5) * 0.015

      // Scale - larger particles in outer layers and at petal edges
      const edgeFactor = 1.0 - Math.abs(angleOffset * 3)
      scales[i] = 0.2 + layer * 0.6 + edgeFactor * 0.2

      // Animation phase
      phases[i] = Math.random()
    }

    const scene = new THREE.Scene()

    // Perspective camera for 3D effect
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    )
    camera.position.z = 3.5
    camera.position.y = 0.5
    camera.lookAt(0, 0, 0)

    renderer.value = new THREE.WebGLRenderer({
      canvas: canvasRef.value,
      alpha: true,
      antialias: true,
    })
    renderer.value.setSize(window.innerWidth, window.innerHeight)
    renderer.value.setPixelRatio(Math.min(window.devicePixelRatio, 2))

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
    geometry.value.setAttribute(
      'aPetal',
      new THREE.BufferAttribute(petalLayers, 1)
    )
    geometry.value.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1))

    material.value = new THREE.ShaderMaterial({
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uFlowerRadius: { value: flowerRadius },
      },
      transparent: true,
    })

    scene.add(new THREE.Points(geometry.value, material.value))

    // Intersection observer for performance
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

  // Cleanup on unmount
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
  <div class="flower-container">
    <canvas ref="canvasRef" class="flower-canvas" />
  </div>
</template>

<style lang="scss" scoped>
  .flower-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }

  .flower-canvas {
    width: 100%;
    height: 100%;
    display: block;
  }
</style>
