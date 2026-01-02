<script setup lang="ts">
  /*
    Refactored. Rain is now rain and Weather sits in separate component. SRP.
  */
  const showRaindrops = ref(false)

  const getRaindrops = computed(() => {
    const drops = []
    const width = window.innerWidth || 1920
    const height = window.innerHeight || 1080
    const isMobile = width < 768

    for (let i = 0; i < 300; i++) {
      const x = Math.random()
      const y = Math.random()
      /* Make raindrops 5px smaller on mobile */
      const baseSize = isMobile
        ? -1
        : 4 /* Mobile: -1 to 12, Desktop: 4 to 17 */
      const size = baseSize + Math.random() * 13
      const stretch = Math.random() * 0.2
      const dropHeight = size * (1 + stretch)
      const delay = Math.random() * 30

      drops.push({
        id: i,
        left: x * width,
        top: y * height,
        width: size,
        height: dropHeight,
        backgroundPosition: `${x * 100}% ${y * 100}%`,
        animationDelay: `${delay}s`,
      })
    }
    return drops
  })

  onMounted(() => {
    setTimeout(() => {
      showRaindrops.value = true
    }, 800)
  })

  onUnmounted(() => {
    showRaindrops.value = false
  })
</script>

<template>
  <div class="rain-wrapper">
    <div class="window" :class="{'window--show': showRaindrops}"></div>

    <ClientOnly>
      <div class="raindrops" v-if="showRaindrops">
        <div
          v-for="drop in getRaindrops"
          :key="drop.id"
          class="raindrop"
          :style="{
            left: drop.left + 'px',
            top: drop.top + 'px',
            width: drop.width + 'px',
            height: drop.height + 'px',
            backgroundPosition: drop.backgroundPosition,
            animationDelay: drop.animationDelay,
          }"
        ></div>
      </div>
    </ClientOnly>
  </div>
</template>

<style scoped lang="scss">
  .rain-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;

    @include this-and-above('sm') {
      justify-content: flex-end;
    }
  }

  .window {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('/img/vector.jpg');
    background-size: cover;
    background-position: 80% 50%;
    background-repeat: no-repeat;
    opacity: 0;
    transition: opacity 1s;

    &--show {
      opacity: 1;
    }

    @supports (background-image: url('/img/vector.webp')) {
      background-image: url('/img/vector.webp');
    }
  }

  .raindrops {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  /* Refraction. Inspired by https://codepen.io/lbebber/pen/kvVKGK */
  .raindrop {
    position: absolute;
    background-image: url('/img/vector.jpg');
    background-size: 1000%;
    border-radius: 100%;
    transform: rotate(180deg);
    opacity: 0;
    animation: raindrop-fall 100ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
    animation-fill-mode: forwards;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.2);
    transition: background-size 1s;

    @keyframes raindrop-fall {
      0% {
        opacity: 0;
        transform: rotate(180deg) scale(2.5, 2.3);
      }

      100% {
        opacity: 1;
        transform: rotate(180deg) scale(1, 1);
      }
    }

    @supports (background-image: url('/img/vector.webp')) {
      background-image: url('/img/vector.webp');
    }

    &:hover {
      background-size: 600%;
    }
  }
</style>
