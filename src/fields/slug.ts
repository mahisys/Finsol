import type { Field, FieldHook } from 'payload'

export const slugify = (val: string): string =>
  val
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')

const formatSlug =
  (fallback: string): FieldHook =>
  ({ value, originalDoc, data }) => {
    if (typeof value === 'string' && value.length > 0) return slugify(value)
    const fallbackData = data?.[fallback] || originalDoc?.[fallback]
    if (typeof fallbackData === 'string') return slugify(fallbackData)
    return value
  }

/** URL slug, auto-generated from another field (default: title) when left empty */
export const slugField = (fieldToUse = 'title'): Field => ({
  name: 'slug',
  type: 'text',
  index: true,
  unique: true,
  label: 'URL slug',
  admin: {
    position: 'sidebar',
    description: `Part of the page address. Leave empty to generate it from the ${fieldToUse}.`,
  },
  hooks: { beforeValidate: [formatSlug(fieldToUse)] },
})
