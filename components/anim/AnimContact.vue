<script setup lang="ts">
  import { useSafariIOSDetection } from '~/composable/useSafariIOSDetection'

  const { isSafariIOS } = useSafariIOSDetection()
  const showRaindrops = ref(false)

  /**
   * Seriouslly, the widgets should not be in here and be there own component
   * but I'm lazy.
   * TODO: Refactor out widgets
   */

  /* Local Madrid time with CET/CEST timezone */
  const localTime = ref('')

  const updateLocalTime = () => {
    const options = {
      timeZone: 'Europe/Madrid',
      hour: '2-digit' as const,
      minute: '2-digit' as const,
      hour12: false,
      timeZoneName: 'short' as const,
    }

    // Will show like "14:30 CET" or "15:30 CEST"
    localTime.value = new Date().toLocaleTimeString('en-GB', options)
  }

  /* Fetch weather data client side only , openweather API */
  const {
    data: weatherData,
    pending: weatherPending,
    error: weatherError,
  } = useFetch('/api/weather', {
    server: false,
  })

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

  let timeInterval: NodeJS.Timeout | null = null

  onMounted(() => {
    // Initialize and update time
    updateLocalTime()
    const timer = setInterval(updateLocalTime, 60000)

    // Cleanup interval on component unmount
    onUnmounted(() => {
      clearInterval(timer)
    })

    showRaindrops.value = true
  })

  onUnmounted(() => {
    /* Clean up time interval */
    if (timeInterval) {
      clearInterval(timeInterval)
    }
  })
</script>

<template>
  <div class="rain-wrapper" :class="{ 'ios-safari': isSafariIOS }">
    <div class="window"></div>

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

    <!-- Weather Widgets - Clean minimal layout -->
    <div v-if="weatherData && !weatherPending" class="weather-info">
      <div class="weather-info__item location-info">
        <svg
          class="location-info__icon"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
            fill="currentColor"
          />
        </svg>
        <span class="location-info__text">Barcelona</span>
      </div>
      <div class="weather-info__item">CET: {{ localTime }}</div>
      <div class="weather-info__item">T: {{ weatherData.temperature }}°C</div>
      <div class="weather-info__item">RH: {{ weatherData.humidity }}%</div>
    </div>
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
    background-image: url('/img/sun-rain.jpg');
    background-size: cover;
    background-position: 80% 50%;
    background-repeat: no-repeat;

    @supports (background-image: url('/img/sun-rain.webp')) {
      background-image: url('/img/sun-rain.webp');
    }
  }

  .raindrops {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

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

  /* Refraction. Inspired by https://codepen.io/lbebber/pen/kvVKGK */
  .raindrop {
    position: absolute;
    background-image: url('/img/sun-rain.jpg');
    background-size: 1000%;
    border-radius: 100%;
    transform: rotate(180deg);
    opacity: 0;
    animation: raindrop-fall 100ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
    animation-fill-mode: forwards;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.2);
    transition: background-size 1s;

    @supports (background-image: url('/img/sun-rain.webp')) {
      background-image: url('/img/sun-rain.webp');
    }

    &:hover {
      background-size: 600%;
    }
  }

  /* Weather Info - Clean minimal layout */
  .location-info {
    display: flex;
    align-items: center;
    gap: $px-4-spacer;
    font-family: $sans-ui-mono;
    font-size: clamped(12px, 16px, 480px, 1920px);
    color: $secondary-static;
    text-transform: uppercase;

    &__icon {
      width: 12px;
      height: 12px;
      color: $secondary-static;
    }

    &__text {
      white-space: nowrap;
    }
  }

  .weather-info {
    position: absolute;
    bottom: $px-16-spacer;
    right: $px-16-spacer;
    display: flex;
    flex-direction: column;
    row-gap: $px-4-spacer;
    align-items: flex-end;
    z-index: 100;
    font-family: $sans-ui-mono;
    font-size: clamped(12px, 16px, 480px, 1920px);
    color: $secondary-static;
    text-transform: uppercase;

    @include this-and-above('sm') {
      flex-direction: row;
      column-gap: $px-8-spacer;
      right: $px-64-spacer;
    }

    &__item {
      white-space: nowrap;
    }
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0px);
    }

    50% {
      transform: translateY(-10px);
    }
  }
</style>
