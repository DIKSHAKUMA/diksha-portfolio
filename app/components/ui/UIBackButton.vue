<script setup lang="ts">
  interface Props {
    to?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    to: '',
  })

  const router = useRouter()
  const handleBack = () => {
    if (props.to) {
      router.push(props.to)
    } else {
      router.back()
    }
  }
</script>

<template>
  <button class="back-button" @click="handleBack" aria-label="Back">
    <Icon class="back-button__icon action" name="weui:previous2-filled" size="48" />
  </button>
</template>

<style lang="scss" scoped>
  .back-button {
    &__icon {
      color: $accent2;
      transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1);

      @media (hover: hover) {
        &:hover {
          color: $accent1;
        }
      }
    }
  }
</style>
