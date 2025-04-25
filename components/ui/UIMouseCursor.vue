<script setup lang="ts">
import { useMousePos } from "~/composable/useMousePos"
import EyeSvg from '~/assets/svg/eye.svg'

const { xpos, ypos } = useMousePos()
const { $gsap } = useNuxtApp()

const text = useTemplateRef<HTMLHtmlElement>("text")
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

//TODO : Cleanup
onMounted(() => {
    // A little ugly with a watcher inside route but Jelly am I and I need to know what is on the next route! Jelly, I am.
    watch(route, value => {

        let sections = $gsap.utils.toArray(".action")

        sections.forEach((sec: any) => {
            sec.addEventListener("mouseover", () => {
                isOver.value = true
                dataName.value = sec.dataset.name;

                dispStr.value = sec.dataset.vis  // 'none'
            })

            sec.addEventListener("mouseout", () => {
                isOver.value = false
                dataName.value = ""
                bgColor.value = "#1E201E"
                dispStr.value = "block"
            })

            sec.addEventListener("click", () => {
                isOver.value = false
                dataName.value = ""
                bgColor.value = "#1E201E"
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
</script>

<template>
    <div class="cursor" :style="{ display: dispStr }">
        <div class="cursor__shape" :style="{ backgroundColor: bgColor }" :class="{ 'cursor__shape--over': isOver }"
            ref="shape">
            <div v-if="dataName !== 'eye-svg'" class="cursor__shape__text"
                :class="{ 'cursor__shape__text--on': isOver }" ref="text">
                {{ dataName }}
            </div>
            <div v-if="dataName == 'eye-svg'">
                <EyeSvg class="eye" />
            </div>
            <div class="media"></div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.eye {
    width: 60px;
    height: auto;
}

.cursor {
    font-family: $sans-ui;
    font-weight: 400;
    font-size: 14px;
    position: fixed;
    z-index: 9000;
    width: 100%;
    visibility: hidden;
    mix-blend-mode:difference;

    &__shape {
        display: flex;
        align-items: center;
        justify-content: center;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 20px;
        height: 20px;
        border: 1px solid $accent1;
        border-radius: 50%;
        pointer-events: none;
        background-color: $primary;
        transform-origin: center center;
        will-change: width, height, transform, border;
        transition: all 0.4s cubic-bezier(0.075, 0.82, 0.165, 1);

        &--over {
            width: 80px;
            height: 80px;
            fill: black;
        }

        &__text {
            display: flex;
            color: $primary;
            align-items: center;
            justify-content: center;
            backface-visibility: hidden;
            transform: translateZ(0);
            -webkit-text-size-adjust: 100%;
            text-rendering: optimizeLegibility;
            white-space: nowrap;
        }
    }
}
</style>