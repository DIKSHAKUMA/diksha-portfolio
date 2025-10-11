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

  onMounted(() => {
    $gsap.registerPlugin(ScrollTrigger)

    ctx = $gsap.context((self) => {
      let sectionsChar = $gsap.utils.toArray('.split-code-w')
      sectionsChar.forEach((sec: any) => {
        const splitTxt = new SplitType(sec, { types: 'words' })
        splitInstances.push(splitTxt)
        $gsap.set(splitTxt.words, {
          autoAlpha: 0,
          clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
        })
        $gsap.to(splitTxt.words, {
          autoAlpha: 1,
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          scrollTrigger: {
            trigger: sec,
            start: 'top 90%',
            scrub: false,
            end: 'top 50%',
            toggleActions: 'restart none none reverse',
            preventOverlaps: true, /* <- HERE */
            /* markers: { startColor: "green", endColor: "red", fontSize: "18px", fontWeight: "bold", indent: 20 } */
          },
          duration: 0.4,
        })
      })
    })
  })

  onUnmounted(() => {
    /* Clean up GSAP context */
    ctx?.revert()
    /* Clean up SplitType instancesza */
    splitInstances.forEach((instance) => {
      instance.revert()
    })
    /* Clear the array */
    splitInstances.length = 0
  })
</script>

<template>
  <div class="code-wrapper">
    <CommonLine :pos="'absolute'" :width="''" />
    <main class="code">
      <CommonAbstract
        class="code__header"
        :desc="''"
        :label="store.data.about?.codeTitle"
        :class-name="'code-intro'"
        :is-secondary="true"
        :delay="0"
        :is-full-width="false"
        :is-hero="false"
        :author="''"
        :date="''"
        :is-page-title="false"
        :is-two-lines="false"
      />
      <CommonInfoLabel
        :label="'Values'"
        :class-name="'photo-label'"
        :hpos="'center'"
        :force-white="false"
        :vpos="'flex-start'"
        :link="''"
      />

      <section class="code__value">
        <div class="code__value-block">
          <h2 class="code__value-title split-code-w">
            {{ store.data.about?.codeOneTitle }}
          </h2>
          <p class="code__value-desc split-code-w">
            {{ store.data.about?.codeOneDesc }}
          </p>
        </div>

        <div class="code__value-block">
          <h2 class="code__value-title split-code-w">
            {{ store.data.about?.codeTwoTitle }}
          </h2>
          <p class="code__value-desc split-code-w">
            {{ store.data.about?.codeTwoDesc }}
          </p>
        </div>

        <div class="code__value-block">
          
          <h2 class="code__value-title split-code-w">
            {{ store.data.about?.codeThreeTitle }}
          </h2>
          <p class="code__value-desc split-code-w">
            {{ store.data.about?.codeThreeDesc }}
          </p>
        </div>
      </section>
    </main>
  </div>
</template>

<style lang="scss" scoped>
  .split-code-w {
    will-change: transform;
  }

  /* same margins as other home (sub) components; ViewParallaxHome varies slightly due to parallax */
  .code-wrapper {
    position: relative;
    background-color: $primary;
    padding: $px-64-spacer $px-16-spacer;

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

  .code {
    &__label {
      position: relative;
    }

    &__value {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      row-gap: 64px;
    }

    &__value-block {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      width: 100%;
      height: 100%;
      min-width: 300px;
    }

    &__value-title,
    &__value-desc {
      width: 100%;
      text-align: left;
    }

    &__value-title {
      width: 100%;
      min-width: 300px;
      color: $secondary;

      @include this-and-above('md') {
        width: 60%;
        min-width: 300px;
      }
    }

    &__value-desc {
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

    &__value-comp {
      height: 450px;
      position: relative;
      width: 100%;
      min-width: 300px;
      background-color: $secondary;

      @include this-and-above('md') {
        width: 60%;
        min-width: 300px;
        height: 42vh;
      }
    }
  }
</style>
