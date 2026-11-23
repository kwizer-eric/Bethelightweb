import type { ReactNode } from 'react'

export const pageHeroTitleClass =
  'max-w-xl text-4xl font-medium leading-[1.05] tracking-tight text-ink sm:max-w-2xl sm:text-5xl lg:text-6xl xl:max-w-3xl xl:text-7xl 2xl:text-8xl'

export const pageHeroDescriptionClass =
  'max-w-md text-base leading-relaxed text-body sm:text-lg lg:justify-self-end xl:max-w-lg xl:text-xl'

export const pageHeroGridClass =
  'site-container grid grid-cols-1 gap-10 pb-16 pt-24 sm:gap-12 sm:pb-20 sm:pt-28 lg:grid-cols-2 lg:gap-20 lg:pb-24 lg:pt-32 xl:gap-24 xl:pb-28 xl:pt-36 2xl:pb-32 2xl:pt-40'

type PageHeroIntroProps = {
  title: ReactNode
  description: ReactNode
  /** Keep the headline at the top when the right column is taller (program intros). */
  titleAtTop?: boolean
  /** Wider right column (program pages). */
  wideDescription?: boolean
  /** Nudge only the description down (headline unchanged). */
  nudgeDescription?: boolean
}

const descriptionNudgeClass =
  'sm:translate-y-8 lg:translate-y-12 xl:translate-y-16'

const descriptionWidthClass = (wide: boolean) =>
  wide
    ? 'max-w-lg lg:max-w-xl xl:max-w-2xl'
    : 'max-w-md xl:max-w-lg'

export function PageHeroIntro({
  title,
  description,
  titleAtTop = false,
  wideDescription = false,
  nudgeDescription = false,
}: PageHeroIntroProps) {
  const rowAlign = titleAtTop ? 'lg:items-start' : 'lg:items-end'
  const widthClass = descriptionWidthClass(wideDescription)
  const descriptionTypography =
    'text-base leading-relaxed text-body sm:text-lg lg:justify-self-end xl:text-xl'

  return (
    <div className={`${pageHeroGridClass} ${rowAlign}`}>
      <h1 className={`${pageHeroTitleClass} ${titleAtTop ? 'self-start' : ''}`}>{title}</h1>
      {typeof description === 'string' ? (
        <p
          className={`${widthClass} ${descriptionTypography} ${nudgeDescription ? descriptionNudgeClass : ''}`}
        >
          {description}
        </p>
      ) : (
        <div
          className={`space-y-6 ${widthClass} ${descriptionTypography} ${nudgeDescription ? descriptionNudgeClass : ''}`}
        >
          {description}
        </div>
      )}
    </div>
  )
}