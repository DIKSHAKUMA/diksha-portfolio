<script setup lang="ts">

const { $gsap } = useNuxtApp()

onMounted(() => {


})

const open = () => {
    console.log('Open')
}

const close = () => {
    console.log('Close')
}

defineExpose({
    open,
    close
})

</script>

<template>
    <div>

    </div>
</template>

<style scoped></style>