'use client'

import { useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'
import { urlForImage } from '@/sanity/image'
import { pick, dateLocale } from '@/lib/dict'
import Lightbox from './Lightbox'

/*
  Карусель вместо отдельной страницы /reviews в меню: отзывов немного,
  отдельная страница ради них избыточна (см. правку навигации в
  app/(site)/layout.jsx). Карточки одной ширины и высоты — в отличие от
  масштабной галереи на /reviews, где разные скриншоты идут вразнобой; для
  ленты со скроллом одинаковый размер важнее, чем сохранение исходных
  пропорций каждого скриншота целиком.

  Стрелки вместо голого скролла: свайп/скролл остаётся (снап по карточкам),
  но на десктопе тянуть мышкой по узкой полосе неудобно — стрелки листают
  на одну карточку за клик. Клик по самому скриншоту открывает Lightbox с
  тем же набором фото, что и на /reviews.
*/
export default function ReviewsStrip({ reviews, locale, dict }) {
  const trackRef = useRef(null)
  const [openIndex, setOpenIndex] = useState(null)

  if (!reviews?.length) return null

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
      thumb: r.image ? urlForImage(r.image, 700) : null,
      full: r.image ? urlForImage(r.image, 1800) : null,
    }
  })

  const imageItems = items.filter((it) => it.full)
  const openAt = (item) => {
    const idx = imageItems.findIndex((it) => it._id === item._id)
    if (idx !== -1) setOpenIndex(idx)
  }

  const scrollByCard = (dir) => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector('[data-card]')
    const step = card ? card.getBoundingClientRect().width + 20 : 300
    track.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  return (
    <div className="relative">
      <div ref={trackRef} className="strip flex gap-5 overflow-x-auto px-6 pb-9 sm:gap-6 sm:px-[70px]">
        {items.map((r) => (
          <div key={r._id} data-card className="w-[240px] flex-none snap-start sm:w-[300px]">
            {r.kind === 'video' && r.video ? (
              <a
                href={r.video}
                target="_blank"
                rel="noreferrer"
                className="group/video relative flex aspect-[3/4] items-center justify-center overflow-hidden bg-ink"
              >
                <span className="grain pointer-events-none absolute inset-0 opacity-40" />
                <span className="relative z-[1] flex h-14 w-14 items-center justify-center rounded-full bg-glow/90 text-ink transition-transform duration-300 group-hover/video:scale-110">
                  <Play size={22} fill="currentColor" strokeWidth={0} className="ml-0.5" />
                </span>
              </a>
            ) : r.thumb ? (
              <button type="button" onClick={() => openAt(r)} className="block aspect-[3/4] w-full cursor-zoom-in overflow-hidden border border-ink/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={r.thumb} alt={r.caption || ''} className="h-full w-full object-cover" />
              </button>
            ) : (
              <blockquote className="flex aspect-[3/4] items-center border border-ink/10 bg-linen/40 px-5 py-6 font-display text-[17px] leading-[1.4]">
                {r.text}
              </blockquote>
            )}
            {r.caption && <p className="mt-3 font-caps text-[10px] uppercase tracking-[0.22em] text-soft">{r.caption}</p>}
          </div>
        ))}
      </div>

      {items.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label={locale === 'en' ? 'Previous' : 'Назад'}
            className="absolute left-1 top-[calc(50%-18px)] hidden h-11 w-11 -translate-y-1/2 items-center justify-center border border-ink/15 bg-paper/90 text-ink transition-colors hover:border-ember hover:text-ember sm:flex"
          >
            <ChevronLeft size={22} strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label={locale === 'en' ? 'Next' : 'Вперёд'}
            className="absolute right-1 top-[calc(50%-18px)] hidden h-11 w-11 -translate-y-1/2 items-center justify-center border border-ink/15 bg-paper/90 text-ink transition-colors hover:border-ember hover:text-ember sm:flex"
          >
            <ChevronRight size={22} strokeWidth={1.5} />
          </button>
        </>
      )}

      <Lightbox
        items={imageItems.map((it) => ({ src: it.full, caption: it.caption }))}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onPrev={() => setOpenIndex((i) => (i - 1 + imageItems.length) % imageItems.length)}
        onNext={() => setOpenIndex((i) => (i + 1) % imageItems.length)}
      />
    </div>
  )
}
