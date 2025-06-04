<script setup lang="ts">
import { useMousePos } from "~/composable/useMousePos"

const { xpos, ypos } = useMousePos()
const { $gsap } = useNuxtApp()

const shape = useTemplateRef<HTMLHtmlElement>("shape")
const dataName = ref<string>("")
const isOver = ref<boolean>(false)
const bgColor = ref<string>("")
const dispStr = ref<string>("")
const firstRun = ref<boolean>(true)
const showSVG = ref<boolean>(false)

const loopStarted = ref<boolean>(false)
const pos = { x: 0, y: 0 }
const vel = { x: 0, y: 0 }
const route = useRoute();

onMounted(() => {
    
    const root = document.documentElement
    const currentColor = getComputedStyle(root)
    // A little ugly with a watcher inside route but Jelly am I and I need to know what is on the next route! Jelly, I am.
    watch(route, value => {

        let sections = $gsap.utils.toArray(".action")

        sections.forEach((sec: any) => {
            sec.addEventListener("mouseover", () => {
                isOver.value = true
                dataName.value = sec.dataset.name;
                dispStr.value = sec.dataset.vis
                bgColor.value = currentColor.getPropertyValue('--accent2');
            })

            sec.addEventListener("mouseout", () => {
                isOver.value = false
                dataName.value = ""
                bgColor.value = currentColor.getPropertyValue('--accent2');
                dispStr.value = "block"
            })

            sec.addEventListener("click", () => {
                isOver.value = false
                dataName.value = ""
                bgColor.value = currentColor.getPropertyValue('--accent2');
                dispStr.value = "block"
            })
        })

    }, { deep: true, immediate: true })

    const setFromEvent = () => {
        let x = xpos.value
        let y = ypos.value
        $gsap.to(pos, {
            x: x,
            y: y,
            ease: "power4.out",
            duration: 0.2,
            onUpdate: () => {
                vel.x = x! - pos.x
                vel.y = y! - pos.y
            },
        })

        if (!loopStarted.value) {
            $gsap.ticker.add(loop)
        }
    }

    const loop = () => {
        // Calculate angle and scale based on velocity
        let rotation = getAngle(vel.x, vel.y)
        let scale = getScale(vel.x, vel.y)

        // Set transform data to Jelly Blobr
        if (shape.value?.getBoundingClientRect()) {
            $gsap.to(shape.value, {
                x: Math.round(pos.x - shape.value.getBoundingClientRect().width / 2),
                y: Math.round(pos.y - shape.value.getBoundingClientRect().height / 2),
                //rotation: rotation + "_short",
                scaleX: 1 + scale,
                scaleY: 1 - scale,
                duration: 0.0,
            })
        }
    }

    //The Blob! Thanks to https://codepen.io/GreenSock/pen/YzQabVQ
    const getScale = (diffX: number, diffY: number) => {
        const distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2))
        return Math.min(distance / 50, 0.2)
    }

    const getAngle = (diffX: number, diffY: number) => {
        return (Math.atan2(diffY, diffX) * 180) / Math.PI
    }

    watch(
        () => [xpos.value, ypos.value],
        ([newXpos, newYpos], [prevXpos, prevYpos]) => {
            setFromEvent()

            if (firstRun.value) {
                $gsap.set('.cursor', { autoAlpha: 1 })
            }
            firstRun.value = false
        },
    )
})

const classObject = computed(() => ({
    'cursor__shape': dataName.value === 'yo' || dataName.value === 'menu' || dataName.value === 'proj' || dataName.value === '',
    'cursor__shape--proj': isOver.value && dataName.value === 'proj',
    'cursor__shape--menu': isOver.value && dataName.value === 'menu',
    'cursor__shape--yo': isOver.value && dataName.value === 'yo'
}))
</script>

<template>
    <div class="cursor" :style="{ display: dispStr }">

        <div :style="{ backgroundColor: bgColor }" :class="classObject" ref="shape">
            <div v-if="dataName === 'proj'" class="cursor__shape__text">
                Discover
            </div>
            <div v-if="dataName === 'menu'" class="cursor__shape__text">

            </div>
            <div v-if="dataName === 'yo'" class="cursor__shape__text">
                <p>Yo!</p>
            </div>
            <div class="media"></div>
        </div>

    </div>
</template>

<style scoped lang="scss">
.eye {
    width: 60px;
    height: auto;
    pointer-events: none;
}

.cursor {
    pointer-events: none;
    font-family: $sans-ui;
    font-weight: 400;
    font-size: $fs-14;
    position: fixed;
    z-index: 9000;
    width: 100%;
    visibility: hidden;

    &__shape {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: $accent2;
        width: 20px;
        height: 20px;
        border: 1px solid $secondary;
        border-radius: 50%;
        pointer-events: none;

        transform-origin: center center;
        will-change: width, height, transform, border;
        transition: all 0.4s cubic-bezier(0.075, 0.82, 0.165, 1);

        /* different hover states */
        &--proj {
            width: 100px;
            height: 50px;
            border-radius: 5px;
        }

        &--menu {
            width: 80px;
            height: 80px;
            opacity: .1;
        }

        /* Easter egg */
        &--yo {
            width: 100px;
            height: 100px;
            opacity: .5;
            font-size: $fs-18;

            p {
                color: $secondary;
            }
        }

        &__text {
            display: flex;
            color: $secondary;
            align-items: center;
            justify-content: center;
            backface-visibility: hidden;
            transform: translateZ(0);
            -webkit-text-size-adjust: 100%;
            text-rendering: optimizeLegibility;
            white-space: nowrap;
            opacity: 1 !important;
        }
    }
}
</style>