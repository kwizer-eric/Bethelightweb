import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { useCms } from '../../cms/CmsContext'

const nav: {
  to: string
  label: string
  end?: boolean
  icon: 'overview' | 'team' | 'stories' | 'children'
}[] = [
  { to: '/dashboard', label: 'Overview', end: true, icon: 'overview' },
  { to: '/dashboard/team', label: 'Team', icon: 'team' },
  { to: '/dashboard/stories', label: 'Impact Stories', icon: 'stories' },
  { to: '/dashboard/children', label: 'Children', icon: 'children' },
]

function NavIcon({ name }: { name: (typeof nav)[number]['icon'] }) {
  const common = 'h-4 w-4 shrink-0'
  switch (name) {
    case 'overview':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M4 10.5L12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      )
    case 'team':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="17" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M3.5 19c.8-3 2.9-4.5 5.5-4.5S14 16 14.8 19M14 14.5c1.7-.3 3.5.4 4.5 2.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      )
    case 'stories':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M6 4h9a2 2 0 0 1 2 2v14l-4.5-2.5L8 20V6a2 2 0 0 1 2-2"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M8 4V3a1 1 0 0 1 1-1h7a2 2 0 0 1 2 2v13"
            stroke="currentColor"
            strokeWidth="1.6"
          />
        </svg>
      )
    case 'children':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M6 20c1.2-3.2 3.2-4.8 6-4.8s4.8 1.6 6 4.8"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      )
  }
}

export function DashboardLayout() {
  const { ready } = useCms()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#f4f5f7] text-ink">
      {/* Fixed sidebar — does not scroll with page */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex h-dvh w-[15.5rem] flex-col overflow-hidden border-r border-ink/8 bg-white transition-transform ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex items-center gap-2.5 px-5 py-5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-warm-white">
            KF
          </span>
          <div>
            <p className="text-sm font-semibold tracking-tight text-ink">
              Kubwabo
            </p>
            <p className="text-[11px] text-ink/45">Admin CMS</p>
          </div>
        </div>

        <nav className="mt-2 flex-1 space-y-1 px-3" aria-label="Dashboard">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-ink text-warm-white'
                    : 'text-ink/55 hover:bg-ink/5 hover:text-ink'
                }`
              }
            >
              <NavIcon name={item.icon} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="m-3 rounded-2xl bg-ink p-4 text-warm-white">
          <p className="text-sm font-semibold">Live site</p>
          <p className="mt-1 text-xs leading-relaxed text-warm-white/60">
            Changes save in this browser and show on the public site right away.
          </p>
          <Link
            to="/"
            className="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-warm-white transition-colors hover:bg-warm-white hover:text-ink"
          >
            View website
          </Link>
        </div>
      </aside>

      {mobileOpen && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-ink/40 lg:hidden"
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Scrollable main column */}
      <div className="flex min-h-screen min-w-0 flex-col lg:pl-[15.5rem]">
        <header className="sticky top-0 z-20 flex items-center border-b border-ink/8 bg-white/90 px-4 py-3 backdrop-blur-md sm:px-6 lg:hidden">
          <button
            type="button"
            className="rounded-lg p-2 text-ink"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <p className="ml-2 text-sm font-semibold text-ink">Kubwabo Admin</p>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          {!ready ? (
            <p className="text-sm text-ink/55">Loading CMS…</p>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  )
}
