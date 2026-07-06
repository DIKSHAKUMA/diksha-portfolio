<script setup lang="ts">
  import { shallowRef, onMounted, onUnmounted, watch, nextTick } from 'vue'
  import * as THREE from 'three'

  const colorMode = useColorMode()
  const containerRef = shallowRef<HTMLDivElement | null>(null)

  let renderer: THREE.WebGLRenderer | null = null
  let scene: THREE.Scene | null = null
  let camera: THREE.PerspectiveCamera | null = null
  let particles: THREE.Points | null = null
  let rafId: number | null = null

  const ParticleCount = 400
  const CubeSize = 2.5

  const getParticleColor = (): THREE.Color => {
    const isLight = colorMode.value === 'light'
    return new THREE.Color(isLight ? '#fafafa' : '#18181b')
  }

  const buildCube = () => {
    if (!scene || particles) return

    const count = ParticleCount
    const positions = new Float32Array(count * 3)

    // Distribute particles on cube surface
    for (let i = 0; i < count; i++) {
      const face = Math.floor(Math.random() * 3) // X, Y, or Z face
      const sign = Math.random() > 0.5 ? 1 : -1
      const a = (Math.random() - 0.5) * CubeSize
      const b = (Math.random() - 0.5) * CubeSize

      const i3 = i * 3
      if (face === 0) {
        positions[i3] = (sign * CubeSize) / 2
        positions[i3 + 1] = a
        positions[i3 + 2] = b
      } else if (face === 1) {
        positions[i3] = a
        positions[i3 + 1] = (sign * CubeSize) / 2
        positions[i3 + 2] = b
      } else {
        positions[i3] = a
        positions[i3 + 1] = b
        positions[i3 + 2] = (sign * CubeSize) / 2
      }
    }

    const geom = new THREE.BufferGeometry()
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const mat = new THREE.PointsMaterial({
      color: getParticleColor(),
      size: 0.06,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.NormalBlending,
    })

    particles = new THREE.Points(geom, mat)
    scene.add(particles)
  }

  const updateColors = () => {
    if (particles && particles.material instanceof THREE.PointsMaterial) {
      particles.material.color = getParticleColor()
    }
  }

  onMounted(async () => {
    if (!containerRef.value) return

    await nextTick()

    const width = containerRef.value.clientWidth || window.innerWidth
    const height = containerRef.value.clientHeight || window.innerHeight

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.value.appendChild(renderer.domElement)

    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10)
    camera.position.z = 5

    buildCube()

    const animate = () => {
      rafId = requestAnimationFrame(animate)
      if (particles) {
        particles.rotation.x += 0.003
        particles.rotation.y += 0.005
        particles.rotation.z += 0.002
      }
      if (renderer && scene && camera) renderer.render(scene, camera)
    }
    rafId = requestAnimationFrame(animate)

    window.addEventListener('resize', () => {
      if (!containerRef.value) return
      const w = containerRef.value.clientWidth
      const h = containerRef.value.clientHeight
      if (camera) {
        camera.aspect = w / h
        camera.updateProjectionMatrix()
      }
      if (renderer) renderer.setSize(w, h)
    })
  })

  watch(() => colorMode.value, updateColors)

  onUnmounted(() => {
    if (rafId) cancelAnimationFrame(rafId)
    particles?.material instanceof THREE.Material &&
      particles.material.dispose()
    particles?.geometry?.dispose()
    renderer?.dispose()
    renderer?.domElement?.remove()
  })
</script>

<template>
  <div ref="containerRef" class="anim-wrapper">
    <div class="anim-bg" />
  </div>
</template>

<style scoped lang="scss">
  .anim-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;

    :deep(canvas) {
      position: absolute;
      top: 0;
      left: 0;
      width: 100% !important;
      height: 100% !important;
      z-index: 2;
    }
  }

  .anim-bg {
    position: absolute;
    inset: 0;
    z-index: 1;
    background: radial-gradient(
      125% 125% at 50% 100%,
      $secondary 40%,
      $accent2 100%
    );
    pointer-events: none;
  }
</style>
