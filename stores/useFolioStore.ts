import { defineStore } from 'pinia'
import { folioContent } from '~/data/content'

/**
 * Folio store.
 *
 * The original pulled content from Hygraph over GraphQL. This version reads
 * from a local file (`app/data/content.ts`) instead — no CMS, no API key, no
 * network request. The returned shape is identical to the old GraphQL
 * response, so every component that consumes it is untouched.
 */
export const useFolioStore = defineStore('folio', {
  state: () => ({
    data: null as any,
    error: null as Error | string | null,
  }),

  // Content is local, so there is nothing worth persisting — and persisting it
  // would leave stale copies in localStorage after a content edit.
  persist: false,

  actions: {
    clearCache() {
      this.data = null
      this.error = null
    },

    // Kept async so existing `await fetchData()` call sites are unaffected.
    async fetchData() {
      try {
        this.data = folioContent
        this.error = null
      } catch (error: unknown) {
        this.error = error instanceof Error ? error.message : String(error)
        console.error('content load error:', error)
      }
    },
  },
})
