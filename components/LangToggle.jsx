'use client'

import { usePathname } from 'next/navigation'
import { useLocale } from './LocaleProvider'

/*
  Переключатель RU / EN. Ведёт на адрес с префиксом (/en/...), а не переключает
  куку: каждому языку нужен свой индексируемый адрес (см. middleware.js).

  Обычная <a>, а не next/link, специально. Корневой макет и макет (site)
  оборачивают все маршруты без отдельного сегмента на язык, поэтому клиентский
  роутер Next считает их неизменными и не перезапускает определение локали —
  адрес в строке меняется, а язык страницы нет. Обычная ссылка каждый раз
  вызывает настоящую загрузку.
*/
export default function LangToggle({ className = '', onPhoto = false }) {
  const locale = useLocale()
  const pathname = usePathname() || '/'
  const isEn = pathname === '/en' || pathname.startsWith('/en/')
  const bare = isEn ? pathname.slice(3) || '/' : pathname
  const ruHref = bare
  const enHref = bare === '/' ? '/en' : `/en${bare}`

  // на фотографии одной прозрачности мало — на светлом небе белый текст
  // тонет почти незаметно, поэтому здесь всегда добавлена тень
  const on = onPhoto ? 'text-glow on-photo-sm' : 'text-ink'
  const off = onPhoto ? 'text-glow/70 on-photo-sm hover:text-glow' : 'text-ink/40 hover:text-ink/70'
  const sep = onPhoto ? 'text-glow/40 on-photo-sm' : 'text-ink/25'

  return (
    <div className={`flex items-center gap-1 font-caps text-[10.5px] tracking-[0.16em] ${className}`}>
      <a href={ruHref} className={`px-1 uppercase transition-colors ${locale === 'ru' ? on : off}`} aria-label="Русский">
        RU
      </a>
      <span className={sep}>/</span>
      <a href={enHref} className={`px-1 uppercase transition-colors ${locale === 'en' ? on : off}`} aria-label="English">
        EN
      </a>
    </div>
  )
}
