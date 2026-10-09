import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'
import { RenderBlocks } from '@/components/site/blocks'
import { getBySlug } from '@/lib/payload'
import { buildMetadata } from '@/utilities/metadata'

type Args = { params: Promise<{ slug?: string[] }> }

const slugFrom = async (params: Args['params']) => {
  const { slug } = await params
  return slug?.length ? slug.map(decodeURIComponent).join('/') : 'home'
}

export default async function Page({ params }: Args) {
  const page = await getBySlug('pages', await slugFrom(params))
  if (!page) notFound()
  return <RenderBlocks blocks={page.layout} />
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const slug = await slugFrom(params)
  const page = await getBySlug('pages', slug)
  if (!page) return {}
  return buildMetadata(page, slug === 'home' ? '/' : `/${slug}`, slug === 'home')
}
