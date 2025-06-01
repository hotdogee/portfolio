import { fromMarkdown } from 'mdast-util-from-markdown'
import { toString } from 'mdast-util-to-string'
import getReadingTime from 'reading-time'
import { defaultLocale } from './i18n'

export const localeReadingTime = (body: string, locale: string = defaultLocale) => {
  const tree = fromMarkdown(String(body))
  const readingTime = getReadingTime(toString(tree)).minutes.toFixed(0)
  return locale === 'tw' ? `閱讀時間 ${readingTime} 分鐘` : `${readingTime} min read`
}
