import type { Field, GroupField } from 'payload'

type LinkOptions = {
  name?: string
  label?: string
  withAppearance?: boolean
  required?: boolean
}

/** A link that points either to a CMS page / loan product, or to any custom URL */
export const linkField = ({
  name = 'link',
  label = 'Link',
  withAppearance = false,
  required = false,
}: LinkOptions = {}): GroupField => {
  const fields: Field[] = [
    {
      type: 'row',
      fields: [
        {
          name: 'type',
          type: 'radio',
          defaultValue: 'reference',
          options: [
            { label: 'Internal page', value: 'reference' },
            { label: 'Custom URL', value: 'custom' },
          ],
          admin: { layout: 'horizontal', width: '50%' },
        },
        {
          name: 'newTab',
          type: 'checkbox',
          label: 'Open in new tab',
          admin: { width: '50%', style: { alignSelf: 'flex-end' } },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'reference',
          type: 'relationship',
          relationTo: ['pages', 'loan-products', 'posts'],
          required,
          admin: { condition: (_, s) => s?.type !== 'custom', width: '50%' },
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL',
          required,
          admin: {
            condition: (_, s) => s?.type === 'custom',
            width: '50%',
            description: 'e.g. /contact, https://..., tel:+91..., or #apply',
          },
        },
        { name: 'label', type: 'text', required, admin: { width: '50%' } },
      ],
    },
  ]

  if (withAppearance) {
    fields.push({
      name: 'appearance',
      type: 'select',
      defaultValue: 'primary',
      options: [
        { label: 'Primary button', value: 'primary' },
        { label: 'Secondary button', value: 'secondary' },
        { label: 'Text link', value: 'link' },
      ],
    })
  }

  return { name, label, type: 'group', fields, admin: { hideGutter: true } }
}
