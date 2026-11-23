import { useState } from 'react'
import { FadeImage } from '../FadeImage'
import { siteImages } from '../../assets/siteImages'

const PATHWAYS = [
  {
    id: 'learning',
    title: 'Education that opens doors',
    description:
      'Helping children stay in school and keep learning—through materials, encouragement, and steady support so financial hardship does not cut short their potential.',
  },
  {
    id: 'guidance',
    title: 'Mentorship and guidance',
    description:
      "Walking alongside children with care, encouragement, and practical guidance so they grow with confidence and never have to face life's challenges alone.",
  },
  {
    id: 'support',
    title: 'Essential support with dignity',
    description:
      'Meeting urgent needs with respect—connecting children and caregivers with practical help that steadies a household when hardship presses hardest.',
  },
  {
    id: 'families',
    title: 'Stronger families, lasting change',
    description:
      'Investing in parents and caregivers through skills, livelihood support, and long-term partnership so families move toward stability—and children build on a stronger foundation.',
  },
] as const

export function AboutMissionPathways() {
  const [openId, setOpenId] = useState<string>(PATHWAYS[0].id)

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2" aria-labelledby="about-mission-heading">
      <div className="flex flex-col justify-center bg-black px-6 py-16 sm:px-10 sm:py-20 lg:px-14 lg:py-24 xl:px-20">
        <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase sm:text-sm">
          Our mission
        </p>
        <h2
          id="about-mission-heading"
          className="mt-6 max-w-md text-3xl font-bold leading-tight tracking-tight text-warm-white sm:text-4xl lg:text-[2.5rem] lg:leading-[1.15]"
        >
          How we walk alongside children and families.
        </h2>

        <ul className="mt-12 space-y-8 sm:mt-14 sm:space-y-10">
          {PATHWAYS.map((item) => {
            const isOpen = openId === item.id
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setOpenId(item.id)}
                  aria-expanded={isOpen}
                  className="group flex w-full gap-5 text-left sm:gap-6"
                >
                  <span
                    className={`mt-1.5 w-px shrink-0 self-stretch transition-colors ${
                      isOpen ? 'bg-warm-white' : 'bg-warm-white/25 group-hover:bg-warm-white/50'
                    }`}
                    aria-hidden
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block text-lg font-semibold tracking-tight text-warm-white sm:text-xl">
                      {item.title}
                    </span>
                    {isOpen ? (
                      <p className="mt-3 text-sm leading-relaxed text-warm-white/65 sm:text-base">
                        {item.description}
                      </p>
                    ) : null}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="relative min-h-[22rem] w-full sm:min-h-[28rem] lg:min-h-full">
        <FadeImage
          src={siteImages.aboutPathways}
          alt="A child smiling in a Kubwabo Foundation program"
          referrerPolicy="no-referrer"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </section>
  )
}