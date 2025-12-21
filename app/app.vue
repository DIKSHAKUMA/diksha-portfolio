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
  const circle = ref(null)
  const percText = ref(null)

  let cachedBlinds: any[] = []

  /*
    The simplistic approach with not turning venice blinds into a component works the fastest.

    Here, tight coupling works: because speed on initialization is of essence. Not bouncing
    around subccomponent props and waiting for them to mount. (Love that, but not here.)

    TODO: Writeup about how middleware can be used to enhance page transitions in Nuxt.
    */

  onMounted(() => {
    $gsap.registerPlugin(ExpoScaleEase)
    isLoaded.value = true
    cachedBlinds = $gsap.utils.toArray('.venice__blind')
    $gsap.set(cachedBlinds, { scaleX: 0, force3D: true })

    /* Show intro animation on homepage */
    const isHomepage = route.path === '/'
    const tl = $gsap.timeline()

    if (isHomepage) {
      showIntroAnimation.value = true

      // Set initial state for circle
      $gsap.set([circle.value, percText.value], {
        strokeDasharray: 283, // 2 * π * r (2 * 3.14159 * 45)
        strokeDashoffset: 283,
        strokeOpacity: 0,
        opacity: 0,
      })

      // Animate the circle
      tl.set('.circle-preloader', { autoAlpha: 1 })
        .to(
          [circle.value, percText.value],
          {
            strokeDashoffset: 0,
            strokeOpacity: 1, // Fade in as it draws
            opacity: 1, // Fade in the text
            duration: 2.5,
            ease: 'cubic-bezier(0.33, 1, 0.68, 1)',
          },
          0
        ) // Start at the same time as other animations
        .to(
          percNum,
          {
            value: 100,
            duration: 2.5,
            ease: 'cubic-bezier(0.33, 1, 0.68, 1)',
          },
          '<'
        )
        .to('.circle-preloader', {
          autoAlpha: 0,
          duration: 0.5,
          ease: 'power2.out',
        })
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
      tl.fromTo(
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
  <div class="circle-preloader" :class="{ 'is-visible': showIntroAnimation }">
    <svg class="circle-preloader__svg" viewBox="0 0 100 100">
      <circle
        ref="circle"
        class="circle-preloader__path"
        cx="50"
        cy="50"
        r="45"
        stroke-opacity="0"
      />
    </svg>
    <div ref="percText" class="circle-preloader__perc" style="opacity: 0">
      {{ Math.round(percNum) }}%
    </div>
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
  .circle-preloader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: $secondary;
    z-index: 10000;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s, visibility 0.3s;

    &.is-visible {
      opacity: 1;
      visibility: visible;
    }

    &__svg {
      width: 100px;
      height: 100px;
      transform: rotate(-90deg);
    }

    &__path {
      fill: none;
      stroke: $accent1;
      stroke-width: 10;
      stroke-linecap:square;
    }

    &__perc {
      margin-top: 20px;
      color: $accent1;
      font-size: 1.2rem;
      font-weight: 600;
      font-family: $sans-ui-mono;
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