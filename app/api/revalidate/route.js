import { revalidateTag } from 'next/cache'
import { CACHE_TAGS, ALL_CACHE_TAGS } from '@/lib/cacheTags'

// Sanity's webhook must reach a live route, not a statically-built response.
export const dynamic = 'force-dynamic'

/*
  Called by a Sanity webhook on document publish. Verifies a shared secret
  (query param `?secret=` or an `x-webhook-secret` header — either works, so
  the URL can just be pasted into Sanity's webhook config with the secret
  baked into the query string), then busts the cache tag(s) for whichever
  document type was published.

  Deliberately never surfaces a 500: an unknown/missing `_type`, a malformed
  body, or a `revalidateTag` throw should all just fall back to revalidating
  every tag rather than bouncing the webhook (Sanity retries on failure —
  better to over-invalidate than to spam retries or drop the update).
*/
export async function POST(request) {
  const url = new URL(request.url)
  const secret = request.headers.get('x-webhook-secret') || url.searchParams.get('secret')

  if (!process.env.SANITY_REVALIDATE_SECRET || secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return new Response('Unauthorized', { status: 401 })
  }

  let type = null
  try {
    const body = await request.json()
    type = body?._type || null
  } catch {
    type = null
  }

  const tag = type ? CACHE_TAGS[type] : null

  try {
    if (tag) {
      revalidateTag(tag)
    } else {
      for (const t of ALL_CACHE_TAGS) revalidateTag(t)
    }
  } catch {
    // best-effort — an error here must not turn into a 500 for Sanity's webhook
  }

  return Response.json({ revalidated: true, tag: tag || 'all' })
}
