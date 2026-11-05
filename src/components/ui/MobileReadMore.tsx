import { Children, useState, type ReactNode } from 'react'

type MobileReadMoreProps = {
  children: ReactNode
  /** How many leading children stay visible when collapsed (mobile only) */
  previewCount?: number
  buttonClassName: string
}

export function MobileReadMore({
  children,
  previewCount = 1,
  buttonClassName,
}: MobileReadMoreProps) {
  const [open, setOpen] = useState(false)
  const items = Children.toArray(children)
  const preview = items.slice(0, previewCount)
  const rest = items.slice(previewCount)

  if (rest.length === 0) return <>{children}</>

  return (
    <>
      {preview}
      <div className={open ? 'contents' : 'hidden sm:contents'}>{rest}</div>
      <button
        type="button"
        className={`mt-6 sm:hidden ${buttonClassName}`}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? 'Show less' : 'Read more'}
      </button>
    </>
  )
}
