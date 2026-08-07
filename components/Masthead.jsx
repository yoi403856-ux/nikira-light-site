'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LangToggle from './LangToggle'
import { withLocale } from '@/lib/locale'

/*
  Шапка-афиша: тонкая служебная строка, крупное разреженное название по
  центру, под ним линейка и меню во всю ширину. Прилипает только полоса меню —
  название уезжает вверх, чтобы не занимать пол-экрана при прокрутке.

  Полоса меню намеренно дымчато-тёмная, а не бумажная: белая планка посреди
  фотографии выглядит шрамом, а тёмное стекло читается и поверх снимка, и
  поверх бумажных панелей ниже по странице.

  Клиентский компонент, потому что подсветка активного пункта и уменьшение
  названия на внутренних страницах считаются из адреса. Данные приходят
  готовыми пропсами, запросов отсюда нет.
*/
export default function Masthead({ links, locale, city, phone, tel }) {
  const pathname = usePathname() || '/'
  const bare = pathname === '/en' ? '/' : pathname.startsWith('/en/') ? pathname.slice(3) : pathname
  const isHome = bare === '/'

  return (
    <header>
      <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-5 font-caps text-[10.5px] uppercase tracking-[0.22em] text-glow/80 on-photo-sm sm:px-[70px]">
        <span>{city}</span>
        <a href={tel} className="hidden transition-colors hover:text-glow sm:block">
          {phone}
        </a>
        <LangToggle onPhoto />
      </div>

      <Link href={withLocale('/', locale)} className={`block text-center ${isHome ? 'pb-6 pt-4' : 'pb-7 pt-1'}`}>
        <span
          className={`block font-caps text-glow on-photo ${
            isHome ? 'text-[28px] sm:text-[54px]' : 'text-[24px] sm:text-[34px]'
          }`}
          style={{ letterSpacing: '0.4em', textIndent: '0.4em' }}
        >
          NIKIRA LIGHT
        </span>
        <span
          className="mt-4 block font-caps text-[9px] text-glowdim on-photo-sm sm:text-[10px]"
          style={{ letterSpacing: '0.62em', textIndent: '0.62em' }}
        >
          MAINE COON CATTERY
        </span>
      </Link>

      <nav className="sticky top-0 z-40 flex flex-wrap justify-start gap-x-5 gap-y-2 border-y border-glow/20 bg-[rgba(44,36,26,0.46)] px-6 py-4 backdrop-blur-[10px] sm:justify-between sm:px-[70px]">
        {links.map((l) => {
          const on = l.href === '/' ? bare === '/' : bare.startsWith(l.href)
          return (
            <Link
              key={l.href}
              href={withLocale(l.href, locale)}
              className={`font-caps text-[11px] uppercase tracking-[0.24em] transition-colors sm:text-[12px] ${
                on ? 'text-glowdim' : 'text-glow/[0.78] hover:text-glow'
              }`}
            >
              {l.label}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}
