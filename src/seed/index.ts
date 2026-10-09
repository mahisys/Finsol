/**
 * Seeds a fresh database with sample website content + demo CRM data.
 *   npm run seed            → only runs if the database has no pages yet
 *   npm run seed -- --force → wipes website content & CRM data first
 *
 * Everything created here is SAMPLE content: edit or delete it from the admin panel.
 */
import type { CollectionSlug, Payload } from 'payload'
import { doc, h, p, ul } from './richtext'

const ref = (relationTo: 'pages' | 'loan-products' | 'posts', value: number) => ({
  relationTo,
  value,
})
const internal = (
  label: string,
  relationTo: 'pages' | 'loan-products' | 'posts',
  value: number,
  appearance?: 'primary' | 'secondary' | 'link',
) => ({
  type: 'reference' as const,
  reference: ref(relationTo, value),
  label,
  ...(appearance && { appearance }),
})
const custom = (label: string, url: string, appearance?: 'primary' | 'secondary' | 'link') => ({
  type: 'custom' as const,
  url,
  label,
  ...(appearance && { appearance }),
})

const productsData = [
  {
    name: 'Personal Loan',
    category: 'personal',
    icon: 'wallet',
    tagline: 'Instant funds for weddings, travel, medical needs & more',
    shortDescription:
      'Collateral-free personal loans with quick approval and minimal documentation from top banks and NBFCs.',
    keyFacts: {
      interestRate: 'From 10.49% p.a.',
      loanAmount: 'Up to ₹40 Lakh',
      tenure: '1 – 6 years',
      processingFee: 'Up to 2%',
    },
    features: [
      'No collateral or guarantor needed',
      'Disbursal in as little as 24–48 hours',
      'Flexible tenure up to 72 months',
      'Compare offers from multiple lenders',
    ],
    eligibility: [
      'Age 21 – 60 years',
      'Salaried with minimum ₹20,000 net monthly income',
      'Minimum 1 year total work experience',
      'CIBIL score of 700+ preferred',
    ],
    documents: [
      'PAN card & Aadhaar',
      'Last 3 months salary slips',
      'Last 6 months bank statement',
      'Passport size photograph',
    ],
    calc: {
      calcAmount: 500000,
      calcRate: 10.99,
      calcTenure: 5,
      calcMaxAmount: 4000000,
      calcMaxTenure: 7,
    },
    featured: true,
  },
  {
    name: 'Home Loan',
    category: 'home',
    icon: 'home',
    tagline: 'Make your dream home a reality at the lowest rates',
    shortDescription:
      'Home loans for purchase, construction, extension or renovation with long tenures and attractive interest rates.',
    keyFacts: {
      interestRate: 'From 8.35% p.a.',
      loanAmount: 'Up to ₹10 Crore',
      tenure: 'Up to 30 years',
      processingFee: '0.25% – 0.5%',
    },
    features: [
      'Up to 90% funding of property value',
      'Tax benefits under Sec 80C & 24(b)',
      'Balance transfer with top-up option',
      'Doorstep document pickup',
    ],
    eligibility: [
      'Age 21 – 65 years at loan maturity',
      'Salaried or self-employed',
      'Stable income & good repayment history',
      'Property with clear title',
    ],
    documents: [
      'KYC – PAN, Aadhaar, address proof',
      'Income proof – salary slips / ITR (2 years)',
      '6 months bank statement',
      'Property documents & sale agreement',
    ],
    calc: {
      calcAmount: 3000000,
      calcRate: 8.5,
      calcTenure: 20,
      calcMaxAmount: 50000000,
      calcMaxTenure: 30,
    },
    featured: true,
  },
  {
    name: 'Loan Against Property',
    category: 'lap',
    icon: 'building',
    tagline: 'Unlock the value of your property',
    shortDescription:
      'Get high-value loans against residential or commercial property for business expansion, education or other needs.',
    keyFacts: {
      interestRate: 'From 9.25% p.a.',
      loanAmount: 'Up to ₹5 Crore',
      tenure: 'Up to 15 years',
      processingFee: 'Up to 1%',
    },
    features: [
      'Up to 70% of market value',
      'Residential, commercial & industrial property accepted',
      'Lower EMIs with long tenure',
      'Use funds for any purpose',
    ],
    eligibility: [
      'Age 25 – 70 years',
      'Salaried or self-employed',
      'Self-owned property with clear title',
    ],
    documents: [
      'KYC documents',
      'Income proof & ITR',
      'Property chain documents',
      '12 months bank statement',
    ],
    calc: {
      calcAmount: 5000000,
      calcRate: 9.5,
      calcTenure: 10,
      calcMaxAmount: 50000000,
      calcMaxTenure: 15,
    },
    featured: true,
  },
  {
    name: 'Business Loan',
    category: 'business',
    icon: 'briefcase',
    tagline: 'Fuel your business growth',
    shortDescription:
      'Unsecured business loans and working capital for MSMEs, traders, manufacturers and professionals.',
    keyFacts: {
      interestRate: 'From 14% p.a.',
      loanAmount: 'Up to ₹75 Lakh',
      tenure: '1 – 5 years',
      processingFee: 'Up to 2.5%',
    },
    features: [
      'No collateral up to ₹75 Lakh',
      'Quick approval for GST-registered businesses',
      'Overdraft & term-loan options',
    ],
    eligibility: [
      'Business vintage of 3+ years',
      'Annual turnover above ₹40 Lakh',
      'Profitable for the last 2 years',
    ],
    documents: [
      'KYC of applicant & business',
      'GST returns & registration',
      'ITR with computation (2 years)',
      '12 months current account statement',
    ],
    calc: {
      calcAmount: 1500000,
      calcRate: 15,
      calcTenure: 3,
      calcMaxAmount: 7500000,
      calcMaxTenure: 5,
    },
    featured: true,
  },
  {
    name: 'Car Loan',
    category: 'vehicle',
    icon: 'car',
    tagline: 'Drive home your new or used car',
    shortDescription: 'New and used car loans with up to 100% on-road funding.',
    keyFacts: {
      interestRate: 'From 8.75% p.a.',
      loanAmount: 'Up to 100% on-road price',
      tenure: 'Up to 7 years',
      processingFee: 'Starting ₹3,500',
    },
    features: ['New & pre-owned cars', 'Up to 100% on-road funding', 'Quick dealer disbursal'],
    eligibility: ['Age 21 – 65 years', 'Minimum ₹25,000 monthly income'],
    documents: ['KYC documents', 'Income proof', 'Car quotation / proforma invoice'],
    calc: {
      calcAmount: 800000,
      calcRate: 9,
      calcTenure: 5,
      calcMaxAmount: 5000000,
      calcMaxTenure: 7,
    },
    featured: false,
  },
  {
    name: 'Education Loan',
    category: 'education',
    icon: 'graduation',
    tagline: 'Invest in your future – in India or abroad',
    shortDescription:
      'Education loans covering tuition, living and travel expenses for studies in India and overseas.',
    keyFacts: {
      interestRate: 'From 9.5% p.a.',
      loanAmount: 'Up to ₹1.5 Crore',
      tenure: 'Up to 15 years',
      processingFee: 'Up to 1%',
    },
    features: [
      'Covers tuition, living & travel',
      'Moratorium during course period',
      'Tax benefit under Sec 80E',
    ],
    eligibility: [
      'Admission to a recognised institution',
      'Co-applicant (parent / guardian) required',
    ],
    documents: [
      'Admission letter & fee structure',
      'Academic records',
      'KYC & income proof of co-applicant',
    ],
    calc: {
      calcAmount: 2000000,
      calcRate: 10,
      calcTenure: 10,
      calcMaxAmount: 15000000,
      calcMaxTenure: 15,
    },
    featured: false,
  },
] as const

const banksData = [
  { name: 'Bharat National Bank', type: 'bank', defaultCommissionRate: 1.0 },
  { name: 'Metro City Bank', type: 'bank', defaultCommissionRate: 0.9 },
  { name: 'Sahyadri Co-op Bank', type: 'bank', defaultCommissionRate: 0.75 },
  { name: 'Unity Housing Finance', type: 'hfc', defaultCommissionRate: 0.6 },
  { name: 'Swift Capital NBFC', type: 'nbfc', defaultCommissionRate: 2.0 },
  { name: 'Prime Credit Finance', type: 'nbfc', defaultCommissionRate: 1.75 },
] as const

const faqsData = [
  [
    'What is a DSA and how do you help me?',
    'We are a Direct Selling Agent (DSA) authorised by multiple banks and NBFCs. We compare offers, help you pick the best one, collect your documents and follow up with the bank until your loan is disbursed – at no extra cost to you.',
    'general',
  ],
  [
    'Do I have to pay you any fee?',
    'No. Our service is free for customers. We are paid by the partner banks. Any processing fee charged is the bank’s own fee and is paid directly to the bank.',
    'charges',
  ],
  [
    'How long does loan approval take?',
    'Personal loans can be approved within 24–72 hours. Home loans and loans against property typically take 7–15 working days, depending on property verification.',
    'process',
  ],
  [
    'What CIBIL score do I need?',
    'Most lenders prefer a CIBIL score of 700 or above. We also work with lenders that consider applicants with lower scores – talk to us about your profile.',
    'eligibility',
  ],
  [
    'Which documents are required?',
    'Usually PAN, Aadhaar, income proof (salary slips or ITR), and bank statements. Home loans and LAP also need property papers. We share an exact checklist once we understand your profile.',
    'documents',
  ],
  [
    'Will applying with multiple banks hurt my credit score?',
    'We first check eligibility and pick the most suitable lenders, so your file is logged only where approval chances are highest – avoiding unnecessary credit enquiries.',
    'eligibility',
  ],
] as const

const testimonialsData = [
  [
    'Rahul Sharma',
    'Pune',
    'Home Loan',
    'Got my home loan sanctioned at a better rate than my own bank offered. The team handled all the paperwork – I hardly had to visit the bank.',
  ],
  [
    'Priya Nair',
    'Mumbai',
    'Personal Loan',
    'Needed funds urgently for a medical emergency. Loan was disbursed in two days. Very transparent and helpful.',
  ],
  [
    'Amit Patel',
    'Ahmedabad',
    'Business Loan',
    'They compared offers from four lenders and got me the best deal for my working capital needs. Highly recommended for small businesses.',
  ],
] as const

const wipe: CollectionSlug[] = [
  'lead-activities',
  'lead-documents',
  'leads',
  'pages',
  'posts',
  'testimonials',
  'loan-products',
  'faqs',
  'banks',
]

export const seed = async (payload: Payload, { force = false } = {}) => {
  const context = { disableRevalidate: true }
  const existing = await payload.count({ collection: 'pages', overrideAccess: true })
  if (existing.totalDocs > 0 && !force) {
    payload.logger.info(
      'Database already has content – skipping seed (use --force to wipe and reseed).',
    )
    return
  }
  if (force) {
    for (const collection of wipe) {
      await payload.delete({
        collection,
        where: { id: { exists: true } },
        overrideAccess: true,
        context,
      })
    }
  }

  // In production never create accounts with a default password, and skip demo CRM data
  const isProd = process.env.NODE_ENV === 'production'
  if (isProd && !process.env.SEED_ADMIN_PASSWORD) {
    throw new Error(
      'Set SEED_ADMIN_PASSWORD (and SEED_ADMIN_EMAIL) before seeding a production database.',
    )
  }

  payload.logger.info('Seeding users…')
  const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@finsol.local'
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'ChangeMe@123'
  const findUser = async (email: string) =>
    (
      await payload.find({
        collection: 'users',
        where: { email: { equals: email } },
        limit: 1,
        overrideAccess: true,
      })
    ).docs[0]
  const admin =
    (await findUser(adminEmail)) ||
    (await payload.create({
      collection: 'users',
      overrideAccess: true,
      data: { email: adminEmail, password: adminPassword, name: 'Site Admin', roles: ['admin'] },
    }))
  const agent = isProd
    ? admin
    : (await findUser('agent@finsol.local')) ||
      (await payload.create({
        collection: 'users',
        overrideAccess: true,
        data: {
          email: 'agent@finsol.local',
          password: adminPassword,
          name: 'Demo Sales Agent',
          roles: ['agent'],
          phone: '9800000001',
        },
      }))

  payload.logger.info('Seeding FAQs, banks, products, testimonials…')
  const faqs = []
  for (const [i, [question, answer, category]] of faqsData.entries()) {
    faqs.push(
      await payload.create({
        collection: 'faqs',
        data: { question, answer, category, sortOrder: i },
        overrideAccess: true,
        context,
      }),
    )
  }

  const banks = []
  for (const [i, b] of banksData.entries()) {
    banks.push(
      await payload.create({
        collection: 'banks',
        data: { ...b, sortOrder: i, showOnWebsite: true },
        overrideAccess: true,
        context,
      }),
    )
  }

  const products = []
  for (const [i, pd] of productsData.entries()) {
    const { calc, features, eligibility, documents, ...rest } = pd
    products.push(
      await payload.create({
        collection: 'loan-products',
        overrideAccess: true,
        context,
        data: {
          ...rest,
          ...calc,
          features: features.map((text) => ({ text })),
          eligibility: eligibility.map((text) => ({ text })),
          documents: documents.map((text) => ({ text })),
          banks: banks.map((b) => b.id),
          faqs: faqs.slice(0, 4).map((f) => f.id),
          sortOrder: i,
          _status: 'published',
          content: doc(
            h(`Why choose us for your ${pd.name.toLowerCase()}?`),
            p(
              'We compare offers from multiple banks and NBFCs, so you get the best rate your profile qualifies for. Our relationship managers handle documentation and follow-ups end to end.',
            ),
          ),
        },
      }),
    )
  }
  // Home loan gets a better payout from the HFC
  await payload.update({
    collection: 'banks',
    id: banks[3].id,
    overrideAccess: true,
    context,
    data: {
      payoutGrid: [
        { product: products[1].id, rate: 0.5 },
        { product: products[2].id, rate: 0.8 },
      ],
    },
  })

  for (const [name, location, loanType, quote] of testimonialsData) {
    await payload.create({
      collection: 'testimonials',
      data: { name, location, loanType, quote, rating: 5, published: true },
      overrideAccess: true,
      context,
    })
  }

  payload.logger.info('Seeding pages…')
  const createPage = (
    title: string,
    slug: string,
    layout: unknown[],
    meta?: { title?: string; description?: string },
  ) =>
    payload.create({
      collection: 'pages',
      overrideAccess: true,
      context,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: { title, slug, layout: layout as any, _status: 'published', meta },
    })

  const contact = await createPage('Contact us', 'contact', [
    {
      blockType: 'leadForm',
      eyebrow: 'Get in touch',
      heading: 'Talk to a loan expert',
      intro:
        'Share a few details and our team will call you back within one working hour. You can also call or WhatsApp us directly.',
      submitLabel: 'Request a call back',
      background: 'light',
    },
    {
      blockType: 'content',
      heading: 'Visit our office',
      columns: [
        {
          size: 'full',
          richText: doc(
            p(
              'Update the office address, phone number and business hours from Admin → Site settings → Contact.',
            ),
          ),
        },
      ],
    },
  ])

  const about = await createPage('About us', 'about', [
    {
      blockType: 'hero',
      heading: 'Helping families and businesses borrow smarter',
      subheading:
        'We are a team of loan specialists working with leading banks and NBFCs to get you the right loan at the right rate.',
      side: 'none',
      background: 'brand',
    },
    {
      blockType: 'content',
      heading: 'Our story',
      columns: [
        {
          size: 'half',
          richText: doc(
            p(
              'Founded with a simple belief – getting a loan should be transparent and stress-free – we have helped thousands of customers secure personal loans, home loans and business finance.',
            ),
          ),
        },
        {
          size: 'half',
          richText: doc(
            p(
              'As an authorised Direct Selling Agent (DSA) for multiple lenders, we compare offers on your behalf and stay with you until the money reaches your account.',
            ),
          ),
        },
      ],
    },
    {
      blockType: 'stats',
      items: [
        { value: '10,000+', label: 'Happy customers' },
        { value: '₹500 Cr+', label: 'Loans disbursed' },
        { value: '25+', label: 'Partner lenders' },
        { value: '12 yrs', label: 'Experience' },
      ],
      background: 'dark',
    },
    { blockType: 'partnerBanks', heading: 'Our lending partners', background: 'light' },
  ])

  const privacy = await createPage('Privacy policy', 'privacy-policy', [
    {
      blockType: 'content',
      heading: 'Privacy policy',
      columns: [
        {
          size: 'full',
          richText: doc(
            p(
              'Replace this text with your privacy policy. Explain what personal data you collect through enquiry forms, how it is shared with partner banks, and how customers can request deletion.',
            ),
          ),
        },
      ],
    },
  ])
  const terms = await createPage('Terms of use', 'terms', [
    {
      blockType: 'content',
      heading: 'Terms of use',
      columns: [
        { size: 'full', richText: doc(p('Replace this text with your website terms of use.')) },
      ],
    },
  ])

  await createPage(
    'Home',
    'home',
    [
      {
        blockType: 'hero',
        eyebrow: 'Trusted loan partner',
        heading: 'Get the right loan from the right bank – fast.',
        subheading:
          'Compare personal, home and business loan offers from 25+ banks & NBFCs. Free expert help from application to disbursal.',
        buttons: [
          { link: custom('Check eligibility', '#apply', 'primary') },
          { link: custom('EMI calculator', '#emi-calculator', 'secondary') },
        ],
        trustPoints: [
          { text: 'No hidden charges' },
          { text: 'Doorstep service' },
          { text: 'Approval in 48 hrs*' },
        ],
        side: 'form',
        formHeading: 'Get a free call back',
        background: 'brand',
      },
      {
        blockType: 'partnerBanks',
        eyebrow: 'Our partners',
        heading: 'Loans from India’s leading lenders',
        background: 'white',
      },
      {
        blockType: 'loanProducts',
        eyebrow: 'What we offer',
        heading: 'Loans for every need',
        intro: 'From your first home to growing your business – we find you the best offer.',
        show: 'all',
        background: 'light',
      },
      {
        blockType: 'features',
        eyebrow: 'Why choose us',
        heading: 'Borrowing made simple',
        columns: '4',
        items: [
          {
            icon: 'percent',
            title: 'Best rates',
            description: 'We compare multiple lenders so you get the lowest rate you qualify for.',
          },
          {
            icon: 'clock',
            title: 'Quick approvals',
            description: 'Pre-checked files mean faster sanctions and disbursals.',
          },
          {
            icon: 'shield',
            title: '100% transparent',
            description: 'No hidden fees. Our service is free for customers.',
          },
          {
            icon: 'handshake',
            title: 'End-to-end support',
            description: 'A dedicated relationship manager until disbursal.',
          },
        ],
        background: 'white',
      },
      {
        blockType: 'steps',
        eyebrow: 'How it works',
        heading: 'Your loan in 4 easy steps',
        steps: [
          { title: 'Share your requirement', description: 'Fill the short form or call us.' },
          {
            title: 'Get matched',
            description: 'We check eligibility and shortlist the best lenders.',
          },
          {
            title: 'Submit documents',
            description: 'Doorstep pickup – we prepare and log your file.',
          },
          {
            title: 'Get disbursed',
            description: 'We follow up with the bank until money reaches you.',
          },
        ],
        background: 'light',
      },
      {
        blockType: 'stats',
        items: [
          { value: '10,000+', label: 'Happy customers' },
          { value: '₹500 Cr+', label: 'Loans disbursed' },
          { value: '25+', label: 'Partner lenders' },
          { value: '4.8★', label: 'Customer rating' },
        ],
        background: 'dark',
      },
      {
        blockType: 'emiCalculator',
        eyebrow: 'Plan ahead',
        heading: 'EMI calculator',
        intro: 'Find out your monthly instalment before you apply.',
        defaultAmount: 1000000,
        defaultRate: 10.5,
        defaultTenure: 5,
        maxAmount: 20000000,
        maxTenure: 30,
        background: 'white',
      },
      {
        blockType: 'testimonials',
        eyebrow: 'Testimonials',
        heading: 'What our customers say',
        background: 'light',
      },
      {
        blockType: 'faq',
        eyebrow: 'FAQs',
        heading: 'Frequently asked questions',
        background: 'white',
      },
      {
        blockType: 'leadForm',
        eyebrow: 'Apply now',
        heading: 'Get your free loan consultation',
        intro:
          'Tell us what you need and a loan expert will call you back. It takes less than a minute.',
        anchorId: 'apply',
        background: 'light',
      },
      {
        blockType: 'cta',
        heading: 'Prefer to talk? We’re one call away.',
        text: 'Speak to a loan expert now – Monday to Saturday, 10 am to 7 pm.',
        buttons: [{ link: internal('Contact us', 'pages', contact.id, 'primary') }],
        background: 'brand',
      },
    ],
    {
      title: 'Finsol – Personal, Home & Business Loans from Top Banks',
      description:
        'Compare and apply for personal loans, home loans, loan against property and business loans from leading banks and NBFCs. Free expert assistance.',
    },
  )

  payload.logger.info('Seeding blog…')
  await payload.create({
    collection: 'posts',
    overrideAccess: true,
    context,
    data: {
      title: '5 ways to improve your CIBIL score before applying for a loan',
      slug: 'improve-cibil-score',
      excerpt:
        'A good credit score gets you faster approvals and lower interest rates. Here is how to boost yours.',
      _status: 'published',
      publishedAt: new Date().toISOString(),
      author: admin.id,
      content: doc(
        p(
          'Your CIBIL score is the first thing a lender checks. A score of 750+ can unlock the best interest rates.',
        ),
        h('1. Pay every EMI and card bill on time'),
        p(
          'Payment history has the biggest impact on your score. Set up auto-debit to avoid missed payments.',
        ),
        h('2. Keep credit utilisation below 30%'),
        p('Using too much of your credit card limit signals credit hunger.'),
        h('3. Avoid multiple loan applications at once'),
        p(
          'Each application creates a hard enquiry. Let an expert shortlist the right lenders first.',
        ),
        h('4. Maintain a healthy credit mix'),
        p('A mix of secured and unsecured credit, handled well, improves your profile.'),
        h('5. Check your report for errors'),
        ul([
          'Download your free report once a year',
          'Raise disputes for wrong entries',
          'Close settled accounts properly',
        ]),
      ),
    },
  })

  payload.logger.info('Seeding header, footer & settings…')
  await payload.updateGlobal({
    slug: 'header',
    context,
    data: {
      announcement: 'Home loans starting 8.35% p.a. – check your eligibility in 2 minutes!',
      showLoanMenu: true,
      navItems: [
        { link: internal('About', 'pages', about.id) },
        { link: custom('EMI Calculator', '/#emi-calculator') },
        { link: custom('Blog', '/blog') },
        { link: internal('Contact', 'pages', contact.id) },
      ],
      cta: custom('Apply now', '/#apply'),
    },
  })
  await payload.updateGlobal({
    slug: 'footer',
    context,
    data: {
      about:
        'Your trusted partner for personal, home and business loans. We work with leading banks and NBFCs to find you the best offer.',
      columns: [
        {
          title: 'Loans',
          links: products
            .slice(0, 5)
            .map((pr) => ({ link: internal(pr.name, 'loan-products', pr.id) })),
        },
        {
          title: 'Company',
          links: [
            { link: internal('About us', 'pages', about.id) },
            { link: custom('Blog', '/blog') },
            { link: internal('Contact', 'pages', contact.id) },
          ],
        },
      ],
      bottomLinks: [
        { link: internal('Privacy policy', 'pages', privacy.id) },
        { link: internal('Terms', 'pages', terms.id) },
      ],
    },
  })
  await payload.updateGlobal({
    slug: 'site-settings',
    context,
    data: {
      siteName: 'Finsol',
      tagline: 'Your trusted loan partner',
      phone: '+91 98765 43210',
      whatsapp: '919876543210',
      email: 'hello@example.com',
      address: 'Office 101, Business Park, MG Road, Pune 411001',
      businessHours: 'Mon – Sat, 10:00 am – 7:00 pm',
      primaryColor: '#0b4f9c',
      accentColor: '#f59e0b',
      defaultMetaDescription:
        'Compare and apply for loans from leading banks and NBFCs with free expert help.',
      social: [
        { platform: 'facebook', url: 'https://facebook.com' },
        { platform: 'instagram', url: 'https://instagram.com' },
        { platform: 'linkedin', url: 'https://linkedin.com' },
      ],
      crm: {
        notifyEmails: [{ email: adminEmail.endsWith('.local') ? 'owner@example.com' : adminEmail }],
        autoAssign: false,
      },
    },
  })

  if (isProd) {
    payload.logger.info(`✅ Seed complete. Log in at /admin with ${adminEmail}`)
    return
  }

  payload.logger.info('Seeding demo leads…')
  const day = 86400000
  const demoLeads = [
    {
      fullName: 'Sneha Kulkarni',
      phone: '9811111111',
      city: 'Pune',
      loanProduct: products[1].id,
      amountRequired: 4500000,
      monthlyIncome: 150000,
      employmentType: 'salaried',
      status: 'docs-pending',
      priority: 'hot',
      source: 'website',
      nextFollowUp: new Date(Date.now() - day).toISOString(),
    },
    {
      fullName: 'Vikram Singh',
      phone: '9822222222',
      city: 'Mumbai',
      loanProduct: products[0].id,
      amountRequired: 800000,
      monthlyIncome: 90000,
      employmentType: 'salaried',
      status: 'new',
      priority: 'warm',
      source: 'website',
      nextFollowUp: new Date().toISOString(),
    },
    {
      fullName: 'Kavita Traders (Kavita Joshi)',
      phone: '9833333333',
      city: 'Nashik',
      loanProduct: products[3].id,
      amountRequired: 2500000,
      employmentType: 'self-employed-business',
      status: 'logged-in',
      priority: 'warm',
      source: 'referral',
      referredBy: 'CA Mehta',
    },
    {
      fullName: 'Arjun Rao',
      phone: '9844444444',
      city: 'Bengaluru',
      loanProduct: products[1].id,
      amountRequired: 6000000,
      employmentType: 'salaried',
      status: 'disbursed',
      priority: 'warm',
      source: 'phone',
      disbursingBank: banks[3].id,
      sanctionedAmount: 6000000,
      disbursedAmount: 6000000,
      disbursalDate: new Date().toISOString(),
    },
    {
      fullName: 'Meera Iyer',
      phone: '9855555555',
      city: 'Chennai',
      loanProduct: products[0].id,
      amountRequired: 300000,
      employmentType: 'salaried',
      status: 'lost',
      priority: 'cold',
      source: 'ads',
    },
  ] as const
  for (const [i, lead] of demoLeads.entries()) {
    await payload.create({
      collection: 'leads',
      overrideAccess: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: { ...(lead as any), assignedTo: i % 2 === 0 ? agent.id : admin.id, consent: true },
    })
  }

  payload.logger.info(
    `✅ Seed complete. Log in at /admin with ${adminEmail} / ${process.env.SEED_ADMIN_PASSWORD ? '(your SEED_ADMIN_PASSWORD)' : adminPassword}`,
  )
}
