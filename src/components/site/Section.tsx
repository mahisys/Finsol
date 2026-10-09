import React from 'react'

export const Section: React.FC<{
  background?: string | null
  id?: string | null
  className?: string
  children: React.ReactNode
}> = ({ background, id, className, children }) => (
  <section
    id={id || undefined}
    className={['section', `bg-${background || 'white'}`, className].filter(Boolean).join(' ')}
  >
    <div className="container">{children}</div>
  </section>
)

export const SectionHeader: React.FC<{
  eyebrow?: string | null
  heading?: string | null
  intro?: string | null
  align?: 'center' | 'left'
}> = ({ eyebrow, heading, intro, align = 'center' }) => {
  if (!eyebrow && !heading && !intro) return null
  return (
    <header className={`section-header section-header--${align}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      {heading && <h2>{heading}</h2>}
      {intro && <p className="lead">{intro}</p>}
    </header>
  )
}
