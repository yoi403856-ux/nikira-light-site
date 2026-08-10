'use client'

import { useMemo, useState } from 'react'
import LitterStrips from './LitterStrips'

// Фильтр по доступности, а не по полу: покупателю важнее сразу увидеть,
// кто свободен, а не листать помёты в поисках подходящего пола. Статус
// котёнка проверяется без учёта поправки на возраст (kittenStatusLabel) —
// тут вкладка "Свободны" про то, что можно бронировать/спрашивать, а не
// про то, готов ли котёнок физически уехать сегодня.
export default function KittensFilterList({ kittens, locale, dict }) {
  const [filter, setFilter] = useState('all')

  const filtered = useMemo(() => {
    if (filter === 'all') return kittens
    return kittens.filter((k) => k.status === filter)
  }, [kittens, filter])

  const tabs = [
    { key: 'all', label: dict.kittens.filterAll },
    { key: 'available', label: dict.kittens.filterAvailable },
    { key: 'reserved', label: dict.kittens.filterReserved },
    { key: 'sold', label: dict.kittens.filterSold },
  ]

  return (
    <>
      {kittens.length > 0 && (
        <div className="flex flex-wrap gap-x-8 gap-y-3 px-6 pt-14 sm:px-[70px] sm:pt-20">
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
