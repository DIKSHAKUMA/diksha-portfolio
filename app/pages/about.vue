<script setup lang="ts">
  definePageMeta({
    layout: 'default',
    pageTransition: {
      name: 'saki',
      mode: 'out-in',
    },
  })

  /* SEO Meta Tags */
  useSeoMeta({
    title: 'About Thomas Thorstensson • Full-Stack Developer',
    description:
      'Learn about Thomas Thorstensson, a full-stack developer specializing in modern web technologies, creative coding, and innovative digital experiences.',
    ogTitle: 'About Thomas Thorstensson',
    ogDescription:
      'Full-stack developer specializing in modern web technologies, creative coding, and innovative digital experiences.',
    ogType: 'profile',
    twitterCard: 'summary_large_image',
    twitterTitle: 'About Thomas Thorstensson',
    twitterDescription:
      'Full-stack developer specializing in modern web technologies, creative coding, and innovative digital experiences.',
  })

  /* Canonical URL */
  useHead({
    link: [
      {
        rel: 'canonical',
        href: 'https://thomasthorstensson.com/about',
      },
    ],
  })

  onMounted(() => {})

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
      <ViewKnowledgeSub />
      <ViewFooterSub
        label="Photography"
        link="https://thomasthorstensson.photography"
        target="_blank"
        link-label="Explore!"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .about-outer-wrapper {
    flex-flow: column;
    display: flex;
    position: relative;
    z-index: inherit;
    height: 100%;
  }
</style>
