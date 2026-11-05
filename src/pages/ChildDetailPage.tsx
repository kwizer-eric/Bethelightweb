import { useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useCms } from '../cms/CmsContext'

function toEmbedUrl(raw: string): string | null {
  try {
    const url = new URL(raw.trim())
    const host = url.hostname.replace(/^www\./, '')

    if (host === 'youtu.be') {
      const id = url.pathname.slice(1)
      return id ? `https://www.youtube.com/embed/${id}` : null
    }
    if (host.includes('youtube.com')) {
      const id = url.searchParams.get('v') || url.pathname.split('/embed/')[1]
      return id ? `https://www.youtube.com/embed/${id}` : null
    }
    if (host.includes('vimeo.com')) {
      const id = url.pathname.split('/').filter(Boolean).pop()
      return id ? `https://player.vimeo.com/video/${id}` : null
    }
    if (/\.(mp4|webm|ogg)(\?|$)/i.test(url.pathname)) return null
    return null
  } catch {
    return null
  }
}

function isDirectVideo(raw: string) {
  return /\.(mp4|webm|ogg)(\?|$)/i.test(raw)
}

export function ChildDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { children, ready } = useCms()
  const child = useMemo(
    () => children.find((c) => c.id === id),
    [children, id],
  )
  const photos = useMemo(() => {
    if (!child) return []
    const extras = child.gallery ?? []
    return [child.image, ...extras.filter((url) => url && url !== child.image)]
  }, [child])
  const [active, setActive] = useState(0)
  const [media, setMedia] = useState<'photo' | 'video'>('photo')

  if (!ready) {
    return (
      <div className="bg-warm-white py-24 text-center text-sm text-primary/55">
        Loading…
      </div>
    )
  }

  if (!child) {
    return <Navigate to="/programs/every-kid-deserves-it" replace />
  }

  const photo = photos[Math.min(active, photos.length - 1)] ?? child.image
  const video = child.video?.trim() || ''
  const embed = video ? toEmbedUrl(video) : null
  const direct = video ? isDirectVideo(video) : false
  const hasVideo = Boolean(embed || direct)

  return (
    <div className="bg-warm-white text-primary">
      <div className="site-container max-w-3xl py-10 sm:py-14 lg:py-16">
        <Link
          to="/programs/every-kid-deserves-it#children"
          className="text-sm text-primary/55 transition-colors hover:text-primary"
        >
          ← Back
        </Link>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
                {child.name}
              </h1>
              {child.urgent ? (
                <span className="bg-accent px-2 py-0.5 text-[10px] font-semibold tracking-wide text-ink uppercase">
                  Urgent
                </span>
              ) : null}
            </div>
            <p className="mt-1 text-sm text-primary/60">{child.dream}</p>
          </div>
          <Link
            to={`/donate?for=${child.id}`}
            className="inline-flex items-center justify-center bg-primary px-5 py-2 text-sm font-medium text-warm-white"
          >
            Sponsor · ${child.monthlyNeed}/mo
          </Link>
        </div>

        {/* Compact media */}
        <div className="mt-8">
          {hasVideo ? (
            <div className="mb-3 flex gap-2">
              <button
                type="button"
                onClick={() => setMedia('photo')}
                className={`px-3 py-1 text-xs font-medium ${
                  media === 'photo'
                    ? 'bg-primary text-warm-white'
                    : 'border border-primary/20 text-primary/60'
                }`}
              >
                Photos
              </button>
              <button
                type="button"
                onClick={() => setMedia('video')}
                className={`px-3 py-1 text-xs font-medium ${
                  media === 'video'
                    ? 'bg-primary text-warm-white'
                    : 'border border-primary/20 text-primary/60'
                }`}
              >
                Video
              </button>
            </div>
          ) : null}

          {media === 'video' && hasVideo ? (
            <div className="relative aspect-video w-full overflow-hidden bg-ink">
              {embed ? (
                <iframe
                  title={`${child.name} video`}
                  src={embed}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={video}
                  controls
                  className="absolute inset-0 h-full w-full object-contain"
                />
              )}
            </div>
          ) : (
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-primary/5 sm:aspect-[16/10]">
              <img
                src={photo}
                alt={child.name}
                referrerPolicy="no-referrer"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          )}

          {media === 'photo' && photos.length > 1 ? (
            <div className="mt-2 flex gap-1.5 overflow-x-auto">
              {photos.map((url, index) => (
                <button
                  key={`${url}-${index}`}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-label={`Photo ${index + 1}`}
                  className={`relative h-12 w-12 shrink-0 overflow-hidden sm:h-14 sm:w-14 ${
                    index === active ? 'ring-2 ring-primary' : 'opacity-50'
                  }`}
                >
                  <img
                    src={url}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        {/* Tiny meta row */}
        <p className="mt-6 text-xs tracking-wide text-primary/50 uppercase">
          {child.age} yrs · {child.grade} · {child.school} · {child.location}
        </p>

        <p className="mt-5 text-base leading-relaxed text-primary/85 sm:text-lg">
          {child.story}
        </p>

        <div className="mt-10 flex flex-wrap gap-3 border-t border-primary/10 pt-8">
          <Link
            to={`/donate?for=${child.id}`}
            className="inline-flex items-center justify-center bg-primary px-6 py-2.5 text-sm font-medium text-warm-white"
          >
            Sponsor {child.name}
          </Link>
          <Link
            to="/programs/every-kid-deserves-it#children"
            className="inline-flex items-center justify-center border border-primary/25 px-6 py-2.5 text-sm font-medium text-primary"
          >
            See other children
          </Link>
        </div>
      </div>
    </div>
  )
}
