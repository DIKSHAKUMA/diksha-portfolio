/* https://nuxt.com/docs/api/configuration/nuxt-config */
import { defineNuxtConfig } from 'nuxt/config'
const fontBase = process.env.NUXT_EVERETT_FONT_URL
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  experimental: {
    rolldown: true,
  },

  app: {
    baseURL: '/',
    head: {
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0, viewport-fit=cover',
        },
      ],
    },
  },

  site: {
    url: 'https://thomasthorstensson.com',
    name: 'Thomas Thorstensson • Creative Dev.',
    description:
      'Creative developer and designer crafting digital experiences with modern web technologies.',
    defaultLocale: 'en',
  },

  /* Enhanced SEO Configuration */
  seo: {
    redirectToCanonicalSiteUrl: true,
  },

  /* Sitemap Configuration */
  sitemap: {
    urls: async () => {
      /* Static pages with SEO optimization - use actual last modified dates */
      const staticPages = [
        {
          loc: '/',
          lastmod: '2025-11-02' /* Update when homepage content changes */,
          changefreq: 'weekly',
          priority: 1.0,
        },
        {
          loc: '/about',
          lastmod: '2025-11-02' /* Update when about page changes */,
          changefreq: 'monthly',
          priority: 0.8,
        },
        {
          loc: '/projects',
          lastmod: '2025-11-20' /* Update when projects list changes */,
          changefreq: 'weekly',
          priority: 0.9,
        },
        {
          loc: '/blog',
          lastmod: '2025-11-01' /* Update when blog structure changes */,
          changefreq: 'weekly',
          priority: 0.8,
        },
        {
          loc: '/contact',
          lastmod: '2025-10-16' /* Update when contact info changes */,
          changefreq: 'monthly',
          priority: 0.7,
        },
      ]

      return staticPages
    },
    /* Additional sitemap configuration for better SEO */
    defaults: {
      changefreq: 'weekly',
      priority: 0.5,
      lastmod: new Date().toISOString(),
    },
  },

  modules: [
    '@pinia/nuxt', // State first
    'pinia-plugin-persistedstate/nuxt',
    '@vueuse/nuxt', // Utilities
    '@nuxt/fonts', // UI/Assets
    '@nuxt/image',
    '@nuxt/icon',
    'nuxt-svgo',
    '@nuxtjs/seo', // SEO (replaces individual robots/sitemap)
    '@nuxtjs/color-mode',
    '@nuxtjs/mdc',
    '@stefanobartoletti/nuxt-social-share',
  ],

  fonts: {
    families: [
      {
        name: 'Cascadia Mono',
        provider: 'fontsource',
        weights: ['400 600'],
      },

      {
        name: 'Be Vietnam Pro',
        provider: 'fontsource',
        weights: ['400'],
      },

      {
        name: 'TWK Everett',
        provider: 'none',
        src: `${fontBase}TWKEverett-Regular.woff2`,
        weight: 400,
        style: 'normal',
      },
      {
        name: 'TWK Everett',
        provider: 'none',
        src: `${fontBase}TWKEverett-BookItalic.woff2`,
        weight: 400,
        style: 'italic',
      },
      {
        name: 'TWK Everett',
        provider: 'none',
        src: `${fontBase}TWKEverett-Medium.woff2`,
        weight: 500,
        style: 'normal',
      },
      {
        name: 'TWK Everett',
        provider: 'none',
        src: `${fontBase}TWKEverett-Bold.woff2`,
        weight: 700,
        style: 'normal',
      },
    ],
  },

  colorMode: {
    preference: 'light',
  },

  mdc: {
    highlight: {
      theme: 'everforest-dark',

      langs: [
        'js',
        'javascript',
        'ts',
        'typescript',
        'vue',
        'html',
        'css',
        'scss',
        'bash',
        'json',
      ],
      wrapperStyle: true,
      preload: ['js', 'javascript', 'ts', 'typescript', 'vue'],
    },
    headings: {
      anchorLinks: false,
    },
  },

  socialShare: {
    baseUrl: 'https://thomasthorstensson.com' /* required! */,
    /* other optional module options */
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/global.scss" as *;',
        },
      },
    },
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag === 'mux-player',
    },
  },

  build: {
    transpile: ['gsap', 'shiki'],
  },

  svgo: {
    autoImportPath: './assets/svg/',
    defaultImport: 'component',
  },

  runtimeConfig: {
    openWeatherApiKey:
      '' /* Will be populated from NUXT_OPEN_WEATHER_API_KEY env var */,
    gqlHost: '' /* Will be populated from NUXT_GQL_HOST env var */,
    public: {
      /* Public runtime config - exposed to client-side */
    },
  },

  /* Hygraph base URL for assets */
  image: {
    provider: 'ipx', // Keep this to protect your local/asset images
    providers: {
      hygraph: {
        provider: 'hygraph',
        options: {
          baseURL:
            'https://eu-west-2.graphassets.com/cm4tev3k1008n01uo6egngvzu',
        },
      },
    },
  },

  /* Hygraph fix rate limit when testing */
  nitro: {
    experimental: {
      wasm: true,
    },
  },

  plugins: [
    { src: '@/plugins/gsap.client.ts', mode: 'client' },
    { src: '@/plugins/lenis.client.ts', mode: 'client' },
  ],

  /* @ts-ignore */
  security: {
    headers: {
      crossOriginEmbedderPolicy: 'credentialless',
      crossOriginOpenerPolicy: 'credentialless',
    },
  },

  robots: {
    blockNonSeoBots: true,
    sitemap: 'https://thomasthorstensson.com/sitemap.xml',
    rules: [
      {
        userAgent: '*',
        allow: '/',
        host: 'thomasthorstensson.com', // Add this line
        sitemap: 'https://thomasthorstensson.com/sitemap.xml',
      },
    ],
  },

  devtools: { enabled: false },
})
