/*
  Тексты по умолчанию. Всё, что здесь, владелица может переопределить в студии
  (документы «Тексты: …»). Словарь нужен, чтобы сайт никогда не оказался с
  пустыми заголовками — даже на чистом датасете.
*/
export const T = {
  ru: {
    nav: {
      home: 'Главная',
      about: 'Питомник',
      kittens: 'Котята',
      cats: 'Наши коты',
      reviews: 'Отзывы',
      contacts: 'Контакты',
    },
    common: {
      more: 'Смотреть всех',
      allKittens: 'Все котята',
      write: 'Написать нам',
      watch: 'Посмотреть котят',
      aboutUs: 'О питомнике',
      askKittens: 'Спросить о котятах',
      offspring: 'Потомство',
      father: 'Отец',
      mother: 'Мать',
      back: 'Назад',
      noKittens: 'Сейчас свободных котят нет. Напишите нам — расскажем о ближайших планах.',
      noCats: 'Скоро здесь появятся наши коты.',
      noReviews: 'Отзывы скоро появятся.',
      video: 'Видео',
      polydactyl: 'Полидакт',
      pet: 'Питомец',
      breed: 'Разведение',
      litter: 'Помёт',
      born: 'Родился',
      bornF: 'Родилась',
      color: 'Окрас',
      sex: 'Пол',
      weight: 'Вес',
      titles: 'Титулы',
      health: 'Здоровье',
      ems: 'Код окраса',
      allPlaced: 'все уехали',
    },
    home: {
      eyebrow: 'Питомник мейн-кунов у моря',
      title: ['Свет,', 'тишина,', 'характер'],
      lead: 'Мы растим котов дома, на берегу. Не в вольере и не за стеклом — на диване, на подоконнике, под ногами.',
      aboutEyebrow: 'Питомник',
      aboutH2a: 'Мейн-кун начинался как рабочий кот на ферме. Мы держимся ',
      aboutH2b: 'за этот характер',
      aside: 'Мало помётов, много времени на каждого котёнка.',
      p1: 'Не декоративная кошка и не украшение интерьера. Кот, который ходит за вами по дому, встречает у двери и спокойно относится к гостям, детям и пылесосу.',
      p2: 'Такой характер не появляется сам. Он складывается в первые двенадцать недель и почти целиком зависит от того, что происходило с котёнком в это время.',
      p3: 'Поэтому у нас мало помётов. Каждый котёнок растёт в доме, среди людей и других животных, и уезжает уже уверенным в себе.',
      p4: 'Мы отвечаем на вопросы и после переезда — сколько потребуется, столько и будем на связи.',
      catsEyebrow: 'Наши коты',
      catsH2: 'Коты и кошки питомника',
      reviewsEyebrow: 'Отзывы',
      reviewsH2: 'Что пишут о наших котятах',
      quoteEyebrow: 'Как мы выбираем',
      quote: 'Размер и родословная — это половина. Вторая половина решается на руках, в первые три месяца.',
      ctaEyebrow: 'Котята',
      ctaH2a: 'Познакомьтесь ',
      ctaH2b: 'с нашими котятами',
      ctaH2c: '.',
    },
    about: {
      heroEyebrow: '01',
      heroTitle: 'Питомник на берегу',
      heroLead: 'Мы живём в Новороссийске, у моря, и наши коты растут здесь же — в доме, а не в отдельном помещении для животных.',
      storyEyebrow: 'Как всё началось',
      storyH2a: 'Питомник основан в 2021 году, ',
      storyH2b: 'и всё пошло не по плану',
      aside: 'Мы не собирались заводить питомник. Просто оказалось, что умеем.',
      p1: 'Мейн-кун — порода рабочая. На фермах Новой Англии эти коты жили при хозяйстве, ловили мышей и были рядом с людьми постоянно. Отсюда и характер: спокойный, включённый, без пугливости.',
      p2: 'Этот характер легко потерять. Достаточно растить котёнка в отдельной комнате, без шума и рук, и вырастет красивый, крупный, но дикий кот, которого потом всю жизнь придётся приручать заново.',
      p3: 'Мы держим мало животных, чтобы каждому хватало внимания. Котята живут в доме с первого дня, привыкают к пылесосу, гостям, детям и другим кошкам.',
      p4: 'Все животные зарегистрированы в WCF и проходят ветеринарные обследования. Котята уезжают привитыми по возрасту, с ветпаспортом и документами. Доставляем в любую страну.',
      quoteEyebrow: 'Наш принцип',
      quote: 'Котёнок уезжает тогда, когда готов он, а не тогда, когда удобно нам.',
      featuresEyebrow: 'Что получает покупатель',
      features: [
        { t: 'Документы WCF', d: 'Метрика и родословная' },
        { t: 'Вакцинация', d: 'По возрасту, с ветпаспортом' },
        { t: 'Социализация', d: 'Растут с детьми и другими животными' },
        { t: 'Поддержка', d: 'Консультируем и после переезда' },
      ],
    },
    kittens: {
      heroEyebrow: '02',
      heroTitle: 'Котята',
      heroLead: 'Уезжают не раньше трёх месяцев: привитые, с документами, приучённые к лотку и когтеточке.',
      waitEyebrow: 'Не нашли своего',
      waitH2a: 'Напишите нам ',
      waitH2b: 'о ближайшем помёте',
      waitCta: 'Встать в лист ожидания',
      filterAll: 'Все',
      filterAvailable: 'Свободны',
      filterReserved: 'Забронированы',
      filterSold: 'Уехали',
    },
    cats: {
      heroEyebrow: '03',
      heroTitle: 'Наши коты',
      heroLead: 'Все проверены по здоровью, зарегистрированы в WCF и живут дома, а не в клетках.',
      filterAll: 'Все',
      filterMale: 'Коты',
      filterFemale: 'Кошки',
      docsEyebrow: 'Документы',
      docsH2a: 'Родословные и тесты ',
      docsH2b: 'показываем по запросу',
      docsText: 'Спрашивайте что угодно: метрики, результаты обследований, фотографии родителей. Ничего скрытого у нас нет.',
    },
    reviews: {
      heroEyebrow: '04',
      heroTitle: 'Отзывы',
      heroLead: 'Что пишут те, к кому уехали наши котята.',
      ctaEyebrow: 'Ваша очередь',
      ctaH2a: 'Расскажите, как дела ',
      ctaH2b: 'у вашего кота',
    },
    contacts: {
      heroEyebrow: '05',
      heroTitle: 'Связаться',
      heroLead: 'Пишите в любое время. Отвечаем обычно в течение дня.',
      askEyebrow: 'Прежде чем писать',
      askH2: 'Расскажите немного о себе',
      askText: 'Есть ли уже животные дома, есть ли маленькие дети, кого ищете — кота или кошку, для дома или для разведения. Так мы быстрее поймём, какой котёнок вам подойдёт, и не будем задавать двадцать встречных вопросов.\n\nПриехать в гости и познакомиться с родителями котят можно по договорённости.',
      labels: {
        phone: 'Телефон',
        whatsapp: 'WhatsApp',
        telegram: 'Telegram',
        instagram: 'Instagram',
        vk: 'ВКонтакте',
        email: 'Почта',
        address: 'Адрес',
      },
    },
  },

  en: {
    nav: {
      home: 'Home',
      about: 'Cattery',
      kittens: 'Kittens',
      cats: 'Our Cats',
      reviews: 'Reviews',
      contacts: 'Contact',
    },
    common: {
      more: 'See all',
      allKittens: 'All kittens',
      write: 'Write to us',
      watch: 'See the kittens',
      aboutUs: 'About the cattery',
      askKittens: 'Ask about kittens',
      offspring: 'Offspring',
      father: 'Father',
      mother: 'Mother',
      back: 'Back',
      noKittens: 'No kittens available right now. Write to us and we will tell you about the upcoming litters.',
      noCats: 'Our cats will appear here soon.',
      noReviews: 'Reviews coming soon.',
      video: 'Video',
      polydactyl: 'Polydactyl',
      pet: 'Pet',
      breed: 'Breeding',
      litter: 'Litter',
      born: 'Born',
      bornF: 'Born',
      color: 'Colour',
      sex: 'Sex',
      weight: 'Weight',
      titles: 'Titles',
      health: 'Health',
      ems: 'EMS code',
      allPlaced: 'all placed',
    },
    home: {
      eyebrow: 'Maine Coon cattery by the sea',
      title: ['Light,', 'quiet,', 'character'],
      lead: 'We raise our cats at home, on the coast. Not in an enclosure and not behind glass — on the sofa, on the windowsill, underfoot.',
      aboutEyebrow: 'The cattery',
      aboutH2a: 'The Maine Coon began as a working farm cat. We hold on ',
      aboutH2b: 'to that character',
      aside: 'Few litters, plenty of time for every kitten.',
      p1: 'Not an ornament and not a piece of the interior. A cat that follows you around the house, meets you at the door and takes guests, children and the vacuum cleaner calmly.',
      p2: 'That character does not appear on its own. It forms in the first twelve weeks and depends almost entirely on what happened to the kitten during that time.',
      p3: 'That is why we have few litters. Every kitten grows up in the house, among people and other animals, and leaves already sure of itself.',
      p4: 'We answer questions long after the kitten has moved in — for as long as it takes.',
      catsEyebrow: 'Our cats',
      catsH2: 'Cats of the cattery',
      reviewsEyebrow: 'Reviews',
      reviewsH2: 'What people say about our kittens',
      quoteEyebrow: 'How we choose',
      quote: 'Size and pedigree are only half of it. The other half is settled in your hands, in the first three months.',
      ctaEyebrow: 'Kittens',
      ctaH2a: 'Come and meet ',
      ctaH2b: 'our kittens',
      ctaH2c: '.',
    },
    about: {
      heroEyebrow: '01',
      heroTitle: 'A cattery on the coast',
      heroLead: 'We live in Novorossiysk by the sea, and our cats grow up right here — in the house, not in a separate room for animals.',
      storyEyebrow: 'How it started',
      storyH2a: 'The cattery was founded in 2021, ',
      storyH2b: 'and nothing went to plan',
      aside: 'We never meant to start a cattery. It simply turned out we were good at it.',
      p1: 'The Maine Coon is a working breed. On New England farms these cats lived around the household, caught mice and were constantly near people. Hence the character: calm, involved, unafraid.',
      p2: 'That character is easy to lose. Raise a kitten in a separate room, without noise and without hands, and you get a beautiful, large, but wild cat you will be taming for the rest of its life.',
      p3: 'We keep few animals so that each gets enough attention. Kittens live in the house from day one and get used to the vacuum cleaner, guests, children and other cats.',
      p4: 'All our animals are registered with the WCF and undergo veterinary screening. Kittens leave vaccinated for their age, with a veterinary passport and documents. We deliver worldwide.',
      quoteEyebrow: 'Our principle',
      quote: 'A kitten leaves when the kitten is ready, not when it suits us.',
      featuresEyebrow: 'What you get',
      features: [
        { t: 'WCF documents', d: 'Registration and pedigree' },
        { t: 'Vaccination', d: 'Age-appropriate, with passport' },
        { t: 'Socialisation', d: 'Raised with children and other animals' },
        { t: 'Support', d: 'We stay in touch after the move' },
      ],
    },
    kittens: {
      heroEyebrow: '02',
      heroTitle: 'Kittens',
      heroLead: 'They leave no earlier than three months: vaccinated, with documents, litter and scratching post trained.',
      waitEyebrow: 'Nothing here for you yet',
      waitH2a: 'Write to us ',
      waitH2b: 'about the next litter',
      waitCta: 'Join the waiting list',
      filterAll: 'All',
      filterAvailable: 'Available',
      filterReserved: 'Reserved',
      filterSold: 'Placed',
    },
    cats: {
      heroEyebrow: '03',
      heroTitle: 'Our cats',
      heroLead: 'All health-tested, registered with the WCF, and living at home rather than in cages.',
      filterAll: 'All',
      filterMale: 'Males',
      filterFemale: 'Females',
      docsEyebrow: 'Documents',
      docsH2a: 'Pedigrees and tests ',
      docsH2b: 'available on request',
      docsText: 'Ask us anything: registrations, screening results, photos of the parents. We have nothing to hide.',
    },
    reviews: {
      heroEyebrow: '04',
      heroTitle: 'Reviews',
      heroLead: 'What the families our kittens went to have to say.',
      ctaEyebrow: 'Your turn',
      ctaH2a: 'Tell us how ',
      ctaH2b: 'your cat is doing',
    },
    contacts: {
      heroEyebrow: '05',
      heroTitle: 'Get in touch',
      heroLead: 'Write any time. We usually reply within a day.',
      askEyebrow: 'Before you write',
      askH2: 'Tell us a little about yourself',
      askText: 'Whether you already have animals at home, whether there are small children, and who you are looking for — a male or a female, as a pet or for breeding. That way we will understand faster which kitten suits you, and will not have to ask twenty questions back.\n\nYou are welcome to visit and meet the parents by arrangement.',
      labels: {
        phone: 'Phone',
        whatsapp: 'WhatsApp',
        telegram: 'Telegram',
        instagram: 'Instagram',
        vk: 'VK',
        email: 'Email',
        address: 'Address',
      },
    },
  },
}

export function sexLabel(locale, v) {
  if (!v) return ''
  const map = { ru: { male: 'кот', female: 'кошка' }, en: { male: 'male', female: 'female' } }
  return map[locale][v] || ''
}

export function kindLabel(locale, v) {
  if (!v) return ''
  return T[locale].common[v === 'breed' ? 'breed' : 'pet']
}

export function freeOf(locale, free, total) {
  return locale === 'en' ? `${free} of ${total} available` : `свободны ${free} из ${total}`
}

export const statusMap = {
  ru: {
    available: { label: 'Свободен', cls: 'text-ember border-ember' },
    reserved: { label: 'Забронирован', cls: 'text-ember border-ember' },
    sold: { label: 'Уехал в семью', cls: 'text-soft border-ink/30' },
  },
  en: {
    available: { label: 'Available', cls: 'text-ember border-ember' },
    reserved: { label: 'Reserved', cls: 'text-ember border-ember' },
    sold: { label: 'Placed', cls: 'text-soft border-ink/30' },
  },
}

// Котёнок со статусом "available" физически уезжает не раньше трёх месяцев
// (см. лид на /kittens), но до этого возраста его уже можно смотреть и
// бронировать. Ярлык "Свободен" в этом случае вводит в заблуждение — читается
// как "забирайте хоть сейчас". Возраст считаем от даты рождения, а не храним
// отдельным статусом в студии: он всё равно меняется сам по календарю, ручной
// статус только рассинхронится и его придётся не забывать переключать.
const READY_AGE_MONTHS = 3

export function kittenStatusLabel(locale, status, born) {
  if (status === 'available' && born) {
    const readyDate = new Date(born)
    readyDate.setMonth(readyDate.getMonth() + READY_AGE_MONTHS)
    if (readyDate > new Date()) {
      return {
        label: locale === 'en' ? 'Reservable' : 'Можно забронировать',
        cls: 'text-ember border-ember',
      }
    }
  }
  return statusMap[locale][status] || statusMap[locale].available
}

// Выбирает поле нужного языка: у английского запасной вариант — русский,
// чтобы недозаполненная английская версия не выглядела дырявой.
export function pick(locale, ru, en) {
  return (locale === 'en' ? en || ru : ru) || ''
}

export function pickList(locale, ru, en) {
  const v = locale === 'en' ? (en?.length ? en : ru) : ru
  return Array.isArray(v) ? v : []
}

export const dateLocale = { ru: 'ru-RU', en: 'en-GB' }
