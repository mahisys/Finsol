import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'
import { Section } from '@/components/site/Section'
import { getPayloadClient } from '@/lib/payload'
import { mediaUrl } from '@/utilities/media'

export const metadata: Metadata = { title: 'Blog', description: 'Loan tips, guides and updates.' }

export default async function BlogPage() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'posts',
    limit: 50,
    sort: '-publishedAt',
    depth: 1,
  })
  return (
    <>
      <section className="page-hero bg-brand">
        <div className="container">
          <h1>Blog & guides</h1>
          <p className="hero__sub">Simple, practical advice on loans, credit scores and money.</p>
        </div>
      </section>
      <Section>
        {docs.length === 0 && <p className="muted">No posts yet.</p>}
        <div className="grid grid--3">
          {docs.map((post) => {
            const img = mediaUrl(post.coverImage, 'card')
            return (
              <Link key={post.id} href={`/blog/${post.slug}`} className="card post-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {img && <img src={img} alt="" />}
                <div className="post-card__body">
                  {post.publishedAt && (
                    <time className="muted">
                      {new Date(post.publishedAt).toLocaleDateString('en-IN', {
                        dateStyle: 'medium',
                      })}
                    </time>
                  )}
                  <h3>{post.title}</h3>
                  {post.excerpt && <p>{post.excerpt}</p>}
                </div>
              </Link>
            )
          })}
        </div>
      </Section>
    </>
  )
}
