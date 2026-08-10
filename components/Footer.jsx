import Link from 'next/link'
import { Phone, Instagram } from 'lucide-react'
import { WhatsApp } from './icons'
import { pick } from '@/lib/dict'
import { resolveContacts } from '@/lib/contacts'
import { withLocale } from '@/lib/locale'
import { getDict } from '@/lib/i18n'

/*
  Первая тёмная версия была структурно списана с подвала Summer Cherry —
  тот же левоприжатый грид в три колонки, просто на других цветах, и это
  читалось как копия. Здесь вместо грида — центрированная афиша, тот же
  приём, что уже держит шапку (Masthead: имя по центру, полоса под ним) —
  это свой узнаваемый почерк, а не чужая раскладка. Фон и иконки связи
  остаются: они решали настоящую проблему (подвал сливался с страницей,
  не было кнопок связи), сама раскладка — нет.
*/
export default function Footer({ settings, locale }) {
  const c = resolveContacts(settings, locale)
  const dict = getDict()
  const blurb = pick(locale, settings?.footerBlurb, settings?.footerBlurbEn)
  const delivery = pick(locale, settings?.delivery, settings?.deliveryEn)
  const year = new Date().getFullYear()

  const socials = [
    { icon: Phone, label: c.phone, href: c.tel },
    c.whatsapp && { icon: WhatsApp, label: 'WhatsApp', href: c.whatsapp },
    c.instagram && { icon: Instagram, label: 'Instagram', href: c.instagram },
  ].filter(Boolean)

  // без "Контакты" (вела бы из подвала в самого себя) и без "Отзывы" —
  // это теперь якорь на карусель на главной, а не отдельная страница, и в
  // подвале других страниц вести на неё смысла нет так же, как и в меню
  const nav = [
    { href: '/about', label: dict.nav.about },
    { href: '/kittens', label: dict.nav.kittens },
    { href: '/cats', label: dict.nav.cats },
  ]

  return (
    <footer id="footer" className="relative scroll-mt-16 overflow-hidden bg-ink text-glow">
      <div className="grain pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-2xl px-6 py-16 text-center sm:py-24">
        <p className="font-caps text-[9.5px] uppercase tracking-[0.5em] text-ember">Maine Coon Cattery</p>
        <p className="mt-4 font-caps text-[26px] tracking-[0.35em] text-glow sm:text-[32px]">NIKIRA LIGHT</p>
        {blurb && (
          <p className="mx-auto mt-6 max-w-md font-sans text-[14px] font-light leading-[1.9] text-glowdim/75">{blurb}</p>
        )}

        {/* круглые кнопки связи вместо квадратных рамок Summer Cherry */}
        <div className="mt-9 flex justify-center gap-4">
          {socials.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-glow/10 text-glow/85 transition-colors duration-300 hover:bg-ember hover:text-ink"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>

        <a href={c.tel} className="mt-6 inline-block font-display text-[22px] text-glow transition-colors hover:text-ember">
          {c.phone}
        </a>
        <p className="mt-2 font-sans text-[13px] text-glowdim/60">
          {c.city}
          {delivery && ` · ${delivery}`}
        </p>

        <nav className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-caps text-[11px] uppercase tracking-[0.18em] text-glowdim/80">
          {nav.map((n, i) => (
            <span key={n.href} className="flex items-center gap-6">
              {i > 0 && <span className="h-1 w-1 rounded-full bg-glow/20" />}
              <Link href={withLocale(n.href, locale)} className="transition-colors hover:text-ember">
                {n.label}
              </Link>
            </span>
          ))}
        </nav>

        <div className="mx-auto mt-12 h-px w-full max-w-xs bg-glow/15" />
        <p className="mt-6 text-[11px] tracking-[0.2em] text-glowdim/40">
          {c.foundedYear}—{year} · NIKIRA LIGHT · {c.registry.toUpperCase()}
        </p>
      </div>
    </footer>
  )
}
