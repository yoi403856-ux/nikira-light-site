import { unstable_cache } from 'next/cache'
import { client } from '@/sanity/client'
import { T } from './dict'
import { CACHE_TAGS, CACHE_TTL_SECONDS } from './cacheTags'

// `cache: 'no-store'` здесь намеренный, хотя каждая getXContent ниже завёрнута
// в `unstable_cache` — причина та же, что у safeFetch в lib/api.js.
async function fetchDoc(type) {
  if (!client) return null
  try {
    return await client.fetch(`*[_type == $type][0]`, { type }, { cache: 'no-store' })
  } catch {
    return null
  }
}

// Берёт поле нужного языка (у английского запасной вариант — русское поле),
// затем значение по умолчанию из словаря. Пустое поле в студии никогда не
// оставляет на сайте дыру.
function f(doc, base, key, locale) {
  if (!doc) return base[key]
  const val = locale === 'en' ? doc[`${key}En`] || doc[key] : doc[key]
  return val || base[key]
}

/*
  Все страницы устроены одинаково: надпись над заголовком, заголовок и
  подзаголовок первого экрана. Поэтому общая фабрика вместо шести почти
  одинаковых функций — добавить страницу теперь стоит одну строку.
*/
function pageContent(type, dictKey, extraKeys = []) {
  const impl = async (locale) => {
    const doc = await fetchDoc(type)
    const base = T[locale][dictKey]
    if (!doc) return base
    const out = {
      ...base,
      heroTitle: f(doc, base, 'heroTitle', locale),
      heroLead: f(doc, base, 'heroLead', locale),
    }
    for (const k of extraKeys) out[k] = f(doc, base, k, locale)
    return out
  }
  return unstable_cache(impl, [`get_${type}`], {
    tags: [CACHE_TAGS[type]],
    revalidate: CACHE_TTL_SECONDS,
  })
}

async function homeContentImpl(locale) {
  const doc = await fetchDoc('homeContent')
  const base = T[locale].home
  if (!doc) return base
  return {
    ...base,
    eyebrow: f(doc, base, 'eyebrow', locale),
    titleLine1: f(doc, base, 'titleLine1', locale),
    titleLine2: f(doc, base, 'titleLine2', locale),
    titleLine3: f(doc, base, 'titleLine3', locale),
    lead: f(doc, base, 'lead', locale),
    aboutEyebrow: f(doc, base, 'aboutEyebrow', locale),
    aboutH2a: f(doc, base, 'aboutH2a', locale),
    aboutH2b: f(doc, base, 'aboutH2b', locale),
    aside: f(doc, base, 'aside', locale),
    p1: f(doc, base, 'p1', locale),
    p2: f(doc, base, 'p2', locale),
    p3: f(doc, base, 'p3', locale),
    p4: f(doc, base, 'p4', locale),
    catsEyebrow: f(doc, base, 'catsEyebrow', locale),
    catsH2: f(doc, base, 'catsH2', locale),
    quoteEyebrow: f(doc, base, 'quoteEyebrow', locale),
    quote: f(doc, base, 'quote', locale),
    ctaEyebrow: f(doc, base, 'ctaEyebrow', locale),
    ctaH2a: f(doc, base, 'ctaH2a', locale),
    ctaH2b: f(doc, base, 'ctaH2b', locale),
  }
}

export const getHomeContent = unstable_cache(homeContentImpl, ['getHomeContent'], {
  tags: [CACHE_TAGS.homeContent],
  revalidate: CACHE_TTL_SECONDS,
})

async function aboutContentImpl(locale) {
  const doc = await fetchDoc('aboutContent')
  const base = T[locale].about
  if (!doc) return base
  const features = doc.features?.length
    ? doc.features.map((item, i) => ({
        t: (locale === 'en' ? item.tEn || item.t : item.t) || base.features[i]?.t || '',
        d: (locale === 'en' ? item.dEn || item.d : item.d) || base.features[i]?.d || '',
      }))
    : base.features
  return {
    ...base,
    heroTitle: f(doc, base, 'heroTitle', locale),
    heroLead: f(doc, base, 'heroLead', locale),
    storyEyebrow: f(doc, base, 'storyEyebrow', locale),
    storyH2a: f(doc, base, 'storyH2a', locale),
    storyH2b: f(doc, base, 'storyH2b', locale),
    aside: f(doc, base, 'aside', locale),
    p1: f(doc, base, 'p1', locale),
    p2: f(doc, base, 'p2', locale),
    p3: f(doc, base, 'p3', locale),
    p4: f(doc, base, 'p4', locale),
    quoteEyebrow: f(doc, base, 'quoteEyebrow', locale),
    quote: f(doc, base, 'quote', locale),
    featuresEyebrow: f(doc, base, 'featuresEyebrow', locale),
    features,
    ctaEyebrow: f(doc, base, 'ctaEyebrow', locale),
    ctaH2a: f(doc, base, 'ctaH2a', locale),
    ctaH2b: f(doc, base, 'ctaH2b', locale),
    ctaH2c: f(doc, base, 'ctaH2c', locale),
  }
}

export const getAboutContent = unstable_cache(aboutContentImpl, ['getAboutContent'], {
  tags: [CACHE_TAGS.aboutContent],
  revalidate: CACHE_TTL_SECONDS,
})

export const getKittensContent = pageContent('kittensContent', 'kittens', ['waitEyebrow', 'waitH2a', 'waitH2b'])
export const getCatsContent = pageContent('catsContent', 'cats', ['docsEyebrow', 'docsH2a', 'docsH2b', 'docsText'])
export const getReviewsContent = pageContent('reviewsContent', 'reviews', ['ctaEyebrow', 'ctaH2a', 'ctaH2b'])
export const getContactsContent = pageContent('contactsContent', 'contacts', ['askEyebrow', 'askH2', 'askText'])
