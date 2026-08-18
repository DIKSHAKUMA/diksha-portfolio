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
    title: 'About Diksha Kumari • Full-Stack Developer',
    description:
      'Learn about Diksha Kumari, a full-stack developer specializing in modern web technologies, creative coding, and innovative digital experiences.',
    ogTitle: 'About Diksha Kumari',
    ogDescription:
      'Full-stack developer specializing in modern web technologies, creative coding, and innovative digital experiences.',
    ogType: 'profile',
    twitterCard: 'summary_large_image',
    twitterTitle: 'About Diksha Kumari',
    twitterDescription:
      'Full-stack developer specializing in modern web technologies, creative coding, and innovative digital experiences.',
  })

  /* Canonical URL */
  useHead({
    link: [
      {
        rel: 'canonical',
        href: 'https://dikshakumari.dev/about',
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
        link="https://github.com/DIKSHAKUMA"
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
