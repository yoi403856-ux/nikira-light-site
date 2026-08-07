const bilingual = (name, title, type = 'string', extra = {}) => [
  { name, title: `${title}`, type, ...extra },
  { name: `${name}En`, title: `${title} (English)`, type, ...extra },
]

export const contactsContent = {
  name: 'contactsContent',
  title: 'Тексты: Контакты',
  type: 'document',
  fields: [
    ...bilingual('heroEyebrow', 'Надпись над заголовком'),
    ...bilingual('heroTitle', 'Заголовок страницы'),
    ...bilingual('heroLead', 'Подзаголовок', 'text', { rows: 2 }),

    ...bilingual('askEyebrow', 'Правая колонка — надпись'),
    ...bilingual('askH2', 'Правая колонка — заголовок'),
    ...bilingual('askText', 'Правая колонка — текст', 'text', { rows: 6 }),
  ],
  preview: { prepare: () => ({ title: 'Тексты: Контакты' }) },
}
