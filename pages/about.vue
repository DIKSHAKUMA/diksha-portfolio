<script setup lang="ts">
  definePageMeta({
    layout: 'default',
    pageTransition: {
      name: 'saki',
      mode: 'out-in',
    },
  })

  onMounted(() => {
    const { $lenis } = useNuxtApp()
    $lenis.scrollTo(0, { immediate: true, force: true })
  })

  onUnmounted(() => {})
</script>
<!--Shows all projects, something in a horizontal style using draggable-->
<template>
  <div>
    <UIMouseCursor />
    <div class="about-outer-wrapper">
      <ViewHeroAbout />
      <ViewParallaxAbout />
      <ViewTimelineAbout />
      <ViewCodeSub />
      <ViewKnowSub />
      <ViewFooterSub
        label="Explore"
        link="https://thomasthorstensson.photography"
        target="_blank"
        link-label="Lens"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .about-outer-wrapper {
    flex-flow: column;
    display: flex;
    position: relative;
    overflow-x: visible;
    z-index: inherit;
    overflow: hidden;
  }
</style>
