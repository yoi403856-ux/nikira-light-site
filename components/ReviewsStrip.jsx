import { Play } from 'lucide-react'
import { urlForImage } from '@/sanity/image'
import { pick, dateLocale } from '@/lib/dict'

/*
  Карусель вместо отдельной страницы /reviews в меню: отзывов немного,
  отдельная страница ради них избыточна (см. правку навигации в
  app/(site)/layout.jsx). Карточки одной ширины и высоты — в отличие от
  прежней masonry-галереи, где разные скриншоты шли вразнобой; для ленты со
  скроллом одинаковый размер важнее, чем сохранение исходных пропорций
  каждого скриншота целиком.
*/
export default function ReviewsStrip({ reviews, locale, dict }) {
  if (!reviews?.length) return null

  return (
    <div className="strip flex gap-5 overflow-x-auto px-6 pb-9 sm:gap-6 sm:px-[70px]">
      {reviews.map((r) => {
        const text = pick(locale, r.text, r.textEn)
        const src = r.image ? urlForImage(r.image, 700) : null
        const when = r.date
          ? new Date(r.date).toLocaleDateString(dateLocale[locale], { month: 'long', year: 'numeric' })
          : null
        const caption = [r.author, when].filter(Boolean).join(' · ')

        return (
          <div key={r._id} className="w-[240px] flex-none snap-start sm:w-[300px]">
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
            ) : src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={src} alt={caption || ''} className="aspect-[3/4] w-full border border-ink/10 object-cover" />
            ) : (
              <blockquote className="flex aspect-[3/4] items-center border border-ink/10 bg-linen/40 px-5 py-6 font-display text-[17px] leading-[1.4]">
                {text}
              </blockquote>
            )}
            {caption && <p className="mt-3 font-caps text-[10px] uppercase tracking-[0.22em] text-soft">{caption}</p>}
          </div>
        )
      })}
    </div>
  )
}
