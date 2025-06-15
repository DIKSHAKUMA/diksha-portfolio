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
            <ViewHero />
            <ViewSelProjects />
        </div>
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
    overflow-x: visible;
    z-index: inherit;
    margin: 0 $sm-spacer;

    @include this-and-above('sm') {
        margin: 0 $md-spacer;
    }

}
</style>