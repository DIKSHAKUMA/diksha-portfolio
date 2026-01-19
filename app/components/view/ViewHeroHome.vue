<script setup lang="ts">
  import * as PIXI from 'pixi.js'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  import { useFolioStore } from '../../../stores/useFolioStore'
  /* PINIA */
  const store = useFolioStore()
  const { $gsap } = useNuxtApp()
  let ctx: gsap.Context

  onMounted(async () => {
    if (import.meta.client) {
      /* Context! The friendly GSAP garbage collector */
      ctx = $gsap.context((self) => {
        /* Move abstract wrapper up when user starts scrolling */
        $gsap.to('.front-header', {
          y: -40,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.hero-wrapper',
            start: 'bottom bottom-=200',
            end: 'bottom top',
            scrub: 1,
            invalidateOnRefresh: false,
          },
        })
      })
    }
  })

  onUnmounted(() => {
    /* Clean up GSAP context */
    ctx?.revert()
  })
</script>

<template>
  <main class="hero-wrapper">
    <AnimWaves />
    <!--:className here is for gsap is-hero changes bottom margins for wrapper and header-->
    <CommonAbstract
      class="front-header"
      :label="store.data.intro?.heroIntroTitle"
      :delay="1"
      :is-page-header="false"
      :desc="store.data.intro?.heroIntroDesc"
      :class-name="'home-intro'"
      :is-hero="true"
      :is-full-width="false"
      :is-secondary="false"
      :is-two-lines="true"
      :author="''"
      :date="''"
    />
    <AnimAvailableForWork class="work-badge" />
  </main>
</template>

<style lang="scss" scoped>
  .hero-wrapper {
    position: relative;
    padding: 0 $px-16-spacer;
    overflow: hidden;
    min-height: 100vh;
    min-height: 100dvh;

    @include this-and-above('md') {
      padding: 0 $px-64-spacer;
    }
  }

  .front-header {
    position: absolute;
    bottom: 0px;
    z-index: 20;
    &--ios-safari {
      bottom: 0px;
    }
  }
</style>
