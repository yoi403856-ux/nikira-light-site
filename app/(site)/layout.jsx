import SiteBackground from '@/components/SiteBackground'
import Masthead from '@/components/Masthead'
import Footer from '@/components/Footer'
import { LocaleProvider } from '@/components/LocaleProvider'
import { getSettings } from '@/lib/api'
import { getLocale, getDict } from '@/lib/i18n'
import { urlForImage } from '@/sanity/image'
import { resolveOgImage, organizationJsonLd } from '@/lib/seo'
import { resolveContacts } from '@/lib/contacts'
import { pick } from '@/lib/dict'

const NAV = [
  { href: '/', key: 'home', settingsKey: 'navHome' },
  { href: '/about', key: 'about', settingsKey: 'navAbout' },
  { href: '/kittens', key: 'kittens', settingsKey: 'navKittens' },
  { href: '/cats', key: 'cats', settingsKey: 'navCats' },
  { href: '/reviews', key: 'reviews', settingsKey: 'navReviews' },
  // якорь на подвал, а не отдельная страница — подвал есть на каждой
  // странице, так что ссылка работает откуда угодно без перехода
  { href: '#footer', key: 'contacts', settingsKey: 'navContacts' },
]

// og:image действует на всех страницах сайта, если страница не переопределит
// его сама: Next склеивает метаданные макета и страницы, поэтому значение по
// умолчанию достаточно задать здесь один раз.
export async function generateMetadata() {
  const settings = await getSettings()
  const image = resolveOgImage(settings)
  return { openGraph: { images: [image] }, twitter: { card: 'summary_large_image', images: [image] } }
}

export default async function SiteLayout({ children }) {
  const settings = await getSettings()
  const locale = getLocale()
  const dict = getDict()
  const c = resolveContacts(settings, locale)
  const background = settings?.background ? urlForImage(settings.background, 2400) : null

  const links = NAV.map((l) => ({
    href: l.href,
    label: pick(locale, settings?.[l.settingsKey], settings?.[`${l.settingsKey}En`]) || dict.nav[l.key],
  }))

  return (
    <LocaleProvider locale={locale}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd(settings)) }}
      />
      <SiteBackground photoUrl={background} />
      <Masthead links={links} locale={locale} city={c.city} phone={c.phone} tel={c.tel} />
      <main>{children}</main>
      <Footer settings={settings} locale={locale} />
    </LocaleProvider>
  )
}
