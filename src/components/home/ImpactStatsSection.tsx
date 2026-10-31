import { impactStats } from '../../data/site'

export function ImpactStatsSection() {
  return (
    <section className="bg-warm-white">
      <div className="site-container py-24 sm:py-28 lg:py-32">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8 lg:gap-12">
          {impactStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-5xl font-bold tracking-tight text-primary sm:text-6xl lg:text-7xl">
                {stat.value}
              </p>
              <p className="mt-3 whitespace-pre-line text-base font-medium uppercase leading-snug tracking-[0.14em] text-primary/80 sm:mt-4 sm:text-lg sm:leading-snug">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
