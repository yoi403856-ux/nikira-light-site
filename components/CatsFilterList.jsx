'use client'

import { useMemo, useState } from 'react'
import CatRows from './CatRows'

/*
  Раньше коты и кошки были жёстко разбиты на два блока подряд — чтобы
  посмотреть только кошек, нужно было пролистать мимо котов. Вкладки решают
  ту же задачу переключением, а не прокруткой, и не плодят два одинаковых
  списка с разными заголовками.
*/
export default function CatsFilterList({ cats, locale, dict }) {
  const [filter, setFilter] = useState('all')

  const filtered = useMemo(() => {
    if (filter === 'all') return cats
    return cats.filter((c) => c.sex === filter)
  }, [cats, filter])

  const tabs = [
    { key: 'all', label: dict.cats.filterAll },
    { key: 'male', label: dict.cats.filterMale },
    { key: 'female', label: dict.cats.filterFemale },
  ]

  return (
    <>
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
      <CatRows cats={filtered} locale={locale} dict={dict} />
    </>
  )
}
