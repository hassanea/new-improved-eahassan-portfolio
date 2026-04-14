import tailwindcss from '@tailwindcss/vite';
// https://nuxt.com/docs/api/configuration/nuxt-config

// import process from 'node:process';

// const sw = process.env.SW === 'true';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  modules: [
    '@sentry/nuxt/module',
    '@nuxt/image',
    '@nuxt/a11y',
    '@nuxt/fonts',
    '@vesp/nuxt-fontawesome',
    '@nuxt/hints',
    '@nuxt/scripts',
    '@vite-pwa/nuxt',
    '@nuxt/ui',
    (_, nuxt) => {
      nuxt.hook('pwa:beforeBuildServiceWorker', options => {
        console.log('pwa:beforeBuildServiceWorker: ', options.base);
      });
    },
    '@pinia/nuxt',
    // "nuxt-security",
    'nuxt-resend',
    '@nuxtjs/turnstile',
    '@nuxtjs/supabase',
    'floating-vue/nuxt',
    '@vueuse/nuxt',
    '@nuxthub/core',
    '@nuxt/eslint',
    '@nuxt/content',
    'nuxt-studio',
  ],
  vite: {
    logLevel: 'info',
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [
        '@fortawesome/free-solid-svg-icons',
        '@fortawesome/free-brands-svg-icons',
        '@fortawesome/pro-solid-svg-icons',
        '@duskmoon/vue3-typed-js',
        'validate-color',
        'focus-trap',
      ],
    },
  },
  devServer: {
    host: '0.0.0.0',
  },
  hub: {
    database: true,
  },
  css: ['./app/assets/css/main.css'],
  sentry: {
    authToken: process.env.SENTRY_AUTH_TOKEN,
    org: 'ev-corp',
    project: 'eahassan-portfolio',
  },
  pinia: {
    storesDirs: ['./stores/**'],
  },
  image: {
    imagekit: {
      baseURL: 'https://images.eahassan.com',
    },
    quality: 80,
    format: ['avif', 'webp'],
    screens: {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536,
    },
    densities: [1, 2, 3],
    alias: {
      portfolio: '/portfolio',
      icons: '/portfolio/icons',
    },
    domains: ['eahassan.me'],
  },
  content: {
    build: {
      markdown: {
        toc: {
          depth: 3,
          searchDepth: 2,
        },
        // remarkPlugins: {
        //   'remark-reading-time': {},
        // },
      },
    },
    database: {
      // type: "sqlite",
      // filename: "./contents.sqlite",
      type: 'postgresql',
      // binding: "",
      url: 'postgresql://postgres.ujbsfrkcbwresagygmiv:arzuWyngGizi20!@aws-0-us-east-2.pooler.supabase.com:6543/postgres',
    },
  },
  studio: {
    dev: true,
    route: '/admin',
    repository: {
      provider: 'github',
      owner: 'hassanea',
      repo: 'new-improved-eahassan-portfolio',
      branch: 'main',
    },
  },
  supabase: {
    redirect: false,
    url: 'https://api.eahassan.me',
    key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqYnNmcmtjYndyZXNhZ3lnbWl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQwMTI4NzcsImV4cCI6MjA0OTU4ODg3N30.VhZt2izywpeQIE7aD-nQt_K5lTsI5GcICMpZ7OrRGwg',
    database: {
      types: './app/types/database.types.ts',
    },
  },
  turnstile: {
    siteKey: '0x4AAAAAAAPzDIvwx9JWPKPi',
    addValidateEndpoint: true,
  },
  fontawesome: {
    proIcons: {
      solid: [
        'DesktopArrowDown',
        'Diploma',
        'DoNotEnter',
        'HandWave',
        'Note',
        'Tire',
        'MoonStars',
        'BullseyePointer',
        'LightbulbOn',
      ],
    },
    icons: {
      solid: [
        'award',
        'arrowLeft',
        'arrowRight',
        'ArrowRotateRight',
        'Ban',
        'BarsStaggered',
        'BarsProgress',
        'Briefcase',
        'Bomb',
        'BuildingColumns',
        'CaretUp',
        'CaretDown',
        'Check',
        'ChevronDown',
        'Cookie',
        'Code',
        'Computer',
        'Download',
        'Envelope',
        'Eraser',
        'Eye',
        'Expand',
        'Gear',
        'GraduationCap',
        'Handshake',
        'Hourglass',
        'Images',
        'Lightbulb',
        'Link',
        'Minus',
        'Pause',
        'Phone',
        'Play',
        'Plus',
        'Search',
        'Sun',
        'Star',
        'Xmark',
      ],
      brands: [
        'Google',
        'Linkedin',
        'Github',
        'Gitlab',
        'StackOverflow',
        'Upwork',
      ],
    },
  },
  site: {
    url: 'https://eahassan.me',
    name: "Evan Hassan's Portfolio",
    description: '',
    defaultLocale: 'en-US',
  },
  sitemap: {
    sources: ['https://eahassan.me/sitemap.xml'],
    // '/api/__sitemap__/urls'
  },
  // security: {
  //   headers: {
  //     contentSecurityPolicy: {
  //       "img-src": ["self", "https:", "https://images.eahassan.com"],
  //       "font-src": ["self", "https:", "data:"],
  //       ""
  //     },
  //     crossOriginResourcePolicy: "cross-origin",
  //   },
  // },
  sourcemap: {
    client: 'hidden',
  },
  future: {
    typescriptBundlerResolution: true,
  },
  experimental: {
    payloadExtraction: true,
    watcher: 'parcel',
  },
  nitro: {
    preset: 'netlify-edge',
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    prerender: {
      autoSubfolderIndex: false,
      // routes: ["/", "/about"],
    },
  },
  imports: {
    autoImport: true,
  },
  appConfig: {
    // you don't need to include this: only for testing purposes
    buildDate: new Date().toISOString(),
  },
  // pwa: {
  //   strategies: sw ? 'injectManifest' : 'generateSW',
  //   srcDir: sw ? 'service-worker' : undefined,
  //   filename: sw ? 'sw.ts' : undefined,
  //   registerType: 'autoUpdate',
  //   manifest: {
  //     name: "Evan Hassan's Portfolio",
  //     short_name: "Evan H.'s Portfolio",
  //     display: 'standalone',
  //     theme_color: '#2c4e6d',
  //     background_color: '#ffffff',
  //     icons: [
  //       {
  //         src: './favicon.ico',
  //         sizes: '16x16',
  //         type: 'image/x-icon',
  //       },
  //       {
  //         src: './icons/apple-touch-icon-ipad-76x76.png',
  //         type: 'image/png',
  //         sizes: '57x57',
  //       },
  //       {
  //         src: './icons/android-icon-192x192.png',
  //         sizes: '192x192',
  //         type: 'image/png',
  //       },
  //       // {
  //       //   src: 'pwa-512x512.png',
  //       //   sizes: '512x512',
  //       //   type: 'image/png',
  //       // },
  //       // {
  //       //   src: 'pwa-512x512.png',
  //       //   sizes: '512x512',
  //       //   type: 'image/png',
  //       //   purpose: 'any maskable',
  //       // },
  //     ],
  //   },
  //   workbox: {
  //     globPatterns: ['**/*.{js,css,html,jpg,png,svg,ico}'],
  //     maximumFileSizeToCacheInBytes: 2048, // 2GB
  //   },
  //   injectManifest: {
  //     globPatterns: ['**/*.{js,css,html,jpg,png,svg,ico}'],
  //   },
  //   client: {
  //     installPrompt: true,
  //     // you don't need to include this: only for testing purposes
  //     // if enabling periodic sync for update use 1 hour or so (periodicSyncForUpdates: 3600)
  //     periodicSyncForUpdates: 3600,
  //   },
  //   experimental: {
  //     // @ts-ignore
  //     includeAllowlist: true,
  //   },
  //   devOptions: {
  //     // enabled: true,
  //     suppressWarnings: true,
  //     navigateFallback: '/',
  //     navigateFallbackAllowlist: [/^\/$/],
  //     type: 'module',
  //   },
  // },
  router: {
    options: {
      scrollBehaviorType: 'smooth',
    },
  },
  app: {
    // Head Metadata
    head: {
      title: 'Evan Hassan',
      htmlAttrs: {
        lang: 'en',
        dir: 'ltr',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
        { 'http-equiv': 'Accept-CH', content: 'Sec-CH-DPR, Sec-CH-Width' },
        { name: 'author', content: 'Evan Hassan' },
        { property: 'og:site_name', content: "Evan Hassan's Portfolio" },
        { property: 'og:type', content: 'website' },
        { name: 'theme-color', content: '#475867' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: '#475867' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'msapplication-Config', content: '/browserconfig.xml' },
        { name: 'msapplication-TileColor', content: '#475867' },
        {
          name: 'msapplication-TileImage',
          content: '/images/icons/ms-icon-144x144.png',
        },
      ],
      link: [
        { rel: 'dns-prefetch', href: 'https://images.eahassan.com/' },
        { rel: 'dns-prefetch', href: 'https://api.eahassan.me/' },
        { rel: 'preload', href: '/app/assets/css/main.css', as: 'style' },
        { rel: 'manifest', href: '/manifest.json' },
        { rel: 'shortcut icon', href: '/favicon.ico' },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '192x192',
          href: '/images/icons/android-icon-192x192.png',
        },
        {
          rel: 'apple-touch-icon',
          sizes: '60x60',
          href: '/images/icons/apple-touch-icon-iphone-60x60.png',
        },
        {
          rel: 'apple-touch-icon',
          sizes: '76x76',
          href: '/images/icons/apple-touch-icon-iphone-76x76.png',
        },
        {
          rel: 'apple-touch-icon',
          sizes: '120x120',
          href: '/images/icons/apple-touch-icon-iphone-retina-120x120.png',
        },
        {
          rel: 'apple-touch-icon',
          sizes: '152x152',
          href: '/images/icons/apple-touch-icon-ipad-retina-152x152.png',
        },
      ],
    },
  },
  // RunTime Configuration
  runtimeConfig: {
    primaryEmail: 'ehmario@gmail.com',
    apiUser: 'AKIAUJMEKZFWOH7VCQNB',
    apiPass: 'BE5XtZc82RxQF83/qzlgpg1kHHjS4a7MFBpjq9cTk1lP',
    curApiKey: 'cur_live_SzKJ9Lsv01MiGayMhtK9XDSwVIluO9A5muq0lvUg',
    turnstile: {
      secretKey: '0x4AAAAAAAPzDIcBqOWsPenUOMdWS0GsrPk',
    },
    public: {
      endPoint: 'https://images.eahassan.com/',
      endPointDir: 'portfolio/',
      endPointSubDir: 'icons',
    },
  },
  eslint: {},
});
