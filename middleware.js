import { NextResponse } from 'next/server'

/*
  Locale is derived entirely from the URL, not a stored cookie — a crawler
  must see the same content for the same URL every time, and each language
  needs its own indexable address (SEO requirement for foreign-traffic
  visibility, see hreflang alternates in lib/i18n.js).

  `/en` and `/en/...` are rewritten internally to the unprefixed route (the
  page component never knows the request was prefixed), with `x-locale: en`
  passed down via a request header for getLocale() to read. Everything else
  is treated as the default Russian locale.
*/
export function middleware(request) {
  const { pathname } = request.nextUrl

  const isEn = pathname === '/en' || pathname.startsWith('/en/')
  const locale = isEn ? 'en' : 'ru'

  const headers = new Headers(request.headers)
  headers.set('x-locale', locale)

  if (isEn) {
    const url = request.nextUrl.clone()
    url.pathname = pathname === '/en' ? '/' : pathname.slice(3) || '/'
    return NextResponse.rewrite(url, { request: { headers } })
  }

  return NextResponse.next({ request: { headers } })
}

export const config = {
  // skip Studio, Next internals, and any request for a file with an extension
  // (favicon.ico, icon.png, sitemap.xml, robots.txt, images, etc.)
  matcher: ['/((?!studio|_next|.*\\..*).*)'],
}
