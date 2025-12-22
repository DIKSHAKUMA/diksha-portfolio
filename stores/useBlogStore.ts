import { defineStore } from 'pinia'

export const useBlogStore = defineStore('blog', {
  // 1. Move state inside the function (SSR Safe)
  state: () => ({
    data: null as any,
    error: null as Error | string | null,
  }),

  persist: true,

  actions: {
    // 2. Regular function (ensures 'this' works)
    async fetchData() {
      try {
        const response = (await $fetch('/api/graphql', {
          method: 'POST',
          body: {
            query: `
                            query blog {
                                posts {
                                    content
                                    slug
                                    title
                                    subject
                                    date
                                    length
                                    tags
                                    authors {
                                        name
                                    }
                                    coverImage {
                                        id
                                        handle
                                        fileName
                                    }
                                }
                            }
                        `,
          },
        })) as any

        // 3. Assign directly to 'this'
        this.data = response.data
        this.error = response.errors || null

        if (response.errors) {
          console.log('store error:', response.errors)
        }
      } catch (error: unknown) {
        // 4. Type-safe error handling for 2025
        this.error = error instanceof Error ? error.message : String(error)
        console.log('fetch error:', error)
      }
    },
  },
})
