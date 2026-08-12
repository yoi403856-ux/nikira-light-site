const bilingual = (name, title, type = 'string', extra = {}) => [
  { name, title: `${title}`, type, ...extra },
  { name: `${name}En`, title: `${title} (English)`, type, ...extra },
]

export const reviewsContent = {
  name: 'reviewsContent',
  title: 'Тексты: Отзывы',
  type: 'document',
  fields: [
    ...bilingual('heroTitle', 'Заголовок страницы'),
    ...bilingual('heroLead', 'Подзаголовок', 'text', { rows: 2 }),

    ...bilingual('ctaEyebrow', 'Блок внизу — надпись'),
    ...bilingual('ctaH2a', 'Блок внизу — заголовок, часть 1'),
    ...bilingual('ctaH2b', 'Блок внизу — заголовок, курсив'),
  ],
  preview: { prepare: () => ({ title: 'Тексты: Отзывы' }) },
}
