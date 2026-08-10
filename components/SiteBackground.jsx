/*
  Закреплённый фон: фотография сосен над морем стоит на месте, страница едет
  поверх неё. Затемнение сверху и слева нужно не ради красоты — по нему лежит
  светлый текст первого экрана, и без него он теряется на ярком небе.

  Молочной заливки поверх фотографии нет намеренно: она гасила закат и
  превращала снимок в подложку. Читаемость держат тени на самом тексте
  (класс .on-photo в globals.css).

  `inset-x-0 top-0` + `.h-screen-stable` вместо `inset-0`: на мобильных
  браузерах fixed-элемент, прибитый ещё и к low, ловит скачок при
  скрытии/появлении адресной строки — сайт «дёргается» и снизу видна
  полоска непрокрашенной области. Та же проблема и то же лечение, что на
  Summer Cherry (см. components/SiteBackground.jsx там). translateZ(0) и
  will-change убирают дополнительное дрожание от перерисовки на скролле.

  Резкое фото снизу — а не одно ровное blur(2px) по всей высоте — потому что
  живой backdrop-filter пересчитывается каждый кадр прокрутки и на слабой
  видеокарте иногда не прорисовывается вовсе (см. .panel/Masthead ниже,
  тот же случай, что на Summer Cherry). Прогрессивное размытие к низу здесь
  собрано из двух статичных, кэшируемых слоёв вместо одного живого эффекта:
  резкий слой снизу, поверх него — тот же кадр с blur(14px), обрезанный
  mask-image так, что сверху он прозрачный (виден резкий слой), а к низу
  полностью непрозрачный (виден размытый). Стык мягкий, но пересчитывать
  на скролле нечего — оба слоя нарисованы один раз.
*/
export default function SiteBackground({ photoUrl, inner = false }) {
  const bgImage = photoUrl
    ? `url(${photoUrl}), linear-gradient(180deg,#DCC9B4 0%,#EFDCC4 55%,#E6D0B4 100%)`
    : 'linear-gradient(180deg,#DCC9B4 0%,#EFDCC4 55%,#E6D0B4 100%)'

  return (
    <>
      <div
        aria-hidden
        className="h-screen-stable fixed inset-x-0 top-0 -z-20 bg-linen bg-cover bg-no-repeat [transform:translateZ(0)] [-webkit-transform:translateZ(0)] [backface-visibility:hidden] [will-change:transform]"
        style={{ backgroundImage: bgImage, backgroundPosition: '38% 38%' }}
      />
      <div
        aria-hidden
        className="h-screen-stable fixed inset-x-0 top-0 z-[-15] bg-linen bg-cover bg-no-repeat [filter:blur(14px)] [transform:translateZ(0)] [-webkit-transform:translateZ(0)] [backface-visibility:hidden]"
        style={{
          backgroundImage: bgImage,
          backgroundPosition: '38% 38%',
          maskImage: 'linear-gradient(to bottom, transparent 0%, transparent 45%, black 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, transparent 45%, black 100%)',
        }}
      />
      <div
        aria-hidden
        className="h-screen-stable fixed inset-x-0 top-0 -z-10 pointer-events-none [transform:translateZ(0)] [-webkit-transform:translateZ(0)] [backface-visibility:hidden]"
        style={{
          background: inner
            ? // на внутренних страницах фон открыт только под шапкой,
              // дальше идёт бумага, поэтому гасим его быстрее
              'linear-gradient(180deg,rgba(44,36,26,0.42) 0%,rgba(44,36,26,0.18) 26%,rgba(44,36,26,0) 46%),' +
              'linear-gradient(180deg,rgba(251,243,232,0) 30%,rgba(251,243,232,0.5) 100%)'
            : 'linear-gradient(180deg,rgba(44,36,26,0.34) 0%,rgba(44,36,26,0.10) 32%,rgba(44,36,26,0) 54%),' +
              'linear-gradient(90deg,rgba(44,36,26,0.28) 0%,rgba(44,36,26,0.06) 46%,rgba(44,36,26,0) 66%),' +
              'linear-gradient(180deg,rgba(251,243,232,0) 58%,rgba(251,243,232,0.34) 100%)',
        }}
      />
    </>
  )
}
