import type { MetadataRoute } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { getServerSideURL } from '@/utilities/getURL'
import { pathFor } from '@/utilities/paths'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config: configPromise })
  const base = getServerSideURL()
  const [pages, products, posts] = await Promise.all([
    payload.find({
      collection: 'pages',
      limit: 1000,
      depth: 0,
      select: { slug: true, updatedAt: true },
    }),
    payload.find({
      collection: 'loan-products',
      limit: 1000,
      depth: 0,
      select: { slug: true, updatedAt: true },
    }),
    payload.find({
      collection: 'posts',
      limit: 1000,
      depth: 0,
      select: { slug: true, updatedAt: true },
    }),
  ])
  return [
    ...pages.docs.map((d) => ({ url: base + pathFor('pages', d), lastModified: d.updatedAt })),
    { url: `${base}/loans` },
    ...products.docs.map((d) => ({
      url: base + pathFor('loan-products', d),
      lastModified: d.updatedAt,
    })),
    { url: `${base}/blog` },
    ...posts.docs.map((d) => ({ url: base + pathFor('posts', d), lastModified: d.updatedAt })),
  ]
}
