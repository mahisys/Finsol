import type { Field, SelectField } from 'payload'

export const ICON_OPTIONS = [
  'wallet',
  'home',
  'building',
  'briefcase',
  'car',
  'graduation',
  'gold',
  'percent',
  'clock',
  'shield',
  'document',
  'handshake',
  'chart',
  'phone',
  'check',
  'star',
  'users',
  'bank',
].map((v) => ({ label: v.charAt(0).toUpperCase() + v.slice(1), value: v }))

export const iconField = (name = 'icon'): SelectField => ({
  name,
  type: 'select',
  options: ICON_OPTIONS,
})

export const sectionHeader: Field[] = [
  { name: 'eyebrow', type: 'text', label: 'Small label above heading (optional)' },
  { name: 'heading', type: 'text' },
  { name: 'intro', type: 'textarea', label: 'Intro text' },
]

export const backgroundField = (defaultValue = 'white'): SelectField => ({
  name: 'background',
  type: 'select',
  defaultValue,
  options: [
    { label: 'White', value: 'white' },
    { label: 'Light grey', value: 'light' },
    { label: 'Brand colour', value: 'brand' },
    { label: 'Dark', value: 'dark' },
  ],
  admin: { description: 'Background colour of this section' },
})
