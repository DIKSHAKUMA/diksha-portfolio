<script setup lang="ts">
  definePageMeta({
    layout: 'default',
    pageTransition: {
      name: 'saki',
      mode: 'out-in',
    },
  })

  const { $lenis } = useNuxtApp()

  onMounted(() => {
    
    $lenis.scrollTo(0, { immediate: true, force: true })
    
    // Multiple refresh attempts to handle async content loading
    // Home page has PIXI animations, images, and GSAP ScrollTriggers
    const refreshDelays = [1000, 2000, 3000] // Progressive refresh
    
    refreshDelays.forEach(delay => {
      setTimeout(() => {
        if (($lenis as any).refresh) {
          ($lenis as any).refresh()
        }
      }, delay)
    })
    
    // Also refresh on window load (all resources loaded)
    window.addEventListener('load', () => {
      setTimeout(() => {
        if (($lenis as any).refresh) {
          ($lenis as any).refresh()
        }
      }, 500)
    })
  })
</script>

<template>
  <div>
    <UIMouseCursor />
    <div class="home-wrapper">
      <ViewHeroHome />
      <ViewParallaxHome />
      <ViewProjectsHome />
      <ViewKnowSub />
      <ViewMetaSub />
      <ViewFooterSub
        label="Projects"
        link="/projects"
        target="_self"
        linkLabel="View"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .home-wrapper {
    position: relative;
    overflow-x: hidden;
    z-index: inherit;
  }
</style>
