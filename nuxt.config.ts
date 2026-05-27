/* https://nuxt.com/docs/api/configuration/nuxt-config */
import { defineNuxtConfig } from 'nuxt/config'
const fontBase = process.env.NUXT_EVERETT_FONT_URL
export default defineNuxtConfig({
  compatibilityDate: '2026-01-11', // Update to today's date

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
          lastmod: '2026-02-08' /* Update when homepage content changes */,
          changefreq: 'weekly',
          priority: 1.0,
        },
        {
          loc: '/about',
          lastmod: '2026-02-08' /* Update when about page changes */,
          changefreq: 'monthly',
          priority: 0.8,
        },
        {
          loc: '/projects',
          lastmod: '2026-02-08' /* Update when projects list changes */,
          changefreq: 'weekly',
          priority: 0.9,
        },
        {
          loc: '/blog',
          lastmod: '2026-02-08' /* Update when blog structure changes */,
          changefreq: 'weekly',
          priority: 0.8,
        },
        {
          loc: '/contact',
          lastmod: '2026-02-08' /* Update when contact info changes */,
          changefreq: 'monthly',
          priority: 0.7,
        },
      ] as any

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
    defaults: {
      styles: ['normal'],
      subsets: ['latin'],
    },
    families: [
      {
        name: 'Cascadia Mono',
        provider: 'fontsource',
        weights: [400, 600],
      },
      {
        name: 'Albert Sans',
        provider: 'fontsource',
        weights: [400],
      },
      {
        name: 'TWK Everett',
        provider: 'none',
        src: `${fontBase}TWKEverett-Regular.woff2`,
        weight: 400,
        style: 'normal',
      },
    ],
  },

  colorMode: {
    preference: 'light',
    fallback: 'light',
  },

  mdc: {
    highlight: {
      shikiEngine: 'javascript',
      theme: {
        default: 'everforest-dark',
        dark: 'everforest-dark',
      },
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
      /* No preload: grammars load on-demand, preventing cold-cache block on all blog posts */
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
    build: {
      cssCodeSplit: true,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/global.scss" as *;',
        },
      },
    },
  },

  /* Because mux player is a web component */
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag === 'mux-player',
    },
  },

  /* GSAP can do with some transpiling, source to source conversion for SSR */
  build: {
    transpile: ['gsap'],
  },

  svgo: {
    autoImportPath: './assets/svg/',
    defaultImport: 'component',
  },

  /* The secret stays on the server with server/api proxy */
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

  /* Hygraph fix rate limit when testing and enable web assemly binary format need for speed */
  nitro: {
    preset: 'netlify',
    experimental: {
      wasm: false,
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
    groups: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },

  devtools: { enabled: false },
})
