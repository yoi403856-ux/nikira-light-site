import Link from 'next/link'
import { pick } from '@/lib/dict'
import { resolveContacts } from '@/lib/contacts'
import { withLocale } from '@/lib/locale'
import { getDict } from '@/lib/i18n'

/*
  Подвал — последнее, что видит посетитель, и для питомника это второй по
  важности блок после карточки котёнка: отсюда пишут. Поэтому связь вынесена
  крупными кликабельными строками, а не спрятана в мелкий серый список.

  Цвет текста здесь ink/soft, а не soft везде: на бумажной панели soft почти
  сливается с фоном, и подвал читался как декоративная сноска.
*/
export default function Footer({ settings, locale }) {
  const c = resolveContacts(settings, locale)
  const dict = getDict()
  const L = dict.contacts.labels
  const blurb = pick(locale, settings?.footerBlurb, settings?.footerBlurbEn)
  const delivery = pick(locale, settings?.delivery, settings?.deliveryEn)
  const year = new Date().getFullYear()

  // только заполненные каналы — пустая строка «Telegram» хуже, чем её отсутствие
  const channels = [
    c.whatsapp && { label: 'WhatsApp', href: c.whatsapp, external: true },
    c.instagram && { label: 'Instagram', href: c.instagram, external: true },
    c.telegram && { label: 'Telegram', href: c.telegram, external: true },
    c.vk && { label: L.vk, href: c.vk, external: true },
    c.email && { label: L.email, href: `mailto:${c.email}`, value: c.email },
  ].filter(Boolean)

  const nav = [
    { href: '/about', label: dict.nav.about },
    { href: '/kittens', label: dict.nav.kittens },
    { href: '/cats', label: dict.nav.cats },
    { href: '/reviews', label: dict.nav.reviews },
    { href: '/contacts', label: dict.nav.contacts },
  ]

  return (
    <footer className="panel border-t border-ink/10">
      <div className="grid gap-12 px-6 py-14 sm:grid-cols-[1.2fr_1fr_1fr] sm:gap-16 sm:px-[70px] sm:py-20">
        {/* колонка 1: кто мы */}
        <div>
          <p className="font-caps text-[16px] tracking-[0.3em] text-ink">NIKIRA LIGHT</p>
          <p className="mt-2 font-caps text-[9.5px] uppercase tracking-[0.4em] text-ember">Maine Coon Cattery</p>
          {blurb && (
            <p className="mt-6 max-w-[380px] font-sans text-[14px] font-light leading-[1.9] text-soft">{blurb}</p>
          )}
          <p className="mt-6 font-sans text-[14px] leading-[1.9] text-ink/70">
            {c.city}
            {delivery && <span className="block">{delivery}</span>}
          </p>
        </div>

        {/* колонка 2: как написать — крупно и кликабельно */}
        <div>
          <p className="eyebrow">{locale === 'en' ? 'Get in touch' : 'Связаться'}</p>
          <a
            href={c.tel}
            className="mt-4 block font-display text-[22px] text-ink transition-colors hover:text-ember"
          >
            {c.phone}
          </a>
          {/* py-2 вместо голого gap: строка 15px даёт область нажатия всего
              23px, а пальцу нужно около 44 — отступы добирают высоту, не
              раздвигая список визуально */}
          <div className="mt-4 flex flex-col gap-0.5">
            {channels.map((ch) => (
              <a
                key={ch.label}
                href={ch.href}
                target={ch.external ? '_blank' : undefined}
                rel={ch.external ? 'noreferrer' : undefined}
                className="group inline-flex w-fit items-center gap-2 py-2 font-sans text-[15px] text-ink/80 transition-colors hover:text-ember"
              >
                <span className="h-px w-4 bg-sand transition-all group-hover:w-6 group-hover:bg-ember" />
                {ch.value || ch.label}
              </a>
            ))}
          </div>
        </div>

        {/* колонка 3: разделы сайта */}
        <div>
          <p className="eyebrow">{locale === 'en' ? 'Sections' : 'Разделы'}</p>
          <nav className="mt-3 flex flex-col gap-0.5">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={withLocale(n.href, locale)}
                className="w-fit py-2 font-sans text-[15px] text-ink/80 transition-colors hover:text-ember"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="flex flex-col gap-2 border-t border-ink/10 px-6 py-6 font-caps text-[10px] uppercase tracking-[0.22em] text-soft sm:flex-row sm:justify-between sm:px-[70px]">
        <span>
          {c.foundedYear}—{year} · Mainecoon NikiraLight
        </span>
        <span>{c.registry}</span>
      </div>
    </footer>
  )
}
