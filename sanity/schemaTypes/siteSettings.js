const bilingual = (name, title, type = 'string', extra = {}) => [
  { name, title: `${title}`, type, ...extra },
  { name: `${name}En`, title: `${title} (English)`, type, ...extra },
]

export const siteSettings = {
  name: 'siteSettings',
  title: 'Настройки сайта',
  type: 'document',
  groups: [
    { name: 'contacts', title: 'Контакты', default: true },
    { name: 'about', title: 'О питомнике' },
    { name: 'nav', title: 'Меню и подвал' },
    { name: 'photos', title: 'Фотографии' },
  ],
  fields: [
    // ── контакты ──────────────────────────────────────────
    { name: 'phone', title: 'Телефон', type: 'string', group: 'contacts', description: 'Как показывать на сайте: +7 918 050-95-09' },
    { name: 'whatsapp', title: 'WhatsApp (ссылка)', type: 'url', group: 'contacts', description: 'Вида https://wa.me/79180509509' },
    { name: 'telegram', title: 'Telegram (ссылка)', type: 'url', group: 'contacts' },
    { name: 'instagram', title: 'Instagram (ссылка)', type: 'url', group: 'contacts' },
    { name: 'vk', title: 'ВКонтакте (ссылка)', type: 'url', group: 'contacts' },
    { name: 'email', title: 'E-mail', type: 'string', group: 'contacts' },
    ...bilingual('city', 'Город', 'string', { group: 'contacts' }),

    // ── факты о питомнике ─────────────────────────────────
    {
      name: 'foundedYear',
      title: 'Год основания',
      type: 'number',
      group: 'about',
      description: 'Показывается в шапке фактов и в подвале',
    },
    { name: 'registry', title: 'Организация', type: 'string', group: 'about', description: 'WCF, TICA и т.п.' },
    ...bilingual('delivery', 'Доставка — короткая строка', 'string', {
      group: 'about',
      description: 'Например: доставка по всему миру',
    }),
    { name: 'kittensPlaced', title: 'Сколько котят уехало в семьи', type: 'string', group: 'about', description: 'Можно приблизительно: 60+' },

    // ── меню и подвал ─────────────────────────────────────
    ...bilingual('navHome', 'Меню — «Главная»', 'string', { group: 'nav' }),
    ...bilingual('navAbout', 'Меню — «Питомник»', 'string', { group: 'nav' }),
    ...bilingual('navKittens', 'Меню — «Котята»', 'string', { group: 'nav' }),
    ...bilingual('navCats', 'Меню — «Наши коты»', 'string', { group: 'nav' }),
    ...bilingual('navReviews', 'Меню — «Отзывы»', 'string', { group: 'nav' }),
    ...bilingual('navContacts', 'Меню — «Контакты»', 'string', { group: 'nav' }),
    ...bilingual('footerBlurb', 'Подвал — текст под названием', 'text', { rows: 3, group: 'nav' }),

    // ── фотографии ────────────────────────────────────────
    {
      name: 'background',
      title: 'Фон сайта — сосны над морем',
      type: 'image',
      options: { hotspot: true },
      group: 'photos',
      description: 'Горизонтальная фотография, лучше от 2400 пикселей по ширине. Слева должно быть пусто — там ляжет заголовок',
    },
    {
      name: 'heroCat',
      title: 'Вырезанный кот на первый экран',
      type: 'image',
      options: { hotspot: true },
      group: 'photos',
      description: 'Фотография с прозрачным фоном (PNG или WebP). Кот должен сидеть на полу, а не на когтеточке — иначе она вырежется вместе с ним',
    },
    {
      name: 'aboutPhoto',
      title: 'Фото на странице «Питомник»',
      type: 'image',
      options: { hotspot: true },
      group: 'photos',
    },
    {
      name: 'ogImage',
      title: 'Превью для мессенджеров и соцсетей',
      type: 'image',
      options: { hotspot: true },
      group: 'photos',
      description: 'Показывается, когда кто-то присылает ссылку на сайт в WhatsApp или Telegram. Размер 1200×630',
    },
  ],
  preview: { prepare: () => ({ title: 'Настройки сайта' }) },
}
