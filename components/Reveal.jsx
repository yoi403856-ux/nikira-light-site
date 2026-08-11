'use client'

import { useEffect, useRef, useState } from 'react'

/*
  Лёгкое проявление секций при прокрутке — единственная анимация на сайте
  раньше была только у наведения курсора на фото, и на десктопе, где мышь
  не наводят, страница читалась статично. IntersectionObserver вместо
  scroll-слушателя: не считает позицию на каждый кадр прокрутки, срабатывает
  один раз и сам отключается — на уже проявленный элемент второй раз не
  тратится.
*/
export default function Reveal({ children, className = '', delay = 0, as: Tag = 'div', ...rest }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -80px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag
      {...rest}
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}
