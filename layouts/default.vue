<script setup lang="ts">
</script>

<template>
  <div>
    <div class="folio-wrapper">
      <UIMouseCursor />
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.folio-wrapper {
  /*overflow-y: hidden;*/
  position: relative;
}
</style>