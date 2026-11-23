import { Link, type LinkProps as RouterLinkProps } from 'react-router-dom'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent'
type Size = 'sm' | 'md' | 'lg'

const variants: Record<Variant, string> = {
  primary:
    'bg-primary text-warm-white hover:bg-ink focus-visible:ring-primary',
  secondary:
    'bg-warm-white text-ink hover:bg-accent hover:text-ink focus-visible:ring-primary',
  accent:
    'bg-accent text-ink hover:bg-accent focus-visible:ring-accent',
  outline:
    'border-2 border-primary text-ink hover:bg-primary hover:text-warm-white focus-visible:ring-primary',
  ghost: 'text-ink hover:bg-primary/10 focus-visible:ring-primary',
}

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

type BaseProps = {
  variant?: Variant
  size?: Size
  children: ReactNode
  className?: string
}

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    to?: undefined
  }

type ButtonAsLink = BaseProps &
  Omit<RouterLinkProps, 'className' | 'children'> & {
    to: string
  }

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const {
    variant = 'primary',
    size = 'md',
    children,
    className = '',
    ...rest
  } = props

  const classes = `inline-flex items-center justify-center rounded-lg font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-warm-white disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`

  if ('to' in rest && rest.to) {
    const { to, ...linkRest } = rest
    return (
      <Link to={to} className={classes} {...linkRest}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  )
}
