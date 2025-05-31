export const LOCALE_COOKIE = 'locale' as const
export const locales = ['en', 'tw'] as const
export const defaultLocale = locales[0]

export const separateLocaleFromPathname = (pathname: string) => {
  for (const locale of locales) {
    if ((pathname + '/').slice(0, 4) === `/${locale}/`) {
      return { locale, pathname: pathname.slice(3) || '/' }
    }
  }
  return { locale: defaultLocale, pathname: pathname || '/' }
}
