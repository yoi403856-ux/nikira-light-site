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
          className={`relative w-auto max-w-full object-contain ${heights[i]} ${i > 0 ? '-ml-8 sm:-ml-12' : ''}`}
          style={{
            zIndex: z[i],
            filter: 'drop-shadow(0 24px 34px rgba(30,22,14,0.42)) sepia(0.18) saturate(1.12) brightness(1.03) hue-rotate(-6deg)',
          }}
        />
      ))}
    </div>
  )
}
