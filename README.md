# Finsol – Loan DSA Website, CMS & CRM

A single application that runs:

1. **The public website**: homepage, loan product pages, EMI calculator, blog, contact page and enquiry forms.
2. **A CMS** at `/admin`, so the client can edit every page, menu, loan product, bank logo, FAQ, testimonial and setting without a developer.
3. **A CRM** in the same admin panel. Every website enquiry becomes a **lead**, and the team tracks each lead from the first call through bank login, sanction and disbursal, along with the commission earned.

Built with [Payload CMS 3](https://payloadcms.com) + [Next.js 16](https://nextjs.org), SQLite and TypeScript.

---

## Quick start (developers)

```bash
cp .env.example .env      # then set PAYLOAD_SECRET / PREVIEW_SECRET
npm install
npm run seed              # sample pages, loan products, banks, FAQs + demo leads
npm run dev               # http://localhost:3000  ·  admin: http://localhost:3000/admin
```

Seeded logins (dev only):

| Email                | Password       | Role                                    |
| -------------------- | -------------- | --------------------------------------- |
| `admin@finsol.local` | `ChangeMe@123` | Admin                                   |
| `agent@finsol.local` | `ChangeMe@123` | Sales agent (sees only their own leads) |

`npm run seed -- --force` wipes website content and CRM data, then seeds it again.

| Script                                   | What it does                                         |
| ---------------------------------------- | ---------------------------------------------------- |
| `npm run dev` / `build` / `start`        | Next.js dev server / production build / prod server  |
| `npm run seed`                           | Sample content (skips if pages already exist)        |
| `npm run typecheck` / `lint`             | TypeScript / ESLint                                  |
| `npm test`                               | CRM integration tests (throw-away SQLite DB)         |
| `npm run generate:types`                 | Regenerate `src/payload-types.ts` after schema edits |
| `npm run migrate:create <name>`          | Create a DB migration after schema edits             |

> **Schema changes:** in development the database schema syncs automatically. Before deploying a change to
> collections or fields, run `npm run migrate:create <name>` and commit the new file in `src/migrations/`.
> Production runs pending migrations on start-up.

---

## Deployment

The app is a single Node.js server with a SQLite database file and two upload folders, so it fits on any
small VPS (2 GB RAM is plenty).

### Docker (recommended)

```bash
cp .env.example .env   # set PAYLOAD_SECRET, PREVIEW_SECRET, NEXT_PUBLIC_SERVER_URL, SMTP_*
docker compose up -d --build
```

* The database and all uploads are stored in the `finsol-data` volume. **Back this volume up daily.**
* To start with the sample content, set `SEED_ON_START=true`, `SEED_ADMIN_EMAIL` and `SEED_ADMIN_PASSWORD` for the
  first start, then remove them. Without seeding, open `/admin` and create the first account, which automatically
  becomes an admin. Then create a page with the slug `home`.
* Put the container behind a reverse proxy with HTTPS (Caddy / Nginx). The enquiry rate limiter reads the client IP
  from `X-Forwarded-For`, so make sure the proxy sets it.

### Without Docker

```bash
npm ci && npm run build && npm start   # set NODE_ENV=production; use pm2 / systemd to keep it running
```

### Environment variables

See [`.env.example`](.env.example). Required: `PAYLOAD_SECRET`, `PREVIEW_SECRET`, `NEXT_PUBLIC_SERVER_URL`.
To get new-lead email alerts and password-reset emails, set `SMTP_*`.

---

## Guide for the client (website editors & sales team)

Log in at **`yourdomain.com/admin`**. The left menu is grouped as follows.

### Website

| Section           | What you can do                                                                                                                                                                          |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Pages**         | Create, edit or delete any page. Each page is built from **sections** you can add, re-order (drag) or remove. The page with slug `home` is the homepage.                                 |
| **Blog posts**    | Write articles with headings, images, lists and links. You can schedule a post to publish later.                                                                                          |
| **Media library** | Upload images (logos, banners, photos). Set the *focal point* so images crop nicely.                                                                                                     |
| **Testimonials**  | Customer reviews. Untick *Published* to hide one.                                                                                                                                        |
| **FAQs**          | Questions & answers, grouped by category, used in FAQ sections and on loan pages.                                                                                                        |
| **Header & menu** | Top announcement bar, menu items (with drop-downs), the header button, and whether to show the automatic "Loans" menu.                                                                    |
| **Footer**        | About text, link columns, bottom links (privacy, terms) and copyright.                                                                                                                   |

**Available page sections:** Hero banner (with built-in enquiry form), Text content (1–3 columns), Image + text,
Loan products grid, Partner banks, Numbers/stats, Features/benefits, Process steps, Testimonials, FAQs,
Call to action, Loan enquiry form, EMI calculator. Every section has a background colour option.

**Drafts, preview and history**

* Changes save as a **draft** automatically. Visitors see them only after you click **Publish changes**.
* Click **Live Preview** to see the page update next to the editor as you type, on mobile, tablet and desktop sizes.
* **Versions** shows every past version and lets you restore one with a click.
* You can **schedule** a page or blog post to publish at a later date and time.

**SEO:** every page, loan product and post has an **SEO** tab for the Google title, description and share image.

### Loan catalogue

* **Loan products**: name, icon, key facts (rate, amount, tenure, fees), features, eligibility, documents,
  EMI calculator defaults, partner banks and FAQs. Each product gets its own page at `/loans/<slug>` and appears
  in the menu and enquiry forms automatically. Use *Sort order* to change the order and *Featured* to highlight a product.
* **Partner banks & NBFCs**: logos for the website, plus **internal** payout rates (a default % and per-product %)
  and bank contact persons. Only admins and sales managers can see the payout rates and contacts.

### CRM

* **Leads**: every website enquiry arrives here with status **New**, a reference number (`FS-00001`), the source
  page and any UTM campaign tags. A lead has these tabs:
  * *Applicant*: contact, KYC and income details
  * *Loan requirement*: product, amount, tenure, property details
  * *Bank processing*: each bank the file was logged with (application no., status, sanctioned amount, ROI),
    the final disbursal, and **commission**. Commission is calculated automatically from the bank's payout grid.
  * *Timeline & documents*: every call, note and status change, plus uploaded KYC documents
  * Sidebar: **status**, **priority**, **assigned to**, **next follow-up**
* **Activities & notes**: log a call, WhatsApp, meeting or note. Setting *Schedule next follow-up* updates the lead.
* **Customer documents**: PAN, Aadhaar, salary slips, bank statements, etc. These files are private and served only
  to logged-in staff.
* **Exports / Imports**: download leads as CSV (respects filters), or bulk-import leads from a CSV.
* The **Dashboard** (home screen of the admin) shows open leads, overdue and today's follow-ups, unassigned leads,
  the pipeline by status, and amounts disbursed and commission earned this month.

Status flow: New → Contacted → Interested → Documents pending → Documents collected → Logged in with bank →
Under bank review → Sanctioned → **Disbursed** (or On hold / Rejected / Lost).

Other automatic behaviour:

* A lead created by a sales agent is assigned to that agent.
* **Site settings → CRM** can auto-assign new website leads to the least-busy agent and email chosen people on
  every new enquiry.
* A lead with the same mobile number as another open lead is flagged as a *possible duplicate*.

### Settings

* **Team members**: add staff and choose their role:

  | Role              | Website content | All leads | Own leads | Commission & payouts | Users & settings |
  | ----------------- | :-------------: | :-------: | :-------: | :------------------: | :--------------: |
  | Admin             |        ✓        |     ✓     |     ✓     |          ✓           |        ✓         |
  | Website editor    |        ✓        |           |           |                      |   site settings  |
  | Sales manager     |                 |     ✓     |     ✓     |          ✓           |   CRM settings   |
  | Sales agent       |                 |           |     ✓     |                      |                  |

  Untick **Active** to block a person who has left. Their leads stay in the system.
* **Site settings**: business name, logos, favicon, phone, WhatsApp (adds a floating chat button), email, address,
  social links, **brand colours**, DSA disclaimer and consent text, Google Analytics / Meta Pixel IDs, and CRM options.

---

## Project structure

```
src/
  access/            role-based access control (admin / editor / manager / agent)
  blocks/            page-builder section definitions (CMS side)
  collections/       Pages, Posts, Media, Testimonials, Faqs, LoanProducts, Banks,
                     Leads, LeadActivities, LeadDocuments, Users
  globals/           Header, Footer, SiteSettings
  lib/               CRM constants, public enquiry endpoint (POST /api/enquiry), data helpers
  components/site/   website components (header, footer, blocks, lead form, EMI calculator)
  components/admin/  admin logo + CRM dashboard
  app/(frontend)/    website routes: /, /[slug], /loans, /loans/[slug], /blog, /blog/[slug], preview
  app/(payload)/     admin panel + REST/GraphQL API (generated by Payload)
  migrations/        production database migrations
  seed/              sample content
tests/int/           CRM integration tests (vitest)
tests/e2e/           browser tests (Playwright; need a seeded DB and a running dev server)
```

## Notes

* All seeded content (bank names, numbers, testimonials, address) is **placeholder text**. Replace it with the
  client's real details before launch, and add a real privacy policy. The enquiry form stores personal data.
* The public enquiry endpoint validates input, whitelists fields, uses a honeypot field against bots, and limits each IP
  to 5 submissions per 10 minutes.
