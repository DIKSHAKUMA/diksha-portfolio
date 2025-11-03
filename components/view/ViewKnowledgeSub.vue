<script setup lang="ts">
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  import { useFolioStore } from '~/store/useFolioStore'
  import SplitType from 'split-type'
  import { ref, onMounted } from 'vue'

  /* PINIA 🍍 */
  const store = useFolioStore()
  const { $gsap } = useNuxtApp()
  let ctx: gsap.Context
  const splitInstances: SplitType[] = []

  const canLine = ref<HTMLElement | null>(null)

  onMounted(() => {
    $gsap.registerPlugin(ScrollTrigger)

    ctx = $gsap.context((self) => {
      // Pin the section and scroll the inner wrapper
      const demoWrapper = document.querySelector('.know__demo-wrapper')
      if (demoWrapper) {
        $gsap.to(demoWrapper, {
          y: '-1400px', // Move up to show third block properly (700px + 700px)
          ease: 'none',
          force3D: true,
          scrollTrigger: {
            trigger: '.know-wrapper',
            start: 'top top',
            end: '+=200%',
            scrub: 1,
            pin: '.know-wrapper',
            anticipatePin: 1,
            pinSpacing: true,
            invalidateOnRefresh: false,
          },
        })
      }
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
  <div class="know-wrapper">
    <CommonLine :pos="'absolute'" :width="''" />
    <main class="know">
      <CommonAbstract
        class="know__label"
        :desc="''"
        :label="store.data.intro?.knowIntroTitle"
        :is-page-header="false"
        :class-name="'know-intro'"
        :is-secondary="true"
        :delay="0"
        :is-full-width="false"
        :is-hero="false"
        :author="''"
        :date="''"
        :is-two-lines="false"
      />
      <CommonInfoLabel
        :label="'Creative Developer'"
        :class-name="'photo-label'"
        :hpos="'center'"
        :hover-label="''"
        :force-white="false"
        :vpos="'flex-start'"
        :link="''"
      />

      <section class="know__demo">
        <div class="know__demo-wrapper">
          <div class="know__demo-block">
            <h2 class="know__demo-title split-skills-w">
              {{ store.data.intro?.knowOneTitle }}
            </h2>
            <p class="know__demo-desc split-skills-w">
              {{ store.data.intro?.knowOneDesc }}
            </p>
            <AnimSkills class="know__demo-comp" />
          </div>
          <div class="know__demo-block">
            <h2 class="know__demo-title split-skills-w">
              {{ store.data.intro?.knowTwoTitle }}
            </h2>
            <p class="know__demo-desc split-skills-w">
              {{ store.data.intro?.knowTwoDesc }}
            </p>
            <AnimDynamic class="know__demo-comp" />
          </div>
          <div class="know__demo-block">
            <h2 class="know__demo-title split-skills-w">
              {{ store.data.intro?.knowThreeTitle }}
            </h2>
            <p class="know__demo-desc split-skills-w">
              {{ store.data.intro?.knowThreeDesc }}
            </p>
            <AnimUX class="know__demo-comp" />
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style lang="scss" scoped>
  .split-skills-w {
    will-change: transform;
  }

  /* same margins as other home (sub) components; ViewParallaxHome varies slightly due to parallax */
  .know-wrapper {
    position: relative;
    background-color: $primary;
    padding: $px-128-spacer $px-16-spacer;
    min-height: 100vh;

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

  .know {
    &__label {
      position: relative;
    }

    &__demo {
      height: 600px;
      overflow: hidden;
      position: relative;
    }

    &__demo-wrapper {
      height: 2100px; // 3 blocks × 700px each (600px + 100px gap)
      display: flex;
      flex-direction: column;
      gap: 100px;
    }

    &__demo-block {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: center;
      width: 100%;
      height: 600px;
      min-width: 300px;
    }

    &__demo-title,
    &__demo-desc {
      width: 100%;
      text-align: left;
    }

    &__demo-title {
      width: 100%;
      min-width: 300px;
      color: $secondary;

      @include this-and-above('md') {
        width: 60%;
        min-width: 300px;
      }
    }

    &__demo-desc {
      width: 100%;
      min-width: 300px;
      color: $secondary;
      margin-bottom: 1.5em;
      font-size: clamped(16px, 20px, 380px, 1920px);

      @include this-and-above('md') {
        width: 60%;
        min-width: 300px;
      }
    }

    &__demo-comp {
      height: 450px;
      position: relative;
      width: 100%;
      min-width: 300px;

      @include this-and-above('md') {
        width: 60%;
        min-width: 300px;
        min-height: 300px;
      }
    }
  }
</style>
