import { PageHead, SectionHead, QuoteBand, Btn, Eyebrow } from '@/components/ui'
import { getSettings, getCats } from '@/lib/api'
import { getAboutContent } from '@/lib/content'
import { getLocale, getDict, hreflangAlternates } from '@/lib/i18n'
import { withLocale } from '@/lib/locale'
import { urlForImageCrop } from '@/sanity/image'
import { resolveContacts } from '@/lib/contacts'
import { pick } from '@/lib/dict'

export async function generateMetadata() {
  const locale = getLocale()
  const d = await getAboutContent(locale)
  return {
    title: `${d.heroTitle} — Nikira Light`,
    description: d.heroLead,
    alternates: hreflangAlternates('/about', locale),
  }
}

export default async function AboutPage() {
  const locale = getLocale()
  const dict = getDict()
  const [settings, cats, d] = await Promise.all([getSettings(), getCats(), getAboutContent(locale)])
  const c = resolveContacts(settings, locale)
  const delivery = pick(locale, settings?.delivery, settings?.deliveryEn)
  const bandPhoto = settings?.aboutPhoto
    ? urlForImageCrop(settings.aboutPhoto, 1600, 1000)
    : cats[1]?.images?.[0]
      ? urlForImageCrop(cats[1].images[0], 1600, 1000)
      : null

  return (
    <>
      <PageHead num={d.heroEyebrow} title={d.heroTitle} lead={d.heroLead} />

      <div className="panel">
        <SectionHead num={d.storyEyebrow} aside={d.aside}>
          {d.storyH2a}
          <i className="not-italic text-ember">{d.storyH2b}</i>.
        </SectionHead>

        <section className="max-w-[1020px] px-6 pb-[70px] sm:px-[70px] sm:pb-[120px]">
          <div className="columns-1 gap-16 font-sans text-[16px] font-light leading-[2] text-soft sm:columns-2">
            {[d.p1, d.p2, d.p3, d.p4].filter(Boolean).map((p, i) => (
              <p key={i} className="mb-5 break-inside-avoid">
                {p}
              </p>
            ))}
          </div>
        </section>

        <section className="px-6 pb-[70px] sm:px-[70px] sm:pb-[120px]">
          <Eyebrow>{d.featuresEyebrow}</Eyebrow>
          <div className="mt-8 grid gap-px border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
            {d.features.map((v, i) => (
              <div key={i} className="h-full bg-paper p-7">
                <h3 className="font-display text-[22px]">{v.t}</h3>
                <p className="mt-3 font-sans text-[14px] font-light leading-relaxed text-soft">{v.d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-wrap gap-9 px-6 pb-[70px] sm:gap-[76px] sm:px-[70px] sm:pb-[120px]">
          {[
            [c.foundedYear, locale === 'en' ? 'founded' : 'год основания'],
            [c.registry, locale === 'en' ? 'registration' : 'регистрация'],
            [c.city, locale === 'en' ? 'where we are' : 'где мы'],
            [delivery, locale === 'en' ? 'delivery' : 'доставка'],
          ]
            .filter(([n]) => n)
            .map(([n, label]) => (
              <div key={label} className="max-w-[260px]">
                <b className="block font-display text-[26px] font-normal leading-tight sm:text-[34px]">{n}</b>
                <span className="eyebrow mt-3 block">{label}</span>
              </div>
            ))}
        </section>
      </div>

      <QuoteBand src={bandPhoto} eyebrow={d.quoteEyebrow}>
        {d.quote}
      </QuoteBand>

      <div className="panel">
        <section className="flex flex-col items-start gap-3.5 px-6 py-[70px] sm:flex-row sm:px-[70px] sm:py-[110px]">
          <Btn href={withLocale('/cats', locale)}>{dict.nav.cats}</Btn>
          <Btn href={withLocale('/kittens', locale)} kind="line">
            {dict.nav.kittens}
          </Btn>
        </section>
      </div>
    </>
  )
}
