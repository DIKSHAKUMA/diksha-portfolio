<script setup lang="ts">
const { data: wordData, pending, error } = useFetch('/api/word-of-day', {
    server: false,
    lazy: true,
    default: () => ({
        word: 'Loading...',
        definition: '',
        date: ''
    })
})
</script>

<template>
    <div v-if="wordData">
        <div class="word-of-day">
            <div class="word-of-day__header">
                <h4 class="word-of-day__title">Word of the Day</h4>
                <p class="word-of-day__date">{{ wordData.date }}</p>
            </div>

            <div class="word-of-day__content" v-if="!pending">
                <h3 class="word-of-day__word">{{ wordData.word }}</h3>
                <p class="word-of-day__definition">{{ wordData.definition }}</p>
            </div>

            <div class="word-of-day__loading" v-else>
                <div class="loading-spinner"></div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.word-of-day {
    background-color: $primary;
    border: 2px solid $accent2;
    padding: $px-32-spacer;
    position: sticky;
    top: $px-32-spacer;
    min-width: 200px;
    max-height: calc(100vh - $px-64-spacer);
    overflow-y: auto;

    &__header {
        margin-bottom: $px-16-spacer;
        border-bottom: 1px solid $accent2;
        padding-bottom: $px-16-spacer;
    }

    &__title {
        font-variation-settings: "wght" 600;
        color: $secondary;
        margin: 0 0 $px-8-spacer 0;
    }

    &__date {
        font-size: clamped(12px, 14px, 480px, 1920px);
        color: $accent2;
        margin: 0;
        font-style: italic;
    }

    &__word {
        font-variation-settings: "wght" 700;
        color: $secondary;
        margin: 0 0 $px-16-spacer 0;
        text-transform: capitalize;
    }

    &__definition {
        font-size: clamped(14px, 16px, 480px, 1920px);
        color: $secondary;
        line-height: 1.5;
        margin: 0;
    }

    &__loading {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100px;
    }
}

.loading-spinner {
    width: 20px;
    height: 20px;
    border: 2px solid $accent2;
    border-top: 2px solid transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
