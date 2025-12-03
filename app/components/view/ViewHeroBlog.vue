<script setup lang="ts">
  import { useFolioStore } from '../../../stores/useFolioStore'

  /* PINIA 🍍 */
  const store = useFolioStore()

  /* Computed to ensure proper typing */
  const blogTitle = computed(
    () => (store.data.intro?.blogTitle as string) || ''
  )
</script>

<template>
  <main ref="main" class="hero-wrapper">
    <AnimRandomWords />
    <!--:className here is for gsap is-hero changes bottom margins for wrapper and header-->
    <CommonAbstract
      class="front-header"
      :label="store.data.intro?.blogTitle"
      :desc="''"
      :is-page-header="false"
      :delay="0"
      :class-name="'blog-intro'"
      :is-hero="true"
      :is-full-width="false"
      :is-secondary="false"
      :author="''"
      :date="''"
      :is-page-title="false"
      :is-two-lines="false"
    />
  </main>
</template>

<style lang="scss" scoped>
  .hero-wrapper {
    position: relative;
    width: 100%;
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
    transform: translateZ(0);
  }
</style>
