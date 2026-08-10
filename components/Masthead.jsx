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

  useEffect(() => setOpen(false), [pathname])

  /*
    Пока меню открыто, фон не должен прокручиваться: панель приклеена к
    липкой полосе, и если страница под ней едет, раскрытое меню висит
    сверху и накрывает контент.

    Блокировка вешается на <html>, а НЕ на <body>: прокручивается именно
    корневой элемент (см. overflow-x: clip на html в globals.css), и
    overflow:hidden на body ничего не блокирует.

    Закрытие по скроллу — подстраховка: на части мобильных браузеров
    (в первую очередь iOS Safari) блокировка через overflow срабатывает
    не всегда. Порог в 40px нужен, чтобы меню не захлопнулось от
    микросдвига в момент самой блокировки.
  */
  useEffect(() => {
    if (!open) return
    const html = document.documentElement
    const prevOverflow = html.style.overflow
    html.style.overflow = 'hidden'

    const startY = window.scrollY
    const onScroll = () => {
      if (Math.abs(window.scrollY - startY) > 40) setOpen(false)
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      html.style.overflow = prevOverflow
      window.removeEventListener('scroll', onScroll)
    }
  }, [open])

  return (
    <>
      <header>
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-5 font-caps text-[10.5px] uppercase tracking-[0.22em] text-glow/80 on-photo-sm backdrop-blur-md bg-ink/[0.12] sm:px-[70px]">
          <span>{city}</span>
          <a href={tel} className="hidden transition-colors hover:text-glow sm:block">
            {phone}
          </a>
          <LangToggle onPhoto className="hidden sm:flex" />
        </div>

        <Link
          href={withLocale('/', locale)}
          className={`block backdrop-blur-md bg-ink/[0.16] text-center ${isHome ? 'pb-6 pt-4' : 'pb-7 pt-1'}`}
        >
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

      {/*
        десктоп: обычная строка, sm+. backdrop-blur убран (см.
        SiteBackground.jsx — размытие теперь в самом фото), альфа поднята с
        0.46 до 0.72, чтобы плашка не читалась слишком прозрачной без него.
      */}
      <nav className="sticky top-0 z-40 hidden border-y border-glow/20 bg-[rgba(44,36,26,0.72)] px-[70px] py-4 sm:flex sm:items-center sm:justify-between">
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

      {/*
        Мобильный: гамбургер + выпадающая панель, sm и меньше. Панель —
        absolute-потомок ЭТОЙ же sticky-полосы (top-full — сразу под ней), а
        не fixed с зашитым числом пикселей от верха экрана: пока страница не
        прокручена, sticky ещё не «прилип» и стоит на естественном месте ниже
        блока с названием — прибитая к 52px от края экрана панель проезжала
        мимо кнопки. top-full всегда находит полосу там, где она есть на
        самом деле, прилипла она или нет.
      */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-y border-glow/20 bg-[rgba(44,36,26,0.72)] px-6 py-3.5 sm:hidden">
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

        {open && (
          // h-screen, а не max-h: панель должна доставать до низа экрана,
          // иначе снизу остаётся щель и в неё видно контент страницы
          <div className="absolute inset-x-0 top-full z-30 h-screen overflow-y-auto bg-[rgba(30,24,17,0.97)]">
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
      </div>
    </>
  )
}
