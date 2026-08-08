'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import LangToggle from './LangToggle'
import { withLocale } from '@/lib/locale'

/*
  Шапка-афиша: тонкая служебная строка, крупное разреженное название по
  центру, под ним линейка и меню во всю ширину. Прилипает только полоса меню —
  название уезжает вверх, чтобы не занимать пол-экрана при прокрутке.

  Полоса меню намеренно дымчато-тёмная, а не бумажная: белая планка посреди
  фотографии выглядит шрамом, а тёмное стекло читается и поверх снимка, и
  поверх бумажных панелей ниже по странице.

  На мобильном шесть текстовых ссылок в 11px не помещались в одну строку и
  переносились на два-три ряда с крошечной областью нажатия — вместо этого
  здесь гамбургер и полноэкранная выпадающая панель с крупными пунктами.
  На sm+ остаётся обычная горизонтальная строка, там места достаточно.

  Липкая полоса меню вынесена ИЗ <header> и стоит рядом с ним как отдельный
  <nav>/<div>, а не внутри одного общего тега. Проверено эмпирически: когда
  sticky-элемент был последним ребёнком тесного <header>, ему физически было
  негде «прилипнуть» — sticky держится в границах своего родителя, а header
  заканчивался практически сразу под меню. Родителем меню стал сам <body>
  (следующий DOM-предок после этого компонента), а он высотой во всю
  страницу — там уже есть, за что зацепиться.

  Клиентский компонент, потому что подсветка активного пункта и уменьшение
  названия на внутренних страницах считаются из адреса. Данные приходят
  готовыми пропсами, запросов отсюда нет.
*/
export default function Masthead({ links, locale, city, phone, tel }) {
  const pathname = usePathname() || '/'
  const bare = pathname === '/en' ? '/' : pathname.startsWith('/en/') ? pathname.slice(3) : pathname
  const isHome = bare === '/'
  const [open, setOpen] = useState(false)

  // закрываем меню при смене страницы и блокируем скролл фона, пока оно открыто
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header>
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-5 font-caps text-[10.5px] uppercase tracking-[0.22em] text-glow/80 on-photo-sm sm:px-[70px]">
          <span>{city}</span>
          <a href={tel} className="hidden transition-colors hover:text-glow sm:block">
            {phone}
          </a>
          <LangToggle onPhoto className="hidden sm:flex" />
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
      </header>

      {/* десктоп: обычная строка, sm+ */}
      <nav className="sticky top-0 z-40 hidden border-y border-glow/20 bg-[rgba(44,36,26,0.46)] px-[70px] py-4 backdrop-blur-[10px] sm:flex sm:items-center sm:justify-between">
        {links.map((l) => {
          const on = l.href === '/' ? bare === '/' : bare.startsWith(l.href)
          return (
            <Link
              key={l.href}
              href={withLocale(l.href, locale)}
              className={`font-caps text-[12px] uppercase tracking-[0.24em] transition-colors ${
                on ? 'text-glowdim' : 'text-glow/[0.78] hover:text-glow'
              }`}
            >
              {l.label}
            </Link>
          )
        })}
      </nav>

      {/* мобильный: гамбургер + выпадающая панель, sm и меньше */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-y border-glow/20 bg-[rgba(44,36,26,0.46)] px-6 py-3.5 backdrop-blur-[10px] sm:hidden">
        <LangToggle onPhoto />
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? (locale === 'en' ? 'Close menu' : 'Закрыть меню') : locale === 'en' ? 'Open menu' : 'Открыть меню'}
          className="-mr-2 flex items-center gap-2 p-2 text-glow"
        >
          {open ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
        </button>
      </div>

      {open && (
        <div className="fixed inset-x-0 top-[52px] bottom-0 z-30 overflow-y-auto bg-[rgba(30,24,17,0.97)] backdrop-blur-[10px] sm:hidden">
          <nav className="flex flex-col px-6 py-4">
            {links.map((l) => {
              const on = l.href === '/' ? bare === '/' : bare.startsWith(l.href)
              return (
                <Link
                  key={l.href}
                  href={withLocale(l.href, locale)}
                  className={`border-b border-glow/10 py-5 font-display text-[22px] transition-colors ${
                    on ? 'text-glowdim' : 'text-glow'
                  }`}
                >
                  {l.label}
                </Link>
              )
            })}
          </nav>
          <a
            href={tel}
            className="block px-6 py-5 font-caps text-[13px] uppercase tracking-[0.2em] text-glow/80"
          >
            {phone}
          </a>
        </div>
      )}
    </>
  )
}
