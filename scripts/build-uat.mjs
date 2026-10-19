#!/usr/bin/env node
/**
 * Builds the static UAT site for Netlify from the two HTML prototypes.
 *
 *   node scripts/build-uat.mjs      (or: npm run build:uat)
 *
 * Output: uat/
 *   index.html       public website   (from prototype/index.html)
 *   crm/index.html   CRM              (from prototype/crm.html)
 *   404.html, robots.txt, _headers, netlify.toml
 *
 * Deploy by dragging the uat/ folder onto https://app.netlify.com/drop,
 * or connect the repo in Netlify with "Base directory" set to uat.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const out = path.join(root, 'uat')
const builtAt = new Date().toISOString().slice(0, 16).replace('T', ' ') + ' UTC'

const favicon =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' rx='10' fill='%231b2d6b'/%3E%3Cpath d='M13 29V12h15M13 20h11' stroke='%23ff9f1c' stroke-width='4' stroke-linecap='round' fill='none'/%3E%3C/svg%3E"

/** Wraps an artifact-style page (title, links, style, then body content) in a full HTML document. */
function toDocument(src, { description, replacements = [] }) {
  let html = src
  for (const [from, to] of replacements) {
    if (!html.includes(from)) throw new Error(`Build: expected text not found: ${from.slice(0, 60)}`)
    html = html.replace(from, to)
  }
  const split = html.indexOf('</style>') + '</style>'.length
  const head = html.slice(0, split).replace(/<meta charset="utf-8">\n?/, '').replace(/<meta name="viewport"[^>]*>\n?/, '')
  const body = html.slice(split).trim()
  return `<!doctype html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="description" content="${description}">
<meta name="robots" content="noindex, nofollow">
<meta name="theme-color" content="#0f1b47">
<link rel="icon" href="${favicon}">
<!-- UAT build ${builtAt} -->
${head}
</head>
<body>
${body}
</body>
</html>
`
}

const website = toDocument(fs.readFileSync(path.join(root, 'prototype/index.html'), 'utf8'), {
  description: 'Compare and apply for personal, business and home loans, loan against property and cash credit with Finsol.',
  replacements: [
    ['<li><a href="#home">Complaints and grievances</a></li>', '<li><a href="#home">Complaints and grievances</a></li>\n        <li><a href="crm/">Staff login (CRM)</a></li>'],
    ['<span class="proto-flag">Prototype · sample data</span>', '<span class="proto-flag">UAT build · sample data</span>'],
  ],
})

const crm = toDocument(fs.readFileSync(path.join(root, 'prototype/crm.html'), 'utf8'), {
  description: 'Finsol loan CRM (UAT).',
  replacements: [
    ['<span class="tiny muted">Prototype · switch user to see each role\'s view</span>', '<span class="tiny muted">UAT · switch user to test each role · data stays in this browser</span>'],
    ['<div class="side__foot">Signed in as', '<div class="side__foot"><a href="../" target="_blank" rel="noopener" style="color:inherit">Open the website ↗</a><br><br>Signed in as'],
  ],
})

const notFound = `<!doctype html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Page not found · Finsol</title>
<link rel="icon" href="${favicon}">
<style>
  :root { --bg: #f6f7fb; --ink: #0e1530; --muted: #59627f; --brand: #1b2d6b; --accent: #ff9f1c; }
  @media (prefers-color-scheme: dark) { :root { --bg: #080d1f; --ink: #e8ecf8; --muted: #a3adc9; --brand: #93a9ff; color-scheme: dark; } }
  body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: var(--bg); color: var(--ink); font: 16px/1.6 system-ui, sans-serif; padding: 24px; text-align: center; }
  h1 { margin: 0 0 8px; font-size: 2rem; }
  p { color: var(--muted); margin: 0 0 20px; }
  a { display: inline-block; margin: 4px; padding: 10px 18px; border-radius: 10px; background: var(--accent); color: #231300; font-weight: 700; text-decoration: none; }
  a + a { background: none; color: var(--brand); border: 2px solid currentColor; }
</style>
</head>
<body>
<main>
  <h1>Page not found</h1>
  <p>The page you are looking for does not exist.</p>
  <a href="/">Go to the website</a><a href="/crm/">Open the CRM</a>
</main>
</body>
</html>
`

const headers = `# Trial (UAT) site: keep it out of search engines and lock down the basics
/*
  X-Robots-Tag: noindex, nofollow
  X-Frame-Options: SAMEORIGIN
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Cache-Control: public, max-age=0, must-revalidate
`

const toml = `# Used when the repository is connected to Netlify with Base directory = uat.
# The site is plain static files: there is nothing to build on Netlify.
[build]
  publish = "."
  command = "echo 'Static UAT site, no build step'"
`

fs.rmSync(out, { recursive: true, force: true })
fs.mkdirSync(path.join(out, 'crm'), { recursive: true })
fs.writeFileSync(path.join(out, 'index.html'), website)
fs.writeFileSync(path.join(out, 'crm/index.html'), crm)
fs.writeFileSync(path.join(out, '404.html'), notFound)
fs.writeFileSync(path.join(out, 'robots.txt'), 'User-agent: *\nDisallow: /\n')
fs.writeFileSync(path.join(out, '_headers'), headers)
fs.writeFileSync(path.join(out, 'netlify.toml'), toml)

for (const f of ['index.html', 'crm/index.html', '404.html', 'robots.txt', '_headers', 'netlify.toml']) {
  console.log(`uat/${f}`.padEnd(22), `${(fs.statSync(path.join(out, f)).size / 1024).toFixed(1)} KB`)
}
console.log(`\nBuilt ${builtAt}. Deploy: drag the uat folder onto https://app.netlify.com/drop`)
