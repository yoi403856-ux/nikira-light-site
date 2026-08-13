// Контакты по умолчанию — взяты со старого сайта питомника. Работают, пока в
// студии (Настройки сайта) не заполнены свои: сайт не должен оказаться без
// телефона, если владелица ещё не дошла до этого раздела.
export const CONTACT_DEFAULTS = {
  phone: '+7 918 050-95-09',
  whatsapp: 'https://wa.me/79180509509',
  instagram: 'https://www.instagram.com/mainecoon.nikira',
  city: 'Новороссийск',
  cityEn: 'Novorossiysk',
  foundedYear: 2021,
  registry: 'WCF',
}

/*
  Собирает контакты из настроек поверх значений по умолчанию в одну форму,
  которой пользуются шапка, подвал и страница контактов. Ссылки, которых нет,
  возвращаются пустыми — вызывающий код сам решает, показывать строку или нет.
*/
export function resolveContacts(settings, locale = 'ru') {
  const phone = settings?.phone || CONTACT_DEFAULTS.phone
  const city =
    locale === 'en'
      ? settings?.cityEn || settings?.city || CONTACT_DEFAULTS.cityEn
      : settings?.city || CONTACT_DEFAULTS.city
  const digits = phone.replace(/[^\d+]/g, '')
  return {
    phone,
    tel: `tel:${digits}`,
    whatsapp: settings?.whatsapp || CONTACT_DEFAULTS.whatsapp,
    instagram: settings?.instagram || CONTACT_DEFAULTS.instagram,
    facebook: settings?.facebook || '',
    // Явная ссылка в студии всегда в приоритете (у Telegram-аккаунта может
    // быть публичный @username вместо номера) — по номеру собираем только
    // как запасной вариант, чтобы кнопка не пропадала, пока её не заполнили.
    telegram: settings?.telegram || `https://t.me/${digits}`,
    vk: settings?.vk || '',
    email: settings?.email || '',
    city,
    foundedYear: settings?.foundedYear || CONTACT_DEFAULTS.foundedYear,
    registry: settings?.registry || CONTACT_DEFAULTS.registry,
  }
}
