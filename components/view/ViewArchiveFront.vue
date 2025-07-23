<script setup lang="ts">
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const { $gsap } = useNuxtApp()
let ctx: gsap.Context

onMounted(() => {

    $gsap.registerPlugin(ScrollTrigger)
    ctx = $gsap.context((self) => {
    })

    onUnmounted(() => {
        ctx.revert()
    })
})
</script>

<template>
    <div class="archive-wrapper">
        <footer class="archive">
            <div class="archive__label">
                <NuxtLink to="/">Archive</NuxtLink>
            </div>
        </footer>
        <CommonInfoLabel class="archive__ilabel" :label="'©2025 T.Thorstensson. All rights reserved.'"
            :className="'photo-label'" :style="{ justifyContent: 'center', alignItems: 'flex-end' }" />
    </div>
</template>

<style lang="scss" scoped>
.archive {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    height: 100vh;

    &__label {
        text-transform: uppercase;
        font-size: clamped(50px, 90px, 480px, 1920px);
        position: relative;
        display: inline-block;
        z-index: 200;

        a {
            color: $secondary;
            text-decoration: underline;
            text-underline-offset: 10px;
            text-underline-position: from-font;
            text-decoration-color: $secondary;
            position: relative;
            background: linear-gradient(to right, $accent1, $accent1) $secondary no-repeat left center;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            background-size: 0% 100%;
            transition: background-size 0.4s cubic-bezier(0.65, 0, 0.35, 1);

            &:hover {
                background-size: 100% 100%;
            }
        }
    }

    &__ilabel :deep(.info-label-header) {
        text-transform: none;
        font-weight: 400;
        font-size: .8rem;
        letter-spacing: .5px
    }
}

/* same margins as project-wrapper in [id].vue */
.archive-wrapper {
    position: relative;
    padding: 0 $px-16-spacer;
    overflow: hidden;
    height: 100vh;

    --dot-size: 2px;
    --dot-space: 22px;
    background:
        linear-gradient(90deg, $primary calc(var(--dot-space) - var(--dot-size)), transparent 98%) center / var(--dot-space) var(--dot-space),
        linear-gradient($primary calc(var(--dot-space) - var(--dot-size)), transparent 98%) center / var(--dot-space) var(--dot-space),
        $secondary;
}
</style>