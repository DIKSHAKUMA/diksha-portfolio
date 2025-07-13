<script setup lang="ts">
import SplitType from 'split-type';
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useFolioStore } from '~/store/useFolioStore'


// PINIA 🍍 
const store = useFolioStore()
const { $gsap } = useNuxtApp()

let ctx: gsap.Context

const paginatedProjects = computed(() => {
    const start = 0
    const end = 5
    return store.data?.projects?.slice(start, end)
})

onMounted(() => {

    ctx = $gsap.context((self) => {

        $gsap.registerPlugin(ScrollTrigger)

        // Clip words Selected Works and reveal with polygon path, best done separate from above
        let sectionsChar = $gsap.utils.toArray('.split-proj-w');
        sectionsChar.forEach((sec: any) => {
            const splitTxt = new SplitType(sec, { types: 'words' })
            $gsap.set(splitTxt.words, { autoAlpha: 0, clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)', })
            $gsap.to(splitTxt.words, {
                autoAlpha: 1,
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                scrollTrigger: {
                    trigger: sec,
                    start: 'top 90%',
                    scrub: false,
                    end: 'top 50%',
                    toggleActions: "restart none none reverse",
                    preventOverlaps: true, // <- HERE
                    //markers: { startColor: "green", endColor: "red", fontSize: "18px", fontWeight: "bold", indent: 20 }
                },
                duration: .4,
            })
        })

        // Reveal the project images 
        let images = $gsap.utils.toArray('.projects__abstract__image');
        images.forEach((img: any) => {
            $gsap.to(img, {
                yPercent: 0,
                opacity: 1,

                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                scrollTrigger: {
                    trigger: img,
                    start: "bottom bottom",
                    scrub: false,
                    end: 'top 70%',
                    toggleActions: "play none none reverse",
                },
                duration: .3
            })
        })
    })
})

onUnmounted(() => {
    ctx.revert()
})
</script>

<template>
    <div class="projects-wrapper">
        <main class="projects">
            <div class="pin-header">
                <CommonAbstract :label="store.data.intro?.projIntroTitle" :desc="store.data.intro?.projIntroDesc"
                    :className="'projects-intro'" />
            </div>
            <section class="projects__abstract">
                <div v-for="proj in paginatedProjects" :key="proj.slug">
                    <div class="projects__abstract__image action" data-name="proj" data-color="#FFF">
                        <NuxtLink :to="`/projects/${proj.slug}`">
                            <NuxtImg :src="proj.image[0].handle" provider="hygraph" alt="Project image" format="webp"
                                sizes="sm:100vw md:40vw lg:35vw xl:30vw" densities="x1 x2"></NuxtImg>
                        </NuxtLink>
                    </div>
                    <div class="projects__abstract__name split-proj-w">{{ proj.name }}</div>
                </div>
            </section>
        </main>
    </div>
</template>

<style lang="scss" scoped>
img,
.split-proj-w {
    will-change: transform;
}

img {
    transition: transform .3s ease-in-out;
}

img:hover {
    transform: scale(1.1);
}

.pin-header {
    transform: initial;
    scroll-snap-align: start;
    z-index: 100;
    margin-bottom: 100px;
}

/* same margins as project-wrapper in [id].vue */
.projects-wrapper {
    background-color: $primary;

    padding: $px-128-spacer $px-16-spacer;

    @include this-and-above('lg') {
        padding: $px-128-spacer $px-64-spacer;
    }

    @include this-and-above('xl') {
        padding: $px-128-spacer $px-128-spacer;
    }

    @include this-and-above('xxl') {
        padding: $px-128-spacer $px-256-spacer;
    }
}

.projects {

    .projects__header {
        scroll-snap-align: start;
        transform: initial;
        display: flex;
        flex-flow: column;
        gap: 20px;
        bottom: 20px;
        margin: 0px 0 30px 0;
        color: $secondary;

        &__title {
            font-size: clamped(32px, 70px, 380px, 1920px);
            font-weight: 500;
            line-height: .8;
        }
    }

    .projects__abstract {
        display: flex;
        flex-direction: column;
        gap: $px-256-spacer;
        width: 100%;
        align-self: flex-start;

        &__image {
            filter: grayscale(50%) sepia(10%) saturate(76%);
            -webkit-filter: grayscale(50%) sepia(10%) saturate(76%);
            -moz-filter: grayscale(50%) sepia(10%) saturate(76%);
            overflow: hidden;
            clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
            border-radius: 12px;
        }

        &__name {
            margin-top: 20px;
            color: $secondary;
            font-size: clamped(15px, 24px, 380px, 1920px);
            text-transform: uppercase;
        }

        &__tags {
            color: $secondary;
        }

        @include this-and-above('md') {
            :nth-child(odd) {
                align-self: flex-end;
                margin-bottom: -5px;
            }

            :nth-child(even) {
                align-self: flex-start;
                margin-bottom: -5px;
            }
        }

        @include this-and-above('md') {
            padding: 0 $px-16-spacer;
        }

        @include this-and-above('lg') {
            padding: 0 $px-32-spacer;
        }

        @include this-and-above('xl') {
            padding: 0 $px-64-spacer;
        }
    }
}
</style>