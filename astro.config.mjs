// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://hanl.in',

  i18n: {
    locales: ['en', 'tw'],
    defaultLocale: 'en',
    routing: 'manual',
    fallback: {
      tw: 'en',
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [mdx()],
});