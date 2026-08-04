<script setup lang="ts"></script>

<template>
  <div>
    <div class="folio-wrapper" id="main-content">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .folio-wrapper {
    position: relative;
  }
</style>
