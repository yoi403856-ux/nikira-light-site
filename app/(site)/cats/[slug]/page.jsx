import Link from 'next/link'
import { Check } from 'lucide-react'
import { notFound } from 'next/navigation'
import { PageHead, Eyebrow, Btn, Contain } from '@/components/ui'
import CatRows from '@/components/CatRows'
import { getCat, getKittensByParent } from '@/lib/api'
import { getLocale, getDict, hreflangAlternates } from '@/lib/i18n'
import { withLocale } from '@/lib/locale'
import { urlForImage, urlForImageCrop, } from '@/sanity/image'
import { pick, pickList, sexLabel, dateLocale } from '@/lib/dict'

export async function generateMetadata({ params }) {
  const locale = getLocale()
  const c = await getCat(params.slug)
  if (!c) return { title: 'Nikira Light' }
  const call = pick(locale, c.call, c.callEn) || c.name
  const color = pick(locale, c.color, c.colorEn) || c.ems
  return {
    title: `${call} — Nikira Light`,
    description: [call, sexLabel(locale, c.sex), color].filter(Boolean).join(', '),
    alternates: hreflangAlternates(`/cats/${params.slug}`, locale),
  }
}

export default async function CatPage({ params }) {
  const locale = getLocale()
  const dict = getDict()
  const c = await getCat(params.slug)
  if (!c) notFound()

  const kittens = await getKittensByParent(c._id)
  const call = pick(locale, c.call, c.callEn) || c.name
  const color = pick(locale, c.color, c.colorEn)
  const titles = pick(locale, c.titles, c.titlesEn)
  const note = pick(locale, c.note, c.noteEn)
  const tests = pickList(locale, c.tests, c.testsEn)
  const images = (c.images || []).map((img) => urlForImageCrop(img, 1000, 1000)).filter(Boolean)
  const born = c.born
    ? new Date(c.born).toLocaleDateString(dateLocale[locale], { day: 'numeric', month: 'long', year: 'numeric' })
    : null

  const rows = [
    [dict.common.color, color],
    [dict.common.ems, c.ems],
    [dict.common.sex, sexLabel(locale, c.sex)],
    [dict.common.weight, c.weight],
    [c.sex === 'male' ? dict.common.born : dict.common.bornF, born],
    [dict.common.titles, titles],
  ].filter(([, v]) => v)

  return (
    <>
      <PageHead
        num={sexLabel(locale, c.sex)}
        title={call}
        lead={[color || c.ems, titles].filter(Boolean).join(' · ')}
        className="pb-10 sm:pb-14"
      />

      <div className="panel">
        <Contain>
          <div className="grid gap-10 px-6 py-12 sm:grid-cols-[1.15fr_0.85fr] sm:gap-[70px] sm:px-[70px] sm:py-20">
            <div className="grid grid-cols-2 gap-3.5">
              {images.map((src, i) => (
                <figure
                  key={src}
                  className={`overflow-hidden bg-linen ${i === 0 ? 'col-span-2 aspect-[4/3]' : 'aspect-square'}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={call} className="h-full w-full object-cover" />
                </figure>
              ))}
            </div>

            <div>
              <p className="font-caps text-[11px] uppercase tracking-[0.22em] text-soft">{c.name}</p>
              <div className="mb-1.5 mt-3.5 flex flex-wrap items-center gap-3">
                <h2 className="font-display text-[36px] leading-[1.05] sm:text-[54px]">{call}</h2>
                {c.polydactyl && (
                  <span className="inline-block border border-ember/50 px-3 py-1.5 font-caps text-[10px] uppercase tracking-[0.2em] text-ember">
                    {dict.common.polydactyl}
                  </span>
                )}
              </div>
              {note && <p className="mt-5 font-sans text-[16px] font-light leading-[1.95] text-soft">{note}</p>}

              {/*
                Подписи слева были text-sand — светлый бежевый почти сливался
                с бумажным фоном. text-ember — тот же акцент, что у "eyebrow"
                по всему сайту, читается заметно лучше.
              */}
              <dl className="mt-9 border-t border-ink/[0.16]">
                {rows.map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[110px_1fr] gap-3 border-b border-ink/[0.12] py-4 sm:grid-cols-[150px_1fr] sm:gap-5">
                    <dt className="pt-1 font-caps text-[10px] uppercase tracking-[0.26em] text-ember">{k}</dt>
                    <dd className="font-display text-[17px] sm:text-[20px]">{v}</dd>
                  </div>
                ))}
              </dl>

              {tests.length > 0 && (
                <>
                  <p className="eyebrow mt-8">{dict.common.health}</p>
                  {/* Галочка + акцентная линия слева вместо голой рамки —
                      плоский бордер-бокс с текстом внутри был один в один
                      как у Summer Cherry. */}
                  <ul className="mt-4 flex flex-wrap gap-3">
                    {tests.map((t) => (
                      <li
                        key={t}
                        className="flex items-center gap-2 border-l-2 border-ember bg-linen/50 py-2 pl-3 pr-4 font-sans text-[12px] tracking-[0.02em] text-ink"
                      >
                        <Check size={13} strokeWidth={2.5} className="shrink-0 text-ember" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <div className="mt-9">
                <Btn href="#footer">{dict.common.askKittens}</Btn>
              </div>
            </div>
          </div>

          {kittens.length > 0 && (
            <>
              <div className="flex flex-col items-start justify-between gap-4 px-6 pb-10 sm:flex-row sm:items-end sm:px-[70px]">
                <div>
                  <Eyebrow>{dict.common.offspring}</Eyebrow>
                  <h2 className="mt-4 font-display text-[26px] sm:text-[40px]">
                    {dict.common.offspring} · {call}
                  </h2>
                </div>
                <Link
                  href={withLocale('/kittens', locale)}
                  className="font-caps text-[11px] uppercase tracking-[0.2em] text-soft transition-colors hover:text-ember"
                >
                  {dict.common.allKittens} →
                </Link>
              </div>
              <CatRows cats={kittens} locale={locale} dict={dict} hrefBase="/kittens" />
            </>
          )}
        </Contain>
      </div>
    </>
  )
}
