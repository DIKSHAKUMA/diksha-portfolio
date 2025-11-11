<script setup lang="ts">
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  import { Draggable } from 'gsap/Draggable'
  import { InertiaPlugin } from 'gsap/InertiaPlugin'
  import { useFolioStore } from '~/store/useFolioStore'
  import LabSVG from '@/assets/svg/lab-indicator.svg'

  /* PINIA 🍍 */
  const store = useFolioStore()
  const { $gsap } = useNuxtApp()

  const projectsReel = useTemplateRef<HTMLDivElement>('projectsReel')
  const projectItem = ref<HTMLDivElement[]>([])
  const clampedIndex = ref<number>(0)
  const isDragging = ref(false) /* Track dragging state including inertia */

  let ctx: gsap.Context
  let draggableInstance: Draggable[] | null = null

  const centeredProject = computed(() => {
    return dateSorted.value[clampedIndex.value]
  })

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

  const progressIndex = computed(() => {
    const totalProjects = dateSorted.value.length || 1
    return { current: clampedIndex.value + 1, total: totalProjects }
  })

  const getProjectTags = (project: any) => {
    if (!project?.tags || !Array.isArray(project.tags)) return ''
    return project.tags.join(', ')
  }

  const handleProjectClick = (project: any) => {
    if (project.labUrl) {
      window.open(project.labUrl, '_blank')
    } else {
      navigateTo(`/project/${project.slug}`)
    }
  }

  /* Function to setup/update Draggable configuration */
  const setupDraggable = () => {
    const numProjects = store.data?.projects.length || 0

    if (
      !projectsReel.value ||
      numProjects === 0 ||
      projectItem.value.length === 0
    ) {
      return
    }

    /* Destroy existing draggable instance */
    if (draggableInstance) {
      draggableInstance[0].kill()
      draggableInstance = null
    }

    /* Calculate total width of all projects + gaps */
    const projectWidth = projectItem.value[1].getBoundingClientRect().width || 0
    const gapWidth =
      parseFloat(
        getComputedStyle(projectsReel.value).getPropertyValue('column-gap')
      ) || 0
    const paddingLeft =
      parseFloat(
        getComputedStyle(projectsReel.value).getPropertyValue('padding-left')
      ) || 0
    const totalContentWidth =
      projectWidth * numProjects + gapWidth * (numProjects - 1) + paddingLeft
    const viewportWidth = window.innerWidth

    /* Calculate initial offset to center first project */
    /* Account for the padding-left on the reel which equals the gap width */
    const initialOffset = (viewportWidth - projectWidth) / 2 - gapWidth

    /* Set initial position to center the first project */
    $gsap.set(projectsReel.value, { x: initialOffset })

    /* Calculate how far we can drag (negative because we drag left) */
    /* Add extra padding to ensure last project can be fully centered */
    const maxDragDistance =
      totalContentWidth - viewportWidth + initialOffset + paddingLeft

    /* Extract callback functions to prevent SSR serialization issues */
    const handleDrag = function (this: any) {
      isDragging.value = true
      /* Calculate velocity and direction for skew effect */
      const velocity = InertiaPlugin.getVelocity(this.target, 'x')
      const skewAmount = Math.max(-40, Math.min(40, velocity * 0.01))

      /* Apply skew for positioning and filters for visual effect */
      $gsap.set('.projects__project__image', {
        skewX: skewAmount,
        duration: 0.4,
        ease: 'power2.out',
      })
    }

    const handleDragEnd = function () {
      /* Reset skew and filters when drag ends */
      $gsap.to('.projects__project__image', {
        skewX: 0,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    const handleSnap = (endValue: number) => {
      /* Calculate snap points using fresh measurements to match onThrowComplete */
      const unscaledIndex = clampedIndex.value === 0 ? 1 : 0
      const currentProjectWidth =
        projectItem.value[unscaledIndex]?.getBoundingClientRect().width ||
        projectItem.value[0].getBoundingClientRect().width ||
        0
      const currentGapWidth = projectsReel.value
        ? parseFloat(
            getComputedStyle(projectsReel.value).getPropertyValue('column-gap')
          ) || 0
        : 0
      const snapDistance = currentProjectWidth + currentGapWidth
      const snapIndex = Math.round((initialOffset - endValue) / snapDistance)
      return initialOffset - snapIndex * snapDistance
    }

    const handleThrowComplete = function (this: any) {
      isDragging.value = false /* Reset only when inertia completes */
      /* Calculate which project is in the center when inertia stops */
      const currentX = this.x

      /* Recalculate projectWidth fresh to get current actual width */
      /* Use a project that's NOT the centered one to get unscaled width */
      const unscaledIndex = clampedIndex.value === 0 ? 1 : 0
      const currentProjectWidth =
        projectItem.value[unscaledIndex]?.getBoundingClientRect().width ||
        projectItem.value[0].getBoundingClientRect().width ||
        0
      const currentGapWidth = projectsReel.value
        ? parseFloat(
            getComputedStyle(projectsReel.value).getPropertyValue('column-gap')
          ) || 0
        : 0
      const snapDistance = currentProjectWidth + currentGapWidth

      /* Distance travelled / snap distance (proj width + gap) = index */
      const centerIndex = Math.round((initialOffset - currentX) / snapDistance)

      /* Ensure index is within bounds */
      clampedIndex.value = Math.max(0, Math.min(centerIndex, numProjects - 1))
    }

    $gsap.context((self) => {
      draggableInstance = Draggable.create('.projects__reel', {
        type: 'x' /* Horizontal dragging */,
        bounds: {
          minX: -maxDragDistance,
          maxX: initialOffset /* Start from centered position, not 0 */,
        },
        inertia: true,
        minDuration: 0.1,
        maxDuration: 1,
        dragResistance: 0.3,
        edgeResistance: 0.5 /* Smooth resistance at bounds */,
        allowEventDefault: false /* Prevent default touch behaviors */,

        onDrag: handleDrag,
        onDragEnd: handleDragEnd,
        onThrowComplete: handleThrowComplete,
        snap: {
          x: handleSnap,
        },
      })
    })
  }

  /* Debounced resize handler */
  let resizeTimeout: NodeJS.Timeout
  const handleResize = () => {
    clearTimeout(resizeTimeout)
    resizeTimeout = setTimeout(() => {
      setupDraggable()
    }, 150) /* 150ms debounce */
  }

  onMounted(async () => {
    // Note: Page-level component handles scrollTo(0) - don't duplicate here

    ctx = $gsap.context((self) => {
      $gsap.registerPlugin(ScrollTrigger)
      $gsap.registerPlugin(Draggable, InertiaPlugin)
    })

    /* Simple fade-in animation for projects and progress */
    const tl = $gsap.timeline()
    tl.from('.projects__reel, .progress', {
      duration: 0.8,
      opacity: 0,
      ease: 'power2.inOut',
    })

    /* Initial setup */
    setupDraggable()

    /* Add resize listener */
    window.addEventListener('resize', handleResize)
  })

  onUnmounted(() => {
    /* Cleanup resize listener */
    window.removeEventListener('resize', handleResize)

    /* Cleanup draggable instance */
    if (draggableInstance) {
      draggableInstance[0].kill()
      draggableInstance = null
    }

    /* Clear any pending resize timeout */
    if (resizeTimeout) {
      clearTimeout(resizeTimeout)
    }

    ctx?.revert()
  })
</script>

<template>
  <main ref="main" class="projects-wrapper">
    <!-- Moving light background effect -->
    <div class="projects-background"></div>

    <!--:className here is for gsap-->
    <CommonAbstract
      class="front-header"
      :label="'Projects'"
      :delay="1"
      :is-page-header="false"
      :desc="''"
      :class-name="'abstract__projects'"
      :is-hero="true"
      :is-full-width="false"
      :is-secondary="false"
      :author="''"
      :date="''"
      :is-two-lines="false"
    />

    <div class="progress">
      <div class="progress__text">
        {{ progressIndex.current }} / {{ progressIndex.total }}
      </div>
    </div>

    <div class="projects">
      <div class="projects__reel" ref="projectsReel">
        <div v-for="(project, index) in dateSorted" :key="project.id">
          <div
            class="projects__project"
            ref="projectItem"
            :class="{
              'projects__project--open': index === clampedIndex && !isDragging,
            }"
          >
            <div
              class="projects__project__image-container action"
              data-name="reel"
            >
              <NuxtLink @click="handleProjectClick(project)">
                <NuxtImg
                  :src="project.coverImage?.handle"
                  provider="hygraph"
                  alt="Project image"
                  format="webp"
                  sizes="sm:100vw"
                  densities="x1 x2"
                  class="projects__project__image"
                ></NuxtImg>
              </NuxtLink>
              <span
                v-if="project.labUrl"
                class="projects__lab-indicator"
                title="Lab Project"
                ><LabSVG class="projects__lab-indicator-svg"
              /></span>
            </div>

            <div class="projects__project__info">
              <p class="projects__project__name">{{ project.name }}</p>
              <span
                v-if="project.tags && project.tags.length > 0"
                class="projects__project__tags"
                >{{ getProjectTags(project) }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
  img {
    height: auto;
  }

  a:hover {
    filter: blur(0px);
  }

  .projects-wrapper {
    position: relative;
    width: 100%;
    min-height: 100vh;

    touch-action: none;
    -webkit-overflow-scrolling: none;
    overflow: hidden;
    overscroll-behavior: none;

    padding: 0 $px-16-spacer;

    @include this-and-above('lg') {
      padding: 0 $px-64-spacer;
    }

    /*The “small” viewport units assume that any dynamic toolbars are expanded and visible, and calculates the viewport’s size accordingly.*/
    @supports (height: 100svh) {
      min-height: 100svh;
    }
  }

  .projects-background {
    position: absolute;
    top: 0px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 300%;
      height: 100%;
      background: linear-gradient(
        45deg,
        transparent 0%,
        transparent 40%,
        rgba(255, 255, 255, 0.03) 50%,
        transparent 60%,
        transparent 100%
      );
      animation: moveLight 12s ease-in-out infinite alternate;
      pointer-events: none;
    }

    /* Stronger effect for light theme */
    .light-mode &::before {
      background: linear-gradient(
        45deg,
        transparent 0%,
        transparent 40%,
        #ffffff 50%,
        transparent 60%,
        transparent 100%
      );
    }
  }

  .front-header {
    position: absolute;
    bottom: 0px;
    &--ios-safari {
      bottom: 80px;
    }
  }

  .progress {
    position: absolute;
    margin: $px-16-spacer $px-16-spacer;
    right: 0;
    bottom: 0;

    @include this-and-above('lg') {
      margin: $px-16-spacer $px-64-spacer;
    }

    &__text {
      font-size: clamped(24px, 44px, 480px, 1920px);
      font-family: $sans-ui;
      font-weight: 500;
      font-variation-settings: 'wght' 500;
      white-space: nowrap;
      color: $secondary;
      opacity: 0.5;
      font-variant-numeric: tabular-nums;
      /* Monospace numbers for consistent width */
    }
  }

  .projects {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    color: $secondary;

    &__project {
      position: relative;
      /* For absolute positioning of lab indicator */
      flex-shrink: 0;
      /* Prevent shrinking to maintain consistent layout */
      transform-origin: center;
      transition: transform 0.3s ease-out;
      /* Smooth scale transitions */
      cursor: default;

      &--open {
        transform: scale(1.08);
      }

      &__image-container {
        position: relative;
      }

      &__info {
        width: 80%;
        margin-left: $px-16-spacer;
        margin-top: $px-8-spacer;
        pointer-events: none;
        cursor: default;
      }

      &__name {
        position: relative;
        width: 80%;
        margin: 0;
        color: $secondary;
        font-family: $sans-ui-mono;
        font-size: clamped(15px, 18px, 380px, 1920px);
        font-weight: 400;
        font-variation-settings: 'wght' 400;
        backface-visibility: hidden;
      }

      &__tags {
        position: relative;
        width: 80%;
        overflow-wrap: break-word;
        margin: 0;
        color: $secondary;
        font-family: $sans-ui-mono;
        font-size: clamped(12px, 14px, 380px, 1920px);
        font-weight: 400;
        font-variation-settings: 'wght' 400;
        backface-visibility: hidden;
      }

      &__image {
        cursor: pointer;
        width: 85vw;
        /* Mobile-first: larger than viewport for immersive feel */
        height: auto;
        aspect-ratio: 16/9;
        object-fit: cover;
        transform-origin: center;
        image-rendering: -webkit-optimize-contrast;
        image-rendering: optimize-contrast;
        image-rendering: auto;
        backface-visibility: hidden;
        will-change: transform;

        @include this-and-above('sm') {
          width: 75vw;
          /* Slightly smaller on small tablets */
        }

        @include this-and-above('md') {
          width: 60vw;
          /* Medium screens */
        }

        @include this-and-above('lg') {
          width: 50vw;
          /* Desktop - show more context */
        }

        @include this-and-above('xl') {
          width: 45vw;
          /* Large desktop - optimal viewing */
        }
      }
    }

    &__reel {
      display: flex;
      flex-flow: row nowrap;
      column-gap: $px-32-spacer;
      /* Mobile: tight spacing */
      justify-content: flex-start;
      /* Start from left instead of center */
      align-items: center;
      position: absolute;
      left: 0;
      width: max-content;
      /* Allow width to expand based on content */
      padding-left: $px-32-spacer;
      /* Mobile: minimal padding */

      /* Progressive spacing increases */
      @include this-and-above('sm') {
        column-gap: $px-32-spacer;
        padding-left: $px-32-spacer;
      }

      @include this-and-above('lg') {
        column-gap: $px-64-spacer;
        padding-left: $px-64-spacer;
      }
    }

    &__lab-indicator {
      position: absolute;
      bottom: -16px;
      left: 4px;
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

      @include this-and-above('md') {
        font-size: 18px;
        width: 38px;
        height: 38px;
      }
    }
  }

  /* Moving light animation */
  @keyframes moveLight {
    0% {
      transform: translateX(-25%);
    }
    50% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(25%);
    }
  }
</style>
