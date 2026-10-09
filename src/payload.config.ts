import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { importExportPlugin } from '@payloadcms/plugin-import-export'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { crmManager } from './access'
import { Banks } from './collections/Banks'
import { Faqs } from './collections/Faqs'
import { LeadActivities } from './collections/LeadActivities'
import { LeadDocuments } from './collections/LeadDocuments'
import { Leads } from './collections/Leads'
import { LoanProducts } from './collections/LoanProducts'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Testimonials } from './collections/Testimonials'
import { Users } from './collections/Users'
import { Footer } from './globals/Footer'
import { Header } from './globals/Header'
import { SiteSettings } from './globals/SiteSettings'
import { enquiryEndpoint } from './lib/enquiryEndpoint'
import { migrations } from './migrations'
import { seed } from './seed'
import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const smtpConfigured = Boolean(process.env.SMTP_HOST)

export default buildConfig({
  serverURL: getServerSideURL(),
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: ' · Finsol Admin' },
    avatar: 'default',
    components: {
      graphics: {
        Logo: '@/components/admin/Logo#Logo',
        Icon: '@/components/admin/Icon#Icon',
      },
      beforeDashboard: ['@/components/admin/CrmDashboard#CrmDashboard'],
    },
    livePreview: {
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 390, height: 844 },
        { label: 'Tablet', name: 'tablet', width: 820, height: 1180 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },
  collections: [
    // Website
    Pages,
    Posts,
    Media,
    Testimonials,
    Faqs,
    // Loan catalogue
    LoanProducts,
    Banks,
    // CRM
    Leads,
    LeadActivities,
    LeadDocuments,
    // Settings
    Users,
  ],
  globals: [Header, Footer, SiteSettings],
  endpoints: [enquiryEndpoint],
  onInit: async (payload) => {
    // Optional: fill an empty database with sample content on first start (e.g. in Docker)
    if (process.env.SEED_ON_START === 'true') await seed(payload)
  },
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: sqliteAdapter({
    client: { url: process.env.DATABASE_URL || 'file:./finsol.db' },
    // In development the schema is synced automatically; in production migrations run on boot.
    prodMigrations: migrations,
  }),
  email: smtpConfigured
    ? nodemailerAdapter({
        defaultFromAddress: process.env.SMTP_FROM_ADDRESS || 'no-reply@example.com',
        defaultFromName: process.env.SMTP_FROM_NAME || 'Finsol Website',
        transportOptions: {
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT || 587),
          secure: Number(process.env.SMTP_PORT) === 465,
          auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
        },
      })
    : undefined,
  sharp,
  jobs: {
    // Runs scheduled publishing and CSV import/export jobs on the server every minute
    autoRun: [{ cron: '* * * * *', queue: 'default' }],
    access: { run: ({ req }) => Boolean(req.user) },
  },
  plugins: [
    seoPlugin({
      collections: ['pages', 'posts', 'loan-products'],
      uploadsCollection: 'media',
      tabbedUI: true,
      generateTitle: ({ doc }) => {
        const d = doc as { title?: string; name?: string }
        return d?.title || d?.name || ''
      },
    }),
    importExportPlugin({
      collections: [
        { slug: 'leads', export: true, import: true },
        { slug: 'loan-products', export: true, import: false },
      ],
      overrideExportCollection: ({ collection }) => ({
        ...collection,
        admin: { ...collection.admin, group: 'CRM' },
        access: {
          ...collection.access,
          read: crmManager,
          create: crmManager,
          update: crmManager,
          delete: crmManager,
        },
      }),
      overrideImportCollection: ({ collection }) => ({
        ...collection,
        admin: { ...collection.admin, group: 'CRM' },
        access: {
          ...collection.access,
          read: crmManager,
          create: crmManager,
          update: crmManager,
          delete: crmManager,
        },
      }),
    }),
  ],
})
