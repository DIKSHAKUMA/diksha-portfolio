<script setup lang="ts">
  import { ScrollTrigger } from 'gsap/ScrollTrigger'

  interface Props {
    name: string
    agency: string
    text: string
  }

  const props = withDefaults(defineProps<Props>(), {
    name: '',
    agency: '',
    text: '',
  })

  let ctx: gsap.Context

  onMounted(() => {
    const { $gsap } = useNuxtApp()

    $gsap.registerPlugin(ScrollTrigger)
    /* Simple fade-in animation for better performance */
    ctx = $gsap.context(() => {
      const testimonialElements = $gsap.utils.toArray('.testimonial-fade')
      
      testimonialElements.forEach((element: any) => {
        $gsap.set(element, {
          opacity: 0,
          y: 20
        })
        
        $gsap.to(element, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            end: 'top 50%',
            toggleActions: 'play none none reverse',
            preventOverlaps: false
          }
        })
      })
    })
  })

  onUnmounted(() => {
    ctx?.revert()
  })
</script>

<template>
  <div class="testimonial-wrapper">
    <blockquote class="testimonial testimonial-fade">
      <div>{{ text }}</div>
      <div class="testimonial__cite">
        <cite>{{ name }} - </cite>
        <cite>{{ agency }}</cite>
      </div>
    </blockquote>
  </div>
</template>

<style scoped lang="scss">
  .testimonial-wrapper {
    position: relative;

    @include this-and-above('sm') {
      flex-direction: row;
      margin: 0 $px-32-spacer;
    }

    @include this-and-above('md') {
      margin: 0 $px-64-spacer;
    }

    @include this-and-above('lg') {
      margin: 0 $px-64-spacer;
    }

    @include this-and-above('xl') {
      margin: 0 $px-256-spacer;
    }

    .testimonial {
      font-family: $sans-text;
      font-weight: 400;
      display: flex;
      flex-direction: column;
    }

    blockquote {
      font-size: clamped(16px, 32px, 480px, 1920px);
      font-weight: 400;
      color: $secondary;
      margin: 0;
    }

    cite {
      font-weight: 400;
      font-size: clamped(16px, 20px, 380px, 1920px);
    }

    .testimonial__cite {
      margin-top: $px-16-spacer;
      text-align: right;
    }
  }
</style>
