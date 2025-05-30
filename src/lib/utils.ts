import type { GetStaticPaths, InferGetStaticParamsType, InferGetStaticPropsType } from 'astro'
import type { CollectionEntry, InferEntrySchema } from 'astro:content'
import { clsx, type ClassValue } from 'clsx'
import { fromMarkdown } from 'mdast-util-from-markdown'
import { toString } from 'mdast-util-to-string'
import getReadingTime from 'reading-time'
import { twMerge } from 'tailwind-merge'
import { categories } from './i18n/categories'
import { skills } from './i18n/skills'
import { tags } from './i18n/tags'
import { ui } from './i18n/ui'
export const LOCALE_COOKIE = 'locale' as const
export const locales = ['en', 'tw'] as const
export const defaultLocale = locales[0]

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type Locale = (typeof locales)[number]

export type TranslationStore = 'ui' | 'categories' | 'tags' | 'skills'
export type UiKeys = keyof typeof ui.en
export type CategoryKeys = keyof typeof categories.en
export type TagKeys = keyof typeof tags.en

export const getLocaleSlugFromId = (id: string) => {
  const i = id.indexOf('/')
  const locale = id.slice(0, i) as Locale
  if (i === -1 || !locales.includes(locale)) {
    return { locale: defaultLocale, slug: id }
  }
  return { locale, slug: id.slice(i + 1) }
}

export const getCurrentLocale = (locale: string | undefined) => {
  if (locale !== undefined && locales.includes(locale as any)) {
    return locale as Locale
  }
  return defaultLocale
}

export const getLang = (locale: string | undefined) => {
  const currentLocale = getCurrentLocale(locale)
  return currentLocale === 'tw' ? 'zh-TW' : currentLocale
}

export const useTranslations = (locale: string | undefined, store: TranslationStore = 'ui') => {
  const currentLocale = getCurrentLocale(locale)

  const translations = {
    ui,
    categories,
    tags,
    skills,
  }

  return (key: string) => {
    const selectedStore = translations[store]
    if (selectedStore && selectedStore[currentLocale] && key in selectedStore[currentLocale]) {
      return (selectedStore[currentLocale] as any)[key]
    }
    if (selectedStore && selectedStore[defaultLocale] && key in selectedStore[defaultLocale]) {
      return (selectedStore[defaultLocale] as any)[key]
    }
    return key // Fallback to key if not found
  }
}

export const getLocalizedStaticPaths: GetStaticPaths = () => {
  return [undefined, ...locales].map((locale) => ({
    params: { locale },
  }))
}

export const localeDate = (date: string | Date, locale: string = defaultLocale) => {
  locale = locale === 'tw' ? 'zh-TW' : locale
  return new Date(date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const localePublishedDate = (date: string, locale: string = defaultLocale) => {
  return locale === 'tw'
    ? `發佈於 ${localeDate(date, locale)}`
    : `Posted on ${localeDate(date, locale)}`
}

export const localeUpdateDate = (date: string, locale: string = defaultLocale) => {
  return locale === 'tw'
    ? `更新於 ${localeDate(date, locale)}`
    : `Updated on ${localeDate(date, locale)}`
}

export const localeReadingTime = (body: string, locale: string = defaultLocale) => {
  const tree = fromMarkdown(String(body))
  const readingTime = getReadingTime(toString(tree)).minutes.toFixed(0)
  return locale === 'tw' ? `閱讀時間 ${readingTime} 分鐘` : `${readingTime} min read`
}

export const datesFromChanges = (changes: InferEntrySchema<'articles'>['changes']) => {
  if (!changes || changes.length === 0) return { published: null, updated: null }
  const dates = changes.map((d) => new Date(Object.keys(d)[0])).sort()
  const published = dates[0]
  const updated = dates.length > 1 ? dates[dates.length - 1] : null
  return { published, updated }
}

/**
 * Common stop words in English and Traditional Chinese to be removed from slugs
 * This improves SEO and makes URLs cleaner and more concise
 */
const stopWords = [
  // English stop words
  'a',
  'an',
  'the',
  'and',
  'or',
  'but',
  'is',
  'are',
  'was',
  'were',
  'be',
  'been',
  'being',
  'in',
  'on',
  'at',
  'to',
  'for',
  'with',
  'by',
  'about',
  'of',
  'from',
  'as',
  'into',
  'during',
  'until',
  'against',
  'among',
  'throughout',
  'despite',
  'towards',
  'upon',

  // Traditional Chinese stop words
  '的',
  '了',
  '和',
  '是',
  '在',
  '我',
  '有',
  '一個',
  '個',
  '這',
  '那',
  '它',
  '他',
  '她',
  '們',
  '您',
  '與',
  '及',
  '或者',
  '並且',
  '因為',
  '所以',
  '如果',
  '就',
  '而',
]

/**
 * Convert a string to a URL-friendly slug
 * This function converts a string (like a category or tag name) into a URL-friendly format:
 * - Converts to lowercase
 * - Removes common stop words
 * - Replaces spaces and special characters with hyphens
 * - Removes duplicate hyphens
 * - Removes leading and trailing hyphens
 *
 * @param text The string to slugify
 * @param removeStopWords Whether to remove stop words (default: true)
 * @returns A URL-friendly slug
 */
export const slugify = (text: string, removeStopWords: boolean = true): string => {
  let result = text.toString().toLowerCase().trim()

  // Remove stop words if enabled
  if (removeStopWords) {
    // Add word boundaries to ensure we only match whole words
    const stopWordsPattern = new RegExp(`\\b(${stopWords.join('|')})\\b`, 'gi')
    result = result.replace(stopWordsPattern, '').trim()
  }

  return (
    result
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/[^\w\-]+/g, '') // Remove all non-word characters except hyphens
      .replace(/\-\-+/g, '-') // Replace multiple hyphens with single hyphen
      .replace(/^-+/, '') // Remove leading hyphens
      .replace(/-+$/, '') || // Remove trailing hyphens
    'untitled'
  ) // Fallback if slug is empty (e.g., if all words were stop words)
}

/**
 * Utility function to create slugs for arrays of tags/categories
 *
 * @param items Array of strings to slugify
 * @returns Object with original items as keys and their slugified versions as values
 */
export const slugifyArray = (items: string[]): Record<string, string> => {
  return items.reduce(
    (acc, item) => {
      acc[item] = slugify(item)
      return acc
    },
    {} as Record<string, string>
  )
}
