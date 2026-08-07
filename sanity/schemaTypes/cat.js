import { slugify } from './slugify'

/*
  Взрослые животные питомника. В старой таблице коты и кошки лежали на разных
  листах, а на сайте переключались фильтром — здесь это один тип с полем
  «Пол», иначе половина полей дублировалась бы в двух схемах.
*/
export const cat = {
  name: 'cat',
  title: 'Кот или кошка',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Полное имя',
      type: 'string',
      description: 'Как в родословной, с приставкой питомника: Kovboy Nikira Light',
      validation: (r) => r.required(),
    },
    { name: 'call', title: 'Домашняя кличка', type: 'string', description: 'Как зовёте дома. Если пусто — покажем полное имя' },
    { name: 'callEn', title: 'Домашняя кличка (English)', type: 'string' },
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
      initialValue: 'female',
      validation: (r) => r.required(),
    },
    {
      name: 'ems',
      title: 'Код окраса (EMS)',
      type: 'string',
      description: 'Как в документах: n 03 22, f 22, a 03. Показываем рядом с описанием окраса',
    },
    { name: 'color', title: 'Окрас словами', type: 'string', description: 'Понятно покупателю: чёрный мрамор на белом' },
    { name: 'colorEn', title: 'Окрас словами (English)', type: 'string' },
    {
      name: 'polydactyl',
      title: 'Полидакт',
      type: 'boolean',
      description: 'Лишние пальцы. Если да — на карточке появится отметка',
      initialValue: false,
    },
    { name: 'weight', title: 'Вес', type: 'string', description: 'Например: 7,2 кг' },
    { name: 'titles', title: 'Титулы', type: 'string', description: 'Оставьте пустым, если титулов нет' },
    { name: 'titlesEn', title: 'Титулы (English)', type: 'string' },
    { name: 'born', title: 'Дата рождения', type: 'date', options: { dateFormat: 'DD.MM.YYYY' } },
    {
      name: 'tests',
      title: 'Тесты здоровья',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'По одному в строку: HCM отрицательно, SMA чистая',
    },
    { name: 'testsEn', title: 'Тесты здоровья (English)', type: 'array', of: [{ type: 'string' }] },
    { name: 'note', title: 'Пара слов о характере', type: 'text', rows: 3 },
    { name: 'noteEn', title: 'Пара слов о характере (English)', type: 'text', rows: 3 },
    {
      name: 'images',
      title: 'Фотографии',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Первая станет главной. Без фотографий животное не попадёт на сайт',
    },
    { name: 'order', title: 'Порядок сортировки', type: 'number', initialValue: 0, description: 'Меньше число — выше в списке' },
  ],
  preview: {
    select: { title: 'name', call: 'call', sex: 'sex', ems: 'ems', media: 'images.0' },
    prepare({ title, call, sex, ems, media }) {
      const who = sex === 'male' ? 'Кот' : 'Кошка'
      return {
        title: call || title,
        subtitle: [who, ems].filter(Boolean).join(' · '),
        media,
      }
    },
  },
}
