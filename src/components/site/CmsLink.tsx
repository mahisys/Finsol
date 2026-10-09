import Link from 'next/link'
import React from 'react'
import { pathFor, type LinkableCollection } from '@/utilities/paths'

export type LinkData = {
  type?: ('reference' | 'custom') | null
  newTab?: boolean | null
  reference?: { relationTo: string; value: unknown } | null
  url?: string | null
  label?: string | null
  appearance?: ('primary' | 'secondary' | 'link') | null
}

export const resolveHref = (link?: LinkData | null): string | null => {
  if (!link) return null
  if (link.type === 'custom') return link.url || null
  const ref = link.reference
  if (ref && typeof ref.value === 'object' && ref.value) {
    return pathFor(ref.relationTo as LinkableCollection, ref.value as { slug?: string })
  }
  return link.url || null
}

export const CmsLink: React.FC<{
  link?: LinkData | null
  className?: string
  children?: React.ReactNode
  asButton?: boolean
}> = ({ link, className, children, asButton }) => {
  const href = resolveHref(link)
  if (!href) return null
  const appearance = link?.appearance || (asButton ? 'primary' : 'link')
  const cls = [className, appearance !== 'link' ? `btn btn--${appearance}` : '']
    .filter(Boolean)
    .join(' ')
  const content = children ?? link?.label
  const external = /^(https?:|tel:|mailto:)/.test(href)
  if (external || link?.newTab) {
    return (
      <a
        href={href}
        className={cls}
        {...(link?.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {content}
      </a>
    )
  }
  return (
    <Link href={href} className={cls}>
      {content}
    </Link>
  )
}
