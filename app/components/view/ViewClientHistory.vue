<script setup lang="ts">
  interface ClientHistoryItem {
    projectName: string
    date: string
    duration: string
    type: string
  }

  interface Props {
    clientName: string
    history: ClientHistoryItem[]
  }

  const props = withDefaults(defineProps<Props>(), {
    clientName: '',
    history: () => [],
  })

  const isExpanded = ref(false)
  const historySection = useTemplateRef<HTMLElement>('historySection')

  const toggleExpanded = () => {
    isExpanded.value = !isExpanded.value
  }

  /* Parse date for sorting (handles "Month YYYY" format) */
  const parseDate = (dateStr: string): Date => {
    try {
      /* Handle "Month YYYY" format like "April 2025" */
      const [month, year] = dateStr.split(' ')
      const monthIndex = new Date(`${month} 1, ${year}`).getMonth()
      return new Date(parseInt(year), monthIndex)
    } catch {
      /* Fallback for any parsing issues */
      return new Date(0)
    }
  }

  /* Sort history by date (most recent first) and show only first 2 items when collapsed */
  const sortedHistory = computed(() => {
    return [...props.history].sort((a, b) => {
      const dateA = parseDate(a.date)
      const dateB = parseDate(b.date)
      return dateB.getTime() - dateA.getTime() /* Easy way to get a timestamp for sortig, latest first */
    })
  })

  const visibleHistory = computed(() => {
    return isExpanded.value ? sortedHistory.value : sortedHistory.value.slice(0, 2)
  })

  const hasMoreItems = computed(() => {
    return props.history.length > 2
  })
</script>

<template>
  <section class="client-history" v-if="history && history.length > 0">
    <div class="client-history__header">
      <h5>More work with {{ clientName }}</h5>
      <p class="client-history__subtitle">
        {{ history.length }} project{{ history.length > 1 ? 's' : '' }}
        completed
      </p>
    </div>

    <div class="client-history__content" ref="historySection">
      <div class="client-history__timeline">
        <div
          v-for="(item, index) in visibleHistory"
          :key="index"
          class="client-history__item"
        >
          <div class="client-history__item-dot"></div>
          <div class="client-history__item-content">
            <div class="client-history__item-header">
              <h6 class="client-history__project-name">
                {{ item.projectName }}
              </h6>
              <span class="client-history__date">{{ item.date }}</span>
            </div>
            <div class="client-history__item-meta">
              <span class="client-history__type">{{ item.type }}</span>
              <span class="client-history__duration">{{ item.duration }}</span>
            </div>
          </div>
        </div>
      </div>

      <button
        v-if="hasMoreItems"
        @click="toggleExpanded"
        class="client-history__toggle"
      >
        {{ isExpanded ? 'Show less' : `Show ${history.length - 2} more` }}
        <svg
          class="client-history__toggle-icon"
          :class="{ 'client-history__toggle-icon--expanded': isExpanded }"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
  </section>
</template>

<style lang="scss" scoped>
  .client-history {
    display: flex;
    flex-direction: column;
    background-color: $primary;
    border: 2px solid $accent2;
    border-radius: 12px;
    padding: $px-32-spacer;
    margin: 0 0;

    @include this-and-above('sm') {
      margin: 0 $px-32-spacer $px-16-spacer $px-32-spacer;
    }

    @include this-and-above('md') {
      margin: 0 $px-64-spacer $px-32-spacer $px-64-spacer;
    }

    @include this-and-above('lg') {
      margin: 0 $px-64-spacer $px-32-spacer $px-64-spacer;
    }

    @include this-and-above('xl') {
      margin: 0 $px-128-spacer $px-64-spacer $px-128-spacer;
    }

    &__header {
      margin-bottom: $px-32-spacer;

      h5 {
        color: $secondary;
        font-size: clamped(16px, 20px, 380px, 1920px);
        font-weight: 600;
        margin-bottom: $px-8-spacer;
      }
    }

    &__subtitle {
      color: $secondary;
      opacity: 0.7;
      font-size: clamped(14px, 16px, 380px, 1920px);
    }

    &__timeline {
      position: relative;

      /* Timeline line */
      &::before {
        content: '';
        position: absolute;
        left: 8px;
        top: 0;
        bottom: 0;
        width: 2px;
        background: $accent2;
        opacity: 0.3;
      }
    }

    &__item {
      display: flex;
      align-items: flex-start;
      margin-bottom: $px-16-spacer;
      position: relative;

      &:last-child {
        margin-bottom: 0;
      }
    }

    &__item-dot {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: $accent2;
      flex-shrink: 0;
      margin-right: $px-16-spacer;
      margin-left: 1px;
      position: relative;
      z-index: 1;
    }

    &__item-content {
      flex: 1;
      padding-top: 2px;
      /* Align with dot center */
    }

    &__item-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: $px-8-spacer;
      gap: $px-16-spacer;
    }

    &__project-name {
      color: $secondary;
      font-size: clamped(14px, 16px, 380px, 1920px);
      font-weight: 400;
      line-height: 1.3;
      flex: 1;
    }

    &__date {
      color: $secondary;
      opacity: 0.8;
      font-size: clamped(14px, 16px, 380px, 1920px);
      font-weight: 400;
      flex-shrink: 0;
    }

    &__item-meta {
      display: flex;
      gap: $px-16-spacer;
      flex-wrap: wrap;
    }

    &__type,
    &__duration {
      color: $secondary;
      opacity: 0.6;
      font-size: clamped(13px, 15px, 380px, 1920px);
    }

    &__type {
      font-weight: 400;
    }

    &__toggle {
      display: flex;
      align-items: center;
      gap: $px-8-spacer;
      background: none;
      border: none;
      color: $accent2;
      font-size: clamped(14px, 16px, 380px, 1920px);
      font-weight: 400;
      cursor: pointer;
      padding: $px-8-spacer 0;
      margin-top: $px-16-spacer;
      transition: opacity 0.2s ease;

      &:hover {
        opacity: 0.8;
      }
    }

    &__toggle-icon {
      transition: transform 0.2s ease;

      &--expanded {
        transform: rotate(180deg);
      }
    }
  }
</style>
