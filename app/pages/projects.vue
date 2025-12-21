<script setup lang="ts">
  import { useNavbarStore } from '../../stores/useNavbarStore'
  const navbarStore = useNavbarStore()
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
    if (import.meta.client) navbarStore.setTransparent(true, 'projects')
  })

  onUnmounted(() => {
  
  })
</script>
<!--Shows all projects, something in a horizontal style using draggable-->
<template>
  <div>
    <UIMouseCursor />
    <div class="projects-outer-wrapper">
      <ViewProjects />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .projects-outer-wrapper {
    flex-flow: column;
    display: flex;
    position: relative;
    overflow-x: visible;
    z-index: inherit;
    overflow: hidden;
    height: 100vh;
    min-height: 100dvh;
  }
</style>
