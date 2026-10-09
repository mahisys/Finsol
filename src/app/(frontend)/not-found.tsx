import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <section className="section">
      <div className="container container--narrow" style={{ textAlign: 'center' }}>
        <h1>Page not found</h1>
        <p className="lead">The page you are looking for doesn’t exist or has moved.</p>
        <Link href="/" className="btn btn--primary">
          Go to homepage
        </Link>
      </div>
    </section>
  )
}
