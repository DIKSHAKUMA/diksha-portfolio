<script setup lang="ts">
  import ChevronSVG from '@/assets/svg/chevron-right.svg'

  interface Props {
    text?: string
    to?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    text: 'Back',
    to: '',
  })

  const router = useRouter()

  const handleBack = () => {
    if (props.to) {
      router.push(props.to)
    } else {
      router.back()
    }
  }
</script>

<template>
  <button
    class="back-button action"
    data-name="proj"
    @click="handleBack"
    :aria-label="`Go ${text.toLowerCase()}`"
  >
    <ChevronSVG class="back-button__icon" />
    <span class="back-button__text">{{ text }}</span>
  </button>
</template>

<style lang="scss" scoped>
  .back-button {
    display: inline-flex;
    align-self: flex-end;
    align-items: center;
    width: fit-content;
    padding: $px-8-spacer $px-16-spacer $px-8-spacer 24px;
    cursor: pointer;
    font-family: $sans-ui;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.3s ease;
    position: relative;

    /* Triangle pointing left using clip-path polygon */
    clip-path: polygon(15px 0%, 100% 0%, 100% 100%, 15px 100%, 0% 50%);

    background-color: $accent1; /* Ensure solid background for clip-path */
    color: $primary;

    /* Hardware acceleration */
    transform: translateZ(0);
    backface-visibility: hidden;
    will-change: transform, background-color, border-color;

    &__text {
      color: $secondary;
    }

    &__icon {
      width: 7px;
      height: auto;
      pointer-events: none;
      margin-left: 5px;
      fill: $secondary;
      transform: rotate(180deg) translateX(6px);
    }

    /* Light mode styling */
    .light-mode & {
      background: rgba(23, 23, 23, 0.05);
      border-color: rgba(23, 23, 23, 0.15);
      color: $secondary;
    }

    /* Hover effects, binding to color mode here folks */
    &:hover {
      transform: translateX(-5px) translateZ(0);
      background: rgba(250, 247, 255, 0.15);
      border-color: rgba(250, 247, 255, 0.3);

      .light-mode & {
        background: rgba(23, 23, 23, 0.1);
        border-color: rgba(23, 23, 23, 0.25);
      }
    }

    &:active {
      transform: translateY(0) translateZ(0);
      background: rgba(250, 247, 255, 0.2);

      .light-mode & {
        background: rgba(23, 23, 23, 0.15);
      }
    }

    /* Some blebb */
    &:focus-visible {
      outline: 2px solid $accent1;
      outline-offset: 2px;
    }
  }
</style>
