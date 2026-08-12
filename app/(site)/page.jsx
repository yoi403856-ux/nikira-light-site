import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import CatRows from '@/components/CatRows'
import ReviewsStrip from '@/components/ReviewsStrip'
import Reveal from '@/components/Reveal'
import HeroCatsRow from '@/components/HeroCatsRow'
import { Eyebrow, Btn, SectionHead, QuoteBand, Contain } from '@/components/ui'
import { getCats, getKittens, getReviews, getSettings } from '@/lib/api'
import { getHomeContent } from '@/lib/content'
import { getLocale, getDict, hreflangAlternates } from '@/lib/i18n'
import { withLocale } from '@/lib/locale'
import { urlForImage, urlForImageCrop } from '@/sanity/image'
import { resolveContacts } from '@/lib/contacts'

export async function generateMetadata() {
  const locale = getLocale()
  // описание берём из того же текста, что виден под заголовком на странице,
  // чтобы сниппет в поиске не разъезжался с сайтом
  const d = await getHomeContent(locale)
  return {
    title:
      locale === 'en'
        ? 'Nikira Light — Maine Coon cattery in Novorossiysk'
        : 'Nikira Light — питомник мейн-кунов в Новороссийске',
    description: d.lead,
    alternates: hreflangAlternates('/', locale),
  }
}

export default async function Home() {
  const locale = getLocale()
  const dict = getDict()
  const [cats, kittens, reviews, settings, d] = await Promise.all([
    getCats(),
    getKittens(),
    getReviews(),
    getSettings(),
    getHomeContent(locale),
  ])
  const c = resolveContacts(settings, locale)
  const heroCats = (settings?.heroCats || []).map((img) => urlForImage(img, 900))
  const bandPhoto = settings?.background
    ? urlForImageCrop(settings.background, 1600, 1000)
    : cats[0]?.images?.[0]
      ? urlForImageCrop(cats[0].images[0], 1600, 1000)
      : null
  const freeKittens = kittens.filter((k) => k.status === 'available').length

  return (
    <>
      {/* первый экран: текст слева, вырезанный кот справа, фон открыт.
          min-h тянет блок до низа экрана (100vh минус примерная высота шапки),
          чтобы под ним не проглядывала бумажная панель следующей секции на
          типичных ноутбучных высотах (900-1080px). max-h страхует от того,
          чтобы на низких экранах блок не растянуло выше контента. */}
      <section className="relative flex min-h-0 flex-col justify-center px-6 pb-[60px] pt-10 sm:min-h-[calc(100vh-264px)] sm:px-[70px] sm:pb-20 sm:pt-16">
        <Contain>
          <div
            className={`grid items-center gap-10 sm:gap-[70px] ${
              heroCats.length > 1 ? 'sm:grid-cols-[0.7fr_1.3fr]' : 'sm:grid-cols-[1.05fr_0.95fr]'
            }`}
          >
            <div>
              <Eyebrow onPhoto>{d.eyebrow}</Eyebrow>
              <h1 className="mt-6 font-display text-[42px] leading-[1.05] text-glow on-photo sm:text-[60px]">
                {d.title.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h1>
              <p className="mt-7 max-w-[430px] font-sans text-[18px] font-extralight leading-[1.75] text-glow/90 on-photo-sm sm:text-[20px]">
                {d.lead}
              </p>
              <div className="mt-11 flex flex-col items-start gap-3.5 sm:flex-row">
                <Btn href={withLocale('/kittens', locale)} onPhoto>
                  {dict.common.watch}
                </Btn>
                <Btn href={withLocale('/about', locale)} kind="line" onPhoto>
                  {dict.common.aboutUs}
                </Btn>
              </div>
            </div>

            {heroCats.length > 0 && (
              // sm:invisible, а не sm:hidden: этой ячейке нужно остаться в
              // потоке, просто не рисоваться — Contain использует mx-auto
              // (авто-отступы съедают свободное место, а не растягивают
              // блок), поэтому его ширина считается по содержимому грида;
              // display:none тут убирает содержимое ИЗ подсчёта, и Contain
              // на sm+ схлопывался до ширины одного текста, утаскивая его
              // от исходного места. invisible остаётся в потоке с тем же
              // размером, что и раньше, — Contain по-прежнему выходит на
              // те же 1160px, а сам кот просто не виден (десктопная версия
              // крупнее — отдельным блоком ниже, вне Contain/грида).
              // sm:min-w-[740px] держит Contain ровно на 1160px (текстовая
              // колонка 0.7fr + gap 70 + эта = 1160 при клампе на max-w) —
              // именно этой ширины не хватало 480px-варианту, отчего
              // Contain сжимался и утаскивал текст. Явное число вместо
              // "пусть JS посчитает по вырезкам" — надёжнее, не зависит от
              // высоты/пропорций конкретных фото котов.
              <div className="relative flex h-[36vh] max-h-[340px] min-h-[280px] items-end justify-center sm:invisible sm:h-[1px] sm:max-h-[1px] sm:min-h-0 sm:min-w-[740px]">
                <span
                  aria-hidden
                  className="absolute bottom-2.5 left-[16%] right-[16%] z-[1] h-8"
                  style={{ background: 'radial-gradient(ellipse at center,rgba(30,22,14,0.42) 0%,rgba(30,22,14,0) 70%)' }}
                />
                <HeroCatsRow images={heroCats} />
              </div>
            )}
          </div>
        </Contain>

        {heroCats.length > 0 && (
          // Абсолютный блок ВНЕ Contain/грида намеренно: если положить его
          // внутрь (как flex-item с абсолютным потомком шириной в vw),
          // Contain почему-то сжимается до ~900px вместо 1160 — абсолютный
          // потомок с шириной в vw аномально влияет на auto-ширину
          // flex-item предка (проверено эмпирически, воспроизводится
          // стабильно). Вынесенный наружу siblings с Contain, он больше не
          // его потомок, и текстовая колонка в гриде рендерится как обычно.
          // Привязан к правому краю СЕКЦИИ (не Contain) — так может расти
          // вширь без потолка в 1160px.
          <div className="pointer-events-none absolute bottom-24 right-[110px] hidden h-[92vh] max-h-[960px] w-[52vw] max-w-[1020px] items-end justify-end sm:flex">
            <span
              aria-hidden
              className="absolute bottom-2.5 left-[16%] right-[16%] z-[1] h-8"
              style={{ background: 'radial-gradient(ellipse at center,rgba(30,22,14,0.42) 0%,rgba(30,22,14,0) 70%)' }}
            />
            <HeroCatsRow images={heroCats} />
          </div>
        )}

        <a
          href="#after-hero"
          aria-label={locale === 'en' ? 'Scroll down' : 'Листайте вниз'}
          className="absolute bottom-3 left-1/2 hidden -translate-x-1/2 animate-bounce text-glow/80 on-photo-sm transition-colors hover:text-glow sm:block"
        >
          <ChevronDown size={26} strokeWidth={1.4} />
        </a>
      </section>

      <div id="after-hero" className="panel scroll-mt-20">
        <Contain>
          <Reveal>
            <SectionHead num={d.aboutEyebrow}>
              {d.aboutH2a}
              <i className="not-italic text-ember">{d.aboutH2b}</i>.
            </SectionHead>
          </Reveal>

          <section className="grid gap-10 px-6 pb-12 sm:grid-cols-[1fr_260px] sm:gap-16 sm:px-[70px] sm:pb-16">
            <Reveal delay={80} className="max-w-[640px] font-sans text-[16px] font-light leading-[2] text-soft">
              {[d.p1, d.p2, d.p3, d.p4].filter(Boolean).map((p, i) => (
                <p key={i} className="mb-5 break-inside-avoid">
                  {p}
                </p>
              ))}
            </Reveal>

            {/*
              Цитата и статистика раньше жили в двух разных блоках с двумя
              отдельными вертикальными линиями и разрывом между ними —
              читалось как два случайно склеенных куска, а не одна колонка.
              Одна общая рамка на весь блок вместо двух половинок.
            */}
            <Reveal delay={160} as="div" className="border-sand sm:border-l-2 sm:pl-6">
              {d.aside && (
                <p className="mb-8 font-sans text-[15px] font-light leading-[1.9] text-soft">{d.aside}</p>
              )}
              <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:flex sm:flex-col sm:gap-8">
                {[
                  [c.foundedYear, locale === 'en' ? 'founded' : 'год основания'],
                  [c.registry, locale === 'en' ? 'registration' : 'регистрация'],
                  [cats.length || '—', locale === 'en' ? 'cats' : 'кота и кошки'],
                  [freeKittens || '—', locale === 'en' ? 'kittens available' : 'котят свободно'],
                ].map(([n, label]) => (
                  <div key={label}>
                    <b className="block font-display text-[32px] font-normal leading-none sm:text-[36px]">{n}</b>
                    <span className="eyebrow mt-2.5 block">{label}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </section>
        </Contain>
      </div>

      <div className="panel">
        <Contain>
          <Reveal className="flex flex-col items-start justify-between gap-4 px-6 pb-10 pt-16 sm:flex-row sm:items-end sm:px-[70px] sm:pt-24">
            <div>
              <Eyebrow>{d.catsEyebrow}</Eyebrow>
              <h2 className="mt-4 font-display text-[30px] sm:text-[46px]">{d.catsH2}</h2>
            </div>
            <Link
              href={withLocale('/cats', locale)}
              className="font-caps text-[11px] uppercase tracking-[0.2em] text-soft transition-colors hover:text-ember"
            >
              {dict.common.more} →
            </Link>
          </Reveal>
          <CatRows cats={cats.slice(0, 4)} locale={locale} dict={dict} />
        </Contain>
      </div>

      <QuoteBand src={bandPhoto} eyebrow={d.quoteEyebrow}>
        {d.quote}
      </QuoteBand>

      {reviews.length > 0 && (
        <div id="reviews" className="panel scroll-mt-20">
          <Contain>
            <Reveal className="flex flex-col items-start justify-between gap-4 px-6 pb-10 pt-16 sm:flex-row sm:items-end sm:px-[70px] sm:pt-24">
              <div>
                <Eyebrow>{d.reviewsEyebrow}</Eyebrow>
                <h2 className="mt-4 font-display text-[30px] sm:text-[46px]">{d.reviewsH2}</h2>
              </div>
              <Link
                href={withLocale('/reviews', locale)}
                className="font-caps text-[11px] uppercase tracking-[0.2em] text-soft transition-colors hover:text-ember"
              >
                {dict.common.more} →
              </Link>
            </Reveal>
            <ReviewsStrip reviews={reviews} locale={locale} dict={dict} />
          </Contain>
        </div>
      )}

      <div className="panel">
        <Contain>
          <Reveal as="section" className="px-6 py-[70px] text-center sm:px-[70px] sm:py-[110px]">
            <Eyebrow>{d.ctaEyebrow}</Eyebrow>
            <h2 className="mx-auto my-6 max-w-[760px] font-display text-[32px] leading-[1.1] sm:text-[56px]">
              {d.ctaH2a}
              <i className="not-italic text-ember">{d.ctaH2b}</i>
              {d.ctaH2c}
            </h2>
            <div className="flex flex-col items-center gap-3.5 sm:flex-row sm:justify-center">
              <Btn href={withLocale('/kittens', locale)}>{dict.common.watch}</Btn>
              <Btn href="#footer" kind="line">
                {dict.common.write}
              </Btn>
            </div>
          </Reveal>
        </Contain>
      </div>
    </>
  )
}
