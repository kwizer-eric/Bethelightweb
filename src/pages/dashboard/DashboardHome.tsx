import { Link } from 'react-router-dom'
import { useCms } from '../../cms/CmsContext'

function formatDate(iso: string) {
  const d = new Date(`${iso}T00:00:00`)
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function DashboardHome() {
  const { team, stories, children } = useCms()

  const urgentCount = children.filter((c) => c.urgent).length
  const latestStories = [...stories]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5)

  const metrics = [
    {
      label: 'Team members',
      value: String(team.length),
      hint: 'Shown on About',
      dark: true,
      href: '/dashboard/team',
    },
    {
      label: 'Impact stories',
      value: String(stories.length),
      hint: 'Live on /news',
      dark: false,
      href: '/dashboard/stories',
    },
    {
      label: 'Children listed',
      value: String(children.length),
      hint: `${urgentCount} marked urgent`,
      dark: false,
      href: '/dashboard/children',
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          Welcome back
        </h2>
        <p className="mt-1 text-sm text-ink/55">
          Here&apos;s your current content overview for Kubwabo Foundation.
        </p>
      </div>

      {/* Metric cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {metrics.map((metric) => (
          <Link
            key={metric.href}
            to={metric.href}
            className={`rounded-2xl p-5 shadow-sm transition-transform hover:-translate-y-0.5 ${
              metric.dark
                ? 'bg-ink text-warm-white'
                : 'border border-ink/6 bg-white text-ink'
            }`}
          >
            <p
              className={`text-xs font-medium ${
                metric.dark ? 'text-warm-white/55' : 'text-ink/45'
              }`}
            >
              {metric.label}
            </p>
            <p className="mt-4 text-3xl font-semibold tracking-tight">
              {metric.value}
            </p>
            <p
              className={`mt-2 text-xs ${
                metric.dark ? 'text-warm-white/50' : 'text-ink/45'
              }`}
            >
              {metric.hint}
            </p>
          </Link>
        ))}
      </div>

      {/* Team snapshot */}
      <div className="rounded-2xl border border-ink/6 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-ink">Leadership team</h3>
            <p className="mt-0.5 text-xs text-ink/45">About page profiles</p>
          </div>
          <Link
            to="/dashboard/team"
            className="text-xs font-medium text-primary hover:underline"
          >
            Edit
          </Link>
        </div>

        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {team.slice(0, 4).map((member, index) => (
            <li key={member.id} className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#f4f5f7] text-[11px] font-semibold text-ink/50">
                {index + 1}
              </span>
              <img
                src={member.image}
                alt=""
                referrerPolicy="no-referrer"
                className="h-10 w-10 rounded-full object-cover"
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-ink">
                  {member.name}
                </p>
                <p className="truncate text-xs text-ink/45">{member.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Latest stories table */}
      <div className="overflow-hidden rounded-2xl border border-ink/6 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/6 px-5 py-4">
          <div>
            <h3 className="text-sm font-semibold text-ink">Latest stories</h3>
            <p className="text-xs text-ink/45">Impact Stories on the public site</p>
          </div>
          <Link
            to="/dashboard/stories"
            className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-warm-white hover:bg-ink"
          >
            Manage
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-[#f4f5f7] text-xs font-medium tracking-wide text-ink/45 uppercase">
              <tr>
                <th className="px-5 py-3 font-medium">Story</th>
                <th className="px-5 py-3 font-medium">Category</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {latestStories.map((story) => (
                <tr
                  key={story.id}
                  className="border-t border-ink/6 transition-colors hover:bg-[#fafafa]"
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={story.image}
                        alt=""
                        referrerPolicy="no-referrer"
                        className="h-9 w-12 rounded-md object-cover"
                      />
                      <span className="max-w-[14rem] truncate font-medium text-ink">
                        {story.title}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-ink/60">{story.category}</td>
                  <td className="px-5 py-3 text-ink/60">
                    {formatDate(story.date)}
                  </td>
                  <td className="px-5 py-3">
                    <span className="inline-flex rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
                      Published
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <Link
                      to={`/news/${story.slug}`}
                      className="text-xs font-medium text-primary hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
              {latestStories.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-8 text-center text-sm text-ink/45"
                  >
                    No stories yet. Add one in Impact Stories.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
