import { separateLocaleFromPathname } from '@lib/i18n'
import { navLinks } from '@lib/nav'

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

const navOrder = navLinks
  .map((link) => link.href)
  .reduce((acc, href, index) => {
    acc[href] = index
    return acc
  }, {})

const navCollections = [
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

const getNavData = (fromUrl, toUrl) => {
  let direction = 'unknown'
  if (!fromUrl || !toUrl) {
    return { type: 'unknown', direction }
  }
  const { locale: fromLocale, pathname: from } = separateLocaleFromPathname(fromUrl.pathname)
  const { locale: toLocale, pathname: to } = separateLocaleFromPathname(toUrl.pathname)
  if (from === to) {
    return { type: 'reload', direction }
  }
  if (to in navOrder && from in navOrder) {
    direction = (navOrder[from] || 0) > (navOrder[to] || 0) ? 'to-left' : 'to-right'
  }
  if (to.startsWith('/search')) {
    return { type: `to-search`, direction }
  }
  for (const collection of navCollections) {
    if (hasList(from, collection) && hasList(to, collection)) {
      return { type: `list-to-list`, direction, collection: collection.name }
    }
    const fromSlug = getSlug(from, collection)
    const toSlug = getSlug(to, collection)
    if (fromSlug && toSlug) {
      return { type: `detail-to-detail`, direction, collection: collection.name, fromSlug, toSlug }
    }
    if (toSlug && hasList(from, collection)) {
      return { type: `list-to-detail`, direction, collection: collection.name, slug: toSlug }
    }
    if (fromSlug && hasList(to, collection)) {
      return { type: `detail-to-list`, direction, collection: collection.name, slug: fromSlug }
    }
  }
  return { type: 'unknown', direction }
}

// If navigation is not supported, we need to handle the transition differently
document.addEventListener('astro:before-preparation', async (e) => {
  console.log(`astro:before-preparation:`, e)
  const { type, direction, collection, slug } = getNavData(e.from, e.to)
  console.log(`astro:before-preparation:`, type, collection, slug)
  // e.viewTransition.types.add(transitionType)
  localStorage.setItem('transitionType', type)

  if (direction !== 'unknown') {
    setupNav(e, direction)
  }

  switch (type) {
    case 'to-search':
      setupToSearch(e)
      break
    case 'list-to-list':
      setupListToList(e, collection)
      break
    case 'list-to-detail':
    case 'detail-to-list':
      setupListToDetail(e, slug)
      break
    default:
      return
  }
})

document.addEventListener('astro:before-swap', async (e) => {
  console.log(`astro:before-swap:`, e)
  const { type, direction, collection, slug } = getNavData(e.from, e.to)
  console.log(`astro:before-swap:`, type, collection, slug)
  // e.viewTransition.types.add(type)
  localStorage.setItem('transitionType', type)

  if (direction !== 'unknown') {
    setupNewNav(e, direction)
  }

  switch (type) {
    case 'to-search':
      setupNewToSearch(e)
      break
    case 'list-to-list':
      setupNewListToList(e, collection)
      break
    case 'list-to-detail':
    case 'detail-to-list':
      setupNewListToDetail(e, slug)
      break
    default:
      return
  }
})

// This needs to run in `astro:before-preparation`
const setupListToList = (e, collection) => {
  // Get a list of all elements with a id that starts with '${collection}-'
  const cards = document.querySelectorAll(`[id^="${collection}-"]`)
  console.log(`setupListToList:`, cards.length)
  setTemporaryViewTransitionNames(cards)
}

// This needs to run in `astro:before-swap`
const setupNewListToList = (e, collection) => {
  const newCards = e.newDocument.querySelectorAll(`[id^="${collection}-"]`)
  console.log(`setupNewListToList:`, newCards.length)
  setNewTemporaryViewTransitionNames(newCards, e.viewTransition.finished)
}

// This needs to run in `astro:before-preparation`
const setupListToDetail = (e, slug) => {
  // Get a list of all elements with a id that starts with '${collection}-'
  const elements = document.querySelectorAll(`[id$="-${slug}"]`)
  console.log(`setupListToDetail:`, elements.length)
  setTemporaryViewTransitionNames(elements)
}

// This needs to run in `astro:before-swap`
const setupNewListToDetail = (e, slug) => {
  const newElements = e.newDocument.querySelectorAll(`[id$="-${slug}"]`)
  console.log(`setupNewListToDetail:`, newElements.length)
  setNewTemporaryViewTransitionNames(newElements, e.viewTransition.finished)
}

// This needs to run in `astro:before-preparation`
const setupNav = (e, direction) => {
  // Get a list of all elements with a id that starts with 'nav-'
  const elements = document.querySelectorAll(`[id^="nav-"]`)
  console.log(`setupNav:`, elements.length)
  setTemporaryViewTransitionNames(elements)
  // query `a.active`
  const activeElements = document.querySelectorAll(`a.active`)
  console.log(`setupNav activeElements:`, activeElements.length)
  setTemporaryClass(activeElements, 'transitioning')
}

// This needs to run in `astro:before-swap`
const setupNewNav = (e, direction) => {
  const newElements = e.newDocument.querySelectorAll(`[id^="nav-"]`)
  console.log(`setupNewNav:`, newElements.length)
  setNewTemporaryViewTransitionNames(newElements, e.viewTransition.finished)
  // query `a.active`
  const newActiveElements = e.newDocument.querySelectorAll(`a.active`)
  console.log(`setupNewNav newActiveElements:`, newActiveElements.length)
  setNewTemporaryClass(newActiveElements, e.viewTransition.finished, 'transitioning')
}

// This needs to run in `astro:before-preparation`
const setupToSearch = (e) => {
  const searchButton = document.getElementById('search-button')
  searchButton.classList.add('bg-accent', 'dark:bg-accent')
  console.log(`setupToSearch:`, searchButton)
  // Get a list of all elements with a id that starts with 'search-'
  const elements = document.querySelectorAll(`[id^="search-"]`)
  console.log(`setupToSearch:`, elements.length)
  setTemporaryViewTransitionNames(elements)
}

// This needs to run in `astro:before-swap`
const setupNewToSearch = async (e) => {
  // Prevent search button flicker on click
  const searchButton = e.newDocument.getElementById('search-button')
  searchButton.classList.add('active', 'bg-accent', 'dark:bg-accent', 'duration-1000')
  searchButton.classList.remove('bg-transparent', 'dark:bg-transparent', 'dark:bg-background/30')
  console.log(`setupNewToSearch:`, searchButton)
  // Get a list of all elements with a id that starts with 'search-'
  const newElements = e.newDocument.querySelectorAll(`[id^="search-"]`)
  console.log(`setupNewToSearch:`, newElements.length)
  setNewTemporaryViewTransitionNames(newElements, e.viewTransition.finished)
  await e.viewTransition.updateCallbackDone
  // await e.viewTransition.finished
  searchButton.classList.remove('bg-accent', 'dark:bg-accent')
  searchButton.classList.add('bg-transparent', 'dark:bg-transparent', 'dark:bg-background/30')
  await e.viewTransition.finished
  searchButton.classList.remove('duration-1000')
}

// The view-transition-name needs to be set dynamically
// after the user clicks on a link, but before the transition starts
// or different transitions will interfere with each other and become laggy.
const setTemporaryViewTransitionNames = async (elements, name) => {
  for (const el of elements) {
    el.style.viewTransitionName = name || el.id
    // remove the hidden class
    el.classList.remove('hidden')
  }
}

const setNewTemporaryViewTransitionNames = async (elements, vtPromise, name) => {
  for (const el of elements) {
    el.style.viewTransitionName = name || el.id
  }
  await vtPromise
  for (const el of elements) {
    el.style.viewTransitionName = ''
  }
}

const setTemporaryClass = async (elements, name) => {
  for (const el of elements) {
    el.classList.add('transitioning')
    // remove the hidden class
    el.classList.remove('hidden')
  }
}

const setNewTemporaryClass = async (elements, vtPromise, name) => {
  for (const el of elements) {
    el.classList.add('transitioning')
  }
  await vtPromise
  for (const el of elements) {
    el.classList.remove('transitioning')
  }
}
