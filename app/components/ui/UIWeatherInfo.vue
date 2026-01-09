<script setup lang="ts">
  /*
   * Weather Widget (Refactored into its own component Nov 7th 2025).
   * Clean minimal layout.
   */

  /* Trying to adhere to ref use for timers as best practice */
  const timer = ref<NodeJS.Timeout | null>(null)

  /* Local Madrid time with CET/CEST timezone */
  const localTime = ref('')

  /* Updates every six seconds */
  const updateLocalTime = () => {
    const options = {
      timeZone: 'Europe/Madrid',
      hour: '2-digit' as const,
      minute: '2-digit' as const,
      hour12: false,
      timeZoneName: 'short' as const,
    }

    localTime.value = new Date().toLocaleTimeString('en-GB', options)
  }

  /**
   * FIX: was holding up contact page.
   * Client Side Call to Openweather API - lazy loading to prevent blocking
   * Alternative: use fetch with async onMounted, but useFetch is proper way in components.
   */
  const {
    data: weatherData,
    pending: weatherPending,
    error: weatherError,
  } = await useFetch('/api/weather', {
    server: false,
    lazy: true, // Don't block navigation
  })

  onMounted(() => {
    updateLocalTime()
    timer.value = setInterval(updateLocalTime, 60000)
  })

  onUnmounted(() => {
    if (timer.value) {
      clearInterval(timer.value)
      timer.value = null
    }
  })
</script>

<template>
  <!-- Weather Widgets - Clean minimal layout -->
  <div v-if="weatherData && !weatherPending" class="weather-info">
    <div class="weather-info__item weather-info__location-info">
      <svg
        class="weather-info__location-info__icon"
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
      <span class="weather-info__location-info__text">Barcelona</span>
    </div>
    <div class="weather-info__item">CET: {{ localTime }}</div>
    <div class="weather-info__item">T: {{ weatherData.temperature }}°C</div>
    <div class="weather-info__item">
      RH: {{ (weatherData as any).humidity }}%
    </div>
  </div>
</template>

<style scoped lang="scss">
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
    font-weight: 300;
    font-variation-settings: 'wght' 300;
    color: $secondary-static;
    text-transform: uppercase;

    &__location-info {
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

    &__item {
      white-space: nowrap;
    }

    @include this-and-above('sm') {
      flex-direction: row;
      column-gap: $px-8-spacer;
      right: $px-64-spacer;
    }
  }
</style>
