import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { HomeNewsletterSection } from '../home/HomeNewsletterSection'

export function Layout() {
  const { pathname } = useLocation()
  const hideSiteCta = pathname.startsWith('/donate')

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      {!hideSiteCta ? <HomeNewsletterSection /> : null}
      <Footer />
    </div>
  )
}
