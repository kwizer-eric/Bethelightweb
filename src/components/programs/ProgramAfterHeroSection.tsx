import { useState } from 'react'

type ProgramAfterHeroSectionProps = {
  eyebrow: string
  title: string
  lead: string
  body: string
}

export function ProgramAfterHeroSection({
  eyebrow,
  title,
  lead,
  body,
}: ProgramAfterHeroSectionProps) {
  const [open, setOpen] = useState(false)

  return (
    <section className="flex min-h-[80dvh] flex-col justify-start border-b border-primary/15 bg-warm-white">
      <div className="site-container pb-12 pt-20 sm:pb-16 sm:pt-28 lg:pb-20 lg:pt-36 xl:pt-40">
        <div className="max-w-3xl lg:max-w-4xl xl:max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary sm:text-sm">
            {eyebrow}
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-ink sm:mt-5 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
            {title}
          </h2>
          <p className="mt-6 text-lg font-medium leading-snug text-ink sm:mt-8 sm:text-xl lg:leading-relaxed">
            {lead}
          </p>

          {/* Desktop: always show body. Mobile: expand via Read more. */}
          <p
            className={`mt-8 text-base leading-relaxed text-body sm:mt-10 sm:text-lg ${
              open ? 'block' : 'hidden lg:block'
            }`}
          >
            {body}
          </p>
          <button
            type="button"
            className="mt-5 text-base font-medium text-ink underline decoration-accent decoration-2 underline-offset-[5px] lg:hidden"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? 'Show less' : 'Read more'}
          </button>
        </div>
      </div>
    </section>
  )
}
