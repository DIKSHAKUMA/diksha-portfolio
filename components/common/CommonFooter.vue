<script setup lang="ts"></script>

<template>
  <footer class="footer-wrapper">
    <div class="footer">
      <section></section>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
  .magnet {
    transition: transform 0.1s linear;
  }

  .footer-wrapper {
    position: fixed;
    width: 100%;
    bottom: 0;
    z-index: 2000;
  }

  .footer {
    display: flex;
    flex-flow: row;
    flex-wrap: wrap;
    justify-content: flex-end;
    min-height: fit-content;
    color: $secondary;
    font-size: clamped(12px, 18px, 380px, 1920px);
    row-gap: 30px;
    margin: 0 $px-16-spacer;

    @include this-and-above('md') {
      margin: 0 $px-64-spacer;
    }
  }
</style>
