const bilingual = (name, title, type = 'string', extra = {}) => [
  { name, title: `${title}`, type, ...extra },
  { name: `${name}En`, title: `${title} (English)`, type, ...extra },
]

// Поля здесь один в один соответствуют тому, что реально читает главная
// страница (lib/content.js -> homeContentImpl, app/(site)/page.jsx) — раньше
// схема была унаследована от старой версии главной и разошлась с кодом:
// студия показывала поля вроде "stats"/"values"/"residentsEyebrow", которых
// страница не читает вообще, а половину реально используемых полей
// (aside, p4, catsEyebrow, catsH2, quoteEyebrow, ctaEyebrow) отредактировать
// было просто негде.
export const homeContent = {
  name: 'homeContent',
  title: 'Тексты: Главная',
  type: 'document',
  fields: [
    ...bilingual('eyebrow', 'Надпись над заголовком (hero)'),
    ...bilingual('titleLine1', 'Заголовок (hero) — строка 1'),
    ...bilingual('titleLine2', 'Заголовок (hero) — строка 2'),
    ...bilingual('titleLine3', 'Заголовок (hero) — строка 3'),
    ...bilingual('lead', 'Подзаголовок (под названием)', 'text', { rows: 2 }),

    ...bilingual('aboutEyebrow', 'Манифест — номер раздела'),
    ...bilingual('aboutH2a', 'Манифест — заголовок, часть 1'),
    ...bilingual('aboutH2b', 'Манифест — заголовок, курсив'),
    ...bilingual('aside', 'Манифест — короткая врезка сбоку от заголовка'),
    ...bilingual('p1', 'Манифест — абзац 1', 'text', { rows: 3 }),
    ...bilingual('p2', 'Манифест — абзац 2', 'text', { rows: 3 }),
    ...bilingual('p3', 'Манифест — абзац 3', 'text', { rows: 3 }),
    ...bilingual('p4', 'Манифест — абзац 4', 'text', { rows: 3 }),

    ...bilingual('catsEyebrow', 'Коты — номер раздела'),
    ...bilingual('catsH2', 'Коты — заголовок'),

    ...bilingual('quoteEyebrow', 'Цитата (под фото кота) — надпись'),
    ...bilingual('quote', 'Цитата (под фото кота) — текст', 'text', { rows: 2 }),

    ...bilingual('ctaEyebrow', 'Финальный блок — номер раздела'),
    ...bilingual('ctaH2a', 'Финальный блок — заголовок, часть 1'),
    ...bilingual('ctaH2b', 'Финальный блок — заголовок, курсив'),
  ],
  preview: { prepare: () => ({ title: 'Тексты: Главная' }) },
}
