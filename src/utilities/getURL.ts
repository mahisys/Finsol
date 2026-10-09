export const getServerSideURL = (): string =>
  process.env.NEXT_PUBLIC_SERVER_URL?.replace(/\/$/, '') || 'http://localhost:3000'
