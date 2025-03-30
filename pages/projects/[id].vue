<script setup lang="ts">

definePageMeta({
    layout: 'default'
});

const {$lenis} = useNuxtApp();

const route = useRoute();

onMounted(() => {
    $lenis.scrollTo(0 ,{immediate: true, force:true});   
})
</script>

<template>
    <div class="test">Route is {{ route.params.id }}</div>
</template>

<style scoped>
.test {
    height: 120vh;
}
</style>