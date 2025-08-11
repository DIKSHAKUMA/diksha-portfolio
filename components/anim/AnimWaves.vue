<script setup lang="ts">

const colorMode = useColorMode()

const fill = computed(() => {
    return colorMode.preference === 'dark' ? 'rgba(228, 230, 231, .6)' : 'rgba(0, 0, 0, .6)'
})

onMounted(() => {

})
onUnmounted(() => {

})
</script>

<template>
    <div class="waves-wrapper">
        <section class="waves">
            <svg class="waves__svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 24 150 40" preserveAspectRatio="none" shape-rendering="auto">
                <defs>
                    <path id="gentle-wave"
                        d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                </defs>
                <g class="waves__svg__moving-waves">
                    <use xlink:href="#gentle-wave" x="48" y="-1" :fill="fill" />
                    <use xlink:href="#gentle-wave" x="48" y="3" :fill="fill" />
                    <use xlink:href="#gentle-wave" x="48" y="5" :fill="fill" />

                </g>
            </svg>

        </section>
    </div>
</template>

<style scoped lang="scss">
.waves-wrapper {
    position: absolute;
    left:0;
    width: 100%;
    height: 100%;
}

.waves__svg {
    position: absolute;
    bottom: 0px;
    height:40vh;
    width:100%;
    will-change: transform;
    overflow: hidden;

    &__svg__moving-waves {
        height:20vh;
        will-change: transform;
        overflow: hidden;
        backface-visibility:hidden;
        transform: translateZ(0);
        contain: layout style paint;
        image-rendering: optimizeSpeed;
        
    }

    &__moving-waves>use {
        animation: none;
    }

    &__moving-waves>use {
        animation: f 40s cubic-bezier(.55, .5, .45, .5) infinite
    }

    &__moving-waves>use:first-child {
        animation-delay: -2s;
        animation-duration: 11s;
    }

    &__moving-waves>use:nth-child(2) {
        animation-delay: -4s;
        animation-duration: 13s;
    }

    &__moving-waves>use:nth-child(3) {
        animation-delay: -3s;
        animation-duration: 15s;
    }
}



@keyframes f {
    0% {
        transform: translate3d(-90px, 0, 0)
    }

    to {
        transform: translate3d(85px, 0, 0)
    }
}
</style>
