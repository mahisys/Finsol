/** Minimal helpers to build Lexical rich-text JSON for seeding */
type Node = { [k: string]: unknown; type: string; version: number }

const text = (t: string, bold = false): Node => ({
  type: 'text',
  text: t,
  format: bold ? 1 : 0,
  detail: 0,
  mode: 'normal',
  style: '',
  version: 1,
})

const block = (type: string, children: Node[], extra: Record<string, unknown> = {}): Node => ({
  type,
  children,
  direction: 'ltr',
  format: '',
  indent: 0,
  version: 1,
  ...extra,
})

export const p = (t: string) => block('paragraph', [text(t)], { textFormat: 0, textStyle: '' })
export const h = (t: string, tag: 'h2' | 'h3' = 'h2') => block('heading', [text(t)], { tag })
export const ul = (items: string[]) =>
  block(
    'list',
    items.map((i, idx) => block('listitem', [text(i)], { value: idx + 1 })),
    { listType: 'bullet', start: 1, tag: 'ul' },
  )

export const doc = (...children: Node[]) => ({
  root: {
    type: 'root',
    children,
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    version: 1,
  },
})
