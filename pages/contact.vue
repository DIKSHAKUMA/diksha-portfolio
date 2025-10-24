<script setup lang="ts">
import { useNavbarStore } from '~/store/useNavbarStore'
  definePageMeta({
    layout: 'default',
    pageTransition: {
      name: 'saki',
      mode: 'out-in',
    },
  })

  const navbarStore = useNavbarStore()

  onMounted(() => {
    const { $lenis } = useNuxtApp()
    $lenis.scrollTo(0, { immediate: true, force: true })
    if (import.meta.client) navbarStore.setTransparent(true, 'contact')
  })

  onUnmounted(() => {
    navbarStore.setTransparent(false, 'contact')
  })
</script>
<template>
  <div>
    <UIMouseCursor />
    <div class="contact-wrapper">
      <ViewHeroContact />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .contact-wrapper {
    flex-flow: column;
    display: flex;
    position: relative;
    overflow-x: visible;
    z-index: inherit;
    overflow: hidden;
    min-height: 100vh;

    @supports (height: 100svh) {
      min-height: 100svh;
    }
  }
</style>
