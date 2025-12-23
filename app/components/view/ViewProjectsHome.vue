<script setup lang="ts">
  import SplitType from 'split-type'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  import { useFolioStore } from '../../../stores/useFolioStore'
  import LabSVG from '@/assets/svg/lab-indicator.svg'

  /* PINIA 🍍 */
  const store = useFolioStore()
  const { $gsap } = useNuxtApp()

  let ctx: gsap.Context
  const hoverHandlers = new Map<
    Element,
    { mouseenter: () => void; mouseleave: () => void }
  >()
  const splitInstances: SplitType[] = []

  const getProjectTags = (project: any) => {
    if (!project?.tags || !Array.isArray(project.tags)) return ''
    return project.tags.join(', ')
  }

  const dateSorted = computed(() => {
    if (!store.data?.projects) return []

    return [...store.data.projects].sort((a, b) => {
      /* Convert "Month YYYY" format to proper Date objects */
      const parseDate = (dateStr: string) => {
        const [month, year] = dateStr.split(' ')
        /* Create date with month name and year */
        return new Date(`${month} 1, ${year}`)
      }

      /* Sort by date descending (newest first) */
      return parseDate(b.date).getTime() - parseDate(a.date).getTime()
    })
  })

  const handleProjectClick = (project: any) => {
    if (project.labUrl) {
      window.open(project.labUrl, '_blank')
    } else {
      navigateTo(`/project/${project.slug}`)
    }
  }

  onMounted(() => {
    ctx = $gsap.context((self) => {
      $gsap.registerPlugin(ScrollTrigger)

      /* Detect Firefox for performance optimization */
      const isFirefox = navigator.userAgent.toLowerCase().includes('firefox')

      /* Batch DOM queries for better performance */
      const items = $gsap.utils.toArray('.projects__abstract__item')

      /* Firefox gets simple fade, others get full clipPath reveal */
      items.forEach((item: any) => {
        if (isFirefox) {
          /* Simple opacity fade for Firefox - no clipPath */
          $gsap.to(item, {
            opacity: 1,
            clipPath: 'none',
            duration: 0.4,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
              invalidateOnRefresh: false,
            },
          })
        } else {
          /* Full clipPath reveal for Chrome/Safari/Edge */
          $gsap.to(item, {
            opacity: 1,
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            duration: 0.5,
            ease: 'power1.out',
            force3D: true,
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              end: 'top 60%',
              toggleActions: 'play none none reverse',
              invalidateOnRefresh: false,
            },
          })
        }

        /* GSAP hover animation to avoid CSS transform conflicts */
        item.firstElementChild.addEventListener('mouseenter', () => {
          $gsap.set(item.firstElementChild, { clearProps: 'transition' })
          $gsap.to(item.firstElementChild, {
            scale: 0.98,
            duration: 0.25,
            ease: 'power1.in',
            force3D: true,
            overwrite: true,
          })
        })

        item.firstElementChild.addEventListener('mouseleave', () => {
          $gsap.to(item.firstElementChild, {
            scale: 1,
            duration: 0.25,
            ease: 'power2.out',
            force3D: true,
          })
        })
      })
    })
  })

  onUnmounted(() => {
    /* Clean up GSAP context */
    ctx?.revert()

    /* Clean up SplitType instances */
    splitInstances.forEach((instance) => {
      instance.revert()
    })

    /* Clear the array */
    splitInstances.length = 0
  })
</script>

<template>
  <div class="projects-home-wrapper">
    <main class="projects">
      <CommonAbstract
        class="projects__header"
        :label="store.data.intro?.projIntroTitle"
        :desc="''"
        :is-page-header="false"
        :class-name="'projects-intro'"
        :is-secondary="true"
        :delay="0"
        :is-full-width="false"
        :is-hero="false"
        :author="''"
        :date="''"
        :is-two-lines="false"
      />
      <section class="projects__abstract">
        <div v-for="proj in dateSorted" :key="proj.slug">
          <div class="projects__abstract__item">
            <div
              class="projects__abstract__image action"
              data-name="proj"
              data-text="View"
              data-color="#FFF"
              @click="handleProjectClick(proj)"
            >
              <NuxtImg
                :src="proj.coverImage?.handle"
                provider="hygraph"
                alt="Project image"
                format="webp"
                sizes="sm:100vw md:45vw lg:45vw xl:34vw"
                densities="x1 x2"
                quality="100"
              ></NuxtImg>
              <div
                v-if="proj.labUrl"
                class="projects__abstract__image--lab"
                title="Lab Project"
              >
                <LabSVG class="projects__abstract__image--lab-svg" />
              </div>
            </div>

            <div class="projects__abstract__info">
              <div class="projects__abstract__title">
                <h4 class="split-proj-w">{{ proj.name }}</h4>
                <h4 class="split-proj-w">{{ proj.date.split(' ')[1] }}</h4>
              </div>
              <span
                v-if="proj.tags && proj.tags.length > 0"
                class="project-tags split-proj-w"
              >
                <span class="blinking-dot"></span>
                {{ getProjectTags(proj) }}
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
    <CommonInfoLabel
      :label="'Projects—more to come'"
      :class-name="'project-label'"
      :hpos="'center'"
      :hover-label="''"
      :force-white="false"
      :vpos="'flex-start'"
      :link="''"
    />
  </div>
</template>

<style lang="scss" scoped>
  h4 {
    margin: 0;
  }

  img,
  .split-proj-w {
    will-change: transform;
  }

  .project-tags {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .blinking-dot {
    align-self: center !important;
    top: 0.1em; 
    width: 6px;
    height: 6px;
    background-color: #008080;
    border-radius: 50%;
    animation: blink 1.2s steps(1, end) infinite;
    transition: opacity 0.05s ease-out;
  }

  @keyframes blink {
    0%,
    45% {
      opacity: 1;
    }
    50%,
    100% {
      opacity: 0;
    }
  }

  img {
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    /* Image sharpness optimizations */
    image-rendering: -webkit-optimize-contrast;
    -ms-interpolation-mode: bicubic;
    /* Prevent subpixel rendering issues */
    -webkit-font-smoothing: subpixel-antialiased;
    /* Performance optimizations */
    contain: layout style paint;
  }

  /* same margins as project-wrapper in [id].vue */
  .projects-home-wrapper {
    /* or else info label get confused */
    position: relative;
    height: 100%;
    padding: $px-128-spacer $px-16-spacer;

    @include this-and-above('sm') {
      padding: $px-128-spacer $px-32-spacer;
    }

    @include this-and-above('md') {
      padding: $px-128-spacer $px-64-spacer;
    }

    @include this-and-above('xl') {
      padding: $px-128-spacer $px-128-spacer;
    }

    @include this-and-above('xxl') {
      padding: $px-128-spacer $px-256-spacer;
    }
  }

  .projects {
    /*or else info label blocks events*/
    position: relative;
    z-index: 199;
    .projects__abstract {
      display: flex;
      flex-direction: column;
      row-gap: $px-128-spacer;
      width: 100%;
      align-self: flex-start;

      &__item {
        opacity: 0;
        pointer-events: none;
        clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
      }

      &__image {
        position: relative;
        pointer-events: all;
        cursor: pointer;
        height: 100%;
        aspect-ratio: 4/3;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: filter 0.3s ease;
        }

        @media (hover: hover), (-ms-high-contrast: none) {
          img:hover {
            filter: brightness(0.7);
          }
        }

        &--lab {
          position: relative;
          bottom: 25px;
          left: 5px;
          font-size: 16px;
          width: 34px;
          height: 34px;

          &-svg {
            position: relative;
            top: -15px;
            left: 10px;
            width: 24px;
            height: 24px;
            fill: #faf8ff;
          }
        }

        @include this-and-above('sm') {
          aspect-ratio: 16/9;
        }
      }

      &__info {
        margin: $px-16-spacer $px-16-spacer;
        pointer-events: none;

        span {
          position: relative;
          margin: 0;
          color: $secondary;
          font-family: $sans-ui;
          font-size: 13px;
          font-weight: 500;
        }
      }

      /* Sticking to three levels deep looking at parent parent is better */
      &__title {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }

      @include this-and-above('md') {
        /* now we give luft to rows */
        row-gap: $px-256-spacer;

        :nth-child(odd) {
          align-self: flex-end;
        }

        :nth-child(even) {
          align-self: flex-start;
        }
      }
    }
  }
</style>
