<script setup lang="ts">
  import SplitType from 'split-type'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'

  interface Props {
    label: string
    hoverLabel: string
    className: string
    hpos: string
    vpos: string
    link: string
    forceWhite: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    label: '',
    hoverLabel: '',
    className: '',
    hpos: 'flex-start',
    vpos: 'flex-start',
    link: '',
    forceWhite: false,
  })

  const { $gsap } = useNuxtApp()
  let ctx: gsap.Context

  onMounted(() => {})

  onUnmounted(() => {})
</script>

<template>
  <div
    class="info-label-wrapper"
    :class="{ 'info-label-wrapper--white': forceWhite }"
    :style="{ 'justify-content': props.hpos, 'align-items': props.vpos }"
  >
    <header class="info-label-header" :class="className">
      <div v-if="!link">{{ label }}</div>
      <NuxtLink
        v-else
        :to="link"
        class="action"
        data-name="yo"
        :data-text="props.hoverLabel"
        target="_blank"
        >{{ label }}</NuxtLink
      >
    </header>
  </div>
</template>

<style lang="scss" scoped>
  .action {
    display: block;
    text-decoration: none;

    .light-mode &:hover {
      color: $accent2;
    }

    .dark-mode &:hover {
      color: $accent2;
    }
  }

  .info-label-wrapper {
    position: absolute;
    display: flex;
    color: var(--secondary);
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    pointer-events: none; /* Allow mouse events to pass through wrapper */
    &--white {
      color: #faf8ff !important;
    }
  }

  .info-label-header {
    font-size: clamped(12px, 14px, 480px, 1920px);
    opacity: 0.8;
    font-family: $sans-ui;

    font-weight:500;
    line-height: 1;
    margin: $px-16-spacer $px-16-spacer;
    pointer-events: auto; /* Re-enable mouse events only on the actual label */
    /* Add bottom padding for iOS browser UI */
    padding-bottom: env(safe-area-inset-bottom, 20px);

    @include this-and-above('md') {
      margin: $px-16-spacer $px-64-spacer;
    }
  }

  .info-label-header a {
    color: inherit;
  }
</style>
