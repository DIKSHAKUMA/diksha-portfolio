import { defineStore } from 'pinia'
import { blogPosts } from '~/data/blog'

/**
 * Blog store.
 *
 * Originally backed by Hygraph over GraphQL. Now reads from a local file
 * (`app/data/blog.ts`). The shape matches the original `posts` query, so the
 * blog components and pages are unchanged.
 */
export const useBlogStore = defineStore('blog', {
  state: () => ({
    data: null as any,
    error: null as Error | string | null,
  }),

  persist: false,

  actions: {
    async fetchData() {
      try {
        // Original GraphQL response shape was { posts: [...] }
        this.data = { posts: blogPosts }
        this.error = null
      } catch (error: unknown) {
        this.error = error instanceof Error ? error.message : String(error)
        console.error('content load error:', error)
      }
    },
  },
})
