<script setup lang="ts">
import { useSlots } from 'vue';
const slots = useSlots();
const props = defineProps({
    isMobile: {
        type: Boolean,
        default: false
    }
});
</script>

<template>
    <div :is-mobile="props.isMobile">
        <div v-if="slots.logo" class="logo">
            T.Thorstensson
        </div>
        <div v-if="slots.mode" class="mode">
            <slot name="mode"></slot>
        </div>
        <div></div>
    </div>
</template>

<style lang="scss" scoped>
.logo{
    z-index: 100;
    color: $secondary;
    font-size: clamped(14px, 18px, 480px, 1920px);

    [is-mobile="true"] & {
        color: $primary;
        font-weight: 600;
    }
}

.mode{
    letter-spacing: .5px;
}
</style>