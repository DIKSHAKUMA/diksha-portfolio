<script setup lang="ts">

const colorMode = useColorMode()

const fill = computed(() => {
    return colorMode.preference === 'dark' ? 'rgba(228, 230, 231, .6)' : 'rgba(0, 0, 0, .6)'
})

const getRandomPositions = computed(() => {
    const positions = []
    const width = window.innerWidth || 1920  // Fallback width
    const height = window.innerHeight || 1080  // Fallback height
    
    for (let i = 0; i < 20; i++) {
        positions.push({
            x: Math.random() * width,
            y: Math.random() * height
        })
    }
    return positions
})

onMounted(() => {

    if (import.meta.client) {

    }

})
onUnmounted(() => {

})
</script>

<template>
    <div class="rain-wrapper">
        <section class="rain">
            <ClientOnly>
                <div class="rain__drops">
                    <div v-for="(position, index) in getRandomPositions" :key="index" :style="{ left: position.x + 'px', top: position.y + 'px' }" class="rain__drops__drop"></div>
                </div>
            </ClientOnly>
        </section>
    </div>
</template>

<style scoped lang="scss">
rain-wrapper {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
}


.rain {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('/img/jason-gardner.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    filter: blur(3px);

    @supports (background-image: url('/img/jason-gardner.webp')) {
        background-image: url('/img/jason-gardner.webp');
    }
}

.rain__drops {

    &__drop {
        position: absolute;
        width: 100px;
        height: 100px;
        background: transparent;
        border-radius: 57% 43% 37% 63% / 51% 53% 47% 49%;
        box-shadow: inset 6px 6px 4px rgba(0, 0, 0, 0.75), 12px 18px 6px rgba(0, 0, 0, 0.25), 12px 15px 2px rgba(0, 0, 0, 0.12), inset -6px -6px 6px rgba(255, 255, 255, 1);
        opacity: 1;
    }

    &__drop::before {
        content: '';
        position: absolute;
        top: 25px;
        left: 35px;
        background: #fff;
        width: 20px;
        height: 20px;
        border-radius: 57% 43% 37% 63% / 48% 37% 63% 52%;
    }

    &__drop::after {
        content: '';
        position: absolute;
        top: 25px;
        left: 65px;
        background: #fff;
        width: 10px;
        height: 10px;
        border-radius: 57% 43% 37% 63% / 48% 37% 63% 52%;

    }

    &__drop:nth-child(odd) {
        transform: scale(0.2) translate(-200px, 180px);
        border-radius: 64% 36% 42% 58% / 42% 37% 63% 58%;
        /* border: 2px solid black; */
    }

    &__drop:nth-child(even) {
        transform: scale(0.3) translate(280px, 10px);
        border-radius: 49% 51% 42% 58% / 56% 47% 53% 44%;
    }

}
</style>
