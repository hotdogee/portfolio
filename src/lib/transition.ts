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

// 1. Certification Card List Transistions
//    - Set `view-transistion-name` on `id`
//      - `certification-${id}`
//    - Paths:
//      - when `from` and `to` is one of these
//        - http://localhost:4321/{locale}/certifications
//        - http://localhost:4321/{locale}/certifications/organization/{organization}
//        - http://localhost:4321/{locale}/expertise
//        - http://localhost:4321/{locale}
// 2. Certification List Detail Transistions
//    - Set `view-transistion-name` on `id`
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
    pathname === `/certifications` ||
    pathname === `/expertise` ||
    pathname === `/` ||
    pathname.startsWith(`/certifications/organization/`)
  )
}

const isCertificationDetail = (pathname) => {
  // Check if the path matches any of the certification detail paths
  const [_, p1, p2] = pathname.split('/')
  const subCategories = ['skill', 'organization']
  // console.log(
  //   `isCertificationDetail: p1=${p1}, p2=${p2}, subCategories=${subCategories}`,
  //   p1 === 'certifications' && p2 && !subCategories.includes(p2)
  // )
  return p1 === 'certifications' && p2 && !subCategories.includes(p2)
}

const getCertificationSlug = (pathname) => {
  // Check if the path matches any of the certification detail paths
  const [_, p1, p2] = pathname.split('/')
  const subCategories = ['skill', 'organization']
  // console.log(
  //   `isCertificationDetail: p1=${p1}, p2=${p2}, subCategories=${subCategories}`,
  //   p1 === 'certifications' && p2 && !subCategories.includes(p2)
  // )
  return p1 === 'certifications' && !subCategories.includes(p2) && p2
}

const determineTransitionTypeUrl = (fromUrl, toUrl) => {
  if (!fromUrl || !toUrl) {
    return { type: 'unknown' }
  }
  const { locale: fromLocale, pathname: from } = separateLocaleFromPathname(fromUrl.pathname)
  const { locale: toLocale, pathname: to } = separateLocaleFromPathname(toUrl.pathname)
  if (from === to) {
    return { type: 'reload' }
  }
  if (hasCertificationList(from) && hasCertificationList(to)) {
    return { type: 'certification-list-to-list' }
  }
  if (isCertificationDetail(from) && isCertificationDetail(to)) {
    return { type: 'certification-detail-to-detail' }
  }
  let slug = getCertificationSlug(to)
  if (slug && hasCertificationList(from)) {
    return { type: 'certification-list-to-detail', slug }
  }
  slug = getCertificationSlug(from)
  if (slug && hasCertificationList(to)) {
    return { type: 'certification-detail-to-list', slug }
  }
  return { type: 'unknown' }
}

// If navigation is not supported, we need to handle the transition differently
document.addEventListener('astro:before-preparation', async (e) => {
  console.log(`astro:before-preparation:`, e)
  const { type, slug } = determineTransitionTypeUrl(e.from, e.to)
  console.log(`astro:before-preparation: ${type}`)
  // e.viewTransition.types.add(transitionType)
  localStorage.setItem('transitionType', type)

  switch (type) {
    case 'certification-list-to-list':
      setupCertificationListToListTransition(e)
      break
    case 'certification-list-to-detail':
    case 'certification-detail-to-list':
      setupCertificationListToDetailTransition(e, slug)
      break
    default:
      return
  }
})

document.addEventListener('astro:before-swap', async (e) => {
  console.log(`astro:before-swap:`, e)
  const { type, slug } = determineTransitionTypeUrl(e.from, e.to)
  console.log(`astro:before-swap: ${type}`)
  // e.viewTransition.types.add(type)
  localStorage.setItem('transitionType', type)

  switch (type) {
    case 'certification-list-to-list':
      setupNewCertificationListToListTransition(e)
      break
    case 'certification-list-to-detail':
    case 'certification-detail-to-list':
      setupNewCertificationListToDetailTransition(e, slug)
      break
    default:
      return
  }
})

// This needs to run in `astro:after-preparation`
const setupCertificationListToListTransition = (e) => {
  // Get a list of all elements with a id that starts with 'certification-'
  const certificationCards = document.querySelectorAll('[id^="certification-"]')
  console.log(`setupCertificationListToListTransition:`, certificationCards.length)
  setTemporaryViewTransitionNames(certificationCards)
}

// This needs to run in `astro:before-swap`
const setupNewCertificationListToListTransition = (e) => {
  const newCertificationCards = e.newDocument.querySelectorAll('[id^="certification-"]')
  console.log(`setupCertificationListToListTransition:`, newCertificationCards.length)
  setNewTemporaryViewTransitionNames(newCertificationCards, e.viewTransition.finished)
}

// This needs to run in `astro:after-preparation`
const setupCertificationListToDetailTransition = (e, slug) => {
  // Get a list of all elements with a id that starts with 'certification-'
  const elements = document.querySelectorAll(`[id$="-${slug}"]`)
  console.log(`setupCertificationListToDetailTransition:`, elements.length)
  setTemporaryViewTransitionNames(elements)
}

// This needs to run in `astro:before-swap`
const setupNewCertificationListToDetailTransition = (e, slug) => {
  const newElements = e.newDocument.querySelectorAll(`[id$="-${slug}"]`)
  console.log(`setupNewCertificationListToDetailTransition:`, newElements.length)
  setNewTemporaryViewTransitionNames(newElements, e.viewTransition.finished)
}

const setTemporaryViewTransitionNames = async (elements) => {
  for (const el of elements) {
    el.style.viewTransitionName = el.id
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
