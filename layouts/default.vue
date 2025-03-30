<script setup lang="ts">
import { useLayoutStore } from "~/store/useLayoutStore"

const store = useLayoutStore()
// Fetch data for nav and footer
await callOnce('layout', () => store.fetchData())

</script>

<template>
  <div>
    <UIMouseCursor />
    <CommonHeader />
    <div class="folio-wrapper">
      <slot />
    </div>
    <CommonFooter />
  </div>
</template>

<style scoped>
.folio-wrapper {
  overflow-y: hidden;
  padding-right: 20px;
  /* 3 */
  padding-left: 20px;
  /* 3 */
}
</style>