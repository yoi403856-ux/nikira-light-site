import { slugify } from './slugify'

/*
  Котёнок. Помёт хранится строкой-литерой («В»), а не отдельным документом:
  на сайте котята группируются по литере, и заводить ради этого справочник
  помётов значит заставлять владелицу заполнять два документа вместо одного.
*/
export const kitten = {
  name: 'kitten',
  title: 'Котёнок',
  type: 'document',
  fields: [
    { name: 'name', title: 'Кличка', type: 'string', validation: (r) => r.required() },
    { name: 'nameEn', title: 'Кличка (English)', type: 'string' },
    {
      name: 'slug',
      title: 'Адрес страницы',
      type: 'slug',
      options: { source: 'name', maxLength: 60, slugify },
      validation: (r) => r.required(),
    },
    {
      name: 'sex',
      title: 'Пол',
      type: 'string',
      options: {
        list: [
          { title: 'Кот', value: 'male' },
          { title: 'Кошка', value: 'female' },
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    },
    {
      name: 'status',
      title: 'Статус',
      type: 'string',
      options: {
        list: [
          { title: 'Свободен', value: 'available' },
          { title: 'Забронирован', value: 'reserved' },
          { title: 'Уехал в семью', value: 'sold' },
        ],
        layout: 'radio',
      },
      initialValue: 'available',
      validation: (r) => r.required(),
    },
    {
      name: 'kind',
      title: 'Класс',
      type: 'string',
      options: {
        list: [
          { title: 'Питомец', value: 'pet' },
          { title: 'Разведение', value: 'breed' },
        ],
        layout: 'radio',
      },
      initialValue: 'pet',
    },
    { name: 'litter', title: 'Литера помёта', type: 'string', description: 'Одна буква: В. Котята с одной литерой встанут в один блок' },
    { name: 'born', title: 'Дата рождения', type: 'date', options: { dateFormat: 'DD.MM.YYYY' } },
    { name: 'ems', title: 'Код окраса (EMS)', type: 'string', description: 'Как в документах: ns 22' },
    { name: 'color', title: 'Окрас словами', type: 'string' },
    { name: 'colorEn', title: 'Окрас словами (English)', type: 'string' },
    { name: 'polydactyl', title: 'Полидакт', type: 'boolean', initialValue: false },
    { name: 'father', title: 'Отец', type: 'reference', to: [{ type: 'cat' }] },
    { name: 'mother', title: 'Мать', type: 'reference', to: [{ type: 'cat' }] },
    { name: 'description', title: 'Пара слов о характере', type: 'text', rows: 3 },
    { name: 'descriptionEn', title: 'Пара слов о характере (English)', type: 'text', rows: 3 },
    {
      name: 'images',
      title: 'Фотографии',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Первая станет главной. Котята без фотографий на сайте не показываются',
    },
    { name: 'video', title: 'Ссылка на видео', type: 'url', description: 'YouTube или прямая ссылка на файл. Необязательно' },
    { name: 'order', title: 'Порядок сортировки', type: 'number', initialValue: 0 },
  ],
  preview: {
    select: { title: 'name', litter: 'litter', status: 'status', media: 'images.0' },
    prepare({ title, litter, status, media }) {
      const map = { available: 'Свободен', reserved: 'Забронирован', sold: 'Уехал' }
      return {
        title,
        subtitle: [litter && `Помёт ${litter}`, map[status]].filter(Boolean).join(' · '),
        media,
      }
    },
  },
}
