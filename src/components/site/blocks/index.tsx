import Link from 'next/link'
import React from 'react'
import type { Bank, Faq, LoanProduct, Page, Testimonial } from '@/payload-types'
import { getGlobals, getLoanProducts, getPayloadClient } from '@/lib/payload'
import { mediaUrl } from '@/utilities/media'
import { CmsLink } from '../CmsLink'
import { EmiCalculator } from '../EmiCalculator'
import { Icon } from '../Icon'
import { LeadForm } from '../LeadForm'
import { RichText } from '../RichText'
import { Section, SectionHeader } from '../Section'

type Block = NonNullable<Page['layout']>[number]
type BlockOf<T extends Block['blockType']> = Extract<Block, { blockType: T }>

const isObj = <T,>(v: number | T | null | undefined): v is T => !!v && typeof v === 'object'
const idOf = (v: number | { id: number } | null | undefined) =>
  typeof v === 'object' && v ? v.id : v

/* ---------- Hero ---------- */
const Hero = async ({ block }: { block: BlockOf<'hero'> }) => {
  const [products, { settings }] = await Promise.all([getLoanProducts(), getGlobals()])
  const image = mediaUrl(block.image, 'hero')
  return (
    <section className={`hero bg-${block.background || 'brand'}`}>
      <div className="container hero__inner">
        <div className="hero__copy">
          {block.eyebrow && <p className="eyebrow">{block.eyebrow}</p>}
          <h1>{block.heading}</h1>
          {block.subheading && <p className="hero__sub">{block.subheading}</p>}
          {!!block.buttons?.length && (
            <div className="btn-row">
              {block.buttons.map((b) => (
                <CmsLink key={b.id} link={b.link} asButton />
              ))}
            </div>
          )}
          {!!block.trustPoints?.length && (
            <ul className="trust-points">
              {block.trustPoints.map((t) => (
                <li key={t.id}>
                  <Icon name="check" size={20} /> {t.text}
                </li>
              ))}
            </ul>
          )}
        </div>
        {block.side === 'form' && (
          <div className="hero__card card">
            <h3>{block.formHeading || 'Check your loan eligibility'}</h3>
            <LeadForm
              compact
              products={products.map((p) => ({ id: p.id, name: p.name }))}
              consentText={settings.consentText}
            />
          </div>
        )}
        {block.side === 'image' && image && (
          <div className="hero__media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt={isObj(block.image) ? block.image.alt : ''} />
          </div>
        )}
      </div>
    </section>
  )
}

/* ---------- Content ---------- */
const Content = ({ block }: { block: BlockOf<'content'> }) => (
  <Section background={block.background}>
    <SectionHeader eyebrow={block.eyebrow} heading={block.heading} intro={block.intro} />
    <div className="columns">
      {block.columns?.map((c) => (
        <div key={c.id} className={`col col--${c.size || 'full'}`}>
          <RichText data={c.richText} />
        </div>
      ))}
    </div>
  </Section>
)

/* ---------- Image + text ---------- */
const MediaContent = ({ block }: { block: BlockOf<'mediaContent'> }) => {
  const img = mediaUrl(block.image, 'card')
  return (
    <Section background={block.background}>
      <div className={`media-content media-content--${block.imagePosition || 'right'}`}>
        <div>
          {block.eyebrow && <p className="eyebrow">{block.eyebrow}</p>}
          {block.heading && <h2>{block.heading}</h2>}
          <RichText data={block.richText} />
          {!!block.buttons?.length && (
            <div className="btn-row">
              {block.buttons.map((b) => (
                <CmsLink key={b.id} link={b.link} asButton />
              ))}
            </div>
          )}
        </div>
        {img && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={img}
            alt={isObj(block.image) ? block.image.alt : ''}
            className="media-content__img"
          />
        )}
      </div>
    </Section>
  )
}

/* ---------- Loan products ---------- */
export const ProductCard = ({ product }: { product: LoanProduct }) => (
  <Link href={`/loans/${product.slug}`} className="card product-card">
    <span className="product-card__icon">
      <Icon name={product.icon} size={28} />
    </span>
    <h3>{product.name}</h3>
    {product.tagline && <p className="muted">{product.tagline}</p>}
    <dl className="facts">
      {product.keyFacts?.interestRate && (
        <div>
          <dt>Interest</dt>
          <dd>{product.keyFacts.interestRate}</dd>
        </div>
      )}
      {product.keyFacts?.loanAmount && (
        <div>
          <dt>Amount</dt>
          <dd>{product.keyFacts.loanAmount}</dd>
        </div>
      )}
    </dl>
    <span className="product-card__more">
      Know more <Icon name="arrow" size={16} />
    </span>
  </Link>
)

const LoanProducts = async ({ block }: { block: BlockOf<'loanProducts'> }) => {
  let products = await getLoanProducts()
  if (block.show === 'featured') products = products.filter((p) => p.featured)
  if (block.show === 'manual') {
    const ids = (block.products || []).map(idOf)
    products = ids.map((id) => products.find((p) => p.id === id)).filter(Boolean) as LoanProduct[]
  }
  return (
    <Section background={block.background}>
      <SectionHeader eyebrow={block.eyebrow} heading={block.heading} intro={block.intro} />
      <div className="grid grid--3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </Section>
  )
}

/* ---------- Partner banks ---------- */
const PartnerBanks = async ({ block }: { block: BlockOf<'partnerBanks'> }) => {
  let banks: Bank[]
  if (block.banks?.length) {
    banks = block.banks.filter(isObj)
  } else {
    const payload = await getPayloadClient()
    banks = (
      await payload.find({
        collection: 'banks',
        where: { showOnWebsite: { equals: true } },
        limit: 100,
        sort: 'sortOrder',
      })
    ).docs
  }
  return (
    <Section background={block.background}>
      <SectionHeader eyebrow={block.eyebrow} heading={block.heading} intro={block.intro} />
      <ul className="bank-strip">
        {banks.map((b) => {
          const logo = mediaUrl(b.logo, 'thumbnail')
          return (
            <li key={b.id} title={b.name}>
              {logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logo} alt={b.name} />
              ) : (
                <span>{b.name}</span>
              )}
            </li>
          )
        })}
      </ul>
    </Section>
  )
}

/* ---------- Stats ---------- */
const Stats = ({ block }: { block: BlockOf<'stats'> }) => (
  <Section background={block.background}>
    <SectionHeader eyebrow={block.eyebrow} heading={block.heading} intro={block.intro} />
    <dl className="stats">
      {block.items?.map((i) => (
        <div key={i.id}>
          <dd>{i.value}</dd>
          <dt>{i.label}</dt>
        </div>
      ))}
    </dl>
  </Section>
)

/* ---------- Features ---------- */
const Features = ({ block }: { block: BlockOf<'features'> }) => (
  <Section background={block.background}>
    <SectionHeader eyebrow={block.eyebrow} heading={block.heading} intro={block.intro} />
    <div className={`grid grid--${block.columns || '3'}`}>
      {block.items?.map((i) => (
        <div key={i.id} className="feature">
          <span className="feature__icon">
            <Icon name={i.icon} size={26} />
          </span>
          <h3>{i.title}</h3>
          {i.description && <p>{i.description}</p>}
        </div>
      ))}
    </div>
  </Section>
)

/* ---------- Steps ---------- */
const Steps = ({ block }: { block: BlockOf<'steps'> }) => (
  <Section background={block.background}>
    <SectionHeader eyebrow={block.eyebrow} heading={block.heading} intro={block.intro} />
    <ol className="steps">
      {block.steps?.map((s, i) => (
        <li key={s.id}>
          <span className="steps__num">{i + 1}</span>
          <h3>{s.title}</h3>
          {s.description && <p>{s.description}</p>}
        </li>
      ))}
    </ol>
  </Section>
)

/* ---------- Testimonials ---------- */
const Testimonials = async ({ block }: { block: BlockOf<'testimonials'> }) => {
  let items: Testimonial[]
  if (block.testimonials?.length) items = block.testimonials.filter(isObj)
  else {
    const payload = await getPayloadClient()
    items = (
      await payload.find({
        collection: 'testimonials',
        where: { published: { equals: true } },
        limit: 12,
      })
    ).docs
  }
  return (
    <Section background={block.background}>
      <SectionHeader eyebrow={block.eyebrow} heading={block.heading} intro={block.intro} />
      <div className="grid grid--3">
        {items.map((t) => (
          <figure key={t.id} className="card testimonial">
            <div className="stars" aria-label={`${t.rating || 5} out of 5`}>
              {'★'.repeat(t.rating || 5)}
              <span className="stars__off">{'★'.repeat(5 - (t.rating || 5))}</span>
            </div>
            <blockquote>“{t.quote}”</blockquote>
            <figcaption>
              <strong>{t.name}</strong>
              <span className="muted">{[t.loanType, t.location].filter(Boolean).join(' · ')}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  )
}

/* ---------- FAQ ---------- */
export const FaqList = ({ faqs }: { faqs: Faq[] }) => (
  <div className="faq">
    {faqs.map((f) => (
      <details key={f.id}>
        <summary>{f.question}</summary>
        <p>{f.answer}</p>
      </details>
    ))}
  </div>
)

const FaqSection = async ({ block }: { block: BlockOf<'faq'> }) => {
  let faqs: Faq[]
  if (block.faqs?.length) faqs = block.faqs.filter(isObj)
  else {
    const payload = await getPayloadClient()
    faqs = (
      await payload.find({
        collection: 'faqs',
        where: block.category ? { category: { equals: block.category } } : undefined,
        limit: 50,
        sort: 'sortOrder',
      })
    ).docs
  }
  return (
    <Section background={block.background}>
      <SectionHeader eyebrow={block.eyebrow} heading={block.heading} intro={block.intro} />
      <FaqList faqs={faqs} />
    </Section>
  )
}

/* ---------- CTA ---------- */
const Cta = ({ block }: { block: BlockOf<'cta'> }) => (
  <Section background={block.background} className="cta">
    <div className="cta__inner">
      <div>
        <h2>{block.heading}</h2>
        {block.text && <p>{block.text}</p>}
      </div>
      <div className="btn-row">
        {block.buttons?.map((b) => (
          <CmsLink key={b.id} link={b.link} asButton />
        ))}
      </div>
    </div>
  </Section>
)

/* ---------- Lead form ---------- */
export const LeadFormSection = async ({ block }: { block: BlockOf<'leadForm'> }) => {
  const [products, { settings }] = await Promise.all([getLoanProducts(), getGlobals()])
  return (
    <Section background={block.background} id={block.anchorId || 'apply'}>
      <div className="lead-section">
        <SectionHeader
          eyebrow={block.eyebrow}
          heading={block.heading}
          intro={block.intro}
          align="left"
        />
        <div className="card">
          <LeadForm
            products={products.map((p) => ({ id: p.id, name: p.name }))}
            defaultProduct={idOf(block.defaultProduct as number | LoanProduct | null)}
            submitLabel={block.submitLabel}
            successMessage={block.successMessage}
            consentText={settings.consentText}
          />
        </div>
      </div>
    </Section>
  )
}

/* ---------- EMI calculator ---------- */
const Emi = ({ block }: { block: BlockOf<'emiCalculator'> }) => (
  <Section background={block.background} id="emi-calculator">
    <SectionHeader eyebrow={block.eyebrow} heading={block.heading} intro={block.intro} />
    <EmiCalculator
      defaultAmount={block.defaultAmount}
      defaultRate={block.defaultRate}
      defaultTenure={block.defaultTenure}
      maxAmount={block.maxAmount}
      maxTenure={block.maxTenure}
    />
  </Section>
)

export const RenderBlocks = ({ blocks }: { blocks?: Page['layout'] }) => {
  if (!blocks?.length) return null
  return (
    <>
      {blocks.map((block, i) => {
        const key = block.id || `${block.blockType}-${i}`
        switch (block.blockType) {
          case 'hero':
            return <Hero key={key} block={block} />
          case 'content':
            return <Content key={key} block={block} />
          case 'mediaContent':
            return <MediaContent key={key} block={block} />
          case 'loanProducts':
            return <LoanProducts key={key} block={block} />
          case 'partnerBanks':
            return <PartnerBanks key={key} block={block} />
          case 'stats':
            return <Stats key={key} block={block} />
          case 'features':
            return <Features key={key} block={block} />
          case 'steps':
            return <Steps key={key} block={block} />
          case 'testimonials':
            return <Testimonials key={key} block={block} />
          case 'faq':
            return <FaqSection key={key} block={block} />
          case 'cta':
            return <Cta key={key} block={block} />
          case 'leadForm':
            return <LeadFormSection key={key} block={block} />
          case 'emiCalculator':
            return <Emi key={key} block={block} />
          default:
            return null
        }
      })}
    </>
  )
}
