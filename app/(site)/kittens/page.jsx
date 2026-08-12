import KittensFilterList from '@/components/KittensFilterList'
import { PageHead, Eyebrow, Btn, Contain } from '@/components/ui'
import { getKittens } from '@/lib/api'
import { getKittensContent } from '@/lib/content'
import { getLocale, getDict, hreflangAlternates } from '@/lib/i18n'

export async function generateMetadata() {
  const locale = getLocale()
  const d = await getKittensContent(locale)
  return {
    title: `${d.heroTitle} — Nikira Light`,
    description: d.heroLead,
    alternates: hreflangAlternates('/kittens', locale),
  }
}

export default async function KittensPage() {
  const locale = getLocale()
  const dict = getDict()
  const [kittens, d] = await Promise.all([getKittens(), getKittensContent(locale)])

  // "Не нашли своего" (d.waitEyebrow) написано для случая, когда список не
  // пуст, просто среди котят нет подходящего. При нулевом списке эта фраза
  // не подходит по смыслу — подменяем её на прямую констатацию.
  const emptyEyebrow = locale === 'en' ? 'No kittens right now' : 'Свободных котят сейчас нет'

  return (
    <>
      <PageHead title={d.heroTitle} lead={d.heroLead} />

      <div className="panel">
        <Contain>
          <KittensFilterList kittens={kittens} locale={locale} dict={dict} />

          <section
            className={`border-ink/[0.14] px-6 text-center sm:px-[70px] ${
              kittens.length
                ? 'border-t py-16 sm:py-24'
                : 'py-10 sm:py-16'
            }`}
          >
            <Eyebrow>{kittens.length ? d.waitEyebrow : emptyEyebrow}</Eyebrow>
            <h2 className="mx-auto my-6 max-w-[760px] font-display text-[32px] leading-[1.1] sm:text-[56px]">
              {d.waitH2a}
              <i className="not-italic text-ember">{d.waitH2b}</i>.
            </h2>
            <Btn href="#footer">{d.waitCta}</Btn>
          </section>
        </Contain>
      </div>
    </>
  )
}
