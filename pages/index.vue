<script setup lang="ts">

definePageMeta({
    layout: 'default',
    pageTransition: {
        name: 'saki',
        mode: 'out-in'
    }
})

const { $lenis } = useNuxtApp();

const scrollConfig = reactive({
    text: '                       Swedish frontend developer & photographer. UI/UX / this / *  Based: Barcelona / London ...',
    speed: "1.5"
})

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
            <ViewWorksHome />
            <ViewCanSub />
            <ViewMetaSub />
            <ViewFooterSub />
            <!--Components ending 'sub'can be reused in any view, might need to solve a few things to make it work-->
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