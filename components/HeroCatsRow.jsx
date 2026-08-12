'use client'

import { useEffect, useRef, useState } from 'react'

/*
  Три вырезанных кота — один составной "портрет", средний крупнее и
  внахлёст поверх соседних.

  Раньше размер держали CSS max-width + max-height одновременно — но у
  каждой клиентской вырезки своя пропорция кадра, и на узких/высоких
  контейнерах (мобильный) max-width срабатывал раньше max-height у ВСЕХ
  трёх фото одинаково, так что итоговая высота зависела только от
  случайной пропорции кадра конкретного кота, а не от заданной иерархии
  62%/100%/62% — самым высоким на экране мог оказаться боковой кот с
  самым "вытянутым" кадром, а не средний. Проверено на реальных цифрах
  через getBoundingClientRect.

  Здесь высота считается явно в пикселях из настоящих natural-пропорций
  фото (после onLoad), поэтому иерархия "средний выше" гарантирована
  всегда, а не только когда повезёт с пропорциями. Если итоговая ширина
  ряда не помещается в контейнер — всё трио масштабируется вниз целиком.
*/
const HEIGHT_SCALE = { 1: [1], 2: [0.86, 0.86], 3: [0.8, 1, 0.8] }
const OVERLAP_SCALE = { 1: 0, 2: 0.16, 3: 0.16 }
const Z = { 1: [2], 2: [1, 1], 3: [1, 2, 1] }

export default function HeroCatsRow({ images }) {
  const containerRef = useRef(null)
  const [ratios, setRatios] = useState(() => images.map(() => null))
  const [layout, setLayout] = useState(null)

  const setRatio = (i, naturalWidth, naturalHeight) => {
    setRatios((prev) => {
      if (prev[i]) return prev
      const next = [...prev]
      next[i] = naturalWidth / naturalHeight
      return next
    })
  }

  // onLoad не сработает для картинки, которая была в кэше браузера и уже
  // .complete к моменту гидратации, — ref-коллбэк ловит и этот случай.
  const refCallback = (i) => (el) => {
    if (el && el.complete && el.naturalWidth) setRatio(i, el.naturalWidth, el.naturalHeight)
  }
  const handleLoad = (i) => (e) => setRatio(i, e.target.naturalWidth, e.target.naturalHeight)

  useEffect(() => {
    if (ratios.some((r) => r == null)) return
    const el = containerRef.current
    if (!el) return

    const compute = () => {
      const cw = el.clientWidth
      const ch = el.clientHeight
      const scale = HEIGHT_SCALE[images.length]
      let baseH = ch
      let heights = scale.map((s) => baseH * s)
      let widths = heights.map((h, i) => h * ratios[i])
      const overlapH = baseH * (OVERLAP_SCALE[images.length] || 0)
      const totalW = widths.reduce((a, b) => a + b, 0) - overlapH * (images.length - 1)

      if (totalW > cw) {
        const k = cw / totalW
        baseH *= k
        heights = heights.map((h) => h * k)
        widths = widths.map((w) => w * k)
      }

      setLayout({ heights, widths, overlapH: baseH * (OVERLAP_SCALE[images.length] || 0) })
    }

    compute()
    window.addEventListener('resize', compute)
    return () => window.removeEventListener('resize', compute)
  }, [ratios, images.length])

  const z = Z[images.length]

  return (
    <div ref={containerRef} className="flex h-full w-full items-end justify-center">
      {images.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          ref={refCallback(i)}
          src={src}
          alt=""
          onLoad={handleLoad(i)}
          className="relative transition-opacity duration-500"
          style={{
            width: layout ? `${layout.widths[i]}px` : 'auto',
            height: layout ? `${layout.heights[i]}px` : 'auto',
            maxHeight: layout ? undefined : '70%',
            marginLeft: i > 0 && layout ? `${-layout.overlapH}px` : 0,
            opacity: layout ? 1 : 0,
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
