<script setup lang="ts">
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import { useFolioStore } from '~/store/useFolioStore'

/* PINIA 🍍 */
const store = useFolioStore()
const { $lenis } = useNuxtApp()
const { $gsap } = useNuxtApp()

const projectsReel = useTemplateRef<HTMLDivElement>('projectsReel')
const projectItem = ref<HTMLDivElement[]>([])
const clampedIndex = ref<number>(0)
const isDragging = ref(false) /* Track dragging state including inertia */

let ctx: gsap.Context
let draggableInstance: Draggable[] | null = null

const centeredProject = computed(() => {
    return store.data?.projects[clampedIndex.value]
})

const progressIndex = computed(() => {
    const totalProjects = store.data?.projects.length || 1
    return { current: clampedIndex.value + 1, total: totalProjects }
})


/* Function to setup/update Draggable configuration */
const setupDraggable = () => {
    const numProjects = (store.data?.projects.length || 0)

    if (!projectsReel.value || numProjects === 0 || projectItem.value.length === 0) {
        return
    }

    /* Destroy existing draggable instance */
    if (draggableInstance) {
        draggableInstance[0].kill()
        draggableInstance = null
    }

    /* Calculate total width of all projects + gaps */
    const projectWidth = projectItem.value[1].getBoundingClientRect().width || 0
    const gapWidth = parseFloat(getComputedStyle(projectsReel.value).getPropertyValue('column-gap')) || 0
    const paddingLeft = parseFloat(getComputedStyle(projectsReel.value).getPropertyValue('padding-left')) || 0
    const totalContentWidth = (projectWidth * numProjects) + (gapWidth * (numProjects - 1)) + paddingLeft
    const viewportWidth = window.innerWidth

    /* Calculate initial offset to center first project */
    /* Account for the padding-left on the reel which equals the gap width */
    const initialOffset = (viewportWidth - projectWidth) / 2 - gapWidth

    /* Set initial position to center the first project */
    $gsap.set(projectsReel.value, { x: initialOffset })

    /* Calculate how far we can drag (negative because we drag left) */
    /* Add extra padding to ensure last project can be fully centered */
    const maxDragDistance = totalContentWidth - viewportWidth + initialOffset + paddingLeft

    $gsap.context(self => {

        draggableInstance = Draggable.create(".projects__reel", {
            cursor: "grab",
            type: "x", /* Horizontal dragging */
            bounds: {
                minX: -maxDragDistance,
                maxX: initialOffset /* Start from centered position, not 0 */
            },
            inertia: true,

            minDuration: 0.1,
            maxDuration: 1,

            edgeResistance: .5, /* Smooth resistance at bounds */
            allowEventDefault: false, /* Prevent default touch behaviors */

            onDrag: function () {
                isDragging.value = true
                /* Calculate velocity and direction for skew effect */
                const velocity = InertiaPlugin.getVelocity(this.target, "x")
                const skewAmount = Math.max(-40, Math.min(40, velocity * 0.01))

                /* Visual filter effects based on velocity (no positioning changes) */
                /* const blurAmount = Math.min(Math.abs(velocity * 0.002), 3) */ /* Subtle blur up to 3px */

                /* Apply skew for positioning and filters for visual effect */
                $gsap.set(".projects__project__image", {
                    skewX: skewAmount,
                    /* filter: `blur(${blurAmount}px)`, */
                    duration: 0.4,
                    ease: "power2.out"
                })
            },

            onDragEnd: function () {
                /* Reset skew and filters when drag ends */
                $gsap.to(".projects__project__image", {
                    skewX: 0,
                    /* filter: "blur(0px)", */
                    duration: 0.3,
                    ease: "power2.out"
                })
            },

            snap: {
                x: (endValue) => {
                    /* Calculate snap points using fresh measurements to match onThrowComplete */
                    const unscaledIndex = clampedIndex.value === 0 ? 1 : 0
                    const currentProjectWidth = projectItem.value[unscaledIndex]?.getBoundingClientRect().width || projectItem.value[0].getBoundingClientRect().width || 0
                    const currentGapWidth = projectsReel.value ? parseFloat(getComputedStyle(projectsReel.value).getPropertyValue('column-gap')) || 0 : 0
                    const snapDistance = currentProjectWidth + currentGapWidth
                    const snapIndex = Math.round((initialOffset - endValue) / snapDistance)
                    return initialOffset - (snapIndex * snapDistance)
                }
            },
            onThrowComplete: function () {
                isDragging.value = false /* Reset only when inertia completes */
                /* Calculate which project is in the center when inertia stops */
                const currentX = this.x

                /* Recalculate projectWidth fresh to get current actual width */
                /* Use a project that's NOT the centered one to get unscaled width */
                const unscaledIndex = clampedIndex.value === 0 ? 1 : 0
                const currentProjectWidth = projectItem.value[unscaledIndex]?.getBoundingClientRect().width || projectItem.value[0].getBoundingClientRect().width || 0
                const currentGapWidth = projectsReel.value ? parseFloat(getComputedStyle(projectsReel.value).getPropertyValue('column-gap')) || 0 : 0
                const snapDistance = currentProjectWidth + currentGapWidth

                /* Distance travelled / snap distance (proj width + gap) = index */
                const centerIndex = Math.round((initialOffset - currentX) / snapDistance)

                /* Ensure index is within bounds */
                clampedIndex.value = Math.max(0, Math.min(centerIndex, numProjects - 1))
            },

        })
    })
}

/* Debounced resize handler */
let resizeTimeout: NodeJS.Timeout
const handleResize = () => {
    clearTimeout(resizeTimeout)
    resizeTimeout = setTimeout(() => {
        setupDraggable()
    }, 150) /* 150ms debounce */
}

onMounted(async () => {
    $lenis.scrollTo(0, { force: true })

    ctx = $gsap.context((self) => {
        $gsap.registerPlugin(ScrollTrigger)
        $gsap.registerPlugin(Draggable, InertiaPlugin)
    })

    /* Wait a bit for DOM to be fully ready */

    /* Simple fade-in animation for projects and progress */
    const tl = $gsap.timeline()
    tl.from(".projects__reel, .progress", { duration: .8, opacity: 0, ease: "power2.inOut" })

    /* Initial setup */
    setupDraggable()

    /* Add resize listener */
    window.addEventListener('resize', handleResize)

})

onUnmounted(() => {
    /* Cleanup resize listener */
    window.removeEventListener('resize', handleResize)

    /* Cleanup draggable instance */
    if (draggableInstance) {
        draggableInstance[0].kill()
        draggableInstance = null
    }

    /* Clear any pending resize timeout */
    if (resizeTimeout) {
        clearTimeout(resizeTimeout)
    }

    ctx?.revert()
})
</script>

<template>
    <main ref="main" class="projects-wrapper">
        <!--:className here is for gsap-->
        <div class="abstract--center">
            <CommonAbstract :label="'Projects'" :delay="1" :desc="'Drag & click to open.'" :className="'abstract__works'"
                :is-hero="true" />
        </div>

        <div class="progress">
            <div class="progress__text">{{ progressIndex.current }} / {{ progressIndex.total }}</div>
        </div>

        <div class="projects">
            <div class="projects__reel" ref="projectsReel">
                <div v-for="(project, index) in store.data.projects" :key="project.id">
                    <div class="projects__project action" data-name="reel" ref="projectItem"
                        :class="{ 'projects__project--open': index === clampedIndex && !isDragging }">
                        <NuxtLink :to="`/project/${project.slug}`">
                            <NuxtImg :src="project.image[0].handle" provider="hygraph" alt="Project image" format="webp"
                                sizes="sm:100vw" densities="x1 x2" class="projects__project__image"></NuxtImg>
                        </NuxtLink>
                        <div class="projects__project-name"
                            :class="{ 'projects__project-name--open': index === clampedIndex }">
                            <p>{{ project.name }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<style lang="scss" scoped>
img {
    width: 100%;
    height: auto;
}

a:hover {
    filter: blur(0px);
    cursor:grab;
}

.projects-wrapper {
    position: relative;
    width: 100vw;
    height: 100vh;
    padding: 0 $px-16-spacer;
    overflow-x: hidden;

    @include this-and-above('lg') {
        padding: 0 $px-64-spacer;
    }
}

.abstract--center {
    position: absolute;
    display: block;
    bottom: 0%;
    will-change: transform;
    width: 50%;
}

.progress {
    position: absolute;
    margin: $px-16-spacer $px-16-spacer;
    right: 0;
    bottom: 0;

    &__text {
        font-size: clamped(44px, 84px, 480px, 1920px);
        font-variation-settings: "wght" 550;
        white-space: nowrap;
        color: $secondary;
        font-variant-numeric: tabular-nums; /* Monospace numbers for consistent width */
    }
}

.projects {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    color: $secondary;

    &__project-name {
        position: absolute;
        bottom: $px-16-spacer;
        left: $px-16-spacer;
        background: rgba(0, 0, 0, 0.7);
        padding: $px-8-spacer $px-16-spacer;
        border-radius: 4px;
        pointer-events: none; /* Don't interfere with dragging */
        opacity: 0;
        will-change: opacity;
        transition: opacity .2s ease-in-out;
        backface-visibility: hidden;

        &--open {
            opacity: 1;
            transform: scale(1.1);
        }

        p {
            margin: 0;
            color: white;
            font-size: $fs-14;
            font-weight: 500;
        }
    }

    &__reel {
        display: flex;
        flex-flow: row nowrap;
        column-gap: $px-32-spacer; /* Mobile: tight spacing */
        justify-content: flex-start; /* Start from left instead of center */
        align-items: center;
        position: absolute;
        left: 0;
        width: max-content; /* Allow width to expand based on content */
        padding-left: $px-32-spacer; /* Mobile: minimal padding */
        cursor:grab;

        /* Progressive spacing increases */
        @include this-and-above('sm') {
            column-gap: $px-32-spacer;
            padding-left: $px-32-spacer;
        }

        @include this-and-above('lg') {
            column-gap: $px-64-spacer;
            padding-left: $px-64-spacer;
        }
    }

    &__project {
        position: relative; /* For absolute positioning of project name */
        flex-shrink: 0; /* Prevent shrinking to maintain consistent layout */
        transform-origin: center;
        transition: transform 0.3s ease-out; /* Smooth scale transitions */

        &--open {
            transform: scale(1.1);
        }

        img {
            width: 85vw; /* Mobile-first: larger than viewport for immersive feel */
            height: auto;
            object-fit: cover;
            transform-origin: center;

            @include this-and-above('sm') {
                width: 75vw; /* Slightly smaller on small tablets */
            }

            @include this-and-above('md') {
                width: 60vw; /* Medium screens */
            }

            @include this-and-above('lg') {
                width: 50vw; /* Desktop - show more context */
            }

            @include this-and-above('xl') {
                width: 45vw; /* Large desktop - optimal viewing */
            }
        }
    }
}
</style>