'use client'

import { createContext, useContext } from 'react'
import { T } from '@/lib/dict'

const LocaleContext = createContext('ru')

// Seeded with the locale the server derived from the URL (see middleware.js
// + lib/i18n.js) — changes only by navigating to a /en/... URL, which
// re-renders this provider with a new `locale` prop from the layout.
export function LocaleProvider({ locale, children }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  return useContext(LocaleContext)
}

export function useDict() {
  return T[useLocale()]
}
