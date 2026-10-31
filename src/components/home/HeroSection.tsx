const HERO_UNSPLASH =
  'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1920&q=85'

export function HeroSection() {
  return (
    <section className="w-full bg-warm-white">
      <div className="site-container grid grid-cols-1 gap-10 pb-16 pt-24 sm:gap-12 sm:pb-20 sm:pt-28 lg:grid-cols-2 lg:items-end lg:gap-20 lg:pb-24 lg:pt-32 xl:gap-24 xl:pb-28 xl:pt-36 2xl:pb-32 2xl:pt-40">
        <h1 className="max-w-xl text-4xl font-medium leading-[1.05] tracking-tight text-primary sm:max-w-2xl sm:text-5xl lg:text-6xl xl:max-w-3xl xl:text-7xl 2xl:text-8xl">
          For Them.
          <br />
          For Their Future.
        </h1>
        <p className="max-w-md text-base leading-relaxed text-primary sm:text-lg lg:justify-self-end xl:max-w-lg xl:text-xl">
          Kubwabo Foundation works alongside communities to ensure children and families receive the care, support, and opportunities they need to overcome challenges and thrive.
        </p>
      </div>

      <div className="relative h-dvh min-h-dvh w-full overflow-hidden">
        <img
          src={HERO_UNSPLASH}
          alt="Group of children laughing together"
          referrerPolicy="no-referrer"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/15 to-transparent"
          aria-hidden
        />
      </div>
    </section>
  )
}
