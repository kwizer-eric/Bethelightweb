import { aboutSummary, searchPriorityLinks, site } from '../data/site'

const DEFAULT_SITE_URL = 'https://kubwabofoundation.org'

/** Canonical origin (no trailing slash). Set VITE_SITE_URL at build time for production. */
export function getSiteUrl(): string {
  const fromEnv = import.meta.env.VITE_SITE_URL?.trim()
  const base = fromEnv || DEFAULT_SITE_URL
  return base.replace(/\/$/, '')
}

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${getSiteUrl()}${normalized}`
}

export const defaultSeo = {
  title: 'Kubwabo Foundation | Donate & Support Children and Families in Rwanda',
  description:
    'Kubwabo means "For Them." Youth-led NGO in Musanze, Rwanda — donate, sponsor education, and walk with families toward stability through Every Child Deserves It and For Their Family.',
  imagePath: '/images/_DSC8048.jpg',
  imageAlt: 'Children and families supported by Kubwabo Foundation in Rwanda',
} as const

export type PageSeo = {
  title: string
  description: string
  noIndex?: boolean
}

const exactPageSeo: Record<string, PageSeo> = {
  '/': {
    title: defaultSeo.title,
    description: defaultSeo.description,
  },
  '/about': {
    title: 'About Us | Kubwabo Foundation — Mission, Team & Story',
    description: aboutSummary,
  },
  '/mission': {
    title: 'Our Mission | Kubwabo Foundation — Hope & Opportunity in Rwanda',
    description:
      'Read how Kubwabo Foundation partners with communities to protect children, strengthen families, and deliver practical aid with dignity.',
  },
  '/donate': {
    title: 'Donate | Kubwabo Foundation — Support Children & Families in Rwanda',
    description:
      'Give to Every Child Deserves It and For Their Family. Your donation helps education, mentorship, and household stability in Musanze and partner communities.',
  },
  '/donate/thank-you': {
    title: 'Thank You | Kubwabo Foundation',
    description: 'Thank you for supporting Kubwabo Foundation.',
    noIndex: true,
  },
  '/news': {
    title: 'Impact Stories | Kubwabo Foundation News & Updates',
    description:
      'Stories from the field: education, family support, and community partnership from Kubwabo Foundation in Rwanda.',
  },
  '/programs/every-kid-deserves-it': {
    title: 'Every Child Deserves It | Kubwabo Foundation Programs',
    description:
      'School support, mentorship, and encouragement so vulnerable children stay in school and grow with confidence.',
  },
  '/programs/for-the-parents': {
    title: 'For Their Family | Kubwabo Foundation — Parent & Caregiver Support',
    description:
      'Livelihood support, mentorship, and practical aid so families in Rwanda build stability and children thrive.',
  },
}

export function seoForPath(pathname: string): PageSeo {
  if (pathname.startsWith('/dashboard') || pathname === '/login') {
    return {
      title: 'Kubwabo Foundation',
      description: defaultSeo.description,
      noIndex: true,
    }
  }

  if (pathname.startsWith('/news/')) {
    return {
      title: 'Story | Kubwabo Foundation Impact Stories',
      description: defaultSeo.description,
    }
  }

  if (pathname.startsWith('/programs/every-kid-deserves-it/children/')) {
    return {
      title: 'Sponsor a Child | Kubwabo Foundation',
      description:
        'Learn about a child in our Every Child Deserves It program and how sponsorship supports their education and future.',
    }
  }

  return exactPageSeo[pathname] ?? {
    title: defaultSeo.title,
    description: defaultSeo.description,
  }
}

function organizationNode(siteUrl: string) {
  return {
    '@type': 'NGO',
    '@id': `${siteUrl}/#organization`,
    name: site.name,
    alternateName: ['Kubwabo', 'Kubwabo Foundation Rwanda'],
    legalName: site.name,
    url: siteUrl,
    slogan: site.tagline,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl('/logo.svg'),
      contentUrl: absoluteUrl('/logo.svg'),
    },
    image: [absoluteUrl('/logo.svg'), absoluteUrl(defaultSeo.imagePath)],
    description: aboutSummary,
    email: site.email,
    telephone: site.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Musanze',
      addressRegion: 'Northern Province',
      addressCountry: 'RW',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Rwanda',
    },
    knowsAbout: [
      'Child education',
      'Youth development',
      'Family support',
      'Community development',
      'Nonprofit fundraising',
      'Musanze Rwanda',
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: site.email,
        telephone: site.phone,
        areaServed: 'RW',
        availableLanguage: ['English', 'Kinyarwanda'],
      },
    ],
    sameAs: [site.social.instagram, site.social.tiktok, site.social.linkedin],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Kubwabo Foundation programs',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Every Child Deserves It',
            description:
              'Education, mentorship, and school support for vulnerable children in Rwanda.',
            url: absoluteUrl('/programs/every-kid-deserves-it'),
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'For Their Family',
            description: 'Livelihood and stability support for parents and caregivers.',
            url: absoluteUrl('/programs/for-the-parents'),
          },
        },
      ],
    },
  }
}

function priorityPagesItemList(siteUrl: string) {
  return {
    '@type': 'ItemList',
    '@id': `${siteUrl}/#priority-pages`,
    name: `${site.name} — key pages`,
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: searchPriorityLinks.length,
    itemListElement: searchPriorityLinks.map((link, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: link.label,
      description: link.description,
      url: absoluteUrl(link.href),
    })),
  }
}

function siteNavigationElements(siteUrl: string) {
  return searchPriorityLinks.map((link) => ({
    '@type': 'SiteNavigationElement',
    '@id': `${absoluteUrl(link.href)}#navigation`,
    name: link.label,
    description: link.description,
    url: absoluteUrl(link.href),
    isPartOf: { '@id': `${siteUrl}/#website` },
  }))
}

function breadcrumbForPath(pathname: string, pageTitle: string) {
  const crumbs: { name: string; path: string }[] = [{ name: 'Home', path: '/' }]
  if (pathname === '/' || pathname === '') return null

  const segments = pathname.split('/').filter(Boolean)
  let acc = ''
  for (const segment of segments) {
    acc += `/${segment}`
    const known = exactPageSeo[acc]
    if (known) {
      crumbs.push({ name: known.title.split('|')[0]?.trim() || segment, path: acc })
    }
  }

  if (crumbs.length < 2) {
    crumbs.push({ name: pageTitle.split('|')[0]?.trim() || pageTitle, path: pathname })
  }

  const siteUrl = getSiteUrl()
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
    '@id': `${siteUrl}${pathname}#breadcrumb`,
  }
}

/** Schema.org JSON-LD for rich results and Search Console entity understanding. */
export function buildStructuredData(pathname: string, page: PageSeo) {
  const siteUrl = getSiteUrl()
  const canonicalPath = pathname === '/' ? '/' : pathname
  const pageUrl = absoluteUrl(canonicalPath)
  const isHome = canonicalPath === '/'

  const graph: Record<string, unknown>[] = [
    organizationNode(siteUrl),
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: site.name,
      alternateName: 'Kubwabo',
      description: defaultSeo.description,
      inLanguage: 'en',
      publisher: { '@id': `${siteUrl}/#organization` },
      ...(isHome ? { hasPart: { '@id': `${siteUrl}/#priority-pages` } } : {}),
    },
    {
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: page.title,
      description: page.description,
      isPartOf: { '@id': `${siteUrl}/#website` },
      about: { '@id': `${siteUrl}/#organization` },
      inLanguage: 'en',
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: absoluteUrl(defaultSeo.imagePath),
      },
    },
  ]

  if (isHome) {
    graph.push(priorityPagesItemList(siteUrl), ...siteNavigationElements(siteUrl))
  }

  if (canonicalPath === '/donate') {
    graph.push({
      '@type': 'DonateAction',
      '@id': `${pageUrl}#donate-action`,
      name: 'Donate to Kubwabo Foundation',
      description:
        'Support children in school and families building stability through Kubwabo Foundation programs.',
      target: pageUrl,
      recipient: { '@id': `${siteUrl}/#organization` },
    })
  }

  const breadcrumb = breadcrumbForPath(canonicalPath, page.title)
  if (breadcrumb) graph.push(breadcrumb)

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  }
}

/** Paths included in sitemap.xml (keep in sync with scripts/generate-sitemap.mjs). */
export const sitemapPaths = [
  '/',
  '/about',
  '/mission',
  '/donate',
  '/news',
  '/programs/every-kid-deserves-it',
  '/programs/for-the-parents',
] as const