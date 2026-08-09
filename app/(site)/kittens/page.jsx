import LitterStrips from '@/components/LitterStrips'
import { PageHead, Eyebrow, Btn } from '@/components/ui'
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

  return (
    <>
      <PageHead num={d.heroEyebrow} title={d.heroTitle} lead={d.heroLead} />

      <div className="panel">
        <LitterStrips kittens={kittens} locale={locale} dict={dict} />

        <section className="px-6 py-[70px] text-center sm:px-[70px] sm:py-[110px]">
          <Eyebrow>{d.waitEyebrow}</Eyebrow>
          <h2 className="mx-auto my-6 max-w-[760px] font-display text-[32px] leading-[1.1] sm:text-[56px]">
            {d.waitH2a}
            <i className="not-italic text-ember">{d.waitH2b}</i>.
          </h2>
          <Btn href="#footer">{d.waitCta}</Btn>
        </section>
      </div>
    </>
  )
}
