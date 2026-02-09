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
  const count = 90000
  const flowerRadius = 3.0
  const spiralStrength = 0.8 // Controls spiral bending
  const bulgeRadius = 0.25 // Central bulge size (fraction of flowerRadius)

  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const petalLayers = new Float32Array(count)

  // Color palettes with radial brightness gradient
  // Bright center colors (near bulge)
  const silverCenterWarm = new THREE.Color(0.98, 0.97, 0.96)
  const silverCenterCool = new THREE.Color(0.96, 0.98, 1.0)
  // Bright edge colors (outer arms) - boosted to match ribbon brightness
  const silverEdgeWarm = new THREE.Color(0.9, 0.92, 0.94)
  const silverEdgeCool = new THREE.Color(0.92, 0.94, 0.96)
  // #43655a variations for light mode - exact same as AnimThreeRibbon
  const greenLight1 = new THREE.Color(0x43 / 255, 0x65 / 255, 0x5a / 255) // #43655a
  const greenLight2 = new THREE.Color(0x4a / 255, 0x6e / 255, 0x62 / 255) // Lighter variation
  const greenDark1 = new THREE.Color(0x3b / 255, 0x5c / 255, 0x52 / 255) // Darker variation
  const greenDark2 = new THREE.Color(0x34 / 255, 0x53 / 255, 0x4a / 255) // Even darker

  /**
   * Three.js
   * Galaxy
   */

  const vertexShader = `
    uniform float uTime;
    uniform float uFlowerRadius;
    uniform float uSpiralStrength;
    attribute float aScale;
    attribute vec3 aRandomness;
    attribute float aPetal;
    attribute float aPhase;
    varying vec3 vColor;
    varying float vAlpha;

    void main() {
      vec3 pos = position;

      // Continuous spiral galaxy arms - from code sample
      float layer = aPetal; // Which concentric layer (0-1 from center to edge)
      float originalAngle = atan(pos.z, pos.x);
      float dist = length(pos.xz);

      // Bulge radius
      float bulgeRadius = 0.25 * uFlowerRadius;

      // Apply logarithmic spiral to all particles
      float spinAngle = log(dist + 1.0) * uSpiralStrength * 0.8;
      float armAngle = originalAngle + spinAngle;

      // Arm concentration by angular offset (not radius)
      // Arms penetrate bulge but reduce strength near center
      float armStrength = smoothstep(0.0, bulgeRadius * 1.5, dist);
      float armCount = 12.0;
      float armWidth = mix(0.06, 0.15, layer) * armStrength;
      float armOffset = sin(armAngle * armCount) * armWidth;
      float finalAngle = armAngle + armOffset;

      // Position with final angle (same radius, modulated angle)
      pos.x = cos(finalAngle) * dist;
      pos.z = sin(finalAngle) * dist;

      // Gentle vertical movement for 3D effect
      float wave = sin(uTime * 0.3 + aPhase * 6.283 + layer * 5.0) * 0.05;
      pos.y += wave * (0.5 + layer * 0.5);

      // Add galaxy rotation
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

      // Point size - smaller toward center, larger in outer layers
      float centerDist = length(pos.xz);
      float sizeFactor = 0.3 + layer * 0.7;
      gl_PointSize = 40.0 * aScale * sizeFactor * (1.0 / -viewPosition.z);

      vColor = color;

      // Alpha - reduced drop from center to edge for more radiance
      float pulse = sin(uTime * 0.8 + aPhase * 6.283 + layer * 3.0) * 0.15 + 0.85;
      // Reduced alpha drop: 1.0 at center → 0.5 at edge (was 0.28)
      float centerAlpha = 1.0 - clamp(centerDist / uFlowerRadius, 0.0, 0.5);
      // Increase overall alpha by 50%
      vAlpha = pulse * centerAlpha * 1.5;
    }
  `

  const fragmentShader = `
    varying vec3 vColor;
    varying float vAlpha;

    void main() {
      vec2 uv = gl_PointCoord - 0.5;
      float dist = length(uv);

      // Simple circular point with sharper falloff for more intensity
      float strength = 1.0 - dist * 2.0;
      strength = clamp(strength, 0.0, 1.0);
      strength = pow(strength, 3.0);

      if (strength < 0.01) discard;

      gl_FragColor = vec4(vColor * strength * 2.0, strength * vAlpha * 0.95);
    }
  `

  // --- Reactive Logic ---
  const generateColors = () => {
    const isLight = colorMode.value === 'light'
    const warm1 = isLight ? greenLight1 : silverCenterWarm
    const warm2 = isLight ? greenLight2 : silverEdgeWarm
    const cool1 = isLight ? greenDark1 : silverCenterCool
    const cool2 = isLight ? greenDark2 : silverEdgeCool

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const layer = petalLayers[i]
      const x = positions[i3] || 0
      const y = positions[i3 + 1] || 0
      const z = positions[i3 + 2] || 0

      // Distance from center for gradient
      const distance = Math.sqrt(x * x + z * z)
      const t = Math.min(distance / flowerRadius, 1)

      // Color based on position (arms penetrate bulge)
      const layerValue = petalLayers[i] || 0
      const isInBulgeRegion = distance < bulgeRadius * flowerRadius

      // For coloring, treat all particles as arms if they're in arm structure
      // This creates continuity between bulge and arms
      const angle = Math.atan2(z, x)
      const spinAngle = Math.log(distance + 1) * spiralStrength * 0.8
      const armAngle = angle + spinAngle
      const armWidth = 0.06 + layerValue * 0.09
      const armOffset = Math.sin(armAngle * 12) * armWidth
      const finalAngle = armAngle + armOffset
      const armIndex =
        Math.floor(((finalAngle + Math.PI) / (Math.PI * 2)) * 12) % 12
      const useWarm = armIndex % 2 === 0

      // Radial brightness gradient: bright at center, dim at edge
      // For light mode, apply extra contrast boost
      let mixedColor = useWarm
        ? silverCenterWarm.clone().lerp(silverEdgeWarm, t)
        : silverCenterCool.clone().lerp(silverEdgeCool, t)

      // Darken colors for light mode to increase contrast against white background
      if (isLight) {
        mixedColor.multiplyScalar(0.8) // Reduced darkening for more radiance (was 0.5)
      }

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

    // Create galaxy with central bulge and spiral arms
    const armCount = 12
    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      // 1. CENTER-WEIGHTED DISTRIBUTION: More particles near center
      const layer = Math.pow(Math.random(), 3.0)
      petalLayers[i] = layer

      // Distance from center - maintain edge-to-edge coverage
      const baseDistance = layer * flowerRadius
      const distanceVariation = (Math.random() - 0.5) * 0.2 * flowerRadius
      const distance = Math.max(0.1, baseDistance + distanceVariation)

      // Determine particle type: some in bulge are arms that penetrate sphere
      // Probability of being an arm particle increases with distance
      const isInBulgeRegion = distance < bulgeRadius * flowerRadius
      const armProbability = Math.min(
        1.0,
        distance / (bulgeRadius * flowerRadius)
      )
      const isArmParticle = Math.random() < armProbability

      // Initialize armAngle variable (used for scale calculation)
      let armAngle = 0

      if (isInBulgeRegion && !isArmParticle) {
        // CENTRAL BULGE CORE: Pure spherical distribution (background)
        // Random angle in 3D for spherical distribution
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)
        const bulgeDistance = distance * 0.7 // Slightly compressed for ellipsoidal shape

        positions[i3] = Math.sin(phi) * Math.cos(theta) * bulgeDistance
        positions[i3 + 1] = Math.cos(phi) * bulgeDistance * 0.6 // Flatten slightly
        positions[i3 + 2] = Math.sin(phi) * Math.sin(theta) * bulgeDistance
      } else {
        // SPIRAL ARMS: Penetrate into bulge region (no gap)
        // Use original distance, arms go into center
        const armDistance = distance

        // ARM DENSITY FUNCTION: Concentrate particles in arms
        const armIndex = Math.floor(Math.random() * armCount)
        const baseAngle = (armIndex / armCount) * Math.PI * 2
        const angleSpread = (Math.random() - 0.5) * 0.35

        // Apply logarithmic spiral
        const spinAngle = Math.log(armDistance + 1) * spiralStrength * 0.8
        armAngle = baseAngle + spinAngle + angleSpread

        // Arm concentration by angular offset
        // Reduce arm modulation near center so bulge remains visible
        const armStrength = Math.min(
          1.0,
          distance / (bulgeRadius * flowerRadius * 0.5)
        )
        const armWidth = (0.06 + layer * 0.09) * armStrength
        const armOffset = Math.sin(armAngle * armCount) * armWidth
        const finalAngle = armAngle + armOffset

        // Position with final angle
        positions[i3] = Math.cos(finalAngle) * armDistance
        positions[i3 + 1] = (Math.random() - 0.5) * 0.15
        positions[i3 + 2] = Math.sin(finalAngle) * armDistance
      }

      // Randomness for organic look
      randomness[i3] = (Math.random() - 0.5) * 0.015
      randomness[i3 + 1] = (Math.random() - 0.5) * 0.015
      randomness[i3 + 2] = (Math.random() - 0.5) * 0.015

      // Scale - larger particles in outer layers
      // Include spiral factor for all particles (creates continuity)
      const spiralFactor = 0.7 + 0.3 * Math.cos(armAngle * armCount * 0.5)
      const scale = 0.2 + layer * 0.6 + spiralFactor * 0.2
      scales[i] = scale

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
    camera.position.z = 5.0
    camera.position.y = 1.5
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
        uSpiralStrength: { value: spiralStrength },
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
