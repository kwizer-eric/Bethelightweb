/**
 * Static section images.
 *
 * Drop files into `public/images/` using the filenames below, then set
 * `USE_LOCAL_IMAGES` to `true` to switch the whole site off Unsplash.
 *
 * Or flip individual keys by editing the `local` map usage per entry.
 */

const local = {
  /** Home — full-bleed hero */
  homeHero: '/images/home-hero.jpg',
  /** Home — Our Story panel */
  homeOurStory: '/images/_DSC8026.avif',
  /** Home — Volunteer CTA card */
  homeVolunteer: '/images/_DSC8416.avif',
  /** Home — Support / donate CTA card */
  homeSupport: '/images/_DSC8061.avif',
  /** About — parallax foundation image */
  aboutFoundation: '/images/IMG_3313.avif',
  /** About — secondary story / community image */
  aboutCommunity: '/images/_DSC6155.avif',
  /** Every Kid — program hero */
  everyKidHero: '/images/_DSC8421.avif',
  /** For Their Family — program hero */
  forTheirFamilyHero: '/images/_DSC8437.avif',
} as const

const remote: Record<keyof typeof local, string> = {
  homeHero:
    'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1920&q=85',
  homeOurStory:
    'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1920&q=85',
  homeVolunteer:
    'https://images.unsplash.com/flagged/photo-1555251255-e9a095d6eb9d?auto=format&fit=crop&w=1400&q=85',
  homeSupport:
    'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1400&q=85',
  aboutFoundation:
    'https://images.unsplash.com/photo-1694286080811-e5e416f4fdb1?auto=format&fit=crop&w=2000&q=85',
  aboutCommunity:
    'https://images.unsplash.com/flagged/photo-1555251255-e9a095d6eb9d?auto=format&fit=crop&w=1400&q=85',
  everyKidHero:
    'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1920&q=85',
  forTheirFamilyHero:
    'https://images.unsplash.com/photo-1609220136736-443140cffec6?auto=format&fit=crop&w=1920&q=85',
}

/** Prefer local when the path points at a real dropped file under /images/ */
const LOCAL_READY: Partial<Record<keyof typeof local, true>> = {
  homeOurStory: true,
  homeVolunteer: true,
  homeSupport: true,
  aboutFoundation: true,
  aboutCommunity: true,
  everyKidHero: true,
  forTheirFamilyHero: true,
}

export const siteImages = (
  Object.keys(local) as Array<keyof typeof local>
).reduce(
  (acc, key) => {
    acc[key] = LOCAL_READY[key] ? local[key] : remote[key]
    return acc
  },
  {} as Record<keyof typeof local, string>,
)

/** Local paths only — useful when swapping one image at a time */
export const localSiteImages = local
