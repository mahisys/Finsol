import Link from 'next/link'
import React from 'react'
import type { Header as HeaderType, LoanProduct, SiteSetting } from '@/payload-types'
import { mediaUrl } from '@/utilities/media'
import { CmsLink } from './CmsLink'
import { Icon } from './Icon'
import { MobileNav } from './MobileNav'

export const Header: React.FC<{
  header: HeaderType
  settings: SiteSetting
  products: LoanProduct[]
}> = ({ header, settings, products }) => {
  const logo = mediaUrl(settings.logo)
  return (
    <>
      {header.announcement && <div className="announcement">{header.announcement}</div>}
      <header className="site-header">
        <div className="container site-header__inner">
          <Link href="/" className="brand" aria-label={settings.siteName}>
            {logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logo} alt={settings.siteName} className="brand__logo" />
            ) : (
              <>
                <span className="brand__mark" aria-hidden>
                  {settings.siteName?.charAt(0)}
                </span>
                <span className="brand__name">{settings.siteName}</span>
              </>
            )}
          </Link>
          <MobileNav>
            <nav className="nav" aria-label="Main">
              <ul>
                {header.showLoanMenu && products.length > 0 && (
                  <li className="has-children">
                    <Link href="/loans">Loans</Link>
                    <ul className="dropdown dropdown--loans">
                      {products.map((p) => (
                        <li key={p.id}>
                          <Link href={`/loans/${p.slug}`}>
                            <Icon name={p.icon} size={20} />
                            <span>{p.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                )}
                {header.navItems?.map((item) => (
                  <li key={item.id} className={item.children?.length ? 'has-children' : undefined}>
                    <CmsLink link={item.link} />
                    {!!item.children?.length && (
                      <ul className="dropdown">
                        {item.children.map((c) => (
                          <li key={c.id}>
                            <CmsLink link={c.link} />
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
            <div className="site-header__actions">
              {settings.phone && (
                <a href={`tel:${settings.phone.replace(/\s/g, '')}`} className="header-phone">
                  <Icon name="phone" size={18} /> {settings.phone}
                </a>
              )}
              {header.cta && <CmsLink link={{ ...header.cta, appearance: 'primary' }} />}
            </div>
          </MobileNav>
        </div>
      </header>
    </>
  )
}
