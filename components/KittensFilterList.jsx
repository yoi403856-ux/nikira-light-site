'use client'

import { useMemo, useState } from 'react'
import LitterStrips from './LitterStrips'

// Тот же принцип, что в CatsFilterList: фильтр по полу переключает, какие
// котята попадают в LitterStrips, а группировка по помётам внутри каждой
// вкладки остаётся как есть.
export default function KittensFilterList({ kittens, locale, dict }) {
  const [filter, setFilter] = useState('all')

  const filtered = useMemo(() => {
    if (filter === 'all') return kittens
    return kittens.filter((k) => k.sex === filter)
  }, [kittens, filter])

  const tabs = [
    { key: 'all', label: dict.cats.filterAll },
    { key: 'male', label: dict.cats.filterMale },
    { key: 'female', label: dict.cats.filterFemale },
  ]

  return (
    <>
      {kittens.length > 0 && (
        <div className="flex gap-8 px-6 pt-14 sm:px-[70px] sm:pt-20">
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setFilter(t.key)}
              className={`border-b-2 pb-4 font-caps text-[12px] uppercase tracking-[0.22em] transition-colors ${
                filter === t.key ? 'border-ember text-ink' : 'border-transparent text-soft hover:text-ink'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      )}
      <LitterStrips kittens={filtered} locale={locale} dict={dict} />
    </>
  )
}
