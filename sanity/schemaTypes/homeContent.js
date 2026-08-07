const bilingual = (name, title, type = 'string', extra = {}) => [
  { name, title: `${title}`, type, ...extra },
  { name: `${name}En`, title: `${title} (English)`, type, ...extra },
]

export const homeContent = {
  name: 'homeContent',
  title: 'Тексты: Главная',
  type: 'document',
  fields: [
    ...bilingual('eyebrow', 'Надпись над заголовком'),
    ...bilingual('lead', 'Подзаголовок (под названием)', 'text', { rows: 2 }),

    ...bilingual('aboutEyebrow', 'Манифест — надпись-эйброу'),
    ...bilingual('aboutH2a', 'Манифест — заголовок, часть 1'),
    ...bilingual('aboutH2b', 'Манифест — заголовок, курсив'),
    ...bilingual('p1', 'Манифест — абзац 1', 'text', { rows: 3 }),
    ...bilingual('p2', 'Манифест — абзац 2', 'text', { rows: 3 }),
    ...bilingual('p3', 'Манифест — абзац 3 (цитата)', 'text', { rows: 2 }),

    {
      name: 'stats',
      title: 'Статистика (4 плашки)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'n', title: 'Число', type: 'string' },
          { name: 'l', title: 'Подпись', type: 'string' },
          { name: 'lEn', title: 'Подпись (English)', type: 'string' },
        ],
        preview: { select: { title: 'n', subtitle: 'l' } },
      }],
    },

    ...bilingual('residentsEyebrow', 'Обитатели леса — надпись'),
    ...bilingual('residentsH2', 'Обитатели леса — заголовок'),

    ...bilingual('whyEyebrow', 'Четыре обещания — надпись'),
    ...bilingual('whyH2', 'Четыре обещания — заголовок'),
    {
      name: 'values',
      title: 'Четыре обещания (карточки)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 't', title: 'Заголовок', type: 'string' },
          { name: 'tEn', title: 'Заголовок (English)', type: 'string' },
          { name: 'd', title: 'Текст', type: 'text', rows: 2 },
          { name: 'dEn', title: 'Текст (English)', type: 'text', rows: 2 },
        ],
        preview: { select: { title: 't', subtitle: 'd' } },
      }],
    },

    ...bilingual('quote', 'Цитата (тёмная секция)', 'text', { rows: 2 }),
    ...bilingual('quoteBy', 'Подпись под цитатой'),

    ...bilingual('ctaH2a', 'Финальный блок — заголовок, часть 1'),
    ...bilingual('ctaH2b', 'Финальный блок — заголовок, курсив'),
    ...bilingual('ctaH2c', 'Финальный блок — заголовок, часть 3'),
    ...bilingual('ctaLead', 'Финальный блок — текст', 'text', { rows: 2 }),
  ],
  preview: { prepare: () => ({ title: 'Тексты: Главная' }) },
}
