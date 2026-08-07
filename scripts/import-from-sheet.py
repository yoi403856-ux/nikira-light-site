# -*- coding: utf-8 -*-
"""
Разовый перенос содержимого со старого сайта питомника (Google-таблица) в
Sanity. Запускается вручную, повторный запуск безопасен: у документов
детерминированные id, поэтому вместо дублей они перезаписываются.

Токен передаётся переменной окружения SANITY_WRITE_TOKEN и намеренно нигде
не сохраняется.
"""
import csv, io, json, os, re, sys, time, urllib.parse, urllib.request

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

PROJECT = 'vioryczv'
DATASET = 'production'
API = '2024-07-01'
TOKEN = os.environ.get('SANITY_WRITE_TOKEN')
DATA = os.path.join(os.path.dirname(__file__), '..', '..', 'nikira-data')
MOCK = os.path.join(os.path.dirname(__file__), '..', '..', 'мамин', 'assets')

if not TOKEN:
    sys.exit('нет SANITY_WRITE_TOKEN')

UA = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0 Safari/537.36'}

# ── транслитерация для адресов страниц ────────────────────────────────────
RU = {'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'e','ж':'zh','з':'z','и':'i','й':'y',
      'к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r','с':'s','т':'t','у':'u','ф':'f',
      'х':'h','ц':'c','ч':'ch','ш':'sh','щ':'sch','ъ':'','ы':'y','ь':'','э':'e','ю':'yu','я':'ya'}

def slugify(s):
    s = (s or '').lower().replace('’', '').replace("'", '')
    s = ''.join(RU.get(ch, ch) for ch in s)
    s = re.sub(r'[^a-z0-9]+', '-', s).strip('-')
    return s[:60]

# ── расшифровка EMS-кодов окраса ──────────────────────────────────────────
# Коды в документах пишут сокращённо, покупателю они ничего не говорят.
# Раскладываем в слова, но это машинный перевод — владелице стоит проверить.
BASE = {'n': 'чёрный', 'a': 'голубой', 'd': 'красный', 'e': 'кремовый',
        'f': 'чёрный черепаховый', 'g': 'голубой черепаховый', 'w': 'белый'}
BASE_EN = {'n': 'black', 'a': 'blue', 'd': 'red', 'e': 'cream',
           'f': 'black tortie', 'g': 'blue tortie', 'w': 'white'}
PATTERN = {'22': 'мраморный', '23': 'тигровый', '24': 'пятнистый', '21': 'полосатый'}
PATTERN_EN = {'22': 'blotched tabby', '23': 'mackerel tabby', '24': 'spotted tabby', '21': 'agouti'}
WHITE = {'01': 'ван', '02': 'арлекин', '03': 'биколор', '09': 'с белыми пятнами'}
WHITE_EN = {'01': 'van', '02': 'harlequin', '03': 'bicolour', '09': 'with white'}

def decode_ems(code):
    if not code:
        return '', ''
    parts = re.findall(r'[a-z]+|\d+', code.lower())
    ru, en = [], []
    for p in parts:
        if p.isdigit():
            if p in PATTERN: ru.append(PATTERN[p]); en.append(PATTERN_EN[p])
            elif p in WHITE: ru.append(WHITE[p]); en.append(WHITE_EN[p])
        else:
            letter, rest = p[0], p[1:]
            if letter in BASE:
                word, word_en = BASE[letter], BASE_EN[letter]
                if 's' in rest:
                    word += ' дымчатый'; word_en += ' smoke'
                ru.insert(0, word); en.insert(0, word_en)
    return ' '.join(ru), ' '.join(en)

# ── работа с Sanity ───────────────────────────────────────────────────────
def mutate(mutations):
    url = f'https://{PROJECT}.api.sanity.io/v{API}/data/mutate/{DATASET}?returnIds=true'
    body = json.dumps({'mutations': mutations}).encode()
    req = urllib.request.Request(url, data=body, method='POST', headers={
        'Authorization': f'Bearer {TOKEN}', 'Content-Type': 'application/json', **UA})
    return json.loads(urllib.request.urlopen(req, timeout=60).read().decode())

_asset_cache = {}

def upload_image(raw, filename):
    """Заливает картинку и возвращает id ассета. Повторные вызовы с тем же
    содержимым не плодят копии — Sanity сам склеивает одинаковые файлы."""
    key = (len(raw), filename)
    if key in _asset_cache:
        return _asset_cache[key]
    url = (f'https://{PROJECT}.api.sanity.io/v{API}/assets/images/{DATASET}'
           f'?filename={urllib.parse.quote(filename)}')
    req = urllib.request.Request(url, data=raw, method='POST', headers={
        'Authorization': f'Bearer {TOKEN}', 'Content-Type': 'application/octet-stream', **UA})
    res = json.loads(urllib.request.urlopen(req, timeout=120).read().decode())
    aid = res['document']['_id']
    _asset_cache[key] = aid
    return aid

def drive_id(url):
    m = re.search(r'/d/([A-Za-z0-9_-]{20,})', url or '')
    return m.group(1) if m else None

def fetch_drive(url):
    """Google отдаёт файлы Drive по нескольким адресам, и какой сработает —
    зависит от настроек доступа. Пробуем по очереди, молча пропускаем то,
    что не отдалось: один недоступный снимок не должен ронять весь перенос."""
    fid = drive_id(url)
    candidates = [f'https://lh3.googleusercontent.com/d/{fid}=s2000',
                  f'https://lh3.googleusercontent.com/d/{fid}',
                  f'https://drive.google.com/uc?export=download&id={fid}'] if fid else [url]
    for c in candidates:
        try:
            r = urllib.request.urlopen(urllib.request.Request(c, headers=UA), timeout=60)
            raw = r.read()
            if len(raw) > 8000 and raw[:2] in (b'\xff\xd8', b'\x89P', b'RI', b'GI'):
                return raw
        except Exception:
            continue
    return None

def image_field(asset_id):
    return {'_type': 'image', 'asset': {'_type': 'reference', '_ref': asset_id}}

def read_csv(name):
    path = os.path.join(DATA, name)
    with io.open(path, encoding='utf-8') as fh:
        return list(csv.DictReader(fh))

# ── перенос котов и кошек ─────────────────────────────────────────────────
def import_cats():
    docs, order = [], 0
    for fname, sex in (('toms.csv', 'male'), ('cats.csv', 'female')):
        for row in read_csv(fname):
            name = (row.get('Имя') or '').strip()
            if not name:
                continue
            order += 1
            ems = (row.get('Окрас') or '').strip()
            ru, en = decode_ems(ems)
            images = []
            for url in [u.strip() for u in (row.get('Фото') or '').split(',') if u.strip()]:
                raw = fetch_drive(url)
                if raw:
                    images.append(image_field(upload_image(raw, f'{slugify(name)}-{len(images)+1}.jpg')))
                    print(f'    фото {len(images)} — ок')
                else:
                    print('    фото пропущено, Google не отдал файл')
            doc = {
                '_id': f'cat-{slugify(name)}',
                '_type': 'cat',
                'name': name,
                'slug': {'_type': 'slug', 'current': slugify(name)},
                'sex': sex,
                'ems': ems,
                'color': ru,
                'colorEn': en,
                'polydactyl': 'полидакт' in (row.get('Особенности') or '').lower(),
                'titles': (row.get('Титулы') or '').strip() or None,
                'images': images,
                'order': order,
            }
            docs.append({'createOrReplace': {k: v for k, v in doc.items() if v is not None}})
            print(f'  {name} — {sex}, {ems} → {ru}')
    return docs

# ── перенос отзывов ───────────────────────────────────────────────────────
def import_reviews():
    docs = []
    for i, row in enumerate(read_csv('reviews.csv'), 1):
        url = (row.get('Ссылка ') or row.get('Ссылка') or '').strip()
        kind_ru = (row.get('Тип') or '').strip().lower()
        if not url:
            continue
        if kind_ru == 'видео':
            docs.append({'createOrReplace': {
                '_id': f'review-{i}', '_type': 'review', 'kind': 'video', 'video': url, 'order': i}})
            print(f'  отзыв {i} — видео')
            continue
        raw = fetch_drive(url)
        if not raw:
            print(f'  отзыв {i} — пропущен, Google не отдал файл')
            continue
        docs.append({'createOrReplace': {
            '_id': f'review-{i}', '_type': 'review', 'kind': 'shot',
            'image': image_field(upload_image(raw, f'review-{i}.jpg')), 'order': i}})
        print(f'  отзыв {i} — скриншот загружен')
    return docs

# ── настройки сайта ───────────────────────────────────────────────────────
def import_settings():
    sheet = {r['Ключ'].strip(): r['Значение'].strip() for r in read_csv('settings.csv') if r.get('Ключ')}
    fields = {
        '_id': 'siteSettings',
        '_type': 'siteSettings',
        'phone': '+7 918 050-95-09',
        'whatsapp': 'https://wa.me/79180509509',
        'instagram': 'https://www.instagram.com/mainecoon.nikira',
        'city': 'Новороссийск',
        'cityEn': 'Novorossiysk',
        'foundedYear': 2021,
        'registry': 'WCF',
        'delivery': 'Доставка по всему миру',
        'deliveryEn': 'Worldwide delivery',
    }

    # фон и вырезанный кот — из макета, они уже подобраны и обработаны
    for field, path in (('background', 'pines3.jpg'), ('heroCat', 'mama_dark.png')):
        full = os.path.join(MOCK, path)
        if os.path.exists(full):
            with open(full, 'rb') as fh:
                fields[field] = image_field(upload_image(fh.read(), path))
            print(f'  {field} — {path} загружен')

    about = sheet.get('Фото о нас')
    if about:
        raw = fetch_drive(about)
        if raw:
            fields['aboutPhoto'] = image_field(upload_image(raw, 'about.jpg'))
            print('  aboutPhoto — загружен')

    return [{'createOrReplace': fields}]

if __name__ == '__main__':
    print('коты и кошки:')
    cats = import_cats()
    print('отзывы:')
    reviews = import_reviews()
    print('настройки:')
    settings = import_settings()

    all_docs = cats + reviews + settings
    print(f'\nотправляю {len(all_docs)} документов...')
    # порциями, чтобы не упереться в размер запроса
    for i in range(0, len(all_docs), 10):
        res = mutate(all_docs[i:i + 10])
        print('  записано:', len(res.get('results', [])))
        time.sleep(0.4)
    print('готово')
