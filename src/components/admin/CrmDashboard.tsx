import type { ServerProps, Where } from 'payload'
import Link from 'next/link'
import React from 'react'
import { hasRole } from '../../access'
import { CLOSED_STATUSES, LEAD_STATUSES, OPEN_STATUSES, formatINR } from '../../lib/crm'
import './dashboard.scss'

const startOfDay = (d = new Date()) => new Date(d.getFullYear(), d.getMonth(), d.getDate())

const leadsUrl = (where: Record<string, string>) => {
  const qs = new URLSearchParams(where)
  return `/admin/collections/leads?${qs.toString()}`
}

export const CrmDashboard = async ({ payload, user }: ServerProps) => {
  if (!user) return null
  const isCrm = hasRole(user, 'admin', 'manager', 'agent')
  const isManager = hasRole(user, 'admin', 'manager')

  if (!isCrm) {
    return (
      <div className="fs-dash">
        <h2 className="fs-dash__title">Welcome, {user.name || user.email}</h2>
        <p className="fs-dash__muted">
          Use <strong>Pages</strong> to edit the website, <strong>Loan products</strong> to update
          loan details, and <strong>Header & menu</strong> / <strong>Footer</strong> /{' '}
          <strong>Site settings</strong> for everything else. Every change can be previewed live
          before publishing.
        </p>
        <div className="fs-dash__actions">
          <Link className="fs-btn" href="/admin/collections/pages">
            Edit pages
          </Link>
          <Link className="fs-btn" href="/admin/collections/loan-products">
            Loan products
          </Link>
          <Link className="fs-btn" href="/admin/collections/posts/create">
            Write a blog post
          </Link>
          <a className="fs-btn fs-btn--ghost" href="/" target="_blank">
            View website ↗
          </a>
        </div>
      </div>
    )
  }

  // Access control (agents → own leads) is applied by passing the user
  const q = { collection: 'leads' as const, user, overrideAccess: false }
  const count = async (where: Where) => (await payload.count({ ...q, where })).totalDocs

  const now = new Date()
  const today = startOfDay()
  const tomorrow = new Date(today.getTime() + 86400000)
  const weekAgo = new Date(today.getTime() - 6 * 86400000)
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)

  const [statusCounts, overdue, dueToday, newThisWeek, unassigned, followUps, disbursedMonth] =
    await Promise.all([
      Promise.all(
        LEAD_STATUSES.map(async (s) => ({
          ...s,
          count: await count({ status: { equals: s.value } }),
        })),
      ),
      count({
        and: [
          { nextFollowUp: { less_than: today.toISOString() } },
          { status: { in: OPEN_STATUSES } },
        ],
      }),
      count({
        and: [
          { nextFollowUp: { greater_than_equal: today.toISOString() } },
          { nextFollowUp: { less_than: tomorrow.toISOString() } },
          { status: { in: OPEN_STATUSES } },
        ],
      }),
      count({ createdAt: { greater_than_equal: weekAgo.toISOString() } }),
      isManager
        ? count({ and: [{ assignedTo: { exists: false } }, { status: { in: OPEN_STATUSES } }] })
        : 0,
      payload.find({
        ...q,
        where: {
          and: [
            { nextFollowUp: { less_than: tomorrow.toISOString() } },
            { status: { in: OPEN_STATUSES } },
          ],
        },
        sort: 'nextFollowUp',
        limit: 8,
        depth: 1,
      }),
      payload.find({
        ...q,
        where: {
          and: [
            { status: { equals: 'disbursed' } },
            { disbursalDate: { greater_than_equal: monthStart.toISOString() } },
          ],
        },
        limit: 500,
        depth: 0,
        select: { disbursedAmount: true, commission: true },
      }),
    ])

  const disbursedTotal = disbursedMonth.docs.reduce((s, d) => s + (d.disbursedAmount || 0), 0)
  const commissionTotal = disbursedMonth.docs.reduce((s, d) => s + (d.commission?.amount || 0), 0)
  const openTotal = statusCounts
    .filter((s) => !CLOSED_STATUSES.includes(s.value))
    .reduce((a, s) => a + s.count, 0)
  const maxCount = Math.max(1, ...statusCounts.map((s) => s.count))

  return (
    <div className="fs-dash">
      <div className="fs-dash__head">
        <h2 className="fs-dash__title">
          {isManager ? 'Sales pipeline' : 'My leads'} ·{' '}
          {now.toLocaleDateString('en-IN', { dateStyle: 'medium' })}
        </h2>
        <div className="fs-dash__actions">
          <Link className="fs-btn" href="/admin/collections/leads/create">
            + New lead
          </Link>
          <Link className="fs-btn fs-btn--ghost" href="/admin/collections/lead-activities/create">
            Log a call / note
          </Link>
        </div>
      </div>

      <div className="fs-dash__kpis">
        <a className="fs-kpi" href={leadsUrl({ 'where[status][in]': OPEN_STATUSES.join(',') })}>
          <span className="fs-kpi__value">{openTotal}</span>
          <span className="fs-kpi__label">Open leads</span>
        </a>
        <a
          className="fs-kpi"
          href={leadsUrl({ 'where[createdAt][greater_than_equal]': weekAgo.toISOString() })}
        >
          <span className="fs-kpi__value">{newThisWeek}</span>
          <span className="fs-kpi__label">New in last 7 days</span>
        </a>
        <a
          className={`fs-kpi ${overdue ? 'fs-kpi--alert' : ''}`}
          href={leadsUrl({
            'where[nextFollowUp][less_than]': today.toISOString(),
            'where[status][in]': OPEN_STATUSES.join(','),
            sort: 'nextFollowUp',
          })}
        >
          <span className="fs-kpi__value">{overdue}</span>
          <span className="fs-kpi__label">Overdue follow-ups</span>
        </a>
        <div className="fs-kpi">
          <span className="fs-kpi__value">{dueToday}</span>
          <span className="fs-kpi__label">Follow-ups today</span>
        </div>
        {isManager && (
          <a
            className={`fs-kpi ${unassigned ? 'fs-kpi--warn' : ''}`}
            href={leadsUrl({
              'where[assignedTo][exists]': 'false',
              'where[status][in]': OPEN_STATUSES.join(','),
            })}
          >
            <span className="fs-kpi__value">{unassigned}</span>
            <span className="fs-kpi__label">Unassigned</span>
          </a>
        )}
        <div className="fs-kpi">
          <span className="fs-kpi__value">{formatINR(disbursedTotal)}</span>
          <span className="fs-kpi__label">Disbursed this month ({disbursedMonth.totalDocs})</span>
        </div>
        {isManager && (
          <div className="fs-kpi">
            <span className="fs-kpi__value">{formatINR(commissionTotal)}</span>
            <span className="fs-kpi__label">Commission this month</span>
          </div>
        )}
      </div>

      <div className="fs-dash__grid">
        <section className="fs-card">
          <h3>Pipeline by status</h3>
          <ul className="fs-funnel">
            {statusCounts.map((s) => (
              <li key={s.value}>
                <a href={leadsUrl({ 'where[status][equals]': s.value })}>
                  <span className="fs-funnel__label">{s.label}</span>
                  <span className="fs-funnel__bar">
                    <span
                      className={`fs-funnel__fill fs-funnel__fill--${s.value}`}
                      style={{ width: `${(s.count / maxCount) * 100}%` }}
                    />
                  </span>
                  <span className="fs-funnel__count">{s.count}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="fs-card">
          <h3>Follow-ups due</h3>
          {followUps.docs.length === 0 ? (
            <p className="fs-dash__muted">Nothing due. 🎉</p>
          ) : (
            <table className="fs-table">
              <tbody>
                {followUps.docs.map((lead) => {
                  const due = lead.nextFollowUp ? new Date(lead.nextFollowUp) : null
                  const late = due && due < today
                  return (
                    <tr key={lead.id}>
                      <td>
                        <a href={`/admin/collections/leads/${lead.id}`}>{lead.fullName}</a>
                        <div className="fs-dash__muted">
                          {typeof lead.loanProduct === 'object' && lead.loanProduct
                            ? lead.loanProduct.name
                            : ''}{' '}
                          {lead.amountRequired ? `· ${formatINR(lead.amountRequired)}` : ''}
                        </div>
                      </td>
                      <td>
                        <a href={`tel:${lead.phone}`}>{lead.phone}</a>
                      </td>
                      <td className={late ? 'fs-late' : ''}>
                        {due?.toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </div>
  )
}
