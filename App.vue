<script setup lang="ts">

const isLoaded = ref(false)
const { $gsap } = useNuxtApp()

// we can use this later for landig hook animation
onMounted(() => {
    isLoaded.value = true
})
</script>

<template>
    <div  class="off" :class="{'on':isLoaded}">
        <UINavBar />
        <NuxtLayout>
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

.off {
    opacity: 0;
    transition:opacity 1s;
}

.on {
    opacity: 1;
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

</style>