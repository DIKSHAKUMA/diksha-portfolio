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
    font-size: clamped(16px, 18px, 480px, 1920px);

    [is-mobile='true'] & {
      color: $primary;
      font-weight: 600;
    }
  }

  .mode {
    letter-spacing: 0.5px;
    /* Even though align centre is set on container in NavBar, eagle eye says it's not enough */
    margin-bottom: 2px;
  }
</style>
