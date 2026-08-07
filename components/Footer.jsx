import { pick } from '@/lib/dict'
import { resolveContacts } from '@/lib/contacts'

export default function Footer({ settings, locale }) {
  const c = resolveContacts(settings, locale)
  const blurb = pick(locale, settings?.footerBlurb, settings?.footerBlurbEn)
  const delivery = pick(locale, settings?.delivery, settings?.deliveryEn)
  const year = new Date().getFullYear()

  return (
    <footer className="panel">
      <div className="flex flex-col gap-3 px-6 py-10 font-caps text-[10.5px] uppercase tracking-[0.22em] text-soft sm:flex-row sm:flex-wrap sm:justify-between sm:gap-5 sm:px-[70px] sm:py-14">
        <span>Mainecoon NikiraLight</span>
        <span>{c.city}</span>
        {delivery && <span>{delivery}</span>}
        <a href={c.tel} className="transition-colors hover:text-ember">
          {c.phone}
        </a>
        <span>
          {c.foundedYear}—{year} · {c.registry}
        </span>
      </div>
      {blurb && (
        <p className="max-w-[640px] px-6 pb-10 font-sans text-[14px] font-light leading-[1.9] text-soft sm:px-[70px] sm:pb-14">
          {blurb}
        </p>
      )}
    </footer>
  )
}
