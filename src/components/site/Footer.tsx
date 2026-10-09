import Link from 'next/link'
import React from 'react'
import type { Footer as FooterType, SiteSetting } from '@/payload-types'
import { mediaUrl } from '@/utilities/media'
import { CmsLink } from './CmsLink'
import { Icon } from './Icon'

export const Footer: React.FC<{ footer: FooterType; settings: SiteSetting }> = ({
  footer,
  settings,
}) => {
  const logo = mediaUrl(settings.logoLight) || mediaUrl(settings.logo)
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <div className="site-footer__about">
            <Link href="/" className="brand brand--light">
              {logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logo} alt={settings.siteName} className="brand__logo" />
              ) : (
                <>
                  <span className="brand__mark">{settings.siteName?.charAt(0)}</span>
                  <span className="brand__name">{settings.siteName}</span>
                </>
              )}
            </Link>
            {footer.about && <p>{footer.about}</p>}
            {!!settings.social?.length && (
              <ul className="social">
                {settings.social.map((s) => (
                  <li key={s.id}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer">
                      {s.platform}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {footer.columns?.map((col) => (
            <div key={col.id}>
              <h4>{col.title}</h4>
              <ul>
                {col.links?.map((l) => (
                  <li key={l.id}>
                    <CmsLink link={l.link} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h4>Contact us</h4>
            <ul className="contact-list">
              {settings.phone && (
                <li>
                  <Icon name="phone" size={18} />
                  <a href={`tel:${settings.phone.replace(/\s/g, '')}`}>{settings.phone}</a>
                </li>
              )}
              {settings.email && (
                <li>
                  <Icon name="mail" size={18} />
                  <a href={`mailto:${settings.email}`}>{settings.email}</a>
                </li>
              )}
              {settings.address && (
                <li>
                  <Icon name="pin" size={18} />
                  <span>{settings.address}</span>
                </li>
              )}
              {settings.businessHours && (
                <li>
                  <Icon name="clock" size={18} />
                  <span>{settings.businessHours}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
        {settings.disclaimer && <p className="disclaimer">{settings.disclaimer}</p>}
        <div className="site-footer__bottom">
          <span>
            {footer.copyright || `© ${year} ${settings.siteName}. All rights reserved.`}
            {settings.registrationInfo ? ` · ${settings.registrationInfo}` : ''}
          </span>
          <ul>
            {footer.bottomLinks?.map((l) => (
              <li key={l.id}>
                <CmsLink link={l.link} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}

export const WhatsAppButton: React.FC<{ number?: string | null; siteName?: string }> = ({
  number,
  siteName,
}) => {
  if (!number) return null
  const text = encodeURIComponent(`Hi ${siteName || ''}, I would like to know more about loans.`)
  return (
    <a
      className="whatsapp-float"
      href={`https://wa.me/${number.replace(/\D/g, '')}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <Icon name="whatsapp" size={30} filled />
    </a>
  )
}
