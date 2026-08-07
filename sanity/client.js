import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, isSanityConfigured } from './env'

// only build a client when a project id exists; otherwise the site
// falls back to sample data (see lib/api.js)
// useCdn: false — always hit the live Sanity API instead of the CDN's
// ~30-60s edge cache, so edits made in Studio (photos, image order, text)
// show up on the next request instead of lagging behind.
export const client = isSanityConfigured
  ? createClient({ projectId, dataset, apiVersion, useCdn: false })
  : null
