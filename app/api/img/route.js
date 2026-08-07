// Streams Sanity CDN images through our own domain instead of the browser
// connecting to cdn.sanity.io directly. Some Russian ISPs intermittently
// block/reset connections to Western CDNs by SNI — proxying keeps every
// request same-origin. Bytes are passed through as-is (no re-encoding), so
// this doesn't reintroduce the double-compression slowdown.
export const dynamic = 'force-dynamic'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const target = searchParams.get('u')
  if (!target) return new Response('Missing url', { status: 400 })

  let url
  try {
    url = new URL(target)
  } catch {
    return new Response('Invalid url', { status: 400 })
  }
  if (url.hostname !== 'cdn.sanity.io') {
    return new Response('Forbidden host', { status: 403 })
  }

  const upstream = await fetch(url.toString())
  if (!upstream.ok || !upstream.body) {
    return new Response('Upstream error', { status: 502 })
  }

  const headers = new Headers()
  headers.set('Content-Type', upstream.headers.get('content-type') || 'image/jpeg')
  headers.set('Cache-Control', 'public, max-age=31536000, immutable')

  return new Response(upstream.body, { status: 200, headers })
}
