<script setup lang="ts">
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  import { useBlogStore } from '~/store/useBlogStore'

  const mdcContentReady = ref(false)
  const store = useBlogStore()
  const route = useRoute()
  const { $gsap } = useNuxtApp()
  const showSidebar = ref(false)

  definePageMeta({
    layout: 'default',
    key: (route) => route.fullPath,

    /* DO NOT REMOVE THIS! APOLLO STICKER TAPED TO CONSOLE. */
    /* EVEN GLOBAL ROUTE TRANSITIONS NEED A SAKI. GOD DAMN IT I WROTE IT, NOW I'LL NEVER FORGET IT. */
    pageTransition: {
      name: 'saki',
      mode: 'out-in',
    },
  })

  const post = computed(() => {
    return store.data?.posts?.find((post: any) => post.slug === route.params.id)
  })

  const relatedPosts = computed(() => {
    /* Stricter early returns to prevent unnecessary computation */
    if (!post.value?.tags?.length || !store.data?.posts?.length) return []

    const currentTags = post.value.tags
    const currentSlug = post.value.slug

    /* Early return if no current tags to match against */
    if (!Array.isArray(currentTags) || currentTags.length === 0) return []

    return store.data.posts
      .filter((p: any) => {
        /* Stricter checks to prevent errors */
        if (!p || p.slug === currentSlug || !p.tags?.length) return false
        return p.tags.some((tag: string) => currentTags.includes(tag))
      })
      .slice(0, 3) /* Limit to 3 related posts */
  })

  /* Reading time estimation */
  const readingTime = computed(() => {
    if (!post.value?.content) return '5 min read'
    const words = post.value.content.split(' ').length
    const minutes = Math.ceil(words / 200) /* Average reading speed */
    return `${minutes} min read`
  })

  /* SEO Meta Tags */
  useSeoMeta({
    title: () => post.value ? `${post.value.title} • Thomas Thorstensson` : 'Blog Post',
    description: () => post.value?.subject || 'Read this blog post by Thomas Thorstensson',
    ogTitle: () => post.value?.title,
    ogDescription: () => post.value?.subject,
    ogImage: () => post.value?.coverImage?.handle,
    ogType: 'article',
    articleAuthor: () => post.value?.authors?.[0]?.name,
    articlePublishedTime: () => post.value?.date,
    articleTag: () => post.value?.tags,
    twitterCard: 'summary_large_image',
    twitterTitle: () => post.value?.title,
    twitterDescription: () => post.value?.subject,
    twitterImage: () => post.value?.coverImage?.handle,
  })

  /* Canonical URL */
  useHead({
    link: [
      {
        rel: 'canonical',
        href: () => `https://thomasthorstensson.com/blog-post/${post.value?.slug}`
      }
    ]
  })

  /* Structured Data for SEO */
  useSchemaOrg([
    defineArticle({
      headline: () => post.value?.title,
      description: () => post.value?.subject,
      image: () => post.value?.coverImage?.handle,
      datePublished: () => post.value?.date,
      dateModified: () => post.value?.updatedAt || post.value?.date,
      author: {
        name: () => post.value?.authors?.[0]?.name || 'Thomas Thorstensson',
        url: 'https://thomasthorstensson.com/about'
      },
      publisher: {
        name: 'Thomas Thorstensson',
        url: 'https://thomasthorstensson.com'
      }
    }),
    defineBreadcrumb([
      { name: 'Home', item: '/' },
      { name: 'Blog', item: '/blog' },
      { name: () => post.value?.title, item: () => `/blog-post/${post.value?.slug}` }
    ])
  ])

  const runTrigger = () => {
    $gsap.context(() => {
      /* And for images */
      const images = $gsap.utils.toArray('.blog__post-cover img')
      images.forEach((img: any) => {
        $gsap.to(img, {
          opacity: 1,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: img,
            start: 'top 85%' /* Consistent with text */,
            end: 'top 60%',
            /* onEnter, onLeave, onEnterBack, and onLeaveBack, */
            toggleActions: 'play none none reverse',
            preventOverlaps: true,
            fastScrollEnd: true,
            anticipatePin: 1,
          },
        })
      })
    })
  }

  onMounted(() => {
    $gsap.registerPlugin(ScrollTrigger)
    $gsap.set('.blog__post-cover img', { opacity: 0 })
    $gsap.delayedCall(1, runTrigger)

    /* Show sidebar after page transition completes */
    $gsap.delayedCall(2, () => {
      showSidebar.value = true
    })
  })

  /* Function to add classes to MDC links after content loads */
  const setupMDCLinks = () => {

    setTimeout(() => {
      const contentContainer = document.querySelector('.blog__post-content')
      if (!contentContainer) return

      const links = contentContainer.querySelectorAll('a')
      const allElements = contentContainer.querySelectorAll('*')

      const allPageLinks = document.querySelectorAll('a')

      links.forEach((link: Element) => {
        link.setAttribute('target', '_blank')
        link.setAttribute('data-name', 'menu')
        link.classList.add('action')
      })

      mdcContentReady.value = true

    }, 500) 
  }

  onUnmounted(() => {
    try {
      $gsap.context().kill()
    } catch (error) {
      /* Silently handle cleanup errors */
    }
  })
</script>

<template>
  <div>
    <div v-if="mdcContentReady">
      <UIMouseCursor />
    </div>
    <div class="blog-post-wrapper">
      <div class="blog">
        <main class="blog__post">
          <div v-if="post">
            <CommonAbstract
              :is-page-title="true"
              :label="post.title"
              :desc="post.subject"
              :delay="1"
              :class-name="'blog-intro'"
              :is-full-width="true"
              :author="post.authors[0].name"
              :date="post.date"
              :is-hero="false"
              :is-secondary="false"
              :is-two-lines="false"
            />

            <div class="blog__post-cover">
              <NuxtImg
                :src="post.coverImage?.handle"
                provider="hygraph"
                :alt="post.title ? `Cover image for ${post.title}` : 'Blog post cover image'"
                format="webp"
                sizes=" sm:100vw md:65vw lg:65vw xl:45vw"
                densities="x1 x2"
              ></NuxtImg>
            </div>
            <div
              class="blog__post-content"
              :class="{ 'blog__post-content--show': mdcContentReady }"
            >
              <ClientOnly>
                <MDC
                  :value="post.content"
                  ref="mdc"
                  @vue:mounted="setupMDCLinks"
                />
                <template #fallback>
                  <div class="mdc-loading">
                    <div class="mdc-skeleton"></div>
                    <div class="mdc-skeleton"></div>
                    <div class="mdc-skeleton short"></div>
                    <div class="mdc-skeleton"></div>
                  </div>
                </template>
              </ClientOnly>
            </div>
          </div>
        </main>

        <div class="share-buttons">
          <SocialShare
            class="action"
            data-name="menu"
            v-for="network in ['bluesky', 'pocket', 'linkedin', 'pinterest']"
            :key="network"
            :network="network"
            :styled="true"
            :label="false"
          />
        </div>

        <div class="blog__related-posts" v-if="relatedPosts.length > 0">
          <h1>Related Posts</h1>
          <div class="related-posts-list">
            <NuxtLink
              v-for="relatedPost in relatedPosts"
              :key="relatedPost.slug"
              :to="`/blog-post/${relatedPost.slug}`"
              class="related-post"
            >
              <div class="related-post__content action" data-name="menu">
                <h3 class="related-post__title">{{ relatedPost.title }}</h3>
                <p class="related-post__subject">{{ relatedPost.subject }}</p>
                <div class="related-post__meta">
                  <span class="related-post__date">{{ relatedPost.date }}</span>
                  <span class="related-post__length">{{
                    relatedPost.length
                  }}</span>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Word of the Day Sidebar - Desktop Only -->
      <aside class="word-sidebar">
        <UIWordOfDay v-if="showSidebar" />
        <div v-else class="word-sidebar-placeholder"></div>
      </aside>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  /* Deep to reach into MDC Markdown */
  :deep(*) {
    word-wrap: break-word;
    overflow-wrap: break-word;
    word-break: break-word;
    hyphens: auto;
  }

  :deep(figure) {
    margin: $px-32-spacer 0;

    img {
      width: 100%;
      max-width: 100%;
      height: auto;
      border-radius: 4px;

      @include this-and-above('md') {
        /* Slightly larger on tablets */
        width: 60%;
      }

      @include this-and-above('lg') {
        /* Even larger on desktop - break out of content width */
        width: 60%;
      }
    }
  }

  :deep(figure figcaption),
  :deep(em) {
    font-size: 14px;
  }

  .blog-post-wrapper {
    display: flex;
    flex-direction: column;
    position: relative;
    overflow-x: visible;
    z-index: inherit;
    margin: 0 auto;

    padding: 0 $px-16-spacer;

    @include this-and-above('md') {
      padding: 0 $px-64-spacer;
    }

    @include this-and-above('lg') {
      padding: 0 $px-64-spacer;
    }

    @include this-and-above('xl') {
      flex-direction: row;
      padding: 0 $px-128-spacer;
    }

    @include this-and-above('xxl') {
      padding: 0 $px-256-spacer;
    }
  }

  .blog {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-self: flex-start;
    margin: $px-128-spacer 0 $px-64-spacer 0;

    &__line {
      margin: $px-64-spacer 0 $px-64-spacer 0;
    }

    &__post-cover {
      position: relative;
      overflow: hidden;
    }

    &__post-content {
      margin-top: $px-64-spacer;
      color: $secondary;
      font-size: clamped(16px, 20px, 380px, 1920px);
      max-width: 100vw;
      opacity: 0;
      transition: opacity 0.8s cubic-bezier(0.55, 0.085, 0.68, 0.53);

      &--show {
        opacity: 1;
      }

      /* Fix Shiki code block overflow on mobile */
      :deep(pre.shiki) {
        overflow-x: auto;
        padding: $px-16-spacer;
        border-radius: 4px;

        code {
          display: block;
          width: max-content;
          min-width: 100%;
        }

        .line {
          display: block;
          white-space: pre;
          word-break: break-all;
          overflow-wrap: anywhere;

          @include this-and-above('sm') {
            white-space: pre;
            word-break: break-all;
          }
        }
      }

      @include this-and-above('xl') {
        max-width: 55vw;
      }
    }
  }

  .word-sidebar {
    margin-top: 0px;
    flex: none; /* Don't stretch on mobile */

    @include this-and-above('xl') {
      display: block;
      margin-top: $px-256-spacer;
      flex: 1; /* Only stretch on desktop */
    }
  }

  .word-sidebar-placeholder {
    background-color: $primary;
    border: 2px solid $accent2;
    padding: $px-32-spacer;
    position: sticky;
    top: $px-32-spacer;
    min-width: 200px;
    min-height: 200px;
    opacity: 0.3;

    @include this-and-above('xl') {
      display: block;
    }

    @media (max-width: 1279px) {
      display: none;
    }
  }

  .share-buttons {
    display: flex;
    flex-wrap: wrap;
    margin-top: $px-16-spacer;
  }

  .social-share-button {
    color: $accent2;
    padding: 1rem;
    aspect-ratio: 1;
    border-radius: 0;
  }

  .blog__related-posts {
    margin-top: $px-32-spacer;
  }

  .related-posts-list {
    display: flex;
    flex-direction: column;
    gap: $px-16-spacer;
  }

  .related-post {
    display: block;
    text-decoration: none;
    color: inherit;
    border: 2px solid $accent2;
    padding: $px-16-spacer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 0%;
      background-color: $accent2;
      transition: height 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      z-index: 1;
    }

    &:hover {
      filter: blur(0px);

      &::before {
        height: 100%;
      }

      .related-post__title,
      .related-post__subject,
      .related-post__meta {
        color: $primary;
        backface-visibility: hidden;
        transform: translateZ(0);
      }
    }

    &__content {
      position: relative;
      z-index: 2;
    }

    &__title {
      font-size: clamped(18px, 24px, 480px, 1920px);
      font-variation-settings: 'wght' 600;
      color: $secondary;
      margin-bottom: $px-8-spacer;
      transition: all 0.3s ease;
    }

    &__subject {
      font-size: clamped(12px, 14px, 480px, 1920px);
      color: $secondary;
      margin-bottom: $px-8-spacer;

      transition: all 0.3s ease;
    }

    &__meta {
      display: flex;
      justify-content: space-between;
      font-size: clamped(12px, 14px, 480px, 1920px);
      color: $accent2;
      transition: all 0.3s ease;
    }

    &__date,
    &__length {
      font-variation-settings: 'wght' 500;
    }
  }

  /* MDC Loading Skeleton */
  .mdc-loading {
    margin-top: $px-64-spacer;
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  .mdc-skeleton {
    height: 1.2em;
    background: linear-gradient(
      90deg,
      $accent2 25%,
      rgba(250, 247, 255, 0.1) 50%,
      $accent2 75%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    margin-bottom: $px-16-spacer;
    border-radius: 4px;

    &.short {
      width: 60%;
    }
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }

    50% {
      opacity: 0.5;
    }
  }

  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }

    100% {
      background-position: 200% 0;
    }
  }

  /* Fix superscript line height issues */
  :deep(sup) {
    position: relative;
    top: -0.5em;
    font-size: 0.75em;
    line-height: 0;
    vertical-align: baseline;
  }
</style>
