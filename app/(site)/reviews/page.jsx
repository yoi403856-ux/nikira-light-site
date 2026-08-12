import ReviewsGrid from '@/components/ReviewsGrid'
import { PageHead, Eyebrow, Btn, Contain } from '@/components/ui'
import { getReviews } from '@/lib/api'
import { getReviewsContent } from '@/lib/content'
import { getLocale, getDict, hreflangAlternates } from '@/lib/i18n'

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
      <PageHead title={d.heroTitle} lead={d.heroLead} compact />

      <div className="panel">
        <Contain>
          <ReviewsGrid reviews={reviews} locale={locale} dict={dict} />

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
