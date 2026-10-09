import type { GlobalConfig } from 'payload'
import { anyone, canEditContent } from '../access'
import { linkField } from '../fields/link'
import { revalidateGlobal } from '../hooks/revalidate'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  admin: { group: 'Website' },
  access: { read: anyone, update: canEditContent },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    { name: 'about', type: 'textarea', label: 'Short about text' },
    {
      name: 'columns',
      type: 'array',
      maxRows: 4,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'links', type: 'array', fields: [linkField()] },
      ],
    },
    {
      name: 'bottomLinks',
      type: 'array',
      label: 'Bottom bar links (privacy, terms…)',
      fields: [linkField()],
    },
    {
      name: 'copyright',
      type: 'text',
      admin: { description: 'Leave empty for "© <year> <site name>"' },
    },
  ],
}
