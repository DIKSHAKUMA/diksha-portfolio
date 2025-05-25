<script setup lang="ts">
import { useHomeStore } from '~/store/useHomeStore'

const { $lenis } = useNuxtApp();
const store = useHomeStore()
// Fetch data for home page
await callOnce('home', () => store.fetchData())

definePageMeta({
    layout: 'default'
})

const scrollConfig = reactive({
    text: '                       Swedish frontend developer & photographer. UI/UX / this / *  Based: Barcelona / London ...',
    speed: "1"
})

onMounted(() => {
    $lenis.scrollTo(0, { immediate: true, force: true })
})
</script>

<template>
    <div class="home-wrapper">
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
    /*overflow-y: hidden;*/
    flex-flow: column;
    display: flex;
    position: relative;
    overflow-x: hidden;
}
</style>