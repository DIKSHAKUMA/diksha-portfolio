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
    font-size: clamped(18px, 20px, 480px, 1920px);
    font-variation-settings: 'wght' 500;
    font-weight: 500;
    letter-spacing: 1px;
    z-index:1000;
    [is-mobile='true'] & {
      font-weight: 500;
      font-variation-settings: 'wght' 500;
    }
  }
</style>
