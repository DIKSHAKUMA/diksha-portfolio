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
    title: 'Thomas Thorstensson • Creative Developer & Designer',
    description: 'Creative developer and designer crafting digital experiences with modern web technologies. Specializing in Vue.js, Nuxt.js, and interactive code.',
    keywords: 'Thomas Thorstensson, creative developer, web designer, Vue.js, Nuxt.js, Svelte, APIs, frontend developer, portfolio, interactive design',
    author: 'Thomas Thorstensson',
    robots: 'index, follow',
    
    /* Open Graph */
    ogTitle: 'Thomas Thorstensson • Creative Developer & Designer',
    ogDescription: 'Creative developer and designer crafting digital experiences with modern web technologies.',
    ogImage: '/og-image.jpg',
    ogImageAlt: 'Thomas Thorstensson Portfolio',
    ogType: 'website',
    ogUrl: 'https://thomasthorstensson.com',
    ogSiteName: 'Thomas Thorstensson Portfolio',
  })

  /* Structured Data*/
  useSchemaOrg([
    {
      '@type': 'Person',
      name: 'Thomas Thorstensson',
      jobTitle: 'Creative Developer & Designer',
      url: 'https://thomasthorstensson.com',
      sameAs: [
        // Add your social media profiles
        'https://https://github.com/thorstensson',
        'https://linkedin.com/in/thomasthorstensson',
        'https://bsky.app/profile/thorstensson.bsky.social'
      ],
      knowsAbout: ['Web Development', 'Vue.js', 'Nuxt.js', 'Creative Coding', 'UI/UX Design', 'APIs', 'Svelte'],
    },
    {
      '@type': 'WebSite',
      name: 'Thomas Thorstensson Portfolio',
      url: 'https://thomasthorstensson.com',
      description: 'Creative developer. I express content through motion and interactivity.',
      author: {
        '@type': 'Person',
        name: 'Thomas Thorstensson'
      }
    }
  ])

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
