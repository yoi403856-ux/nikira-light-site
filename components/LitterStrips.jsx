import Link from 'next/link'
import { urlForImageCrop } from '@/sanity/image'
import { pick, sexLabel, kittenStatusLabel, freeOf, dateLocale } from '@/lib/dict'
import { withLocale } from '@/lib/locale'

/*
  Котята сгруппированы по помётам, внутри помёта — плиткой (тот же приём,
  что у котов в CatRows). Так покупателю сразу видно, кто от кого и когда
  родился, — плоский список котят этого не показывает. Кличка и статус
  лежат прямо на кадре, поэтому под ним хватает одной строки, а не таблицы
  характеристик.
*/
function groupByLitter(kittens) {
  const map = new Map()
  for (const k of kittens) {
    const key = k.litter || '—'
    if (!map.has(key)) map.set(key, [])
    map.get(key).push(k)
  }
  // помёты идут от свежего к старому — по самой поздней дате рождения внутри
  return [...map.entries()].sort((a, b) => {
    const newest = (list) => list.reduce((m, k) => (k.born && k.born > m ? k.born : m), '')
    return newest(b[1]).localeCompare(newest(a[1]))
  })
}

export default function LitterStrips({ kittens, locale, dict }) {
  if (!kittens?.length) return null

  const groups = groupByLitter(kittens)
  const fmt = (iso) =>
    iso ? new Date(iso).toLocaleDateString(dateLocale[locale], { day: 'numeric', month: 'long', year: 'numeric' }) : ''

  return (
    <>
      {groups.map(([litter, list]) => {
        const born = fmt(list.find((k) => k.born)?.born)
        const free = list.filter((k) => k.status === 'available').length
        // Родители общие на весь помёт — показываем их один раз здесь, а не
        // на странице каждого котёнка по отдельности (так было раньше, и
        // это буквально то же решение, что на Summer Cherry — карточки
        // родителей продублированы в каждом котёнке одного помёта).
        const parents = [
          { role: dict.common.mother, p: list[0]?.mother },
          { role: dict.common.father, p: list[0]?.father },
        ].filter((x) => x.p)
        return (
          <section key={litter} className="border-t border-ink/[0.14] px-6 pb-2 pt-11 first:border-t-0 sm:px-[70px] sm:pt-[70px]">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-8 sm:gap-12">
              <div>
                <h2 className="font-display text-[28px] leading-none sm:text-[42px]">
                  {litter === '—' ? dict.common.litter : `${dict.common.litter} ${litter}`}
                </h2>
                <p className="mt-3 font-sans text-[14px] font-light text-soft">
                  {[
                    born && `${dict.common.born.toLowerCase()} ${born}`,
                    free ? freeOf(locale, free, list.length) : dict.common.allPlaced,
                  ]
                    .filter(Boolean)
                    .join(' · ')}
                </p>
              </div>

              {parents.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {parents.map(({ role, p }) => {
                    const pSrc = p.images?.[0] ? urlForImageCrop(p.images[0], 280, 280) : null
                    const pName = pick(locale, p.call, p.callEn) || p.name
                    return (
                      <Link
                        key={p._id}
                        href={withLocale(`/cats/${p.slug}`, locale)}
                        className="group flex items-center gap-4 border border-ink/10 bg-linen/40 p-4 transition-colors hover:border-ember/40"
                      >
                        <span className="h-20 w-20 shrink-0 overflow-hidden sm:h-24 sm:w-24">
                          {pSrc && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={pSrc} alt={pName} className="h-full w-full object-cover" />
                          )}
                        </span>
                        <span>
                          <span className="eyebrow block">{role}</span>
                          <span className="mt-1 block font-display text-[22px] sm:text-[26px]">{pName}</span>
                        </span>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-5 pb-9 sm:grid-cols-3 sm:gap-8 lg:grid-cols-4">
              {list.map((k) => {
                const src = k.images?.[0] ? urlForImageCrop(k.images[0], 612, 816) : null
                const s = kittenStatusLabel(locale, k.status, k.born)
                const name = pick(locale, k.name, k.nameEn)
                const color = pick(locale, k.color, k.colorEn) || k.ems
                return (
                  <Link key={k._id} href={withLocale(`/kittens/${k.slug}`, locale)} className="group">
                    <div className="relative aspect-[3/4] overflow-hidden bg-linen">
                      {src && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={src}
                          alt={name}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        />
                      )}
                      <span
                        className="pointer-events-none absolute inset-0"
                        style={{ background: 'linear-gradient(180deg,rgba(30,24,16,0) 46%,rgba(30,24,16,0.72) 100%)' }}
                      />
                      <span
                        className={`absolute left-3.5 top-3.5 z-[2] bg-paper/[0.92] px-3 py-1.5 font-caps text-[9.5px] uppercase tracking-[0.24em] sm:left-[18px] sm:top-4 ${
                          k.status === 'sold' ? 'text-soft' : 'text-ember'
                        }`}
                      >
                        {s.label}
                      </span>
                      <span className="absolute bottom-3.5 left-3.5 z-[2] font-display text-[25px] text-paper sm:bottom-4 sm:left-[18px] sm:text-[32px]">
                        {name}
                      </span>
                    </div>
                    <p className="mt-3.5 font-sans text-[13px] font-light text-soft">
                      {[sexLabel(locale, k.sex), color, k.polydactyl && dict.common.polydactyl]
                        .filter(Boolean)
                        .join(' · ')}
                    </p>
                  </Link>
                )
              })}
            </div>
          </section>
        )
      })}
    </>
  )
}
