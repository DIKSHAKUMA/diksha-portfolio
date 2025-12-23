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
    font-family:$sans-ui-mono;
    line-height: 1.2;
    text-decoration: none;
    z-index: 100;
    line-height: 1.8;
    cursor: pointer;
    width: fit-content;


    font-weight: 500;
    font-variation-settings: 'wght' 500;

    @include this-and-above('lg') {
      display: none;
    }
  }

  /* Contact email hover in mobile nav (inverted background) */
  :deep(div.contact a.contact:hover) {
    color: $accent1 !important;
  }
</style>
