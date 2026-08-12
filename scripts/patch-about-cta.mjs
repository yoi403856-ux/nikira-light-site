// Разовый скрипт: заполняет новые cta-поля aboutContent и убирает старые
// heroEyebrow/heroEyebrowEn, которые студия показывала как "Unknown fields"
// после того, как их убрали из схемы.
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
const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-07-01',
  token: env.SANITY_API_TOKEN,
  useCdn: false,
})

await client
  .patch('aboutContent')
  .set({
    ctaEyebrow: 'Дальше',
    ctaEyebrowEn: 'Next',
    ctaH2a: 'Посмотрите на ',
    ctaH2aEn: 'Take a look at ',
    ctaH2b: 'наших котов',
    ctaH2bEn: 'our cats',
    ctaH2c: ' и котят',
    ctaH2cEn: ' and kittens',
  })
  .unset(['heroEyebrow', 'heroEyebrowEn'])
  .commit()

console.log('aboutContent обновлён: cta-поля заполнены, heroEyebrow убран')
