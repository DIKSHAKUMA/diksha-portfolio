<script setup lang="ts">
  import { useSlots } from 'vue'
  const slots = useSlots()
  const emit = defineEmits(['logo-click'])

  interface Props {
    isMobile: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    isMobile: false,
  })
</script>

<template>
  <div :is-mobile="props.isMobile">
    <div v-if="slots.logo" class="logo">
      <slot name="logo"></slot>
    </div>
    <div v-if="slots.mode" class="mode">
      <slot name="mode"></slot>
    </div>
    <div></div>
  </div>
</template>

<style lang="scss" scoped>
  .logo {
    color: $secondary;
    z-index: 100;
    font-size: clamped(18px, 20px, 480px, 1920px);
    font-variation-settings: 'wght' 500;
    font-weight: 500;

    /* Lighter font weight in dark mode */
    .dark-mode & {
      font-variation-settings: "wght" 350;
      font-weight: 350;
    }

    [is-mobile='true'] & {
      color: $primary;
      font-weight: 500;
    }
  }

  .mode {
    margin-right: 3px;
  }
</style>
