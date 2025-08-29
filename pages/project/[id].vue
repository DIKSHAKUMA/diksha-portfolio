<script setup lang="ts">
import SplitType from 'split-type';
import { useFolioStore } from '~/store/useFolioStore'
import DoubleArrowSVG from '~/assets/svg/double-arrow.svg'

const store = useFolioStore()
const { $gsap } = useNuxtApp()
const { $lenis } = useNuxtApp();
const route = useRoute();

definePageMeta({
    layout: 'default',
    key: route => route.fullPath,

    /* DO NOT REMOVE THIS! APOLLO STICKER TAPED TO CONSOLE. */
    /* EVEN GLOBAL ROUTE TRANSITIONS NEED A SAKI. GOD DAMN IT I WROTE IT, NOW I'LL NEVER FORGET IT. */
    pageTransition: {
        name: 'saki',
        mode: 'out-in'
    }
})

/* To varaiate middle section a little bit If 6 images, show 2 middle section, if 8 show 4*/
const middleIndex = computed(() => {
    const totalImages = proj.value?.image?.length || 0
    return (totalImages - 3)
})

const proj = computed(() => {
    return store.data.projects.find((proj: any) => proj.slug === route.params.id)
})

console.log("project images length ", proj.value.image?.length)

/* Get next and previous projects and if we hit the first or last project, loop back to the other end */
const getNextProj = computed(() => {
    const index = store.data.projects.findIndex((proj: any) => proj.slug === route.params.id)
    /* If at last project, loop back to first (index 0) */
    const nextIndex = index === store.data.projects.length - 1 ? 0 : index + 1
    return store.data.projects[nextIndex]
})

const getPrevProj = computed(() => {
    const index = store.data.projects.findIndex((proj: any) => proj.slug === route.params.id)
    /* If at first project, loop to last project */
    const prevIndex = index === 0 ? store.data.projects.length - 1 : index - 1
    return store.data.projects[prevIndex]
})

let ctx: gsap.Context

onMounted(() => {

    $lenis.scrollTo(0, { immediate: true, force: true })

    ctx = $gsap.context((self) => {

        /* Vertical blind reveal effect for images */
        $gsap.utils.toArray('.project-image-reveal').forEach((imageContainer: any) => {
            /* Set initial state - completely masked */
            $gsap.set(imageContainer, {
                '--position': '0%',
                filter: 'blur(20px)',
                force3D: true
            })

            /* Check if this is the first image (data-image="0") */
            const isFirstImage = imageContainer.getAttribute('data-image')?.trim() === '0'
            const delay = isFirstImage ? 1 : 0

            /* Animate the mask position on scroll */
            $gsap.to(imageContainer, {
                '--position': '100%',
                filter: 'blur(0px)',
                duration: .8,
                delay: delay,
                ease: 'power2.out',
                force3D: true,
                scrollTrigger: {
                    trigger: imageContainer,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                    fastScrollEnd: true
                }
            })
        })

        /* Animate project sections */
        let infoSection = document.querySelector('.project__info');
        let textSection = document.querySelector('.project__text');

        if (infoSection) {
            $gsap.from(infoSection.children, {
                y: 30,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: infoSection,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            })
        }

        if (textSection) {
            $gsap.from(textSection.children, {
                y: 30,
                opacity: 0,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: textSection,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            })
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
        <div class="project-wrapper" v-if="proj">
            <main class="project">
                <CommonAbstract :label="proj.name" :desc="proj.synop?.[0] || proj.client || ''" :isFullWidth="true"
                    :className="'project__abstract'" :delay="1">
                </CommonAbstract>

                <section class="project__content">
                    <div class="project__image project-image-reveal project__image--first" data-image="0">
                        <NuxtImg :src="proj.image[0].handle" provider="hygraph" alt="Project image" format="webp"
                            sizes="sm:100vw md:40vw lg:35vw xl:80vw" densities="x1 x2" />
                    </div>

                    <div class="project__info">
                        <div class="project__info-col-1">
                            <h5>Challenge</h5>
                            <p class="split-proj-w">{{ proj.description[0] }}</p>
                            <h5>Perspective</h5>
                            <p class="split-proj-w">{{ proj.description[1] }}</p>
                        </div>
                        <div class="project__info-col-2">
                            <div class="project__info-col-2__a">
                                <h5 class="split-proj-w">Client</h5>
                                <p class="split-proj-w">{{ proj.client }}</p>
                                <div v-if="proj.endclient">
                                    <h5 class="split-proj-w">End Client</h5>
                                    <p class="split-proj-w">{{ proj.endclient }}</p>
                                </div>
                                <h5 class="split-proj-w">Date</h5>
                                <p class="split-proj-w">{{ proj.date }}</p>
                                <h5 class="split-proj-w">Duration</h5>
                                <p class="split-proj-w">{{ proj.duration }}</p>
                                <h5 class="split-proj-w">Type</h5>
                                <p class="split-proj-w">{{ proj.type }}</p>
                            </div>
                            <div class="project__info-col-2__b">
                                <h5 class="split-proj-w">Scope</h5>
                                <p class="split-proj-w" v-for="tag in proj.tags" :key="proj.id">{{ tag }}</p>
                                <h5 class="split-proj-w">Demo</h5>
                                <p class="split-proj-w project__info-col-2__b--link"><a :href="proj.demo"
                                        target="_blank">{{ proj.demo
                                        }}</a></p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <template v-for="(image, index) in proj.image" :key="image.id">
                            <div class="project__image project-image-reveal"
                                v-if="(index as number) > 0 && (index as number) < middleIndex">
                                <NuxtImg :src="image.handle" provider="hygraph" alt="Project image" format="webp"
                                    sizes="sm:100vw md:40vw lg:35vw xl:80vw" densities="x1 x2" />
                            </div>
                        </template>
                    </div>

                    <!-- Another image description -->
                    <div class="project__text">
                        <div class="split-proj-w">{{ proj.description[2] }}</div>
                    </div>

                    <div class="project__image project-image-reveal">
                        <NuxtImg :src="proj.image[middleIndex].handle" provider="hygraph" alt="Project image"
                            format="webp" sizes="sm:100vw md:40vw lg:35vw xl:80vw" densities="x1 x2" />
                    </div>

                    <div class="project__flex-wrapper">
                        <div class="project__img-col-1">
                            <div class="project__image project-image-reveal">
                                <NuxtImg :src="proj.image[middleIndex + 1].handle" provider="hygraph"
                                    alt="Project image" format="webp" sizes="sm:100vw md:40vw lg:35vw xl:80vw"
                                    densities="x1 x2" />
                            </div>
                        </div>

                        <div class="project__img-col-2">
                            <div class="project__image project-image-reveal">
                                <NuxtImg :src="proj.image[middleIndex + 2].handle" provider="hygraph"
                                    alt="Project image" format="webp" sizes="sm:100vw md:40vw lg:35vw xl:80vw"
                                    densities="x1 x2" />
                            </div>
                        </div>
                    </div>

                    <div v-if="proj.testimonialName">
                        <CommonTestimonial :name="proj.testimonialName" :agency="proj.testimonialAgency"
                            :text="proj.testimonialText" />
                    </div>

                </section>
                <CommonLine class="project__line" :pos="'relative'" />
                <nav class="project__nav" v-if="getPrevProj && getNextProj">
                    <UIProjectStepper :prevImg="getPrevProj.image[0].handle" :nextImg="getNextProj.image[0].handle"
                        :prevName="getPrevProj.name" :nextName="getNextProj.name" :prev="getPrevProj.slug"
                        :next="getNextProj.slug" :prevSynop="getPrevProj.synop" :nextSynop="getNextProj.synop" />
                </nav>
            </main>
        </div>
    </div>
</template>

<style lang="scss" scoped>
img {
    display: block;
    width: 100%;
    height: auto;
}

/* To harminoze with h1 tag in MDC for blog posts */

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
        padding: 0 $px-64-spacer;
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
    position: relative;
    overflow: hidden;
    --position: 0%;
}

.project-image-reveal::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg,
            transparent var(--position),
            $primary calc(var(--position) + 1%),
            $primary calc(var(--position) + 2%),
            transparent calc(var(--position) + 3%));
    z-index: 2;
    pointer-events: none;
}

.project-image-reveal img {
    transition: filter 0.5s ease;
}

.project {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-self: flex-start;
    margin-top: 128px;

    &__line {
        margin-top: $px-64-spacer;
    }

    &__header {
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding-top: 20px;
        color: $secondary;
    }

    &__content {
        display: flex;
        flex-direction: column;
    }

    &__image {
        margin: $px-64-spacer 0;
        overflow: hidden;
        border-radius: 12px;

        &--first {
            margin-top: $px-16-spacer;
        }

        @include this-and-above('md') {
            margin: $px-128-spacer 0;

            &--first {
                margin-top: $px-32-spacer;
            }
        }

    }

    &__info {
        display: flex;
        flex-direction: column;
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

    &__text {
        display: flex;
        flex-direction: column;
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
            margin: 0 $px-256-spacer;
        }
    }

    &__info-col-1 {
        flex: 1 1 70%;
    }

    &__info-col-2 {
        display: flex;
        line-height: 1.2;
        background-color: $primary;
        border: 2px solid $accent2;
        border-radius: 12px;
        padding: $px-32-spacer;
        max-height: fit-content;
        overflow-y: auto;

        &__a,
        &__b {
            flex: 1 0 50%;
            word-break: break-all;
            height: fit-content;
        }

        &__b {
            &--link {
                font-size: clamped(14px, 16px, 380px, 1920px);
                font-weight: 500;
                text-decoration: underline;
            }
        }
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

}

@keyframes arrowFloat {

    0%,
    100% {
        transform: translateX(0px);
    }

    50% {
        transform: translateX(8px);
    }
}
</style>