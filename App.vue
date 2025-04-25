<script setup lang="ts">
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const route = useRoute()
// PINIA 🍍 
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const { $gsap } = useNuxtApp()

// we can use this later for landig hook animation
onMounted(() => {

})
</script>

<template>
    <div>
        <NuxtLayout >
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>

<style lang="scss">
html,
body {
    background-color: $primary;
    -webkit-font-smoothing: antialiased;
    -moz-font-smoothing: antialiased;
    -o-font-smoothing: antialiased;
    font-family: $sans-text;
    margin: 0;
    padding: 0;
}

.html {
    /* Adjust font size */
    -webkit-text-size-adjust: 100%;
    /* Font varient */
    font-variant-ligatures: none;
    -webkit-font-variant-ligatures: none;
    /* Smoothing */
    text-rendering: optimizeLegibility;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    height: 100%;
    overflow-y: auto;
}

body {
    display: flex;
    flex-direction: column;
}

.layout-enter-active .inner,
.layout-leave-active .inner {
    /* display: none; */
    background: white;
  height: 100vh;
  position: absolute;
  @extend %stretch;
  transform: translateY(100%);
  transition: transform 0.475s;
  z-index: 10;
  overflow: hidden;
}

.layout-enter-from .inner,
.layout-leave-to .inner {
    transform: translateY(-100%);
    transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
    transition-duration: 0.8s;
}

%stretch {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}



</style>