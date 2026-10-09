import type { Metadata } from 'next'
import React from 'react'
import { ProductCard } from '@/components/site/blocks'
import { Section, SectionHeader } from '@/components/site/Section'
import { getLoanProducts } from '@/lib/payload'

export const metadata: Metadata = {
  title: 'Loan products',
  description: 'Compare personal, home, business and other loans from leading banks and NBFCs.',
}

export default async function LoansPage() {
  const products = await getLoanProducts()
  return (
    <>
      <section className="page-hero bg-brand">
        <div className="container">
          <h1>Our loan products</h1>
          <p className="hero__sub">
            One application, multiple banks. Pick the loan that fits your need.
          </p>
        </div>
      </section>
      <Section>
        <SectionHeader heading="" />
        <div className="grid grid--3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </Section>
    </>
  )
}
