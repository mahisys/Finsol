import type { Endpoint } from 'payload'
import { EMPLOYMENT_TYPES } from './crm'

const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const hits = new Map<string, number[]>()

const rateLimited = (key: string) => {
  const now = Date.now()
  const recent = (hits.get(key) || []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(key, recent)
  if (hits.size > 5000) hits.clear()
  return recent.length > MAX_PER_WINDOW
}

const str = (v: unknown, max = 200) => (typeof v === 'string' ? v.trim().slice(0, max) : undefined)
const num = (v: unknown) => {
  const n =
    typeof v === 'number'
      ? v
      : typeof v === 'string' && v.trim()
        ? Number(v.replace(/[,₹\s]/g, ''))
        : NaN
  return Number.isFinite(n) && n >= 0 ? n : undefined
}

/**
 * Public endpoint used by the website enquiry forms: POST /api/enquiry
 * Creates a lead in the CRM with only whitelisted fields.
 */
export const enquiryEndpoint: Endpoint = {
  path: '/enquiry',
  method: 'post',
  handler: async (req) => {
    let body: Record<string, unknown> = {}
    try {
      body = (await req.json?.()) ?? {}
    } catch {
      return Response.json({ error: 'Invalid request' }, { status: 400 })
    }

    // Honeypot field: real users never fill it in
    if (str(body.company_website)) return Response.json({ ok: true })

    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'unknown'
    if (rateLimited(ip)) {
      return Response.json(
        { error: 'Too many requests. Please try again in a few minutes.' },
        { status: 429 },
      )
    }

    const fullName = str(body.fullName, 100)
    const phone = str(body.phone, 20)?.replace(/[^\d+]/g, '')
    // Strip +91 / 91 / 0 prefixes only when present in addition to the 10-digit number
    const digits = phone?.replace(/^\+/, '').replace(/^(91|0)(?=\d{10}$)/, '')
    const errors: Record<string, string> = {}
    if (!fullName || fullName.length < 2) errors.fullName = 'Please enter your name'
    if (!digits || !/^[6-9]\d{9}$/.test(digits))
      errors.phone = 'Please enter a valid 10-digit mobile number'
    const email = str(body.email, 120)
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.email = 'Please enter a valid email'
    if (body.consent !== true) errors.consent = 'Please accept to be contacted'
    if (Object.keys(errors).length) return Response.json({ errors }, { status: 400 })

    let loanProduct: number | undefined
    const productId = num(body.loanProduct)
    if (productId) {
      const found = await req.payload.find({
        collection: 'loan-products',
        where: { id: { equals: productId } },
        limit: 1,
        depth: 0,
      })
      if (found.docs[0]) loanProduct = found.docs[0].id
    }

    const employmentType = EMPLOYMENT_TYPES.some((e) => e.value === body.employmentType)
      ? (body.employmentType as 'salaried')
      : undefined

    const lead = await req.payload.create({
      collection: 'leads',
      overrideAccess: true,
      data: {
        fullName: fullName!,
        phone: digits!,
        email,
        city: str(body.city, 80),
        loanProduct,
        amountRequired: num(body.amountRequired),
        monthlyIncome: num(body.monthlyIncome),
        employmentType,
        message: str(body.message, 2000),
        source: 'website',
        status: 'new',
        priority: 'warm',
        consent: true,
        consentAt: new Date().toISOString(),
        utmSource: str(body.utmSource, 100),
        utmMedium: str(body.utmMedium, 100),
        utmCampaign: str(body.utmCampaign, 100),
        landingPage: str(body.landingPage, 300),
      },
    })

    return Response.json({ ok: true, reference: lead.leadNumber })
  },
}
