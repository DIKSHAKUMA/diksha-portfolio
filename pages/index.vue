<script setup lang="ts">

const { $lenis } = useNuxtApp();

definePageMeta({
    layout: 'default',
    pageTransition: {
        name: 'saki',
        mode: 'out-in'
    }
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
            <UIMouseCursor />
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
    z-index: inherit;
}
</style>