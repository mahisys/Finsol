type Linkable = { slug?: string | null }

export type LinkableCollection = 'pages' | 'loan-products' | 'posts'

/** Public URL path for a document */
export const pathFor = (
  collection: LinkableCollection,
  doc: Linkable | null | undefined,
): string => {
  const slug = doc?.slug || ''
  switch (collection) {
    case 'pages':
      return !slug || slug === 'home' ? '/' : `/${slug}`
    case 'loan-products':
      return `/loans/${slug}`
    case 'posts':
      return `/blog/${slug}`
  }
}

/** URL that turns on Next.js draft mode and redirects to the page (used by Preview + Live Preview) */
export const previewURL = (
  collection: LinkableCollection,
  doc: Linkable | null | undefined,
): string => {
  const params = new URLSearchParams({
    path: pathFor(collection, doc),
    previewSecret: process.env.PREVIEW_SECRET || '',
  })
  return `/next/preview?${params.toString()}`
}
