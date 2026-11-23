import type { ImpactStoryCardProps } from '../components/ui/ImpactStoryCard'
import { siteImages } from '../assets/siteImages'

/** Design-reference cards for previewing the impact story layout on /news */
/** Fallback cards when CMS has no stories yet — hrefs match seeded story slugs. */
export const impactStoryMockCards: ImpactStoryCardProps[] = [
  {
    badge: '+500 BOOKS DISTRIBUTED',
    title: 'A Classroom Restored',
    description:
      'After months without access to education, children returned to learning through a safe.',
    image: siteImages.aboutCommunity,
    href: '/news/back-to-school-back-to-hope',
  },
  {
    badge: '350 CHILDREN PROTECTED',
    title: 'Finding Safety Again',
    description:
      'Protection programs helped displaced children reconnect with support networks and regain.',
    image: siteImages.homeOurStory,
    href: '/news/a-meal-that-changed-everything',
  },
  {
    badge: '6,800 CHILDREN PROTECTED',
    title: 'Safe Spaces Restored',
    description:
      'Child-friendly spaces provided safety, support, and stability for vulnerable children.',
    image: siteImages.everyKidHero,
    href: '/news/mobile-clinic-reaches-remote-village',
  },
]