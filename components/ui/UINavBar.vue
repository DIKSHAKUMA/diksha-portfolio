<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue'
import LogoSVGLight from '@/assets/svg/logo-light.svg'
import LogoSVGDark from '@/assets/svg/logo-dark.svg'



const colorSwitch = useTemplateRef('colorSwitch')
const navlist = useTemplateRef('navlist')
const isDown = ref(false)
const isMobileActive = ref(false)
const isLightMode = ref<boolean>(false)

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
        $gsap.fromTo(".nav__item", { opacity: 0, x: -40 }, { duration: .3, opacity: 1, x: 0, stagger: .2, ease: "power3.out", delay: .5 })
    } else {
        $gsap.to(".nav__item", { duration: .2, opacity: 0 })
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
    if (colorMode.preference === 'light') navlist.value!.style.color = '#fffcf2';
    window.addEventListener('scroll', onScroll)
    window.addEventListener('resize', checkScreenWidth)

    // In this case, the value is just a trigger, the comparison is for what color mode we are in: it can be cached
    watch(() => isLightMode.value, (newValue, oldValue) => {
        (newValue == true) ? colorMode.preference = 'light' : colorMode.preference = 'dark';
    }, { immediate: true })

})

onBeforeUnmount(() => {
    window.removeEventListener('resize', checkScreenWidth)
    window.removeEventListener('scroll', onScroll)
})
checkScreenWidth()
</script>

<template>

    <div class="nav-wrapper" :class="{ 'nav-wrapper--moveup': isDown }">
        <div class="nav-wrapper__inner">

            <UINavHeader class="header-wrapper">
                <template #logo>
                    <ClientOnly>
                        <div v-if="colorMode.preference == 'dark'">
                            <LogoSVGLight class="logo" />
                        </div>
                        <div v-if="colorMode.preference == 'light'">
                            <LogoSVGDark class="logo" />
                        </div>
                    </ClientOnly>
                </template>
                <template #mode>
                    <UIAppleSwitch v-model="isLightMode" title1="DARK" title2="LIGHT" ref="colorSwitch" />
                </template>
            </UINavHeader>

            <div class="nav" :class="[isMobileActive ? 'nav--open' : 'nav--closed']">

                <div class="nav__list" ref="navlist">
                    <NuxtLink to="/" data-name="menu" class="nav__item action" activeClass="nav--link-active"
                        no-prefetch>
                        WORK
                    </NuxtLink>

                    <NuxtLink to="" data-name="menu" class="nav__item action" activeClass="nav--link-active"
                        no-prefetch>
                        LAB
                    </NuxtLink>

                    <NuxtLink to="" data-name="menu" class="nav__item action" activeClass="nav--link-active"
                        no-prefetch>
                        ABOUT
                    </NuxtLink>

                    <NuxtLink to="" data-name="menu" class="nav__item action" activeClass="nav--link-active"
                        no-prefetch>
                        CONTACT
                    </NuxtLink>
                </div>

                <UINavFooter class="footer-wrapper">
                    <template #social>

                    </template>
                    <template #contact>
                        <a data-name="menu" class="action"
                            href="mailto:someone@example.com">hello@thomasjt.com</a><br />
                        <NuxtLink to="https://github.com/thorstensson" target="_blank" data-name="menu" class="action">
                            GitHub
                        </NuxtLink>
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
.action {
    transition: transform 0.1s linear;
}

.logo {
    width: 30px;
    height: auto;

    svg {
        -webkit-backface-visibility: hidden;
        -webkit-transform: translateZ(0) scale(1.0, 1.0);
        transform: translateZ(0);
    }
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
    font-family: $sans-ui;
    color: $secondary;
    background-color: $primary;
    height: 64px;

    &--moveup {
        top: -100px;
    }

    @include this-and-above('lg') {
        background-color: unset;
        backdrop-filter: blur(10px);
    }
}

.nav-wrapper__inner {
    display: flex;
    align-items: center;
    height: 100%;
    font-weight: 500;
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
    height: 100%;
}

.footer-wrapper {
    display: flex;
    flex-flow: column;
    position: absolute;
    bottom: 120px;
    width: 80%;
    height: -moz-fit-content;
    height: fit-content;
    right: 70px;
}

.nav {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100vh;
    transition: all .4s cubic-bezier(.075, .82, .165, 1);

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
        background-color: $accent2;
    }

    &--closed {
        transition-delay: .2s;
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

        a {
            margin-bottom: 1rem;
        }
    }

    &__item {
        display: block;
        cursor: pointer;
        font-size: clamped(30px, 150px, 480px, 1920px);
        white-space: nowrap;
        line-height: 1.1;
        transition: color .3s;
        padding-right: 0px;
        color: $secondary;
        // for the magnet links for some reason need be here too

        &:hover {
            color: var(--accent1);
        }
    }

    &--link-active::before {
        color: $secondary;
        content: "•";
        margin-left: -15px;
        font-size: 19px;
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

            a {
                margin-bottom: 0rem;
            }
        }

        &__item {
            display: inline-block;
            margin: 0;
            /*position: relative;*/
            font-size: $fs-18;
            line-height: unset;
            padding-right: 25px;
            color: $secondary;
            opacity: 1 !important;
             transition: transform 0.1s linear;

            &:last-child {
                padding-right: 0;
            }
        }

        &--link-active::before {
            margin-left: -11px;
            font-size: 12px;
            vertical-align: text-bottom;
            position: relative;
            right: -3px;
            top: 1px;
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
        background-color: $secondary;
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