/*
  Три вырезанных кота — не карусель (клиентка попросила не листать, а
  показать сразу все), а один составной "портрет": стоят в ряд плечом
  к плечу, средний крупнее и внахлёст поверх соседних — так трио
  читается как один кадр, а не три случайно поставленных рядом фото.

  Размер каждого кота держат ДВА ограничения разом: max-height задаёт
  саму иерархию (средний выше боковых), max-width — просто потолок
  безопасности. Раньше max-height был везде одинаковый (100%), поэтому
  все три вырастали до одной высоты независимо от max-width — котов было
  не отличить "большой/маленький". Без max-width же широкий кадр (у
  клиентских вырезок разный формат холста с разным запасом прозрачного
  поля вокруг кота) мог вылезти за пределы колонки и лечь на текст слева.
*/
const HEIGHTS = { 1: ['66%'], 2: ['80%', '80%'], 3: ['62%', '100%', '62%'] }
const WIDTHS = { 1: ['62%'], 2: ['46%', '46%'], 3: ['42%', '58%', '42%'] }
const OVERLAP = { 1: [0], 2: [-10], 3: [-16, -16] }
const Z = { 1: [2], 2: [1, 1], 3: [1, 2, 1] }

export default function HeroCatsRow({ images }) {
  if (!images.length) return null
  const heights = HEIGHTS[images.length]
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
            maxHeight: heights[i],
            maxWidth: widths[i],
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
