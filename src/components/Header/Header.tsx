'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Phone, MessageCircle, Menu, X, Globe, ChevronDown } from 'lucide-react'
import styles from './Header.module.css'

export interface NavSubItem {
  label: string
  href: string
  description?: string
}

export interface NavItem {
  label: string
  href: string
  subItems?: NavSubItem[]
}

interface HeaderProps {
  initialLogoUrl?: string | null
  currentLocale?: 'id' | 'en'
  settings?: {
    name?: string
    phone?: string
    whatsapp?: string
    whatsappUrl?: string
    logoUrl?: string | null
    logoWhiteUrl?: string | null
    bookingEngineType?: string
    thirdPartyBookingUrl?: string
  }
  headerConfig?: {
    navItems?: NavItem[]
    bookButtonText?: string
  }
}

export const Header: React.FC<HeaderProps> = ({ initialLogoUrl, currentLocale = 'id', settings, headerConfig }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [expandedMobileIndex, setExpandedMobileIndex] = useState<number | null>(null)
  const [currentLang, setCurrentLang] = useState<'id' | 'en'>(currentLocale)
  const [logoUrl, setLogoUrl] = useState<string | null>(settings?.logoUrl || initialLogoUrl || null)
  const [phone, setPhone] = useState(settings?.phone || '+62 251 756 9000')
  const [whatsapp, setWhatsapp] = useState(settings?.whatsapp || '+62 851 8309 3061')
  const [whatsappUrl, setWhatsappUrl] = useState(
    settings?.whatsappUrl || 'https://wa.me/6285183093061?text=Halo%20Padjadjaran%20Suites,%20saya%20ingin%20tanya%20ketersediaan%20kamar'
  )

  const bookingUrl =
    !settings || settings.bookingEngineType === 'third-party'
      ? settings?.thirdPartyBookingUrl || 'https://be.dip.id/booking/cekrooms?keyid=9de3264a0298106659401228618ea286'
      : settings.bookingEngineType === 'whatsapp'
      ? whatsappUrl
      : '/booking'

  const isExternalBooking = bookingUrl.startsWith('http')

  const defaultNavItemsId: NavItem[] = [
    { label: 'Kamar & Suites', href: '/rooms' },
    { label: 'Restoran', href: '/dining' },
    {
      label: 'Pertemuan & Acara',
      href: '/events',
      subItems: [
        {
          label: 'MICE & Ruang Rapat',
          href: '/events',
          description: 'Ruang pertemuan modern & paket meeting bisnis',
        },
        {
          label: 'Wedding & Perayaan',
          href: '/wedding',
          description: 'Pernikahan impian di Bale Pakuan Grand Ballroom',
        },
        {
          label: 'MICE Event Planner',
          href: '/events#planner',
          description: 'Kalkulator layout, kapasitas & estimasi acara',
        },
      ],
    },
    {
      label: 'Pengalaman & Fasilitas',
      href: '/facilities',
      subItems: [
        {
          label: 'Fasilitas Hotel',
          href: '/facilities',
          description: 'Kolam renang, spa, fitness center & lounge',
        },
        {
          label: 'Wisata Sekitar Bogor',
          href: '/destination',
          description: 'Panduan destinasi populer di dekat hotel',
        },
        {
          label: 'Galeri Foto HD',
          href: '/gallery',
          description: 'Dokumentasi visual keindahan dan suasana hotel',
        },
        {
          label: 'Jurnal & Inspirasi',
          href: '/blog',
          description: 'Artikel wisata Bogor & inspirasi acara',
        },
        {
          label: 'Tentang Kami',
          href: '/about',
          description: 'Kisah & warisan keramahan luhur Sunda',
        },
        {
          label: 'Virtual Tour 360°',
          href: '/virtual-tour',
          description: 'Eksplorasi virtual interaktif seluruh area resor',
        },
      ],
    },
    { label: 'Penawaran', href: '/offers' },
    { label: 'Kontak', href: '/contact' },
  ]

  const defaultNavItemsEn: NavItem[] = [
    { label: 'Rooms & Suites', href: '/rooms' },
    { label: 'Dining', href: '/dining' },
    {
      label: 'Events & Meetings',
      href: '/events',
      subItems: [
        {
          label: 'MICE & Meeting Rooms',
          href: '/events',
          description: 'Modern venues & corporate business packages',
        },
        {
          label: 'Weddings & Celebrations',
          href: '/wedding',
          description: 'Dream weddings at Bale Pakuan Grand Ballroom',
        },
        {
          label: 'MICE Event Planner',
          href: '/events#planner',
          description: 'Interactive layout & capacity estimator',
        },
      ],
    },
    {
      label: 'Experience & Facilities',
      href: '/facilities',
      subItems: [
        {
          label: 'Resort Facilities',
          href: '/facilities',
          description: 'Swimming pool, spa, fitness center & lounge',
        },
        {
          label: 'Bogor Destinations',
          href: '/destination',
          description: 'Explore popular tourist spots around the hotel',
        },
        {
          label: 'Photo Gallery HD',
          href: '/gallery',
          description: 'Visual showcase of rooms, dining & spaces',
        },
        {
          label: 'Journal & Stories',
          href: '/blog',
          description: 'Travel guides & hospitality stories',
        },
        {
          label: 'About Our Heritage',
          href: '/about',
          description: 'The story and philosophy of our resort',
        },
        {
          label: '360° Virtual Tour',
          href: '/virtual-tour',
          description: 'Interactive virtual walkthrough of all areas',
        },
      ],
    },
    { label: 'Special Offers', href: '/offers' },
    { label: 'Contact', href: '/contact' },
  ]

  const defaultNavItems = currentLang === 'en' ? defaultNavItemsEn : defaultNavItemsId

  const [navItems, setNavItems] = useState<NavItem[]>(
    headerConfig?.navItems && headerConfig.navItems.length > 0
      ? headerConfig.navItems
      : defaultNavItems
  )
  const [bookButtonText, setBookButtonText] = useState(
    headerConfig?.bookButtonText || (currentLang === 'en' ? 'Book Now' : 'Pesan Kamar')
  )

  const handleLangChange = (lang: 'id' | 'en') => {
    if (lang === currentLang) return
    document.cookie = `NEXT_LOCALE=${lang}; path=/; max-age=31536000; SameSite=Lax`
    setCurrentLang(lang)
    window.location.reload()
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    // Fetch latest settings from CMS SiteSettings
    fetch('/api/globals/site-settings')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          if (data.logo?.url) setLogoUrl(data.logo.url)
          if (data.phone) setPhone(data.phone)
          if (data.whatsapp) {
            setWhatsapp(data.whatsapp)
            const clean = data.whatsapp.replace(/[^0-9]/g, '')
            setWhatsappUrl(`https://wa.me/${clean}?text=Halo%20Padjadjaran%20Suites,%20saya%20ingin%20tanya%20ketersediaan%20kamar`)
          }
        }
      })
      .catch(() => {})

    // Fetch latest navigation config from CMS HeaderConfig
    fetch(`/api/globals/header-config?locale=${currentLang}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          if (data.navItems && Array.isArray(data.navItems) && data.navItems.length > 0) {
            setNavItems(
              data.navItems.map((item: any) => ({
                label: item.label,
                href: item.href,
                subItems:
                  item.subItems && Array.isArray(item.subItems) && item.subItems.length > 0
                    ? item.subItems.map((s: any) => ({
                        label: s.label,
                        href: s.href,
                        description: s.description || undefined,
                      }))
                    : undefined,
              }))
            )
          }
          if (data.bookButtonText) {
            if (currentLang === 'en' && (data.bookButtonText === 'Pesan Sekarang' || data.bookButtonText === 'Pesan Kamar')) {
              setBookButtonText('Book Now')
            } else {
              setBookButtonText(data.bookButtonText)
            }
          }
        }
      })
      .catch(() => {})

    return () => window.removeEventListener('scroll', handleScroll)
  }, [currentLang])

  return (
    <header className={styles.headerWrapper}>
      {/* Top Bar for Direct Contact & Language */}
      <div className={styles.topBar}>
        <div className={`site-container ${styles.topBarInner}`}>
          <div className={styles.topBarContact}>
            <a href={`tel:${phone.replace(/\s+/g, '')}`} className={styles.contactItem}>
              <Phone size={13} color="#c5a55a" />
              <span>{phone}</span>
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactItem}
            >
              <MessageCircle size={13} color="#25D366" />
              <span>WA: {whatsapp}</span>
            </a>
          </div>

          <div className={styles.topBarRight}>
            <div className={styles.langSwitch} title="Pilih Bahasa / Choose Language">
              <Globe size={13} color="#c5a55a" />
              <button
                className={`${styles.langBtn} ${currentLang === 'id' ? styles.langBtnActive : ''}`}
                onClick={() => handleLangChange('id')}
              >
                ID
              </button>
              <span style={{ color: '#4b5563', fontSize: '0.75rem' }}>|</span>
              <button
                className={`${styles.langBtn} ${currentLang === 'en' ? styles.langBtnActive : ''}`}
                onClick={() => handleLangChange('en')}
              >
                EN
              </button>
            </div>
            <Link
              href="/admin"
              className={styles.contactItem}
              style={{ fontSize: '0.75rem', opacity: 0.8 }}
            >
              CMS Login
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className={`${styles.mainNav} ${isScrolled ? styles.mainNavScrolled : ''}`}>
        <div className={`site-container ${styles.navContainer}`}>
          {/* Brand Logo */}
          <Link href="/" className={styles.logoArea}>
            {logoUrl ? (
              <img
                src={logoUrl}
                alt="Padjadjaran Suites Resort & Convention Hotel"
                className={styles.brandLogoImg}
              />
            ) : (
              <>
                <span className={styles.logoTitle}>PADJADJARAN</span>
                <span className={styles.logoSubtitle}>SUITES RESORT & CONVENTION</span>
              </>
            )}
          </Link>

          {/* Desktop Menu */}
          <ul className={styles.menuList}>
            {navItems.map((item, idx) => {
              const hasSub = item.subItems && item.subItems.length > 0
              return (
                <li key={idx} className={hasSub ? styles.dropdownParent : styles.navItemSimple}>
                  <Link href={item.href} className={styles.navLink}>
                    <span>{item.label}</span>
                    {hasSub && <ChevronDown size={14} className={styles.navChevron} />}
                  </Link>

                  {hasSub && (
                    <div className={styles.dropdownPanel}>
                      <div className={styles.dropdownInner}>
                        {item.subItems!.map((sub, sIdx) => (
                          <Link key={sIdx} href={sub.href} className={styles.dropdownCard}>
                            <span className={styles.dropdownCardTitle}>{sub.label}</span>
                            {sub.description && (
                              <span className={styles.dropdownCardDesc}>{sub.description}</span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              )
            })}
          </ul>

          {/* Call to action & Mobile Toggle */}
          <div className={styles.navActions}>
            {isExternalBooking ? (
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-luxury-primary"
                style={{ padding: '10px 24px', fontSize: '0.82rem' }}
              >
                {currentLang === 'id' ? bookButtonText : 'Book Now'}
              </a>
            ) : (
              <Link href="/booking" className="btn-luxury-primary" style={{ padding: '10px 24px', fontSize: '0.82rem' }}>
                {currentLang === 'id' ? bookButtonText : 'Book Now'}
              </Link>
            )}
            <button
              className={styles.hamburgerBtn}
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Buka Menu"
            >
              <Menu size={26} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Backdrop */}
      <div
        className={`${styles.mobileBackdrop} ${isMobileOpen ? styles.mobileBackdropOpen : ''}`}
        onClick={() => setIsMobileOpen(false)}
      />

      {/* Mobile Drawer */}
      <div className={`${styles.mobileDrawer} ${isMobileOpen ? styles.mobileDrawerOpen : ''}`}>
        <div>
          <div className={styles.mobileDrawerHeader}>
            <div className={styles.logoArea}>
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt="Padjadjaran Suites Resort & Convention Hotel"
                  className={styles.brandLogoImgMobile}
                />
              ) : (
                <>
                  <span className={styles.logoTitle} style={{ fontSize: '1.2rem' }}>PADJADJARAN</span>
                  <span className={styles.logoSubtitle}>SUITES RESORT</span>
                </>
              )}
            </div>
            <button
              style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer' }}
              onClick={() => setIsMobileOpen(false)}
              aria-label="Tutup Menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Mobile Language Switcher */}
          <div className={styles.mobileLangSwitch}>
            <span style={{ fontSize: '0.82rem', color: '#d1d5db', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Globe size={15} color="#c5a55a" />
              {currentLang === 'en' ? 'Language' : 'Pilihan Bahasa'}
            </span>
            <div className={styles.mobileLangBtns}>
              <button
                className={`${styles.langBtn} ${currentLang === 'id' ? styles.langBtnActive : ''}`}
                onClick={() => handleLangChange('id')}
              >
                ID
              </button>
              <span style={{ color: '#6b7280', fontSize: '0.75rem' }}>|</span>
              <button
                className={`${styles.langBtn} ${currentLang === 'en' ? styles.langBtnActive : ''}`}
                onClick={() => handleLangChange('en')}
              >
                EN
              </button>
            </div>
          </div>

          <ul className={styles.mobileMenuList}>
            {navItems.map((item, idx) => {
              const hasSub = item.subItems && item.subItems.length > 0
              const isExpanded = expandedMobileIndex === idx

              return (
                <li key={idx} className={styles.mobileMenuItem}>
                  <div className={styles.mobileNavRow}>
                    <Link
                      href={item.href}
                      className={styles.mobileNavLink}
                      onClick={() => setIsMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                    {hasSub && (
                      <button
                        type="button"
                        className={styles.mobileAccordionToggle}
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          setExpandedMobileIndex(isExpanded ? null : idx)
                        }}
                        aria-label="Buka Submenu"
                      >
                        <ChevronDown
                          size={18}
                          className={`${styles.mobileChevron} ${isExpanded ? styles.mobileChevronRotated : ''}`}
                        />
                      </button>
                    )}
                  </div>

                  {hasSub && isExpanded && (
                    <ul className={styles.mobileSubList}>
                      {item.subItems!.map((sub, sIdx) => (
                        <li key={sIdx}>
                          <Link
                            href={sub.href}
                            className={styles.mobileSubLink}
                            onClick={() => setIsMobileOpen(false)}
                          >
                            <span className={styles.mobileSubBullet}>—</span>
                            <div className={styles.mobileSubContent}>
                              <div className={styles.mobileSubTitle}>{sub.label}</div>
                              {sub.description && (
                                <div className={styles.mobileSubDesc}>{sub.description}</div>
                              )}
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              )
            })}
          </ul>
        </div>

        <div className={styles.mobileDrawerFooter}>
          {isExternalBooking ? (
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-luxury-primary"
              style={{ width: '100%', textAlign: 'center', display: 'block' }}
              onClick={() => setIsMobileOpen(false)}
            >
              {currentLang === 'id' ? bookButtonText : 'Book Now'}
            </a>
          ) : (
            <Link
              href="/booking"
              className="btn-luxury-primary"
              style={{ width: '100%', textAlign: 'center', display: 'block' }}
              onClick={() => setIsMobileOpen(false)}
            >
              {currentLang === 'id' ? bookButtonText : 'Book Now'}
            </Link>
          )}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', fontSize: '0.85rem', color: '#9ca3af' }}>
            <a href={`tel:${phone.replace(/\s+/g, '')}`}>{phone}</a>
            <span>•</span>
            <Link href="/admin">CMS Portal</Link>
          </div>
        </div>
      </div>
    </header>
  )
}