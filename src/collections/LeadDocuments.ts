import path from 'path'
import type { CollectionConfig } from 'payload'
import { crmStaff, isCrmManager, leadChildAccess } from '../access'

/** Customer KYC / income documents. Stored outside the public folder and only served to CRM staff. */
export const LeadDocuments: CollectionConfig = {
  slug: 'lead-documents',
  labels: { singular: 'Customer document', plural: 'Customer documents' },
  admin: {
    group: 'CRM',
    useAsTitle: 'filename',
    defaultColumns: ['filename', 'lead', 'documentType', 'verified', 'createdAt'],
  },
  access: {
    read: leadChildAccess,
    create: crmStaff,
    update: leadChildAccess,
    delete: ({ req: { user } }) => isCrmManager(user),
  },
  upload: {
    staticDir:
      process.env.PRIVATE_UPLOADS_DIR ||
      path.resolve(process.cwd(), 'private-uploads/lead-documents'),
    mimeTypes: ['image/*', 'application/pdf'],
  },
  fields: [
    { name: 'lead', type: 'relationship', relationTo: 'leads', required: true, index: true },
    {
      name: 'documentType',
      type: 'select',
      required: true,
      options: [
        { label: 'PAN card', value: 'pan' },
        { label: 'Aadhaar', value: 'aadhaar' },
        { label: 'Photo', value: 'photo' },
        { label: 'Salary slips', value: 'salary-slips' },
        { label: 'Bank statement', value: 'bank-statement' },
        { label: 'ITR / Form 16', value: 'itr' },
        { label: 'Business proof', value: 'business-proof' },
        { label: 'Property papers', value: 'property' },
        { label: 'Sanction letter', value: 'sanction-letter' },
        { label: 'Other', value: 'other' },
      ],
    },
    { name: 'verified', type: 'checkbox' },
    { name: 'notes', type: 'textarea' },
  ],
}
