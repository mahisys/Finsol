'use client'

import { RefreshRouteOnSave } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation'
import React from 'react'

/** Re-renders the page whenever the editor changes something in the admin Live Preview */
export const LivePreviewListener: React.FC = () => {
  const router = useRouter()
  return (
    <RefreshRouteOnSave
      refresh={() => router.refresh()}
      serverURL={
        process.env.NEXT_PUBLIC_SERVER_URL ||
        (typeof window !== 'undefined' ? window.location.origin : '')
      }
    />
  )
}
