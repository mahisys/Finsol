import type { Block } from 'payload'
import { linkField } from '../fields/link'
import { backgroundField, iconField, sectionHeader } from './shared'

export const HeroBlock: Block = {
  slug: 'hero',
  labels: { singular: 'Hero banner', plural: 'Hero banners' },
  interfaceName: 'HeroBlock',
  fields: [
    { name: 'eyebrow', type: 'text', label: 'Small label above heading' },
    { name: 'heading', type: 'text', required: true },
    { name: 'subheading', type: 'textarea' },
    {
      name: 'buttons',
      type: 'array',
      maxRows: 3,
      fields: [linkField({ withAppearance: true })],
    },
    {
      name: 'trustPoints',
      type: 'array',
      label: 'Trust points (ticks under the buttons)',
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    {
      name: 'side',
      type: 'radio',
      label: 'Right-hand side shows',
      defaultValue: 'form',
      options: [
        { label: 'Quick enquiry form', value: 'form' },
        { label: 'Image', value: 'image' },
        { label: 'Nothing', value: 'none' },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: { condition: (_, s) => s?.side === 'image' },
    },
    {
      name: 'formHeading',
      type: 'text',
      defaultValue: 'Check your loan eligibility',
      admin: { condition: (_, s) => s?.side === 'form' },
    },
    backgroundField('brand'),
  ],
}

export const ContentBlock: Block = {
  slug: 'content',
  labels: { singular: 'Text content', plural: 'Text content' },
  interfaceName: 'ContentBlock',
  fields: [
    ...sectionHeader,
    {
      name: 'columns',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'size',
          type: 'select',
          defaultValue: 'full',
          options: [
            { label: 'Full width', value: 'full' },
            { label: 'Half', value: 'half' },
            { label: 'One third', value: 'oneThird' },
            { label: 'Two thirds', value: 'twoThirds' },
          ],
        },
        { name: 'richText', type: 'richText', label: 'Text' },
      ],
    },
    backgroundField(),
  ],
}

export const MediaContentBlock: Block = {
  slug: 'mediaContent',
  labels: { singular: 'Image + text', plural: 'Image + text' },
  interfaceName: 'MediaContentBlock',
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text' },
    { name: 'richText', type: 'richText', label: 'Text' },
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    {
      name: 'imagePosition',
      type: 'radio',
      defaultValue: 'right',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
    },
    { name: 'buttons', type: 'array', maxRows: 2, fields: [linkField({ withAppearance: true })] },
    backgroundField(),
  ],
}

export const LoanProductsBlock: Block = {
  slug: 'loanProducts',
  labels: { singular: 'Loan products grid', plural: 'Loan products grids' },
  interfaceName: 'LoanProductsBlock',
  fields: [
    ...sectionHeader,
    {
      name: 'show',
      type: 'radio',
      defaultValue: 'all',
      options: [
        { label: 'All active products', value: 'all' },
        { label: 'Featured products only', value: 'featured' },
        { label: 'Choose manually', value: 'manual' },
      ],
    },
    {
      name: 'products',
      type: 'relationship',
      relationTo: 'loan-products',
      hasMany: true,
      admin: { condition: (_, s) => s?.show === 'manual' },
    },
    backgroundField(),
  ],
}

export const PartnerBanksBlock: Block = {
  slug: 'partnerBanks',
  labels: { singular: 'Partner banks', plural: 'Partner banks' },
  interfaceName: 'PartnerBanksBlock',
  fields: [
    ...sectionHeader,
    {
      name: 'banks',
      type: 'relationship',
      relationTo: 'banks',
      hasMany: true,
      admin: { description: 'Leave empty to show all banks marked "Show on website".' },
    },
    backgroundField(),
  ],
}

export const StatsBlock: Block = {
  slug: 'stats',
  labels: { singular: 'Numbers / stats', plural: 'Numbers / stats' },
  interfaceName: 'StatsBlock',
  fields: [
    ...sectionHeader,
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'value',
              type: 'text',
              required: true,
              admin: { description: 'e.g. ₹500 Cr+' },
            },
            { name: 'label', type: 'text', required: true },
          ],
        },
      ],
    },
    backgroundField('dark'),
  ],
}

export const FeaturesBlock: Block = {
  slug: 'features',
  labels: { singular: 'Features / benefits', plural: 'Features / benefits' },
  interfaceName: 'FeaturesBlock',
  fields: [
    ...sectionHeader,
    {
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      options: ['2', '3', '4'].map((v) => ({ label: `${v} per row`, value: v })),
    },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [
        iconField(),
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
      ],
    },
    backgroundField(),
  ],
}

export const StepsBlock: Block = {
  slug: 'steps',
  labels: { singular: 'Process steps', plural: 'Process steps' },
  interfaceName: 'StepsBlock',
  fields: [
    ...sectionHeader,
    {
      name: 'steps',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
      ],
    },
    backgroundField(),
  ],
}

export const TestimonialsBlock: Block = {
  slug: 'testimonials',
  labels: { singular: 'Testimonials', plural: 'Testimonials' },
  interfaceName: 'TestimonialsBlock',
  fields: [
    ...sectionHeader,
    {
      name: 'testimonials',
      type: 'relationship',
      relationTo: 'testimonials',
      hasMany: true,
      admin: { description: 'Leave empty to show all published testimonials.' },
    },
    backgroundField(),
  ],
}

export const FaqBlock: Block = {
  slug: 'faq',
  labels: { singular: 'FAQs', plural: 'FAQs' },
  interfaceName: 'FaqBlock',
  fields: [
    ...sectionHeader,
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'General', value: 'general' },
        { label: 'Eligibility', value: 'eligibility' },
        { label: 'Documents', value: 'documents' },
        { label: 'Interest & charges', value: 'charges' },
        { label: 'Process', value: 'process' },
      ],
      admin: { description: 'Show FAQs from this category (leave empty for all).' },
    },
    {
      name: 'faqs',
      type: 'relationship',
      relationTo: 'faqs',
      hasMany: true,
      admin: { description: 'Or pick specific FAQs (overrides category).' },
    },
    backgroundField(),
  ],
}

export const CtaBlock: Block = {
  slug: 'cta',
  labels: { singular: 'Call to action', plural: 'Calls to action' },
  interfaceName: 'CtaBlock',
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'text', type: 'textarea' },
    { name: 'buttons', type: 'array', maxRows: 2, fields: [linkField({ withAppearance: true })] },
    backgroundField('brand'),
  ],
}

export const LeadFormBlock: Block = {
  slug: 'leadForm',
  labels: { singular: 'Loan enquiry form', plural: 'Loan enquiry forms' },
  interfaceName: 'LeadFormBlock',
  fields: [
    ...sectionHeader,
    {
      name: 'defaultProduct',
      type: 'relationship',
      relationTo: 'loan-products',
      admin: { description: 'Pre-select this loan type in the form (optional).' },
    },
    { name: 'submitLabel', type: 'text', defaultValue: 'Get a call back' },
    {
      name: 'successMessage',
      type: 'textarea',
      defaultValue: 'Thank you! Our loan expert will call you shortly.',
    },
    {
      name: 'anchorId',
      type: 'text',
      defaultValue: 'apply',
      admin: { description: 'Buttons can link to #apply to scroll here.' },
    },
    backgroundField('light'),
  ],
}

export const EmiCalculatorBlock: Block = {
  slug: 'emiCalculator',
  labels: { singular: 'EMI calculator', plural: 'EMI calculators' },
  interfaceName: 'EmiCalculatorBlock',
  fields: [
    ...sectionHeader,
    {
      type: 'row',
      fields: [
        {
          name: 'defaultAmount',
          type: 'number',
          defaultValue: 500000,
          label: 'Default amount (₹)',
        },
        { name: 'defaultRate', type: 'number', defaultValue: 10.5, label: 'Default interest %' },
        { name: 'defaultTenure', type: 'number', defaultValue: 5, label: 'Default tenure (years)' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'maxAmount', type: 'number', defaultValue: 10000000, label: 'Max amount (₹)' },
        { name: 'maxTenure', type: 'number', defaultValue: 30, label: 'Max tenure (years)' },
      ],
    },
    backgroundField(),
  ],
}

export const pageBlocks: Block[] = [
  HeroBlock,
  ContentBlock,
  MediaContentBlock,
  LoanProductsBlock,
  PartnerBanksBlock,
  StatsBlock,
  FeaturesBlock,
  StepsBlock,
  TestimonialsBlock,
  FaqBlock,
  CtaBlock,
  LeadFormBlock,
  EmiCalculatorBlock,
]
