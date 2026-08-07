import imageUrlBuilder from '@sanity/image-url'
import { client } from './client'

const builder = client ? imageUrlBuilder(client) : null

// routes the image through our own domain (see app/api/img/route.js) instead
// of handing the browser a direct cdn.sanity.io URL — some Russian ISPs
// intermittently block/reset connections to that CDN
function proxied(url) {
  return url ? `/api/img?u=${encodeURIComponent(url)}` : null
}

// returns a plain URL string for a Sanity image source, or null
export function urlForImage(source, width) {
  if (!builder || !source) return null
  let img = builder.image(source).auto('format').fit('max')
  if (width) img = img.width(width)
  return proxied(img.url())
}

// cropped to an exact aspect using the editor's crop + hotspot from the panel
export function urlForImageCrop(source, w, h) {
  if (!builder || !source) return null
  return proxied(builder.image(source).width(w).height(h).fit('crop').auto('format').url())
}
