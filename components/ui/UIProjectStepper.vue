<script setup lang="ts">

const { $gsap } = useNuxtApp()
const { $lenis } = useNuxtApp();

const props = defineProps<{ prevImg: string, nextImg: string, prev: string, next: string, prevName: string, nextName: string }>()
</script>

<template>
    <div class="project-stepper-wrapper">
        <CommonAbstract class="stepper__label" :label="'Explore'" :className="'stepper__intro'" />
        <main class="project-stepper">
            <div class="project-stepper__prev">
                <NuxtLink :to="prev">
                    <NuxtImg :src="prevImg" provider="hygraph" alt="Project image" format="webp"
                        sizes="sm:100vw md:40vw lg:35vw xl:80vw" densities="x1 x2" />
                </NuxtLink>
                <h3 class="projects__abstract__name split-proj-w">{{ prevName }}</h3>
            </div>
            <div class="project-stepper__next">
                <NuxtLink :to="next">
                    <NuxtImg :src="nextImg" provider="hygraph" alt="Project image" format="webp"
                        sizes="sm:100vw md:40vw lg:35vw xl:80vw" densities="x1 x2" />
                </NuxtLink>
                <h3 class="projects__abstract__name split-proj-w ">{{ nextName }}</h3>
            </div>
        </main>
    </div>
</template>

<style scoped lang="scss">
img {
    display: block;
    width: 100%;
    height: auto;
}

.project-stepper-wrapper {

    height: 100vh;
    padding: $px-64-spacer;

    @include this-and-above('sm') {
        padding: $px-128-spacer 0;
    }

    @include this-and-above('md') {
        padding: $px-128-spacer 0;
    }

    @include this-and-above('xl') {
        padding: $px-128-spacer 0;
    }

    @include this-and-above('xxl') {
        padding: $px-128-spacer 0;
    }
}

.project-stepper {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: $px-64-spacer;

    @include this-and-above('md') {
        flex-flow: row;
        column-gap: $px-32-spacer;
    }

    @include this-and-above('lg') {
        column-gap: $px-64-spacer;
    }

    &__prev {
        flex: 1;
    }

    &__next {
        flex: 1;
    }
}
</style>