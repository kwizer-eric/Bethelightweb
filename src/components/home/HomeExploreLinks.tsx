import { Link } from 'react-router-dom'
import { searchPriorityLinks, site } from '../../data/site'

/** Visible hub links on the homepage — reinforces sitelink-worthy pages for search engines. */
export function HomeExploreLinks() {
  return (
    <section
      className="border-b border-ink/8 bg-warm-white py-10 sm:py-12"
      aria-labelledby="explore-kubwabo-heading"
    >
      <div className="site-container">
        <h2
          id="explore-kubwabo-heading"
          className="text-lg font-semibold tracking-tight text-ink sm:text-xl"
        >
          Explore {site.name}
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink/70 sm:text-base">
          {site.tagline} Find how to give, read our mission, and see programs for children and
          families in Rwanda.
        </p>
        <ul className="mt-8 divide-y divide-ink/10 border-t border-ink/10">
          {searchPriorityLinks.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className="group flex flex-col gap-1 py-4 transition-colors sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 sm:py-5"
              >
                <span className="text-base font-semibold text-primary group-hover:text-ink sm:text-lg">
                  {item.label}
                </span>
                <span className="max-w-xl text-sm leading-relaxed text-ink/65 sm:text-right">
                  {item.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}