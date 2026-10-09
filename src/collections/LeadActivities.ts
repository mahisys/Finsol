import type { CollectionConfig } from 'payload'
import { crmStaff, isCrmManager, leadChildAccess } from '../access'

export const LeadActivities: CollectionConfig = {
  slug: 'lead-activities',
  labels: { singular: 'Activity / note', plural: 'Activities & notes' },
  admin: {
    group: 'CRM',
    useAsTitle: 'summary',
    defaultColumns: ['lead', 'type', 'summary', 'createdBy', 'createdAt'],
    description: 'Calls, meetings, WhatsApps and notes logged against leads.',
  },
  defaultSort: '-createdAt',
  access: {
    read: leadChildAccess,
    create: crmStaff,
    update: ({ req: { user } }) =>
      isCrmManager(user) ? true : user ? { createdBy: { equals: user.id } } : false,
    delete: ({ req: { user } }) => isCrmManager(user),
  },
  hooks: {
    beforeChange: [
      ({ data, req, operation }) => {
        if (operation === 'create' && req.user && !req.context?.fromLeadHook)
          data.createdBy = req.user.id
        return data
      },
    ],
    afterChange: [
      // Logging a follow-up date here updates the lead's "next follow-up"
      async ({ doc, req, operation }) => {
        if (operation !== 'create' || req.context?.fromLeadHook) return doc
        const leadId = typeof doc.lead === 'object' ? doc.lead?.id : doc.lead
        if (leadId && doc.nextFollowUp) {
          await req.payload.update({
            collection: 'leads',
            id: leadId,
            data: { nextFollowUp: doc.nextFollowUp },
            overrideAccess: true,
            req,
            context: { skipLeadHooks: true },
          })
        }
        return doc
      },
    ],
  },
  fields: [
    { name: 'lead', type: 'relationship', relationTo: 'leads', required: true, index: true },
    {
      type: 'row',
      fields: [
        {
          name: 'type',
          type: 'select',
          required: true,
          defaultValue: 'call',
          options: [
            { label: '📞 Call', value: 'call' },
            { label: '💬 WhatsApp / SMS', value: 'whatsapp' },
            { label: '✉️ Email', value: 'email' },
            { label: '🤝 Meeting / visit', value: 'meeting' },
            { label: '📝 Note', value: 'note' },
            { label: '⚙️ System', value: 'system' },
          ],
        },
        {
          name: 'nextFollowUp',
          type: 'date',
          label: 'Schedule next follow-up',
          admin: { date: { pickerAppearance: 'dayAndTime' } },
        },
      ],
    },
    { name: 'summary', type: 'text', required: true },
    { name: 'details', type: 'textarea' },
    {
      name: 'createdBy',
      type: 'relationship',
      relationTo: 'users',
      admin: { readOnly: true, position: 'sidebar' },
    },
  ],
}
