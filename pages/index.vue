<script setup lang="ts">

definePageMeta({
    layout: 'default',
    pageTransition: {
        name: 'saki',
        mode: 'out-in'
    }
})

const { $lenis } = useNuxtApp();

onMounted(() => {
    $lenis.scrollTo(0, { immediate: true, force: true })
})
</script>

<template>
    <div>
        <UIMouseCursor />
        <div class="home-wrapper">
            <ViewHeroHome />
            <ViewParallaxHome />
            <ViewProjectsHome />
            <ViewKnowSub />
            <ViewMetaSub />
            <ViewFooterSub label="Projects" link="/projects" target="_self" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.pin {
    height: 100vh;
}

.home-wrapper {
    flex-flow: column;
    display: flex;
    position: relative;
    overflow-x: visible;
    z-index: inherit;
    overflow: hidden;
}
</style>