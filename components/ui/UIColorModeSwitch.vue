<script setup lang="ts">

const model = defineModel({ default: false })
const colorMode = useColorMode()

const toggleDarkmode = () => {
    model.value = !model.value;
   (model.value) ? colorMode.preference = 'dark' : colorMode.preference = 'light'
   console.log("---toggle darkmode")
}
</script>

<template>
    <div class="darkmode action" data-name="menu" @click="toggleDarkmode" :class="[model ? 'darkmode--on' : 'darkmode--off']">
        <Icon name="ix:light-dark" mode="svg" size="38" />
    </div>
</template>

<style lang="scss" scoped>
.darkmode {
    color: $secondary;
    bottom: 13px;
    transition: color .3s;
    cursor: pointer;
    transition: all .5s cubic-bezier(0.075, 0.82, 0.165, 1);
    transform-origin: center;
    height:38px;
    margin-bottom:5px;
    color: $secondary;

    &--off {
        transform: rotate(0deg);
    }

    &--on {
        transform: rotate(180deg);
    }

    @media (hover: hover) {
        &:hover {
            color: $accent2;
        }
    }
}
</style>