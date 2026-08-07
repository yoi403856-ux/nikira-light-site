import { PageHead, Eyebrow } from '@/components/ui'
import { getSettings } from '@/lib/api'
import { getContactsContent } from '@/lib/content'
import { getLocale, getDict, hreflangAlternates } from '@/lib/i18n'
import { resolveContacts } from '@/lib/contacts'
import { pick } from '@/lib/dict'

export async function generateMetadata() {
  const locale = getLocale()
  const d = await getContactsContent(locale)
  return {
    title: `${d.heroTitle} — Nikira Light`,
    description: d.heroLead,
    alternates: hreflangAlternates('/contacts', locale),
  }
}

export default async function ContactsPage() {
  const locale = getLocale()
  const dict = getDict()
  const [settings, d] = await Promise.all([getSettings(), getContactsContent(locale)])
  const c = resolveContacts(settings, locale)
  const L = dict.contacts.labels
  const delivery = pick(locale, settings?.delivery, settings?.deliveryEn)

  // строки со ссылкой и без — адрес и доставка кликать некуда
  const rows = [
    c.phone && { label: L.phone, value: c.phone, href: c.tel },
    c.whatsapp && { label: L.whatsapp, value: 'WhatsApp', href: c.whatsapp },
    c.telegram && { label: L.telegram, value: 'Telegram', href: c.telegram },
    c.instagram && { label: L.instagram, value: '@mainecoon.nikira', href: c.instagram },
    c.vk && { label: L.vk, value: 'ВКонтакте', href: c.vk },
    c.email && { label: L.email, value: c.email, href: `mailto:${c.email}` },
    c.city && { label: L.address, value: c.city },
    delivery && { label: locale === 'en' ? 'Delivery' : 'Доставка', value: delivery },
  ].filter(Boolean)

  return (
    <>
      <PageHead num={d.heroEyebrow} title={d.heroTitle} lead={d.heroLead} />

      <div className="panel">
        <div className="grid gap-9 px-6 py-12 sm:grid-cols-2 sm:gap-[70px] sm:px-[70px] sm:py-20">
          <div className="border-t border-ink/[0.16]">
            {rows.map((r) => {
              const inner = (
                <>
                  <em className="pt-1.5 font-caps text-[10px] not-italic uppercase tracking-[0.26em] text-sand">
                    {r.label}
                  </em>
                  <b className="font-display text-[18px] font-normal sm:text-[22px]">{r.value}</b>
                </>
              )
              const cls =
                'grid grid-cols-[110px_1fr] gap-3 border-b border-ink/[0.12] py-5 sm:grid-cols-[150px_1fr] sm:gap-5'
              return r.href ? (
                <a
                  key={r.label}
                  href={r.href}
                  target={r.href.startsWith('http') ? '_blank' : undefined}
                  rel={r.href.startsWith('http') ? 'noreferrer' : undefined}
                  className={`${cls} transition-colors hover:text-ember`}
                >
                  {inner}
                </a>
              ) : (
                <span key={r.label} className={cls}>
                  {inner}
                </span>
              )
            })}
          </div>

          <div>
            <Eyebrow>{d.askEyebrow}</Eyebrow>
            <h2 className="mb-6 mt-5 font-display text-[26px] leading-[1.2] sm:text-[34px]">{d.askH2}</h2>
            {String(d.askText || '')
              .split('\n\n')
              .filter(Boolean)
              .map((p, i) => (
                <p key={i} className="mb-4 font-sans text-[16px] font-light leading-[1.95] text-soft">
                  {p}
                </p>
              ))}
          </div>
        </div>
      </div>
    </>
  )
}
