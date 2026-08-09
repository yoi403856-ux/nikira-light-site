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
  aboutContent: {
    heroEyebrow: '01',
    heroEyebrowEn: '01',
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
    heroEyebrow: '03',
    heroEyebrowEn: '03',
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
    heroEyebrow: '04',
    heroEyebrowEn: '04',
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
    heroEyebrow: '02',
    heroEyebrowEn: '02',
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
