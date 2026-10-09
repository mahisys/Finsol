import type { GlobalConfig } from 'payload'
import { anyone, canEditContent } from '../access'
import { linkField } from '../fields/link'
import { revalidateGlobal } from '../hooks/revalidate'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header & menu',
  admin: { group: 'Website' },
  access: { read: anyone, update: canEditContent },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      name: 'announcement',
      type: 'text',
      label: 'Top announcement bar (optional)',
      admin: { description: 'e.g. Home loans from 8.35% p.a. – limited period offer!' },
    },
    {
      name: 'navItems',
      type: 'array',
      label: 'Menu items',
      maxRows: 8,
      fields: [
        linkField(),
        {
          name: 'children',
          type: 'array',
          label: 'Drop-down items',
          fields: [linkField()],
        },
      ],
    },
    {
      name: 'showLoanMenu',
      type: 'checkbox',
      defaultValue: true,
      label: 'Add a "Loans" drop-down listing all loan products automatically',
    },
    linkField({ name: 'cta', label: 'Header button' }),
  ],
}
