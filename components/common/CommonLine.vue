<script setup lang="ts">
  const metaLine = useTemplateRef('metaLine')
  const { $gsap } = useNuxtApp()

  interface Props {
    pos?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky'
    width?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    pos: 'absolute',
    width: '80%',
  })

  const resolvedWidth = computed(() =>
    props.width && props.width.trim().length ? props.width : '80%'
  )

  onMounted(() => {
    if (metaLine.value) {
      $gsap.fromTo(
        metaLine.value,
        { width: '0%' },
        {
          width: resolvedWidth.value,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: metaLine.value,
            start: 'top bottom',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }
  })
</script>
/* ghfgh */
<template>
  <div
    class="line"
    ref="metaLine"
    :style="{ position: props.pos, width: resolvedWidth }"
  ></div>
</template>

<style scoped lang="scss">
  .line {
    top: 0;
    background-color: $accent2;
    display: block;
    height: 2px;
    left: 50%;
    transform: translate(-50%, 0);
    width: 0%;
  }
</style>
