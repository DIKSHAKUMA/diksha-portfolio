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
    <div class="blog-outer-wrapper">
      <ViewHeroBlog />
      <ViewBlogExcerpts />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .blog-outer-wrapper {
    flex-flow: column;
    display: flex;
    position: relative;
    overflow-x: visible;
    z-index: inherit;
    overflow-x: hidden;
    min-height: 100vh;
    overscroll-behavior-y:contain;
 
    @supports (height: 100svh) {
      min-height: 100svh;
    }
    /* Prevent SCSS parsing errors */
  }
</style>
