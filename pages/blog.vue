<script setup lang="ts">

definePageMeta({
    layout: 'default',
    pageTransition: {
        name: 'saki',
        mode: 'out-in'
    }
})

onMounted(() => {

})

onUnmounted(() => {

})

</script>
<!--Shows all projects, something in a horizontal style using draggable-->
<template>
    <div>
        <UIMouseCursor />
        <div class="blog-outer-wrapper">
            <ViewHeroBlog />
            <ViewBlogExcerpts />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.blog-outer-wrapper {
    flex-flow: column;
    display: flex;
    position: relative;
    overflow-x: visible;
    z-index: inherit;
    overflow: hidden;
    /* Prevent SCSS parsing errors */
}
</style>