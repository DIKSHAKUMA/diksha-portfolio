<script setup lang="ts">
const model = defineModel({ default: false })
const colorMode = useColorMode()
const icon = useTemplateRef('icon')


// TODO: Fix below it assumes we are in light mode which is wrong.
const toggleDarkmode = () => {
    console.log("modelValue color", model.value)
    model.value = !model.value;
    (model.value) ? colorMode.preference = 'dark' : colorMode.preference = 'light'
}
</script>

<template>
    <div class="darkmode action" data-name="menu" @click="toggleDarkmode"
        :class="[model ? 'darkmode--on' : 'darkmode--off']">
        <Icon class="darkmode__svg" name="ix:light-dark" mode="svg" size="38" ref="icon" />
    </div>
</template>

<style lang="scss" scoped>
.darkmode {
    color: $accent2;
    bottom: 13px;
    transition: color .3s;
    cursor: pointer;
    transition: all .5s cubic-bezier(0.075, 0.82, 0.165, 1);
    transform-origin: center;
    height: 38px;
    margin-bottom: 5px;

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