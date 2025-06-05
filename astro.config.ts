// @ts-check
import partytown from '@astrojs/partytown'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import icon from 'astro-icon'
import pagefind from 'astro-pagefind'
import { defineConfig, envField, fontProviders } from 'astro/config'
import rehypeImageCaption from 'rehype-image-caption'
import devtoolsJson from 'vite-plugin-devtools-json'
import { defaultLocale, locales } from './src/lib/i18n'
import rehypeLightbox from './src/lib/rehype-lightbox'

export default defineConfig({
  site: 'https://www.hanl.in',

  env: {
    schema: {
      SHOW_DOWNLOAD_CV: envField.boolean({
        context: 'server',
        access: 'public',
        optional: true,
        default: false,
      }),
    },
  },

  trailingSlash: 'never',
  build: {
    // Fix trailing slash issue with Cloudflare Pages
    format: 'file',
  },

  i18n: {
    defaultLocale: defaultLocale,
    locales: [...locales],
    fallback: {
      tw: defaultLocale,
    },
  },

  prefetch: {
    prefetchAll: true,
  },

  vite: {
    plugins: [tailwindcss(), devtoolsJson()],
    resolve: {
      // Fixes 'MessageChannel is not defined' Error When
      // Deploying Astro 5 + React 19 to Cloudflare
      alias: import.meta.env.PROD
        ? {
            'react-dom/server': 'react-dom/server.edge',
          }
        : undefined,
    },
  },

  image: {
    // service: imageService({}),
  },

  experimental: {
    clientPrerender: true,
    fonts: [
      {
        provider: fontProviders.google(),
        name: 'Inter',
        weights: ['100 900'],
        cssVariable: '--font-inter',
      },
    ],
  },

  integrations: [
    icon(),
    react(),
    partytown(),
    pagefind({
      indexConfig: {
        forceLanguage: 'zh-TW',
      },
    }),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          tw: 'zh-TW',
        },
      },
    }),
  ],

  markdown: {
    remarkPlugins: [],
    rehypePlugins: [rehypeImageCaption, rehypeLightbox],
    syntaxHighlight: 'shiki',
    shikiConfig: {
      themes: {
        light: 'one-light',
        dark: 'one-dark-pro',
      },
      langs: [],
      langAlias: {
        cjs: 'javascript',
      },
      wrap: true,
      transformers: [],
    },
  },
})
