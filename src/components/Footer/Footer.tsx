'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { MapPin, Phone, Mail, MessageCircle, Share2 } from 'lucide-react'
import styles from './Footer.module.css'

interface FooterProps {
  initialLogoUrl?: string | null
  currentLocale?: 'id' | 'en'
  settings?: {
    name?: string
    tagline?: string
    phone?: string
    whatsapp?: string
    whatsappUrl?: string
    email?: string
    address?: string
    googleMapsUrl?: string
    social?: {
      instagram?: string
      facebook?: string
      tiktok?: string
    }
    logoUrl?: string | null
    logoWhiteUrl?: string | null
  }
  footerConfig?: {
    aboutText?: string
    copyrightText?: string
    quickLinks?: { label: string; href: string }[]
  }
}

export const Footer: React.FC<FooterProps> = ({ initialLogoUrl, currentLocale = 'id', settings, footerConfig }) => {
  const defaultAboutTextId =
    'Menghadirkan pesona resor menenangkan dengan fasilitas konvensi lengkap dan berkelas internasional di kawasan Bogor Nirwana Residence (BNR), Bogor, Jawa Barat.'
  const defaultAboutTextEn =
    'Offering serene resort tranquility paired with world-class convention facilities in the prestigious Bogor Nirwana Residence (BNR), Bogor, West Java.'
  const defaultAboutText = currentLocale === 'en' ? defaultAboutTextEn : defaultAboutTextId

  const defaultCopyright = '© 2026 Padjadjaran Suites Resort & Convention Hotel Bogor. All Rights Reserved.'
  const defaultQuickLinksId = [
    { label: 'Tentang Padjadjaran Suites', href: '/about' },
    { label: 'Jurnal & Inspirasi Wisata', href: '/blog' },
    { label: 'Galeri Foto HD', href: '/gallery' },
    { label: 'Penawaran & Promo Spesial', href: '/offers' },
    { label: 'Cek Ketersediaan & Booking', href: '/booking' },
    { label: 'Lokasi & Kontak', href: '/contact' },
    { label: 'Aplikasi Android', href: 'https://play.google.com/store/apps/details?id=com.dip.padjadjaransuites' },
    { label: 'Portal Admin CMS', href: '/admin' },
  ]
  const defaultQuickLinksEn = [
    { label: 'About Our Heritage', href: '/about' },
    { label: 'Journal & Travel Stories', href: '/blog' },
    { label: 'Photo Gallery HD', href: '/gallery' },
    { label: 'Exclusive Offers & Packages', href: '/offers' },
    { label: 'Check Rates & Booking', href: '/booking' },
    { label: 'Location & Contact', href: '/contact' },
    { label: 'Android App', href: 'https://play.google.com/store/apps/details?id=com.dip.padjadjaransuites' },
    { label: 'CMS Admin Portal', href: '/admin' },
  ]
  const defaultQuickLinks = currentLocale === 'en' ? defaultQuickLinksEn : defaultQuickLinksId

  const [logoUrl, setLogoUrl] = useState<string | null>(settings?.logoUrl || initialLogoUrl || null)
  const [phone, setPhone] = useState(settings?.phone || '+62 251 756 9000')
  const [whatsapp, setWhatsapp] = useState(settings?.whatsapp || '+62 851 8309 3061')
  const [email, setEmail] = useState(settings?.email || 'reservation@padjadjaransuitesresort.com')
  const [address, setAddress] = useState(
    settings?.address || 'Jl. Bogor Inner Ring Road Lot XIX C-2 No. 17, Bogor Nirwana Residence, Bogor 16132, Jawa Barat'
  )
  const [mapsUrl, setMapsUrl] = useState(settings?.googleMapsUrl || 'https://maps.app.goo.gl/dEJUfkgHCUi57iWg8')
  const [social, setSocial] = useState({
    instagram: settings?.social?.instagram || 'https://www.instagram.com/padjadjaransuitesresort/',
    facebook: settings?.social?.facebook || 'https://www.facebook.com/padjadjaran.resort/?locale=id_ID',
    tiktok: settings?.social?.tiktok || 'https://www.tiktok.com/@prh_bogor',
  })
  const [aboutText, setAboutText] = useState(footerConfig?.aboutText || defaultAboutText)
  const [copyrightText, setCopyrightText] = useState(footerConfig?.copyrightText || defaultCopyright)
  const [quickLinks, setQuickLinks] = useState(
    footerConfig?.quickLinks && footerConfig.quickLinks.length > 0 ? footerConfig.quickLinks : defaultQuickLinks
  )

  useEffect(() => {
    fetch('/api/globals/site-settings')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          if (data.logo?.url) setLogoUrl(data.logo.url)
          if (data.phone) setPhone(data.phone)
          if (data.whatsapp) setWhatsapp(data.whatsapp)
          if (data.email) setEmail(data.email)
          if (data.address) setAddress(data.address)
          if (data.googleMapsUrl) setMapsUrl(data.googleMapsUrl)
          if (data.socialMedia) {
            setSocial({
              instagram: data.socialMedia.instagram || social.instagram,
              facebook: data.socialMedia.facebook || social.facebook,
              tiktok: data.socialMedia.tiktok || social.tiktok,
            })
          }
        }
      })
      .catch(() => {})

    fetch('/api/globals/footer-config')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          if (data.aboutText) setAboutText(data.aboutText)
          if (data.copyrightText) setCopyrightText(data.copyrightText)
          if (data.quickLinks && Array.isArray(data.quickLinks) && data.quickLinks.length > 0) {
            setQuickLinks(data.quickLinks.map((item: any) => ({ label: item.label, href: item.href })))
          }
        }
      })
      .catch(() => {})
  }, [])

  const cleanWa = whatsapp.replace(/[^0-9]/g, '')

  return (
    <footer id="footer" className={styles.footerWrapper}>
      <div className={`site-container ${styles.footerGrid}`}>
        {/* Brand Column */}
        <div className={styles.brandCol}>
          {logoUrl ? (
            <Link href="/" style={{ display: 'inline-block' }}>
              <img
                src={logoUrl}
                alt="Padjadjaran Suites Resort & Convention Hotel"
                className={styles.footerLogoImg}
                onError={(e) => {
                  const target = e.currentTarget
                  if (!target.src.endsWith('/logo-padjadjaran.png')) {
                    target.src = '/logo-padjadjaran.png'
                  }
                }}
              />
            </Link>
          ) : (
            <>
              <div className={styles.footerLogoTitle}>PADJADJARAN</div>
              <div className={styles.footerLogoSub}>SUITES RESORT & CONVENTION</div>
            </>
          )}
          <p className={styles.brandDesc}>
            {aboutText}
          </p>
          <div className={styles.socialList}>
            <a
              href={social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialBtn}
              aria-label="Instagram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>
            <a
              href={social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialBtn}
              aria-label="Facebook"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a
              href={social.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialBtn}
              aria-label="TikTok"
            >
              <Share2 size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div>
          <h4 className={styles.colTitle}>{currentLocale === 'en' ? 'Quick Navigation' : 'Navigasi Cepat'}</h4>
          <ul className={styles.linkList}>
            <li className={styles.linkItem}><Link href="/rooms">{currentLocale === 'en' ? 'Rooms & Suites' : 'Kamar & Suites'}</Link></li>
            <li className={styles.linkItem}><Link href="/dining">{currentLocale === 'en' ? 'Hegarmanah Restaurant' : 'Restoran Hegarmanah'}</Link></li>
            <li className={styles.linkItem}><Link href="/dining">{currentLocale === 'en' ? 'Bancakan Restaurant' : 'Restoran Bancakan'}</Link></li>
            <li className={styles.linkItem}><Link href="/events">{currentLocale === 'en' ? 'Bale Pakuan Ballroom' : 'Bale Pakuan Ballroom'}</Link></li>
            <li className={styles.linkItem}><Link href="/wedding">{currentLocale === 'en' ? 'Wedding & Celebrations' : 'Paket Wedding & Perayaan'}</Link></li>
            <li className={styles.linkItem}><Link href="/facilities">{currentLocale === 'en' ? 'Resort Facilities' : 'Fasilitas Resor'}</Link></li>
            <li className={styles.linkItem}><Link href="/destination">{currentLocale === 'en' ? 'Bogor Tourism Guide' : 'Panduan Wisata Bogor'}</Link></li>
            <li className={styles.linkItem}><Link href="/gallery">{currentLocale === 'en' ? 'Photo Gallery HD' : 'Galeri Foto HD'}</Link></li>
            <li className={styles.linkItem}><Link href="/virtual-tour">Virtual Tour 360°</Link></li>
          </ul>
        </div>

        {/* CMS & Services Column */}
        <div>
          <h4 className={styles.colTitle}>{currentLocale === 'en' ? 'Hotel Services' : 'Layanan Hotel'}</h4>
          <ul className={styles.linkList}>
            {quickLinks.map((ql, idx) => (
              <li key={idx} className={styles.linkItem}>
                {ql.href.startsWith('http') ? (
                  <a href={ql.href} target="_blank" rel="noopener noreferrer">
                    {ql.label}
                  </a>
                ) : (
                  <Link href={ql.href}>{ql.label}</Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Column */}
        <div>
          <h4 className={styles.colTitle}>{currentLocale === 'en' ? 'Contact & Location' : 'Kontak & Lokasi'}</h4>
          <div className={styles.contactList}>
            <div className={styles.contactRow}>
              <MapPin size={22} color="#c5a55a" style={{ flexShrink: 0, marginTop: '2px' }} />
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {address}
              </a>
            </div>
            <div className={styles.contactRow}>
              <Phone size={18} color="#c5a55a" style={{ flexShrink: 0 }} />
              <a href={`tel:${phone.replace(/\s+/g, '')}`}>{phone}</a>
            </div>
            <div className={styles.contactRow}>
              <MessageCircle size={18} color="#25D366" style={{ flexShrink: 0 }} />
              <a href={`https://wa.me/${cleanWa}`} target="_blank" rel="noopener noreferrer">
                {whatsapp} (WA)
              </a>
            </div>
            <div className={styles.contactRow}>
              <Mail size={18} color="#c5a55a" style={{ flexShrink: 0 }} />
              <a href={`mailto:${email}`}>
                {email}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={`site-container ${styles.bottomBar}`}>
        <p>{copyrightText}</p>
        <div className={styles.paymentBadges}>
          <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{currentLocale === 'en' ? 'Payment Methods:' : 'Metode Pembayaran:'}</span>
          <span className={styles.paymentBadge}>QRIS</span>
          <span className={styles.paymentBadge}>Virtual Account</span>
          <span className={styles.paymentBadge}>Credit Card</span>
          <span className={styles.paymentBadge}>Midtrans</span>
        </div>
      </div>
    </footer>
  )
}
