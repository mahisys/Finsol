import React from 'react'

export const Logo = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
    <svg width="44" height="44" viewBox="0 0 40 40" aria-hidden>
      <rect width="40" height="40" rx="10" fill="#0b4f9c" />
      <path
        d="M12 28V12h16M12 20h11"
        stroke="#f59e0b"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
    <div>
      <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1 }}>Finsol</div>
      <div style={{ fontSize: 13, opacity: 0.7 }}>Website & CRM</div>
    </div>
  </div>
)
