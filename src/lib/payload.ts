import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import { cache } from 'react'

export const getPayloadClient = () => getPayload({ config: configPromise })

/** Whether the current request is an admin preview (shows drafts) */
export const isDraft = async () => (await draftMode()).isEnabled

export const getGlobals = cache(async () => {
  const payload = await getPayloadClient()
  const [settings, header, footer] = await Promise.all([
    payload.findGlobal({ slug: 'site-settings', depth: 1 }),
    payload.findGlobal({ slug: 'header', depth: 1 }),
    payload.findGlobal({ slug: 'footer', depth: 1 }),
  ])
  return { settings, header, footer }
})

export const getLoanProducts = cache(async () => {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'loan-products',
    limit: 100,
    depth: 1,
    sort: 'sortOrder',
  })
  return res.docs
})

export const getBySlug = cache(
  async <T extends 'pages' | 'posts' | 'loan-products'>(collection: T, slug: string) => {
    const payload = await getPayloadClient()
    const draft = await isDraft()
    const res = await payload.find({
      collection,
      where: { slug: { equals: slug } },
      draft,
      overrideAccess: draft,
      limit: 1,
      depth: 2,
    })
    return res.docs[0] ?? null
  },
)
