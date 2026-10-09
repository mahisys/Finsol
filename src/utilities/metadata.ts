import type { Metadata } from 'next'
import { mediaUrl, type MaybeMedia } from './media'

type WithMeta = {
  title?: string | null
  name?: string | null
  meta?: { title?: string | null; description?: string | null; image?: MaybeMedia } | null
}

export const buildMetadata = (doc: WithMeta, path: string, absoluteTitle = false): Metadata => {
  const title = doc.meta?.title || doc.title || doc.name || undefined
  const image = mediaUrl(doc.meta?.image)
  return {
    title: title && absoluteTitle ? { absolute: title } : title,
    description: doc.meta?.description || undefined,
    alternates: { canonical: path },
    openGraph: {
      title: title,
      description: doc.meta?.description || undefined,
      url: path,
      images: image ? [image] : undefined,
    },
  }
}
