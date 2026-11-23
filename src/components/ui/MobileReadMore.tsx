import { Children, useState, type ReactNode } from 'react'

type MobileReadMoreProps = {
  children: ReactNode
  /** How many leading children stay visible when collapsed (mobile only) */
  previewCount?: number
  buttonClassName: string
  /** Keep extra copy collapsed on desktop until expanded (hero intros). */
  collapseOnDesktop?: boolean
}

export function MobileReadMore({
  children,
  previewCount = 1,
  buttonClassName,
  collapseOnDesktop = false,
}: MobileReadMoreProps) {
  const [open, setOpen] = useState(false)
  const items = Children.toArray(children)
  const preview = items.slice(0, previewCount)
  const rest = items.slice(previewCount)

  if (rest.length === 0) return <>{children}</>

  return (
    <>
      {preview}
      <div
        className={
          open ? 'contents' : collapseOnDesktop ? 'hidden' : 'hidden sm:contents'
        }
      >
        {rest}
      </div>
      <button
        type="button"
        className={`mt-6 ${collapseOnDesktop ? '' : 'sm:hidden'} ${buttonClassName}`}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? 'Show less' : 'Read more'}
      </button>
    </>
  )
}
