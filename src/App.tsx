import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import { ScrollToTop } from './components/ScrollToTop'
import { Layout } from './components/layout/Layout'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { MissionPage } from './pages/MissionPage'
import { StoriesPage } from './pages/StoriesPage'
import { StoryDetailPage } from './pages/StoryDetailPage'
import { ContactPage } from './pages/ContactPage'
import { EveryKidPage } from './pages/EveryKidPage'
import { ForTheParentsPage } from './pages/ForTheParentsPage'
import { DashboardLayout } from './pages/dashboard/DashboardLayout'
import { DashboardHome } from './pages/dashboard/DashboardHome'
import { DashboardTeam } from './pages/dashboard/DashboardTeam'
import { DashboardStories } from './pages/dashboard/DashboardStories'
import { DashboardChildren } from './pages/dashboard/DashboardChildren'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="mission" element={<MissionPage />} />
          <Route
            path="programs"
            element={<Navigate to="/programs/every-kid-deserves-it" replace />}
          />
          <Route
            path="programs/every-kid-deserves-it"
            element={<EveryKidPage />}
          />
          <Route path="programs/for-the-parents" element={<ForTheParentsPage />} />
          <Route path="news" element={<StoriesPage />} />
          <Route path="news/:slug" element={<StoryDetailPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="donate" element={<Navigate to="/" replace />} />
          <Route path="volunteer" element={<Navigate to="/" replace />} />
          <Route path="stories" element={<Navigate to="/news" replace />} />
          <Route path="events" element={<Navigate to="/news" replace />} />
        </Route>

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="team" element={<DashboardTeam />} />
          <Route path="stories" element={<DashboardStories />} />
          <Route path="children" element={<DashboardChildren />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
