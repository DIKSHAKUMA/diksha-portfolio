<script setup lang="ts">

definePageMeta({
    layout: 'default',
    key: route => route.fullPath,

    pageTransition: {
        name: 'saki',
        mode: 'out-in'
    }
})

const { $lenis } = useNuxtApp();
const route = useRoute();

onMounted(() => {
    $lenis.scrollTo(0, { immediate: true, force: true })
})
</script>

<template>
    <div class="test">
        <UIMouseCursor />
        <div>Route is {{ route.params.id }}</div>
        <NuxtLink class="link" to="/">Home</NuxtLink>
    </div>
</template>

<style scoped>
.test {
    height: 120vh;
}

.link {
    position: relative;
    top: 50px;
}
</style>