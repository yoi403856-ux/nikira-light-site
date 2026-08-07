import './globals.css'
import { getLocale } from '@/lib/i18n'
import { siteUrl } from '@/lib/site'

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Nikira Light — питомник мейн-кунов в Новороссийске',
  description:
    'Питомник мейн-кунов Nikira Light, Новороссийск. Основан в 2021 году. Здоровые социализированные котята с документами WCF, доставка по всему миру.',
  openGraph: {
    title: 'Nikira Light — питомник мейн-кунов',
    description:
      'Мы растим котов дома, на берегу моря. Котята с документами WCF, привитые и социализированные.',
    siteName: 'Nikira Light',
  },
}

export default function RootLayout({ children }) {
  const locale = getLocale()
  return (
    <html lang={locale}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
