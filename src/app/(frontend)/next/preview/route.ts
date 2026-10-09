import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'

/** Enables draft mode for logged-in admins, then redirects to the page being previewed */
export async function GET(req: Request): Promise<Response> {
  const { searchParams } = new URL(req.url)
  const path = searchParams.get('path') || '/'
  const secret = searchParams.get('previewSecret')

  if (!process.env.PREVIEW_SECRET || secret !== process.env.PREVIEW_SECRET) {
    return new Response('Invalid preview link', { status: 403 })
  }
  if (!path.startsWith('/') || path.startsWith('//')) {
    return new Response('Invalid path', { status: 400 })
  }

  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers: req.headers })
  if (!user) return new Response('Please log in to the admin panel to preview', { status: 403 })

  ;(await draftMode()).enable()
  redirect(path)
}
