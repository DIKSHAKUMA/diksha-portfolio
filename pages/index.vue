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
            <ViewHero />
            <ViewAboutFront />
            <ViewProjectsFront />
            <ViewCanFront />
        </div>

    </div>
</template>

<style lang="scss" scoped>
.pin {
    height: 100vh;
}

/* I set no side margin here as I want to separate margins for author heading and intro (ViewHero.vue) in harmony with navbar width; 
margins are instead effected in ViewProjectsFront.vue  */
.home-wrapper {
    flex-flow: column;
    display: flex;
    position: relative;
    overflow-x: visible;
    z-index: inherit;
    /*this to push down UITextScroller.vue */
    margin-bottom: 200px;
}
</style>