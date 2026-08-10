import Link from 'next/link'
import { urlForImageCrop } from '@/sanity/image'
import { pick, sexLabel } from '@/lib/dict'
import { withLocale } from '@/lib/locale'

/*
  Коты списком строк, а не плиткой карточек: крупная кличка, окрас и
  маленький кадр справа, который расцветает при наведении. Плитка — то, чем
  устроен соседний сайт, и по ней родство считывается мгновенно.
*/
export default function CatRows({ cats, locale, dict, hrefBase = '/cats' }) {
  if (!cats?.length) {
    return (
      <p className="px-6 py-16 text-center font-sans text-[16px] font-light text-soft sm:px-[70px]">{dict.common.noCats}</p>
    )
  }

  return (
    <section className="border-t border-ink/[0.14]">
      {cats.map((c) => {
        // Портретный кроп (3:4), а не широкая узкая полоска: почти все фото
        // котов сами портретные (кадр выше, чем шире), и щель 150×88 просто
        // не могла вместить морду ни при какой точке фокуса — приходилось
        // видеть либо лоб, либо подбородок. Кадр стал заметно крупнее и
        // выше, вместе с ним и вся строка списка.
        const src = c.images?.[0] ? urlForImageCrop(c.images[0], 420, 560) : null
        const call = pick(locale, c.call, c.callEn) || c.name
        const color = pick(locale, c.color, c.colorEn)
        const facts = [sexLabel(locale, c.sex), color || c.ems].filter(Boolean).join(' · ')
        return (
          <Link
            key={c._id}
            href={withLocale(`${hrefBase}/${c.slug}`, locale)}
            className="group grid grid-cols-[1fr_96px] items-center gap-4 border-b border-ink/[0.14] px-6 py-5 transition-colors duration-300 hover:bg-linen/85 sm:grid-cols-[1fr_260px_170px] sm:gap-8 sm:px-[70px] sm:py-7"
          >
            <span className="font-display text-[24px] leading-[1.1] sm:text-[40px]">{call}</span>
            <span className="hidden font-sans text-[14px] font-light text-soft sm:block">{facts}</span>
            <span className="aspect-[3/4] w-full overflow-hidden">
              {src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={src}
                  alt=""
                  className="h-full w-full object-cover grayscale-[0.4] transition-[filter] duration-300 group-hover:grayscale-0"
                />
              ) : (
                <span className="block h-full w-full bg-linen" />
              )}
            </span>
          </Link>
        )
      })}
    </section>
  )
}
