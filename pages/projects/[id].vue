<script setup lang="ts">

definePageMeta({
    layout: 'default'
});

const { $lenis } = useNuxtApp();
const route = useRoute();

onMounted(() => {
    $lenis.scrollTo(0, { immediate: true, force: true })
})
</script>

<template>
    <div class="test">
        <div>Route is {{ route.params.id }}</div>
        <NuxtLink class="link" to="/">Home</NuxtLink>
    </div>
</template>

<style scoped>
.test {
    height: 120vh;
}

.link {
    position:relative;
    top:0;
}
</style>