/**
 * Static section images.
 *
 * Drop files into `public/images/` using the filenames below, then set
 * `USE_LOCAL_IMAGES` to `true` to switch the whole site off Unsplash.
 *
 * Or flip individual keys by editing the `local` map usage per entry.
 */

const local = {
  /** Home, full-bleed hero */
  homeHero: '/images/home-hero.jpg',
  /** Home, Our Story panel */
  homeOurStory: '/images/_DSC8026.avif',
  /** Home, Volunteer CTA card */
  homeVolunteer: '/images/_DSC8416.avif',
  /** Home, Support / donate CTA card */
  homeSupport: '/images/_DSC8061.avif',
  /** About, parallax foundation image */
  aboutFoundation: '/images/IMG_3313.avif',
  /** About, secondary story / community image */
  aboutCommunity:
    'https://res.cloudinary.com/efzpryhb/image/upload/v1795222430/_DSC8052_tqinaa.avif',
  /** About, Mission / Vision middle column */
  aboutMission:
    'https://res.cloudinary.com/efzpryhb/image/upload/v1795222408/_DSC8398_converted_vmnkwf.avif',
  /** About, mission pathways photo */
  aboutPathways:
    'https://res.cloudinary.com/efzpryhb/image/upload/v1795222412/_DSC8413_converted_k9f7nc.avif',
  /** About, donate CTA band */
  aboutDonateCta:
    'https://res.cloudinary.com/efzpryhb/image/upload/v1795311264/_DSC8022_Edited_Edited_ru40ue.jpg',
  /** Every Kid, program hero */
  everyKidHero: '/images/_DSC8421.avif',
  /** Home, Every Child Deserves It featured program card */
  everyKidProgram: '/images/_DSC8396.jpg',
  /** Every Kid, mid-page story band */
  everyKidStory:
    'https://res.cloudinary.com/efzpryhb/image/upload/v1795222431/_DSC8061_qsfdws.avif',
  /** For Their Family, program hero */
  forTheirFamilyHero: '/images/_DSC8437.avif',
  /** Home, For Their Family featured program card */
  forTheirFamilyProgram: '/images/_DSC8033.jpg',
  /** For Their Family, mid-page story band */
  forTheirFamilyStory:
    'https://res.cloudinary.com/efzpryhb/image/upload/v1795222428/IMG_E3142_c6kjot.avif',
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
    'https://res.cloudinary.com/efzpryhb/image/upload/v1795222430/_DSC8052_tqinaa.avif',
  aboutMission:
    'https://res.cloudinary.com/efzpryhb/image/upload/v1795222408/_DSC8398_converted_vmnkwf.avif',
  aboutPathways:
    'https://res.cloudinary.com/efzpryhb/image/upload/v1795222412/_DSC8413_converted_k9f7nc.avif',
  aboutDonateCta:
    'https://res.cloudinary.com/efzpryhb/image/upload/v1795311264/_DSC8022_Edited_Edited_ru40ue.jpg',
  everyKidHero:
    'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1920&q=85',
  everyKidProgram:
    'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1400&q=85',
  everyKidStory:
    'https://res.cloudinary.com/efzpryhb/image/upload/v1795222431/_DSC8061_qsfdws.avif',
  forTheirFamilyHero:
    'https://images.unsplash.com/photo-1609220136736-443140cffec6?auto=format&fit=crop&w=1920&q=85',
  forTheirFamilyProgram:
    'https://images.unsplash.com/photo-1609220136736-443140cffec6?auto=format&fit=crop&w=1400&q=85',
  forTheirFamilyStory:
    'https://res.cloudinary.com/efzpryhb/image/upload/v1795222428/IMG_E3142_c6kjot.avif',
}

/** Prefer local when the path points at a real dropped file under /images/ */
const LOCAL_READY: Partial<Record<keyof typeof local, true>> = {
  homeOurStory: true,
  homeVolunteer: true,
  homeSupport: true,
  aboutFoundation: true,
  aboutCommunity: true,
  aboutMission: true,
  aboutPathways: true,
  aboutDonateCta: true,
  everyKidHero: true,
  everyKidProgram: true,
  everyKidStory: true,
  forTheirFamilyHero: true,
  forTheirFamilyProgram: true,
  forTheirFamilyStory: true,
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

/** Local paths only, useful when swapping one image at a time */
export const localSiteImages = local

export const siteVideos = {
  homeHero:
    'https://res.cloudinary.com/efzpryhb/video/upload/v1795210603/HOME_rgxroo.webm',
  everyKidHero:
    'https://res.cloudinary.com/efzpryhb/video/upload/v1795210626/4child_a72aij.webm',
} as const
