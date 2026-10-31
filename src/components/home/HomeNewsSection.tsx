import { Link } from 'react-router-dom'
import { useCms } from '../../cms/CmsContext'

function formatStoryDate(iso: string) {
  const d = new Date(`${iso}T00:00:00`)
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  return `${day}/${month}/${year}`
}

export function HomeNewsSection() {
  const { stories } = useCms()
  const featured = stories.slice(0, 3)

  return (
    <section className="border-b border-primary/15 bg-warm-white pt-20 lg:pt-24 xl:pt-28">
      <div className="site-container">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-[1fr_auto] sm:items-center lg:gap-12">
          <h2 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl xl:text-6xl">
            Impact Stories
          </h2>
          <Link
            to="/news"
            className="inline-flex min-w-[7.5rem] items-center justify-center self-start border border-primary bg-transparent px-6 py-2 text-sm font-medium leading-normal text-primary transition-colors hover:bg-primary hover:text-warm-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-warm-white sm:self-auto"
          >
            View All
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 items-stretch lg:mt-20 lg:grid-cols-3 xl:mt-24">
          {featured.map((story, index) => (
            <article
              key={story.id}
              className={`flex h-full flex-col border-primary/15 ${
                index > 0 ? 'border-t lg:border-t-0 lg:border-l' : ''
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

              <div className="flex flex-1 flex-col border-t border-primary/15 bg-warm-white px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
                <p className="text-xs font-medium tracking-[0.12em] text-primary/70 uppercase">
                  {formatStoryDate(story.date)}{' '}
                  <span className="text-primary/35" aria-hidden>
                    |
                  </span>{' '}
                  {story.category}
                </p>

                <h3 className="mt-6 max-w-md text-xl leading-snug font-medium tracking-tight text-primary sm:text-2xl lg:text-3xl">
                  {story.title}
                </h3>

                <div className="mt-auto pt-8">
                  <Link
                    to={`/news/${story.slug}`}
                    className="inline-flex min-w-[7.5rem] items-center justify-center border border-primary px-6 py-2 text-sm font-medium leading-normal text-primary transition-colors hover:bg-primary hover:text-warm-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-warm-white"
                  >
                    Read more
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
