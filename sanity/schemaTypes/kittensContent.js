const bilingual = (name, title, type = 'string', extra = {}) => [
  { name, title: `${title}`, type, ...extra },
  { name: `${name}En`, title: `${title} (English)`, type, ...extra },
]

// Поля соответствуют тому, что реально читает lib/content.js ->
// getKittensContent (extraKeys: waitEyebrow, waitH2a, waitH2b) и
// app/(site)/kittens/page.jsx — раньше схема была унаследована от другой
// версии страницы и предлагала howEyebrow/howH2/steps, которые страница
// вообще не читает, а реальные waitEyebrow/waitH2a/waitH2b отредактировать
// было негде.
export const kittensContent = {
  name: 'kittensContent',
  title: 'Тексты: Котята',
  type: 'document',
  fields: [
    ...bilingual('heroEyebrow', 'Надпись над заголовком'),
    ...bilingual('heroTitle', 'Заголовок страницы'),
    ...bilingual('heroLead', 'Подзаголовок', 'text', { rows: 2 }),

    ...bilingual('waitEyebrow', 'Блок внизу — надпись'),
    ...bilingual('waitH2a', 'Блок внизу — заголовок, часть 1'),
    ...bilingual('waitH2b', 'Блок внизу — заголовок, курсив'),
  ],
  preview: { prepare: () => ({ title: 'Тексты: Котята' }) },
}
