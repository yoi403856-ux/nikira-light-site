const bilingual = (name, title, type = 'string', extra = {}) => [
  { name, title: `${title}`, type, ...extra },
  { name: `${name}En`, title: `${title} (English)`, type, ...extra },
]

export const aboutContent = {
  name: 'aboutContent',
  title: 'Тексты: О нас',
  type: 'document',
  fields: [
    { name: 'heroTitleLine1', title: 'Заголовок — строка 1', type: 'string' },
    { name: 'heroTitleLine1En', title: 'Заголовок — строка 1 (English)', type: 'string' },
    { name: 'heroTitleLine2', title: 'Заголовок — строка 2', type: 'string' },
    { name: 'heroTitleLine2En', title: 'Заголовок — строка 2 (English)', type: 'string' },
    ...bilingual('heroLead', 'Подзаголовок под названием', 'text', { rows: 2 }),

    ...bilingual('philEyebrow', 'Философия — надпись'),
    ...bilingual('philH2a', 'Философия — заголовок, часть 1'),
    ...bilingual('philH2b', 'Философия — заголовок, курсив'),
    ...bilingual('philH2c', 'Философия — заголовок, часть 3'),
    {
      name: 'paragraphs',
      title: 'Философия — абзацы текста',
      type: 'array',
      of: [{ type: 'text', rows: 3 }],
    },
    {
      name: 'paragraphsEn',
      title: 'Философия — абзацы текста (English)',
      type: 'array',
      of: [{ type: 'text', rows: 3 }],
    },

    ...bilingual('quote', 'Цитата на фото', 'text', { rows: 2 }),

    {
      name: 'features',
      title: 'Локация / Опыт / Стандарт',
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

    ...bilingual('pathEyebrow', 'Хроника — надпись'),
    ...bilingual('pathH2', 'Хроника — заголовок'),
    {
      name: 'timeline',
      title: 'Хроника питомника (события)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'year', title: 'Год', type: 'string' },
          { name: 'title', title: 'Заголовок', type: 'string' },
          { name: 'titleEn', title: 'Заголовок (English)', type: 'string' },
          { name: 'text', title: 'Текст', type: 'text', rows: 2 },
          { name: 'textEn', title: 'Текст (English)', type: 'text', rows: 2 },
        ],
        preview: { select: { title: 'year', subtitle: 'title' } },
      }],
    },
  ],
  preview: { prepare: () => ({ title: 'Тексты: О нас' }) },
}
