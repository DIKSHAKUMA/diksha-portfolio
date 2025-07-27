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
                    start: "top 80%",
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
            <CommonAbstract class="projects__header" :label="store.data.intro?.projIntroTitle"
                :desc="store.data.intro?.projIntroDesc" :className="'projects-intro'" />
            <section class="projects__abstract">
                <div v-for="proj in paginatedProjects" :key="proj.slug">
                    <div class="projects__abstract__image action" data-name="proj" data-text="Explore"
                        data-color="#FFF">
                        <NuxtLink :to="`/projects/${proj.slug}`">
                            <NuxtImg :src="proj.image[0].handle" provider="hygraph" alt="Project image" format="webp"
                                sizes="sm:100vw md:45vw lg:45vw xl:35vw" densities="x1 x2"></NuxtImg>
                        </NuxtLink>
                    </div>
                    <h3 class="projects__abstract__name split-proj-w">{{ proj.name }}</h3>
                </div>
            </section>
        </main>
    </div>
</template>

<style lang="scss" scoped>

img,
.split-proj-w {
    will-change: transform, filter;
}

.projects__abstract__image {
    position: relative;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    transform-style: preserve-3d;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -webkit-transform: translateZ(0);
    -moz-transform: translateZ(0);
    -ms-transform: translateZ(0);
    -o-transform: translateZ(0);
    transform: translateZ(0);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.projects__abstract__image:hover {
    transform: translateY(-2px) translateZ(0);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.projects__abstract__image img {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    transform: scale(1);
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 1;
}

.projects__abstract__image:hover img {
    transform: scale(1.01);
    opacity: 0.92;
}

/* same margins as project-wrapper in [id].vue */
.projects-wrapper {
    padding: $px-64-spacer $px-16-spacer;

    @include this-and-above('sm') {
        padding: $px-128-spacer $px-32-spacer;
    }

    @include this-and-above('md') {
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

    .projects__abstract {
        display: flex;
        flex-direction: column;
        row-gap: $px-64-spacer;
        width: 100%;
        align-self: flex-start;

        &__image {
            overflow: hidden;
            clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
        }

        &__name {
            margin-top: $px-8-spacer;
            color: $secondary;
            text-transform: uppercase;

            @include this-and-above('sm') {
                margin-top: $px-16-spacer;
            }
        }

        &__tags {
            color: $secondary;
        }

        @include this-and-above('md') {
            /* now we give luft to rows */
            row-gap: $px-256-spacer;

            :nth-child(odd) {
                align-self: flex-end;
                margin-bottom: -5px;
            }

            :nth-child(even) {
                align-self: flex-start;
                margin-bottom: -5px;
            }
        }
    }
}
</style>