<script setup lang="ts">
  import { useFolioStore } from '~/store/useFolioStore'
  import { useBlogStore } from '~/store/useBlogStore'

  /* Pinia 🍍 */
  const store = useFolioStore()
  await callOnce('projects', () => store.fetchData())

  const blogStore = useBlogStore()
  await callOnce('blog', () => blogStore.fetchData())

  const isLoaded = ref(false)
  const { $gsap } = useNuxtApp()

  let cachedBlinds: any[] = []

  onMounted(() => {
    isLoaded.value = true
    cachedBlinds = $gsap.utils.toArray('.venice__blind')
    $gsap.set(cachedBlinds, { scaleX: 0, force3D: true })
    $gsap.fromTo(
      cachedBlinds,
      { scaleX: 1, opacity: 1, force3D: true },
      {
        duration: 0.2,
        opacity: 0,
        scaleX: 0,
        stagger: 0.05,
        transformOrigin: '0% 50%',
        force3D: true,
        ease: 'power2.out',
        onComplete: clearProps,
      }
    )
  })

  const clearProps = () => {
    $gsap.set(cachedBlinds, {
      clearProps: 'transform,opacity',
    })
    $gsap.set('.venice', { visibility: 'hidden', opacity: 0 })
  }
</script>

<template>
  <div class="venice">
    <div class="venice__blind"></div>
    <div class="venice__blind"></div>
    <div class="venice__blind"></div>
    <div class="venice__blind"></div>
    <div class="venice__blind"></div>
    <div class="venice__blind"></div>
    <div class="venice__blind"></div>
    <div class="venice__blind"></div>
    <div class="venice__blind"></div>
    <div class="venice__blind"></div>
    <!-- Mobile: Hide every other blind for cleaner look -->
    <div class="venice__blind venice__blind--desktop"></div>
    <div class="venice__blind"></div>
    <div class="venice__blind venice__blind--desktop"></div>
    <div class="venice__blind"></div>
    <div class="venice__blind venice__blind--desktop"></div>
    <div class="venice__blind"></div>
    <div class="venice__blind venice__blind--desktop"></div>
    <div class="venice__blind"></div>
    <div class="venice__blind venice__blind--desktop"></div>
    <div class="venice__blind"></div>
  </div>
  <UINavBar />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <CommonFooter />
</template>

<style lang="scss">
  html,
  body {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    transition: background-color 1s;
    background-color: $primary;
    -webkit-font-smoothing: antialiased;
    -moz-font-smoothing: antialiased;
    -o-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: $sans-text;
    font-variation-settings:
      'slnt' 0,
      'wght' 500;
    overscroll-behavior: none;
  }

  .html {
    -webkit-text-size-adjust: none;
    height: 100%;
    overflow-y: auto;
    scrollbar-gutter:stable;
  }

  body {
    display: flex;
    flex-direction: column;
  }

  .venice {
    width: 100%;
    height: 100vh;
    position: fixed;
    z-index: 9999;
    pointer-events: none;
    background-repeat: no-repeat;
    background-position: center center;
    visibility: visible;
    overflow: hidden;
    display: flex;
    contain: layout style paint;
    will-change: opacity, visibility;
    transform: translateZ(0); /* Force hardware acceleration */
    backface-visibility: hidden;
    perspective: 1000px; /* Add perspective for 3D rotation */

    &__blind {
      position: relative;
      top: 0;
      overflow: hidden;
      flex: 1;
      height: 100vh;
      background-color: $secondary;
      margin-left: -1px;
      will-change: transform, opacity;
      transform: translateZ(0); /* Force hardware acceleration */
      backface-visibility: hidden;
      contain: layout style paint;

      &:first-child {
        margin-left: 0;
      }

      /* Mobile-first: Hide desktop blinds by default, show on md+ */
      &--desktop {
        display: none;
        
        @include this-and-above('md') {
          display: block;
        }
      }
    }
  }
</style>