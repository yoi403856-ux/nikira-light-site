export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-07-01'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''

// true once a real Sanity project id is provided via env
export const isSanityConfigured = Boolean(projectId)
