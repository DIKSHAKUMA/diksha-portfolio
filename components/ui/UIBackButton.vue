<script setup lang="ts">
import ChevronSVG from "@/assets/svg/chevron-right.svg"

interface Props {
    text?: string
    to?: string
}

const props = withDefaults(defineProps<Props>(), {
    text: 'Back'
})

const router = useRouter()

const handleBack = () => {
    if (props.to) {
        router.push(props.to)
    } else {
        router.back()
    }
}
</script>

<template>
    <button class="back-button" @click="handleBack" :aria-label="`Go ${text.toLowerCase()}`">
        <ChevronSVG class="back-button__icon" />
        <span class="back-button__text">{{ text }}</span>
    </button>
</template>

<style lang="scss" scoped>
.back-button {
    display: inline-flex;
    align-self: flex-end;
    align-items: center;
    width: fit-content;
    padding: $px-8-spacer $px-16-spacer;
    border-radius: 12px;
    cursor: pointer;
    font-family: $sans-ui;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.3s ease;
    position: relative;

    /* Glassmorphism styling */
    background: rgba(250, 247, 255, 0.1);
    backdrop-filter: blur(12px);
    color: $primary;

    /* Hardware acceleration */
    transform: translateZ(0);
    backface-visibility: hidden;
    will-change: transform, background-color, border-color;

    &__text {
        color: $secondary;
    }

    &__icon {
        width: 7px;
        height: auto;
        pointer-events: none;
        margin-left: 5px;
        fill: $secondary;
        transform: rotate(180deg) translateX(6px);
    }

    /* Light mode styling */
    .light-mode & {
        background: rgba(23, 23, 23, 0.08);
        border-color: rgba(23, 23, 23, 0.15);
        color: $secondary;
    }

    /* Hover effects, binding to color mode here folks */
    &:hover {
        transform: translateY(-2px) translateZ(0);
        background: rgba(250, 247, 255, 0.15);
        border-color: rgba(250, 247, 255, 0.3);
        box-shadow: 0 8px 32px rgba(250, 247, 255, 0.1);

        .light-mode & {
            background: rgba(23, 23, 23, 0.12);
            border-color: rgba(23, 23, 23, 0.25);
            box-shadow: 0 8px 32px rgba(23, 23, 23, 0.1);
        }
    }

    &:active {
        transform: translateY(0) translateZ(0);
        background: rgba(250, 247, 255, 0.2);

        .light-mode & {
            background: rgba(23, 23, 23, 0.15);
        }
    }

    /* Some blebb */
    &:focus-visible {
        outline: 2px solid $accent1;
        outline-offset: 2px;
    }
}
</style>
