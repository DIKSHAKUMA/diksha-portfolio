<script setup lang="ts">
  import { useFolioStore } from '~/store/useFolioStore'
  import { useBlogStore } from '~/store/useBlogStore'
  import FavBaseSVG from '@/assets/svg/favbase.svg'

  const favBaseSVG = useTemplateRef<HTMLHtmlElement>('favBaseSVG')
  const route = useRoute()

  /* Pinia 🍍 */
  const store = useFolioStore()
  await callOnce('projects', () => store.fetchData())

  const blogStore = useBlogStore()
  await callOnce('blog', () => blogStore.fetchData())

  const isLoaded = ref(false)
  const showIntroAnimation = ref(false)
  const { $gsap } = useNuxtApp()

  let cachedBlinds: any[] = []

  /* 
  The simplistic approach with not turning venice blinds into a component works the fastest. 
  Or else you end up staring at creating a plugin, hoping its defined, watching it and so on
  */
  onMounted(() => {
    isLoaded.value = true
    cachedBlinds = $gsap.utils.toArray('.venice__blind')
    $gsap.set(cachedBlinds, { scaleX: 0, force3D: true })

    /* Only show intro animation on homepage or first visit */
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro')
    const isHomepage = route.path === '/'
    
    if (!hasSeenIntro || isHomepage) {
      showIntroAnimation.value = true
      sessionStorage.setItem('hasSeenIntro', 'true')
      
      // Create a timeline
      const tl = $gsap.timeline()

      // Add animations to the timeline
      tl.fromTo(
        '.fav-base',
        { opacity: 0, ease: 'power2.out' },
        { opacity: 1, ease: 'power2.out' }
      )
        .to('.fav-base', { opacity: 0, scale: 0.5, ease: 'power2.out' }, '>1.5')
        .fromTo(
          cachedBlinds,
          {
            scaleX: 1,
            opacity: 1,
            force3D: true,
            transformOrigin: 'left center',
          },
          {
            duration: 1.5,
            rotationY: -120,
            opacity: 0,
            force3D: true,
            onComplete: clearProps,
          }
        )
    } else {
      /* Hide intro elements immediately if not showing animation */
      $gsap.set('.fav-base', { opacity: 0, visibility: 'hidden' })
      $gsap.set('.venice', { visibility: 'hidden', opacity: 0 })
    }
  })

  const clearProps = () => {
    $gsap.set(cachedBlinds, {
      clearProps: 'transform,opacity',
    })
    $gsap.set('.venice', { visibility: 'hidden', opacity: 0 })
  }
</script>

<template>
  <FavBaseSVG v-if="showIntroAnimation" class="fav-base" ref="favBaseSVG" />
  <div v-if="showIntroAnimation" class="venice">
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
    <div class="venice__blind"></div>
    <div class="venice__blind"></div>
    <div class="venice__blind"></div>
    <div class="venice__blind"></div>
    <div class="venice__blind"></div>
    <!-- Mobile: Hide every other blind for cleaner look -->
    <div class="venice__blind venice__blind--desktop"></div>
    <div class="venice__blind venice__blind--desktop"></div>
    <div class="venice__blind venice__blind--desktop"></div>
    <div class="venice__blind venice__blind--desktop"></div>
    <div class="venice__blind venice__blind--desktop"></div>
  </div>
  <UINavBar />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style lang="scss">
  html,
  body {
    margin: 0;
    padding: 0;
    /*min-height: 100vh; */
    transition: background-color 1s;
    background-color: $primary;
    -webkit-font-smoothing: antialiased;
    -moz-font-smoothing: antialiased;
    -o-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: $sans-text;
    font-variation-settings: 'slnt' 0, 'wght' 500;
    /*overscroll-behavior-y, No fan of bounce on mobile but a hard stop can cause issues too*/
    @supports (height: 100svh) {
      min-height: 100svh;
    }
  }

  html {
    min-height: 100vh;
  }

  body {
    min-height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }

  /*SVG intro*/
  .fav-base {
    position: absolute;
    width: 100px;
    height: auto;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 10000;
    opacity: 0;
  }

  /* Modern scrollbar for WebKit (Chrome, Safari, newer Edge) */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(
      44,
      42,
      56,
      0.4
    ); /* accent1 with 40% opacity (increased from 30%) */
    border-radius: 4px;
    transition: background 0.2s ease;

    &:hover {
      background: rgba(44, 42, 56, 0.5); /* accent1 with 50% opacity on hover */
    }
  }

  /* For Firefox */
  * {
    scrollbar-width: thin;
    scrollbar-color: rgba(44, 42, 56, 0.4) transparent; /* accent1 with 40% opacity (increased from 30%) */
  }

  /* Dark mode specific styles */
  .dark-mode {
    &::-webkit-scrollbar-thumb {
      background: rgba(
        190,
        193,
        198,
        0.4
      ); /* accent2 with 40% opacity (increased from 30%) */

      &:hover {
        background: rgba(
          190,
          193,
          198,
          0.5
        ); /* accent2 with 50% opacity on hover */
      }
    }

    * {
      scrollbar-color: rgba(190, 193, 198, 0.4) transparent; /* accent2 with 40% opacity (increased from 30%) */
    }
  }

  @supports (-webkit-touch-callout: none) {
    body {
      padding-bottom: env(safe-area-inset-bottom);
    }
  }

  .venice {
    position: fixed;
    top: 0;
    left: 0;
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
    pointer-events: none;

    &__blind {
      position: relative;
      top: 0;
      overflow: hidden;
      flex: 1;
      height: 100%;
      background-color: $secondary;
      margin-left: -1px;
      will-change: transform, opacity;
      transform: translateZ(0); /* Force hardware acceleration */
      backface-visibility: hidden;
      contain: layout style paint;
      pointer-events: none;

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
