<script setup lang="ts">
</script>

<template>
  <div>
    <div class="folio-wrapper">
      <slot />
    </div>

  </div>
</template>

<style scoped lang="scss">
.folio-wrapper {
  /*overflow-y: hidden;*/
  padding-right: 20px;
  padding-left: 20px;
  position:relative;
}
</style>