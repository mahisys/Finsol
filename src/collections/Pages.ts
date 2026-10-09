import type { CollectionConfig } from 'payload'
import { canEditContent, publishedOrEditor } from '../access'
import { pageBlocks } from '../blocks'
import { slugField } from '../fields/slug'
import { revalidateSite, revalidateSiteDelete } from '../hooks/revalidate'
import { previewURL } from '../utilities/paths'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Page', plural: 'Pages' },
  admin: {
    group: 'Website',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    description:
      'Build pages by stacking sections (blocks). The page with slug "home" is the homepage.',
    livePreview: { url: ({ data }) => previewURL('pages', data) },
    preview: (data) => previewURL('pages', data),
  },
  access: {
    read: publishedOrEditor,
    create: canEditContent,
    update: canEditContent,
    delete: canEditContent,
  },
  versions: {
    drafts: { autosave: { interval: 800 }, schedulePublish: true },
    maxPerDoc: 30,
  },
  hooks: { afterChange: [revalidateSite], afterDelete: [revalidateSiteDelete] },
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField(),
    {
      name: 'layout',
      label: 'Page sections',
      type: 'blocks',
      blocks: pageBlocks,
      admin: { initCollapsed: true },
    },
  ],
}
