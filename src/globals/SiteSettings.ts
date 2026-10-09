import type { GlobalConfig } from 'payload'
import { anyone, crmManagerFieldLevel, hasRole } from '../access'
import { revalidateGlobal } from '../hooks/revalidate'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site settings',
  admin: {
    group: 'Settings',
    description: 'Business details, branding, contact info and CRM options.',
  },
  access: {
    read: anyone,
    update: ({ req: { user } }) => hasRole(user, 'admin', 'editor', 'manager'),
  },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Business',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'siteName', type: 'text', required: true, defaultValue: 'Finsol' },
                { name: 'tagline', type: 'text', defaultValue: 'Your trusted loan partner' },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'logo',
                  type: 'upload',
                  relationTo: 'media',
                  admin: { description: 'Shown in the header. Leave empty to show the site name.' },
                },
                {
                  name: 'logoLight',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Logo for dark backgrounds (footer)',
                },
                { name: 'favicon', type: 'upload', relationTo: 'media' },
              ],
            },
          ],
        },
        {
          label: 'Contact',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'phone', type: 'text' },
                {
                  name: 'whatsapp',
                  type: 'text',
                  admin: {
                    description:
                      'Number with country code, e.g. 919876543210. Shows a floating WhatsApp button.',
                  },
                },
                { name: 'email', type: 'email' },
              ],
            },
            { name: 'address', type: 'textarea' },
            { name: 'businessHours', type: 'text', defaultValue: 'Mon – Sat, 10:00 am – 7:00 pm' },
            {
              name: 'mapEmbedUrl',
              type: 'text',
              label: 'Google Maps embed URL',
              admin: {
                description: 'Google Maps → Share → Embed a map → copy the src="..." link.',
              },
            },
            {
              name: 'social',
              type: 'array',
              label: 'Social media',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'platform',
                      type: 'select',
                      required: true,
                      options: [
                        'facebook',
                        'instagram',
                        'linkedin',
                        'youtube',
                        'x',
                        'whatsapp',
                      ].map((v) => ({ label: v, value: v })),
                    },
                    { name: 'url', type: 'text', required: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Branding',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'primaryColor',
                  type: 'text',
                  defaultValue: '#0b4f9c',
                  admin: { description: 'Main brand colour (hex), e.g. #0b4f9c' },
                },
                {
                  name: 'accentColor',
                  type: 'text',
                  defaultValue: '#f59e0b',
                  admin: { description: 'Highlight / button colour (hex)' },
                },
              ],
            },
          ],
        },
        {
          label: 'Compliance',
          fields: [
            {
              name: 'disclaimer',
              type: 'textarea',
              defaultValue:
                'We are a Direct Selling Agent (DSA) and loan facilitator. We do not lend money ourselves. Loans are sanctioned at the sole discretion of the partner bank / NBFC, subject to their credit policies. Interest rates and charges are indicative and may change.',
            },
            {
              name: 'registrationInfo',
              type: 'text',
              label: 'Registration / GSTIN / DSA codes (optional)',
            },
            {
              name: 'consentText',
              type: 'text',
              defaultValue:
                'I authorise the team and its partner banks to contact me via call, SMS, WhatsApp or email regarding my loan enquiry. This overrides DND/NDNC registration.',
            },
          ],
        },
        {
          label: 'SEO & tracking',
          fields: [
            { name: 'defaultMetaDescription', type: 'textarea' },
            {
              name: 'defaultOgImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Default social share image',
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'googleAnalyticsId',
                  type: 'text',
                  label: 'Google Analytics 4 ID',
                  admin: { description: 'e.g. G-XXXXXXX' },
                },
                { name: 'metaPixelId', type: 'text', label: 'Meta (Facebook) Pixel ID' },
              ],
            },
          ],
        },
        {
          label: 'CRM',
          fields: [
            {
              name: 'crm',
              type: 'group',
              label: false,
              access: { read: crmManagerFieldLevel, update: crmManagerFieldLevel },
              fields: [
                {
                  name: 'notifyEmails',
                  type: 'array',
                  label: 'Email these people on every new website enquiry',
                  fields: [{ name: 'email', type: 'email', required: true }],
                },
                {
                  name: 'autoAssign',
                  type: 'checkbox',
                  label: 'Auto-assign new leads to the least busy sales agent',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
