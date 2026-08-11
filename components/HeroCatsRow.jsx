/*
  Три вырезанных кота — не карусель (клиентка попросила не листать, а
  показать сразу все), а один составной "портрет": стоят в ряд плечом
  к плечу, средний чуть крупнее и внахлёст поверх соседних — так трио
  читается как один кадр, а не три случайно поставленных рядом фото.
*/
const HEIGHTS = { 1: ['h-full'], 2: ['h-[88%]', 'h-[88%]'], 3: ['h-[76%]', 'h-full', 'h-[76%]'] }
const Z = { 1: [2], 2: [1, 1], 3: [1, 2, 1] }

export default function HeroCatsRow({ images }) {
  if (!images.length) return null
  const heights = HEIGHTS[images.length]
  const z = Z[images.length]

  return (
    <div className="flex h-full w-full items-end justify-center">
      {images.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt=""
          className={`relative w-auto max-w-full object-contain ${heights[i]} ${i > 0 ? '-ml-20 sm:-ml-32' : ''}`}
          style={{
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
