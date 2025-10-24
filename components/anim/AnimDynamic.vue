<script setup lang="ts">
  import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'

  const { $gsap } = useNuxtApp()
  let ctx: gsap.Context

  onMounted(() => {
    if (!import.meta.client) return
    
    const triad_tl = $gsap.timeline({ repeat: -1 })

    ctx = $gsap.context((self) => {
      const createTriad = () => {
        $gsap.set('.circle1', { xPercent: 0, yPercent: -25 })
        $gsap.set('.circle2', { xPercent: -25, yPercent: 25 })
        $gsap.set('.circle3', { xPercent: 25, yPercent: 25 })

        triad_tl

          .set('.circle', { transformOrigin: '50% 50%' })
          .from('.circle', { scale: 0, duration: 0.8, ease: 'power2' })
          .to('.circle1', { xPercent: 25, yPercent: 25 }, '-=0.2')
          .to('.circle2', { xPercent: 0, yPercent: -25 }, '<')
          .to('.circle3', { xPercent: -25, yPercent: 25 }, '<')

          .to('.circle1', {
            scale: 0,
            duration: 0.4,
            ease: 'power1.in',
            transformOrigin: '25% 25%',
          })
          .to(
            '.circle2',
            {
              scale: 0,
              duration: 0.4,
              ease: 'power1.in',
              transformOrigin: '50% 75%',
            },
            '-=80%'
          )
          .to(
            '.circle3',
            {
              scale: 0,
              duration: 0.4,
              ease: 'power1.in',
              transformOrigin: '75% 25%',
            },
            '-=80%'
          )
      }

      createTriad()
    })
  })

  onUnmounted(() => {
    ctx.revert()
  })
</script>

<template>
  <div class="anim-wrapper">
    <div class="anim">
      <div class="circle circle1"></div>
      <div class="circle circle2"></div>
      <div class="circle circle3"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .anim {
    display: flex;
    position: absolute;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      125% 125% at 50% 100%,
      $secondary 40%,
      $accent2 100%
    );
  }

  .circle {
    opacity: 0.9;
    border-radius: 50%;
    background: $primary;
    width: 100px;
    height: 100px;
    place-self: center;
    position: absolute;

    @include this-and-above('md') {
      width: 200px;
      height: 200px;
    }
  }
</style>
