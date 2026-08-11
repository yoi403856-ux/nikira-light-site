// Разовый скрипт: загружает вырезанное фото кота как asset в Sanity и
// прописывает его в siteSettings.heroCat. Запускать один раз, потом можно
// удалить (тот же приём, что и seed-content.mjs).
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

const filePath = process.argv[2]
if (!filePath) {
  console.error('Использование: node scripts/set-hero-cat.mjs <путь-к-png>')
  process.exit(1)
}

const asset = await client.assets.upload('image', fs.createReadStream(filePath), {
  filename: path.basename(filePath),
})

await client.createIfNotExists({ _id: 'siteSettings', _type: 'siteSettings' })
await client
  .patch('siteSettings')
  .set({ heroCat: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } } })
  .commit()

console.log('heroCat обновлён, asset _id:', asset._id)
