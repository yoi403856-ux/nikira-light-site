// Документы-одиночки с текстами страниц открываются сразу, без списка и
// кнопки «создать ещё» — каждого из них всегда ровно один.
const singleton = (S, id, title) =>
  S.listItem().title(title).id(id).child(S.document().schemaType(id).documentId(id))

export const structure = (S) =>
  S.list()
    .title('Nikira Light')
    .items([
      S.listItem().title('Котята').schemaType('kitten').child(S.documentTypeList('kitten').title('Котята')),
      S.listItem().title('Коты и кошки').schemaType('cat').child(S.documentTypeList('cat').title('Коты и кошки')),
      S.listItem().title('Отзывы').schemaType('review').child(S.documentTypeList('review').title('Отзывы')),
      S.divider(),
      singleton(S, 'siteSettings', 'Настройки сайта'),
      S.divider(),
      singleton(S, 'homeContent', 'Тексты: Главная'),
      singleton(S, 'aboutContent', 'Тексты: Питомник'),
      singleton(S, 'kittensContent', 'Тексты: Котята'),
      singleton(S, 'catsContent', 'Тексты: Наши коты'),
      singleton(S, 'reviewsContent', 'Тексты: Отзывы'),
      singleton(S, 'contactsContent', 'Тексты: Контакты'),
    ])
