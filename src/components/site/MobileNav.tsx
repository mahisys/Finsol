'use client'

import React, { useState } from 'react'
import { Icon } from './Icon'

/** Toggles the header menu on small screens */
export const MobileNav: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        type="button"
        className="nav-toggle"
        aria-expanded={open}
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((o) => !o)}
      >
        <Icon name={open ? 'close' : 'menu'} />
      </button>
      {/* Close the menu once a link inside it is clicked */}
      <div
        className={`nav-wrap ${open ? 'is-open' : ''}`}
        onClick={(e) => (e.target as HTMLElement).closest('a') && setOpen(false)}
      >
        {children}
      </div>
    </>
  )
}
