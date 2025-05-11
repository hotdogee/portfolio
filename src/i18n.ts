export const LOCALE_COOKIE = 'locale' as const
export const locales = ['en', 'tw'] as const
export const langs = ['en', 'tw'] as const
export const defaultLocale = locales[0]

export function getLocalizedStaticPaths() {
  return [undefined, ...locales].map((locale) => ({
    params: { lang: locale },
  }))
}
