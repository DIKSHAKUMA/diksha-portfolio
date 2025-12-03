<script setup lang="ts">
  import { useFolioStore } from '../../../stores/useFolioStore'
  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  import { ref, onMounted } from 'vue'
  import { useNuxtApp } from '#app'

  const store = useFolioStore()
  const timelineLine = useTemplateRef('timelineLine')
  const { $gsap } = useNuxtApp()

  onMounted(() => {
    if (import.meta.client) {
      gsap.registerPlugin(ScrollTrigger)

      /* Animate the timeline line height on scroll */
      $gsap.to(timelineLine.value, {
        scrollTrigger: {
          trigger: '.timeline-wrapper',
          start: 'top center',
          end: 'bottom bottom',
          scrub: 0.5,
          onUpdate: (self) => {
            /* Update the height based on scroll progress */
            if (timelineLine.value) {
              timelineLine.value.style.height = `${self.progress * 100}%`
            }
          },
        },
      })

      /* Animate timeline items individually */
      const timelineItems = document.querySelectorAll('.timeline__item')

      timelineItems.forEach((item, index) => {
        /* Set initial state - hidden and offset */
        $gsap.set(item, {
          opacity: 0,
          y: 50,
          x:
            index % 2 === 0
              ? -50
              : 50 /* Odd items come from left, even from right */,
        })

        /* Animate in on scroll */
        $gsap.to(item, {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            end: 'top 50%',
            toggleActions: 'play none none reverse',
            invalidateOnRefresh: false,
          },
        })
      })
    }
  })
</script>

<template>
  <div class="timeline-wrapper">
    <CommonAbstract
      :label="''"
      :desc="'Past'"
      :class-name="'timeline-start'"
      :is-page-header="false"
      :delay="0"
      :is-full-width="false"
      :is-hero="false"
      :is-secondary="false"
      :author="''"
      :date="''"
      :is-two-lines="false"
    />

    <main class="timeline">
      <div ref="timelineLine" class="timeline__line"></div>

      <!-- Timeline items container -->
      <div class="timeline__items">
        <div
          class="timeline__item"
          v-for="(item, index) in store.data.about?.timelineItem"
          :key="item.id || index"
        >
          <div class="timeline__item__content">
            <div class="timeline__item__header">
              <h4 class="timeline__item__heading">{{ item.heading }}</h4>
              <div class="timeline__item__meta">
                <span class="timeline__item__company">{{ item.company }}</span>
                <span class="timeline__item__period">{{ item.period }}</span>
              </div>
            </div>
            <div class="timeline__item__desc">
              <p>{{ item.description }}</p>
            </div>
          </div>
          <div class="timeline__item__dot"></div>
        </div>
      </div>
    </main>
    <CommonInfoLabel
      :label="'Timeline'"
      :class-name="'timeline-info'"
      :hpos="'center'"
      :hover-label="''"
      :force-white="false"
      :vpos="'flex-start'"
      :link="''"
    />
    <CommonAbstract
      class="timeline-end"
      :label="''"
      :desc="'Future'"
      :is-page-header="false"
      :class-name="'timeline-end'"
      :delay="0"
      :is-full-width="false"
      :is-hero="false"
      :is-secondary="false"
      :author="''"
      :date="''"
      :is-two-lines="false"
    />
  </div>
</template>

<style lang="scss" scoped>
  :deep(.abstract-wrapper) {
    align-items: center;
    width: 100%;
  }

  :deep(.timeline-end) {
    margin-top: $px-64-spacer;
  }

  .timeline-wrapper {
    position: relative;
    overflow: hidden;
    padding: $px-64-spacer 0;

    .timeline {
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      height: 100%;
      /* to get overflow to behave */
      position: relative;
      overflow: hidden;

      &__line {
        position: absolute !important;
        width: 8px;
        height: 0%;
        background-color: $secondary;
        position: relative;
        will-change: height;
        transform-origin: top center;
      }

      &__items {
        position: relative;
        width: 100%;
        max-width: 1200px;
      }

      &__item {
        position: relative;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        &__content {
          padding: 2rem;
          width: 45%;
          position: relative;
          transition: all 0.3s ease;
        }

        &__header {
          margin-bottom: 1rem;
        }

        &__heading {
          font-size: clamped(16px, 20px, 380px, 1920px);
          color: $secondary;
          line-height: 1.2;
        }

        &__meta {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;

          @include this-and-above('md') {
            flex-direction: row;
            gap: 1rem;
          }
        }

        &__company {
          font-size: clamped(14px, 16px, 380px, 1920px);
          font-weight: 400;
          color: $accent2;
        }

        &__period {
          font-size: clamped(14px, 16px, 380px, 1920px);
          color: $secondary;
          opacity: 0.7;
        }

        &__desc {
          font-size: clamped(14px, 16px, 380px, 1920px);
          line-height: 1.6;
          color: $secondary;
        }

        &__dot {
          width: 20px;
          height: 20px;
          background-color: $secondary;
          border: 4px solid $primary;
          border-radius: 50%;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          transition: all 0.3s ease;

          &:hover {
            transform: translate(-50%, -50%) scale(1.2);
          }
        }

        &:nth-child(odd) {
          justify-content: flex-start;
          margin: $px-256-spacer 0;
          text-align: right;

          .timeline__item__content {
            margin-right: calc(50% + 30px);
          }

          .timeline__item__meta {
            justify-content: flex-end;
          }
        }

        &:nth-child(even) {
          justify-content: flex-end;
          margin: $px-256-spacer 0;

          .timeline__item__content {
            margin-left: calc(50% + 30px);
          }

          .timeline__item__meta {
            justify-content: flex-start;
          }
        }
      }
    }
  }
</style>
