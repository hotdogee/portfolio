import type { GetStaticPaths, InferGetStaticParamsType, InferGetStaticPropsType } from 'astro'
export const LOCALE_COOKIE = 'locale' as const
export const locales = ['en', 'tw'] as const
export const langs = ['en', 'tw'] as const
export const defaultLocale = locales[0]

export const ui = {
  en: {
    name: 'Han Lin',
    'site.title': 'Han Lin - AI & Bioinformatics Engineer | Innovator in Renewable Energy',
    'site.description':
      "Han Lin's portfolio – researcher, inventor, and engineer specializing in AI-driven bioinformatics and sustainable energy.",

    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.experience': 'Experience',
    'nav.skills': 'Skills',
    'nav.education': 'Education',
    'nav.contact': 'Contact',
    'nav.blog': 'Blog',

    // Home page
    'home.hero.title':
      'Engineering Novel Solutions at the Intersection of AI, Bioinformatics, and Sustainable Energy',
    'home.hero.description':
      'With a unique background spanning artificial intelligence, bioinformatics, and electrical engineering, I develop innovative technologies that bridge hardware and software to solve complex scientific and industrial challenges. My work ranges from designing high-efficiency geothermal systems to creating cutting-edge deep learning models for protein analysis, all driven by a commitment to advancing human knowledge through technological innovation.',
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
      'Engineering novel solutions at the intersection of AI, bioinformatics, and sustainable energy.',
    'footer.copyright': `© ${new Date().getFullYear()} Han Lin`,
  },
  tw: {
    name: '林翰',
    'site.title': '林翰 - AI 與生物資訊工程師 | 永續能源創新者',
    'site.description':
      '林翰的作品集 - 研究員、發明家和工程師，專長是運用人工智慧進行生物資訊分析，以及開發永續能源。',

    // Navigation
    'nav.home': '首頁',
    'nav.about': '關於我',
    'nav.projects': '專案',
    'nav.experience': '經歷',
    'nav.skills': '技能',
    'nav.education': '學歷',
    'nav.contact': '聯絡',
    'nav.blog': '部落格',

    // Home page
    'home.hero.title': '跨界整合 AI、生物資訊與永續能源，擘劃創新解決方案',
    'home.hero.description':
      '憑藉在人工智慧、生物資訊學及電機工程領域的獨特多重背景，我致力於開發尖端技術，整合軟硬體以應對複雜的科學及工業挑戰。我的專案範疇廣泛，從設計高效率地熱發電系統，到建構用於蛋白質分析的頂尖深度學習模型，這一切的驅動力，皆源於我致力透過技術創新，拓展人類知識的疆界。',
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
    'footer.description': '跨界整合 AI、生物資訊與永續能源，擘劃創新解決方案。',
    'footer.copyright': `© ${new Date().getFullYear()} 林翰`,
  },
} as const

export type Language = 'en' | 'tw'

export const getCurrentLocale = (locale: string | undefined) => {
  if (locale !== undefined && locales.includes(locale as any)) {
    return locale as Language
  }
  return defaultLocale
}

export function useTranslations(locale: string | undefined) {
  const language = getCurrentLocale(locale)
  return function t(key: keyof (typeof ui)[typeof defaultLocale]) {
    return ui[language][key] || ui[defaultLocale][key]
  }
}

export const getLocalizedStaticPaths = (async () => {
  return [undefined, ...locales].map((locale) => ({
    params: { lang: locale as Language },
  }))
}) satisfies GetStaticPaths
