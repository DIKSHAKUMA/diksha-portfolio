<script setup lang="ts">
import SplitType from 'split-type';
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useFolioStore } from '~/store/useFolioStore'

const store = useFolioStore()
const { $gsap } = useNuxtApp()
const { $lenis } = useNuxtApp();
const route = useRoute();

const image2 = useTemplateRef<any>('image-2')

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

    console.log(proj.value.tags.toString())
    $lenis.scrollTo(0, { immediate: true, force: true })

    ctx = $gsap.context((self) => {

        // For project__image--1, we halt pin .project when .st-wrapper is in center of browser, until ST revealed project__image--2
        $gsap.utils.toArray(".st-wrapper").forEach((sec: any) => {
            $gsap.set(".project__image--2", { autoAlpha: 0, clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' })
            let tl = $gsap.timeline({
                scrollTrigger: {
                    trigger: '.st-wrapper',
                    pin: '.project',
                    pinSpacing: true,
                    start: "clamp(center center)",
                    end: () => {
                        ScrollTrigger.refresh()
                        return "+=" + image2.value.offsetHeight
                    },
                    scrub: true,
                    toggleActions: "play none none reverse",
                }
            });
            // polygon reveal
            tl.fromTo(".project__image--2", { autoAlpha: 0, clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' },
                { autoAlpha: 1, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' })
        })

        // The project title
        let sectionsChar = $gsap.utils.toArray('.split-title-w');
        sectionsChar.forEach((sec: any) => {
            const splitTxt = new SplitType(sec, { types: 'words' })
            $gsap.set(splitTxt.words, { autoAlpha: 0, clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)', })
            $gsap.to(splitTxt.words, { autoAlpha: 1, delay: 1, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' })
        })

        let images = $gsap.utils.toArray('.project__image');
        // The project images
        images.forEach((img: any) => {
            $gsap.set(img, { filter: 'blur(20px)', clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)', })
            $gsap.to(img, {

                filter: 'blur(0px)',
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                scrollTrigger: {
                    pinnedContainer: '.project',
                    trigger: img,
                    start: "top bottom",
                    scrub: false,
                    end: 'top top',
                    pinSpacing: true,
                    toggleActions: "play none none reverse",
                },
                duration: .8
            })
        })

        // Animate project words
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
                stagger: .04,
                duration: .2
            })
        })

    })
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
                <header class="project__header">
                    <div class="project__title split-title-w">Work / {{ proj!.client }}</div>
                    <div class="project__subtitle split-title-w">{{ proj!.name }}</div>
                </header>
                <section class="project__content">
                    <div class="project__image">
                        <NuxtImg :src="proj!.image[0].handle" provider="hygraph" alt="Project image" format="webp"
                            sizes="sm:100vw md:40vw lg:35vw xl:80vw" densities="x1 x2" />
                    </div>
                    <div class="project__text">
                        <div class="project__text-col-1">
                            <div class="project__desc split-proj-w">{{ proj!.description[0] }}</div>
                            <div class="project__desc split-proj-w">{{ proj!.description[1] }}</div>
                        </div>
                        <div class="project__text-col-2">
                            <h4 class="split-proj-w">Client</h4>
                            <div class="project__desc split-proj-w mb-1">{{ proj!.client }}</div>
                            <div v-if="proj!.endclient">
                                <h4 class="split-proj-w">End Client</h4>
                                <div class="project__desc split-proj-w mb-1">{{ proj!.endclient }}</div>
                            </div>
                            <h4 class="split-proj-w">Year</h4>
                            <div class="project__desc split-proj-w mb-1">{{ proj!.date }}</div>
                            <h4 class="split-proj-w">Scope</h4>
                            <div class="project__desc split-proj-w mb-1">{{ proj!.tags.join(', ') }}</div>
                        </div>
                    </div>
                    <div class="st-wrapper">
                        <div class="project__image project__image--1">
                            <NuxtImg :src="proj!.image[1].handle" provider="hygraph" alt="Project image" format="webp"
                                sizes="sm:100vw md:40vw lg:35vw xl:80vw" densities="x1 x2" />
                        </div>
                        <div class="project__image project__image--2" ref="image-2">
                            <NuxtImg :src="proj!.image[2].handle" provider="hygraph" alt="Project image" format="webp"
                                sizes="sm:100vw md:40vw lg:35vw xl:80vw" densities="x1 x2" />
                        </div>
                    </div>

                    <!-- Another image description OR testimonial final description -->
                    <div class="project__text">
                        <div class="project__desc split-proj-w">{{ proj!.description[2] }}</div>
                    </div>

                    <div class="project__image">
                        <NuxtImg :src="proj!.image[3].handle" provider="hygraph" alt="Project image" format="webp"
                            sizes="sm:100vw md:40vw lg:35vw xl:80vw" densities="x1 x2" />
                    </div>

                    <div class="project__flex-wrapper">
                        <div class="project__img-col-1">
                            <div class="project__image">
                                <NuxtImg :src="proj!.image[4].handle" provider="hygraph" alt="Project image"
                                    format="webp" sizes="sm:100vw md:40vw lg:35vw xl:80vw" densities="x1 x2" />
                            </div>
                        </div>

                        <div class="project__img-col-2">
                            <div class="project__image">
                                <NuxtImg :src="proj!.image[5].handle" provider="hygraph" alt="Project image"
                                    format="webp" sizes="sm:100vw md:40vw lg:35vw xl:80vw" densities="x1 x2" />
                            </div>
                        </div>
                    </div>

                </section>
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

.st-wrapper {
    position: relative;
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
.project {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-self: flex-start;
    margin-top: 128px;

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
        border-radius: 12px;
        overflow: hidden;

        &--1 {
            z-index: 10;
        }

        &--2 {
            top: 0;
            position: absolute;
            width: 100%;
            z-index: 5;
        }

        @include this-and-above('md') {
            margin: $px-128-spacer 0;
        }
    }

    &__text {
        display: flex;
        flex-direction: column-reverse;
        color: $secondary;
        font-size: clamped(15px, 24px, 380px, 1920px);
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
        & > *:first-child {
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
            margin: 0;
        }
    }

    &__img-col-2 {
        flex: 1;

        .project__image {
            margin: 0;
        }
    }
}
</style>