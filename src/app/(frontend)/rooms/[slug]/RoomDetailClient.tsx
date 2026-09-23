'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Maximize2,
  Bed,
  Users,
  ChevronRight,
  CheckCircle2,
  Calendar,
  CreditCard,
  MessageCircle,
  Eye,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react'
import { RoomItem } from '@/data/hotelData'
import type { Locale } from '@/lib/translations'
import styles from './roomDetail.module.css'

interface RoomDetailClientProps {
  room: RoomItem
  locale?: Locale
  settings?: {
    whatsapp?: string
    bookingEngineType?: string
    thirdPartyBookingUrl?: string
    whatsappUrl?: string
  }
}

export const RoomDetailClient: React.FC<RoomDetailClientProps> = ({ room, locale = 'id', settings }) => {
  // Gallery state
  const [activeImage, setActiveImage] = useState(room.featuredImage)

  // Booking calculator state
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  const dayAfter = new Date(today)
  dayAfter.setDate(dayAfter.getDate() + 2)

  const formatDate = (d: Date) => d.toISOString().split('T')[0]

  const [checkIn, setCheckIn] = useState(formatDate(tomorrow))
  const [checkOut, setCheckOut] = useState(formatDate(dayAfter))
  const [guests, setGuests] = useState('2')

  const calcNights = () => {
    const s = new Date(checkIn)
    const e = new Date(checkOut)
    const diff = Math.ceil((e.getTime() - s.getTime()) / (1000 * 3600 * 24))
    return diff > 0 ? diff : 1
  }

  const nights = calcNights()
  const currentPrice = room.discountPrice || room.basePrice
  const totalEstimated = currentPrice * nights

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val)
  }

  const cleanWa = (settings?.whatsapp || '+62 851 8309 3061').replace(/[^0-9]/g, '')

  const waMessage = encodeURIComponent(
    locale === 'en'
      ? `Hello Padjadjaran Suites Resort,\nI would like to reserve:\n- Room: ${room.name}\n- Check-in: ${checkIn}\n- Check-out: ${checkOut} (${nights} night(s))\n- Guests: ${guests} guest(s)\n- Estimated Total: ${formatRupiah(totalEstimated)}\n\nPlease confirm room availability. Thank you!`
      : `Halo Padjadjaran Suites Resort,\nSaya ingin memesan:\n- Kamar: ${room.name}\n- Check-in: ${checkIn}\n- Check-out: ${checkOut} (${nights} malam)\n- Jumlah Tamu: ${guests} orang\n- Estimasi Tarif: ${formatRupiah(totalEstimated)}\n\nMohon konfirmasi ketersediaan kamar. Terima kasih!`
  )

  return (
    <div>
      {/* Detail Header Bar */}
      <section className={styles.detailHeader}>
        <div className="site-container">
          <div className={styles.breadcrumbBar}>
            <Link href="/">{locale === 'en' ? 'Home' : 'Beranda'}</Link>
            <ChevronRight size={14} />
            <Link href="/rooms">{locale === 'en' ? 'Rooms & Suites' : 'Kamar & Suites'}</Link>
            <ChevronRight size={14} />
            <span style={{ color: '#ffffff' }}>{room.name}</span>
          </div>

          <div className={styles.titleArea}>
            <div>
              <h1 className={styles.roomTitle}>{room.name}</h1>
              <p className={styles.roomTagline}>{room.tagline}</p>
            </div>
            <div>
              <span className="badge-gold">{room.badge}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Detail Body */}
      <section className={styles.detailBody}>
        <div className={`site-container ${styles.detailGrid}`}>
          {/* Left Column: Photos, Description & Amenities */}
          <div>
            {/* Gallery Section */}
            <div className={styles.gallerySection}>
              <div className={styles.mainImageHolder}>
                <img src={activeImage} alt={room.name} className={styles.mainImg} />
              </div>

              {room.gallery && room.gallery.length > 1 && (
                <div className={styles.thumbsRow}>
                  {room.gallery.map((imgUrl, i) => (
                    <button
                      key={i}
                      className={`${styles.thumbBtn} ${activeImage === imgUrl ? styles.thumbBtnActive : ''}`}
                      onClick={() => setActiveImage(imgUrl)}
                    >
                      <img src={imgUrl} alt={`Foto ${room.name} ${i + 1}`} className={styles.thumbImg} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Specs Bar */}
            <div className={styles.specsBox}>
              <div className={styles.specCol}>
                <Maximize2 size={24} color="#c5a55a" />
                <div>
                  <div className={styles.specColTitle}>{locale === 'en' ? 'Room Size' : 'Luas Kamar'}</div>
                  <div className={styles.specColVal}>{room.size} {locale === 'en' ? 'Square Meters' : 'Meter Persegi'}</div>
                </div>
              </div>

              <div className={styles.specCol}>
                <Bed size={24} color="#c5a55a" />
                <div>
                  <div className={styles.specColTitle}>{locale === 'en' ? 'Bed Type' : 'Tipe Kasur'}</div>
                  <div className={styles.specColVal}>{room.bedType}</div>
                </div>
              </div>

              <div className={styles.specCol}>
                <Users size={24} color="#c5a55a" />
                <div>
                  <div className={styles.specColTitle}>{locale === 'en' ? 'Capacity' : 'Kapasitas'}</div>
                  <div className={styles.specColVal}>
                    {locale === 'en' ? `Max. ${room.capacity} Adults` : `Maks. ${room.capacity} Dewasa`}
                  </div>
                </div>
              </div>
            </div>

            {/* Room Description */}
            <div className={styles.sectionCard}>
              <h2 className={styles.sectionHeading}>{locale === 'en' ? 'About This Room' : 'Tentang Kamar Ini'}</h2>
              <p className={styles.roomParagraph}>{room.description}</p>
            </div>

            {/* Room Highlights */}
            {room.highlights && room.highlights.length > 0 && (
              <div className={styles.sectionCard}>
                <h3 className={styles.sectionHeading}>{locale === 'en' ? 'Highlights & Key Features' : 'Keunggulan & Daya Tarik'}</h3>
                <ul className={styles.highlightsList}>
                  {room.highlights.map((h, i) => (
                    <li key={i} className={styles.highlightItem}>
                      <CheckCircle2 size={18} color="#c5a55a" style={{ flexShrink: 0 }} />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Room Amenities */}
            {room.amenities && room.amenities.length > 0 && (
              <div className={styles.sectionCard}>
                <h3 className={styles.sectionHeading}>{locale === 'en' ? 'Amenities & Services' : 'Fasilitas & Layanan Lengkap'}</h3>
                <div className={styles.amenitiesGrid}>
                  {room.amenities.map((a, i) => (
                    <div key={i} className={styles.amenityItem}>
                      <CheckCircle2 size={16} color="#c5a55a" />
                      <span>{a.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Virtual Tour Banner Callout */}
            <div
              style={{
                background: 'linear-gradient(135deg, #1a1d21 0%, #121417 100%)',
                color: '#ffffff',
                borderRadius: 'var(--radius-md)',
                padding: '32px',
                border: '1px solid rgba(197, 165, 90, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '20px',
              }}
            >
              <div>
                <h4 style={{ color: '#ffffff', fontFamily: 'var(--font-serif)', fontSize: '1.3rem', marginBottom: '6px' }}>
                  {locale === 'en' ? 'Want to View This Room in 360°?' : 'Ingin Melihat Ruangan Ini Secara 360°?'}
                </h4>
                <p style={{ color: '#9ca3af', fontSize: '0.92rem', margin: 0 }}>
                  {locale === 'en'
                    ? 'Explore every corner and layout in high-resolution interactive 360°.'
                    : 'Jelajahi setiap sudut kamar dan tata letak interior dalam tampilan interaktif resolusi tinggi.'}
                </p>
              </div>

              <Link href="/virtual-tour" className="btn-luxury-primary">
                <Eye size={18} />
                {locale === 'en' ? 'Open 360° Virtual Tour' : 'Buka Virtual Tour 360°'}
              </Link>
            </div>
          </div>

          {/* Right Column: Sticky Booking Card */}
          <div>
            <div className={styles.bookingStickyCard}>
              <div className={styles.priceDisplay}>
                <span className={styles.priceLabel}>{locale === 'en' ? 'Official Best Direct Rate' : 'Tarif Terbaik Langsung'}</span>
                <div className={styles.priceMain}>
                  {formatRupiah(currentPrice)}
                  <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', fontWeight: 'normal' }}>
                    {' '}
                    {locale === 'en' ? '/night' : '/malam'}
                  </span>
                </div>
                {room.discountPrice && (
                  <div style={{ fontSize: '0.82rem', color: '#9ca3af', textDecoration: 'line-through' }}>
                    {locale === 'en' ? 'Regular:' : 'Normal:'} {formatRupiah(room.basePrice)}
                  </div>
                )}
              </div>

              <form
                className={styles.bookingForm}
                onSubmit={(e) => {
                  e.preventDefault()
                  const engineType = settings?.bookingEngineType || 'third-party'
                  if (engineType === 'third-party') {
                    const base =
                      settings?.thirdPartyBookingUrl ||
                      'https://be.dip.id/booking/cekrooms?keyid=9de3264a0298106659401228618ea286'
                    const separator = base.includes('?') ? '&' : '?'
                    const targetUrl = `${base}${separator}checkin=${checkIn}&checkout=${checkOut}&adults=${guests}`
                    window.open(targetUrl, '_blank', 'noopener,noreferrer')
                    return
                  }
                  if (engineType === 'whatsapp') {
                    window.open(`https://wa.me/${cleanWa}?text=${waMessage}`, '_blank', 'noopener,noreferrer')
                    return
                  }
                  window.location.href = `/booking?room=${room.slug}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`
                }}
              >
                <div className={styles.formField}>
                  <label className={styles.formLabel}>{locale === 'en' ? 'Check-in Date' : 'Tanggal Check-in'}</label>
                  <input
                    type="date"
                    className={styles.formInput}
                    value={checkIn}
                    min={formatDate(today)}
                    onChange={(e) => {
                      setCheckIn(e.target.value)
                      if (new Date(e.target.value) >= new Date(checkOut)) {
                        const n = new Date(e.target.value)
                        n.setDate(n.getDate() + 1)
                        setCheckOut(formatDate(n))
                      }
                    }}
                    required
                  />
                </div>

                <div className={styles.formField}>
                  <label className={styles.formLabel}>{locale === 'en' ? 'Check-out Date' : 'Tanggal Check-out'}</label>
                  <input
                    type="date"
                    className={styles.formInput}
                    value={checkOut}
                    min={checkIn}
                    onChange={(e) => setCheckOut(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.formField}>
                  <label className={styles.formLabel}>{locale === 'en' ? 'Number of Guests' : 'Jumlah Tamu'}</label>
                  <select
                    className={styles.formInput}
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                  >
                    <option value="1">{locale === 'en' ? '1 Guest' : '1 Orang Tamu'}</option>
                    <option value="2">{locale === 'en' ? '2 Guests' : '2 Orang Tamu'}</option>
                    <option value="3">{locale === 'en' ? '3 Guests' : '3 Orang Tamu'}</option>
                    <option value="4">{locale === 'en' ? '4 Guests' : '4 Orang Tamu'}</option>
                  </select>
                </div>

                <div className={styles.calculationRow}>
                  <span>{locale === 'en' ? 'Length of Stay:' : 'Lama Menginap:'}</span>
                  <span style={{ fontWeight: 600, color: 'var(--color-primary-dark)' }}>
                    {nights} {locale === 'en' ? 'Night(s)' : 'Malam'}
                  </span>
                </div>

                <div className={styles.totalRow}>
                  <span>{locale === 'en' ? 'Estimated Total:' : 'Estimasi Total:'}</span>
                  <span style={{ color: 'var(--color-gold-dark)' }}>{formatRupiah(totalEstimated)}</span>
                </div>

                {/* Primary CTA to Booking Wizard or Third-Party Engine */}
                <button
                  type="submit"
                  className="btn-luxury-primary"
                  style={{ width: '100%', height: '50px' }}
                >
                  <CreditCard size={18} />
                  {(settings?.bookingEngineType || 'third-party') === 'third-party'
                    ? (locale === 'en' ? 'Book via Official Engine' : 'Pesan via Booking Engine Resmi')
                    : (locale === 'en' ? 'Continue to Online Booking' : 'Lanjut ke Pemesanan Online')}
                </button>

                {/* Secondary CTA to WhatsApp */}
                <a
                  href={`https://wa.me/${cleanWa}?text=${waMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-luxury-secondary"
                  style={{ width: '100%', textAlign: 'center', borderColor: '#25D366', color: '#075e54' }}
                >
                  <MessageCircle size={18} color="#25D366" />
                  {locale === 'en' ? 'Fast WhatsApp Reservation' : 'Reservasi Cepat via WhatsApp'}
                </a>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.78rem',
                    color: 'var(--color-text-muted)',
                    justifyContent: 'center',
                    marginTop: '8px',
                  }}
                >
                  <ShieldCheck size={16} color="#2e7d32" />
                  <span>{locale === 'en' ? 'Instant Confirmation • No Hidden Fees' : 'Konfirmasi Instan • Bebas Biaya Terselubung'}</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
