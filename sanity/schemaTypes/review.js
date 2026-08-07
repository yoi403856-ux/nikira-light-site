/*
  Отзывы у этого питомника — не тексты, а скриншоты переписок и видео от
  покупателей. Поэтому документ хранит картинку или ссылку на видео, а поле
  с текстом необязательное: если владелица захочет процитировать словами,
  сможет, но заставлять её перепечатывать переписку нельзя.
*/
export const review = {
  name: 'review',
  title: 'Отзыв',
  type: 'document',
  fields: [
    {
      name: 'kind',
      title: 'Что это',
      type: 'string',
      options: {
        list: [
          { title: 'Скриншот переписки', value: 'shot' },
          { title: 'Видео', value: 'video' },
          { title: 'Текст', value: 'text' },
        ],
        layout: 'radio',
      },
      initialValue: 'shot',
      validation: (r) => r.required(),
    },
    {
      name: 'image',
      title: 'Скриншот',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.kind === 'video',
      description: 'Перед публикацией закройте номер телефона и фамилию — это чужие личные данные',
    },
    {
      name: 'video',
      title: 'Ссылка на видео',
      type: 'url',
      hidden: ({ parent }) => parent?.kind !== 'video',
    },
    { name: 'text', title: 'Текст отзыва', type: 'text', rows: 4, hidden: ({ parent }) => parent?.kind !== 'text' },
    { name: 'textEn', title: 'Текст отзыва (English)', type: 'text', rows: 4, hidden: ({ parent }) => parent?.kind !== 'text' },
    { name: 'author', title: 'Кто написал', type: 'string', description: 'Имя и город: Анна, Краснодар' },
    { name: 'date', title: 'Когда', type: 'date', options: { dateFormat: 'DD.MM.YYYY' } },
    { name: 'order', title: 'Порядок сортировки', type: 'number', initialValue: 0 },
  ],
  preview: {
    select: { author: 'author', kind: 'kind', text: 'text', media: 'image' },
    prepare({ author, kind, text, media }) {
      const map = { shot: 'Скриншот', video: 'Видео', text: 'Текст' }
      return { title: author || map[kind] || 'Отзыв', subtitle: text ? text.slice(0, 60) : map[kind], media }
    },
  },
}
