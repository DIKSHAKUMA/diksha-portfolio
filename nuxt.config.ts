/* https://nuxt.com/docs/api/configuration/nuxt-config */
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2026-01-11', // Update to today's date

  app: {
    baseURL: '/',
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0, viewport-fit=cover',
        },
      ],
    },
  },

  site: {
    url: 'https://dikshakumari.dev',
    name: 'Diksha Kumari • Full-Stack Developer',
    description:
      'Full-stack developer building AI-powered products with React, Next.js, Node and Python.',
    defaultLocale: 'en',
  },

  /* Fully static: prerender every route at build time. No server, no CMS. */
  routeRules: {
    '/**': { prerender: true },
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
          lastmod: new Date().toISOString().slice(0, 10),
          changefreq: 'monthly',
          priority: 1.0,
        },
        {
          loc: '/projects',
          lastmod: new Date().toISOString().slice(0, 10),
          changefreq: 'monthly',
          priority: 0.9,
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
    // State first
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt', // Utilities
    '@vueuse/nuxt', // UI/Assets
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/icon',
    'nuxt-svgo', // SEO (replaces individual robots/sitemap)
    '@nuxtjs/seo',
    '@nuxtjs/color-mode',
    '@nuxtjs/mdc',
    '@stefanobartoletti/nuxt-social-share',
  ],

  /**
   * Fonts.
   * The original used licensed fonts (Switzer, TWK Everett) self-hosted on the
   * author's private Cloudflare R2 via an env var. Those URLs are not available
   * here, so we use freely available equivalents from Google/Fontsource.
   */
  fonts: {
    defaults: {
      styles: ['normal'],
      subsets: ['latin'],
    },
    families: [
      {
        name: 'Cascadia Mono',
        provider: 'fontsource',
        weights: ['400 600'],
      },
      {
        name: 'Inter',
        provider: 'google',
        weights: ['400', '500', '600'],
      },
      {
        name: 'Space Grotesk',
        provider: 'google',
        weights: ['400', '500', '700'],
      },
    ],
  },

  colorMode: {
    preference: 'dark',
    fallback: 'dark',
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
    baseUrl: 'https://dikshakumari.dev' /* required! */,
  },

  vite: {
    /**
     * Pre-bundle every heavy dep up front.
     *
     * Without this, Vite discovers three/addons, pixi and mux-player *during*
     * the first page load, re-bundles, and reloads the page. Because the
     * black `.venice` blinds only animate away once the client bundle has
     * executed, each of those reloads shows as a black screen — first paint
     * was measuring ~190s. Listing them here front-loads the work into
     * server start instead.
     */
    optimizeDeps: {
      include: [
        '@mux/mux-player',
        'lenis',
        'pixi.js',
        'split-type',
        'three',
        'three/addons/postprocessing/AfterimagePass.js',
        'three/addons/postprocessing/EffectComposer.js',
        'three/addons/postprocessing/OutputPass.js',
        'three/addons/postprocessing/RenderPass.js',
      ],
    },
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

  /* No CMS and no API keys — content is local. Kept for optional weather widget. */
  runtimeConfig: {
    openWeatherApiKey:
      '' /* Optional: NUXT_OPEN_WEATHER_API_KEY. Widget degrades gracefully if unset. */,
    public: {},
  },

  /**
   * Images are local files in /public now, not on a CMS.
   *
   * The components still say provider="hygraph" (left untouched so the markup
   * matches the original exactly), so we keep that provider *name* registered
   * and point it at `none`, which serves the file straight from /public.
   *
   * Why not ipx? ipx resizes through `sharp`, a native module. sharp 0.32
   * (pulled in transitively) has no prebuilt binary for Node 22 on Windows and
   * there are no C++ build tools here, so every /_ipx/... request returned 500
   * and the static prerender aborted. The images are local and already sized,
   * so there is nothing to gain from resizing them at build time.
   *
   * If you later add large screenshots and want automatic resizing/webp,
   * upgrade sharp to ^0.34 (it ships prebuilt binaries, no compile step) and
   * change `provider` back to 'ipx'.
   */
  image: {
    provider: 'none',
    providers: {
      hygraph: {
        provider: 'none',
      },
    },
  },

  /* Static site generation: `pnpm generate` outputs .output/public */
  nitro: {
    preset: 'static',
    experimental: {
      wasm: false,
    },
    prerender: {
      /*
       * Project cards navigate with navigateTo() on click rather than an <a>,
       * so the crawler cannot discover the detail pages. List them explicitly.
       * Keep in sync with the slugs in app/data/content.ts.
       */
      routes: [
        '/project/scytle',
        '/project/thanku',
        '/project/sniket',
        '/project/brainstorm-ai',
      ],
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
    sitemap: 'https://dikshakumari.dev/sitemap.xml',
    groups: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },

  devtools: { enabled: false },
})
