import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { site, navLinks, programLinks } from '../../data/site'

function ColumnHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="flex items-center gap-2.5 text-sm font-semibold tracking-tight text-warm-white sm:text-base">
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-warm-white" aria-hidden />
      {children}
    </h2>
  )
}

const columnClass =
  'flex min-h-[20rem] flex-col items-start justify-start gap-8 py-14 sm:min-h-[22rem] sm:gap-10 sm:py-20 lg:min-h-[26rem] lg:py-24'

export function Footer() {
  return (
    <footer className="bg-black text-warm-white">
      <div className="site-container">
        <div className="grid grid-cols-1 items-stretch gap-0 sm:grid-cols-2 lg:grid-cols-4">
          <div
            className={`${columnClass} lg:border-r lg:border-warm-white/20 lg:pr-8 xl:pr-10`}
          >
            <ColumnHeading>Contact</ColumnHeading>
            <ul className="space-y-2 text-sm text-warm-white/90 sm:text-base">
              <li>
                <a href={site.social.instagram} className="transition-colors hover:text-primary">
                  Instagram
                </a>
              </li>
              <li>
                <a href={site.social.linkedin} className="transition-colors hover:text-primary">
                  Linkedin
                </a>
              </li>
              <li>
                <a href={site.social.facebook} className="transition-colors hover:text-primary">
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="transition-colors hover:text-primary"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>

          <div
            className={`${columnClass} sm:pl-6 lg:border-r lg:border-warm-white/20 lg:px-8 xl:px-10`}
          >
            <ColumnHeading>Explore</ColumnHeading>
            <ul className="space-y-2 text-sm text-warm-white/90 sm:text-base">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div
            className={`${columnClass} lg:border-r lg:border-warm-white/20 lg:px-8 xl:px-10`}
          >
            <ColumnHeading>Programs</ColumnHeading>
            <ul className="space-y-2 text-sm text-warm-white/90 sm:text-base">
              {programLinks.map((program) => (
                <li key={program.href}>
                  <Link
                    to={program.href}
                    className="transition-colors hover:text-primary"
                  >
                    {program.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={`${columnClass} sm:pl-6 lg:pl-8 xl:pl-10`}>
            <ColumnHeading>Infos</ColumnHeading>
            <ul className="space-y-2 text-sm text-warm-white/90 sm:text-base">
              <li>
                <Link to="/about" className="transition-colors hover:text-primary">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="transition-colors hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
