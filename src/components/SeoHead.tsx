import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  absoluteUrl,
  buildStructuredData,
  defaultSeo,
  getSiteUrl,
  seoForPath,
} from '../lib/seo'
import { site } from '../data/site'

const STRUCTURED_DATA_ID = 'kubwabo-structured-data'

function upsertMeta(
  attribute: 'name' | 'property',
  key: string,
  content: string,
) {
  if (!content) return
  const selector = `meta[${attribute}="${key}"]`
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attribute, key)
    document.head.appendChild(el)
  }
  el.content = content
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.rel = rel
    document.head.appendChild(el)
  }
  el.href = href
}

export function SeoHead() {
  const { pathname } = useLocation()

  useEffect(() => {
    const page = seoForPath(pathname)
    const canonicalPath = pathname === '/' ? '/' : pathname.replace(/\/$/, '') || '/'
    const pageUrl = absoluteUrl(canonicalPath)
    const imageUrl = absoluteUrl(defaultSeo.imagePath)
    const robots = page.noIndex
      ? 'noindex, nofollow'
      : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'

    document.title = page.title
    document.documentElement.lang = 'en'

    upsertMeta('name', 'description', page.description)
    upsertMeta('name', 'robots', robots)
    upsertMeta('name', 'author', site.name)
    upsertMeta('name', 'application-name', site.name)

    const googleVerification = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION?.trim()
    if (googleVerification) {
      upsertMeta('name', 'google-site-verification', googleVerification)
    }

    upsertLink('canonical', pageUrl)
    upsertLink('sitemap', `${getSiteUrl()}/sitemap.xml`)

    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:site_name', site.name)
    upsertMeta('property', 'og:title', page.title)
    upsertMeta('property', 'og:description', page.description)
    upsertMeta('property', 'og:url', pageUrl)
    upsertMeta('property', 'og:image', imageUrl)
    upsertMeta('property', 'og:image:alt', defaultSeo.imageAlt)
    upsertMeta('property', 'og:locale', 'en_RW')

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', page.title)
    upsertMeta('name', 'twitter:description', page.description)
    upsertMeta('name', 'twitter:image', imageUrl)

    const jsonLd = buildStructuredData(canonicalPath, page)
    let script = document.getElementById(STRUCTURED_DATA_ID) as HTMLScriptElement | null
    if (!script) {
      script = document.createElement('script')
      script.id = STRUCTURED_DATA_ID
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify(jsonLd)
  }, [pathname])

  return null
}