import { Link } from 'react-router-dom'
import { useCms } from '../cms/CmsContext'

function formatStoryDate(iso: string) {
  const d = new Date(`${iso}T00:00:00`)
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  return `${day}/${month}/${year}`
}

export function StoriesPage() {
  const { stories } = useCms()
  const lastRowStart = stories.length - ((stories.length % 3) || 3)

  return (
    <section className="border-b border-primary/15 bg-warm-white pt-20 lg:pt-24 xl:pt-28">
      <div className="site-container">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-[1fr_auto] sm:items-center lg:gap-12">
          <h1 className="max-w-xl text-4xl font-medium leading-[1.05] tracking-tight text-primary sm:max-w-2xl sm:text-5xl lg:text-6xl xl:max-w-3xl xl:text-7xl 2xl:text-8xl">
            Impact Stories
          </h1>
        </div>

        <div className="mt-16 grid grid-cols-1 items-stretch lg:mt-20 lg:grid-cols-3 xl:mt-24">
          {stories.map((story, index) => {
            const isBottomRow = index >= lastRowStart

            return (
              <article
                key={story.id}
                className={`flex h-full flex-col border-primary/15 ${
                  index > 0 ? 'border-t lg:border-t-0' : ''
                } ${index % 3 !== 0 ? 'lg:border-l' : ''} ${
                  index >= 3 ? 'lg:border-t' : ''
                }`}
              >
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={story.image}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div
                  className={`flex flex-1 flex-col border-t border-primary/15 bg-warm-white px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12 ${
                    isBottomRow ? 'lg:pb-20' : ''
                  }`}
                >
                  <p className="text-xs font-medium tracking-[0.12em] text-primary/70 uppercase">
                    {formatStoryDate(story.date)}{' '}
                    <span className="text-primary/35" aria-hidden>
                      |
                    </span>{' '}
                    {story.category}
                  </p>

                  <h2 className="mt-6 max-w-md text-xl leading-snug font-medium tracking-tight text-primary sm:text-2xl lg:text-3xl">
                    {story.title}
                  </h2>

                  <div
                    className={`mt-auto pt-8 ${isBottomRow ? 'lg:pt-14' : ''}`}
                  >
                    <Link
                      to={`/news/${story.slug}`}
                      className="inline-flex min-w-[7.5rem] items-center justify-center border border-primary px-6 py-2 text-sm font-medium leading-normal text-primary transition-colors hover:bg-primary hover:text-warm-white"
                    >
                      Read more
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
