import path from 'path'
import type { CollectionConfig } from 'payload'
import { anyone, canEditContent } from '../access'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Image / file', plural: 'Media library' },
  admin: { group: 'Website', description: 'Images and files used on the public website.' },
  access: {
    read: anyone,
    create: canEditContent,
    update: canEditContent,
    delete: canEditContent,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Alt text',
      admin: { description: 'Short description of the image (helps SEO and accessibility).' },
    },
  ],
  upload: {
    staticDir: process.env.MEDIA_DIR || path.resolve(process.cwd(), 'media'),
    mimeTypes: ['image/*', 'application/pdf', 'image/svg+xml'],
    focalPoint: true,
    imageSizes: [
      { name: 'thumbnail', width: 400 },
      { name: 'card', width: 800 },
      { name: 'hero', width: 1600 },
    ],
  },
}
