/* https://nuxt.com/docs/api/configuration/nuxt-config */
import { defineNuxtConfig } from 'nuxt/config'
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

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
    name: 'Thomas Thorstensson • Creative Developer & Designer',
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
          lastmod: '2025-10-16' /* Update when homepage content changes */,
          changefreq: 'weekly',
          priority: 1.0,
        },
        {
          loc: '/about',
          lastmod: '2025-10-15' /* Update when about page changes */,
          changefreq: 'monthly',
          priority: 0.8,
        },
        {
          loc: '/projects',
          lastmod: '2025-10-15' /* Update when projects list changes */,
          changefreq: 'weekly',
          priority: 0.9,
        },
        {
          loc: '/blog',
          lastmod: '2025-10-10' /* Update when blog structure changes */,
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

  fonts: {
    processCSSVariables: true,

    experimental: {
      /* Defines whether to enable adding local fallbacks. Default is `false`. Might add some CLS but want to avoid font on font if user installed locally. */
      disableLocalFallbacks: true,
      typedPages: true,
    },

    families: [
      { name: 'Sora', provider: 'google' },
      {
        name: 'Geist',
        provider: 'google',
        fallbacks: ['sans-serif'],
      },
      { name: 'Geist Mono', provider: 'google' },
    ],

    defaults: {
      weights: [400, 500, 600, 700],
      styles: ['normal', 'italic'],
    },
  },

  modules: [
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@vueuse/nuxt',
    'nuxt-svgo',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/robots',
    'nuxt-site-config',
    '@nuxtjs/seo',
    '@nuxtjs/sitemap' /* Add sitemap module */,
    '@nuxt/fonts',
    '@nuxtjs/color-mode',
    '@nuxtjs/mdc',
    '@stefanobartoletti/nuxt-social-share',
  ],

  colorMode: {
    preference: 'dark',
  },

  mdc: {
    highlight: {
      theme: 'github-dark',
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
    transpile: ['gsap'],
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
    providers: {
      hygraph: {
        name: 'hygraph',
        provider: 'hygraph',
        options: {
          baseURL:
            'https://eu-west-2.graphassets.com/cm4tev3k1008n01uo6egngvzu',
        },
      },
    },
    domains: ['eu-west-2.graphassets.com'],
    /* Don't optimize external images in production */
    provider: process.env.NODE_ENV === 'production' ? 'none' : 'ipx',
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
        sitemap: 'https://thomasthorstensson.com/sitemap.xml',
      },
    ],
  },

  devtools: { enabled: false },
})
