'use client'

import { useEffect, useState } from 'react'

/*
  Раньше в hero был один вырезанный кот — клиентка прислала несколько удачных
  фото и попросила показать 2-3. Крутить их в этом же слоте кросс-фейдом,
  а не ставить рядом: колонка узкая, три силуэта в ряд просто бы сплющились.
*/
export default function HeroCarousel({ images }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (images.length < 2) return
    const id = setInterval(() => setIndex((i) => (i + 1) % images.length), 5000)
    return () => clearInterval(id)
  }, [images.length])

  return (
    <>
      {images.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt=""
          className="absolute inset-0 z-[2] h-full w-full object-contain transition-opacity duration-[1200ms] ease-in-out"
          style={{
            opacity: i === index ? 1 : 0,
            filter: 'drop-shadow(0 24px 34px rgba(30,22,14,0.42)) sepia(0.18) saturate(1.12) brightness(1.03) hue-rotate(-6deg)',
          }}
        />
      ))}

      {images.length > 1 && (
        <div className="absolute -bottom-6 left-1/2 z-[3] flex -translate-x-1/2 gap-2">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`${i + 1}`}
              className={`h-1.5 w-1.5 rounded-full transition-colors ${i === index ? 'bg-ember' : 'bg-glow/40'}`}
            />
          ))}
        </div>
      )}
    </>
  )
}
