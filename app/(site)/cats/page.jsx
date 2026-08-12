import CatsFilterList from '@/components/CatsFilterList'
import { PageHead, Eyebrow, Btn, Contain } from '@/components/ui'
import Reveal from '@/components/Reveal'
import { getCats } from '@/lib/api'
import { getCatsContent } from '@/lib/content'
import { getLocale, getDict, hreflangAlternates } from '@/lib/i18n'

export async function generateMetadata() {
  const locale = getLocale()
  const d = await getCatsContent(locale)
  return {
    title: `${d.heroTitle} — Nikira Light`,
    description: d.heroLead,
    alternates: hreflangAlternates('/cats', locale),
  }
}

export default async function CatsPage() {
  const locale = getLocale()
  const dict = getDict()
  const [cats, d] = await Promise.all([getCats(), getCatsContent(locale)])

  return (
    <>
      <PageHead title={d.heroTitle} lead={d.heroLead} />

      <div className="panel">
        <Contain>
          <CatsFilterList cats={cats} locale={locale} dict={dict} />

          <Reveal as="section" className="px-6 py-[70px] text-center sm:px-[70px] sm:py-[110px]">
            <Eyebrow>{d.docsEyebrow}</Eyebrow>
            <h2 className="mx-auto my-6 max-w-[760px] font-display text-[32px] leading-[1.1] sm:text-[56px]">
              {d.docsH2a}
              <i className="not-italic text-ember">{d.docsH2b}</i>.
            </h2>
            <p className="mx-auto mb-9 max-w-[620px] font-sans text-[16px] font-light leading-[1.95] text-soft">{d.docsText}</p>
            <Btn href="#footer" kind="line">
              {dict.common.write}
            </Btn>
          </Reveal>
        </Contain>
      </div>
    </>
  )
}
