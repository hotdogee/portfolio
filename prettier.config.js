/** @type {import("prettier").Config} */

const config = {
  semi: false,
  singleQuote: true,
  printWidth: 100,
  trailingComma: 'es5',
  organizeImportsSkipDestructiveCodeActions: true,
  plugins: [
    'prettier-plugin-astro',
    // 'prettier-plugin-organize-imports',
    '@ianvs/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss', // MUST come last
    // 'prettier-plugin-astro-organize-imports',
  ],
  importOrder: [
    '<TYPES>^(node:)',
    '<TYPES>',
    '<TYPES>^[.]',
    '<BUILTIN_MODULES>',
    '<THIRD_PARTY_MODULES>',
    '^(@components/|@layouts/|@assets/|@lib/|@pages/|@/)(.*)$',
    '^[.]',
  ],
  // astroOrganizeImportsMode: 'SortAndCombine',
  // overrides: [
  //   {
  //     files: '*.astro',
  //     options: {
  //       parser: 'astro',
  //     },
  //   },
  // ],
}

export default config
