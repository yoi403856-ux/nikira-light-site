// Разовый скрипт: загружает несколько вырезанных фото котов как assets в
// Sanity и прописывает их в siteSettings.heroCats (массив, до 3 штук).
// Тот же приём, что и set-hero-cat.mjs, но для нескольких файлов сразу.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { randomUUID } from 'node:crypto'
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

const filePaths = process.argv.slice(2)
if (!filePaths.length) {
  console.error('Использование: node scripts/set-hero-cats.mjs <путь1.png> <путь2.png> ...')
  process.exit(1)
}

const heroCats = []
for (const filePath of filePaths) {
  const asset = await client.assets.upload('image', fs.createReadStream(filePath), {
    filename: path.basename(filePath),
  })
  heroCats.push({ _type: 'image', _key: randomUUID(), asset: { _type: 'reference', _ref: asset._id } })
  console.log(filePath, '-> asset', asset._id)
}

await client.createIfNotExists({ _id: 'siteSettings', _type: 'siteSettings' })
await client.patch('siteSettings').set({ heroCats }).unset(['heroCat']).commit()

console.log('heroCats обновлён,', heroCats.length, 'фото')
