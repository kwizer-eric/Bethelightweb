import { useState, type ReactNode } from 'react'

type ProgramChallengeSectionProps = {
  eyebrow?: string
  headline: ReactNode
  intro: string
  callout: string
  outro: string
}

export function ProgramChallengeSection({
  eyebrow = 'The challenge',
  headline,
  intro,
  callout,
  outro,
}: ProgramChallengeSectionProps) {
  const [open, setOpen] = useState(false)

  return (
    <section className="border-b border-primary/15 bg-warm-white py-20 sm:py-24 lg:py-28 xl:py-32">
      <div className="site-container grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start lg:gap-16 xl:gap-24">
        <div className="max-w-lg lg:sticky lg:top-28 lg:max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary sm:text-sm">
            {eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-medium leading-[1.05] tracking-tight text-ink sm:mt-5 sm:text-4xl lg:text-5xl xl:text-[3.25rem] xl:leading-[1.08]">
            {headline}
          </h2>
        </div>

        <div className="max-w-xl space-y-8 text-base leading-relaxed text-body sm:text-lg lg:max-w-2xl lg:pt-1 xl:max-w-2xl">
          <p>{intro}</p>

          {/* Desktop: always show rest. Mobile: expand via Continue reading. */}
          <div className={`space-y-8 ${open ? 'contents' : 'hidden lg:contents'}`}>
            <p className="border-l-2 border-accent pl-5 font-medium text-ink sm:pl-6">
              {callout}
            </p>
            <p>{outro}</p>
          </div>
          <button
            type="button"
            className="text-base font-medium text-ink underline decoration-accent decoration-2 underline-offset-[5px] lg:hidden"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? 'Show less' : 'Continue reading'}
          </button>
        </div>
      </div>
    </section>
  )
}
