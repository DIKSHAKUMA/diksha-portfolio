<script setup lang="ts">
onMounted(() => {
  console.log("layout")
})
</script>

<template>
  <div>
    <UIMouseCursor />
    <CommonHeader />
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
}
</style>