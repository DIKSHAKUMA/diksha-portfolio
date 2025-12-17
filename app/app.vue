<script setup lang="ts">
  import { ExpoScaleEase } from 'gsap/all'
  import { useFolioStore } from '../stores/useFolioStore'
  import { useBlogStore } from '../stores/useBlogStore'

  const route = useRoute()

  /* Pinia 🍍 */
  const store = useFolioStore()
  await callOnce('projects', () => store.fetchData())

  const blogStore = useBlogStore()
  await callOnce('blog', () => blogStore.fetchData())

  const isLoaded = ref(false)
  const showIntroAnimation = ref(false)
  const percNum = ref(0)
  const { $gsap } = useNuxtApp()

  let cachedBlinds: any[] = []

  /*
    The simplistic approach with not turning venice blinds into a component works the fastest.
    Or else you end up having to create a plugin, hoping its defined, and watching it.
    This slows down performance which is super important for this middleware transition.

    TODO: Writeup about how middleware can be used to enhance page transitions in Nuxt.
    */
  onMounted(() => {
    $gsap.registerPlugin(ExpoScaleEase)
    isLoaded.value = true
    cachedBlinds = $gsap.utils.toArray('.venice__blind')
    $gsap.set(cachedBlinds, { scaleX: 0, force3D: true })

    /* Show intro animation on homepage */
    const isHomepage = route.path === '/'

    if (isHomepage) {
      showIntroAnimation.value = true

      const tl = $gsap.timeline()

      tl.set('.benevolent-ldr', { autoAlpha: 1 })
        .fromTo(
          '.benevolent-ldr__gfx',
          {
            scaleX: 1,
            immediateRender: true,
          },
          {
            delay: 0,
            scaleX: 0,
            duration: 2.5,
            transformOrigin: 'right center',
            ease: 'cubic-bezier(0.33, 1, 0.68, 1)',
          }
        )
        .to(
          percNum, // mutations, not percNum.value here wake up!
          {
            value: 100,
            duration: 2.5,
            ease: 'cubic-bezier(0.33, 1, 0.68, 1)',
          },
          '<'
        )
        .to('.benevolent-ldr__gfx', { autoAlpha: 0, ease: 'power2.out' })
        .to(
          '.benevolent-ldr',
          {
            autoAlpha: 0,
            ease: 'power2.out',
          },
          '<'
        )
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
      $gsap.set('.venice', { visibility: 'hidden', opacity: 0 })
      $gsap.set('.benevolent-ldr', { autoAlpha: 0, visibility: 'hidden' })
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
  <div class="benevolent-ldr">
    <div class="benevolent-ldr__gfx" />
    <div class="benevolent-ldr__perc">{{ Math.round(percNum) }}%</div>
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
    height: 100dvh;
    height: 100vh;
    overscroll-behavior: auto;
  }

  body {
    height: 100%;
  }

  * {
    box-sizing: border-box;
  }

  /*SVG intro*/
  .benevolent-ldr {
    background-color: $secondary;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    opacity: 0;
    z-index: 10000;
    &__gfx {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      background-color: $primary;
      backface-visibility: hidden;
    }
    &__perc {
      position: absolute;
      right: $px-16-spacer;
      bottom: $px-16-spacer;
      font-family: $sans-ui-mono;
      font-size: clamped(20px, 36px, 480px, 1920px);
      letter-spacing: 0.08em;
      color: $secondary;
      font-weight: 400;
      mix-blend-mode: difference;

      @include this-and-above('md') {
        right: $px-64-spacer;
        mix-blend-mode: difference;
      }
    }
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
