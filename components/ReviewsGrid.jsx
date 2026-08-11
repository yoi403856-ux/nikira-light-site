'use client'

import { useState } from 'react'
import { Play } from 'lucide-react'
import { urlForImage } from '@/sanity/image'
import { pick, dateLocale } from '@/lib/dict'
import Lightbox from './Lightbox'

/*
  Masonry-галерея на /reviews. Клик по скриншоту открывает его во весь
  экран (Lightbox) с пролистыванием стрелками/клавишами/свайпом между
  остальными скриншотами-отзывами — видео и текстовые отзывы в это
  пролистывание не попадают: у видео и так есть переход по ссылке, у
  текста нет изображения, которое имело бы смысл увеличивать.
*/
export default function ReviewsGrid({ reviews, locale, dict }) {
  const items = reviews.map((r) => {
    const text = pick(locale, r.text, r.textEn)
    const when = r.date
      ? new Date(r.date).toLocaleDateString(dateLocale[locale], { month: 'long', year: 'numeric' })
      : null
    const caption = [r.author, when].filter(Boolean).join(' · ')
    return {
      ...r,
      text,
      caption,
      thumb: r.image ? urlForImage(r.image, 900) : null,
      full: r.image ? urlForImage(r.image, 1800) : null,
    }
  })

  const imageItems = items.filter((it) => it.full)
  const [openIndex, setOpenIndex] = useState(null)

  const openAt = (item) => {
    const idx = imageItems.findIndex((it) => it._id === item._id)
    if (idx !== -1) setOpenIndex(idx)
  }

  if (!items.length) return null

  return (
    <>
      <section className="px-6 pt-8 sm:columns-2 sm:gap-6 sm:px-[70px] sm:pt-10 lg:columns-4">
        {items.map((r) => (
          <figure key={r._id} className="mb-6 break-inside-avoid border border-ink/10 bg-linen/40 p-3">
            {r.kind === 'video' && r.video ? (
              <a
                href={r.video}
                target="_blank"
                rel="noreferrer"
                className="group/video relative flex aspect-video items-center justify-center overflow-hidden bg-ink"
              >
                <span className="grain pointer-events-none absolute inset-0 opacity-40" />
                <span className="relative z-[1] flex h-14 w-14 items-center justify-center rounded-full bg-glow/90 text-ink transition-transform duration-300 group-hover/video:scale-110">
                  <Play size={22} fill="currentColor" strokeWidth={0} className="ml-0.5" />
                </span>
              </a>
            ) : r.thumb ? (
              <button type="button" onClick={() => openAt(r)} className="block w-full cursor-zoom-in">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={r.thumb} alt={r.caption || ''} className="w-full" />
              </button>
            ) : (
              <blockquote className="px-4 py-6 font-display text-[19px] leading-[1.5]">{r.text}</blockquote>
            )}
            {r.caption && (
              <figcaption className="px-1 pb-1 pt-3 font-caps text-[10px] uppercase tracking-[0.22em] text-soft">
                {r.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </section>

      <Lightbox
        items={imageItems.map((it) => ({ src: it.full, caption: it.caption }))}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onPrev={() => setOpenIndex((i) => (i - 1 + imageItems.length) % imageItems.length)}
        onNext={() => setOpenIndex((i) => (i + 1) % imageItems.length)}
      />
    </>
  )
}
