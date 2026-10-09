import type { CollectionConfig } from 'payload'
import { canEditContent, publishedOrEditor } from '../access'
import { iconField } from '../blocks/shared'
import { slugField } from '../fields/slug'
import { revalidateSite, revalidateSiteDelete } from '../hooks/revalidate'
import { previewURL } from '../utilities/paths'

const listField = (name: string, label: string) => ({
  name,
  label,
  type: 'array' as const,
  fields: [{ name: 'text', type: 'text' as const, required: true }],
})

export const LOAN_CATEGORIES = [
  { label: 'Personal Loan', value: 'personal' },
  { label: 'Home Loan', value: 'home' },
  { label: 'Loan Against Property', value: 'lap' },
  { label: 'Business Loan', value: 'business' },
  { label: 'Car / Vehicle Loan', value: 'vehicle' },
  { label: 'Education Loan', value: 'education' },
  { label: 'Gold Loan', value: 'gold' },
  { label: 'Balance Transfer', value: 'balance-transfer' },
  { label: 'Other', value: 'other' },
]

export const LoanProducts: CollectionConfig = {
  slug: 'loan-products',
  labels: { singular: 'Loan product', plural: 'Loan products' },
  admin: {
    group: 'Loan Catalogue',
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'featured', 'sortOrder', '_status'],
    description: 'Each product gets its own page at /loans/<slug> and appears in the enquiry form.',
    livePreview: { url: ({ data }) => previewURL('loan-products', data) },
    preview: (data) => previewURL('loan-products', data),
  },
  defaultSort: 'sortOrder',
  access: {
    read: publishedOrEditor,
    create: canEditContent,
    update: canEditContent,
    delete: canEditContent,
  },
  versions: { drafts: { autosave: { interval: 800 } }, maxPerDoc: 20 },
  hooks: { afterChange: [revalidateSite], afterDelete: [revalidateSiteDelete] },
  fields: [
    { name: 'name', type: 'text', required: true },
    slugField('name'),
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Overview',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'category', type: 'select', required: true, options: LOAN_CATEGORIES },
                { ...iconField(), admin: { width: '50%' } },
              ],
            },
            {
              name: 'tagline',
              type: 'text',
              admin: {
                description: 'One line shown on cards, e.g. "Instant funds for every need"',
              },
            },
            { name: 'shortDescription', type: 'textarea' },
            { name: 'image', type: 'upload', relationTo: 'media' },
            {
              name: 'keyFacts',
              type: 'group',
              label: 'Key facts',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'interestRate',
                      type: 'text',
                      admin: { description: 'e.g. From 10.49% p.a.' },
                    },
                    {
                      name: 'loanAmount',
                      type: 'text',
                      admin: { description: 'e.g. Up to ₹40 Lakh' },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'tenure', type: 'text', admin: { description: 'e.g. 1 – 5 years' } },
                    {
                      name: 'processingFee',
                      type: 'text',
                      admin: { description: 'e.g. Up to 2%' },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Details',
          fields: [
            listField('features', 'Features & benefits'),
            listField('eligibility', 'Eligibility criteria'),
            listField('documents', 'Documents required'),
            { name: 'content', type: 'richText', label: 'Additional content' },
          ],
        },
        {
          label: 'Calculator',
          description: 'Default values for the EMI calculator on this product page',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'calcAmount',
                  type: 'number',
                  label: 'Default amount (₹)',
                  defaultValue: 500000,
                },
                { name: 'calcRate', type: 'number', label: 'Default rate %', defaultValue: 10.5 },
                {
                  name: 'calcTenure',
                  type: 'number',
                  label: 'Default tenure (years)',
                  defaultValue: 5,
                },
                {
                  name: 'calcMaxAmount',
                  type: 'number',
                  label: 'Max amount (₹)',
                  defaultValue: 5000000,
                },
                {
                  name: 'calcMaxTenure',
                  type: 'number',
                  label: 'Max tenure (years)',
                  defaultValue: 7,
                },
              ],
            },
          ],
        },
        {
          label: 'Banks & FAQs',
          fields: [
            {
              name: 'banks',
              type: 'relationship',
              relationTo: 'banks',
              hasMany: true,
              label: 'Partner banks offering this product',
            },
            { name: 'faqs', type: 'relationship', relationTo: 'faqs', hasMany: true },
          ],
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      admin: { position: 'sidebar', description: 'Highlight on the homepage' },
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 10,
      admin: { position: 'sidebar', description: 'Lower numbers appear first' },
    },
  ],
}
