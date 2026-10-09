'use client'

import React, { useState } from 'react'

type Product = { id: number; name: string }

type Props = {
  products: Product[]
  defaultProduct?: number | null
  submitLabel?: string | null
  successMessage?: string | null
  consentText?: string | null
  compact?: boolean
}

type Errors = Partial<Record<string, string>>

export const LeadForm: React.FC<Props> = ({
  products,
  defaultProduct,
  submitLabel,
  successMessage,
  consentText,
  compact,
}) => {
  const [state, setState] = useState<'idle' | 'sending' | 'done'>('idle')
  const [errors, setErrors] = useState<Errors>({})
  const [reference, setReference] = useState<string>()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const params = new URLSearchParams(window.location.search)
    const body = {
      ...Object.fromEntries(form.entries()),
      consent: form.get('consent') === 'on',
      utmSource: params.get('utm_source') || undefined,
      utmMedium: params.get('utm_medium') || undefined,
      utmCampaign: params.get('utm_campaign') || undefined,
      landingPage: window.location.pathname,
    }
    setState('sending')
    setErrors({})
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) {
        setErrors(
          json.errors || {
            form: json.error || 'Something went wrong. Please try again or call us.',
          },
        )
        setState('idle')
        return
      }
      setReference(json.reference)
      setState('done')
      ;(window as unknown as { gtag?: (...a: unknown[]) => void }).gtag?.('event', 'generate_lead')
      ;(window as unknown as { fbq?: (...a: unknown[]) => void }).fbq?.('track', 'Lead')
    } catch {
      setErrors({ form: 'Network error. Please try again.' })
      setState('idle')
    }
  }

  if (state === 'done') {
    return (
      <div className="lead-form lead-form--done" role="status">
        <div className="lead-form__tick">✓</div>
        <p>{successMessage || 'Thank you! Our loan expert will call you shortly.'}</p>
        {reference && (
          <p className="muted">
            Your reference number: <strong>{reference}</strong>
          </p>
        )}
      </div>
    )
  }

  const err = (k: string) => errors[k] && <span className="field__error">{errors[k]}</span>

  return (
    <form
      className={`lead-form ${compact ? 'lead-form--compact' : ''}`}
      onSubmit={onSubmit}
      noValidate
    >
      <div className="lead-form__grid">
        <label className="field">
          <span>Full name *</span>
          <input name="fullName" autoComplete="name" required />
          {err('fullName')}
        </label>
        <label className="field">
          <span>Mobile number *</span>
          <input
            name="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            maxLength={13}
            required
          />
          {err('phone')}
        </label>
        <label className="field">
          <span>Loan type</span>
          <select name="loanProduct" defaultValue={defaultProduct ?? ''}>
            <option value="">Select loan type</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Loan amount (₹)</span>
          <input name="amountRequired" inputMode="numeric" placeholder="e.g. 500000" />
        </label>
        <label className="field">
          <span>City</span>
          <input name="city" autoComplete="address-level2" />
        </label>
        {!compact && (
          <>
            <label className="field">
              <span>Email</span>
              <input name="email" type="email" autoComplete="email" />
              {err('email')}
            </label>
            <label className="field">
              <span>Employment</span>
              <select name="employmentType" defaultValue="">
                <option value="">Select</option>
                <option value="salaried">Salaried</option>
                <option value="self-employed-business">Self-employed (business)</option>
                <option value="self-employed-professional">Self-employed (professional)</option>
                <option value="retired">Retired / pensioner</option>
                <option value="other">Other</option>
              </select>
            </label>
            <label className="field">
              <span>Monthly income (₹)</span>
              <input name="monthlyIncome" inputMode="numeric" />
            </label>
            <label className="field field--full">
              <span>Message</span>
              <textarea name="message" rows={3} />
            </label>
          </>
        )}
      </div>
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        className="hp"
        aria-hidden
      />
      <label className="consent">
        <input type="checkbox" name="consent" defaultChecked />
        <span>{consentText || 'I agree to be contacted regarding my loan enquiry.'}</span>
      </label>
      {err('consent')}
      {errors.form && <p className="field__error">{errors.form}</p>}
      <button type="submit" className="btn btn--primary btn--block" disabled={state === 'sending'}>
        {state === 'sending' ? 'Submitting…' : submitLabel || 'Get a call back'}
      </button>
    </form>
  )
}
