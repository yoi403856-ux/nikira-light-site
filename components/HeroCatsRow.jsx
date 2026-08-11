/*
  Три вырезанных кота — не карусель (клиентка попросила не листать, а
  показать сразу все), а один составной "портрет": стоят в ряд плечом
  к плечу, средний чуть крупнее и внахлёст поверх соседних — так трио
  читается как один кадр, а не три случайно поставленных рядом фото.

  Размер каждого кота задаётся max-width в процентах от контейнера (а не
  высотой, как было раньше) — иначе широкий кадр (у клиентских вырезок
  разное соотношение сторон и запас прозрачного поля вокруг кота) мог
  вылезти за пределы своей колонки и лечь поверх текста/кнопок слева.
  max-height ограничивает и высоту, so сумма трёх ширин с учётом нахлёста
  гарантированно не превышает ширину колонки ни при каком исходном фото.
*/
const WIDTHS = { 1: ['62%'], 2: ['46%', '46%'], 3: ['34%', '42%', '34%'] }
const OVERLAP = { 1: [0], 2: [-6], 3: [-7, -7] }
const Z = { 1: [2], 2: [1, 1], 3: [1, 2, 1] }

export default function HeroCatsRow({ images }) {
  if (!images.length) return null
  const widths = WIDTHS[images.length]
  const overlap = OVERLAP[images.length]
  const z = Z[images.length]

  return (
    <div className="flex h-full w-full items-end justify-center">
      {images.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt=""
          className="relative"
          style={{
            maxWidth: widths[i],
            maxHeight: '100%',
            width: 'auto',
            height: 'auto',
            marginLeft: i > 0 ? `${overlap[i - 1]}%` : 0,
            zIndex: z[i],
            // тёплый закатный свет фона + сепия/оттенок гасят "студийную" подсветку
            // исходных вырезок — без этого коты выглядят наклеенными поверх фото
            filter:
              'drop-shadow(0 24px 34px rgba(30,22,14,0.45)) sepia(0.26) saturate(1.18) brightness(0.96) contrast(1.05) hue-rotate(-9deg)',
          }}
        />
      ))}
    </div>
  )
}
