<script setup lang="ts">
  definePageMeta({
    layout: 'default',
    pageTransition: {
      name: 'saki',
      mode: 'out-in',
    },
  })

  onMounted(() => {

  })

  onUnmounted(() => {})
</script>

<template>
  <div>
    <UIMouseCursor />
    <div class="blog-outer-wrapper">
      <ViewHeroBlog/>
      <ViewBlogExcerpts />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .blog-outer-wrapper {
    flex-flow: column;
    display: flex;
    position: relative;
    z-index: inherit;
    height: 100%;
    overflow: hidden;
    /* Prevent SCSS parsing errors */
  }
</style>
