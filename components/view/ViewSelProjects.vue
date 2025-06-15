<script setup lang="ts">
import SplitType from 'split-type';
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useHomeStore } from '~/store/useHomeStore'

// PINIA 🍍 
const store = useHomeStore()
const { $gsap } = useNuxtApp()

let ctx: gsap.Context

onMounted(() => {

    ctx = $gsap.context((self) => {

        $gsap.registerPlugin(ScrollTrigger)

        // Pin for Selected works text
        let worksPinTl = $gsap.timeline({

            scrollTrigger: {
                trigger: '.pin-intro',
                pin: ".pin-intro", // pin the trigger element while active
                pinSpacing: false,
                start: 'top 5%', // when the top of the trigger hits the top of the viewport
                endTrigger: ".projects",
                end: 'bottom center',
                scrub: 1
                //markers: { startColor: "black", endColor: "orange", fontSize: "18px", fontWeight: "bold", indent: 20 }
            }
        })

        // Clip words Selected Works and reveal with polygon path, best done separate from above
        let sectionsChar = $gsap.utils.toArray('.split-intro-w');
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
                    toggleActions: "play none none reverse",
                    preventOverlaps: true, // <- HERE
                    //markers: { startColor: "green", endColor: "red", fontSize: "18px", fontWeight: "bold", indent: 20 }
                },
                duration: .4,
                stagger: .4
            })
        })

        // Animate project words
        let sections = $gsap.utils.toArray('.split-proj-w');
        // The project text below images
        sections.forEach((sec: any) => {
            const splitTxt = new SplitType(sec, { types: 'words' })
            $gsap.from(splitTxt.words, {
                autoAlpha: 0,
   
                scrollTrigger: {
                    trigger: sec,
                    start: 'top 90%',
                    scrub: false,
                    end: 'top 85%',
                    toggleActions: "play none none reverse",
                },
                transformOrigin: 'top',
                stagger: .1,
                duration: .2
            })
        })

        // Reveal the project images 
        let images = $gsap.utils.toArray('.projects__proj');
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
    <div>
        <div class="pin-intro">
            <section class="prj-intro">
                <div class="prj-intro__header split-intro-w">Selected Works</div>
            </section>
        </div>
        <div class="projects">
            <div v-for="proj in store.data?.projects" :key="proj.slug">
                <div class="projects__proj action" data-name="proj" data-color="#FFF">
                    <NuxtLink :to="`/projects/${proj.slug}`">
                        <NuxtImg :src="proj.image[0].handle" provider="hygraph" alt="Project image" format="webp"
                            sizes="sm:100vw md:40vw lg:35vw xl:30vw" densities="x1 x2"></NuxtImg>
                    </NuxtLink>
                </div>
                <div class="projects__name split-proj-w">{{ proj.name }}</div>
                <div class="projects__tags split-proj-w">{{ proj.tags }}</div>
            </div>
        </div>

    </div>
</template>

<style lang="scss" scoped>
.split {
    -webkit-font-kerning: none;
    font-kerning: none;
}

.pin-intro {
    transform: initial;
    scroll-snap-align: start;
    z-index: 100;
    margin-bottom: 100px;
}

.prj-intro {
    scroll-snap-align: start;
    transform: initial;
    display: flex;
    flex-flow: column;
    gap: 20px;
    bottom: 20px;
    margin: 0px 0 30px 0;
    padding-top: 20px;
    font-family: $sans-ui;
    color: $secondary;

    &__header {
        font-size: clamped(46px, 90px, 380px, 1920px);
        font-weight: 500;
        line-height: .8;
    }
}

img {
    will-change: transform;
    transition: transform .4s ease-in-out;
}

img:hover {
    transform: scale(1.1);
}

.projects {
    display: flex;
    flex-direction: column;
    gap: 100px;
    width: 100%;
    align-self: flex-start;

    &__proj {
        filter: grayscale(50%) sepia(10%) saturate(76%);
        -webkit-filter: grayscale(50%) sepia(10%) saturate(76%);
        -moz-filter: grayscale(50%) sepia(10%) saturate(76%);
        overflow: hidden;
        clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
    }

    &__name {
        margin-top: 20px;
        color: $secondary;
        font-size: clamped(15px, 24px, 380px, 1920px);
        font-family: $sans-ui;
        font-weight: 400;
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
        padding: 0 30px;
    }

    @include this-and-above('lg') {
        padding: 0 50px;
    }

    @include this-and-above('xl') {
        padding: 0 100px;
    }
}
</style>