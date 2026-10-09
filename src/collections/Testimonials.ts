import type { CollectionConfig } from 'payload'
import { canEditContent, hasRole } from '../access'
import { revalidateSite, revalidateSiteDelete } from '../hooks/revalidate'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    group: 'Website',
    useAsTitle: 'name',
    defaultColumns: ['name', 'loanType', 'rating', 'published'],
  },
  access: {
    read: ({ req: { user } }) =>
      hasRole(user, 'admin', 'editor') ? true : { published: { equals: true } },
    create: canEditContent,
    update: canEditContent,
    delete: canEditContent,
  },
  hooks: { afterChange: [revalidateSite], afterDelete: [revalidateSiteDelete] },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'location', type: 'text' },
        { name: 'loanType', type: 'text', admin: { description: 'e.g. Home Loan' } },
      ],
    },
    { name: 'quote', type: 'textarea', required: true },
    { name: 'rating', type: 'number', min: 1, max: 5, defaultValue: 5 },
    { name: 'photo', type: 'upload', relationTo: 'media' },
    { name: 'published', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
  ],
}
