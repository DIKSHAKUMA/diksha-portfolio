<script setup lang="ts">
  import { ScrollTrigger } from 'gsap/ScrollTrigger'

  interface Props {
    prevImg: string
    nextImg: string
    prev: string
    next: string
    prevName: string
    nextName: string
    prevSynop: string[]
    nextSynop: string[]
  }

  const props = withDefaults(defineProps<Props>(), {
    prevImg: '',
    nextImg: '',
    prev: '',
    next: '',
    prevName: '',
    nextName: '',
    prevSynop: () => [],
    nextSynop: () => [],
  })

  const { $gsap } = useNuxtApp()

  let ctx: gsap.Context
  let rafID: number | null = null

  /* Computed properties for full project paths */
  const prevPath = computed(() => `/project/${props.prev}`)
  const nextPath = computed(() => `/project/${props.next}`)

  /* Track parallax state for each item */
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

  const setupParallax = () => {
    const items = document.querySelectorAll('.project-stepper-image-reveal')

    items.forEach((item: any) => {
      const image = item.querySelector('img')
      const state = {
        isHovered: false,
        currentX: 0,
        currentY: 0,
        targetX: 0,
        targetY: 0,
      }
      itemStates.set(item, state)

      /* Mouse enter - scale up */
      item.addEventListener('mouseenter', () => {
        state.isHovered = true
        $gsap.to(image, {
          scale: 1.05,
          duration: 0.25,
          ease: 'power1.out',
          force3D: true,
        })
      })

      /* Mouse leave - reset position */
      item.addEventListener('mouseleave', () => {
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

      /* Mouse move - parallax effect */
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
    })

    /* Smooth parallax animation using RAF */
    const animateParallax = () => {
      itemStates.forEach((state, item) => {
        const image = item.querySelector('img')

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

  onMounted(() => {
    ctx = $gsap.context(() => {
      $gsap.registerPlugin(ScrollTrigger)

      /* Vertical reveal effect for stepper images */
      $gsap.utils
        .toArray('.project-stepper-image-reveal')
        .forEach((imageContainer: any) => {
          $gsap.from(imageContainer, {
            opacity: 0,
            duration: 0.5,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: imageContainer,
              start: 'top 85%',
              end: 'top 35%',
              toggleActions: 'play none none reverse',
            },
          })
        })
    })

    setupParallax()
  })

  onUnmounted(() => {
    ctx?.revert()
    if (rafID) cancelAnimationFrame(rafID)
  })
</script>

<template>
  <div class="project-stepper-wrapper">
    <h1>Explore Archive</h1>
    <main class="project-stepper">
      <div class="project-stepper__prev">
        <div class="project-stepper-image-reveal">
          <NuxtLink
            :to="prevPath"
            class="action"
            data-name="proj"
            data-text="Prev"
          >
            <NuxtImg
              :src="prevImg"
              provider="hygraph"
              alt="Project image"
              format="png"
              sizes="sm:100vw md:40vw lg:35vw xl:80vw"
              densities="x1 x2"
            />
          </NuxtLink>
        </div>
        <h3 class="project-stepper__name">{{ prevName }}</h3>
        <p class="project-stepper__synop">{{ prevSynop[0] }}</p>
      </div>
      <div class="project-stepper__next">
        <div class="project-stepper-image-reveal">
          <NuxtLink
            :to="nextPath"
            class="action"
            data-name="proj"
            data-text="Next"
          >
            <NuxtImg
              :src="nextImg"
              provider="hygraph"
              alt="Project image"
              format="png"
              sizes="sm:100vw md:40vw lg:35vw xl:80vw"
              densities="x1 x2"
            />
          </NuxtLink>
        </div>
        <h4 class="project-stepper__name">{{ nextName }}</h4>
        <p class="project-stepper__synop">{{ nextSynop[0] }}</p>
      </div>
    </main>
  </div>
</template>

<style scoped lang="scss">
  h3,
  h4 {
    margin-bottom: 0;
  }

  a {
    display: block;
    overflow: hidden;
    filter: none !important;
  }

  a:hover {
    filter: none !important;
  }

  img {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 2048/1150;
    object-fit: cover;
    pointer-events: auto;
    touch-action: pan-y;
    font-size: 0;
    will-change: transform;
    backface-visibility: hidden;
    -webkit-font-smoothing: antialiased;
  }

  .project-stepper-wrapper {
    position: relative;
    padding: $px-32-spacer 0;

    @include this-and-above('sm') {
      padding: $px-64-spacer 0;
      height: auto;
    }

    @include this-and-above('md') {
      padding: $px-64-spacer 0;
    }

    @include this-and-above('xl') {
      padding: $px-128-spacer 0;
    }

    @include this-and-above('xxl') {
      padding: $px-128-spacer 0;
    }
  }

  .project-stepper {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: $px-16-spacer;
    color: $secondary;

    @include this-and-above('sm') {
      row-gap: $px-64-spacer;
    }

    &__synop {
      margin-left: $px-16-spacer;
      font-family: $sans-ui;
      font-size: clamped(12px, 14px, 380px, 1920px);
    }

    &__name {
      margin-left: $px-16-spacer;
      font-family: $sans-ui;
    }

    @include this-and-above('md') {
      column-gap: $px-32-spacer;
    }

    @include this-and-above('md') {
      flex-flow: row;
    }

    &__prev {
      flex: 1;
    }

    &__next {
      flex: 1;
    }

    &__name {
      margin-top: $px-16-spacer;
    }
  }
</style>
