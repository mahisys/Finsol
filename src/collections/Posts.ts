import type { CollectionConfig } from 'payload'
import { canEditContent, publishedOrEditor } from '../access'
import { slugField } from '../fields/slug'
import { revalidateSite, revalidateSiteDelete } from '../hooks/revalidate'
import { previewURL } from '../utilities/paths'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Blog post', plural: 'Blog posts' },
  admin: {
    group: 'Website',
    useAsTitle: 'title',
    defaultColumns: ['title', 'publishedAt', '_status'],
    livePreview: { url: ({ data }) => previewURL('posts', data) },
    preview: (data) => previewURL('posts', data),
  },
  defaultSort: '-publishedAt',
  access: {
    read: publishedOrEditor,
    create: canEditContent,
    update: canEditContent,
    delete: canEditContent,
  },
  versions: { drafts: { autosave: { interval: 800 }, schedulePublish: true }, maxPerDoc: 20 },
  hooks: {
    afterChange: [revalidateSite],
    afterDelete: [revalidateSiteDelete],
    beforeChange: [
      ({ data }) => {
        if (data._status === 'published' && !data.publishedAt)
          data.publishedAt = new Date().toISOString()
        return data
      },
    ],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField(),
    {
      name: 'excerpt',
      type: 'textarea',
      admin: { description: 'Short summary shown on the blog list.' },
    },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    { name: 'content', type: 'richText', required: true },
    {
      name: 'publishedAt',
      type: 'date',
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayOnly' } },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      admin: { position: 'sidebar' },
    },
    {
      name: 'tags',
      type: 'text',
      hasMany: true,
      admin: { position: 'sidebar' },
    },
  ],
}
