import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import Script from 'next/script'
import React from 'react'
import { Footer, WhatsAppButton } from '@/components/site/Footer'
import { Header } from '@/components/site/Header'
import { LivePreviewListener } from '@/components/site/LivePreviewListener'
import { getGlobals, getLoanProducts } from '@/lib/payload'
import { getServerSideURL } from '@/utilities/getURL'
import { mediaUrl } from '@/utilities/media'
import './styles.css'

// Content comes from the CMS, so pages render per request – edits show up immediately
export const dynamic = 'force-dynamic'

const HEX = /^#[0-9a-fA-F]{3,8}$/

export async function generateMetadata(): Promise<Metadata> {
  const { settings } = await getGlobals()
  const favicon = mediaUrl(settings.favicon)
  const og = mediaUrl(settings.defaultOgImage)
  return {
    metadataBase: new URL(getServerSideURL()),
    title: {
      default: `${settings.siteName} – ${settings.tagline ?? ''}`,
      template: `%s | ${settings.siteName}`,
    },
    description: settings.defaultMetaDescription || settings.tagline || undefined,
    icons: favicon ? [{ url: favicon }] : undefined,
    openGraph: { siteName: settings.siteName, images: og ? [og] : undefined, type: 'website' },
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [{ settings, header, footer }, products, { isEnabled: draft }] = await Promise.all([
    getGlobals(),
    getLoanProducts(),
    draftMode(),
  ])
  const brand = HEX.test(settings.primaryColor || '') ? settings.primaryColor : undefined
  const accent = HEX.test(settings.accentColor || '') ? settings.accentColor : undefined
  const themeVars = {
    ...(brand && { '--brand': brand }),
    ...(accent && { '--accent': accent }),
  } as React.CSSProperties
  const ga = settings.googleAnalyticsId?.match(/^G-[A-Z0-9]+$/i)?.[0]
  const pixel = settings.metaPixelId?.match(/^\d+$/)?.[0]

  return (
    <html lang="en-IN">
      <body style={themeVars}>
        {draft && (
          <div className="preview-bar">
            Preview mode – you are seeing unpublished changes.{' '}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- route handler, needs a full request */}
            <a href="/next/exit-preview">Exit preview</a>
            <LivePreviewListener />
          </div>
        )}
        <Header header={header} settings={settings} products={products} />
        <main>{children}</main>
        <Footer footer={footer} settings={settings} />
        <WhatsAppButton number={settings.whatsapp} siteName={settings.siteName} />
        {ga && !draft && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${ga}`}
              strategy="afterInteractive"
            />
            <Script id="ga" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${ga}');`}
            </Script>
          </>
        )}
        {pixel && !draft && (
          <Script id="fb-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixel}');fbq('track','PageView');`}
          </Script>
        )}
      </body>
    </html>
  )
}
