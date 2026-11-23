import { FadeImage } from '../FadeImage'

type ProgramStoryImageProps = {
  src: string
  alt: string
  /** Focal point when `object-cover` crops (e.g. keep faces in frame) */
  objectPosition?: string
  /** Load immediately (above-the-fold story bands) */
  priority?: boolean
}

function rasterFallbackSrc(avifSrc: string) {
  return avifSrc.replace(/\.avif$/i, '.jpg')
}

export function ProgramStoryImage({
  src,
  alt,
  objectPosition,
  priority = true,
}: ProgramStoryImageProps) {
  // Local /images/*.avif may have a .jpg twin; remote Cloudinary URLs should stay as-is.
  const fallback =
    src.startsWith('/images/') && src.toLowerCase().endsWith('.avif')
      ? rasterFallbackSrc(src)
      : null
  const imageClass =
    'h-[22rem] w-full object-cover sm:h-[28rem] lg:h-[36rem] xl:h-[40rem]'
  const imageStyle = objectPosition ? { objectPosition } : undefined

  return (
    <section className="border-b border-primary/15 bg-warm-white pb-16 sm:pb-20 lg:pb-24">
      {/* Mobile: edge-to-edge, no radius. sm+: site gutters + rounded frame. */}
      <div className="w-full sm:mx-auto sm:max-w-7xl sm:px-6 lg:px-8 xl:max-w-[calc(100%-4rem)] 2xl:max-w-[calc(100%-5rem)]">
        <div className="overflow-hidden sm:rounded-3xl">
          {fallback ? (
            <picture>
              <source srcSet={src} type="image/avif" />
              <FadeImage
                priority={priority}
                src={fallback}
                alt={alt}
                referrerPolicy="no-referrer"
                className={imageClass}
                style={imageStyle}
              />
            </picture>
          ) : (
            <FadeImage
              priority={priority}
              src={src}
              alt={alt}
              referrerPolicy="no-referrer"
              className={imageClass}
              style={imageStyle}
            />
          )}
        </div>
      </div>
    </section>
  )
}