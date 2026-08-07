/*
  Закреплённый фон: фотография сосен над морем стоит на месте, страница едет
  поверх неё. Затемнение сверху и слева нужно не ради красоты — по нему лежит
  светлый текст первого экрана, и без него он теряется на ярком небе.

  Молочной заливки поверх фотографии нет намеренно: она гасила закат и
  превращала снимок в подложку. Читаемость держат тени на самом тексте
  (класс .on-photo в globals.css).
*/
export default function SiteBackground({ photoUrl, inner = false }) {
  return (
    <>
      <div
        aria-hidden
        className="fixed inset-0 -z-20 bg-linen bg-cover bg-no-repeat"
        style={{
          backgroundImage: photoUrl
            ? `url(${photoUrl}), linear-gradient(180deg,#DCC9B4 0%,#EFDCC4 55%,#E6D0B4 100%)`
            : 'linear-gradient(180deg,#DCC9B4 0%,#EFDCC4 55%,#E6D0B4 100%)',
          backgroundPosition: 'center 38%',
        }}
      />
      <div
        aria-hidden
        className="fixed inset-0 -z-10 pointer-events-none"
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
