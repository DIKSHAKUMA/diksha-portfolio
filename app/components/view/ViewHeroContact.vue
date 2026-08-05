<script setup lang="ts">
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  import { useFolioStore } from '../../../stores/useFolioStore'
  import SplitType from 'split-type'
  import { nextTick } from 'vue'

  /* PINIA 🍍 */
  const store = useFolioStore()
  const { $gsap } = useNuxtApp()
  let ctx: gsap.Context

  const animPixiRef = ref(null)
  const showAnimPixi = ref(false)

  const copied = ref(false)
  const email = computed(() => store.data.contact?.email ?? '')

  const copyEmail = async () => {
    await navigator.clipboard.writeText(email.value)
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  }

  const onPixiLoaded = () => {
    showAnimPixi.value = true
  }

  onMounted(() => {
    $gsap.registerPlugin(ScrollTrigger)

    ctx = $gsap.context((self) => {
      let sectionsChar = $gsap.utils.toArray('.split-label-w')
      sectionsChar.forEach((sec: any) => {
        const splitTxt = new SplitType(sec, { types: 'words' })
        $gsap.set(splitTxt.words, {
          autoAlpha: 0,
          clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
        })
        $gsap.to(splitTxt.words, {
          autoAlpha: 1,
          delay: 1.2 /* Increased delay to avoid Venice blind collision */,
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          scrollTrigger: {
            trigger: sec,
            start: 'top 90%',
            scrub: false,
            end: 'top 50%',
            toggleActions: 'restart none none reverse',
          },
          duration: 0.4,
        })
      })
    })
  })

  onUnmounted(() => {
    ctx?.revert()
  })
</script>

<template>
  <main class="hero-wrapper">
    <AnimPixiMoon
      ref="aniPixiRef"
      :class="{ 'fade-in': showAnimPixi }"
      @loaded="onPixiLoaded"
    />
    <UIWeatherInfo />
    <div class="contact">
      <div class="contact__label split-label-w">
        {{ store.data.contact?.emailTitle }}
      </div>
      <span class="contact__email split-label-w">{{ email }}</span>
      <button
        class="contact__copy action"
        data-name="menu"
        data-text="Copy"
        :title="copied ? 'Copied!' : 'Copy email'"
        @click="copyEmail"
      >
        <Icon :name="copied ? 'ph:check' : 'ph:copy'" size="20" />
      </button>
    </div>
    <!--:className here is for gsap is-hero changes bottom margins for wrapper and header-->
    <CommonAbstract
      class="front-header"
      :label="store.data.contact?.viewHeroTitle"
      :delay="1"
      :is-page-header="false"
      :desc="''"
      :class-name="'contact-intro'"
      :is-hero="true"
      heading-level="h1"
      :is-full-width="false"
      :is-secondary="false"
      :author="''"
      :date="''"
      :is-two-lines="false"
    />
  </main>
</template>

<style lang="scss" scoped>
  /* Prevent blur effect on this specific link */
  .no-blur-link:hover {
    filter: none !important;
    -webkit-filter: none !important;
  }

  .hero-wrapper {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    touch-action: none;
    -webkit-overflow-scrolling: none;
    overflow: hidden;
    overscroll-behavior: none;

    padding: 0 $px-16-spacer;

    @supports (height: 100dvh) {
      min-height: 100dvh;
    }

    @include this-and-above('md') {
      padding: 0 $px-64-spacer;
    }
  }

  .ilabel {
    a .action {
      color: $secondary-static !important;
    }
  }

  .front-header {
    position: absolute;
    bottom: 0px;
    color: $secondary-static;

    :deep(h1) {
      color: $secondary-static;
    }

    &--ios-safari {
      bottom: 80px;
    }
  }

  .contact {
    position: relative;
    top: $px-128-spacer;
    bottom: unset;
    color: $secondary-static;
    z-index: 200;
    font-family: $sans-text;
    font-weight: 400;

    &__label {
      font-size: clamped(16px, 20px, 480px, 1920px);
    }
    &__email {
      font-size: clamped(16px, 32px, 480px);
      color: $secondary-static;
      text-decoration: none;
    }

    &__copy {
      display: inline-flex;
      align-items: center;
      margin-left: 8px;
      color: $secondary-static;
      vertical-align: middle;
      transition: opacity 0.2s ease;
      opacity: 0.6;

      &:hover {
        opacity: 1;
      }
    }
  }

  .anim-rain {
    opacity: 0;
    transition: opacity 1s ease-out;

    &.fade-in {
      opacity: 1;
    }
  }
</style>
