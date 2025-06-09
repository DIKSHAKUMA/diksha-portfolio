<script setup lang="ts">
const colorMode = useColorMode()
const isToggle = ref(false) // just a visual switch regardless of value because mode can be cached

const toggleDarkmode = () => {
    isToggle.value = !isToggle.value;
    (colorMode.preference == 'dark') ? colorMode.preference = 'light' : colorMode.preference = 'dark'
}
</script>

<template>
    <div class="mode__icon" data-name="menu" @click="toggleDarkmode"
        :class="[isToggle ? 'mode__icon--rotate0' : 'mode__icon--rotate180']">
        <Icon class="darkmode__svg" name="ix:light-dark" mode="svg" size="38" ref="icon" />
    </div>
</template>

<style lang="scss" scoped>
.mode__icon {
    color: $accent2;
    bottom: 13px;
    transition: color .3s;
    cursor: pointer;
    transition: all .5s cubic-bezier(0.075, 0.82, 0.165, 1);
    transform-origin: center;
    height: 38px;
    margin-bottom: 5px;

    &--rotate0 {
        transform: rotate(0deg);
    }

    &--rotate180 {
        transform: rotate(180deg);
    }

    @media (hover: hover) {
        &:hover {
            color: $accent2;
        }
    }
}
</style>