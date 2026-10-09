import fs from 'fs'
import os from 'os'
import path from 'path'
import type { Payload } from 'payload'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

// Use a throw-away SQLite database for every run
const dbFile = path.join(os.tmpdir(), `finsol-test-${Date.now()}.db`)
process.env.DATABASE_URL = `file:${dbFile}`
process.env.PAYLOAD_SECRET ||= 'test-secret'

let payload: Payload
let agentId: number
let otherAgentId: number
let bankId: number
let productId: number

describe('CRM', () => {
  beforeAll(async () => {
    const { getPayload } = await import('payload')
    const { default: config } = await import('@/payload.config')
    payload = await getPayload({ config })

    const mk = (email: string, roles: ('admin' | 'agent')[]) =>
      payload.create({
        collection: 'users',
        data: { email, password: 'pass1234', name: email, roles },
        overrideAccess: true,
      })
    await mk('admin@test.local', ['admin'])
    agentId = (await mk('agent1@test.local', ['agent'])).id
    otherAgentId = (await mk('agent2@test.local', ['agent'])).id

    productId = (
      await payload.create({
        collection: 'loan-products',
        data: { name: 'Home Loan', category: 'home', _status: 'published' },
        overrideAccess: true,
      })
    ).id
    bankId = (
      await payload.create({
        collection: 'banks',
        data: {
          name: 'Test Bank',
          defaultCommissionRate: 1,
          payoutGrid: [{ product: productId, rate: 0.5 }],
        },
        overrideAccess: true,
      })
    ).id
  })

  afterAll(async () => {
    await payload?.destroy?.()
    fs.rmSync(dbFile, { force: true })
  })

  it('first user is always an admin', async () => {
    const first = await payload.find({
      collection: 'users',
      sort: 'createdAt',
      limit: 1,
      overrideAccess: true,
    })
    expect(first.docs[0].roles).toEqual(['admin'])
  })

  it('numbers leads sequentially and flags duplicates', async () => {
    const a = await payload.create({
      collection: 'leads',
      data: { status: 'new', fullName: 'A', phone: '9000000001' },
      overrideAccess: true,
    })
    const b = await payload.create({
      collection: 'leads',
      data: { status: 'new', fullName: 'B', phone: '9000000001' },
      overrideAccess: true,
    })
    expect(a.leadNumber).toMatch(/^FS-\d{5}$/)
    expect(Number(b.leadNumber!.slice(3))).toBe(Number(a.leadNumber!.slice(3)) + 1)
    expect(a.possibleDuplicate).toBe(false)
    expect(b.possibleDuplicate).toBe(true)
  })

  it('calculates commission from the bank payout grid', async () => {
    const lead = await payload.create({
      collection: 'leads',
      data: {
        fullName: 'C',
        phone: '9000000002',
        loanProduct: productId,
        status: 'disbursed',
        disbursingBank: bankId,
        disbursedAmount: 2000000,
      },
      overrideAccess: true,
    })
    expect(lead.commission?.rate).toBe(0.5)
    expect(lead.commission?.amount).toBe(10000)
  })

  it('requires a disbursed amount when status is disbursed', async () => {
    await expect(
      payload.create({
        collection: 'leads',
        data: { fullName: 'D', phone: '9000000003', status: 'disbursed' },
        overrideAccess: true,
      }),
    ).rejects.toThrow()
  })

  it('logs status changes to the timeline', async () => {
    const lead = await payload.create({
      collection: 'leads',
      data: { status: 'new', fullName: 'E', phone: '9000000004' },
      overrideAccess: true,
    })
    await payload.update({
      collection: 'leads',
      id: lead.id,
      data: { status: 'contacted' },
      overrideAccess: true,
    })
    const acts = await payload.find({
      collection: 'lead-activities',
      where: { lead: { equals: lead.id } },
      overrideAccess: true,
    })
    expect(acts.docs.map((a) => a.summary)).toContain('Status changed: New → Contacted')
  })

  it('agents only see their own leads and cannot see commission', async () => {
    await payload.create({
      collection: 'leads',
      data: { status: 'new', fullName: 'Mine', phone: '9000000005', assignedTo: agentId },
      overrideAccess: true,
    })
    await payload.create({
      collection: 'leads',
      data: { status: 'new', fullName: 'Theirs', phone: '9000000006', assignedTo: otherAgentId },
      overrideAccess: true,
    })
    const agent = await payload.findByID({ collection: 'users', id: agentId, overrideAccess: true })
    const res = await payload.find({
      collection: 'leads',
      user: { ...agent, collection: 'users' },
      overrideAccess: false,
    })
    expect(res.docs.map((d) => d.fullName)).toEqual(['Mine'])
    expect(res.docs[0].commission).toBeUndefined()
  })
})
