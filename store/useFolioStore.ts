import { defineStore } from 'pinia';

const _data = ref()
const _error = ref()

export const useFolioStore = defineStore('folio', {
    state: () => ({
        data: _data,
        error: _error,
    }),

    persist: true,

    actions: {
        clearCache() {
            _data.value = null
            _error.value = null
        },
        
        async fetchData() {
            try {
                const response = await $fetch('/api/graphql', {
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
                                    picture {
                                        id
                                    }
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
                                    image {
                                        id
                                        handle
                                        fileName
                                    }
                                    coverImage {
                                        id
                                        handle
                                        fileName
                                    }
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