'use client'

import { useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

/*
  Полноэкранный просмотр скриншотов отзывов — общий для галереи на /reviews
  и ленты на главной, чтобы клавиши/свайп/стрелки не пришлось реализовывать
  дважды. Контролируемый компонент: сам не хранит состояние, только рисует
  то, что ему передали, и сообщает наружу о next/prev/close.
*/
export default function Lightbox({ items, index, onClose, onPrev, onNext }) {
  const touchStartX = useRef(null)
  const open = index !== null && index !== undefined

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = prevOverflow
    }
  }, [open, onClose, onPrev, onNext])

  if (!open) return null

  const item = items[index]

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 40) {
      if (dx > 0) onPrev()
      else onNext()
    }
    touchStartX.current = null
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 p-4 sm:p-10"
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Закрыть"
        className="absolute right-4 top-4 z-[2] flex h-11 w-11 items-center justify-center text-glow/80 transition-colors hover:text-glow sm:right-6 sm:top-6"
      >
        <X size={26} strokeWidth={1.5} />
      </button>

      {items.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onPrev()
            }}
            aria-label="Предыдущее"
            className="absolute left-1 z-[2] flex h-12 w-12 items-center justify-center text-glow/70 transition-colors hover:text-glow sm:left-4"
          >
            <ChevronLeft size={30} strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onNext()
            }}
            aria-label="Следующее"
            className="absolute right-1 z-[2] flex h-12 w-12 items-center justify-center text-glow/70 transition-colors hover:text-glow sm:right-4"
          >
            <ChevronRight size={30} strokeWidth={1.5} />
          </button>
        </>
      )}

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.src}
        alt={item.caption || ''}
        onClick={(e) => e.stopPropagation()}
        className="max-h-full max-w-full object-contain"
      />

      {item.caption && (
        <p className="absolute bottom-4 left-1/2 z-[2] -translate-x-1/2 px-4 text-center font-caps text-[10px] uppercase tracking-[0.22em] text-glow/70 sm:bottom-6">
          {item.caption}
        </p>
      )}
    </div>
  )
}
