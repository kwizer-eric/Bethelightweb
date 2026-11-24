import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const base = (process.env.VITE_SITE_URL || 'https://kubwabofoundation.org').replace(
  /\/$/,
  '',
)

const paths = [
  '/',
  '/about',
  '/mission',
  '/donate',
  '/news',
  '/programs/every-kid-deserves-it',
  '/programs/for-the-parents',
]

const today = new Date().toISOString().slice(0, 10)

const body = paths
  .map(
    (path) => `  <url>
    <loc>${base}${path === '/' ? '/' : path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${path === '/' ? '1.0' : '0.8'}</priority>
  </url>`,
  )
  .join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`

writeFileSync(join(root, 'public', 'sitemap.xml'), xml, 'utf8')

const robots = `User-agent: *
Allow: /
Disallow: /dashboard
Disallow: /login

Sitemap: ${base}/sitemap.xml
`
writeFileSync(join(root, 'public', 'robots.txt'), robots, 'utf8')

console.log(`Wrote sitemap.xml and robots.txt for ${base} (${paths.length} URLs)`)