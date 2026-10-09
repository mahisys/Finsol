import type { CollectionConfig } from 'payload'
import { anyone, canEditContent } from '../access'
import { revalidateSite, revalidateSiteDelete } from '../hooks/revalidate'

export const Faqs: CollectionConfig = {
  slug: 'faqs',
  labels: { singular: 'FAQ', plural: 'FAQs' },
  admin: {
    group: 'Website',
    useAsTitle: 'question',
    defaultColumns: ['question', 'category', 'sortOrder'],
  },
  defaultSort: 'sortOrder',
  access: { read: anyone, create: canEditContent, update: canEditContent, delete: canEditContent },
  hooks: { afterChange: [revalidateSite], afterDelete: [revalidateSiteDelete] },
  fields: [
    { name: 'question', type: 'text', required: true },
    { name: 'answer', type: 'textarea', required: true },
    {
      type: 'row',
      fields: [
        {
          name: 'category',
          type: 'select',
          defaultValue: 'general',
          options: [
            { label: 'General', value: 'general' },
            { label: 'Eligibility', value: 'eligibility' },
            { label: 'Documents', value: 'documents' },
            { label: 'Interest & charges', value: 'charges' },
            { label: 'Process', value: 'process' },
          ],
        },
        { name: 'sortOrder', type: 'number', defaultValue: 10 },
      ],
    },
  ],
}
