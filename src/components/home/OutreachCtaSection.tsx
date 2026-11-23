import type { ReactNode } from 'react'
import { FadeImage } from '../FadeImage'

type OutreachCtaSectionProps = {
  eyebrow: string
  title: string
  description: string
  primaryImage: string
  primaryImageAlt: string
  cta: ReactNode
}

export function OutreachCtaSection({
  eyebrow,
  title,
  description,
  primaryImage,
  primaryImageAlt,
  cta,
}: OutreachCtaSectionProps) {
  return (
    <section className="bg-white py-20">
      <div className="site-container">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="relative w-full max-w-[440px] lg:col-span-5">
            <div className="aspect-[3/4] w-full overflow-hidden rounded-tr-2xl rounded-bl-sm bg-ink/5 sm:h-[500px] sm:max-h-[520px]">
              <FadeImage
                src={primaryImage}
                alt={primaryImageAlt}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7 lg:col-start-6 xl:col-span-6 xl:col-start-7">
            <p className="text-xs font-semibold tracking-wider text-primary uppercase">
              {eyebrow}
            </p>
            <h2 className="mt-3 max-w-md text-3xl leading-[1.12] font-bold tracking-tight text-ink md:text-5xl">
              {title}
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-body">{description}</p>
            <div className="mt-8">{cta}</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export const outreachCtaButtonClass =
  'inline-flex items-center justify-center rounded-lg bg-primary px-7 py-3.5 text-sm font-medium text-warm-white transition-colors hover:bg-ink'
