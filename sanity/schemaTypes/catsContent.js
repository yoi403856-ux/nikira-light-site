const bilingual = (name, title, type = 'string', extra = {}) => [
  { name, title: `${title}`, type, ...extra },
  { name: `${name}En`, title: `${title} (English)`, type, ...extra },
]

export const catsContent = {
  name: 'catsContent',
  title: 'Тексты: Наши коты',
  type: 'document',
  fields: [
    ...bilingual('heroEyebrow', 'Надпись над заголовком'),
    ...bilingual('heroTitle', 'Заголовок страницы'),
    ...bilingual('heroLead', 'Подзаголовок', 'text', { rows: 2 }),

    ...bilingual('docsEyebrow', 'Блок внизу — надпись'),
    ...bilingual('docsH2a', 'Блок внизу — заголовок, часть 1'),
    ...bilingual('docsH2b', 'Блок внизу — заголовок, курсив'),
    ...bilingual('docsText', 'Блок внизу — текст', 'text', { rows: 3 }),
  ],
  preview: { prepare: () => ({ title: 'Тексты: Наши коты' }) },
}
