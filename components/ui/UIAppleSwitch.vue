<script setup lang="ts">
const props = defineProps<{
    isMobile: boolean
}>()

const title = ref("")
const input = useTemplateRef<any>("myInput")
const model = defineModel({ default: true })
</script>

<template>
    <div>
        <label :class="{ 'mobile-mode': props.isMobile }" class="ios-switch action" data-name="menu">
            <div class="ios-switch__title">{{ title }}</div>
            <input type="checkbox" name="checkbox" v-model="model" ref="myInput">
            <i :class="{ 'mobile-mode': props.isMobile }">
                <Icon  :class="{ 'icon--dark': model }" class="icon" 
                    :name="model ? 'line-md:sun-rising-loop' : 'line-md:sunny-outline-to-moon-alt-loop-transition'"
                    size="15" />
            </i>
        </label>
    </div>
</template>

<style lang="scss" scoped>
/*
Adapted by me to Vue & Credit to the CSS creator @s
https://dev.to/urielbitton/how-to-design-an-ios-style-switch-4maj

+ This gets a little tricky because in mobile when nav is expanded (isMobile), we set the opposite color of current colorMode, so we need to invert the color of the icon
+ I've incorporated a nice SVG animation to the icon, so it's not just a static icon (micro stuff)
*/
.icon {
    z-index: 999;
    position: relative;
    left: 2px;
}

.icon--dark {
    left: 22px;
}

.ios-switch {
    position: sticky;
    display: inline-block;
    cursor: pointer;
    z-index: 99;



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
        background-color: $secondary;
        border-radius: 23px;
        vertical-align: middle;
        transition: all 0.3s;

        &.mobile-mode {
            background-color: $primary;
        }
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
        transform: translate3d(2px, 1px, 0);
    }

    i.mobile-mode::after {
        background-color: $primary;
    }

    :active i::after {
        width: 28px;
        transform: translate3d(1px, 1px, 0);
    }

    :active input:checked+i::after {
        transform: translate3d(16px, 1px, 0);

        .mobile-mode & {
            background-color: $primary;
        }
    }

    input:checked+i {
        background-color: $secondary;
    }

    input:checked+i.mobile-mode {
        background-color: $primary;
    }

    input:checked+i::before {
        transform: translate3d(18px, 1px, 0) scale3d(0, 0, 0);
    }

    input:checked+i::after {
        transform: translate3d(22px, 1px, 0);
    }
}
</style>