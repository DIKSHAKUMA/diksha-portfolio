<script setup lang="ts">
import { useMousePos } from "~/composable/useMousePos"
import ChevronSVG from "@/assets/svg/chevron-right.svg"

const { xpos, ypos } = useMousePos()
const { $gsap } = useNuxtApp()

const shape = useTemplateRef<HTMLHtmlElement>("shape")
const dataName = ref<string>("")
const isOver = ref<boolean>(false)
const dispStr = ref<string>("")
const firstRun = ref<boolean>(true)

const loopStarted = ref<boolean>(false)
const pos = { x: 0, y: 0 }
const vel = { x: 0, y: 0 }
const route = useRoute()

const classObject = computed(() => ({
    'cursor__shape': dataName.value === 'yo' || dataName.value === 'menu' || dataName.value === 'proj' || dataName.value === '',
    'cursor__shape--proj': isOver.value && dataName.value === 'proj',
    'cursor__shape--menu': isOver.value && dataName.value === 'menu',
    'cursor__shape--yo': isOver.value && dataName.value === 'yo'
}))

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

/**
 * Recall that I sit in every page, most natural way is a KISS
 */
onMounted(async () => {
    await nextTick()
    let sections = $gsap.utils.toArray(".action")
    
    sections.forEach((sec: any) => {
        sec.addEventListener("mouseover", function overHandler() {
            isOver.value = true
            dataName.value = sec.dataset.name
            dispStr.value = sec.dataset.vis
        })

        sec.addEventListener("mouseout", function outHandler() {
            isOver.value = false
            dataName.value = ""
            dispStr.value = "block"
        })

        sec.addEventListener("click", function clickHandler() {
            isOver.value = false
            dataName.value = ""
            dispStr.value = "block"
        })
    })

})

onBeforeUnmount(() => {
    let sections = $gsap.utils.toArray(".action")
    sections.forEach((sec: any) => {
        sec.removeEventListener("mouseover", sec.overHandler)
        sec.removeEventListener("mouseout", sec.outHandler)
        sec.removeEventListener("click", sec.clickHandler)
    })
})
</script>

<template>
    <div class="cursor" :style="{ display: dispStr }">

        <div :class="classObject" ref="shape">
            <div v-if="dataName === 'proj'" class="cursor__shape__text">
                Explore
                <ChevronSVG class="arrow" />
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
.arrow {
    width: 14px;
    height: auto;
    pointer-events: none;
    margin-left: 5px;
    fill: $secondary;
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
        background-color: $primary;
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
            width: 110px;
            height: 50px;
            border-radius: 10px;
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
            font-weight: 600;
        }
    }
}
</style>