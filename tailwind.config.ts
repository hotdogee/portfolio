import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        tall: { raw: '(max-aspect-ratio: 1/1)' },
        wide: { raw: '(min-aspect-ratio: 1/1)' },
      },
      keyframes: {},
      animation: {},
    },
  },
  plugins: [],
}
export default config
