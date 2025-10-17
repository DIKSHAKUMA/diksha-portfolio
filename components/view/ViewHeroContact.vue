<script setup lang="ts">
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  import { useFolioStore } from '~/store/useFolioStore'
  import SplitType from 'split-type'

  /* PINIA 🍍 */
  const store = useFolioStore()
  const { $gsap } = useNuxtApp()
  let ctx: gsap.Context

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
          delay: 1.5,
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          scrollTrigger: {
            trigger: sec,
            start: 'top 90%',
            scrub: false,
            end: 'top 50%',
            toggleActions: 'restart none none reverse',
            preventOverlaps: true /* <- HERE */,
            /* markers: { startColor: "green", endColor: "red", fontSize: "18px", fontWeight: "bold", indent: 20 } */
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
    <AnimContact />
    <CommonInfoLabel
      class="ilabel"
      :label="'—Made by Thomas'"
      :class-name="'contact-label'"
      :hpos="'flex-end'"
      :hover-label="'Moi'"
      :vpos="'flex-end'"
      :link="'https://github.com/thorstensson'"
      :force-white="true"
    />
    <div class="contact">
      <div class="contact__label split-label-w">
        {{ store.data.contact?.emailTitle }}
      </div>
      <a
        class="contact__email action split-label-w"
        data-name="menu"
        data-text="Tell me!"
        :href="`mailto:${store.data.contact?.email}`"
        >{{ store.data.contact?.email }}</a
      >
    </div>
    <!--:className here is for gsap is-hero changes bottom margins for wrapper and header-->
    <CommonAbstract
      class="front-header"
      :label="store.data.contact?.viewHeroTitle"
      :delay="1"
      :desc="''"
      :class-name="'contact-intro'"
      :is-hero="true"
      :is-full-width="false"
      :is-secondary="false"
      :author="''"
      :date="''"
      :is-page-title="false"
      :is-two-lines="false"
    />
  </main>
</template>

<style lang="scss" scoped>
  .hero-wrapper {
    position: relative;
    width: 100%;
    height: 100vh;
    height: 100dvh;
    overflow: hidden;
    padding: 0 $px-16-spacer;

    @include this-and-above('md') {
      padding: 0 $px-64-spacer;
    }
  }

  .ilabel {
    a .action {
      color: #faf7ff !important;
    }
  }

  .front-header {
    position: absolute;
    bottom: 0px;
    color: #faf7ff;
    &--ios-safari {
      bottom: 80px;
    }
  }

  .contact {
    position: absolute;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%);
    color: #faf7ff;
    z-index: 200;

    .hero-wrapper.ios-safari & {
      bottom: 180px;
    }

    &__label {
      font-size: clamped(16px, 32px, 480px, 1920px);
    }

    &__email {
      font-size: clamped(20px, 42px, 480px, 1920px);
      color: #faf7ff;

      text-decoration: none;
      border-bottom: 4px solid #faf7ff;
      padding-bottom: 5px;
      transition: color 0.2s cubic-bezier(0.17, 0.67, 0.83, 0.67),
        border-bottom-color 0.2s cubic-bezier(0.17, 0.67, 0.83, 0.67);

      &:hover {
        color: $accent2;
        border-bottom-color: $accent2;
      }
    }

    @include this-and-above('sm') {
      position: relative;
      top: $px-128-spacer;
      bottom: unset;
    }
  }
</style>
