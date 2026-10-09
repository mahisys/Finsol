import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'
import { RichText } from '@/components/site/RichText'
import { getBySlug } from '@/lib/payload'
import { mediaUrl } from '@/utilities/media'
import { buildMetadata } from '@/utilities/metadata'

type Args = { params: Promise<{ slug: string }> }

export default async function PostPage({ params }: Args) {
  const { slug } = await params
  const post = await getBySlug('posts', slug)
  if (!post) notFound()
  const img = mediaUrl(post.coverImage, 'hero')
  return (
    <article>
      <section className="page-hero bg-brand">
        <div className="container container--narrow">
          {post.publishedAt && (
            <p className="eyebrow">
              {new Date(post.publishedAt).toLocaleDateString('en-IN', { dateStyle: 'long' })}
            </p>
          )}
          <h1>{post.title}</h1>
          {post.excerpt && <p className="hero__sub">{post.excerpt}</p>}
        </div>
      </section>
      <div className="section">
        <div className="container container--narrow">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {img && <img src={img} alt="" className="rounded post-cover" />}
          <RichText data={post.content} />
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const post = await getBySlug('posts', slug)
  if (!post) return {}
  const meta = buildMetadata(post, `/blog/${slug}`)
  return { ...meta, description: meta.description || post.excerpt || undefined }
}
