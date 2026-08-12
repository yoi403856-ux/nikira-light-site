import Link from 'next/link'

export function Eyebrow({ children, onPhoto = false, className = '' }) {
  return <p className={`${onPhoto ? 'eyebrow-glow' : 'eyebrow'} ${className}`}>{children}</p>
}

// Центрированный потолок ширины для контента внутри бумажных панелей — без
// него текст на широких мониторах растягивался на весь экран и читался как
// "размазанный". Шапка/фото/хиро остаются во всю ширину намеренно, этот
// контейнер оборачивает только текстовые/карточные секции.
export function Contain({ children, className = '' }) {
  return <div className={`mx-auto max-w-[1160px] ${className}`}>{children}</div>
}

/*
  Заголовок внутренней страницы: крупное имя и подзаголовок, лежащие прямо
  на фотографии. Прижат влево внутри Contain — центр по всей ширине фото не
  подошёл на живом фото с деревом справа, текст оказывался поверх веток, но
  на широких мониторах голый px-[70px] без потолка ширины прижимал блок к
  самому краю экрана. Contain (max-w-[1160px]) подтягивает его ближе к
  центру, как и остальные текстовые блоки на сайте, при этом текст внутри
  остаётся выровнен по левому краю.

  Номер раздела ("01", "02"...) раньше показывался над заголовком — без
  подписи рядом голая цифра читалась как случайный обрывок текста, а не как
  осознанный элемент разметки. Убран отсюда и из схем Sanity (heroEyebrow).

  compact — меньше нижний отступ. На /reviews стандартная высота вместе с
  шапкой сайта обрезала первый ряд карточек почти пополам при открытии
  страницы: до содержимого нужно было долистать на полкарточки. Отдельный
  проп вместо правки отступа глобально — на кот/котёнке и остальных
  страницах стандартная высота уместна, там под шапкой нет сетки, которую
  важно сразу увидеть целиком.
*/
export function PageHead({ title, lead, className = '', compact = false }) {
  return (
    <section
      className={`px-6 pt-16 sm:px-[70px] sm:pt-28 ${compact ? 'pb-8 sm:pb-10' : 'pb-16 sm:pb-24'} ${className}`}
    >
      <Contain>
        <h1 className="max-w-[900px] font-display text-[36px] leading-[1.06] text-glow on-photo sm:text-[64px]">
          {title}
        </h1>
        {lead && (
          <p className="mt-6 max-w-[520px] font-sans text-[17px] font-extralight leading-[1.75] text-glow/90 on-photo-sm sm:text-[19px]">
            {lead}
          </p>
        )}
      </Contain>
    </section>
  )
}

export function Btn({ href, children, kind = 'solid', onPhoto = false, className = '' }) {
  const base =
    'inline-block whitespace-nowrap px-8 py-4 font-caps text-[11.5px] uppercase tracking-[0.2em] transition-colors duration-300'
  const styles = onPhoto
    ? {
        solid: 'bg-glow text-ink hover:bg-glowdim',
        line: 'border border-glow/60 text-glow hover:bg-glow/15',
      }
    : {
        solid: 'bg-ink text-paper hover:bg-ember',
        line: 'border border-ink/25 text-ink hover:border-ember hover:text-ember',
      }
  return (
    <Link href={href} className={`${base} ${styles[kind]} ${className}`}>
      {children}
    </Link>
  )
}

// Заголовок раздела внутри бумажной панели: слева крупное утверждение,
// справа короткая врезка на линейке.
export function SectionHead({ num, children, aside }) {
  return (
    <div className="mb-10 grid items-end gap-8 px-6 pt-16 sm:mb-13 sm:grid-cols-[1fr_300px] sm:gap-16 sm:px-[70px] sm:pt-24">
      <div>
        {num && <span className="font-display text-[15px] text-sand">{num}</span>}
        <h2 className="mt-6 font-display text-[30px] leading-[1.22] sm:text-[50px]">{children}</h2>
      </div>
      {aside && (
        <p className="border-l-2 border-sand pl-6 font-sans text-[15px] font-light leading-[1.9] text-soft">
          {aside}
        </p>
      )}
    </div>
  )
}

// Полоса с цитатой поверх фотографии — единственное место, где фотография
// работает не как фон, а как самостоятельный кадр.
export function QuoteBand({ src, eyebrow, children }) {
  return (
    <section className="relative flex h-[38vh] items-center justify-center overflow-hidden text-center sm:h-[46vh]">
      {src && (
        <>
          {/*
            Кадр (1600×1000) заметно уже, чем сама полоса на широких экранах,
            и object-cover тянет края фото туда, где в исходнике плоская
            стена/плед за котом — без подложки это читалось как обрыв
            фотографии. Размытая увеличенная копия того же кадра под ней
            (тот же приём, что в SiteBackground.jsx) убирает жёсткую границу.

            background-attachment: fixed вместо <img>: с картинкой-тегом
            полоса просто ехала вместе со страницей, как обычное фото в
            потоке. Фон, зафиксированный к вьюпорту, стоит на месте, пока
            полоса скроллится над ним, — тот же эффект, что у SiteBackground
            в hero, только в рамках этой секции (overflow-hidden обрезает
            его точно по границам полосы).
          */}
          <div
            aria-hidden
            className="absolute inset-0 scale-110"
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed',
              filter: 'blur(40px) saturate(0.78) brightness(0.7)',
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed',
              filter: 'saturate(0.78) brightness(0.8)',
            }}
          />
        </>
      )}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg,rgba(46,40,32,0.42),rgba(46,40,32,0.58))' }}
      />
      <div className="relative z-[2] max-w-[820px] px-10 text-paper">
        {eyebrow && <p className="font-caps text-[10.5px] uppercase tracking-[0.4em] text-sand">{eyebrow}</p>}
        <p className="my-6 font-display text-[23px] leading-[1.35] sm:text-[38px]">{children}</p>
      </div>
    </section>
  )
}

export function Divider({ className = '' }) {
  return <div className={`h-px w-full bg-ink/[0.14] ${className}`} />
}
