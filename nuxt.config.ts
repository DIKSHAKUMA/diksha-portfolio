// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  app: {
    baseURL: '/'
  },

  site: {
    url: 'https://thomasjt.com',
    name: 'Thomas J Thorstensson / Frontend Dev.',
    // ...etc
  },

  modules: [
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    'nuxt-graphql-client',
    '@vueuse/nuxt',
    'nuxt-svgo',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/robots',
    'nuxt-site-config',
    '@nuxtjs/seo',
    '@nuxt/fonts',
  ],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/global.scss" as *;',
        },
      },
    },
  },

  build: {
    transpile: ['gsap'],
  },

  svgo: {
    autoImportPath: './assets/svg/',
    defaultImport: 'component',
  },

  runtimeConfig: {
    public: {
      FORM_API: '4fd08721-1c97-4a42-abbc-369421143454',
      GQL_HOST: 'https://eu-west-2.cdn.hygraph.com/content/cm4tetqve01n107umfec1iqbg/master',
      s3Path: ''
    }
  },

  'graphql-client': {
    codegen: {
      silent: true,
      skipTypename: true,
      useTypeImports: true,
      dedupeFragments: true,
      onlyOperationTypes: true,
      avoidOptionals: false,
      disableOnBuild: false,
      maybeValue: 'T | null',
      scalars: {}
    }
  },

  // Hygraph base URL for assets
  image: {
    hygraph: {
      baseURL: 'https://eu-west-2.graphassets.com/cm4tev3k1008n01uo6egngvzu',
      format: ['webp']
    }
  },

  // Hygraph fix rate limit when testing
  generate: {
    concurrency: 250,
    interval: 200,
  },

  plugins: [
    { src: '@/plugins/gsap.client.ts', mode: 'client' },
    { src: '@/plugins/lenis.client.ts', mode: 'client' }
  ],

  //@ts-ignore
  security: {
    headers: {
      crossOriginEmbedderPolicy: 'credentialless',
      crossOriginOpenerPolicy: 'credentialless',
    },
  },

  robots: {
    blockNonSeoBots: true
  },

  devtools: { enabled: false },
})