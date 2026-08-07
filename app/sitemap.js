import { getKittenSlugs, getCatSlugs } from '@/lib/api'
import { siteUrl } from '@/lib/site'

// У каждой страницы в карту сайта попадают оба адреса — русский (без
// префикса) и английский (/en/...), и каждый несёт полный блок альтернатив,
// включая самого себя. Только так поисковики вообще находят /en-страницы:
// единственная ссылка между языками на самом сайте — переключатель в шапке.
function entries(path) {
  const ru = path === '/' ? '/' : path
  const en = path === '/' ? '/en' : `/en${path}`
  const languages = { 'ru-RU': `${siteUrl}${ru}`, 'en-US': `${siteUrl}${en}` }
  return [
    { url: `${siteUrl}${ru}`, alternates: { languages } },
    { url: `${siteUrl}${en}`, alternates: { languages } },
  ]
}

export default async function sitemap() {
  const [kittenSlugs, catSlugs] = await Promise.all([getKittenSlugs(), getCatSlugs()])

  const staticPaths = ['/', '/about', '/kittens', '/cats', '/reviews', '/contacts']
  const kittenPaths = kittenSlugs.map((slug) => `/kittens/${slug}`)
  const catPaths = catSlugs.map((slug) => `/cats/${slug}`)

  return [...staticPaths, ...kittenPaths, ...catPaths].flatMap(entries)
}
