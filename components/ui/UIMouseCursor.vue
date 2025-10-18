<script setup lang="ts">
  import { useMousePos } from '~/composable/useMousePos'
  import ChevronSVG from '@/assets/svg/chevron-right.svg'
  import UPArrowSVG from '@/assets/svg/up-arrow.svg'

  const { xpos, ypos } = useMousePos()
  const { $gsap } = useNuxtApp()

  const shape = useTemplateRef<HTMLHtmlElement>('shape')
  const dataName = ref<string>('')
  const dataText = ref<string>('')
  const isOver = ref<boolean>(false)
  const dispStr = ref<string>('')
  const firstRun = ref<boolean>(true)
  const showCursor = ref(true)

  const loopStarted = ref<boolean>(false)
  const pos = { x: 0, y: 0 }
  const vel = { x: 0, y: 0 }

  /**
   * I am Jelly Blob. I eat potato and coffee.
   */

  /* Store event handlers for proper cleanup */
  const eventHandlers = new Map<
    Element,
    {
      overHandler: () => void
      outHandler: () => void
      clickHandler: () => void
    }
  >()

  /* Store event handlers for proper cleanup */
  const magnetHandlers = new Map<Element, (e: any) => void>()

  /**
   * As per usual we try to follow the order : refs, comp props, methods, watchers, hooks, returns, exposes
   */
  const classObject = computed(() => ({
    cursor__shape:
      dataName.value === 'yo' ||
      dataName.value === 'menu' ||
      dataName.value === 'proj' ||
      dataName.value === 'reel' ||
      dataName.value === '',
    'cursor__shape--proj':
      isOver.value && (dataName.value === 'proj' || dataName.value === 'reel'),
    'cursor__shape--menu': isOver.value && dataName.value === 'menu',
    'cursor__shape--reel': isOver.value && dataName.value === 'reel',
    'cursor__shape--yo': isOver.value && dataName.value === 'yo',
  }))

  const setFromEvent = () => {
    let x = xpos.value
    let y = ypos.value
    $gsap.to(pos, {
      x: x,
      y: y,
      ease: 'power4.out',
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
    /* Calculate angle and scale based on velocity */
    let scale = getScale(vel.x, vel.y)

    /* Set transform data to Jelly Blob - optimized for Firefox */
    if (shape.value) {
      /* Cache getBoundingClientRect to avoid repeated calls */
      const rect = shape.value.getBoundingClientRect()
      $gsap.set(shape.value, {
        x: Math.round(pos.x - rect.width / 2),
        y: Math.round(pos.y - rect.height / 2),
        scaleX: 1 + scale,
        scaleY: 1 - scale,
        force3D: true /* Hardware acceleration */,
      })
    }
  }

  /* The Blob! Thanks to https://codepen.io/GreenSock/pen/YzQabVQ */
  const getScale = (diffX: number, diffY: number) => {
    /* Pow  static method returns the value of a base raised to a power. That is 2 in this case
     * So we multiply itself by pow 2, then get out what the square root of that sum is (ex for 9 its 3) */
    const distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2))
    /* The Math.min() static method returns the smallest of the numbers given as input parameters */
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
    }
  )

  /**
   * Recall that I sit in every page, most natural way is a KISS
   */
  onMounted(async () => {
    await nextTick()
    let sections = $gsap.utils.toArray('.action')

    /* Mouse over info states */
    sections.forEach((sec: any) => {
      const overHandler = () => {
        isOver.value = true
        dataName.value = sec.dataset.name || ''
        dataText.value = sec.dataset.text || ''
        dispStr.value = 'block'
      }

      const outHandler = () => {
        isOver.value = false
        dataName.value = ''
        dispStr.value = 'block'
      }

      const clickHandler = () => {
        isOver.value = false
        dataName.value = ''
        dispStr.value = 'block'
      }

      /* Store handlers for cleanup, recall that anonymous functions create new references each time;
       * this is how we keep track of them to avoid memory leak */
      eventHandlers.set(sec, { overHandler, outHandler, clickHandler })

      /* Add event listeners */
      sec.addEventListener('mouseover', overHandler)
      sec.addEventListener('mouseout', outHandler)
      sec.addEventListener('click', clickHandler)
    })

    /* Since we probably don't want the images to animate, we need something else than .action: .magnet */
    let links = $gsap.utils.toArray('.magnet')
    links.forEach((link: any) => {
      /* Store handler reference for cleanup; */
      magnetHandlers.set(link, magnetMove)

      link.addEventListener('mousemove', magnetMove)
      link.addEventListener('mouseleave', magnetMove)
      link.addEventListener('click', magnetReset) /* Reset position on click */
    })

    /* Hide cursor on first touch (mobile/tablet) */
    window.addEventListener(
      'touchstart',
      () => {
        showCursor.value = false
      },
      { once: true }
    )
  })

  /* Magnet effect on links on mouse over */
  const magnetMove = (e: any) => {
    /* deconstructing to X, recall that offsetX is the distance from the left of the element to the cursor */
    const { offsetX: x, offsetY: y } = e,
      { offsetWidth: width, offsetHeight: height } = e.currentTarget,
      move = 10,
      xMove = (x / width) * (move * 2) - move,
      yMove = (y / height) * (move * 2) - move
    e.currentTarget.style.transform = `translate(${xMove}px, ${yMove}px)`
    if (e.type === 'mouseleave') e.currentTarget.style.transform = ''
  }

  const magnetReset = (e: any) => {
    e.currentTarget.style.transform = ''
  }

  onBeforeUnmount(() => {
    /* Remove GSAP ticker */
    if (loopStarted.value) {
      $gsap.ticker.remove(loop)
      loopStarted.value = false
    }

    /* Clean up .action event listeners */
    eventHandlers.forEach((handlers, element) => {
      element.removeEventListener('mouseover', handlers.overHandler)
      element.removeEventListener('mouseout', handlers.outHandler)
      element.removeEventListener('click', handlers.clickHandler)
    })
    eventHandlers.clear()

    /* Clean up .magnet event listeners */
    magnetHandlers.forEach((handler, element) => {
      element.removeEventListener('mousemove', handler)
      element.removeEventListener('mouseleave', handler)
      element.removeEventListener('click', magnetReset)
    })
    magnetHandlers.clear()
  })
</script>

<template>
  <div v-if="showCursor" class="cursor" :style="{ display: dispStr }">
    <div :class="classObject" ref="shape">
      <div v-if="dataName === 'proj'" class="cursor__shape__text">
        <ChevronSVG
          v-if="dataText === 'Previous'"
          class="arrow arrow--reverse arrow--before"
        />
        {{ dataText }}
        <ChevronSVG v-if="dataText === 'Next'" class="arrow" />
        <UPArrowSVG
          v-if="dataText === 'View' || dataText === 'Lens'"
          class="up-arrow"
        />
      </div>
      <div v-if="dataName === 'menu'" class="cursor__shape__text">
        {{ dataText }}
      </div>
      <div v-if="dataName === 'reel'" class="cursor__shape__text">
        <ChevronSVG class="arrow arrow--before arrow--reverse" />{{ dataText }}
        <ChevronSVG class="arrow" />
      </div>
      <div v-if="dataName === 'yo'" class="cursor__shape__text">
        {{ dataText }}
      </div>
      <div class="media"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .up-arrow {
    width: 20px;
    height: auto;
    pointer-events: none;
    margin-left: 5px;
    margin-bottom: 4px;
    fill: $secondary-static;
  }
  .arrow {
    width: 12px;
    height: auto;
    pointer-events: none;
    margin-left: 5px;
    fill: $secondary-static;

    &--reverse {
      transform: rotate(180deg);
    }

    &--before {
      margin-left: 0;
      margin-right: 5px;
    }
  }

  .cursor {
    pointer-events: none;
    font-family: $sans-ui-mono;
    font-weight: 400;
    font-size: 13px;
    position: fixed;
    z-index: 9000;
    width: 100%;
    visibility: hidden;

    &__shape {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      border: 1px solid rgba(250, 247, 255, 0.1);
      border-radius: 50%;
      pointer-events: none;
      transform-origin: center center;
      will-change: width, height, transform;
      transition: all 0.4s cubic-bezier(0.075, 0.82, 0.165, 1);
      backdrop-filter: blur(15px);
      opacity: 0.5;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);

      .light-mode & {
        background: $primary-static;
        border-color: rgba(23, 23, 23, 0.1);
      }

      /* different hover states */
      &--proj {
        width: 80px;
        height: 80px;
        opacity: 0.9;
      }

      &--reel {
        width: 50px;
        height: 50px;
        opacity: 0.9;
      }

      &--menu {
        width: 70px;
        height: 70px;
        opacity: 0.9;
      }

      /* Easter egg */
      &--yo {
        width: 70px;
        height: 70px;
        opacity: 0.9;
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
        font-weight: 400;
        color: $secondary-static;
      }
    }
  }
</style>
