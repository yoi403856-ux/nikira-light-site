import Link from 'next/link'
import { urlForImageCrop } from '@/sanity/image'
import { pick, sexLabel, statusMap, dateLocale } from '@/lib/dict'
import { withLocale } from '@/lib/locale'

/*
  Котята сгруппированы по помётам, внутри помёта идут горизонтальной лентой.
  Так покупателю сразу видно, кто от кого и когда родился, — плоский список
  котят этого не показывает. Кличка и статус лежат прямо на кадре, поэтому
  под ним хватает одной строки, а не таблицы характеристик.
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
        const parents = [list[0]?.mother, list[0]?.father]
          .filter(Boolean)
          .map((p) => pick(locale, p.call, p.callEn) || p.name)
          .join(' и ')
        return (
          <section key={litter} className="border-t border-ink/[0.14] px-6 pb-2 pt-11 first:border-t-0 sm:px-[70px] sm:pt-[70px]">
            <div className="mb-8 flex flex-wrap items-baseline justify-between gap-6">
              <h2 className="font-display text-[28px] leading-none sm:text-[42px]">
                {litter === '—' ? dict.common.litter : `${dict.common.litter} ${litter}`}
              </h2>
              <p className="font-sans text-[14px] font-light text-soft">
                {[
                  born && `${dict.common.born.toLowerCase()} ${born}`,
                  parents,
                  free ? dict.common.freeOf(free, list.length) : dict.common.allPlaced,
                ]
                  .filter(Boolean)
                  .join(' · ')}
              </p>
            </div>

            <div className="strip flex gap-5 overflow-x-auto pb-9">
              {list.map((k) => {
                const src = k.images?.[0] ? urlForImageCrop(k.images[0], 612, 816) : null
                const s = statusMap[locale][k.status] || statusMap[locale].available
                const name = pick(locale, k.name, k.nameEn)
                const color = pick(locale, k.color, k.colorEn) || k.ems
                return (
                  <Link
                    key={k._id}
                    href={withLocale(`/kittens/${k.slug}`, locale)}
                    className="group w-[240px] flex-none snap-start sm:w-[306px]"
                  >
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
