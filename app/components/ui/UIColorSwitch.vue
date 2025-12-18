<script setup lang="ts">
  const props = defineProps<{
    isMobile: boolean
  }>()

  const title = ref('')
  /* Lets have light mode as true and recall to update the ref in UINavBar */
  const model = defineModel({ default: false })
</script>

<template>
  <div>
    <label
      :class="{ 'mobile-mode': props.isMobile }"
      class="ios-switch action"
      data-name="menu"
    >
      <div class="ios-switch__title">{{ title }}</div>
      <input type="checkbox" name="checkbox" v-model="model" ref="myInput" />
      <i :class="{ 'mobile-mode': props.isMobile }">
        <Icon
          :class="{ 'icon--dark': model }"
          class="icon"
          :name="
            model
              ? 'line-md:sun-rising-loop'
              : 'line-md:sunny-outline-to-moon-alt-loop-transition'
          "
          size="18"
        />
      </i>
    </label>
  </div>
</template>

<style lang="scss" scoped>
  /*
Adapted by me to Vue & Credit to the CSS creator @s
https://dev.to/urielbitton/how-to-design-an-ios-style-switch-4maj
Added some fancy stuff of course.
*/
  .icon {
    z-index: 999;
    position: relative;
    left: 0;
  }

  .icon--dark {
    left: 22px;
  }

  .ios-switch {
    position: sticky;
    display: inline-block;
    cursor: pointer;
    z-index: 99;

    &__title {
      margin-right: 5px;
      display: inline-block;
      vertical-align: middle;
      font-size: $fs-10;
    }

    input {
      display: none;
    }

    i {
      position: relative;
      display: inline-block;
      width: 40px;
      height: 18px;
     background-color: color-mix(in oklab, var(--accent1) 50%, transparent);
      border-radius: 23px;
      vertical-align: middle;
      transition: all 0.3s;

      &.mobile-mode {
        background-color: $primary;
      }
    }

    i.mobile-mode::after {
      background-color: $primary;
    }

    :active i::after {
      width: 28px;
      transform: translate3d(1px, 1px, 0);
    }

    :active input:checked + i::after {
      transform: translate3d(16px, 1px, 0);

      .mobile-mode & {
        background-color: $primary;
      }
    }

    input:checked + i {
      background-color: color-mix(in oklab, var(--accent1) 50%, transparent);
    }

    input:checked + i.mobile-mode {
      background-color: $primary;
    }

    input:checked + i::before {
      transform: translate3d(18px, 1px, 0) scale3d(0, 0, 0);
    }

    input:checked + i::after {
      transform: translate3d(22px, 1px, 0);
    }
  }
</style>
