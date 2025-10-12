<script setup lang="ts"></script>

<template>
  <div>
    <div class="social">
      <slot name="social"></slot>
    </div>
    <div class="contact">
      <slot name="contact"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .contact,
  .social {
    font-size: clamp(0.88rem, 0.97vw + 0.58rem, 1.75rem);
    line-height: 1.2;
    text-decoration: none;
    z-index: 100;
    line-height: 1.5;
    cursor: pointer;
    width: fit-content;
    margin-top:$px-16-spacer;

    @include this-and-above('lg') {
      display: none;
    }
  }
</style>
