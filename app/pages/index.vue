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
      'Diksha Kumari is a software engineer building dependable AI products, real time systems and cross platform applications with React, TypeScript, Node.js and Python.',
    keywords:
      'Diksha Kumari, software engineer, AI engineer, React, TypeScript, Node.js, Python, real time systems, desktop applications, portfolio',
    author: 'Diksha Kumari',
    robots: 'index, follow',
    viewport: 'width=device-width, initial-scale=1.0, viewport-fit=cover',

    /* Open Graph */
    ogTitle: 'Diksha Kumari | Software Engineer',
    ogDescription:
      'Software engineer building dependable AI products, real time systems and cross platform applications.',
    ogImage: '/og-image.jpg',
    ogImageAlt: 'Diksha Kumari Portfolio',
    ogType: 'website',
    ogUrl: 'https://dikshakumari.dev',
    ogSiteName: 'Diksha Kumari | Software Engineer',
  })

  /* Structured Data*/
  useSchemaOrg([
    {
      '@type': 'Person',
      name: 'Diksha Kumari',
      jobTitle: 'Software Engineer',
      url: 'https://dikshakumari.dev',
      sameAs: [
        'https://github.com/DIKSHAKUMA',
        'https://www.linkedin.com/in/dikshavibe',
      ],
      knowsAbout: [
        'Software Engineering',
        'Artificial Intelligence',
        'React',
        'TypeScript',
        'Node.js',
        'Python',
        'Real Time Systems',
        'Desktop Applications',
      ],
    },
    {
      '@type': 'WebSite',
      name: 'Diksha Kumari Portfolio',
      url: 'https://dikshakumari.dev',
      description:
        'Software engineer building dependable AI products and practical digital systems.',
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
