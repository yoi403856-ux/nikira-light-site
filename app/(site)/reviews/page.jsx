import { PageHead, Eyebrow, Btn, Contain } from '@/components/ui'
import { getReviews } from '@/lib/api'
import { getReviewsContent } from '@/lib/content'
import { getLocale, getDict, hreflangAlternates } from '@/lib/i18n'
import { urlForImage } from '@/sanity/image'
import { pick, dateLocale } from '@/lib/dict'

export async function generateMetadata() {
  const locale = getLocale()
  const d = await getReviewsContent(locale)
  return {
    title: `${d.heroTitle} — Nikira Light`,
    description: d.heroLead,
    alternates: hreflangAlternates('/reviews', locale),
  }
}

/*
  Отзывы у этого питомника — присланные покупателями скриншоты переписок и
  видео, а не набранные тексты. Поэтому страница устроена как галерея разной
  высоты, а не как список цитат: скриншоты бывают вытянутыми, и загонять их в
  одинаковые карточки значит резать содержимое.
*/
export default async function ReviewsPage() {
  const locale = getLocale()
  const dict = getDict()
  const [reviews, d] = await Promise.all([getReviews(), getReviewsContent(locale)])

  return (
    <>
      <PageHead num={d.heroEyebrow} title={d.heroTitle} lead={d.heroLead} />

      <div className="panel">
        <Contain>
          {reviews.length > 0 && (
            <section className="px-6 pt-14 sm:columns-2 sm:gap-6 sm:px-[70px] sm:pt-20 lg:columns-3">
              {reviews.map((r) => {
                const text = pick(locale, r.text, r.textEn)
                const src = r.image ? urlForImage(r.image, 900) : null
                const when = r.date
                  ? new Date(r.date).toLocaleDateString(dateLocale[locale], { month: 'long', year: 'numeric' })
                  : null
                const caption = [r.author, when].filter(Boolean).join(' · ')

                return (
                  <figure key={r._id} className="mb-6 break-inside-avoid border border-ink/10 bg-linen/40 p-3">
                    {r.kind === 'video' && r.video ? (
                      <a
                        href={r.video}
                        target="_blank"
                        rel="noreferrer"
                        className="flex aspect-video items-center justify-center bg-ink/[0.06] font-caps text-[11px] uppercase tracking-[0.22em] text-soft transition-colors hover:text-ember"
                      >
                        {dict.common.video} →
                      </a>
                    ) : src ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={src} alt={caption || ''} className="w-full" />
                    ) : (
                      <blockquote className="px-4 py-6 font-display text-[19px] leading-[1.5]">{text}</blockquote>
                    )}
                    {caption && (
                      <figcaption className="px-1 pb-1 pt-3 font-caps text-[10px] uppercase tracking-[0.22em] text-soft">
                        {caption}
                      </figcaption>
                    )}
                  </figure>
                )
              })}
            </section>
          )}

          <section
            className={`border-ink/[0.14] px-6 text-center sm:px-[70px] ${
              reviews.length ? 'border-t py-16 sm:py-24' : 'py-10 sm:py-16'
            }`}
          >
            <Eyebrow>{d.ctaEyebrow}</Eyebrow>
            <h2 className="mx-auto my-6 max-w-[760px] font-display text-[32px] leading-[1.1] sm:text-[56px]">
              {d.ctaH2a}
              <i className="not-italic text-ember">{d.ctaH2b}</i>.
            </h2>
            <Btn href="#footer" kind="line">
              {dict.common.write}
            </Btn>
          </section>
        </Contain>
      </div>
    </>
  )
}
