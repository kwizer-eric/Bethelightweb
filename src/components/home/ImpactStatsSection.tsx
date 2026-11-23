import { useCms } from '../../cms/CmsContext'
import { impactStats as fallbackImpactStats, site } from '../../data/site'
import { normalizeImpactStat } from '../../lib/impactMetric'

export function ImpactStatsSection() {
  const { impactStats: cmsStats } = useCms()

  const stats =
    cmsStats.length > 0
      ? cmsStats.map((stat) => {
          const next = normalizeImpactStat(stat)
          return { value: next.value, label: next.label }
        })
      : fallbackImpactStats.map((stat) => ({
          value: stat.value,
          label: stat.label.replace(/\n/g, ' '),
        }))

  return (
    <section className="bg-warm-white">
      <div className="site-container pt-24 pb-12 text-center sm:pt-28 sm:pb-14 lg:pt-32 lg:pb-16">
        <div className="mx-auto max-w-5xl">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-primary uppercase sm:text-xs">
            Measured impact. Lasting change.
          </p>
          <p className="mt-6 text-2xl font-semibold leading-snug tracking-tight text-ink sm:mt-8 sm:text-3xl lg:text-4xl lg:leading-snug">
            {site.name} works alongside communities where children and families face
            hardship, building practical support that keeps kids in school, families stable, and
            dignity intact. Behind every metric is a child returning to school, a family finding
            safety, or a community beginning again. We don&apos;t guess at progress.
          </p>
        </div>
      </div>

      <div className="site-container pb-24 sm:pb-28 lg:pb-32">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-14 sm:grid-cols-3 sm:gap-10 lg:gap-12">
          {stats.map((stat) => (
            <div key={`${stat.value}-${stat.label}`} className="flex flex-col items-center text-center">
              <p className="text-6xl font-bold tracking-tight text-ink sm:text-7xl lg:text-[5.5rem] lg:leading-none">
                {stat.value}
              </p>
              <p className="mt-5 max-w-[12rem] text-sm font-medium tracking-[0.14em] text-body uppercase sm:mt-6 sm:text-base sm:leading-snug">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
