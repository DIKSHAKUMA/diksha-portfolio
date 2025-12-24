<script setup lang="ts">
  const props = defineProps<{
    isMobile: boolean
  }>()

  /* Lets have light mode as true and recall to update the ref in UINavBar */
  const model = defineModel({ default: false })
</script>

<template>
  <div>
    <label class="ios-switch action" data-name="menu">
      <input type="checkbox" name="checkbox" v-model="model" ref="myInput" />
      <i :class="{ 'mobile-mode': props.isMobile }">
        <Icon
          class="icon"
          :class="{ 'icon--right': isMobile }"
          :name="
            model
              ? 'line-md:sunny-outline-loop'
              : 'line-md:sunny-filled-loop-to-moon-filled-alt-loop-transition'
          "
          :size="isMobile ? 30 : 20"
        />
      </i>
    </label>
  </div>
</template>

<style lang="scss" scoped>
  .icon {
    z-index: 999;
    position: relative;
    transform: scale(1.001);
    vector-effect: non-scaling-stroke;
    bottom: 1px;
  }

  .icon--right {
    right: 6px;
  }

  .ios-switch {
    position: relative;
    display: inline-block;
    cursor: pointer;
    z-index: 99;
    width: 20px;
    height: 20px;

    input {
      display: none;
    }

    i {
      position: relative;
      display: inline-block;
      border-radius: 9px;
      vertical-align: middle;
      transition: all 0.3s;
    }
  }
</style>
