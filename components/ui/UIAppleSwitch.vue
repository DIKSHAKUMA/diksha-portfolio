<script setup lang="ts">

const title = ref("")
const input = useTemplateRef<any>("myInput")
const model = defineModel({ default: false })

// ex negro, blanco
const props = defineProps<{ title1: string, title2: string }>()

// by default title 1 (switch on left side)
title.value = props.title1;

const change = () => {
    (model.value) ? title.value = props.title1 : title.value = props.title2
}

</script>

<template>
    <div>
        <label class="ios-switch action" data-name="menu">
            <div class="ios-switch__title">{{ title }}</div>
            <input type="checkbox" name="checkbox" v-model="model" @input="change" ref="myInput">
            <i></i>
        </label>
    </div>
</template>

<style lang="scss" scoped>
/*
Adapted by me to Vue & Credit to the CSS creator @s
https://dev.to/urielbitton/how-to-design-an-ios-style-switch-4maj
*/
.ios-switch {
    display: inline-block;
    cursor: pointer;

    &__title {
        margin-right: 5px;
        display: inline-block;
        vertical-align: middle;
        font-size: $fs-10;
    }

    input {
        display: none;
    }

    i {
        position: relative;
        display: inline-block;
        width: 39px;
        height: 18px;
        background-color: $accent2;
        border-radius: 23px;
        vertical-align: middle;
        transition: all 0.3s;
    }

    i::before {
        content: "";
        position: absolute;
        left: 0;
        width: 15px;
        height: 15px;
        background-color: $primary;
        border-radius: 11px;
        transform: translate3d(2px, 1px, 0) scale3d(1, 1, 1);
        transition: all 0.3;
    }

    i::after {
        content: "";
        position: absolute;
        left: 0;
        width: 15px;
        height: 15px;
        background-color: $primary;
        border-radius: 11px;
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.24);
        transform: translate3d(2px, 1px, 0);
    }

    :active i::after {
        width: 28px;
        transform: translate3d(1px, 1px, 0);
    }

    :active input:checked+i::after {
        transform: translate3d(16px, 1px, 0);
    }

    input:checked+i {
        background-color: $accent2;
    }

    input:checked+i::before {
        transform: translate3d(18px, 1px, 0) scale3d(0, 0, 0);
    }

    input:checked+i::after {
        transform: translate3d(22px, 1px, 0);
    }
}
</style>