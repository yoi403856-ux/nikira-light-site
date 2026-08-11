import { notFound } from 'next/navigation'
import { Btn, Contain } from '@/components/ui'
import PhotoGallery from '@/components/PhotoGallery'
import { getKitten } from '@/lib/api'
import { getLocale, getDict, hreflangAlternates } from '@/lib/i18n'
import { pick, sexLabel, kindLabel, kittenStatusLabel, dateLocale } from '@/lib/dict'

export async function generateMetadata({ params }) {
  const locale = getLocale()
  const k = await getKitten(params.slug)
  if (!k) return { title: 'Nikira Light' }
  const name = pick(locale, k.name, k.nameEn)
  const color = pick(locale, k.color, k.colorEn) || k.ems
  const own = pick(locale, k.description, k.descriptionEn)
  return {
    title: `${name} — Nikira Light`,
    description: own || [name, sexLabel(locale, k.sex), color].filter(Boolean).join(', '),
    alternates: hreflangAlternates(`/kittens/${params.slug}`, locale),
  }
}

export default async function KittenPage({ params }) {
  const locale = getLocale()
  const dict = getDict()
  const k = await getKitten(params.slug)
  if (!k) notFound()

  const name = pick(locale, k.name, k.nameEn)
  const color = pick(locale, k.color, k.colorEn)
  const description = pick(locale, k.description, k.descriptionEn)
  const s = kittenStatusLabel(locale, k.status, k.born)
  const born = k.born
    ? new Date(k.born).toLocaleDateString(dateLocale[locale], { day: 'numeric', month: 'long', year: 'numeric' })
    : null

  const rows = [
    [dict.common.color, color],
    [dict.common.ems, k.ems],
    [dict.common.sex, sexLabel(locale, k.sex)],
    [k.sex === 'male' ? dict.common.born : dict.common.bornF, born],
    [dict.common.litter, k.litter],
    ['', kindLabel(locale, k.kind)],
  ].filter(([, v]) => v)

  return (
    <>
      <div className="panel">
        <Contain>
          <div className="grid gap-10 px-6 py-12 sm:grid-cols-[1.15fr_0.85fr] sm:gap-[70px] sm:px-[70px] sm:py-20">
            <PhotoGallery images={k.images} alt={name} />

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`inline-block border px-3.5 py-2 font-caps text-[9.5px] uppercase tracking-[0.24em] ${s.cls}`}
                >
                  {s.label}
                </span>
                {k.polydactyl && (
                  <span className="inline-block border border-ember/50 px-3.5 py-2 font-caps text-[9.5px] uppercase tracking-[0.24em] text-ember">
                    {dict.common.polydactyl}
                  </span>
                )}
              </div>
              <h2 className="mb-1.5 mt-4 font-display text-[36px] leading-[1.05] sm:text-[54px]">{name}</h2>
              {/* Раньше это же описание было только в шапке-фото (PageHead
                  lead), которую убрали как дублирующую кличку/факты ниже —
                  чтобы не потерять уникальный текст (не факт, а описание
                  характера), перенесли сюда, тем же приёмом, что и note у
                  котов. */}
              {description && (
                <p className="mt-5 font-sans text-[16px] font-light leading-[1.95] text-soft">{description}</p>
              )}

              <dl className="mt-8 border-t border-ink/[0.16]">
                {rows.map(([kk, v], i) => (
                  <div
                    key={`${kk}-${i}`}
                    className="grid grid-cols-[110px_1fr] gap-3 border-b border-ink/[0.12] py-4 sm:grid-cols-[150px_1fr] sm:gap-5"
                  >
                    <dt className="pt-1 font-caps text-[10px] uppercase tracking-[0.26em] text-ember">{kk}</dt>
                    <dd className="font-display text-[15px] sm:text-[18px]">{v}</dd>
                  </div>
                ))}
              </dl>

              {k.video && (
                <a
                  href={k.video}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-block font-caps text-[11px] uppercase tracking-[0.2em] text-soft transition-colors hover:text-ember"
                >
                  {dict.common.video} →
                </a>
              )}

              {k.status !== 'sold' && (
                <div className="mt-9">
                  <Btn href="#footer">{dict.common.askKittens}</Btn>
                </div>
              )}
            </div>
          </div>
        </Contain>
      </div>
    </>
  )
}
