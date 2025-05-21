import type { GetStaticPaths, InferGetStaticParamsType, InferGetStaticPropsType } from 'astro'
import type { CollectionEntry, InferEntrySchema } from 'astro:content'
import { fromMarkdown } from 'mdast-util-from-markdown'
import { toString } from 'mdast-util-to-string'
import getReadingTime from 'reading-time'
export const LOCALE_COOKIE = 'locale' as const
export const locales = ['en', 'tw'] as const
export const defaultLocale = locales[0]

export const ui = {
  en: {
    name: 'Han Lin',
    'site.title': 'Han Lin | Research Engineer | Bridging Science and Engineering',
    'site.description':
      "Han Lin's portfolio – Bridging AI, bioinformatics, and electronics to forge novel solutions. Certified in AI and Cybersecurity by Google, Microsoft, and AWS.",

    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.experience': 'Experience',
    'nav.skills': 'Skills',
    'nav.expertise': 'Expertise',
    'nav.education': 'Education',
    'nav.research': 'Research',
    'nav.contact': 'Contact',
    'nav.blog': 'Blog',

    // Home page
    'home.hero.title':
      'Accelerating Innovation at the Intersection of AI, Bioinformatics, and Electronics',
    'home.hero.description':
      'With a unique background spanning artificial intelligence, bioinformatics, and electrical engineering, I develop innovative technologies that bridge hardware and software to solve complex scientific and industrial challenges. My work ranges from designing high-efficiency geothermal systems to creating cutting-edge deep learning models for protein analysis, all driven by a commitment to advancing human knowledge through technological innovation.',
    'home.hero.domains': 'AI • Bioinformatics • Electronics',
    'home.featured.title': 'Featured Projects',
    'home.featured.annotate.title': 'ANNotate: Revolutionizing Protein Analysis',
    'home.featured.annotate.description':
      'ANNotate leverages deep learning to predict protein functions 100x faster than traditional methods, making complex proteomic analysis accessible to all researchers through an intuitive web interface. The system uses a hierarchical neural network architecture to identify patterns in protein sequences with unprecedented speed and accuracy.',
    'home.featured.scada.title': 'SCADA/IoT: Transforming Geothermal Power',
    'home.featured.scada.description':
      "A modern, cost-effective monitoring system that helped increase power output from 70kW to 180kW in Taiwan's pioneering geothermal project. This system demonstrates how open-source technology can outperform expensive proprietary solutions while providing deeper insights for research and optimization.",
    'home.featured.origami.title': 'Origami Moving Cubes: Where Art Meets Engineering',
    'home.featured.origami.description':
      'An interactive web application for designing mesmerizing optical illusions, featured by popular science communicator Steve Mould. This project showcases the beauty that emerges when creativity intersects with technical precision, making complex mathematical transformations accessible to everyone.',

    // Buttons
    'button.download': 'Download CV',
    'button.contact': "Let's Innovate Together",
    'button.view': 'View Project',
    'button.view.all': 'View All Projects',

    // Footer
    'footer.description':
      'Accelerating Innovation at the Intersection of AI, Bioinformatics, and Electronics.',
    'footer.copyright': `© ${new Date().getFullYear()} Han Lin`,
  },
  tw: {
    name: '林翰',
    'site.title': '林翰 | 研究工程師 | 科學與工程的橋樑',
    'site.description':
      '林翰的作品集 - 跨界整合人工智慧、生物資訊與電子工程，擘劃創新解決方案。獲 Google、Microsoft 和 AWS 的人工智慧和網路安全認證。',

    // Navigation
    'nav.home': '首頁',
    'nav.about': '關於我',
    'nav.projects': '專案',
    'nav.experience': '經歷',
    'nav.skills': '技能',
    'nav.expertise': '專長',
    'nav.education': '學歷',
    'nav.research': '研究',
    'nav.contact': '聯絡',
    'nav.blog': '部落格',

    // Home page
    'home.hero.title': '跨界整合人工智慧、生物資訊與電子工程，擘劃創新解決方案',
    'home.hero.description':
      '憑藉在人工智慧、生物資訊學及電機工程領域的獨特多重背景，我致力於開發尖端技術，整合軟硬體以應對複雜的科學及工業挑戰。我的專案範疇廣泛，從設計高效率地熱發電系統，到建構用於蛋白質分析的頂尖深度學習模型，這一切的驅動力，皆源於我致力透過技術創新，拓展人類知識的疆界。',
    'home.hero.domains': 'AI • 生物資訊 • 電子工程',
    'home.featured.title': '精選專案',
    'home.featured.annotate.title': 'ANNotate：革新蛋白質分析技術',
    'home.featured.annotate.description':
      'ANNotate 運用深度學習預測蛋白質功能，速度較傳統方法提升百倍，並透過易於操作的網頁介面，讓複雜的蛋白質體學分析對所有研究人員觸手可及。此系統採用階層式神經網路架構，能以前所未有的速度與精準度，辨識蛋白質序列中的特定模式。',
    'home.featured.scada.title': 'SCADA/IoT：翻轉地熱發電效益',
    'home.featured.scada.description':
      '此套現代化且具成本效益的監控系統，成功助益台灣指標性的地熱專案，將發電功率自 70kW 大幅提升至 180kW。本系統充分證明，開源技術不僅能超越昂貴的專有解決方案，更能為學術研究及系統優化提供深刻洞見。',
    'home.featured.origami.title': 'Origami Moving Cubes：當藝術巧遇工程',
    'home.featured.origami.description':
      '這是一款設計令人目眩神迷視覺幻象的互動式網頁應用程式，曾獲知名科普頻道主 Steve Mould 專題報導。此專案完美展現了創意與精湛技術交織而成的美感，使大眾皆能輕易領略複雜數學變換的奧妙。',

    // Buttons
    'button.download': '下載履歷',
    'button.contact': '攜手共創價值',
    'button.view': '查看專案',
    'button.view.all': '查看所有專案',

    // Footer
    'footer.description': '跨界整合 AI、生物資訊與電子工程，擘劃創新解決方案。',
    'footer.copyright': `© ${new Date().getFullYear()} 林翰`,
  },
} as const

export const categories = {
  en: {
    iot: 'IoT',
    'renewable-energy': 'Renewable Energy',
    'software-engineering': 'Software Engineering',
    hardware: 'Hardware',
    personal: 'Personal',
    ai: 'AI',
    engineering: 'Engineering',
    bioinformatics: 'Bioinformatics',
    'software-development': 'Software Development',
  },
  tw: {
    iot: '物聯網',
    'renewable-energy': '再生能源',
    'software-engineering': '軟體工程',
    hardware: '硬體',
    personal: '個人',
    ai: '人工智慧',
    engineering: '工程',
    bioinformatics: '生物資訊',
    'software-development': '軟體開發',
  },
} as const

export const tags = {
  en: {
    astro: 'astro',
    blogging: 'blogging',
    'learning-public': 'learning in public',
    successes: 'successes',
    setbacks: 'setbacks',
    community: 'community',
  },
  tw: {
    astro: 'astro',
    blogging: '部落格',
    'learning-public': '公開學習',
    successes: '成功經驗',
    setbacks: '挑戰',
    community: '社群',
  },
} as const

export type Locale = (typeof locales)[number]

export type TranslationStore = 'ui' | 'categories' | 'tags'
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
    ui: ui,
    categories: categories,
    tags: tags,
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

export const articleDates = (changes: InferEntrySchema<'articles'>['changes']) => {
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
