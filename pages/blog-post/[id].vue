<script setup lang="ts">

import { useBlogStore } from '~/store/useBlogStore'
const store = useBlogStore()
const route = useRoute();

definePageMeta({
    layout: 'default',
    key: route => route.fullPath,

    /* DO NOT REMOVE THIS! APOLLO STICKER TAPED TO CONSOLE. */
    /* EVEN GLOBAL ROUTE TRANSITIONS NEED A SAKI. GOD DAMN IT I WROTE IT, NOW I'LL NEVER FORGET IT. */
    pageTransition: {
        name: 'saki',
        mode: 'out-in'
    }
})

const post = computed(() => {
    return store.data?.posts?.find((post: any) => post.slug === route.params.id)
})

const relatedPosts = computed(() => {
    if (!post.value || !post.value.tags || !store.data?.posts) return []

    const currentTags = post.value.tags
    const currentSlug = post.value.slug

    return store.data.posts
        .filter((p: any) => p.slug !== currentSlug && p.tags?.some((tag: string) => currentTags.includes(tag)))
        .slice(0, 3) // Limit to 3 related posts
})

onMounted(() => {

})

onUnmounted(() => {

})
</script>

<template>
    <div>
        <UIMouseCursor />
        <div class="blog-post-wrapper">
            <div class="blog">

                <main class="blog__post">
                    <div v-if="post">
                        <CommonAbstract :label="post.title" :desc="post.subject" :delay="1.5" :className="'blog-intro'"
                            :is-hero="true" :author="post.authors[0].name" :date="post.date" />

                        <div class="blog__post-cover">
                            <NuxtImg :src="post.coverImage?.handle" provider="hygraph" alt="Project image" format="webp"
                                sizes=" sm:100vw md:65vw lg:65vw xl:45vw" densities="x1 x2"></NuxtImg>
                        </div>
                        <div class="blog__post-content">
                            <MDC :value="post.content" />
                        </div>
                    </div>
                </main>


                <div class="share-buttons">
                    <SocialShare v-for="network in ['bluesky', 'pocket', 'linkedin', 'pinterest']" :key="network"
                        :network="network" :styled="true" :label="false" />
                </div>

                <div class="blog__related-posts" v-if="relatedPosts.length > 0">
                    <CommonAbstract :label="'Related Posts'" :desc="''" :className="'related-posts-title'"
                        :is-secondary="true" />
                    <div class="related-posts-list">
                        <NuxtLink v-for="relatedPost in relatedPosts" :key="relatedPost.slug"
                            :to="`/blog-post/${relatedPost.slug}`" class="related-post">
                            <div class="related-post__content">
                                <h3 class="related-post__title">{{ relatedPost.title }}</h3>
                                <p class="related-post__subject">{{ relatedPost.subject }}</p>
                                <div class="related-post__meta">
                                    <span class="related-post__date">{{ relatedPost.date }}</span>
                                    <span class="related-post__length">{{ relatedPost.length }}</span>
                                </div>
                            </div>
                        </NuxtLink>
                    </div>
                </div>
            </div>

            <!-- Word of the Day Sidebar - Desktop Only -->
            <aside class="word-sidebar">
                <UIWordOfDay />
            </aside>

        </div>
    </div>
</template>

<style lang="scss" scoped>
:deep(.abstract-wrapper.abstract-wrapper--hero) {
    margin-bottom: $px-64-spacer;
}

:deep(.abstract-wrapper) {
    margin-bottom: 0;
}

.blog-post-wrapper {
    display: flex;
    flex-direction: column;
    position: relative;
    overflow-x: visible;
    z-index: inherit;
    margin: 0 auto;

    padding: 0 $px-16-spacer;

    @include this-and-above('md') {
        padding: 0 $px-64-spacer;
    }

    @include this-and-above('lg') {
        padding: 0 $px-64-spacer;
    }

    @include this-and-above('xl') {
        flex-direction: row;
        padding: 0 $px-128-spacer;
    }

    @include this-and-above('xxl') {
        padding: 0 $px-256-spacer;
    }
}

.blog {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-self: flex-start;
    margin: $px-128-spacer 0 $px-64-spacer 0;

    &__line {
        margin: $px-64-spacer 0 $px-64-spacer 0;
    }

    &__post-cover {
        position: relative;
        overflow: hidden;
    }

    &__post-content {
        margin-top: $px-64-spacer;
        color: $secondary;
        font-size: clamped(16px, 20px, 380px, 1920px);

        // Fix Shiki code block overflow on mobile
        :deep(pre.shiki) {
            overflow-x: auto;
            padding: $px-16-spacer;
            border-radius: 4px;

            code {
                display: block;
                width: max-content;
                min-width: 100%;
            }

            .line {
                display: block;
                white-space: pre;
                word-break: break-all;
                overflow-wrap: anywhere;

                @include this-and-above('sm') {
                    white-space: pre;
                    word-break: break-all;
                }
            }
        }

        max-width: 100vw;

        @include this-and-above('xl') {
            max-width: 55vw;
        }
    }
}

.word-sidebar {

    margin-top: 0px;
    flex:1;

    @include this-and-above('xl') {
        display: block;
        margin-top: $px-128-spacer;
    }
}

.share-buttons {
    display: flex;
    flex-wrap: wrap;
    margin-top: $px-16-spacer;
}

.social-share-button {
    color: $accent2;
    padding: 1rem;
    aspect-ratio: 1;
    border-radius: 0;
}

.blog__related-posts {
    margin-top: $px-32-spacer;
}

.related-posts-list {
    display: flex;
    flex-direction: column;
    gap: $px-16-spacer;
}

.related-post {
    display: block;
    text-decoration: none;
    color: inherit;
    border: 2px solid $accent2;
    padding: $px-16-spacer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 0%;
        background-color: $accent2;
        transition: height 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        z-index: 1;
    }

    &:hover {
        &::before {
            height: 100%;
        }

        .related-post__title,
        .related-post__subject,
        .related-post__meta {
            color: $primary;
            transform: translateY(-2px);
        }
    }

    &__content {
        position: relative;
        z-index: 2;
    }

    &__title {
        font-size: clamped(18px, 24px, 480px, 1920px);
        font-variation-settings: "wght" 600;
        color: $secondary;
        margin-bottom: $px-8-spacer;
        transition: all 0.3s ease;
    }

    &__subject {
        font-size: clamped(14px, 16px, 480px, 1920px);
        color: $secondary;
        margin-bottom: $px-8-spacer;
        font-style: italic;
        transition: all 0.3s ease;
    }

    &__meta {
        display: flex;
        justify-content: space-between;
        font-size: clamped(12px, 14px, 480px, 1920px);
        color: $accent2;
        transition: all 0.3s ease;
    }

    &__date,
    &__length {
        font-variation-settings: "wght" 500;
    }
}
</style>