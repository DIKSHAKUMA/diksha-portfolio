<template>
  <div
    :class="[
      'work-badge',
      isMobile ? 'work-badge--hidden' : 'work-badge--desktop',
    ]"
  >
    <a href="mailto:sdiksha.work@gmail.com" class="work-badge__link">
      <svg
        class="work-badge__svg"
        viewBox="0 0 250 250"
        xmlns="http://www.w3.org"
      >
        <defs>
          <path
            id="workPath"
            d="M 125, 125 m -60, 0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0"
          />
        </defs>
        <!-- fill="currentColor" or your variable allows theme syncing -->
        <text
          class="work-badge__text work-badge__text--animated"
          fill="currentColor"
          font-family="Arial, sans-serif"
          font-size="17"
        >
          <textPath href="#workPath" textLength="374" lengthAdjust="spacing">
            OPEN TO WORK OPEN TO WORK OPEN TO WORK
          </textPath>
        </text>
      </svg>
    </a>
  </div>
</template>

<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'

  const isMobile = ref(false)

  const updateSize = () => {
    isMobile.value = window.innerWidth <= 768
  }

  onMounted(() => {
    updateSize()
    window.addEventListener('resize', updateSize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateSize)
  })
</script>

<style scoped lang="scss">
  .work-badge {
    position: absolute;
    /* Use your primary variable to drive the color */
    color: var(--accent2);
    /* Link will handle pointer events */

    &--hidden {
      display: none;
    }

    &--desktop {
      bottom: $px-16-spacer;
      right: $px-16-spacer;
      width: 250px;
    }
  }

  .work-badge__link {
    display: block;
    text-decoration: none;
    color: inherit;
  }

  .work-badge__svg {
    display: block;
    width: 100%;
    height: auto;
  }

  .work-badge__text {
    transform-origin: 125px 125px;
    /* transition ensures color flip is smooth when switching modes */
    transition: fill 0.3s ease;
  }

  .work-badge__text--animated {
    animation: rotate-badge 15s linear infinite;
  }

  @keyframes rotate-badge {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
