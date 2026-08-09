const bilingual = (name, title, type = 'string', extra = {}) => [
  { name, title: `${title}`, type, ...extra },
  { name: `${name}En`, title: `${title} (English)`, type, ...extra },
]

// Поля здесь соответствуют тому, что реально читает страница «О нас»
// (lib/content.js -> aboutContentImpl, app/(site)/about/page.jsx) — раньше
// схема была унаследована от старой версии страницы и разошлась с кодом:
// студия показывала поля вроде heroTitleLine1/2, philEyebrow, paragraphs,
// pathEyebrow/pathH2, timeline, которых страница не читает вообще, а
// реально используемые поля (heroEyebrow, heroTitle, storyEyebrow, aside,
// featuresEyebrow) отредактировать было просто негде.
export const aboutContent = {
  name: 'aboutContent',
  title: 'Тексты: О нас',
  type: 'document',
  fields: [
    ...bilingual('heroEyebrow', 'Надпись над заголовком'),
    ...bilingual('heroTitle', 'Заголовок страницы'),
    ...bilingual('heroLead', 'Подзаголовок под названием', 'text', { rows: 2 }),

    ...bilingual('storyEyebrow', 'История — номер раздела'),
    ...bilingual('storyH2a', 'История — заголовок, часть 1'),
    ...bilingual('storyH2b', 'История — заголовок, курсив'),
    ...bilingual('aside', 'История — короткая врезка сбоку от заголовка'),
    ...bilingual('p1', 'История — абзац 1', 'text', { rows: 3 }),
    ...bilingual('p2', 'История — абзац 2', 'text', { rows: 3 }),
    ...bilingual('p3', 'История — абзац 3', 'text', { rows: 3 }),
    ...bilingual('p4', 'История — абзац 4', 'text', { rows: 3 }),

    ...bilingual('featuresEyebrow', 'Локация / Опыт / Стандарт — надпись'),
    {
      name: 'features',
      title: 'Локация / Опыт / Стандарт — карточки',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 't', title: 'Заголовок', type: 'string' },
          { name: 'tEn', title: 'Заголовок (English)', type: 'string' },
          { name: 'd', title: 'Текст', type: 'string' },
          { name: 'dEn', title: 'Текст (English)', type: 'string' },
        ],
        preview: { select: { title: 't', subtitle: 'd' } },
      }],
    },

    ...bilingual('quoteEyebrow', 'Цитата на фото — надпись'),
    ...bilingual('quote', 'Цитата на фото — текст', 'text', { rows: 2 }),
  ],
  preview: { prepare: () => ({ title: 'Тексты: О нас' }) },
}
