'use client'

import { useState } from 'react'
import { urlForImage, urlForImageCrop } from '@/sanity/image'
import Lightbox from './Lightbox'

/*
  Одно крупное фото + мелкие миниатюры под ним, как на /cats/[slug] и
  /kittens/[slug] раньше без лайтбокса — только теперь клик по любому кадру
  открывает его во весь экран с тем же пролистыванием (стрелки/клавиши/
  свайп), что и у скриншотов отзывов. Полноразмерная версия — не квадратный
  кроп, как в самой карточке, а исходные пропорции кадра (urlForImage), иначе
  в лайтбоксе всё равно было бы обрезано.
*/
export default function PhotoGallery({ images, alt }) {
  const items = (images || [])
    .map((img) => ({ thumb: urlForImageCrop(img, 1000, 1000), full: urlForImage(img, 1800) }))
    .filter((it) => it.thumb)

  const [openIndex, setOpenIndex] = useState(null)

  if (!items.length) return null

  return (
    <>
      <div className="flex flex-col gap-3.5 sm:h-full">
        <figure className="aspect-[4/3] overflow-hidden bg-linen sm:aspect-auto sm:flex-1">
          <button type="button" onClick={() => setOpenIndex(0)} className="block h-full w-full cursor-zoom-in">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={items[0].thumb} alt={alt} className="h-full w-full object-cover" />
          </button>
        </figure>
        {items.length > 1 && (
          <div className="grid grid-cols-4 gap-3.5">
            {items.slice(1).map((it, i) => (
              <figure key={it.thumb} className="aspect-square overflow-hidden bg-linen">
                <button type="button" onClick={() => setOpenIndex(i + 1)} className="block h-full w-full cursor-zoom-in">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={it.thumb} alt={alt} className="h-full w-full object-cover" />
                </button>
              </figure>
            ))}
          </div>
        )}
      </div>

      <Lightbox
        items={items.map((it) => ({ src: it.full, caption: alt }))}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onPrev={() => setOpenIndex((i) => (i - 1 + items.length) % items.length)}
        onNext={() => setOpenIndex((i) => (i + 1) % items.length)}
      />
    </>
  )
}
