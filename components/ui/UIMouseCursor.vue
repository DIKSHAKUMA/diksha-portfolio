<script setup lang="ts">
import { useMousePos } from "~/composable/useMousePos"
import ChevronSVG from "@/assets/svg/chevron-right.svg"

const { xpos, ypos } = useMousePos()
const { $gsap } = useNuxtApp()

const shape = useTemplateRef<HTMLHtmlElement>("shape")
const dataName = ref<string>("")
const dataText = ref<string>("")
const isOver = ref<boolean>(false)
const dispStr = ref<string>("")
const firstRun = ref<boolean>(true)
const showCursor = ref(true)

const loopStarted = ref<boolean>(false)
const pos = { x: 0, y: 0 }
const vel = { x: 0, y: 0 }

/**
 * As per usual we try to follow the order : refs, comp props, methods, watchers, hooks, returns, exposes
 */
const classObject = computed(() => ({
    'cursor__shape': dataName.value === 'yo' || dataName.value === 'menu' || dataName.value === 'proj' || dataName.value === '',
    'cursor__shape--proj': isOver.value && dataName.value === 'proj',
    'cursor__shape--menu': isOver.value && dataName.value === 'menu',
    'cursor__shape--yo': isOver.value && dataName.value === 'yo'
}))

/* So we get mix-blend-mode on text if over project */
const cursorClassObject = computed(() => ({
    'cursor--proj': isOver.value && dataName.value === 'proj'
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
            /* we are tweening pos object, thus we can approximate towards mouse position */
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
    let scale = getScale(vel.x, vel.y)

    // Set transform data to Jelly Blob
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
    // Pow  static method returns the value of a base raised to a power. That is 2 in this case
    // So we multiply itself by pow 2, then get out what the square root of that sum is (ex for 9 its 3)
    const distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2))
    //The Math.min() static method returns the smallest of the numbers given as input parameters
    return Math.min(distance / 50, 0.2)
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

    // Mouse over info states
    sections.forEach((sec: any) => {
        sec.addEventListener("mouseover", function overHandler() {
            isOver.value = true
            dataName.value = sec.dataset.name || ""
            dataText.value = sec.dataset.text || ""
            dispStr.value = "block"
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

    // Since we probably don't want the images to animate, we need something else than .action: .magnet
    let links = $gsap.utils.toArray(".magnet")
    links.forEach((link: any) => {
        link.addEventListener('mousemove', magnetMove)
        link.addEventListener('mouseleave', magnetMove)
    })

    // Hide cursor on first touch (mobile/tablet)
    window.addEventListener('touchstart', () => {
        showCursor.value = false;
    }, { once: true });
})

// Magnet effect on links on mouse over
const magnetMove = (e: any) => {
    const { offsetX: x, offsetY: y } = e,
        { offsetWidth: width, offsetHeight: height } = e.currentTarget,
        move = 10,
        xMove = x / width * (move * 2) - move,
        yMove = y / height * (move * 2) - move;
    e.currentTarget.style.transform = `translate(${xMove}px, ${yMove}px)`;
    if (e.type === 'mouseleave') e.currentTarget.style.transform = '';
}

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
    <div v-if="showCursor" :class="['cursor', cursorClassObject]" :style="{ display: dispStr }">

        <div :class="classObject" ref="shape">
            <div v-if="dataName === 'proj'" class="cursor__shape__text">
                {{ dataText }}
                <ChevronSVG class="arrow" />
            </div>
            <div v-if="dataName === 'menu'" class="cursor__shape__text">

            </div>
            <div v-if="dataName === 'yo'" class="cursor__shape__text">
                {{ dataText }}
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
    fill: #faf7ff;
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

    &--proj {
        mix-blend-mode: difference;
    }

    &__shape {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: $accent2;
        width: 20px;
        height: 20px;
        border: 1px solid $accent1;
        border-radius: 50%;
        pointer-events: none;
        transform-origin: center center;
        will-change: width, height, transform, border;
        transition: all 0.4s cubic-bezier(0.075, 0.82, 0.165, 1);
        backdrop-filter: blur(10px);
        opacity: .5;

        /* different hover states */
        &--proj {
            width: 100px;
            height: 100px;
            background-color: unset;
            opacity: 1;
        }

        &--menu {
            width: 80px;
            height: 80px;
            opacity: .1;
        }

        /* Easter egg */
        &--yo {
            width: 80px;
            height: 80px;
            opacity: 1;
            background-color: unset;

            .cursor__shape__text {
                color: $secondary;
            }
        }

        &__text {
            display: flex;
            align-items: center;
            justify-content: center;
            backface-visibility: hidden;
            transform: translateZ(0);
            -webkit-text-size-adjust: 100%;
            text-rendering: optimizeLegibility;
            white-space: nowrap;
            opacity: 1 !important;
            font-weight: 600;
            color: #faf7ff;
        }
    }
}
</style>