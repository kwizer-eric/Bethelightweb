import { HeroSection } from '../components/home/HeroSection'
import { AboutProgramsSection } from '../components/home/AboutProgramsSection'
import { ImpactStatsSection } from '../components/home/ImpactStatsSection'
import { HomeProgramsSection } from '../components/home/HomeProgramsSection'
import { MakeADifferenceSection } from '../components/home/MakeADifferenceSection'
import { HomeNewsSection } from '../components/home/HomeNewsSection'

export function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutProgramsSection />

      <ImpactStatsSection />

      <HomeProgramsSection />

      <MakeADifferenceSection />

      <HomeNewsSection />
    </>
  )
}
