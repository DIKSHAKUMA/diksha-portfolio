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
  </div>
</template>

<style lang="scss" scoped>
  .logo {
    font-family: $sans-ui;
    font-size: clamped(16px, 18px, 480px, 1920px);
    font-weight: 450;
    font-variation-settings: 'wght' 450;
    font-weight: 400;
    letter-spacing: 1px;
    z-index: 1000;
    [is-mobile='true'] & {
      font-weight: 400;
      font-variation-settings: 'wght' 400;
    }
  }
</style>
