<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue';
import ElectroSVG from '@/assets/svg/electrohead.svg'

const isDown = ref(false);
const isMobileActive = ref(false);

let screenWidth: any
let currScrollPos: number
let prevScrollPos: number

const { $gsap } = useNuxtApp()

if (import.meta.client) {
    screenWidth = ref(window.innerWidth)
}

/**
 * A minimal & responsive navbar for those who like BEM with &.
 * Turns full modal on smaller devices. Hides on scroll down.
 */
const toggleMenu = () => {
    isMobileActive.value = !isMobileActive.value;
    if (isMobileActive.value) {
        $gsap.fromTo(".nav__item", { opacity: 0 }, { duration: .5, opacity: 1, stagger: .2, ease: "sine.inOut", delay: .5 })
    }
}

const closeMenu = () => {
    if (screenWidth.value < 992) {
        toggleMenu();
    }
}

const checkScreenWidth = () => {
    if (import.meta.client) {
        screenWidth.value = window.innerWidth;
        if (screenWidth.value > 992) {
            isMobileActive.value = false;
        }
    }
}

const onScroll = () => {
    currScrollPos = window.scrollY;

    if (prevScrollPos && prevScrollPos >= currScrollPos) {
        isDown.value = false;
    } else if (prevScrollPos && prevScrollPos <= currScrollPos) {
        isDown.value = true;
    }
    prevScrollPos = currScrollPos;
}

onMounted(() => {
    onScroll()
    window.addEventListener('scroll', onScroll)
    window.addEventListener('resize', checkScreenWidth);
})

onBeforeUnmount(() => window.removeEventListener('resize', checkScreenWidth));
checkScreenWidth();
</script>

<template>

    <div class="nav-wrapper" :class="{ 'nav-wrapper--moveup': isDown }">
        <div class="nav-wrapper__inner">

            <UINavHeader class="header-wrapper" :class="{ 'header-wrapper--alt-color': isMobileActive }">
                <template #name>

                </template>
                <template #contact>

                </template>
                <template #social>
                    <a target='_blank' href='#'>hello@thomasthorstensson.com</a><br>
                </template>
            </UINavHeader>

            <div class="nav" :class="[isMobileActive ? 'nav--open' : 'nav--closed']">
                <div class="nav__list">
                    <NuxtLink to="/" data-name="menu" class="nav__item action" activeClass="nav--link-active"
                        no-prefetch>
                        Works
                    </NuxtLink>

                    <NuxtLink to="/photography" data-name="menu" class="nav__item action" activeClass="nav--link-active"
                        no-prefetch>
                        Photography
                    </NuxtLink>

                    <NuxtLink to="/blog" data-name="menu" class="nav__item action" activeClass="nav--link-active"
                        no-prefetch>
                        Blog
                    </NuxtLink>

                    <NuxtLink to="/about" data-name="menu" class="nav__item action" activeClass="nav--link-active"
                        no-prefetch>
                        About
                    </NuxtLink>
                </div>

                <UINavFooter class="footer-wrapper">
                    <template #social>
                        <ElectroSVG class="logo action" data-name="yo" />
                    </template>
                    <template #contact>
                        <a href="mailto:someone@example.com">hello@thomasjt.com</a><br />
                    </template>
                </UINavFooter>
            </div>

            <div class="burger action" data-name="menu" @click="toggleMenu" :class="{ 'burger--anim': isMobileActive }">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>

        </div>
    </div>
</template>

<style lang="scss" scoped>
* {
    user-select: none;
}

a,
a:hover,
a:active,
a:visited {
    cursor: pointer;
    color: unset;
    text-decoration: none;
}

.logo {
    width: 50px;
    height: auto;
}

.modal-open {
    height: 100vh;
    overflow-y: hidden;
}

.nav-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    margin: auto;
    width: 100%;
    z-index: 999;
    overflow: hidden;
    transition: top .4s;
    background-color: $primary;

    &--moveup {
        top: -100px;
    }
}

.nav-wrapper__inner {
    display: flex;
    align-items: center;
    height: 100%;
    font-family: $sans-ui;
    font-weight: 600;
    font-size: 16px;
    max-width: 95%;
    margin: auto;
    background-color: $primary;
}

.header-wrapper {
    display: flex;
    align-items: center;
    flex: 1 1 auto;
    height: 80px;
    color: $secondary;
    font-weight: isColorDark($primary);

    &--alt-color {
        color: $secondary;
    }
}

.footer-wrapper {
    position: relative;
    right: 60px;
    top: 798px;
    width: auto;
    text-align: right;

    :deep(.contact),
    :deep(.social) {
        font-weight: isColorDark($primary);
    }
}

.nav {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100vh;
    color: $secondary;
    background-color: $primary;
    transition: left .4s cubic-bezier(.075, .82, .165, 1);

    &--open {
        font-weight: $sans-ui-wgt;
        left: 0%;
        touch-action: none;
        -webkit-overflow-scrolling: none;
        overflow: hidden;
        /* Other browsers */
        overscroll-behavior: none;
    }

    &--closed {
        left: -100%;
    }

    &__list {
        position: absolute;
        top: 200px;
        right: 60px;
        padding: 0;
        list-style: none;
        width: -moz-fit-content;
        width: fit-content;
        text-align: right;
        font-family: "Space Grotesk", "Space Grotesk Fallback: Arial";

        // Bubbles
        @include this-and-above('lg') {
            font-family: $sans-ui;
        }
    }

    &__item {
        display: block;
        cursor: pointer;
        font-size: 60px;
        white-space: nowrap;
        line-height: 1.1;
        transition: color .3s;
        padding: 0 15px;

    }

    &__item:hover,
    &--link-active::before {
        color: $accent2;
        content: '\25CF';
    }

    // Switch to desktop
    @include this-and-above('lg') {
        transition: none;
        position: relative;
        width: initial;
        height: 80px;
        background-color: $primary;
        color: $secondary;
        font-weight: isColorDark($primary);

        &--closed {
            opacity: 1;
            left: unset;
            right: 0;
        }

        &__list {
            margin: 0;
            position: relative;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 0;
            list-style: none;
            width: fit-content;
        }

        &__item::before {
            line-height: unset;
        }

        &__item {
            display: inline-block;
            margin: 0;
            position: relative;
            font-size: 16px;
            line-height: unset;
        }
    }
}

.burger {
    width: 30px;
    height: 30px;
    position: relative;
    transition: .1s;
    margin: 10px 10px;
    cursor: pointer;
    display: inline-block;

    span {
        width: 5px;
        height: 5px;
        background-color: $accent2;
        display: block;
        border-radius: 50%;
        position: absolute;
    }

    &:hover span {
        transform: scale(1.2);
        transition: 350ms cubic-bezier(.8, .5, .2, 1.4);
    }

    span:nth-child(1) {
        left: 0;
        top: 0;
    }

    span:nth-child(2) {
        left: 12px;
        top: 0;
    }

    span:nth-child(3) {
        right: 0;
        top: 0;
    }

    span:nth-child(4) {
        left: 0;
        top: 12px;
    }

    span:nth-child(5) {
        position: absolute;
        left: 12px;
        top: 12px;
    }

    span:nth-child(6) {
        right: 0px;
        top: 12px;
    }

    span:nth-child(7) {
        left: 0px;
        bottom: 0px;
    }

    span:nth-child(8) {
        position: absolute;
        left: 12px;
        bottom: 0px;
    }

    span:nth-child(9) {
        right: 0px;
        bottom: 0px;
    }

    &--anim {
        transform: rotate(180deg);
        cursor: pointer;
        transition: .2s cubic-bezier(.8, .5, .2, 1.4);
    }

    &--anim span {
        border-radius: 50%;
        transition-delay: 200ms;
        transition: .5s cubic-bezier(.8, .5, .2, 1.4);
    }

    &--anim span:nth-child(2) {
        left: 6px;
        top: 6px;
    }

    &--anim span:nth-child(4) {
        left: 6px;
        top: 18px
    }

    &--anim span:nth-child(6) {
        right: 6px;
        top: 6px;
    }

    &--anim span:nth-child(8) {
        left: 18px;
        bottom: 6px;
    }

    // Bubbles
    @include this-and-above('lg') {
        display: none;
    }
}
</style>