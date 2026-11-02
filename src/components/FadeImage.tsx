import { useState, type ImgHTMLAttributes, type Ref } from 'react'

type FadeImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  priority?: boolean
  ref?: Ref<HTMLImageElement>
}

export function FadeImage({
  priority = false,
  className = '',
  onLoad,
  ref,
  ...props
}: FadeImageProps) {
  const [ready, setReady] = useState(false)
  const [seenSrc, setSeenSrc] = useState(props.src)

  if (seenSrc !== props.src) {
    setSeenSrc(props.src)
    setReady(false)
  }

  return (
    <img
      {...props}
      ref={(node) => {
        if (typeof ref === 'function') ref(node)
        else if (ref) ref.current = node
        if (node?.complete && node.naturalWidth > 0) setReady(true)
      }}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      onLoad={(event) => {
        setReady(true)
        onLoad?.(event)
      }}
      onError={() => setReady(true)}
      className={`site-img${ready ? ' is-ready' : ''}${className ? ` ${className}` : ''}`}
    />
  )
}
