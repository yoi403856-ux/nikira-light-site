import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity.config'
import { isSanityConfigured } from '@/sanity/env'

export const dynamic = 'force-static'

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#191B1E',
          color: '#E6E8E8',
          fontFamily: 'system-ui, sans-serif',
          textAlign: 'center',
          padding: '2rem',
        }}
      >
        <div style={{ maxWidth: 460 }}>
          <h1 style={{ fontSize: 22, marginBottom: 12 }}>Админка Summer Cherry</h1>
          <p style={{ opacity: 0.75, lineHeight: 1.6 }}>
            Панель управления появится здесь после подключения Sanity —
            добавьте <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> в переменные
            окружения и перезапустите сайт.
          </p>
        </div>
      </div>
    )
  }
  return <NextStudio config={config} />
}
