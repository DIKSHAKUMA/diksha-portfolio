<script setup lang="ts">
const archiveWrapper = ref<HTMLElement>()

const props = defineProps({
    label: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    target: {
        type: String,
        default: '_self'
    }
})

onMounted(() => {

})

onUnmounted(() => {
})
</script>

<template>
    <div class="archive-wrapper" ref="archiveWrapper">
        <footer class="archive">
            <div class="archive__label action magnet" data-name="menu">
                <NuxtLink :to="props.link" :target="props.target">{{ props.label }}</NuxtLink>
            </div>
        </footer>
        <CommonInfoLabel class="archive__ilabel" :label="'CC-BY. 2025. MADE BY THOMAS'" :className="'photo-label'"
            :style="{ justifyContent: 'flex-end', alignItems: 'flex-end' }" />
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
        font-size: clamped(36px, 52px, 480px, 1920px);
        position: relative;
        display: inline-block;
        z-index: 200;

        a {
            color: $secondary;
            position: relative;
            background: linear-gradient(to right, $accent2, $accent2) $secondary no-repeat left center;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            background-size: 0% 100%;
            text-decoration: underline;
            text-underline-offset: 15px;
            text-decoration-thickness: 2px;
            text-decoration-color: $secondary;
            transition: background-size 0.2s cubic-bezier(.17, .67, .83, .67), text-decoration-color 0.2s cubic-bezier(.17, .67, .83, .67);

            &:hover {
                background-size: 100% 100%;
                text-decoration-color: $accent2;
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
    --dot-space: 50px;
    /* dont ask me how linear backgrounds function, but google provides, it is complex*/
    background:
        linear-gradient(90deg, $primary calc(var(--dot-space) - var(--dot-size)), transparent 98%) center / var(--dot-space) var(--dot-space),
        linear-gradient($primary calc(var(--dot-space) - var(--dot-size)), transparent 98%) center / var(--dot-space) var(--dot-space),
        $secondary;

    @include this-and-above('sm') {
        --dot-space: 128px;
    }
}
</style>