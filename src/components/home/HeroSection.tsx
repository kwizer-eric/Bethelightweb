import { useSyncExternalStore } from 'react'
import { PageHeroIntro } from '../layout/PageHeroIntro'
import { siteVideos } from '../../assets/siteImages'

function subscribeReducedMotion(onStoreChange: () => void) {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  mq.addEventListener('change', onStoreChange)
  return () => mq.removeEventListener('change', onStoreChange)
}

function getReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function getReducedMotionServer() {
  return false
}

export function HeroSection() {
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getReducedMotionServer,
  )

  return (
    <section className="w-full bg-warm-white">
      <PageHeroIntro
        title={
          <>
            For Them.
            <br />
            For Their Future.
          </>
        }
        description={
          <>
            <p>
              Kubwabo means &ldquo;For Them.&rdquo; youth-led foundation in Rwanda keeping vulnerable children in school, and walking with their families toward a stable future.
            </p>
            <p>One child. One family. For the long run.</p>
          </>
        }
      />

      <div className="relative h-[22rem] w-full overflow-hidden bg-ink sm:h-[32rem] lg:h-dvh lg:min-h-dvh">
        <video
          autoPlay={!reduceMotion}
          muted
          loop={!reduceMotion}
          playsInline
          preload={reduceMotion ? 'metadata' : 'auto'}
          className="absolute inset-0 h-full w-full object-cover object-center"
          aria-label="Group of children laughing together"
        >
          <source src={siteVideos.homeHero} type="video/webm" />
        </video>
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/15 to-transparent"
          aria-hidden
        />
      </div>
    </section>
  )
}