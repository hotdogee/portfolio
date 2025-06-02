// @ts-check
import mdx from '@astrojs/mdx'
import partytown from '@astrojs/partytown'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import icon from 'astro-icon'
import pagefind from 'astro-pagefind'
import { defineConfig, fontProviders } from 'astro/config'
import { defaultLocale, locales } from './src/lib/i18n'

// https://astro.build/config
export default defineConfig({
  site: 'https://hanl.in',
  trailingSlash: 'never',
  i18n: {
    defaultLocale: defaultLocale,
    locales: [...locales],
    routing: 'manual',
    fallback: {
      tw: defaultLocale,
    },
  },
  prefetch: {
    prefetchAll: true,
  },
  vite: {
    plugins: [tailwindcss()],
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
    mdx(),
    partytown(),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          tw: 'zh-TW',
        },
      },
    }),
    react(),
    icon(),
    pagefind({
      indexConfig: {
        forceLanguage: 'zh-TW',
      },
    }),
  ],
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      // Choose from Shiki's built-in themes (or add your own)
      // https://shiki.style/themes
      themes: {
        light: 'one-light',
        dark: 'one-dark-pro',
      },
      // Add custom languages
      // Note: Shiki has countless langs built-in, including .astro!
      // https://shiki.style/languages
      langs: [],
      // Add custom aliases for languages
      // Map an alias to a Shiki language ID: https://shiki.style/languages#bundled-languages
      // https://shiki.style/guide/load-lang#custom-language-aliases
      langAlias: {
        cjs: 'javascript',
      },
      // Enable word wrap to prevent horizontal scrolling
      wrap: true,
      // Add custom transformers: https://shiki.style/guide/transformers
      // Find common transformers: https://shiki.style/packages/transformers
      transformers: [],
    },
  },
})
