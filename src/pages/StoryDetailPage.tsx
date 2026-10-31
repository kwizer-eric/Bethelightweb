import { Link, Navigate, useParams } from 'react-router-dom'
import { getStoryGallery, type StoryBlock } from '../data/site'
import { useCms } from '../cms/CmsContext'

function formatStoryDate(iso: string) {
  const d = new Date(`${iso}T00:00:00`)
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  return `${day}/${month}/${year}`
}

function StoryBody({ blocks }: { blocks: readonly StoryBlock[] }) {
  return (
    <div className="mt-10 space-y-6">
      {blocks.map((block, i) => {
        if (block.type === 'p') {
          return (
            <p
              key={i}
              className="text-base leading-relaxed text-primary/80 sm:text-lg"
            >
              {block.text}
            </p>
          )
        }
        if (block.type === 'h2') {
          return (
            <h2
              key={i}
              className="pt-4 text-xl font-semibold tracking-tight text-primary sm:text-2xl"
            >
              {block.text}
            </h2>
          )
        }
        return (
          <ul
            key={i}
            className="list-disc space-y-2 pl-5 text-base text-primary/80 sm:text-lg"
          >
            {block.items.map((item) => (
              <li key={item} className="leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        )
      })}
    </div>
  )
}

function StoryGallery({ images }: { images: readonly string[] }) {
  if (images.length === 0) return null

  return (
    <div className="mt-12">
      <h2 className="text-xl font-semibold tracking-tight text-primary sm:text-2xl">
        Gallery
      </h2>
      <div className="mt-6 grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3">
        {images.map((src) => (
          <div key={src} className="aspect-[4/3] overflow-hidden bg-primary/5">
            <img
              src={src}
              alt=""
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export function StoryDetailPage() {
  const { slug } = useParams()
  const { ready, stories, getStoryBySlug } = useCms()
  const story = slug ? getStoryBySlug(slug) : undefined

  if (!ready) {
    return (
      <div className="bg-warm-white px-4 py-24 text-center text-sm text-primary/60">
        Loading story…
      </div>
    )
  }

  if (!story) {
    return <Navigate to="/news" replace />
  }

  const related = stories.filter((s) => s.id !== story.id).slice(0, 3)
  const gallery = getStoryGallery(story.slug)

  return (
    <>
      <article className="bg-warm-white pt-16 pb-16 text-primary sm:pt-20 lg:pt-24 lg:pb-20">
        <div className="site-container">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-medium tracking-[0.12em] text-primary/70 uppercase">
              {story.category}
            </p>
            <p className="mt-2 text-sm text-primary/55">
              {formatStoryDate(story.date)}
            </p>

            <h1 className="mt-6 text-3xl font-bold leading-[1.15] tracking-tight text-primary sm:text-4xl lg:text-5xl">
              {story.title}
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-primary/75 sm:text-xl">
              {story.excerpt}
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-4xl overflow-hidden lg:mt-12">
            <img
              src={story.image}
              alt=""
              referrerPolicy="no-referrer"
              className="aspect-[16/9] w-full object-cover"
            />
          </div>

          <div className="mx-auto mt-4 max-w-3xl">
            <StoryBody blocks={story.body} />
            <StoryGallery images={gallery} />

            <div className="mt-14 flex justify-center pt-8">
              <Link
                to="/news"
                className="inline-flex min-w-[7.5rem] items-center justify-center border border-primary px-6 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-warm-white"
              >
                Back to Impact Stories
              </Link>
            </div>
          </div>
        </div>
      </article>

      <section className="border-t border-b border-primary/15 bg-warm-white pt-16 text-primary lg:pt-20">
        <div className="site-container">
          <h2 className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">
            You may be interested in...
          </h2>

          <div className="mt-10 grid grid-cols-1 items-stretch lg:grid-cols-3">
            {related.map((item, index) => (
              <article
                key={item.id}
                className={`flex h-full flex-col border-primary/15 ${
                  index > 0 ? 'border-t lg:border-t-0 lg:border-l' : ''
                }`}
              >
                <Link
                  to={`/news/${item.slug}`}
                  className="block aspect-[4/3] overflow-hidden"
                >
                  <img
                    src={item.image}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                  />
                </Link>
                <div className="flex flex-1 flex-col border-t border-primary/15 px-6 py-8 sm:px-8 lg:pb-20">
                  <p className="text-xs font-medium tracking-[0.12em] text-primary/70 uppercase">
                    {formatStoryDate(item.date)}{' '}
                    <span className="text-primary/35" aria-hidden>
                      |
                    </span>{' '}
                    {item.category}
                  </p>
                  <h3 className="mt-4 text-xl font-medium tracking-tight text-primary sm:text-2xl">
                    <Link to={`/news/${item.slug}`}>{item.title}</Link>
                  </h3>
                  <div className="mt-auto pt-8 lg:pt-14">
                    <Link
                      to={`/news/${item.slug}`}
                      className="inline-flex min-w-[7.5rem] items-center justify-center border border-primary px-6 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-warm-white"
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
    </>
  )
}
