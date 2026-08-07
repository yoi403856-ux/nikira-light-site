import { urlForImageCrop } from '@/sanity/image'
import { resolveContacts } from './contacts'
import { siteUrl } from './site'

// Картинка-превью для мессенджеров и соцсетей. Пока владелица не загрузила
// свою в «Настройки сайта», берём фон сайта, а если и его нет — файл из
// /public.
export function resolveOgImage(settings) {
  const custom = settings?.ogImage ? urlForImageCrop(settings.ogImage, 1200, 630) : null
  const background = settings?.background ? urlForImageCrop(settings.background, 1200, 630) : null
  return custom || background || `${siteUrl}/og-default.jpg`
}

// Разметка организации для поисковиков. Именно Organization, а не
// LocalBusiness: это домашний питомник, а не заведение с адресом и часами
// работы, и заявлять физический адрес было бы неправдой.
export function organizationJsonLd(settings) {
  const contacts = resolveContacts(settings)
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Nikira Light',
    alternateName: 'Mainecoon NikiraLight',
    url: siteUrl,
    logo: `${siteUrl}/icon.png`,
    image: resolveOgImage(settings),
    telephone: contacts.phone,
    foundingDate: String(contacts.foundedYear),
    areaServed: 'Worldwide',
    address: { '@type': 'PostalAddress', addressLocality: contacts.city, addressCountry: 'RU' },
    sameAs: [contacts.instagram, contacts.whatsapp, contacts.telegram, contacts.vk].filter(Boolean),
  }
}
