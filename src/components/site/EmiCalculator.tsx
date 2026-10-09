'use client'

import React, { useMemo, useState } from 'react'

const inr = (n: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Math.round(n))

type Props = {
  defaultAmount?: number | null
  defaultRate?: number | null
  defaultTenure?: number | null
  maxAmount?: number | null
  maxTenure?: number | null
  applyHref?: string
}

export const EmiCalculator: React.FC<Props> = ({
  defaultAmount,
  defaultRate,
  defaultTenure,
  maxAmount,
  maxTenure,
  applyHref = '#apply',
}) => {
  const maxA = maxAmount || 10000000
  const maxT = maxTenure || 30
  const [amount, setAmount] = useState(defaultAmount || 500000)
  const [rate, setRate] = useState(defaultRate || 10.5)
  const [years, setYears] = useState(defaultTenure || 5)

  const { emi, interest, total } = useMemo(() => {
    const n = years * 12
    const r = rate / 12 / 100
    const emi = r === 0 ? amount / n : (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    const total = emi * n
    return { emi, interest: total - amount, total }
  }, [amount, rate, years])

  const principalPct = total > 0 ? (amount / total) * 100 : 100

  return (
    <div className="emi">
      <div className="emi__inputs">
        <Slider
          label="Loan amount"
          value={amount}
          min={10000}
          max={maxA}
          step={10000}
          onChange={setAmount}
          display={inr(amount)}
        />
        <Slider
          label="Interest rate (p.a.)"
          value={rate}
          min={5}
          max={30}
          step={0.05}
          onChange={setRate}
          display={`${rate.toFixed(2)} %`}
        />
        <Slider
          label="Tenure"
          value={years}
          min={1}
          max={maxT}
          step={1}
          onChange={setYears}
          display={`${years} ${years === 1 ? 'year' : 'years'}`}
        />
      </div>
      <div className="emi__result">
        <p className="emi__label">Your monthly EMI</p>
        <p className="emi__value">{inr(emi)}</p>
        <div
          className="emi__donut"
          style={{
            background: `conic-gradient(var(--brand) 0 ${principalPct}%, var(--accent) ${principalPct}% 100%)`,
          }}
          aria-hidden
        />
        <dl className="emi__breakup">
          <div>
            <dt>
              <i className="dot dot--brand" />
              Principal
            </dt>
            <dd>{inr(amount)}</dd>
          </div>
          <div>
            <dt>
              <i className="dot dot--accent" />
              Total interest
            </dt>
            <dd>{inr(interest)}</dd>
          </div>
          <div>
            <dt>Total payable</dt>
            <dd>{inr(total)}</dd>
          </div>
        </dl>
        <a href={applyHref} className="btn btn--primary btn--block">
          Apply now
        </a>
      </div>
    </div>
  )
}

const Slider: React.FC<{
  label: string
  value: number
  min: number
  max: number
  step: number
  display: string
  onChange: (v: number) => void
}> = ({ label, value, min, max, step, display, onChange }) => (
  <label className="slider">
    <span className="slider__top">
      <span>{label}</span>
      <input
        className="slider__number"
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Math.min(max, Math.max(min, Number(e.target.value) || min)))}
        aria-label={label}
      />
    </span>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
    />
    <span className="slider__display">{display}</span>
  </label>
)
