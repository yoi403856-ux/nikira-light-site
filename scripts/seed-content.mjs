// Разовый скрипт: заполняет документы-одиночки *Content в Sanity текущими
// текстами из lib/dict.js, чтобы поля в Studio не были пустыми после
// исправления схем. Запускать один раз, потом можно удалить.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createClient } from '@sanity/client'

const root = path.dirname(fileURLToPath(import.meta.url)) + '/..'

function loadEnvLocal() {
  const text = fs.readFileSync(path.join(root, '.env.local'), 'utf8')
  const env = {}
  for (const line of text.split(/\r?\n/)) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/)
    if (m) env[m[1]] = m[2]
  }
  return env
}

const env = loadEnvLocal()
const token = env.SANITY_API_TOKEN
if (!token) {
  console.error('SANITY_API_TOKEN не найден в .env.local')
  process.exit(1)
}

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-07-01',
  token,
  useCdn: false,
})

// ru / en тексты — сведены из lib/dict.js, поля соответствуют схемам после
// правки aboutContent.js, catsContent.js, reviewsContent.js, kittensContent.js
const docs = {
  homeContent: {
    eyebrow: 'Питомник мейн-кунов у моря',
    eyebrowEn: 'A Maine Coon cattery by the sea',
    lead: 'Мы растим котов дома, на берегу. Не в вольере и не за стеклом — на диване, на подоконнике, под ногами.',
    leadEn: 'We raise our cats at home, by the sea. Not in an enclosure, not behind glass — on the couch, on the windowsill, underfoot.',
    aboutEyebrow: 'Питомник',
    aboutEyebrowEn: 'The cattery',
    aboutH2a: 'Мейн-кун начинался как рабочий кот на ферме. Мы держимся ',
    aboutH2aEn: 'The Maine Coon started out as a working farm cat. We hold on ',
    aboutH2b: 'за этот характер',
    aboutH2bEn: 'to that character',
    aside: 'Мало помётов, много времени на каждого котёнка.',
    asideEn: 'Few litters, lots of time for every kitten.',
    p1: 'Не декоративная кошка и не украшение интерьера. Кот, который ходит за вами по дому, встречает у двери и спокойно относится к гостям, детям и пылесосу.',
    p1En: 'Not a decorative cat, not an interior accessory. A cat that follows you around the house, greets you at the door and stays calm around guests, kids and the vacuum cleaner.',
    p2: 'Такой характер не появляется сам. Он складывается в первые двенадцать недель и почти целиком зависит от того, что происходило с котёнком в это время.',
    p2En: 'That character does not appear on its own. It forms in the first twelve weeks and depends almost entirely on what happened to the kitten during that time.',
    p3: 'Поэтому у нас мало помётов. Каждый котёнок растёт в доме, среди людей и других животных, и уезжает уже уверенным в себе.',
    p3En: 'That is why we keep few litters. Every kitten grows up in the house, among people and other animals, and leaves already confident.',
    p4: 'Мы отвечаем на вопросы и после переезда — сколько потребуется, столько и будем на связи.',
    p4En: 'We keep answering questions after the move too — for as long as it takes.',
    catsEyebrow: 'Наши коты',
    catsEyebrowEn: 'Our cats',
    catsH2: 'Коты и кошки питомника',
    catsH2En: 'Cats of the cattery',
    quoteEyebrow: 'Как мы выбираем',
    quoteEyebrowEn: 'How we choose',
    quote: 'Размер и родословная — это половина. Вторая половина решается на руках, в первые три месяца.',
    quoteEn: 'Size and pedigree are half of it. The other half is decided in someone’s arms, in the first three months.',
    ctaEyebrow: 'Котята',
    ctaEyebrowEn: 'Kittens',
    ctaH2a: 'Познакомьтесь ',
    ctaH2aEn: 'Meet ',
    ctaH2b: 'с нашими котятами',
    ctaH2bEn: 'our kittens',
  },
  aboutContent: {
    heroTitle: 'Питомник на берегу',
    heroTitleEn: 'A cattery on the coast',
    heroLead: 'Мы живём в Новороссийске, у моря, и наши коты растут здесь же — в доме, а не в отдельном помещении для животных.',
    heroLeadEn: 'We live in Novorossiysk by the sea, and our cats grow up right here — in the house, not in a separate room for animals.',
    storyEyebrow: 'Как всё началось',
    storyEyebrowEn: 'How it started',
    storyH2a: 'Питомник основан в 2021 году, ',
    storyH2aEn: 'The cattery was founded in 2021, ',
    storyH2b: 'и всё пошло не по плану',
    storyH2bEn: 'and nothing went to plan',
    aside: 'Мы не собирались заводить питомник. Просто оказалось, что умеем.',
    asideEn: 'We never meant to start a cattery. It simply turned out we were good at it.',
    p1: 'Мейн-кун — порода рабочая. На фермах Новой Англии эти коты жили при хозяйстве, ловили мышей и были рядом с людьми постоянно. Отсюда и характер: спокойный, включённый, без пугливости.',
    p1En: 'The Maine Coon is a working breed. On New England farms these cats lived around the household, caught mice and were constantly near people. Hence the character: calm, involved, unafraid.',
    p2: 'Этот характер легко потерять. Достаточно растить котёнка в отдельной комнате, без шума и рук, и вырастет красивый, крупный, но дикий кот, которого потом всю жизнь придётся приручать заново.',
    p2En: 'That character is easy to lose. Raise a kitten in a separate room, without noise and without hands, and you get a beautiful, large, but wild cat you will be taming for the rest of its life.',
    p3: 'Мы держим мало животных, чтобы каждому хватало внимания. Котята живут в доме с первого дня, привыкают к пылесосу, гостям, детям и другим кошкам.',
    p3En: 'We keep few animals so that each gets enough attention. Kittens live in the house from day one and get used to the vacuum cleaner, guests, children and other cats.',
    p4: 'Все животные зарегистрированы в WCF и проходят ветеринарные обследования. Котята уезжают привитыми по возрасту, с ветпаспортом и документами. Доставляем в любую страну.',
    p4En: 'All our animals are registered with the WCF and undergo veterinary screening. Kittens leave vaccinated for their age, with a veterinary passport and documents. We deliver worldwide.',
    featuresEyebrow: 'Что получает покупатель',
    featuresEyebrowEn: 'What you get',
    features: [
      { _type: 'object', _key: 'f1', t: 'Документы WCF', tEn: 'WCF documents', d: 'Метрика и родословная', dEn: 'Registration and pedigree' },
      { _type: 'object', _key: 'f2', t: 'Вакцинация', tEn: 'Vaccination', d: 'По возрасту, с ветпаспортом', dEn: 'Age-appropriate, with passport' },
      { _type: 'object', _key: 'f3', t: 'Социализация', tEn: 'Socialisation', d: 'Растут с детьми и другими животными', dEn: 'Raised with children and other animals' },
      { _type: 'object', _key: 'f4', t: 'Поддержка', tEn: 'Support', d: 'Консультируем и после переезда', dEn: 'We stay in touch after the move' },
    ],
    quoteEyebrow: 'Наш принцип',
    quoteEyebrowEn: 'Our principle',
    quote: 'Котёнок уезжает тогда, когда готов он, а не тогда, когда удобно нам.',
    quoteEn: 'A kitten leaves when the kitten is ready, not when it suits us.',
  },
  catsContent: {
    heroTitle: 'Наши коты',
    heroTitleEn: 'Our cats',
    heroLead: 'Все проверены по здоровью, зарегистрированы в WCF и живут дома, а не в клетках.',
    heroLeadEn: 'All health-tested, registered with the WCF, and living at home rather than in cages.',
    docsEyebrow: 'Документы',
    docsEyebrowEn: 'Documents',
    docsH2a: 'Родословные и тесты ',
    docsH2aEn: 'Pedigrees and tests ',
    docsH2b: 'показываем по запросу',
    docsH2bEn: 'available on request',
    docsText: 'Спрашивайте что угодно: метрики, результаты обследований, фотографии родителей. Ничего скрытого у нас нет.',
    docsTextEn: 'Ask us anything: registrations, screening results, photos of the parents. We have nothing to hide.',
  },
  reviewsContent: {
    heroTitle: 'Отзывы',
    heroTitleEn: 'Reviews',
    heroLead: 'Что пишут те, к кому уехали наши котята.',
    heroLeadEn: 'What the families our kittens went to have to say.',
    ctaEyebrow: 'Ваша очередь',
    ctaEyebrowEn: 'Your turn',
    ctaH2a: 'Расскажите, как дела ',
    ctaH2aEn: 'Tell us how ',
    ctaH2b: 'у вашего кота',
    ctaH2bEn: 'your cat is doing',
  },
  kittensContent: {
    heroTitle: 'Котята',
    heroTitleEn: 'Kittens',
    heroLead: 'Уезжают не раньше трёх месяцев: привитые, с документами, приучённые к лотку и когтеточке.',
    heroLeadEn: 'They leave no earlier than three months: vaccinated, with documents, litter and scratching post trained.',
    waitEyebrow: 'Не нашли своего',
    waitEyebrowEn: 'Nothing here for you yet',
    waitH2a: 'Напишите нам ',
    waitH2aEn: 'Write to us ',
    waitH2b: 'о ближайшем помёте',
    waitH2bEn: 'about the next litter',
  },
  // Тексты меню/подвала и контакты по умолчанию (lib/dict.js -> T.*.nav,
  // lib/contacts.js -> CONTACT_DEFAULTS). Фото (background/heroCat/aboutPhoto/
  // ogImage) сюда не входят — их можно только загрузить руками в студии.
  siteSettings: {
    phone: '+7 918 050-95-09',
    whatsapp: 'https://wa.me/79180509509',
    instagram: 'https://www.instagram.com/mainecoon.nikira',
    city: 'Новороссийск',
    cityEn: 'Novorossiysk',
    foundedYear: 2021,
    registry: 'WCF',
    navHome: 'Главная',
    navHomeEn: 'Home',
    navAbout: 'Питомник',
    navAboutEn: 'Cattery',
    navKittens: 'Котята',
    navKittensEn: 'Kittens',
    navCats: 'Наши коты',
    navCatsEn: 'Our Cats',
    navReviews: 'Отзывы',
    navReviewsEn: 'Reviews',
    navContacts: 'Контакты',
    navContactsEn: 'Contact',
  },
}

const run = async () => {
  for (const [type, fields] of Object.entries(docs)) {
    await client.createIfNotExists({ _id: type, _type: type })
    const res = await client.patch(type).setIfMissing(fields).commit()
    console.log(`ok: ${type} (rev ${res._rev})`)
  }
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
