import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'
import type { Bank, Faq } from '@/payload-types'
import { FaqList } from '@/components/site/blocks'
import { EmiCalculator } from '@/components/site/EmiCalculator'
import { Icon } from '@/components/site/Icon'
import { LeadForm } from '@/components/site/LeadForm'
import { RichText } from '@/components/site/RichText'
import { Section, SectionHeader } from '@/components/site/Section'
import { getBySlug, getGlobals, getLoanProducts } from '@/lib/payload'
import { mediaUrl } from '@/utilities/media'
import { buildMetadata } from '@/utilities/metadata'

type Args = { params: Promise<{ slug: string }> }

const List = ({
  items,
  icon = 'check',
}: {
  items?: { id?: string | null; text: string }[] | null
  icon?: string
}) =>
  items?.length ? (
    <ul className="ticks">
      {items.map((i) => (
        <li key={i.id}>
          <Icon name={icon} size={20} /> {i.text}
        </li>
      ))}
    </ul>
  ) : null

export default async function LoanProductPage({ params }: Args) {
  const { slug } = await params
  const [product, products, { settings }] = await Promise.all([
    getBySlug('loan-products', slug),
    getLoanProducts(),
    getGlobals(),
  ])
  if (!product) notFound()

  const facts = [
    ['Interest rate', product.keyFacts?.interestRate],
    ['Loan amount', product.keyFacts?.loanAmount],
    ['Tenure', product.keyFacts?.tenure],
    ['Processing fee', product.keyFacts?.processingFee],
  ].filter(([, v]) => v)
  const banks = (product.banks || []).filter((b): b is Bank => typeof b === 'object')
  const faqs = (product.faqs || []).filter((f): f is Faq => typeof f === 'object')
  const image = mediaUrl(product.image, 'card')

  return (
    <>
      <section className="hero bg-brand">
        <div className="container hero__inner">
          <div className="hero__copy">
            <p className="eyebrow">
              <Icon name={product.icon} size={18} /> Loans
            </p>
            <h1>{product.name}</h1>
            {product.tagline && <p className="hero__sub">{product.tagline}</p>}
            {product.shortDescription && <p>{product.shortDescription}</p>}
            {facts.length > 0 && (
              <dl className="hero-facts">
                {facts.map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
          <div className="hero__card card" id="apply">
            <h3>Apply for {product.name}</h3>
            <LeadForm
              compact
              products={products.map((p) => ({ id: p.id, name: p.name }))}
              defaultProduct={product.id}
              consentText={settings.consentText}
            />
          </div>
        </div>
      </section>

      <Section>
        <div className="product-details">
          <div>
            {!!product.features?.length && (
              <>
                <h2>Features & benefits</h2>
                <List items={product.features} />
              </>
            )}
            {!!product.eligibility?.length && (
              <>
                <h2>Eligibility</h2>
                <List items={product.eligibility} icon="users" />
              </>
            )}
            {!!product.documents?.length && (
              <>
                <h2>Documents required</h2>
                <List items={product.documents} icon="document" />
              </>
            )}
            <RichText data={product.content} />
          </div>
          {image && (
            <aside>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt={product.name} className="rounded" />
            </aside>
          )}
        </div>
      </Section>

      <Section background="light" id="emi-calculator">
        <SectionHeader
          heading={`${product.name} EMI calculator`}
          intro="Plan your repayments before you apply."
        />
        <EmiCalculator
          defaultAmount={product.calcAmount}
          defaultRate={product.calcRate}
          defaultTenure={product.calcTenure}
          maxAmount={product.calcMaxAmount}
          maxTenure={product.calcMaxTenure}
        />
      </Section>

      {banks.length > 0 && (
        <Section>
          <SectionHeader heading="Lenders we work with for this loan" />
          <ul className="bank-strip">
            {banks.map((b) => {
              const logo = mediaUrl(b.logo, 'thumbnail')
              return (
                <li key={b.id}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {logo ? <img src={logo} alt={b.name} /> : <span>{b.name}</span>}
                </li>
              )
            })}
          </ul>
        </Section>
      )}

      {faqs.length > 0 && (
        <Section background="light">
          <SectionHeader heading="Frequently asked questions" />
          <FaqList faqs={faqs} />
        </Section>
      )}
    </>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const product = await getBySlug('loan-products', slug)
  if (!product) return {}
  const meta = buildMetadata(product, `/loans/${slug}`)
  return {
    ...meta,
    description: meta.description || product.shortDescription || product.tagline || undefined,
  }
}
