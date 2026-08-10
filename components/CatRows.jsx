import Link from 'next/link'
import { urlForImageCrop } from '@/sanity/image'
import { pick, sexLabel } from '@/lib/dict'
import { withLocale } from '@/lib/locale'

/*
  Плитка карточек — тот же приём, что у котят в LitterStrips: фото на всю
  карточку, кличка поверх на градиенте, факты строкой под кадром. Раньше
  коты шли списком строк с фото в узкой колонке сбоку — сознательно
  отличались от Summer Cherry, но список зажимал фото и смотрелся бедно.
  Единый язык с котятами оказался важнее непохожести.
*/
export default function CatRows({ cats, locale, dict, hrefBase = '/cats' }) {
  if (!cats?.length) {
    return (
      <p className="px-6 py-16 text-center font-sans text-[16px] font-light text-soft sm:px-[70px]">{dict.common.noCats}</p>
    )
  }

  return (
    <section className="grid grid-cols-2 gap-5 px-6 pb-2 pt-8 sm:grid-cols-3 sm:gap-8 sm:px-[70px] sm:pt-10 lg:grid-cols-4">
      {cats.map((c) => {
        const src = c.images?.[0] ? urlForImageCrop(c.images[0], 460, 613) : null
        const call = pick(locale, c.call, c.callEn) || c.name
        const color = pick(locale, c.color, c.colorEn)
        const facts = [sexLabel(locale, c.sex), color || c.ems].filter(Boolean).join(' · ')
        return (
          <Link key={c._id} href={withLocale(`${hrefBase}/${c.slug}`, locale)} className="group">
            <div className="relative aspect-[3/4] overflow-hidden bg-linen">
              {src && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={src}
                  alt={call}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              )}
              <span
                className="pointer-events-none absolute inset-0"
                style={{ background: 'linear-gradient(180deg,rgba(30,24,16,0) 46%,rgba(30,24,16,0.72) 100%)' }}
              />
              <span className="absolute bottom-3.5 left-3.5 z-[2] font-display text-[22px] text-paper sm:bottom-4 sm:left-[18px] sm:text-[30px]">
                {call}
              </span>
            </div>
            <p className="mt-3.5 font-sans text-[13px] font-light text-soft">{facts}</p>
          </Link>
        )
      })}
    </section>
  )
}
