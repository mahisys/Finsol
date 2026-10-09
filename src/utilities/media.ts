import type { Media } from '@/payload-types'

export type MaybeMedia = number | Media | null | undefined

export const mediaUrl = (m: MaybeMedia, size?: 'thumbnail' | 'card' | 'hero'): string | null => {
  if (!m || typeof m !== 'object') return null
  return (size && m.sizes?.[size]?.url) || m.url || null
}
