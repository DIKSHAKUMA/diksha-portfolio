<script setup lang="ts">
  import { useFolioStore } from '~/store/useFolioStore'

  /* PINIA 🍍 */
  const store = useFolioStore()

  /* Computed to ensure proper typing */
  const blogTitle = computed(
    () => (store.data.intro?.blogTitle as string) || ''
  )

  onMounted(() => {})

  onUnmounted(() => {})
</script>

<template>
  <div>
    <main ref="main" class="hero-wrapper">
      <AnimRandomWords />
      <!--:className here is for gsap is-hero changes bottom margins for wrapper and header-->
      <CommonAbstract
        class="front-header"
        :label="store.data.intro?.blogTitle"
        :desc="''"
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
  </div>
</template>

<style lang="scss" scoped>
  /* TODO: Maybe this hero wrapper should be 50vh instead of 100vh */
  .hero-wrapper {
    position: relative;
    width: 100%;
    height: 100vh;
    height:100dvh;
    padding: 0 $px-16-spacer;
    margin-bottom: $px-64-spacer;

    @include this-and-above('lg') {
      padding: 0 $px-64-spacer;
      margin-bottom: $px-128-spacer;
    }
  }

  .front-header {
    position: absolute;
    bottom: 0px;
  }
</style>
