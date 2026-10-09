export const LEAD_STATUSES = [
  { label: 'New', value: 'new' },
  { label: 'Contacted', value: 'contacted' },
  { label: 'Interested', value: 'interested' },
  { label: 'Documents pending', value: 'docs-pending' },
  { label: 'Documents collected', value: 'docs-collected' },
  { label: 'Logged in with bank', value: 'logged-in' },
  { label: 'Under bank review', value: 'under-review' },
  { label: 'Sanctioned', value: 'sanctioned' },
  { label: 'Disbursed', value: 'disbursed' },
  { label: 'On hold', value: 'on-hold' },
  { label: 'Rejected by bank', value: 'rejected' },
  { label: 'Not interested / lost', value: 'lost' },
] as const

export type LeadStatus = (typeof LEAD_STATUSES)[number]['value']

/** Statuses after which the lead needs no further work */
export const CLOSED_STATUSES: LeadStatus[] = ['disbursed', 'rejected', 'lost']
export const OPEN_STATUSES: LeadStatus[] = LEAD_STATUSES.map((s) => s.value).filter(
  (s) => !CLOSED_STATUSES.includes(s),
)

export const statusLabel = (value?: string | null) =>
  LEAD_STATUSES.find((s) => s.value === value)?.label ?? value ?? '—'

export const LEAD_SOURCES = [
  { label: 'Website form', value: 'website' },
  { label: 'Phone call', value: 'phone' },
  { label: 'WhatsApp', value: 'whatsapp' },
  { label: 'Walk-in', value: 'walk-in' },
  { label: 'Referral', value: 'referral' },
  { label: 'Connector / sub-DSA', value: 'connector' },
  { label: 'Social media', value: 'social' },
  { label: 'Paid ads', value: 'ads' },
  { label: 'Other', value: 'other' },
]

export const EMPLOYMENT_TYPES = [
  { label: 'Salaried', value: 'salaried' },
  { label: 'Self-employed (business)', value: 'self-employed-business' },
  { label: 'Self-employed (professional)', value: 'self-employed-professional' },
  { label: 'Retired / pensioner', value: 'retired' },
  { label: 'Other', value: 'other' },
]

export const formatINR = (n?: number | null) =>
  typeof n === 'number'
    ? new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
      }).format(n)
    : '—'
