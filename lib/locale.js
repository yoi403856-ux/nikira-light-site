// Pure locale-path helpers — no `next/headers` import, so this file is safe
// to use from both client and server components (unlike lib/i18n.js).

// Prefixes an internal path with /en when building a link for the English
// site, so navigation stays on a crawlable, locale-specific URL instead of
// silently switching language on the same address.
export function withLocale(path, locale) {
  // same-page anchor (e.g. '#footer') — never prefix, it must stay on
  // whatever page it's clicked from, not jump to the English homepage
  if (path.startsWith('#')) return path
  if (locale !== 'en') return path
  return path === '/' ? '/en' : `/en${path}`
}

// hreflang + canonical for a page's `metadata.alternates`. `basePath` is the
// page's own (unprefixed, Russian) path, e.g. '/kittens' or `/kittens/${slug}`.
export function hreflangAlternates(basePath, locale) {
  const ruPath = basePath
  const enPath = basePath === '/' ? '/en' : `/en${basePath}`
  return {
    canonical: locale === 'en' ? enPath : ruPath,
    languages: { 'ru-RU': ruPath, 'en-US': enPath, 'x-default': ruPath },
  }
}
