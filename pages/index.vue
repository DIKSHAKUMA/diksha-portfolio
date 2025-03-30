<script setup lang="ts">
import { useHomeStore } from '~/store/useHomeStore'

const store = useHomeStore()
// Fetch data for home page
await callOnce('home', () => store.fetchData())

definePageMeta({
    layout: 'default',
})

const { $lenis } = useNuxtApp();

const scrollConfig = reactive({
    text: '                       Swedish frontend developer & photographer. UI/UX / this / *  Based: Barcelona / London ...',
    speed: "1"
})

onMounted(() => {
    console.log("YAA")
    $lenis.resize()
    //$lenis.scrollTo(1, { immediate:true, force: true });
    window.scrollTo(0,0)
})

</script>

<template>
    <div class="home-wrapper" >
        <ViewHero />
        <ViewSelProjects />
        <UITextScroller :text="scrollConfig.text" :speed="scrollConfig.speed" />
    </div>
</template>

<style lang="scss" scoped>
.pin {
    height: 100vh;
}

.home-wrapper {
    overflow-y: hidden;
    flex-flow: column;
    display: flex;
    position: relative;
}

body {
    margin: 0;
    padding: 0;
}
</style>