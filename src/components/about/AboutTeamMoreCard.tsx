type Props = {
  count: number
}

export function AboutTeamMoreCard({ count }: Props) {
  if (count <= 0) return null

  return (
    <article>
      <div className="flex aspect-[3/4] w-full flex-col items-center justify-center overflow-hidden border border-ink/10 bg-warm-white px-6 text-center sm:px-8">
        <span className="text-5xl font-bold tracking-tight text-ink sm:text-6xl lg:text-7xl">
          +{count}
        </span>
        <span className="mt-4 text-lg font-semibold text-ink sm:text-xl">Other members</span>
        <p className="mt-2 max-w-[11rem] text-sm leading-relaxed text-body">
          Volunteers and teammates beyond our board
        </p>
      </div>
      <h3 className="mt-5 text-lg font-medium tracking-tight text-transparent" aria-hidden>
        .
      </h3>
      <p className="mt-1 text-sm text-transparent" aria-hidden>
        .
      </p>
    </article>
  )
}