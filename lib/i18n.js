import { headers } from 'next/headers'
import { T } from './dict'

export { withLocale, hreflangAlternates } from './locale'

// Locale is set by middleware.js from the URL (/en/... vs unprefixed),
// passed down as a request header — never a stored cookie (see middleware
// for why: a crawler must see consistent content per URL).
export function getLocale() {
  return headers().get('x-locale') === 'en' ? 'en' : 'ru'
}

// Server-side dictionary for the current locale.
export function getDict() {
  return T[getLocale()]
}
