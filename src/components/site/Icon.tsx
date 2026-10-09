import React from 'react'

const paths: Record<string, React.ReactNode> = {
  wallet: (
    <>
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="M16 12.5h2M3 9h15V6" />
    </>
  ),
  home: (
    <>
      <path d="M3 11l9-7 9 7" />
      <path d="M5 10v10h14V10" />
      <path d="M10 20v-6h4v6" />
    </>
  ),
  building: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="1" />
      <path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2M10 21v-3h4v3" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M3 13h18" />
    </>
  ),
  car: (
    <>
      <path d="M5 16l1.5-5.5A2 2 0 018.4 9h7.2a2 2 0 011.9 1.5L19 16" />
      <rect x="3" y="16" width="18" height="4" rx="1" />
      <circle cx="7.5" cy="20" r="1" />
      <circle cx="16.5" cy="20" r="1" />
    </>
  ),
  graduation: (
    <>
      <path d="M2 9l10-5 10 5-10 5z" />
      <path d="M6 11v5c3 2 9 2 12 0v-5M22 9v6" />
    </>
  ),
  gold: (
    <>
      <path d="M4 18l2-6h5l2 6zM11 18l2-6h5l2 6zM7.5 12l2-6h5l2 6" />
    </>
  ),
  percent: (
    <>
      <path d="M19 5L5 19" />
      <circle cx="7" cy="7" r="2.5" />
      <circle cx="17" cy="17" r="2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  document: (
    <>
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v4h4M9 12h6M9 16h6" />
    </>
  ),
  handshake: (
    <>
      <path d="M2 12l4-4 4 2 4-2 4 0 4 4" />
      <path d="M6 12l5 5a1.5 1.5 0 002-2M10 14l3 3a1.5 1.5 0 002-2l-3-3M14 13l2 2a1.5 1.5 0 002-2l-4-4" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20V4M4 20h16" />
      <path d="M8 16l4-5 3 3 5-6" />
    </>
  ),
  phone: (
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2" />
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12l3 3 5-6" />
    </>
  ),
  star: <path d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z" />,
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M17 14c3 0 5 2 5 5" />
    </>
  ),
  bank: (
    <>
      <path d="M3 9l9-5 9 5zM5 9v8M9.5 9v8M14.5 9v8M19 9v8M3 20h18" />
    </>
  ),
  whatsapp: (
    <path d="M12 3a9 9 0 00-7.8 13.5L3 21l4.6-1.2A9 9 0 1012 3zm4.6 12.6c-.2.6-1.2 1.2-1.7 1.2s-1 .3-3.5-.8a8.6 8.6 0 01-3.3-3c-.5-.7-.8-1.5-.8-2.2s.3-1.4.9-1.9h.7l.6 1.4c.1.2 0 .5-.1.7l-.4.5c-.1.1-.2.3 0 .5a6 6 0 002.9 2.5c.2.1.4.1.5-.1l.6-.7c.2-.2.4-.2.6-.1l1.5.7c.2.1.4.2.4.4.1.2.1.5-.1.9z" />
  ),
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-7-6-7-11a7 7 0 0114 0c0 5-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
}

export const Icon: React.FC<{
  name?: string | null
  size?: number
  className?: string
  filled?: boolean
}> = ({ name, size = 24, className, filled }) => {
  const p = paths[name || 'check'] ?? paths.check
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke={filled ? 'none' : 'currentColor'}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {p}
    </svg>
  )
}
