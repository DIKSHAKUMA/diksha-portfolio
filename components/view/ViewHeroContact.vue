<script setup lang="ts">
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  import { useFolioStore } from '~/store/useFolioStore'
  import SplitType from 'split-type'
  import SpecialKudos from '@/assets/svg/cssda-special-kudos-yellow.svg'

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
          delay: 1.2 /* Increased delay to avoid Venice blind collision */,
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
      :is-page-header="false"
      :desc="''"
      :class-name="'contact-intro'"
      :is-hero="true"
      :is-full-width="false"
      :is-secondary="false"
      :author="''"
      :date="''"
      :is-two-lines="false"
    />
    <NuxtLink
      class="no-blur-link"
      to="https://www.cssdesignawards.com/sites/thomas-thorstensson/48276"
      target="_blank"
    >
      <SpecialKudos
        class="csda-special-kudos action"
        data-name="proj"
        data-text="CSSDA!"
      />
    </NuxtLink>
  </main>
</template>

<style lang="scss" scoped>
  /* Prevent blur effect on this specific link */
  .no-blur-link:hover {
    filter: none !important;
    -webkit-filter: none !important;
  }

  .csda-special-kudos {
    position: absolute;
    width: 100px;
    height: auto;
    bottom: $px-128-spacer;
    right: $px-16-spacer;
    z-index: 900;
    animation: rotation 6s infinite linear;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease, opacity 0.3s ease;

    &:hover {
      transform: scale(1.1) rotate(5deg);
      animation-play-state: paused;
      opacity: 0.9;
    }

    @include this-and-above('sm') {
      width: 128px;
      bottom: $px-64-spacer;
      right: $px-64-spacer;
    }
  }

  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }

  .hero-wrapper {
    position: relative;
    width: 100%;
    min-height: 100vh;
    overflow: hidden;
    padding: 0 $px-16-spacer;

    @supports (height: 100svh) {
      min-height: 100svh;
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
    font-size: clamped(16px, 20px, 480px, 1920px);

    &__label {
      font-size: clamped(16px, 20px, 480px, 1920px);
    }
    &__email {
      font-size: clamped(20px, 42px, 480px);
      color: $secondary-static;
      text-decoration: none;
      transition: color 0.2s cubic-bezier(0.17, 0.67, 0.83, 0.67);

      &:hover {
        color: $accent2;
      }
    }
  }
</style>
