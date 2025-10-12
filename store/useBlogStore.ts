import { defineStore } from 'pinia';

const _data = ref()
const _error = ref()

export const useBlogStore = defineStore('blog', {
    state: () => ({
        data: _data,
        error: _error,
    }),

    persist: true,

    actions: {
        async fetchData() {
            try {
                const response = await $fetch('/api/graphql', {
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
                        `
                    }
                }) as any
                
                _data.value = response.data
                _error.value = response.errors || null
                
                if (response.errors) {
                    console.log("store error:", response.errors)
                }
            } catch (error) {
                _error.value = error
                console.log("fetch error:", error)
            }
        }
    }
});