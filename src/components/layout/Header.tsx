import { useEffect, useId, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { site, navLinks, programLinks } from '../../data/site'
import { Logo } from '../ui/Logo'

const mainLinks = navLinks.filter((link) => link.href !== '/contact')

const supportClass = 'bg-accent text-primary font-medium hover:bg-accent'

export function Header() {
  const [open, setOpen] = useState(false)
  const [programsOpen, setProgramsOpen] = useState(false)
  const [mobileProgramsOpen, setMobileProgramsOpen] = useState(false)
  const programsRef = useRef<HTMLDivElement>(null)
  const programsMenuId = useId()
  const location = useLocation()

  const linkClass = 'text-primary'

  useEffect(() => {
    setOpen(false)
    setProgramsOpen(false)
    setMobileProgramsOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!programsOpen) return

    const onPointerDown = (e: MouseEvent) => {
      if (!programsRef.current?.contains(e.target as Node)) {
        setProgramsOpen(false)
      }
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setProgramsOpen(false)
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [programsOpen])

  return (
    <header className="sticky top-0 z-50 bg-warm-white">
      <div className="site-container grid grid-cols-[1fr_auto] items-center gap-3 py-3 sm:grid-cols-[1fr_auto_1fr] sm:gap-4 sm:py-4">
        <Link
          to="/"
          className="justify-self-start"
          onClick={() => setOpen(false)}
          aria-label={site.name}
        >
          <Logo tone="primary" />
        </Link>

        <nav
          className="hidden items-center justify-center gap-1 sm:flex"
          aria-label="Main"
        >
          {mainLinks.map((link) =>
            link.href === '/programs' ? (
              <div
                key={link.href}
                ref={programsRef}
                className="relative"
                onMouseEnter={() => setProgramsOpen(true)}
                onMouseLeave={() => setProgramsOpen(false)}
              >
                <button
                  type="button"
                  className={`inline-flex items-center gap-1 whitespace-nowrap px-3 py-1.5 text-sm font-medium leading-normal transition-colors xl:px-4 ${linkClass}`}
                  aria-expanded={programsOpen}
                  aria-haspopup="menu"
                  aria-controls={programsMenuId}
                  onClick={() => setProgramsOpen((v) => !v)}
                >
                  {link.label}
                  <svg
                    className={`h-3.5 w-3.5 transition-transform ${programsOpen ? 'rotate-180' : ''}`}
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M4 6l4 4 4-4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {programsOpen && (
                  <div
                    id={programsMenuId}
                    role="menu"
                    className="absolute top-full left-0 z-50 min-w-[14rem] border border-ink/10 bg-warm-white py-2 shadow-lg"
                  >
                    {programLinks.map((item) => (
                      <NavLink
                        key={item.href}
                        to={item.href}
                        role="menuitem"
                        className={({ isActive }) =>
                          `block px-4 py-2.5 text-sm font-medium transition-colors ${
                            isActive
                              ? 'bg-primary/5 text-primary'
                              : 'text-primary hover:bg-primary/5'
                          }`
                        }
                        onClick={() => setProgramsOpen(false)}
                      >
                        {item.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={link.href}
                to={link.href}
                className={`whitespace-nowrap px-3 py-1.5 text-sm font-medium leading-normal transition-colors xl:px-4 ${linkClass}`}
              >
                {link.label}
              </NavLink>
            ),
          )}
        </nav>

        <div className="flex items-center justify-self-end gap-2">
          <Link
            to="/#support"
            className={`hidden min-w-[7.5rem] justify-center px-6 py-2 text-sm font-medium leading-normal transition-colors sm:inline-flex ${supportClass}`}
            onClick={() => setOpen(false)}
          >
            Donate
          </Link>

          <button
            type="button"
            className="rounded-lg p-2 text-primary sm:hidden"
            aria-expanded={open}
            aria-label="Toggle menu"
            onClick={() => setOpen(!open)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="border-t border-ink/10 bg-warm-white px-4 py-4 sm:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-1">
            {mainLinks.map((link) =>
              link.href === '/programs' ? (
                <li key={link.href}>
                  <button
                    type="button"
                    className={`flex w-full items-center justify-between rounded-lg px-4 py-3 text-left font-medium ${linkClass}`}
                    aria-expanded={mobileProgramsOpen}
                    onClick={() => setMobileProgramsOpen((v) => !v)}
                  >
                    {link.label}
                    <svg
                      className={`h-4 w-4 transition-transform ${mobileProgramsOpen ? 'rotate-180' : ''}`}
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M4 6l4 4 4-4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  {mobileProgramsOpen && (
                    <ul className="mb-1 ml-3 border-l border-ink/10 pl-3">
                      {programLinks.map((item) => (
                        <li key={item.href}>
                          <NavLink
                            to={item.href}
                            className={`block rounded-lg px-3 py-2.5 text-sm font-medium ${linkClass}`}
                            onClick={() => setOpen(false)}
                          >
                            {item.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={link.href}>
                  <NavLink
                    to={link.href}
                    className={`block rounded-lg px-4 py-3 font-medium ${linkClass}`}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ),
            )}
            <li>
              <Link
                to="/#support"
                className={`mt-1 block px-4 py-3 text-center font-medium ${supportClass}`}
                onClick={() => setOpen(false)}
              >
                Donate
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
