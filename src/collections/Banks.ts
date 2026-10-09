import type { CollectionConfig } from 'payload'
import { anyone, canEditContent, crmManagerFieldLevel, hasRole } from '../access'
import { revalidateSite, revalidateSiteDelete } from '../hooks/revalidate'

export const Banks: CollectionConfig = {
  slug: 'banks',
  labels: { singular: 'Partner bank / NBFC', plural: 'Partner banks & NBFCs' },
  admin: {
    group: 'Loan Catalogue',
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'showOnWebsite', 'defaultCommissionRate'],
    description:
      'Lenders you work with. Logos appear on the website; payout rates are used to calculate commission on disbursed leads (visible only to admins & sales managers).',
  },
  defaultSort: 'sortOrder',
  access: {
    read: anyone,
    create: ({ req: { user } }) => hasRole(user, 'admin', 'editor', 'manager'),
    update: ({ req: { user } }) => hasRole(user, 'admin', 'editor', 'manager'),
    delete: canEditContent,
  },
  hooks: { afterChange: [revalidateSite], afterDelete: [revalidateSiteDelete] },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true },
        {
          name: 'type',
          type: 'select',
          defaultValue: 'bank',
          options: [
            { label: 'Bank', value: 'bank' },
            { label: 'NBFC', value: 'nbfc' },
            { label: 'Housing Finance Co.', value: 'hfc' },
          ],
        },
      ],
    },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'website', type: 'text' },
    {
      name: 'showOnWebsite',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
    { name: 'sortOrder', type: 'number', defaultValue: 10, admin: { position: 'sidebar' } },
    {
      type: 'collapsible',
      label: 'Payout / commission (internal)',
      fields: [
        {
          name: 'defaultCommissionRate',
          type: 'number',
          label: 'Default payout % on disbursed amount',
          min: 0,
          max: 100,
          access: {
            read: crmManagerFieldLevel,
            update: crmManagerFieldLevel,
            create: crmManagerFieldLevel,
          },
        },
        {
          name: 'payoutGrid',
          type: 'array',
          label: 'Product-specific payout %',
          access: {
            read: crmManagerFieldLevel,
            update: crmManagerFieldLevel,
            create: crmManagerFieldLevel,
          },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'product',
                  type: 'relationship',
                  relationTo: 'loan-products',
                  required: true,
                },
                {
                  name: 'rate',
                  type: 'number',
                  label: 'Payout %',
                  required: true,
                  min: 0,
                  max: 100,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'contacts',
      type: 'array',
      label: 'Bank contacts (internal)',
      access: {
        read: crmManagerFieldLevel,
        update: crmManagerFieldLevel,
        create: crmManagerFieldLevel,
      },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'name', type: 'text', required: true },
            { name: 'designation', type: 'text' },
            { name: 'branch', type: 'text' },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'phone', type: 'text' },
            { name: 'email', type: 'email' },
          ],
        },
      ],
    },
  ],
}
