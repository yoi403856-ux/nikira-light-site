import { unstable_cache } from 'next/cache'
import { client } from '@/sanity/client'
import { CACHE_TAGS, CACHE_TTL_SECONDS } from './cacheTags'

const PARENT = `{ _id, name, call, callEn, "slug": slug.current, sex, ems, color, colorEn, images }`
const KITTEN = `_id, name, nameEn, "slug": slug.current, litter, born, ems, color, colorEn,
  polydactyl, sex, status, kind, description, descriptionEn, images, video, order,
  father->${PARENT}, mother->${PARENT}`
const CAT = `_id, name, call, callEn, "slug": slug.current, sex, ems, color, colorEn,
  polydactyl, weight, titles, titlesEn, born, tests, testsEn, note, noteEn, images, order`

/*
  Никогда не бросает исключение при сборке и рендере: недоступность Sanity
  должна вырождаться в пустую страницу, а не в упавший билд.

  `fallback` — всегда пустое значение. Никаких подставных котят: на живом
  проиндексированном сайте выдуманный контент вреден, он утекает в поиск.
  Пустой набор данных обязан отрисоваться пустым, страницы это умеют.

  `cache: 'no-store'` здесь намеренный, хотя каждая функция ниже завёрнута в
  `unstable_cache`: тегированный кэш живёт на уровне обёртки, и запрос под ним
  не должен кэшироваться ещё и слоем fetch — это был бы второй кэш, который
  нечем сбросить.
*/
async function safeFetch(query, params, fallback) {
  if (!client) return fallback
  try {
    const data = await client.fetch(query, params || {}, { cache: 'no-store' })
    return data ?? fallback
  } catch {
    return fallback
  }
}

// Котята подтягивают отца и мать (см. PARENT), поэтому правка кота меняет и
// карточку котёнка — оба тега.
export const getKittens = unstable_cache(
  () => safeFetch(`*[_type == "kitten" && count(images) > 0] | order(order asc, born desc){${KITTEN}}`, {}, []),
  ['getKittens'],
  { tags: [CACHE_TAGS.kitten, CACHE_TAGS.cat], revalidate: CACHE_TTL_SECONDS }
)

export const getKitten = unstable_cache(
  (slug) => safeFetch(`*[_type == "kitten" && slug.current == $slug][0]{${KITTEN}}`, { slug }, null),
  ['getKitten'],
  { tags: [CACHE_TAGS.kitten, CACHE_TAGS.cat], revalidate: CACHE_TTL_SECONDS }
)

// В список и в карту сайта попадают только котята с фотографиями: без фото
// карточка выглядит недоделанной, а поисковик всё равно её проиндексирует.
export const getKittenSlugs = unstable_cache(
  () =>
    safeFetch(
      `*[_type == "kitten" && defined(slug.current) && count(images) > 0].slug.current`,
      {},
      []
    ),
  ['getKittenSlugs'],
  { tags: [CACHE_TAGS.kitten], revalidate: CACHE_TTL_SECONDS }
)

export const getCats = unstable_cache(
  () => safeFetch(`*[_type == "cat" && count(images) > 0] | order(order asc, name asc){${CAT}}`, {}, []),
  ['getCats'],
  { tags: [CACHE_TAGS.cat], revalidate: CACHE_TTL_SECONDS }
)

export const getCat = unstable_cache(
  (slug) => safeFetch(`*[_type == "cat" && slug.current == $slug][0]{${CAT}}`, { slug }, null),
  ['getCat'],
  { tags: [CACHE_TAGS.cat], revalidate: CACHE_TTL_SECONDS }
)

export const getCatSlugs = unstable_cache(
  () => safeFetch(`*[_type == "cat" && defined(slug.current) && count(images) > 0].slug.current`, {}, []),
  ['getCatSlugs'],
  { tags: [CACHE_TAGS.cat], revalidate: CACHE_TTL_SECONDS }
)

// Котята этого производителя — блок «Потомство» на его странице.
export const getKittensByParent = unstable_cache(
  async (catId) => {
    if (!catId) return []
    return safeFetch(
      `*[_type == "kitten" && count(images) > 0 && (father._ref == $id || mother._ref == $id)]
        | order(order asc, born desc){
          _id, name, nameEn, "slug": slug.current, ems, color, colorEn, status, images
        }`,
      { id: catId },
      []
    )
  },
  ['getKittensByParent'],
  { tags: [CACHE_TAGS.kitten, CACHE_TAGS.cat], revalidate: CACHE_TTL_SECONDS }
)

export const getReviews = unstable_cache(
  () =>
    safeFetch(
      `*[_type == "review"] | order(order asc, date desc){
        _id, kind, image, video, text, textEn, author, date
      }`,
      {},
      []
    ),
  ['getReviews'],
  { tags: [CACHE_TAGS.review], revalidate: CACHE_TTL_SECONDS }
)

export const getSettings = unstable_cache(
  // Забираем по фиксированному id, а не по типу: старый случайный документ
  // «siteSettings» иначе может выиграть сортировку и спрятать все заполненные
  // поля.
  () => safeFetch(`*[_id == "siteSettings"][0]`, {}, null),
  ['getSettings'],
  { tags: [CACHE_TAGS.siteSettings], revalidate: CACHE_TTL_SECONDS }
)
