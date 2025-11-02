<script setup lang="ts">
  import { useFolioStore } from '~/store/useFolioStore'
  import '@mux/mux-player'
  /* import { createBlurUp } from '@mux/blurup' */
  /* const blurDataURL = ref<string>('') */
  /* const aspectRatio = ref<any>('') */
  const store = useFolioStore()
  const route = useRoute()
  let ctx: gsap.Context
  /* Optimize performance a litttle */
  let videoObserver: IntersectionObserver | null = null
  let videoObserver2: IntersectionObserver | null = null
  /* const options = {} */

  /* Template refs */
  const infoSection = useTemplateRef<HTMLElement>('infoSection')
  const textSection = useTemplateRef<HTMLElement>('textSection')
  const muxPlayer = useTemplateRef<any>('muxPlayer')
  const muxPlayer2 = useTemplateRef<any>('muxPlayer2')

  /* Suppress Annoying Mux Player shadow DOM warnings */
  if (process.client) {
    const originalWarn = console.warn
    /* Drop any warnings into a spread array */
    console.warn = (...args) => {
      const message = String(args[0] || '')
      if (
        message.includes('No style sheet found') ||
        message.includes('shadow-root') ||
        message.includes('#shadow-root')
      ) {
        return /* Suppress shadow DOM warnings */
      }
      originalWarn.apply(console, args)
    }
  }

  definePageMeta({
    layout: 'default',
    key: (route) => route.fullPath,
    /* DO NOT REMOVE THIS! APOLLO STICKER TAPED TO CONSOLE. */
    pageTransition: {
      name: 'saki',
      mode: 'out-in',
    },
  })

  /* To varaiate middle section a little bit If 6 images, show 2 middle section, if 8 show 4*/
  const middleIndex = computed(() => {
    const totalImages = proj.value?.image?.length || 0
    return totalImages - 3
  })

  const proj = computed(() => {
    return store.data.projects.find(
      (proj: any) => proj.slug === route.params.id
    )
  })

  /* SEO Meta Tags */
  useSeoMeta({
    title: () =>
      proj.value ? `${proj.value.name} • Thomas Thorstensson` : 'Project',
    description: () =>
      proj.value?.description ||
      `${proj.value?.name} - A project by Thomas Thorstensson`,
    ogTitle: () => proj.value?.name,
    ogDescription: () => proj.value?.description,
    ogImage: () => proj.value?.coverImage?.handle,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: () => proj.value?.name,
    twitterDescription: () => proj.value?.description,
    twitterImage: () => proj.value?.coverImage?.handle,
    keywords: () => proj.value?.tags?.join(', '),
  })

  /* Canonical URL */
  useHead({
    link: [
      {
        rel: 'canonical',
        href: () =>
          `https://thomasthorstensson.com/project/${proj.value?.slug}`,
      },
    ],
  })

  /* Structured Data for SEO */
  useSchemaOrg([
    defineWebPage({
      name: () => proj.value?.name,
      description: () => proj.value?.description,
      image: () => proj.value?.coverImage?.handle,
      datePublished: () => proj.value?.date,
      author: {
        name: 'Thomas Thorstensson',
        url: 'https://thomasthorstensson.com/about',
      },
      keywords: () => proj.value?.tags?.join(', '),
      about: () => proj.value?.type,
    }),
    defineBreadcrumb([
      { name: 'Home', item: '/' },
      { name: 'Projects', item: '/projects' },
      {
        name: () => proj.value?.name,
        item: () => `/project/${proj.value?.slug}`,
      },
    ]),
  ])

  /* Get next and previous projects and if we hit the first or last project, loop back to the other end */
  /* Filter out lab projects (those with labUrl) for stepper navigation */
  const nonLabProjects = computed(() => {
    return store.data.projects.filter((proj: any) => !proj.labUrl)
  })

  /* Cache the current project index to avoid repeated findIndex calls */
  const currentProjectIndex = computed(() => {
    return nonLabProjects.value.findIndex(
      (proj: any) => proj.slug === route.params.id
    )
  })

  const getNextProj = computed(() => {
    const index = currentProjectIndex.value
    if (index === -1) return null
    /* If at last project, loop back to first (index 0) */
    const nextIndex = index === nonLabProjects.value.length - 1 ? 0 : index + 1
    return nonLabProjects.value[nextIndex]
  })

  const getPrevProj = computed(() => {
    const index = currentProjectIndex.value
    if (index === -1) return null
    /* If at first project, loop to last project */
    const prevIndex = index === 0 ? nonLabProjects.value.length - 1 : index - 1
    return nonLabProjects.value[prevIndex]
  })

  /* Get video placeholder - REMOVED FOR PERFORMANCE */

  onMounted(() => {
    const { $lenis, $gsap } = useNuxtApp()
    $lenis.scrollTo(0, { immediate: true, force: true })

    /* Defer heavy GSAP setup to next tick for smoother navigation */
    nextTick(() => {
      ctx = $gsap.context((self: any) => {
        $gsap.utils
          .toArray('.project__media')
          .forEach((mediaContainer: any) => {
            /* Set initial state - hidden with scale */
            $gsap.set(mediaContainer, {
              opacity: 0,
              scale: 1.05,
              force3D: true,
            })

            /* Check if this is the first media (data-media="0") or video (data-video="0") */
            const isFirstMedia =
              mediaContainer.getAttribute('data-media')?.trim() === '0'
            const isFirstVideo =
              mediaContainer.getAttribute('data-video')?.trim() === '0'

            let delay = 0
            /* Only the very first element should have delay:
             * - If we have video, only video gets delay (not the first image)
             * - If no video, first image gets delay */
            if (
              proj.value?.video &&
              proj.value.video.length > 0 &&
              proj.value.video[0].playbackId
            ) {
              /* We have video - only video gets delay */
              delay = isFirstVideo ? 1.5 : 0
            } else {
              /* No video - first image gets delay */
              delay = isFirstMedia ? 1.5 : 0
            }

            /* Animate the mask position on scroll */
            $gsap.to(mediaContainer, {
              opacity: 1,
              delay: delay,
              scale: 1,
              duration: 0.3,
              force3D: true,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: mediaContainer,
                start: 'top 85%',
                end: 'top 35%',
                toggleActions: 'play none none reverse',
                preventOverlaps: true,
                fastScrollEnd: true,
                anticipatePin: 1,
                refreshPriority: -1,
              },
            })
          })

        /* Animate project sections */
        if (infoSection.value) {
          $gsap.from(infoSection.value.children, {
            opacity: 0,
            duration: 0.3,
            force3D: true,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: infoSection.value,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
              preventOverlaps: true,
              fastScrollEnd: true,
              anticipatePin: 1,
              refreshPriority: -1,
            },
          })
        }

        if (textSection.value) {
          $gsap.from(textSection.value.children, {
            opacity: 0,
            duration: 0.4,
            force3D: true,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: textSection.value,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
              preventOverlaps: true,
              fastScrollEnd: true,
              anticipatePin: 1,
              refreshPriority: -1,
            },
          })
        }
      }, '.project')
    }) /* Close nextTick */

    /* Add video intersection observer only if project has video */
    if (process.client && proj.value?.video?.[0]?.playbackId) {
      nextTick(() => {
        if (muxPlayer.value) {
          videoObserver = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  muxPlayer.value.play?.()
                } else {
                  muxPlayer.value.pause?.()
                }
              })
            },
            { threshold: 0.1 }
          )

          videoObserver.observe(muxPlayer.value)
        }
      })
    }

    /* Add second video intersection observer if project has second video */
    if (process.client && proj.value?.video?.[1]?.playbackId) {
      nextTick(() => {
        if (muxPlayer2.value) {
          videoObserver2 = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  muxPlayer2.value.play?.()
                } else {
                  muxPlayer2.value.pause?.()
                }
              })
            },
            { threshold: 0.1 }
          )

          videoObserver2.observe(muxPlayer2.value)
        }
      })
    }
  })

  onUnmounted(() => {
    ctx?.revert()
    videoObserver?.disconnect()
    videoObserver2?.disconnect()

    // Cleanup mux player to prevent memory leaks and continued streaming
    if (muxPlayer.value) {
      muxPlayer.value.pause()
      // Additional cleanup if needed
      muxPlayer.value.currentTime = 0
    }
  })
</script>

<template>
  <div>
    <UIMouseCursor />

    <div class="project-wrapper" v-if="proj">
      <main class="project">
        <UIBackButton class="project__back-button" :text="'Back'" :to="''" />
        <CommonAbstract
          :label="proj.name"
          :desc="proj.synop?.[0] || proj.client || ''"
          :is-full-width="false"
          :class-name="'project__abstract'"
          :delay="1"
          :is-hero="false"
          :is-secondary="false"
          :is-page-header="true"
          :author="''"
          :date="''"
          :is-two-lines="true"
        >
        </CommonAbstract>

        <section class="project__content">
          <!-- Video first if exists -->
          <div
            style="
              border-radius: 0px;
              overflow: hidden;
              display: flex;
              background: transparent;
            "
            v-if="proj.video?.[0]?.playbackId"
            class="project__media project__media--video"
            data-video="0"
          >
            <ClientOnly>
              <mux-player
                ref="muxPlayer"
                class="video"
                :playback-id="proj.video[0].playbackId"
                :asset-id="proj.video[0].assetId"
                :autoplay="true"
                :muted="true"
                :controls="false"
                :loop="true"
                :style="{ 'aspect-ratio': '1920/1080' }"
                no-hotkeys
                disable-cookies
                rendition-order="desc"
                max-resolution="1080p"
                preload="metadata"
                prefer-playback="mse"
                accent-color="#fff"
                primary-color="#FFFFFFF"
                secondary-color="#FFFFFFF"
              />
              <template #fallback>
                <div
                  class="video-skeleton"
                  :style="{ 'aspect-ratio': '1920/1080' }"
                ></div>
              </template>
            </ClientOnly>
          </div>

          <!-- First image if NO video -->
          <div
            v-if="!proj.video?.[0]?.playbackId"
            class="project__media project__media--first"
            data-media="0"
          >
            <NuxtImg
              :src="proj.image[0].handle"
              provider="hygraph"
              alt="Project image"
              format="webp"
              sizes="sm:100vw md:40vw lg:35vw xl:80vw"
              densities="x1 x2"
            />
          </div>

          <!-- Info text always after first media item -->
          <div class="project__info" ref="infoSection">
            <div class="project__info-col-1">
              <h4>Challenge</h4>
              <p class="split-proj-w">{{ proj.description[0] }}</p>
              <h4>Perspective</h4>
              <p class="split-proj-w">{{ proj.description[1] }}</p>
            </div>
            <div class="project__info-col-2">
              <div class="project__info-col-2__a">
                <h5 class="split-proj-w">Client</h5>
                <p class="split-proj-w">{{ proj.client }}</p>
                <div v-if="proj.endclient">
                  <h5 class="split-proj-w">End Client</h5>
                  <p class="split-proj-w">{{ proj.endclient }}</p>
                </div>
                <h5 class="split-proj-w">Date</h5>
                <p class="split-proj-w">{{ proj.date }}</p>
                <h5 class="split-proj-w">Duration</h5>
                <p class="split-proj-w">{{ proj.duration }}</p>
                <h5 class="split-proj-w">Type</h5>
                <p class="split-proj-w">{{ proj.type }}</p>
              </div>
              <div class="project__info-col-2__b">
                <h5 class="split-proj-w">Scope</h5>
                <p class="split-proj-w project__info-col-2__b--tags">
                  {{ proj.tags.join(', ') }}
                </p>
                <div v-if="proj.demo">
                  <h5 class="split-proj-w">Demo</h5>
                  <p class="split-proj-w project__info-col-2__b--link">
                    <a :href="proj.demo" target="_blank">{{ proj.demo }}</a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- First image if video exists (comes after info) -->
          <div
            v-if="proj.video?.[0]?.playbackId"
            class="project__media project__media--first"
            data-media="0"
          >
            <NuxtImg
              :src="proj.image[0].handle"
              provider="hygraph"
              alt="Project image"
              format="webp"
              sizes="sm:100vw md:40vw lg:35vw xl:80vw"
              densities="x1 x2"
            />
          </div>

          <!-- Video first if second exists -->
          <div
            style="overflow: hidden; background: transparent"
            v-if="proj.video?.[1]?.playbackId"
            class="project__media project__media--video"
            data-video="1"
          >
            <ClientOnly>
              <mux-player
                ref="muxPlayer2"
                class="video"
                :playback-id="proj.video[1].playbackId"
                :asset-id="proj.video[1].assetId"
                :autoplay="true"
                :muted="true"
                :controls="false"
                :loop="true"
                :style="{ 'aspect-ratio': '1920/1080' }"
                no-hotkeys
                disable-cookies
                rendition-order="desc"
                max-resolution="1080p"
                preload="metadata"
              />
              <template #fallback>
                <div
                  class="video-skeleton"
                  :style="{ 'aspect-ratio': '1920/1080' }"
                ></div>
              </template>
            </ClientOnly>
          </div>

          <!-- Templat here or index will be undefined in comparison -->
          <template v-for="(image, index) in proj.image" :key="image.id">
            <div
              class="project__media"
              v-if="(index as number) > 0 && (index as number) < middleIndex"
            >
              <NuxtImg
                :src="image.handle"
                provider="hygraph"
                alt="Project image"
                format="webp"
                sizes="sm:100vw md:40vw lg:35vw xl:80vw"
                densities="x1 x2"
              />
            </div>
          </template>

          <!-- Another image description -->
          <div class="project__text" ref="textSection">
            <div class="split-proj-w">{{ proj.description[2] }}</div>
          </div>

          <div class="project__media">
            <NuxtImg
              :src="proj.image[middleIndex].handle"
              provider="hygraph"
              alt="Project image"
              format="webp"
              sizes="sm:100vw md:40vw lg:35vw xl:80vw"
              densities="x1 x2"
            />
          </div>

          <div class="project__flex-wrapper">
            <div class="project__img-col-1">
              <div class="project__media">
                <NuxtImg
                  :src="proj.image[middleIndex + 1].handle"
                  provider="hygraph"
                  alt="Project image"
                  format="webp"
                  sizes="sm:100vw md:40vw lg:35vw xl:80vw"
                  densities="x1 x2"
                />
              </div>
            </div>

            <div class="project__img-col-2">
              <div class="project__media">
                <NuxtImg
                  :src="proj.image[middleIndex + 2].handle"
                  provider="hygraph"
                  alt="Project image"
                  format="webp"
                  sizes="sm:100vw md:40vw lg:35vw xl:80vw"
                  densities="x1 x2"
                  :modifiers="{ animated: true }"
                />
              </div>
            </div>
          </div>

          <!-- Another image description -->
          <div class="project__text" ref="textSection">
            <div class="split-proj-w">{{ proj.description[3] }}</div>
          </div>

          <div v-if="proj.testimonialName">
            <CommonTestimonial
              :name="proj.testimonialName"
              :agency="proj.testimonialAgency"
              :text="proj.testimonialText"
            />
          </div>

          <!-- Client Work History -->
          <ViewClientHistory
            v-if="proj.clientHistory && proj.clientHistory.length > 0"
            :clientName="proj.client"
            :history="proj.clientHistory"
          />
        </section>
        <CommonLine class="project__line" :pos="'relative'" />
        <nav class="project__nav" v-if="getPrevProj && getNextProj">
          <LazyUIProjectStepper
            :prevImg="getPrevProj.image[0].handle"
            :nextImg="getNextProj.image[0].handle"
            :prevName="getPrevProj.name"
            :nextName="getNextProj.name"
            :prev="getPrevProj.slug"
            :next="getNextProj.slug"
            :prevSynop="getPrevProj.synop"
            :nextSynop="getNextProj.synop"
          />
        </nav>
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  :deep(.abstract__desc) {
    margin-top: $px-8-spacer !important;
  }

  img {
    display: block;
    width: 100%;
    height: auto;
    max-width: 2048px;
  }

  h5 {
    font-weight: 600;
    font-variation-settings: 'wght' 600;
  }

  .project-wrapper {
    flex-flow: column;
    display: flex;
    position: relative;
    overflow-x: visible;
    z-index: inherit;

    padding: 0 $px-16-spacer;

    @include this-and-above('md') {
      padding: 0 $px-64-spacer;
    }

    @include this-and-above('lg') {
      padding: 0 $px-64-spacer;
    }

    @include this-and-above('xl') {
      padding: 0 $px-128-spacer;
    }

    @include this-and-above('xxl') {
      padding: 0 $px-256-spacer;
    }
  }

  .project {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-self: flex-start;
    margin-top: 128px;

    &__back-button {
      margin-bottom: $px-32-spacer;
    }

    &__line {
      margin-top: $px-64-spacer;
    }

    &__header {
      display: flex;
      flex-direction: column;
      gap: 20px;
      padding-top: 20px;
      color: $secondary;
    }

    &__content {
      display: flex;
      flex-direction: column;
      row-gap: $px-64-spacer;

      @include this-and-above('md') {
        row-gap: $px-128-spacer;
      }
    }

    &__media {
      overflow: hidden;

      &--video {
        background: transparent;
        border: none;
        box-shadow: none;

        /* Ensure no background bleed during scale animation */
        &::before,
        &::after {
          display: none;
        }
      }
    }

    &__info {
      display: flex;
      flex-direction: column;
      color: $secondary;
      font-size: clamped(16px, 20px, 380px, 1920px);
      line-height: 1.5;
      gap: 64px;

      /*control how much space the text has on the sides*/
      margin: 0 $px-16-spacer;

      @include this-and-above('md') {
        margin: 0 $px-32-spacer;
      }

      @include this-and-above('md') {
        margin: 0 $px-64-spacer;
      }

      @include this-and-above('lg') {
        flex-direction: row;
        margin: 0 $px-64-spacer;
      }

      @include this-and-above('xl') {
        margin: 0 $px-128-spacer;
      }
    }

    &__text {
      display: flex;
      flex-direction: column;
      color: $secondary;
      font-size: clamped(16px, 20px, 380px, 1920px);
      line-height: 1.5;
      gap: 64px;

      /*control how much space the text has on the sides*/
      margin: 0 $px-16-spacer;

      @include this-and-above('sm') {
        flex-direction: row;
        margin: 0 $px-32-spacer;
      }

      @include this-and-above('md') {
        margin: 0 $px-64-spacer;
      }

      @include this-and-above('lg') {
        margin: 0 $px-64-spacer;
      }

      @include this-and-above('xl') {
        margin: 0 $px-256-spacer;
      }
    }

    &__info-col-1 {
      flex: 1 1 70%;

      & :nth-child(2) {
        margin-bottom: $px-64-spacer;
      }
    }

    &__info-col-2 {
      display: flex;
      line-height: 1.2;
      background-color: $primary;
      border: 2px solid $accent2;
      padding: $px-32-spacer;
      max-height: fit-content;
      overflow-y: auto;
      font-family: $sans-text;
      font-size: clamped(14px, 16px, 380px, 1920px);

      &__a,
      &__b {
        flex: 1 0 50%;
        word-break: break-all;
        height: fit-content;
      }

      &__b {
        &--link {
          font-size: clamped(14px, 16px, 380px, 1920px);
          text-decoration: underline;
        }

        &--tags {
          font-size: clamped(12px, 14px, 380px, 1920px);
          line-height: 1.4;
        }
      }
    }

    &__img-col-1 {
      flex: 1;

      .project__media {
        margin-top: 0;
      }
    }

    &__img-col-2 {
      flex: 1;

      .project__media {
        margin-top: 0;
      }
    }

    &__flex-wrapper {
      display: flex;
      flex-direction: row;
      column-gap: $px-16-spacer;

      @include this-and-above('md') {
        column-gap: $px-32-spacer;
      }

      @include this-and-above('lg') {
        column-gap: $px-32-spacer;
      }
    }
  }

  @keyframes arrowFloat {
    0%,
    100% {
      transform: translateX(0px);
    }

    50% {
      transform: translateX(8px);
    }
  }

  .video-skeleton {
    background: $primary;
    width: 100%;
    height: auto;
  }

  mux-player {
    --media-object-fit: fill;
    --media-object-position: center;
    --media-width: 100%;
    --media-height: auto;

    /* Allow full quality - no size constraints */
    width: 100%;
    height: auto;
    margin: 0 auto;

    /* Optimize for sharp video rendering */
    image-rendering: -webkit-optimize-contrast;

    /* Hide all controls at once */
    --controls: none;
    /* Hide the error dialog */
    --dialog: none;
    /* Hide the loading indicator */
    --loading-indicator: none;

    /* Target all sections by excluding the section prefix */
    --play-button: none;
    --live-button: none;
    --seek-backward-button: none;
    --seek-forward-button: none;
    --mute-button: none;
    --captions-button: none;
    --airplay-button: none;
    --pip-button: none;
    --fullscreen-button: none;
    --cast-button: none;
    --playback-rate-button: none;
    --volume-range: none;
    --time-range: none;
    --time-display: none;
    --duration-display: none;
    --rendition-menu-button: none;

    /* Target a specific section by prefixing the CSS var with (top|center|bottom) */
    --center-controls: none;
    --bottom-play-button: none;

    /* Mux-specific CSS variables to control media styling */
    --media-border-radius: 0px;
    --media-background-color: transparent;

    /* Force border-radius and remove any borders */
    overflow: hidden;
    border: none !important;
    outline: none !important;
    background: transparent;
    box-shadow: none !important;

    video {
      border: none !important;
      outline: none !important;
      background: transparent;
      box-shadow: none !important;

      /* Critical: Preserve video quality */
      image-rendering: -webkit-optimize-contrast;

      /* Prevent browser scaling artifacts */
      transform: translateZ(0);
      backface-visibility: hidden;

      /* Ensure 1:1 pixel mapping when possible */
      object-fit: fill;
      object-position: center;
    }

    /* Remove any potential shadow DOM borders */
    * {
      border: none !important;
      outline: none !important;
      box-shadow: none !important;
    }
  }
</style>
