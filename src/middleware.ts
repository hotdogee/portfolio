import { match } from '@formatjs/intl-localematcher'
import { LOCALE_COOKIE, defaultLocale, locales } from '@lib/utils'
import { defineMiddleware } from 'astro:middleware'
import Negotiator from 'negotiator'

function getDetectedLocale(request: Request): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const languages = new Negotiator({ headers: Object.fromEntries(request.headers) })
    .languages()
    // languages = [ '*' ] // no accept-language header
    // filter out '*' since match() throw an error
    .filter((language) => language !== '*')
    // replace zh with tw, for example 'zh-TW' -> 'tw-TW'
    .map((language) => {
      return language.replace('zh', 'tw')
    })
  return match(languages, locales, defaultLocale)
}

function newUrl(pathname: string) {
  // remove trailing slash
  if (pathname.endsWith('/')) {
    pathname = pathname.slice(0, -1)
  }
  return pathname || '/'
}

export const ssrMiddleware = defineMiddleware(async (context, next) => {
  // Priority
  // 1. route prefix
  // 2. cookie (not compatible with SSG)
  // 3. accept-language header (not compatible with SSG)
  // 4. default locale
  const { cookies, request, redirect, rewrite, url } = context
  // --- Priority 1: URL locale ---
  // Check if the URL path starts with a supported locale prefix.
  let locale = url.pathname.split('/')[1]
  console.log(`locale=${locale}, url=${url.pathname}, defaultLocale=${defaultLocale}`)
  if (locale === defaultLocale) {
    // redirect /defaultLocale{} -> /{}, and set cookie
    cookies.set(LOCALE_COOKIE, locale, {
      sameSite: 'strict',
      maxAge: 31536000, // 1 year
    })
    console.log(`redirect 1 to /${url.pathname.replace(`/${locale}`, '')}`)
    return redirect(newUrl(url.pathname.replace(`/${locale}`, '')))
  }
  const cookieLocale = cookies.get(LOCALE_COOKIE)?.value
  console.log(`cookieLocale=${cookieLocale}`)
  if (typeof locale === 'string' && (locales as readonly string[]).includes(locale)) {
    // User is on a path like /de/foo. This locale takes precedence.
    // Update cookie if it's different from the current URL's explicit locale.
    if (locale !== cookieLocale) {
      cookies.set(LOCALE_COOKIE, locale, {
        sameSite: 'strict',
        maxAge: 31536000, // 1 year
      })
    }
    console.log('no redirect')
    return await next()
  }
  // --- At this point, the user is on a non-prefixed path (e.g., / or /about) ---
  // This implies the default locale path.
  // --- Priority 2: Preferred locale (from cookie) ---
  // --- Priority 3: Detected locale (from Accept-Language header) ---
  // --- Priority 4: Default locale ---
  locale = cookieLocale || getDetectedLocale(request) || defaultLocale
  console.log(`locale2=${locale}`)
  if (locale === defaultLocale) {
    // rewrite /{} -> /defaultLocale{}
    console.log(`rewrite 2 to /${locale}${url.pathname}`)
    return next(newUrl(`/${locale}${url.pathname === '/' ? '' : url.pathname}`))
  }
  if ((locales as readonly string[]).includes(locale)) {
    // redirect /{} -> /non-defaultLocale{}
    console.log(`redirect 3 to /${locale}${url.pathname}`)
    return redirect(newUrl(`/${locale}${url.pathname === '/' ? '' : url.pathname}`))
  } else {
    // broken cookie, redirect to default locale
    console.log(`redirect 4 to /${defaultLocale}${url.pathname}`)
    return redirect(newUrl(`/${defaultLocale}${url.pathname === '/' ? '' : url.pathname}`))
  }
})

export const onRequest = defineMiddleware(async (context, next) => {
  // Priority
  // 1. route prefix
  // 2. cookie (not compatible with SSG)
  // 3. accept-language header (not compatible with SSG)
  // 4. default locale
  const { request, redirect, url } = context
  if (url.pathname.includes('.well-known/appspecific/com.chrome.devtools')) {
    // skip devtools
    return new Response(null, { status: 204 })
  }

  // Skip certain paths that don't need locale handling
  const skipPaths = ['/favicon', '/robots.txt', '/rss.xml', '/.', '/_']
  if (skipPaths.some((path) => url.pathname.startsWith(path))) {
    return next()
  }

  // --- Priority 1: URL locale ---
  // Check if the URL path starts with a supported locale prefix.
  let locale = url.pathname.split('/')[1]
  console.log(`locale=${locale}, url=${url.pathname}, defaultLocale=${defaultLocale}`)
  if (locale === defaultLocale) {
    // redirect /defaultLocale{} -> /{}, and set cookie
    console.log(`redirect to ${url.pathname.replace(`/${locale}`, '')}`)
    return redirect(newUrl(url.pathname.replace(`/${locale}`, '')))
  }
  if (typeof locale === 'string' && (locales as readonly string[]).includes(locale)) {
    // User is on a path like /de/foo. This locale takes precedence.
    console.log('no redirect')
    return await next()
  }
  // --- At this point, the user is on a non-prefixed path (e.g., / or /about) ---
  // This implies the default locale path.
  // --- Priority 4: Default locale ---
  console.log(`rewrite to /${defaultLocale}${url.pathname}`)
  return next(newUrl(`/${defaultLocale}${url.pathname === '/' ? '' : url.pathname}`))
})
