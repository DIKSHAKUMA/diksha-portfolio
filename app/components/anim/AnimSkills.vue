<script setup lang="ts">
  import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'

  const { $gsap } = useNuxtApp()

  const scrambleChars = 'upperAndLowerCase'
  let ctx: gsap.Context

  onMounted(() => {
    $gsap.registerPlugin(ScrambleTextPlugin)

    ctx = $gsap.context((self) => {
      const quotes = $gsap.utils.toArray<HTMLElement>('.quote')

      /* Initialize all quotes */
      quotes.forEach((quote, index) => {
        $gsap.set(quote, {
          position: 'absolute',
          opacity: 0,
          whiteSpace: 'nowrap',
          transform: 'translateY(0)',
          y: 0,
        })
      })

      /* Create a master timeline for all animations */
      const masterTimeline = $gsap.timeline({ repeat: -1, repeatDelay: 0 })

      /* Add each quote to the timeline with proper delays */
      quotes.forEach((quote, index) => {
        const text = quote.textContent || ''
        /* Scramble in */
        masterTimeline
          .to(
            quote,
            {
              duration: 1,
              opacity: 1,
              scrambleText: {
                text,
                chars: scrambleChars,
                revealDelay: 1,
                speed: 0.5,
              },
              ease: 'power2.out',
            },
            index * 3
          ) /* Start each word 3 seconds after the previous one */

          /* Scramble out */
          .to(
            quote,
            {
              duration: 1,
              scrambleText: { text: '', chars: scrambleChars },
              opacity: 0,
              ease: 'none',
            },
            `+=1.2`
          ) /* Start 2 seconds after becoming visible */
      })
    })
  })

  onUnmounted(() => {
    ctx?.revert()
  })
</script>

<template>
  <div class="tech-wrapper">
    <div class="text">
      <span class="quote">TypeScript</span>
      <span class="quote">Nuxt / Vue</span>
      <span class="quote">Svelte</span>
      <span class="quote">SvelteKit</span>
      <span class="quote">SSR</span>
      <span class="quote">PixiJS</span>
      <span class="quote">P5JS</span>
      <span class="quote">GraphQL</span>
      <span class="quote">GSAP</span>
      <span class="quote">UI/UX</span>
      <span class="quote">Figma</span>
      <span class="quote">Web Performance</span>
      <span class="quote">Problem Solving</span>
    </div>
  </div>
</template>

<style scoped lang="scss">


  .text {
    display: flex;
    position: absolute;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: $primary;
    background: radial-gradient(
      125% 125% at 50% 100%,
      $secondary 40%,
      $accent2 100%
    );
  }

  .quote {
    font-size: clamped(40px, 60px, 480px, 1920px);
    font-weight: 400;
    opacity: 0;
    position: absolute;
    z-index: 1;
  }
</style>
