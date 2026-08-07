// The canonical site origin, used for metadataBase, sitemap.xml, and robots.txt.
// Set NEXT_PUBLIC_SITE_URL once the real domain is live; falls back to the
// current Vercel deployment URL so things still work before then.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
