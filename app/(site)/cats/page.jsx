import CatRows from '@/components/CatRows'
import { PageHead, Eyebrow, Btn } from '@/components/ui'
import { getCats } from '@/lib/api'
import { getCatsContent } from '@/lib/content'
import { getLocale, getDict, hreflangAlternates } from '@/lib/i18n'
import { withLocale } from '@/lib/locale'

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

  // кошек в питомнике заметно больше, чем котов, поэтому показываем их
  // отдельными блоками, а не сваливаем в один список
  const females = cats.filter((c) => c.sex === 'female')
  const males = cats.filter((c) => c.sex === 'male')

  return (
    <>
      <PageHead num={d.heroEyebrow} title={d.heroTitle} lead={d.heroLead} />

      <div className="panel">
        {males.length > 0 && (
          <>
            <h2 className="px-6 pb-6 pt-14 font-display text-[26px] sm:px-[70px] sm:pt-20 sm:text-[34px]">
              {dict.cats.filterMale}
            </h2>
            <CatRows cats={males} locale={locale} dict={dict} />
          </>
        )}

        {females.length > 0 && (
          <>
            <h2 className="px-6 pb-6 pt-14 font-display text-[26px] sm:px-[70px] sm:pt-20 sm:text-[34px]">
              {dict.cats.filterFemale}
            </h2>
            <CatRows cats={females} locale={locale} dict={dict} />
          </>
        )}

        {cats.length === 0 && <CatRows cats={[]} locale={locale} dict={dict} />}

        <section className="px-6 py-[70px] sm:px-[70px] sm:py-[110px]">
          <Eyebrow>{d.docsEyebrow}</Eyebrow>
          <h2 className="my-6 max-w-[760px] font-display text-[32px] leading-[1.1] sm:text-[56px]">
            {d.docsH2a}
            <i className="not-italic text-ember">{d.docsH2b}</i>.
          </h2>
          <p className="mb-9 max-w-[620px] font-sans text-[16px] font-light leading-[1.95] text-soft">{d.docsText}</p>
          <Btn href={withLocale('/contacts', locale)} kind="line">
            {dict.common.write}
          </Btn>
        </section>
      </div>
    </>
  )
}
