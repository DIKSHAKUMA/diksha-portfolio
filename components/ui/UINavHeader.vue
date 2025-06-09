<script setup lang="ts">
import { useSlots } from 'vue';
const slots = useSlots();
</script>

<template>
    <div>
        <div v-if="slots.logo" class="logo">
            <slot name="logo"></slot>
        </div>
        <div v-if="slots.mode" class="mode">
            <slot name="mode"></slot>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.logo{
    z-index: 100;
    color: inherit;
    margin-right: auto;
}

.mode{
    margin-left: auto;
    padding-right: 60px;
    letter-spacing: .5px;
}
</style>