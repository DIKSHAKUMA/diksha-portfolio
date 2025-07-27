<script setup lang="ts">
const metaLine = useTemplateRef('metaLine')
const { $gsap } = useNuxtApp()

const props = withDefaults(defineProps<{ pos?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky' }>(), {
    pos: 'absolute'
})

onMounted(() => {
    if (metaLine.value) {
        $gsap.fromTo(
            metaLine.value,
            { width: '0%' },
            {
                width: '90%',
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: metaLine.value,
                    start: 'top bottom',
                    toggleActions: 'play none none reverse',
                },
            }
        )
    }
})
</script>

<template>
    <div class="line" ref="metaLine" :style="{ position: props.pos }"></div>
</template>

<style scoped lang="scss">
.line {
    top: 0;
    background-color: $secondary;
    display: block;
    height: 2px;
    left: 50%;
    transform: translate(-50%, 0);
    width: 0%;
}
</style>