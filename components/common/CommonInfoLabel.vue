<script setup lang="ts">
import SplitType from 'split-type';
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const { $gsap } = useNuxtApp()
let ctx: gsap.Context

const props = defineProps({
    label: {
        type: String,
        default: ''
    },
    className: {
        type: String,
        default: ''
    },
    hpos: {
        type: String,
        default: 'flex-start'
    },
    vpos: {
        type: String,
        default: 'flex-start'
    },
    link: {
        type: String,
        default: ''
    }
})

onMounted(() => {

})

onUnmounted(() => {
})

</script>

<template>
    <div class="info-label-wrapper">
        <header class="info-label-header" :class="className"
            :style="{ 'justify-content': props.hpos, 'align-items': props.vpos }">
            <span v-if="!link">{{ label }}</span>
            <NuxtLink v-else :to="link" class="action" data-name="menu" target="_blank">{{ label }}</NuxtLink>
        </header>
    </div>
</template>

<style lang="scss" scoped>
.action {
    display: block;
    text-decoration: none;

    .light-mode &:hover {
        color: $accent1;
    }

    .dark-mode &:hover {
        color: $accent2;
    }
}

.info-label-wrapper {
    position: absolute;
    display: flex;
    color: var(--secondary);
    text-transform: uppercase;
    z-index: 99;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
}

.info-label-header {
    font-size: clamped(10px, 14px, 480px, 1920px);
    line-height: 1;
    margin: $px-16-spacer $px-16-spacer;
}

.info-label-header a {
    color: var(--secondary);
}
</style>
