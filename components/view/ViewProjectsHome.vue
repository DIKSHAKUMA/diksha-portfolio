<script setup lang="ts">
import SplitType from 'split-type';
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useFolioStore } from '~/store/useFolioStore'

/* PINIA 🍍 */
const store = useFolioStore()
const { $gsap } = useNuxtApp()

let ctx: gsap.Context
const splitInstances: SplitType[] = []

const dateSorted = computed(() => {
    if (!store.data?.projects) return []

    return [...store.data.projects].sort((a, b) => {
        // Convert "Month YYYY" format to proper Date objects
        const parseDate = (dateStr: string) => {
            const [month, year] = dateStr.split(' ')
            // Create date with month name and year
            return new Date(`${month} 1, ${year}`)
        }
        
        // Sort by date descending (newest first)
        return parseDate(b.date).getTime() - parseDate(a.date).getTime()
    })
})


const paginatedProjects = computed(() => {
    const start = 0
    const end = 5
    return dateSorted.value.slice(start, end)
})

const handleProjectClick = (project: any) => {
    if (project.labUrl) {
        window.open(project.labUrl, '_blank')
    } else {
        navigateTo(`/project/${project.slug}`)
    }
}

onMounted(() => {

    ctx = $gsap.context((self) => {
        $gsap.registerPlugin(ScrollTrigger)

        /* Batch DOM queries for better performance */
        const sectionsChar = $gsap.utils.toArray('.split-proj-w')
        const images = $gsap.utils.toArray('.projects__abstract__image')

        /* Optimize text reveal animation */
        sectionsChar.forEach((sec: any) => {
            const splitTxt = new SplitType(sec, { types: 'words' })
            splitInstances.push(splitTxt)
            $gsap.set(splitTxt.words, {
                autoAlpha: 0,
                clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)'
            })

            $gsap.to(splitTxt.words, {
                autoAlpha: 1,
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                duration: 0.25, /* Faster duration */
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sec,
                    start: 'top 85%', /* Trigger slightly later */
                    end: 'top 60%',
                    toggleActions: "play none none reverse",
                    preventOverlaps: true,
                    fastScrollEnd: true,
                    anticipatePin: 1
                }
            })
        })

        /* Optimize image reveal animation */
        images.forEach((img: any) => {
            $gsap.to(img, {
                yPercent: 0,
                opacity: 1,
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                duration: 0.5, /* Faster duration */
                ease: "power1.out",
                scrollTrigger: {
                    trigger: img,
                    start: "top 85%", /* Consistent with text */
                    end: 'top 60%',
                    /* onEnter, onLeave, onEnterBack, and onLeaveBack, */
                    toggleActions: "play none none reverse",
                    preventOverlaps: true,
                    fastScrollEnd: true,
                    anticipatePin: 1
                }
            })
        })
    })
})

onUnmounted(() => {
    /* Clean up GSAP context */
    ctx?.revert()

    /* Clean up SplitType instances */
    splitInstances.forEach(instance => {
        instance.revert()
    })

    /* Clear the array */
    splitInstances.length = 0
})
</script>

<template>
    <div class="projects-wrapper">
        <main class="projects">
            <CommonAbstract class="projects__header" :label="store.data.intro?.projIntroTitle" :desc="''"
                :className="'projects-intro'" :is-secondary="true" />
            <section class="projects__abstract">
                <div v-for="proj in dateSorted" :key="proj.slug">
                    <div class="projects__abstract__image action" data-name="proj" data-text="Explore"
                        data-color="#FFF">
                        <NuxtLink @click="handleProjectClick(proj)">
                            <NuxtImg :src="proj.image[0].handle" provider="hygraph" alt="Project image" format="webp"
                                sizes="sm:100vw md:45vw lg:45vw xl:35vw" densities="x1 x2"></NuxtImg>
                        </NuxtLink>
                        <div class="projects__abstract__name">
                            <p class="split-proj-w">{{ proj.name }}</p>
                            <span v-if="proj.labUrl" class="projects__lab-indicator" title="Lab Project">🧪</span>
                        </div>
                    </div>
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
            position: relative;
            overflow: hidden;
            transition: transform 0.25s ease-out;
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
            transform: translateZ(0);
            cursor: pointer;
            clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
            border-radius: 12px;
        }

        &__image:hover {
            transform: scale(0.98) translateZ(0);
        }

        &__image img {
            transition: scale 0.25s ease-out, transform 0.25s ease-out;
            transform: scale(1);
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        &__image:hover img {
            transform: scale(0.99);
        }

        &__name {
            position: absolute;
            height: 30px;
            bottom: $px-16-spacer;
            left: $px-16-spacer;
            background: rgba(0, 0, 0, 0.7);
            padding: $px-8-spacer $px-16-spacer;
            border-radius: 4px;
            pointer-events: none;
            /* Don't interfere with link clicks */

            p {
                position: relative;
                margin: 0;
                color: white;
                font-size: $fs-14;
                font-weight: 500;
                top: 50%;
                transform: translateY(-50%);
            }
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

    &__lab-indicator {
        position: absolute;
        top: -12px;
        right: -12px;
        font-size: 16px;
        background: rgba(0, 0, 0, 0.8);
        border-radius: 50%;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(4px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        
        @include this-and-above('md') {
            font-size: 18px;
            width: 28px;
            height: 28px;
            top: -14px;
            right: -14px;
        }
    }
}
</style>