<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue';
import ElectroSVG from '@/assets/svg/electrohead.svg'

const navlist = useTemplateRef('navlist')
const isDown = ref(false);
const isMobileActive = ref(false);

let screenWidth: any
let currScrollPos: number
let prevScrollPos: number

const { $gsap } = useNuxtApp()
const colorMode = useColorMode()

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
        toggleMenu()
    }
}

const checkScreenWidth = () => {
    if (import.meta.client) {
        screenWidth.value = window.innerWidth
        if (screenWidth.value > 992) {
            isMobileActive.value = false
        }
    }
}

const onScroll = () => {
    currScrollPos = window.scrollY

    if (prevScrollPos && prevScrollPos >= currScrollPos) {
        isDown.value = false
    } else if (prevScrollPos && prevScrollPos <= currScrollPos) {
        isDown.value = true
    }

    prevScrollPos = currScrollPos
}

onMounted(() => {
    onScroll()
    // cannot bind with css as colormode is client side, need light colour to reflect in mix blend mode so
    if (colorMode.preference === 'light') navlist.value!.style.color = '#fffcf2'
    window.addEventListener('scroll', onScroll)
    window.addEventListener('resize', checkScreenWidth)
})

onBeforeUnmount(() => window.removeEventListener('resize', checkScreenWidth))
checkScreenWidth()
</script>

<template>

    <div class="nav-wrapper" :class="{ 'nav-wrapper--moveup': isDown }">
        <div class="nav-wrapper__inner">

            <UINavHeader class="header-wrapper">
                <template #icon>
                    <UIColorModeSwitch />
                </template>
                <template #contact>

                </template>
                <template #social>

                </template>
            </UINavHeader>

            <div class="nav" :class="[isMobileActive ? 'nav--open' : 'nav--closed']">

                <div class="nav__list" ref="navlist">
                    <NuxtLink to="/works" data-name="menu" class="nav__item action" activeClass="nav--link-active"
                        no-prefetch>
                        Work
                    </NuxtLink>

                    <NuxtLink to="/photography" data-name="menu" class="nav__item action" activeClass="nav--link-active"
                        no-prefetch>
                        Lab
                    </NuxtLink>

                    <NuxtLink to="/contact" data-name="menu" class="nav__item action" activeClass="nav--link-active"
                        no-prefetch>
                        About
                    </NuxtLink>

                    <NuxtLink to="/about" data-name="menu" class="nav__item action" activeClass="nav--link-active"
                        no-prefetch>
                        Contact
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
    mix-blend-mode: normal;
    color: $secondary;


    &--moveup {
        top: -100px;
    }

    @include this-and-above('lg') {
        mix-blend-mode: difference;
    }
}

.nav-wrapper__inner {
    display: flex;
    align-items: center;
    height: 100%;
    font-family: $sans-ui;
    font-weight: 400;
    font-size: $fs-16;
    margin: 0 $sm-spacer;

    @include this-and-above('sm') {
        margin: 0 $md-spacer;
    }
}

.header-wrapper {
    display: flex;
    align-items: center;
    flex: 1 1 auto;
    height: 80px;
}

.footer-wrapper {
    display: flex;
    flex-flow: column;
    position: relative;
    align-items: flex-end;
    top: 798px;
    width: 80%;
}

.nav {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100vh;
    transition: left .4s cubic-bezier(.075, .82, .165, 1);

    &--open {
        font-weight: 600;
        left: 0%;
        touch-action: none;
        -webkit-overflow-scrolling: none;
        overflow: hidden;
        overscroll-behavior: none;
        display: flex;
        justify-content: flex-end;
        padding-right: 60px;
        background-color: $accent1;
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
        font-size: clamped(30px, 100px, 480px, 1920px);
        white-space: nowrap;
        line-height: 1.1;
        transition: color .3s;
        padding-left: 30px;
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

        &--closed {
            opacity: 1;
            left: unset;
            right: 0;
            background-color: transparent;
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
            font-size: $fs-18;
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