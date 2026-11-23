import { useCms } from '../../cms/CmsContext'
import { ProgramImpactCard } from '../ui/ProgramImpactCard'
import { siteImages } from '../../assets/siteImages'
import { programLinks } from '../../data/site'
import { formatImpactMetricLine, impactStatForProgramHref } from '../../lib/impactMetric'

const FALLBACK_PROGRAMS = [
  {
    title: programLinks[0].label,
    description:
      'Walking alongside children through education, mentorship, guidance, and encouragement so financial hardship does not define their future.',
    metric: '35+ CHILDREN REACHED',
    imageUrl: siteImages.everyKidProgram,
    imageAlt: 'Children in the Every Child Deserves It program',
    href: programLinks[0].href,
  },
  {
    title: programLinks[1].label,
    description:
      'Helping vulnerable families build stability through essential support, livelihood opportunities, business guidance, and mentorship.',
    metric: '2 FAMILIES SUPPORTED',
    imageUrl: siteImages.forTheirFamilyProgram,
    imageAlt: 'Families in the For Their Family program',
    href: programLinks[1].href,
  },
]

export function HomeProgramsSection() {
  const { homePrograms, impactStats } = useCms()

  const programs =
    homePrograms.length > 0
      ? homePrograms.map((program) => {
          const fromStats = impactStatForProgramHref(program.href, impactStats)
          const fallbackMetric =
            program.metric.trim() ||
            FALLBACK_PROGRAMS.find((p) => p.href === program.href)?.metric ||
            ''
          return {
            title: program.title,
            description: program.description,
            metric: fromStats ? formatImpactMetricLine(fromStats) : fallbackMetric,
            imageUrl:
              program.image ||
              (program.href.includes('every-kid')
                ? siteImages.everyKidProgram
                : siteImages.forTheirFamilyProgram),
            imageAlt: program.imageAlt || program.title,
            href: program.href,
          }
        })
      : FALLBACK_PROGRAMS.map((program) => {
          const fromStats = impactStatForProgramHref(program.href, impactStats)
          return {
            ...program,
            metric: fromStats ? formatImpactMetricLine(fromStats) : program.metric,
          }
        })

  return (
    <section className="bg-warm-white pb-14 sm:pb-16 lg:pb-20" aria-labelledby="home-programs-heading">
      <div className="site-container px-4 pt-14 text-center sm:pt-16 lg:pt-20">
        <p className="text-[11px] font-semibold tracking-[0.22em] text-primary uppercase sm:text-xs">
          Featured programs
        </p>
        <h2
          id="home-programs-heading"
          className="mx-auto mt-5 max-w-2xl text-3xl font-bold leading-tight tracking-tight text-ink sm:mt-6 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]"
        >
          Programs built
          <br />
          for the long road.
        </h2>
      </div>

      <div className="site-container pt-8 sm:pt-10 lg:pt-12">
        <div className="mx-auto grid max-w-5xl grid-cols-1 items-stretch gap-8 md:grid-cols-2 md:gap-10 lg:gap-14">
          {programs.map((program) => (
            <ProgramImpactCard key={program.href} {...program} />
          ))}
        </div>
      </div>
    </section>
  )
}
