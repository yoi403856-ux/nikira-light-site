// По одному тегу кэша на каждый тип документа Sanity. Общий для чтения
// (lib/api.js, lib/content.js) и для сброса (app/api/revalidate/route.js):
// вебхук приносит `_type`, а карта превращает его в тег, который надо погасить.
export const CACHE_TAGS = {
  cat: 'sanity:cat',
  kitten: 'sanity:kitten',
  review: 'sanity:review',
  siteSettings: 'sanity:siteSettings',
  homeContent: 'sanity:homeContent',
  aboutContent: 'sanity:aboutContent',
  kittensContent: 'sanity:kittensContent',
  catsContent: 'sanity:catsContent',
  reviewsContent: 'sanity:reviewsContent',
  contactsContent: 'sanity:contactsContent',
}

export const ALL_CACHE_TAGS = Object.values(CACHE_TAGS)

/*
  Страховочный TTL поверх каждого кэшированного чтения.

  Это НЕ способ доставки правок — она остаётся мгновенной: «Опубликовать» в
  студии дёргает вебхук, вебхук гасит нужный тег. TTL закрывает два случая,
  которые вебхук закрыть не может:

  1. safeFetch и fetchDoc намеренно глотают неудачный запрос и возвращают
     пустое значение — а кэш запоминает эту пустоту как обычный результат.
     Без TTL один сбой на холодном кэше заморозил бы пустой список котов до
     следующей публикации, а это могут быть недели. С ним всё чинится за час.
  2. Вебхук, который не дошёл: сбой доставки, сменившийся секрет, перезапуск
     приложения в момент отправки.
*/
export const CACHE_TTL_SECONDS = 3600
