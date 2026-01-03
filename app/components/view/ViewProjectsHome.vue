<script setup lang="ts">
  import SplitType from 'split-type'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  import { useFolioStore } from '../../../stores/useFolioStore'
  import LabSVG from '@/assets/svg/lab-indicator.svg'

  /* PINIA 🍍 */
  const store = useFolioStore()
  const { $gsap } = useNuxtApp()
  const hoverHandlers = new Map<
    Element,
    { mouseenter: () => void; mouseleave: () => void }
  >()
  const splitInstances: SplitType[] = []

  let ctx: gsap.Context
  let rafID: number

  const getProjectTags = (project: any) => {
    if (!project?.tags || !Array.isArray(project.tags)) return ''
    return project.tags.map((tag) => `[ ${tag} ]`).join(' ')
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
              start: 'top 90%',
              end: 'top 60%',
              toggleActions: 'play none none reverse',
              invalidateOnRefresh: false,
            },
          })
        }

        /* Detect mobile devices */
        const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window

        /* Track mouse position and parallax for each item
           We use a Map here as we need to store the DOM element jajaja where is my Tenerife */
        const itemStates = new Map<
          Element,
          {
            isHovered: boolean
            currentX: number
            currentY: number
            targetX: number
            targetY: number
          }
        >()

        items.forEach((item: any) => {
          const imageContainer = item.firstElementChild
          const image = imageContainer.querySelector('img')
          const state = {
            isHovered: false,
            currentX: 0,
            currentY: 0,
            targetX: 0,
            targetY: 0,
          }
          itemStates.set(item, state)

          /* Mouse enter - scale up (works on all devices) */
          imageContainer.addEventListener('mouseenter', () => {
            state.isHovered = true
            $gsap.set(image, { clearProps: 'transition' })
            $gsap.to(image, {
              scale: 1.05,
              duration: 0.25,
              ease: 'power1.out',
              force3D: true,
              overwrite: true,
            })
          })

          /* Mouse leave - scale back to normal and reset position */
          imageContainer.addEventListener('mouseleave', () => {
            state.isHovered = false
            state.targetX = 0
            state.targetY = 0

            $gsap.to(image, {
              scale: 1,
              x: 0,
              y: 0,
              duration: 0.3,
              ease: 'power2.inOut',
              force3D: true,
            })
          })

          /* Mouse move - parallax effect (desktop only) */
          if (!isMobile) {
            item.addEventListener('mousemove', (e: MouseEvent) => {
              if (!state.isHovered) return

              const rect = item.getBoundingClientRect()
              const centerX = rect.left + rect.width / 2
              const centerY = rect.top + rect.height / 2

              /* Calculate distance from center (normalized) */
              const deltaX = (e.clientX - centerX) / (rect.width / 2)
              const deltaY = (e.clientY - centerY) / (rect.height / 2)

              /* Set target position (opposite direction, limited range) */
              state.targetX = -deltaX * 10
              state.targetY = -deltaY * 8
            })
          }
        })

        /* Smooth parallax animation using RAF (desktop only) */
        if (!isMobile) {
          const animateParallax = () => {
            itemStates.forEach((state, item) => {
              const imageContainer = item.firstElementChild
              const image = imageContainer!.querySelector('img')

              /* Smooth easing towards target position */
              state.currentX += (state.targetX - state.currentX) * 0.1
              state.currentY += (state.targetY - state.currentY) * 0.1

              $gsap.set(image, {
                x: state.currentX,
                y: state.currentY,
              })
            })

            rafID = requestAnimationFrame(animateParallax)
          }
          animateParallax()
        }
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

    /* Clean up RAF */
    cancelAnimationFrame(rafID)
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
                <p class="split-proj-w">
                  {{ proj.name }}
                </p>
                <p class="split-proj-w">{{ proj.date.split(' ')[1] }}</p>
              </div>
              <span
                v-if="proj.tags && proj.tags.length > 0"
                class="projects__abstract__meta split-proj-w"
              >
                {{ getProjectTags(proj) }}
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
    <CommonInfoLabel
      :label="'Recent work / labs'"
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
  p {
    margin: 0;
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
        -webkit-font-smoothing: antialiased; /* More consistent during transforms */
        -moz-osx-font-smoothing: grayscale;
      }

      &__image {
        position: relative;
        pointer-events: all;
        cursor: pointer;
        height: 100%;
        aspect-ratio: 4/3;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
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

      &__title{
        margin-bottom:2px;
      }

      &__info {
        margin: $px-16-spacer $px-16-spacer;
        pointer-events: none;
        font-family: $sans-ui-mono;
        text-transform: uppercase;
        color: $secondary;

        span {
          position: relative;
   
          color: $secondary;
          font-weight: 500;
        }
      }

      /* Sticking to three levels deep looking at parent parent is better */
      &__title {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        font-family: $sans-ui-mono;
        font-weight: 500;
        font-variation-settings: 'wght' 500;
        font-size: clamped(14px, 16px, 480px, 1920px);
        line-height: 1;
      }

      &__meta {
        font-size: clamped(10px, 11px, 480px, 1920px);
        top: -4px;
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
