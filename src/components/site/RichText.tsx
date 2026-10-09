import { RichText as LexicalRichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import React from 'react'

export const RichText: React.FC<{ data?: unknown; className?: string }> = ({ data, className }) => {
  if (!data || typeof data !== 'object') return null
  return (
    <div className={['prose', className].filter(Boolean).join(' ')}>
      <LexicalRichText data={data as SerializedEditorState} />
    </div>
  )
}
