import type {
  CollectionAfterChangeHook,
  CollectionBeforeChangeHook,
  CollectionConfig,
} from 'payload'
import { crmManagerFieldLevel, crmStaff, hasRole, isCrmManager, leadAccess } from '../access'
import {
  EMPLOYMENT_TYPES,
  LEAD_SOURCES,
  LEAD_STATUSES,
  OPEN_STATUSES,
  formatINR,
  statusLabel,
} from '../lib/crm'

const relId = (v: unknown): number | string | undefined => {
  if (v && typeof v === 'object' && 'id' in v) return (v as { id: number | string }).id
  if (typeof v === 'number' || typeof v === 'string') return v
  return undefined
}

/** Lead number, owner, duplicate check, commission calculation */
const beforeChange: CollectionBeforeChangeHook = async ({ data, operation, req, originalDoc }) => {
  const { payload, user } = req

  if (operation === 'create') {
    // Sequential, human friendly lead number: FS-00001
    const last = await payload.find({
      collection: 'leads',
      sort: '-createdAt',
      limit: 1,
      depth: 0,
      overrideAccess: true,
      req,
      select: { leadNumber: true },
    })
    const lastNum = Number(String(last.docs[0]?.leadNumber ?? '').replace(/\D/g, '')) || 0
    data.leadNumber = `FS-${String(lastNum + 1).padStart(5, '0')}`

    // Agents creating a lead own it
    if (!data.assignedTo && user && hasRole(user, 'agent') && !isCrmManager(user)) {
      data.assignedTo = user.id
    }

    // Auto-assign to the least busy active agent if enabled in settings
    if (!data.assignedTo) {
      const settings = await payload.findGlobal({
        slug: 'site-settings',
        depth: 0,
        req,
        overrideAccess: true,
      })
      if (settings?.crm?.autoAssign) {
        const agents = await payload.find({
          collection: 'users',
          where: { and: [{ roles: { contains: 'agent' } }, { active: { not_equals: false } }] },
          limit: 100,
          depth: 0,
          overrideAccess: true,
          req,
        })
        let best: { id: number | string; load: number } | null = null
        for (const agent of agents.docs) {
          const { totalDocs } = await payload.count({
            collection: 'leads',
            where: {
              and: [{ assignedTo: { equals: agent.id } }, { status: { in: OPEN_STATUSES } }],
            },
            overrideAccess: true,
            req,
          })
          if (!best || totalDocs < best.load) best = { id: agent.id, load: totalDocs }
        }
        if (best) data.assignedTo = best.id
      }
    }

    // Flag possible duplicates (same phone, still open)
    if (data.phone) {
      const { totalDocs } = await payload.count({
        collection: 'leads',
        where: { and: [{ phone: { equals: data.phone } }, { status: { in: OPEN_STATUSES } }] },
        overrideAccess: true,
        req,
      })
      data.possibleDuplicate = totalDocs > 0
    }
  }

  // Commission = disbursed amount × payout % (from bank payout grid unless overridden)
  const disbursed = data.disbursedAmount ?? originalDoc?.disbursedAmount
  const bankId = relId(data.disbursingBank ?? originalDoc?.disbursingBank)
  const productId = relId(data.loanProduct ?? originalDoc?.loanProduct)
  let rate: number | null | undefined = data.commission?.rate ?? originalDoc?.commission?.rate

  if ((rate === null || rate === undefined) && bankId) {
    const bank = await payload.findByID({
      collection: 'banks',
      id: bankId,
      depth: 0,
      overrideAccess: true,
      req,
    })
    const gridRate = bank?.payoutGrid?.find((row) => relId(row.product) === productId)?.rate
    rate = gridRate ?? bank?.defaultCommissionRate ?? null
    if (rate !== null && rate !== undefined) data.commission = { ...(data.commission || {}), rate }
  }
  if (typeof disbursed === 'number' && typeof rate === 'number') {
    data.commission = { ...(data.commission || {}), amount: Math.round((disbursed * rate) / 100) }
  }

  return data
}

/** Timeline entry on status / owner change + email alert for new website enquiries */
const afterChange: CollectionAfterChangeHook = async ({ doc, previousDoc, operation, req }) => {
  const { payload } = req
  if (req.context?.skipLeadHooks) return doc

  const entries: string[] = []
  if (operation === 'create') entries.push(`Lead created (source: ${doc.source || 'unknown'})`)
  if (operation === 'update' && previousDoc?.status !== doc.status) {
    entries.push(`Status changed: ${statusLabel(previousDoc?.status)} → ${statusLabel(doc.status)}`)
  }
  if (operation === 'update' && relId(previousDoc?.assignedTo) !== relId(doc.assignedTo)) {
    const assignee = relId(doc.assignedTo)
      ? await payload.findByID({
          collection: 'users',
          id: relId(doc.assignedTo)!,
          depth: 0,
          overrideAccess: true,
          req,
        })
      : null
    entries.push(`Assigned to ${assignee?.name ?? 'nobody'}`)
  }
  for (const summary of entries) {
    await payload.create({
      collection: 'lead-activities',
      data: { lead: doc.id, type: 'system', summary },
      overrideAccess: true,
      req,
      context: { fromLeadHook: true },
    })
  }

  if (operation === 'create' && doc.source === 'website') {
    try {
      const settings = await payload.findGlobal({
        slug: 'site-settings',
        depth: 0,
        req,
        overrideAccess: true,
      })
      const to = (settings?.crm?.notifyEmails || []).map((r) => r.email).filter(Boolean)
      if (to.length) {
        const product = relId(doc.loanProduct)
          ? await payload.findByID({
              collection: 'loan-products',
              id: relId(doc.loanProduct)!,
              depth: 0,
              overrideAccess: true,
              req,
            })
          : null
        const adminUrl = `${process.env.NEXT_PUBLIC_SERVER_URL || ''}/admin/collections/leads/${doc.id}`
        await payload.sendEmail({
          to,
          subject: `New loan enquiry ${doc.leadNumber}: ${doc.fullName} – ${product?.name ?? 'Loan'}`,
          html: `<p><strong>${doc.fullName}</strong> (${doc.phone}${doc.email ? ', ' + doc.email : ''}) enquired about <strong>${product?.name ?? 'a loan'}</strong>.</p>
<p>Amount: ${formatINR(doc.amountRequired)}<br/>City: ${doc.city ?? '—'}<br/>Monthly income: ${formatINR(doc.monthlyIncome)}</p>
<p><a href="${adminUrl}">Open lead in CRM</a></p>`,
        })
      }
    } catch (err) {
      payload.logger.error({ err, msg: 'Failed to send new-lead notification' })
    }
  }

  return doc
}

const managerOnly = {
  read: crmManagerFieldLevel,
  create: crmManagerFieldLevel,
  update: crmManagerFieldLevel,
}

export const Leads: CollectionConfig = {
  slug: 'leads',
  labels: { singular: 'Lead', plural: 'Leads' },
  admin: {
    group: 'CRM',
    useAsTitle: 'fullName',
    defaultColumns: [
      'leadNumber',
      'fullName',
      'phone',
      'loanProduct',
      'amountRequired',
      'status',
      'assignedTo',
      'nextFollowUp',
    ],
    listSearchableFields: ['fullName', 'phone', 'email', 'leadNumber', 'city'],
    description:
      'Every enquiry from the website lands here automatically. Track it from first call to disbursal.',
    pagination: { defaultLimit: 50 },
  },
  defaultSort: '-createdAt',
  access: {
    read: leadAccess,
    create: crmStaff,
    update: leadAccess,
    delete: ({ req: { user } }) => isCrmManager(user),
  },
  hooks: { beforeChange: [beforeChange], afterChange: [afterChange] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Applicant',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'fullName', type: 'text', required: true, label: 'Full name' },
                { name: 'phone', type: 'text', required: true, index: true, label: 'Mobile' },
                { name: 'alternatePhone', type: 'text' },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'email', type: 'email' },
                {
                  name: 'dateOfBirth',
                  type: 'date',
                  admin: { date: { pickerAppearance: 'dayOnly' } },
                },
                { name: 'pan', type: 'text', label: 'PAN' },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'city', type: 'text' },
                { name: 'pincode', type: 'text' },
              ],
            },
            { name: 'address', type: 'textarea' },
            {
              type: 'row',
              fields: [
                { name: 'employmentType', type: 'select', options: EMPLOYMENT_TYPES },
                { name: 'employerName', type: 'text', label: 'Employer / business name' },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'monthlyIncome', type: 'number', label: 'Monthly income (₹)' },
                { name: 'existingEmis', type: 'number', label: 'Existing EMIs (₹/month)' },
                { name: 'cibilScore', type: 'number', label: 'CIBIL score', min: 300, max: 900 },
              ],
            },
          ],
        },
        {
          label: 'Loan requirement',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'loanProduct',
                  type: 'relationship',
                  relationTo: 'loan-products',
                  label: 'Loan type',
                },
                { name: 'amountRequired', type: 'number', label: 'Amount required (₹)' },
                { name: 'tenureYears', type: 'number', label: 'Tenure (years)' },
              ],
            },
            { name: 'purpose', type: 'textarea' },
            {
              type: 'collapsible',
              label: 'Property details (home loan / LAP)',
              admin: { initCollapsed: true },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'propertyType',
                      type: 'select',
                      options: [
                        { label: 'Ready flat / apartment', value: 'ready' },
                        { label: 'Under construction', value: 'under-construction' },
                        { label: 'Independent house', value: 'house' },
                        { label: 'Plot + construction', value: 'plot-construction' },
                        { label: 'Commercial', value: 'commercial' },
                      ],
                    },
                    { name: 'propertyValue', type: 'number', label: 'Property value (₹)' },
                    { name: 'propertyCity', type: 'text' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Bank processing',
          fields: [
            {
              name: 'bankApplications',
              type: 'array',
              label: 'Files logged with banks',
              admin: { description: 'Add a row for every bank / NBFC this file was logged with.' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'bank', type: 'relationship', relationTo: 'banks', required: true },
                    { name: 'applicationRef', type: 'text', label: 'Application / LAN no.' },
                    {
                      name: 'loginDate',
                      type: 'date',
                      admin: { date: { pickerAppearance: 'dayOnly' } },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'status',
                      type: 'select',
                      defaultValue: 'logged',
                      options: [
                        { label: 'Logged in', value: 'logged' },
                        { label: 'Query raised', value: 'query' },
                        { label: 'Approved / sanctioned', value: 'approved' },
                        { label: 'Rejected', value: 'rejected' },
                        { label: 'Disbursed', value: 'disbursed' },
                        { label: 'Withdrawn', value: 'withdrawn' },
                      ],
                    },
                    { name: 'sanctionedAmount', type: 'number', label: 'Sanctioned (₹)' },
                    { name: 'interestRate', type: 'number', label: 'ROI %' },
                  ],
                },
                { name: 'remarks', type: 'textarea' },
              ],
            },
            {
              type: 'collapsible',
              label: 'Final disbursal',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'disbursingBank', type: 'relationship', relationTo: 'banks' },
                    { name: 'sanctionedAmount', type: 'number', label: 'Sanctioned amount (₹)' },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'disbursedAmount',
                      type: 'number',
                      label: 'Disbursed amount (₹)',
                      validate: (val: unknown, { data }: { data: Record<string, unknown> }) =>
                        data?.status === 'disbursed' && !val
                          ? 'Required when status is "Disbursed"'
                          : true,
                    },
                    {
                      name: 'disbursalDate',
                      type: 'date',
                      admin: { date: { pickerAppearance: 'dayOnly' } },
                    },
                  ],
                },
              ],
            },
            {
              name: 'commission',
              type: 'group',
              label: 'Commission / payout (managers only)',
              access: managerOnly,
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'rate',
                      type: 'number',
                      label: 'Payout %',
                      admin: {
                        description: 'Auto-filled from the bank’s payout grid. Override if needed.',
                      },
                    },
                    {
                      name: 'amount',
                      type: 'number',
                      label: 'Commission (₹)',
                      admin: { readOnly: true, description: 'Calculated automatically.' },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'status',
                      type: 'select',
                      defaultValue: 'pending',
                      options: [
                        { label: 'Pending', value: 'pending' },
                        { label: 'Invoiced', value: 'invoiced' },
                        { label: 'Received', value: 'received' },
                      ],
                    },
                    {
                      name: 'receivedOn',
                      type: 'date',
                      admin: { date: { pickerAppearance: 'dayOnly' } },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Timeline & documents',
          fields: [
            {
              name: 'activities',
              type: 'join',
              collection: 'lead-activities',
              on: 'lead',
              label: 'Calls, notes & history',
              defaultSort: '-createdAt',
              admin: { defaultColumns: ['type', 'summary', 'createdBy', 'createdAt'] },
            },
            {
              name: 'documents',
              type: 'join',
              collection: 'lead-documents',
              on: 'lead',
              label: 'KYC & income documents',
              admin: { defaultColumns: ['filename', 'documentType', 'verified'] },
            },
          ],
        },
        {
          label: 'Source',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'source', type: 'select', options: LEAD_SOURCES, defaultValue: 'phone' },
                { name: 'referredBy', type: 'text', label: 'Referred by / connector' },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'utmSource', type: 'text', admin: { readOnly: true } },
                { name: 'utmMedium', type: 'text', admin: { readOnly: true } },
                { name: 'utmCampaign', type: 'text', admin: { readOnly: true } },
              ],
            },
            { name: 'landingPage', type: 'text', admin: { readOnly: true } },
            {
              type: 'row',
              fields: [
                {
                  name: 'consent',
                  type: 'checkbox',
                  label: 'Consented to be contacted',
                  admin: { readOnly: true },
                },
                { name: 'consentAt', type: 'date', admin: { readOnly: true } },
              ],
            },
            {
              name: 'message',
              type: 'textarea',
              label: 'Message from website form',
              admin: { readOnly: true },
            },
          ],
        },
      ],
    },
    // Sidebar
    {
      name: 'leadNumber',
      type: 'text',
      index: true,
      admin: { position: 'sidebar', readOnly: true },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'new',
      index: true,
      options: [...LEAD_STATUSES],
      admin: { position: 'sidebar' },
    },
    {
      name: 'priority',
      type: 'select',
      defaultValue: 'warm',
      options: [
        { label: '🔥 Hot', value: 'hot' },
        { label: 'Warm', value: 'warm' },
        { label: 'Cold', value: 'cold' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'assignedTo',
      type: 'relationship',
      relationTo: 'users',
      index: true,
      filterOptions: { roles: { in: ['agent', 'manager', 'admin'] } },
      access: { update: crmManagerFieldLevel },
      admin: { position: 'sidebar', description: 'Only managers can reassign.' },
    },
    {
      name: 'nextFollowUp',
      type: 'date',
      index: true,
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayAndTime' } },
    },
    {
      name: 'possibleDuplicate',
      type: 'checkbox',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Another open lead has the same mobile number.',
        condition: (data) => Boolean(data?.possibleDuplicate),
      },
    },
  ],
}
