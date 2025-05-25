<script setup lang="ts">
import { useLayoutStore } from "~/store/useLayoutStore"

const store = useLayoutStore()
// Fetch data for nav and footer
await callOnce('layout', () => store.fetchData())
</script>

<template>
  <div>
    <UIMouseCursor />

    <div class="folio-wrapper">
      <slot />
    </div>

  </div>
</template>

<style scoped>
.folio-wrapper {
  /*overflow-y: hidden;*/
  padding-right: 20px;
  padding-left: 20px;
  position:relative;
}
</style>