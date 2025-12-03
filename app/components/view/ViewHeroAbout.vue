<script setup lang="ts">
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  import { useFolioStore } from '../../../stores/useFolioStore'

  /* PINIA 🍍 */
  const store = useFolioStore()
  const { $gsap } = useNuxtApp()

  let ctx: gsap.Context

  onMounted(() => {
    if (import.meta.client) {
      ctx = $gsap.context((self) => {
        /* Pin the hero section, slide ViewHeroAbout on top, yaman */
        ScrollTrigger.create({
          trigger: '.hero-wrapper',
          start: 'top top',
          endTrigger: '.about-wrapper',
          end: 'top 5%',
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
        })
      })
    }
  })
</script>

<template>
  <div>
    <main ref="main" class="hero-wrapper">
      <AnimP5Rings />
      <CommonAbstract
        class="front-header"
        :label="store.data.about?.aboutHeroTitle"
        :delay="1"
        :desc="''"
        :class-name="'about-intro'"
        :is-hero="true"
        :is-full-width="false"
        :is-secondary="false"
        :is-page-header="false"
        :author="''"
        :date="''"
        :is-two-lines="false"
      />
    </main>
  </div>
</template>

<style lang="scss" scoped>
  .hero-wrapper {
    position: relative;
    width: 100%;
    min-height: 100dvh;
    min-height: 100vh;
    overflow: hidden;
    padding: 0 $px-16-spacer;

    @supports (height: 100svh) {
      min-height: 100svh;
    }

    @include this-and-above('lg') {
      padding: 0 $px-64-spacer;
    }
  }

  .front-header {
    position: absolute;
    bottom: 0px;
  }
</style>
