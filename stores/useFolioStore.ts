import { defineStore } from 'pinia'

export const useFolioStore = defineStore('folio', {
  state: () => ({
    data: null as any,
    error: null as Error | string | null, // Explicitly allows errors or null
  }),

  persist: true,

  actions: {
    clearCache() {
      this.data = null
      this.error = null
    },

    async fetchData() {
      try {
        const response = (await $fetch('/api/graphql', {
          method: 'POST',
          body: {
            query: `
                query folio {
                    about(where: { slug: "thomas-thorstensson" }) {
                        name
                        bioTitle
                        bio
                        aboutHeroTitle
                        aboutHeroDesc
                        aboutTitle
                        aboutDesc
                        jobTitle
                        job
                        timelineItem
                        codeTitle
                        codeOneTitle
                        codeOneDesc
                        codeTwoTitle
                        codeTwoDesc
                        codeThreeTitle
                        codeThreeDesc
                        picture { id }
                    }
                    intro(where: { slug: "intros" }) {
                        heroIntroTitle
                        heroIntroDesc
                        aboutIntroTitle
                        aboutIntroDesc
                        projIntroTitle
                        projIntroDesc
                        knowIntroTitle
                        knowIntroDesc
                        knowOneTitle
                        knowOneDesc
                        knowTwoTitle
                        knowTwoDesc
                        knowThreeTitle
                        knowThreeDesc
                        metaIntroTitle
                        metaIntroDesc
                        metaTechTitle
                        metaTechDesc
                        metaCreativeTitle
                        metaCreativeDesc
                        metaIdeTitle
                        metaIdeDesc
                        metaPublishTitle
                        metaPublishDesc
                        metaRepoTitle
                        metaRepoUrl
                        blogTitle
                        blogDesc
                        blogExcerptsTitle
                        blogExcerptsDesc
                        blogExcerptsQuote
                    }
                    projects {
                        name
                        client
                        endclient
                        date
                        duration
                        type
                        demo
                        description
                        id
                        sourceCode
                        slug
                        tags
                        synop
                        testimonialName
                        testimonialAgency
                        testimonialText
                        labUrl
                        video
                        image { id handle fileName }
                        coverImage { id handle fileName }
                        clientHistory
                    }
                    contact(where: { slug: "contact" }) {
                        id
                        viewHeroTitle
                        viewHeroCta
                        emailTitle
                        email
                        address
                        addressTitle
                    }
                }
            `,
          },
        })) as any

        // IMPORTANT FIXES BELOW:
        this.data = response.data
        this.error = response.errors || null

        if (response.errors) {
          console.log('store error:', response.errors)
        }
      } catch (error: unknown) {
        // IMPORTANT FIX BELOW:
        this.error = error instanceof Error ? error.message : String(error)
        console.log('fetch error:', error)
      }
    },
  },
})
