const bilingual = (name, title, type = 'string', extra = {}) => [
  { name, title: `${title}`, type, ...extra },
  { name: `${name}En`, title: `${title} (English)`, type, ...extra },
]

export const kittensContent = {
  name: 'kittensContent',
  title: 'Тексты: Котята',
  type: 'document',
  fields: [
    ...bilingual('heroEyebrow', 'Надпись над заголовком'),
    ...bilingual('heroTitle', 'Заголовок страницы'),
    ...bilingual('heroLead', 'Подзаголовок', 'text', { rows: 2 }),

    ...bilingual('howEyebrow', 'Блок «Как забрать» — надпись'),
    ...bilingual('howH2', 'Блок «Как забрать» — заголовок'),
    {
      name: 'steps',
      title: 'Шаги (Знакомство / Бронь / Переезд)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 't', title: 'Заголовок шага', type: 'string' },
          { name: 'tEn', title: 'Заголовок шага (English)', type: 'string' },
          { name: 'd', title: 'Текст шага', type: 'text', rows: 2 },
          { name: 'dEn', title: 'Текст шага (English)', type: 'text', rows: 2 },
        ],
        preview: { select: { title: 't', subtitle: 'd' } },
      }],
    },
  ],
  preview: { prepare: () => ({ title: 'Тексты: Котята' }) },
}
