<script setup lang="ts">
  import { useSafariIOSDetection } from '~/composable/useSafariIOSDetection'

  const { isSafariIOS } = useSafariIOSDetection()
  const colorMode = useColorMode()
  const isFirefox = ref(false)
  const showRaindrops = ref(false)

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

  onMounted(() => {
    if (navigator.userAgent.toLowerCase().includes('firefox')) {
      isFirefox.value = true
    }

    /* Delay raindrops to avoid Venice blind interference */
    setTimeout(() => {
      showRaindrops.value = true
    }, 1000) /* Adjust timing as needed - 600ms should be after Venice blind completes */
  })

  onUnmounted(() => {})
</script>

<template>
  <div
    class="rain-wrapper"
    :class="{'ios-safari': isSafariIOS }"
  >
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

    <!-- Weather Widgets TODO: Could be refactored into component and reside in ViewHeroContact -->
    <div v-if="weatherData && !weatherPending" class="weather-widgets">
      <!-- Local Time Widget -->
      <div
        class="weather-widget weather-widget--time"
        :class="{ 'weather-widget--firefox': isFirefox }"
      >
        <div class="weather-widget__icon">🕐</div>
        <div class="weather-widget__label">{{ weatherData.location }}</div>
        <div class="weather-widget__value">{{ weatherData.localTime }}</div>
      </div>

      <!-- Temperature Widget -->
      <div
        class="weather-widget weather-widget--temperature"
        :class="{ 'weather-widget--firefox': isFirefox }"
      >
        <div class="weather-widget__icon">🌡️</div>
        <div class="weather-widget__label">Temperature</div>
        <div class="weather-widget__value">{{ weatherData.temperature }}°C</div>
        <div class="weather-widget__bar">
          <div
            class="weather-widget__progress weather-widget__progress--temp"
            :style="{
              width:
                Math.min(
                  100,
                  Math.max(0, (weatherData.temperature + 10) * 2.5)
                ) + '%',
            }"
          ></div>
        </div>
      </div>

      <!-- Humidity Widget -->
      <div
        class="weather-widget weather-widget--humidity weather-widget--hidden"
        :class="{ 'weather-widget--firefox': isFirefox }"
      >
        <div class="weather-widget__icon">💧</div>
        <div class="weather-widget__label">Humidity</div>
        <div class="weather-widget__value">{{ weatherData.humidity }}%</div>
        <div class="weather-widget__bar">
          <div
            class="weather-widget__progress weather-widget__progress--humidity"
            :style="{ width: weatherData.humidity + '%' }"
          ></div>
        </div>
      </div>
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
    background-position: center;
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

  /* Weather Widgets */
  .weather-widgets {
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 16px;
    z-index: 100;

    .rain-wrapper.ios-safari & {
      margin-bottom: 120px;
    }

    @include this-and-above('sm') {
      right: $px-16-spacer;
      gap: $px-32-spacer;
    }

    @include this-and-above('md') {
      right: $px-64-spacer;
      gap: $px-32-spacer;
    }
  }

  .weather-widget {
    background: rgba(250, 247, 255, 0.1);
    backdrop-filter: blur(15px);
    border-radius: 12px;
    padding: $px-16-spacer;
    min-width: 180px;
    border: 1px solid rgba(250, 247, 255, 0.2);
    animation: float 6s ease-in-out infinite;
    font-family: $sans-ui-mono;

    &--firefox {
      animation: none;
    }

    .light-mode & {
      background: rgba(23, 23, 23, 0.1);
      border-color: rgba(23, 23, 23, 0.2);
    }

    &__icon {
      font-size: 24px;
      margin-bottom: $px-8-spacer;
    }

    &__label {
      font-size: clamped(12px, 14px, 480px, 1920px);
      color: #faf7ff;
      opacity: 0.8;
      margin-bottom: $px-8-spacer;
      font-weight: 500;
    }

    &__value {
      font-size: clamped(20px, 24px, 480px, 1920px);
      color: #faf7ff;
      font-weight: 500;
      margin-bottom: $px-16-spacer;
    }

    &__bar {
      width: 100%;
      height: 6px;
      background: rgba(250, 247, 255, 0.2);
      border-radius: 3px;
      overflow: hidden;

      .light-mode & {
        background: rgba(23, 23, 23, 0.2);
      }
    }

    &__progress {
      height: 100%;
      border-radius: 3px;
      transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);

      &--temp {
        background: linear-gradient(
          90deg,
          #4facfe 0%,
          #00f2fe 50%,
          #ff6b6b 100%
        );
      }

      &--humidity {
        background: linear-gradient(90deg, $accent2 0%, $accent1 100%);
      }
    }

    &--time {
      animation-delay: 0s;
    }

    &--temperature {
      animation-delay: 1.5s;
    }

    &--humidity {
      animation-delay: 3s;
    }

    &--hidden {
      display: none;
      @include this-and-above('sm') {
        display: block;
      }
    }

    @include this-and-above('sm') {
      padding: $px-16-spacer;
      min-width: 200px;
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
