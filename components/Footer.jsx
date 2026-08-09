import Link from 'next/link'
import { Phone, Instagram } from 'lucide-react'
import { WhatsApp } from './icons'
import { pick } from '@/lib/dict'
import { resolveContacts } from '@/lib/contacts'
import { withLocale } from '@/lib/locale'
import { getDict } from '@/lib/i18n'

/*
  Прежняя версия была бумажной панелью в тон всей остальной страницы — на
  фоне остальных секций подвал не читался как отдельный, законченный блок.
  Тёмный сплошной ink здесь не просто акцент: это единственное место на
  сайте, где фон обрывается и подписывает страницу — как в Summer Cherry,
  но на своих ember/glow тонах, а не золоте.
*/
export default function Footer({ settings, locale }) {
  const c = resolveContacts(settings, locale)
  const dict = getDict()
  const blurb = pick(locale, settings?.footerBlurb, settings?.footerBlurbEn)
  const delivery = pick(locale, settings?.delivery, settings?.deliveryEn)
  const year = new Date().getFullYear()

  const socials = [
    c.whatsapp && { icon: WhatsApp, label: 'WhatsApp', href: c.whatsapp },
    c.instagram && { icon: Instagram, label: 'Instagram', href: c.instagram },
  ].filter(Boolean)

  const nav = [
    { href: '/about', label: dict.nav.about },
    { href: '/kittens', label: dict.nav.kittens },
    { href: '/cats', label: dict.nav.cats },
    { href: '/reviews', label: dict.nav.reviews },
    { href: '/contacts', label: dict.nav.contacts },
  ]

  return (
    <footer className="relative overflow-hidden bg-ink text-glow">
      <div className="grain pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-6 py-16 sm:px-[70px] sm:py-20">
        <div className="grid gap-12 sm:grid-cols-[1.2fr_1fr_1fr] sm:gap-16">
          <div>
            <p className="font-caps text-[16px] tracking-[0.3em] text-glow">NIKIRA LIGHT</p>
            <p className="mt-2 font-caps text-[9.5px] uppercase tracking-[0.4em] text-ember">Maine Coon Cattery</p>
            {blurb && (
              <p className="mt-6 max-w-sm font-sans text-[14px] font-light leading-[1.9] text-glowdim/80">{blurb}</p>
            )}
            <div className="mt-7 flex gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center border border-glow/25 text-glow/80 transition-colors duration-300 hover:border-ember hover:text-ember"
                >
                  <Icon size={18} />
                </a>
              ))}
              <a
                href={c.tel}
                aria-label={c.phone}
                className="flex h-11 w-11 items-center justify-center border border-glow/25 text-glow/80 transition-colors duration-300 hover:border-ember hover:text-ember"
              >
                <Phone size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="eyebrow-glow">{locale === 'en' ? 'Contact' : 'Контакты'}</h4>
            <ul className="mt-6 space-y-4 font-sans text-sm tracking-[0.05em] text-glowdim/85">
              <li>
                <a href={c.tel} className="flex items-center gap-3 transition-colors hover:text-ember">
                  <Phone size={16} className="text-ember" /> {c.phone}
                </a>
              </li>
              {c.whatsapp && (
                <li>
                  <a href={c.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 transition-colors hover:text-ember">
                    <WhatsApp size={16} className="text-ember" /> WhatsApp
                  </a>
                </li>
              )}
              {c.instagram && (
                <li>
                  <a href={c.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 transition-colors hover:text-ember">
                    <Instagram size={16} className="text-ember" /> Instagram
                  </a>
                </li>
              )}
              <li className="pt-1 text-glowdim/60">
                {c.city}
                {delivery && <span className="block">{delivery}</span>}
              </li>
            </ul>
          </div>

          <div>
            <h4 className="eyebrow-glow">{locale === 'en' ? 'Sections' : 'Разделы'}</h4>
            <ul className="mt-6 space-y-3 font-sans text-sm tracking-[0.08em] text-glowdim/85">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={withLocale(n.href, locale)} className="link-underline transition-colors hover:text-ember">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-glow/15 pt-7 text-[11px] tracking-[0.2em] text-glowdim/40 sm:flex-row">
          <span>{c.foundedYear}—{year} · NIKIRA LIGHT</span>
          <span className="uppercase">{c.registry}</span>
        </div>
      </div>
    </footer>
  )
}
