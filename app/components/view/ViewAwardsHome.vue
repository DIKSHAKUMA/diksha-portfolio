<script setup lang="ts">
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  import { useFolioStore } from '../../../stores/useFolioStore'
  import { ref, onMounted } from 'vue'

  /* PINIA 🍍 */
  const store = useFolioStore()
  const { $gsap } = useNuxtApp()
  const colorMode = useColorMode()
  let ctx: gsap.Context

  /**
   * TODO: Clean up the CSS some!
   */

  const awards = computed(() => store.data.awards[0] || {})

  onMounted(() => {
    $gsap.registerPlugin(ScrollTrigger)
    ctx = $gsap.context((self) => {})
  })

  onUnmounted(() => {
    /* Clean up GSAP context */
    ctx?.revert()
  })
</script>

<template>
  <div class="award-wrapper">
    <CommonLine :pos="'absolute'" :width="''" />
    <main>
      <CommonAbstract
        class="code__header"
        :label="awards.awardTitle"
        :desc="awards.awardDesc"
        :class-name="'code-intro'"
        :is-secondary="true"
        :delay="0"
        :is-full-width="false"
        :is-hero="false"
        :is-page-header="false"
        :author="''"
        :date="''"
        :is-two-lines="false"
      />
      <CommonInfoLabel
        :label="'FOLIO RECOGNITION'"
        :class-name="'photo-label'"
        :hpos="'center'"
        :hover-label="''"
        :force-white="false"
        :vpos="'flex-start'"
        :link="''"
      />

      <section class="award-section">
        <div
          v-if="awards.awardSvg && awards.awardSvg.length"
          class="marquee-container"
        >
          <div class="marquee">
            <div
              class="marquee__content"
              :class="
                colorMode.value === 'light' ? 'marquee__content--light' : ''
              "
            >
              <!-- Original logos -->
              <div
                v-for="svg in awards.awardSvg"
                :key="svg.id"
                class="award-cell"
              >
                <img :src="svg.url" class="award-svg" :alt="svg.fileName" />
              </div>
              <!-- Duplicated logos for seamless looping -->
              <div
                v-for="svg in awards.awardSvg"
                :key="`${svg.id}-duplicate`"
                class="award-cell"
              >
                <img :src="svg.url" class="award-svg" :alt="svg.fileName" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style lang="scss" scoped>
  .award-wrapper {
    min-height: 100vh; // Allow it to grow
    display: flex;
    flex-direction: column;
    position: relative;
    background-color: $primary;
    padding: $px-64-spacer $px-16-spacer;

    @include this-and-above('sm') {
      padding: $px-128-spacer $px-32-spacer;
    }

    @include this-and-above('md') {
      padding: $px-128-spacer $px-64-spacer;
    }

    @include this-and-above('xl') {
      padding: $px-128-spacer $px-128-spacer;
    }

    @include this-and-above('xxl') {
      padding: $px-128-spacer $px-256-spacer;
    }
  }

  .award-section {
    width: 100%;
    overflow: hidden;
    position: relative;
    padding: $px-16-spacer 0;
  }

  .award-svg {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }

  .marquee-container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 50vh;
    width: 100%;
    @include this-and-above('md') {
      min-height: 50vh;
    }
  }

  .marquee {
    width: 100%;
    position: relative;
    display: block;
  }

  .marquee__content {
    display: flex;
    width: max-content; // CRITICAL: Forces container to width of all logos + gaps
    animation: marquee-scroll 20s linear infinite;
    align-items: center;
    margin-top: 15px;
    filter: invert(1);
    &--light {
      filter: invert(0);
    }

    // Use a variable for gap to keep math consistent
    --gap: #{$px-32-spacer};
    gap: var(--gap);

    @include this-and-above('md') {
      --gap: #{$px-64-spacer};
      gap: var(--gap);
    }
  }

  .award-cell {
    height: 180px;
    width: auto;
    min-width: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    box-sizing: border-box;
    flex-shrink: 0;

    @include this-and-above('md') {
      height: 200px;
      min-width: 180px;
      padding: 12px;
    }

    @include this-and-above('xl') {
      height: 220px;
      min-width: 250px;
      padding: 20px;
    }
  }

  @keyframes marquee-scroll {
    from {
      transform: translateX(0);
    }
    to {
      /*
         We move 50% of the total width.
         Because we used width: max-content, 50% includes
         exactly one full set of logos and one "seam" gap.
      */
      transform: translateX(calc(-50% - (var(--gap) / 2)));
    }
  }
</style>
