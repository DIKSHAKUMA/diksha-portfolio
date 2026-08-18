<script setup lang="ts">
  definePageMeta({
    layout: 'default',
    pageTransition: {
      name: 'saki',
      mode: 'out-in',
    },
  })

  /* SEO Meta Tags for Home Page */
  useSeoMeta({
    description:
      'Creative developer and designer crafting digital experiences with modern web technologies. Specializing in Vue.js, Nuxt.js, and interactive code.',
    keywords:
      'Diksha Kumari, creative developer, web designer, Vue.js, Nuxt.js, Svelte, APIs, frontend developer, portfolio, interactive design',
    author: 'Diksha Kumari',
    robots: 'index, follow',
    viewport: 'width=device-width, initial-scale=1.0, viewport-fit=cover',

    /* Open Graph */
    ogTitle: 'Diksha Kumari • Creative Dev.',
    ogDescription:
      'Creative developer and designer crafting digital experiences with modern web technologies.',
    ogImage: '/og-image.jpg',
    ogImageAlt: 'Diksha Kumari Portfolio',
    ogType: 'website',
    ogUrl: 'https://dikshakumari.dev',
    ogSiteName: 'Diksha Kumari • Creative Dev.',
  })

  /* Structured Data*/
  useSchemaOrg([
    {
      '@type': 'Person',
      name: 'Diksha Kumari',
      jobTitle: 'Creative Developer & Designer',
      url: 'https://dikshakumari.dev',
      sameAs: [
        'https://github.com/DIKSHAKUMA',
        'https://www.linkedin.com/in/dikshavibe',
        'https://www.linkedin.com/in/dikshavibe',
      ],
      knowsAbout: [
        'Web Development',
        'Vue.js',
        'Nuxt.js',
        'Creative Coding',
        'UI/UX Design',
        'APIs',
        'Svelte',
      ],
    },
    {
      '@type': 'WebSite',
      name: 'Diksha Kumari Portfolio',
      url: 'https://dikshakumari.dev',
      description:
        'Creative developer. I express content through motion and interactivity.',
      author: {
        '@type': 'Person',
        name: 'Diksha Kumari',
      },
    },
  ])

  const { $lenis } = useNuxtApp()

  onMounted(() => {})
</script>

<template>
  <div>
    <UIMouseCursor />
    <div class="home-wrapper">
      <ViewHeroHome />
      <LazyViewParallaxHome />
      <LazyViewProjectsHome />
      <LazyViewAwardsHome />
      <LazyViewKnowledgeSub />
      <LazyViewTechSub />
      <LazyViewFooterSub
        hydrate-on-idle
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
    min-height: 100dvh;
    min-height: 100vh;
    height: 100%;
  }
</style>
