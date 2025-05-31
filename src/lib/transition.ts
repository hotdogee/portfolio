import { separateLocaleFromPathname } from './i18n'

// Make sure browser has support
document.addEventListener('DOMContentLoaded', (e) => {
  let shouldThrow = false
  if (!window.navigation) {
    // the browser does not support the Navigation API,
    shouldThrow = false
  }
  if (!('CSSViewTransitionRule' in window)) {
    // the browser does not support the CSS View Transition API,
    shouldThrow = true
  }
  if (shouldThrow) {
    // Throwing here, to prevent the rest of the code from getting executed
    // If only JS (in the browser) had something like process.exit().
    throw new Error('Browser is lacking support …')
  }
  console.log('Browser supports Navigation API and CSS View Transition API')
})

// 1. Certification Card List Transitions
//    - Set `view-transition-name` on `id`
//      - `certification-${id}`
//    - Paths:
//      - when `from` and `to` is one of these
//        - http://localhost:4321/{locale}/certifications
//        - http://localhost:4321/{locale}/certifications/organization/{organization}
//        - http://localhost:4321/{locale}/expertise
//        - http://localhost:4321/{locale}
// 2. Certification List Detail Transitions
//    - Set `view-transition-name` on `id`
//      - `badge-${id}`
//      - `organization-${id}`
//      - `name-${id}`
//      - `issue-${id}`
//      - `verify-${id}`
//    - Paths:
//      - when `from` or `to` is one of these
//        - http://localhost:4321/{locale}/certifications/{certification}
//      - and the other is one of these
//        - http://localhost:4321/{locale}/certifications
//        - http://localhost:4321/{locale}/certifications/organization/{organization}
//        - http://localhost:4321/{locale}/expertise
//        - http://localhost:4321/{locale}
const hasCertificationList = (pathname) => {
  // Check if the path matches any of the certification list paths
  return (
    pathname === `/` ||
    pathname === `/expertise` ||
    pathname === `/certifications` ||
    pathname.startsWith(`/certifications/organization/`) ||
    pathname.startsWith(`/certifications/skill/`)
  )
}

const hasProjectList = (pathname) => {
  // Check if the path matches any of the project list paths
  return pathname === `/` || pathname === `/projects` || pathname.startsWith(`/projects/category/`)
}

const hasArticleList = (pathname) => {
  // Check if the path matches any of the article list paths
  return (
    pathname === `/articles` ||
    pathname.startsWith(`/articles/category/`) ||
    pathname.startsWith(`/articles/tag/`)
  )
}

const hasList = (pathname, collection) => {
  // Check if the path matches any of the collection list paths
  // combine /{collection.name}
  return (
    pathname === `/${collection.name}` ||
    collection.pathname.equals.includes(pathname) ||
    collection.subCategories.some((subCategory) =>
      pathname.startsWith(`/${collection.name}/${subCategory}/`)
    ) ||
    collection.pathname.startsWith.some((prefix) => pathname.startsWith(prefix))
  )
}

const getCertificationSlug = (pathname) => {
  // Check if the path matches any of the certification detail paths
  const [_, p1, p2] = pathname.split('/')
  const subCategories = ['skill', 'organization']
  return p1 === 'certifications' && !subCategories.includes(p2) && p2
}

const getProjectSlug = (pathname) => {
  // Check if the path matches any of the project detail paths
  const [_, p1, p2] = pathname.split('/')
  const subCategories = ['category']
  return p1 === 'projects' && !subCategories.includes(p2) && p2
}

const getArticleSlug = (pathname) => {
  // Check if the path matches any of the article detail paths
  const [_, p1, p2] = pathname.split('/')
  const subCategories = ['category', 'tag']
  return p1 === 'articles' && !subCategories.includes(p2) && p2
}

const getSlug = (pathname, collection) => {
  // Check if the path matches any of the collection detail paths
  const [_, p1, p2] = pathname.split('/')
  const subCategories = collection.subCategories
  return p1 === collection.name && !subCategories.includes(p2) && p2
}

const collections = [
  {
    name: 'certifications',
    subCategories: ['skill', 'organization'],
    pathname: {
      equals: ['/expertise', '/'],
      startsWith: [],
    },
  },
  {
    name: 'projects',
    subCategories: ['category'],
    pathname: {
      equals: ['/'],
      startsWith: [],
    },
  },
  {
    name: 'articles',
    subCategories: ['category', 'tag'],
    pathname: {
      equals: [],
      startsWith: [],
    },
  },
]

const determineTransitionTypeUrl = (fromUrl, toUrl) => {
  if (!fromUrl || !toUrl) {
    return { type: 'unknown' }
  }
  const { locale: fromLocale, pathname: from } = separateLocaleFromPathname(fromUrl.pathname)
  const { locale: toLocale, pathname: to } = separateLocaleFromPathname(toUrl.pathname)
  if (from === to) {
    return { type: 'reload' }
  }
  for (const collection of collections) {
    if (hasList(from, collection) && hasList(to, collection)) {
      return { type: `list-to-list`, collection: collection.name }
    }
    const fromSlug = getSlug(from, collection)
    const toSlug = getSlug(to, collection)
    if (fromSlug && toSlug) {
      return { type: `detail-to-detail`, collection: collection.name, fromSlug, toSlug }
    }
    if (toSlug && hasList(from, collection)) {
      return { type: `list-to-detail`, collection: collection.name, slug: toSlug }
    }
    if (fromSlug && hasList(to, collection)) {
      return { type: `detail-to-list`, collection: collection.name, slug: fromSlug }
    }
  }
  return { type: 'unknown' }
}

// If navigation is not supported, we need to handle the transition differently
document.addEventListener('astro:before-preparation', async (e) => {
  console.log(`astro:before-preparation:`, e)
  const { type, collection, slug } = determineTransitionTypeUrl(e.from, e.to)
  console.log(`astro:before-preparation:`, type, collection, slug)
  // e.viewTransition.types.add(transitionType)
  localStorage.setItem('transitionType', type)

  switch (type) {
    case 'list-to-list':
      setupListToListTransition(e, collection)
      break
    case 'list-to-detail':
    case 'detail-to-list':
      setupListToDetailTransition(e, slug)
      break
    default:
      return
  }
})

document.addEventListener('astro:before-swap', async (e) => {
  console.log(`astro:before-swap:`, e)
  const { type, collection, slug } = determineTransitionTypeUrl(e.from, e.to)
  console.log(`astro:before-swap:`, type, collection, slug)
  // e.viewTransition.types.add(type)
  localStorage.setItem('transitionType', type)

  switch (type) {
    case 'list-to-list':
      setupNewListToListTransition(e, collection)
      break
    case 'list-to-detail':
    case 'detail-to-list':
      setupNewListToDetailTransition(e, slug)
      break
    default:
      return
  }
})

// This needs to run in `astro:after-preparation`
const setupListToListTransition = (e, collection) => {
  // Get a list of all elements with a id that starts with 'certification-'
  const cards = document.querySelectorAll(`[id^="${collection}-"]`)
  console.log(`setupListToListTransition:`, cards.length)
  setTemporaryViewTransitionNames(cards)
}

// This needs to run in `astro:before-swap`
const setupNewListToListTransition = (e, collection) => {
  const newCards = e.newDocument.querySelectorAll(`[id^="${collection}-"]`)
  console.log(`setupNewListToListTransition:`, newCards.length)
  setNewTemporaryViewTransitionNames(newCards, e.viewTransition.finished)
}

// This needs to run in `astro:after-preparation`
const setupListToDetailTransition = (e, slug) => {
  // Get a list of all elements with a id that starts with 'certification-'
  const elements = document.querySelectorAll(`[id$="-${slug}"]`)
  console.log(`setupListToDetailTransition:`, elements.length)
  setTemporaryViewTransitionNames(elements)
}

// This needs to run in `astro:before-swap`
const setupNewListToDetailTransition = (e, slug) => {
  const newElements = e.newDocument.querySelectorAll(`[id$="-${slug}"]`)
  console.log(`setupNewListToDetailTransition:`, newElements.length)
  setNewTemporaryViewTransitionNames(newElements, e.viewTransition.finished)
}

const setTemporaryViewTransitionNames = async (elements) => {
  for (const el of elements) {
    el.style.viewTransitionName = el.id
    // remove the hidden class
    el.classList.remove('hidden')
  }
}

const setNewTemporaryViewTransitionNames = async (elements, vtPromise) => {
  for (const el of elements) {
    el.style.viewTransitionName = el.id
  }
  await vtPromise
  for (const el of elements) {
    el.style.viewTransitionName = ''
  }
}
