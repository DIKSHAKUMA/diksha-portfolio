<script setup lang="ts">
import SplitType from 'split-type';
import { useFolioStore } from '~/store/useFolioStore'

const store = useFolioStore()
const { $gsap } = useNuxtApp()
const { $lenis } = useNuxtApp();
const route = useRoute();

const projectLine = useTemplateRef<any>('projectLine')

definePageMeta({
    layout: 'default',
    key: route => route.fullPath,

    // DO NOT REMOVE THIS! APOLLO STICKER TAPED TO CONSOLE.
    // EVEN GLOBAL ROUTE TRANSITIONS NEED A SAKI
    pageTransition: {
        name: 'saki',
        mode: 'out-in'
    }
})

const proj = computed(() => {
    return store.data.projects.find((proj: any) => proj.slug === route.params.id)
})

const getNextProj = computed(() => {
    const index = store.data.projects.findIndex((proj: any) => proj.slug === route.params.id)
    return store.data.projects[index + 1]
})

const getPrevProj = computed(() => {
    const index = store.data.projects.findIndex((proj: any) => proj.slug === route.params.id)
    return store.data.projects[index - 1]
})

let ctx: gsap.Context

/**
 * There could be a higher level of abstraction where I made the split type and gsap animation into helpers
 * but I'm not sure if it's worth the abstraction it brings. KISS.
 */
onMounted(() => {

    $lenis.scrollTo(0, { immediate: true, force: true })

    ctx = $gsap.context((self) => {

        // Vertical blind reveal effect for images
        $gsap.utils.toArray('.project-image-reveal').forEach((imageContainer: any) => {
            // Set initial state - completely masked
            $gsap.set(imageContainer, {
                '--position': '0%',
                filter: 'blur(50px)',
            })

            // Check if this is the first image (data-image="0")
            const isFirstImage = imageContainer.getAttribute('data-image') === '0'
            const delay = isFirstImage ? 0.5 : 0

            // Animate the mask position on scroll
            $gsap.to(imageContainer, {
                '--position': '100%',
                filter: 'blur(0px)',
                duration: .5,
                delay: delay,
                ease: 'power1.out',
                scrollTrigger: {
                    trigger: imageContainer,
                    start: 'top 85%',
                    end: 'top 35%',
                    toggleActions: 'play none none reverse'
                }
            })
        })

        // Animate project description words
        let sections = $gsap.utils.toArray('.split-proj-w');
        sections.forEach((sec: any) => {
            const splitTxt = new SplitType(sec, { types: 'words' })
            $gsap.set(splitTxt.words, { clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)', })
            $gsap.to(splitTxt.words, {
                yPercent: 0,
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                scrollTrigger: {
                    trigger: sec,
                    start: "top bottom",
                    scrub: false,
                    end: 'top top',
                    toggleActions: "play none none reset",
                },
                transformOrigin: 'top',
                duration: .1
            })
        })

        if (projectLine.value) {
            $gsap.fromTo(
                projectLine.value,
                { width: '0%' },
                {
                    width: '90%',
                    duration: 1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: projectLine.value,
                        start: 'top bottom',
                        toggleActions: 'play none none reverse',
                    },
                }
            )
        }

    }, '.project');
})

onUnmounted(() => {
    ctx.revert()
})
</script>

<template>
    <div>
        <UIMouseCursor />
        <div class="project-wrapper">
            <main class="project">
                <CommonAbstract class="project__abstract" :label="`Work / ${proj!.client}`" :desc="proj!.name"
                    :className="'project__abstract'"></CommonAbstract>

                <section class="project__content">
                    <div class="project__image project-image-reveal" data-image="0">
                        <NuxtImg :src="proj!.image[0].handle" provider="hygraph" alt="Project image" format="webp"
                            sizes="sm:100vw md:40vw lg:35vw xl:80vw" densities="x1 x2" />
                    </div>

                    <div class="project__text">
                        <div class="project__text-col-1">
                            <div class="project__desc split-proj-w">{{ proj!.description[0] }}</div>
                            <div class="project__desc split-proj-w">{{ proj!.description[1] }}</div>
                        </div>
                        <div class="project__text-col-2">
                            <h3 class="split-proj-w">Client</h3>
                            <div class="project__desc split-proj-w mb-1">{{ proj!.client }}</div>
                            <div v-if="proj!.endclient">
                                <h3 class="split-proj-w">End Client</h3>
                                <h4 class="project__desc split-proj-w mb-1">{{ proj!.endclient }}</h4>
                            </div>
                            <h3 class="split-proj-w">Year</h3>
                            <h4 class="project__desc split-proj-w mb-1">{{ proj!.date }}</h4>
                            <h3 class="split-proj-w">Scope</h3>
                            <h4 class="project__desc split-proj-w mb-1">{{ proj!.tags.join(', ') }}</h4>
                        </div>
                    </div>

                    <div>
                        <div class="project__image project__image--1 project-image-reveal" data-image="1">
                            <NuxtImg :src="proj!.image[1].handle" provider="hygraph" alt="Project image" format="webp"
                                sizes="sm:100vw md:40vw lg:35vw xl:80vw" densities="x1 x2" />
                        </div>
                        <div class="project__image project__image--2 project-image-reveal" ref="image-2" data-image="2">
                            <NuxtImg :src="proj!.image[2].handle" provider="hygraph" alt="Project image" format="webp"
                                sizes="sm:100vw md:40vw lg:35vw xl:80vw" densities="x1 x2" />
                        </div>
                    </div>

                    <!-- Another image description -->
                    <div class="project__text">
                        <div class="project__desc split-proj-w">{{ proj!.description[2] }}</div>
                    </div>

                    <div class="project__image project-image-reveal" data-image="3">
                        <NuxtImg :src="proj!.image[3].handle" provider="hygraph" alt="Project image" format="webp"
                            sizes="sm:100vw md:40vw lg:35vw xl:80vw" densities="x1 x2" />
                    </div>

                    <div class="project__flex-wrapper">
                        <div class="project__img-col-1">
                            <div class="project__image project-image-reveal" data-image="4">
                                <NuxtImg :src="proj!.image[4].handle" provider="hygraph" alt="Project image"
                                    format="webp" sizes="sm:100vw md:40vw lg:35vw xl:80vw" densities="x1 x2" />
                            </div>
                        </div>

                        <div class="project__img-col-2">
                            <div class="project__image project-image-reveal" data-image="5">
                                <NuxtImg :src="proj!.image[5].handle" provider="hygraph" alt="Project image"
                                    format="webp" sizes="sm:100vw md:40vw lg:35vw xl:80vw" densities="x1 x2" />
                            </div>
                        </div>
                    </div>

                    <div v-if="proj!.testimonialName">
                        <CommonTestimonial :name="proj!.testimonialName" :agency="proj!.testimonialAgency"
                            :text="proj!.testimonialText" />
                    </div>

                </section>
                <div class="project__line" ref="projectLine"></div>
            </main>
            <nav class="project__nav">
                <NuxtLink v-if="getPrevProj" :to="`/projects/${getPrevProj.slug}`">Previous</NuxtLink>
                <NuxtLink v-if="getNextProj" :to="`/projects/${getNextProj.slug}`">Next</NuxtLink>
            </nav>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.mb-1 {
    margin-bottom: 1rem;
}

img {
    display: block;
    width: 100%;
    height: auto;
}

.project-abstract:deep(.abstract-header) {
    width: 100%;
}

.project-wrapper {
    flex-flow: column;
    display: flex;
    position: relative;
    overflow-x: visible;
    z-index: inherit;

    padding: 0 $px-16-spacer;

    @include this-and-above('md') {
        padding: 0 $px-64-spacer;
    }

    @include this-and-above('lg') {
        padding: 0 $px-128-spacer;
    }

    @include this-and-above('xl') {
        padding: 0 $px-128-spacer;
    }

    @include this-and-above('xxl') {
        padding: 0 $px-256-spacer;
    }
}

/*shortening BEM here by focusing on main project tag as reference*/

/* Vertical blind reveal effect */
.project-image-reveal {
    --position: 0%;
    mask-image: linear-gradient(to right,
            #000 var(--position),
            #0000 0);
    mask-size: 15% 100%;
    mask-repeat: repeat-x;
}

.project {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-self: flex-start;
    margin-top: 128px;

    &__line {
        background-color: $secondary;
        display: block;
        height: 2px;
        left: 50%;
        position: relative;
        transform: translate(-50%, 0);
        width: 0%;
        filter: invert(.9);
    }

    &__header {
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding-top: 20px;
        color: $secondary;
    }

    &__title {
        font-size: clamped(32px, 60px, 380px, 1920px);
        font-weight: 400;
    }

    &__subtitle {
        font-size: clamped(15px, 24px, 380px, 1920px);
        font-weight: 400;
    }

    &__content {
        display: flex;
        flex-direction: column;
    }

    &__image {
        margin: $px-64-spacer 0;
        overflow: hidden;

        @include this-and-above('md') {
            margin: $px-128-spacer 0;
        }
    }

    &__text {
        display: flex;
        flex-direction: column-reverse;
        color: $secondary;
        font-size: clamped(16px, 20px, 380px, 1920px);
        line-height: 1.5;
        gap: 64px;

        /*control how much space the text has on the sides*/
        margin: 0 $px-16-spacer;

        @include this-and-above('sm') {
            flex-direction: row;
            margin: 0 $px-32-spacer;
        }

        @include this-and-above('md') {
            margin: 0 $px-64-spacer;
        }

        @include this-and-above('lg') {
            margin: 0 $px-64-spacer;
        }

        @include this-and-above('xl') {
            margin: 0 $px-128-spacer;
        }
    }

    &__flex-wrapper {
        display: flex;
        flex-direction: row;
        column-gap: $px-16-spacer;

        @include this-and-above('md') {
            column-gap: $px-32-spacer;
        }

        @include this-and-above('lg') {
            column-gap: $px-64-spacer;
        }
    }

    &__text-col-1 {
        flex: 1 1 70%;

        &>*:first-child {
            margin-bottom: 64px;
        }
    }

    &__text-col-2 {
        flex: 1 1 30%;
        line-height: 1.2;

    }

    &__img-col-1 {
        flex: 1;

        .project__image {
            margin-top: 0;
        }
    }

    &__img-col-2 {
        flex: 1;

        .project__image {
            margin-top: 0;
        }
    }
}
</style>