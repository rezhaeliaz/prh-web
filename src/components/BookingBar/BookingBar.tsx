'use client'

import React, { useState } from 'react'
import { Calendar, Users, BedDouble, Search, X, CheckCircle2, MessageCircle, CreditCard } from 'lucide-react'
import { RoomItem } from '@/data/hotelData'
import { getDictionary, type Locale } from '@/lib/translations'
import styles from './BookingBar.module.css'

interface BookingBarProps {
  rooms?: RoomItem[]
  locale?: Locale
  settings?: {
    whatsapp?: string
    bookingEngineType?: string
    thirdPartyBookingUrl?: string
  }
}

export const BookingBar: React.FC<BookingBarProps> = ({ rooms = [], locale = 'id', settings }) => {
  const dict = getDictionary(locale).bookingBar
  // Format today's date and tomorrow's date for defaults
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  const dayAfterTomorrow = new Date(today)
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2)

  const formatDate = (date: Date) => date.toISOString().split('T')[0]

  const [checkIn, setCheckIn] = useState(formatDate(tomorrow))
  const [checkOut, setCheckOut] = useState(formatDate(dayAfterTomorrow))
  const [roomType, setRoomType] = useState(rooms[0]?.slug || 'superior-room')
  const [guests, setGuests] = useState('2')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)

  // Build dynamic room map from CMS rooms
  const dynamicRoomMap: Record<string, { name: string; price: number; slug: string }> = {}
  if (rooms && rooms.length > 0) {
    rooms.forEach((r) => {
      dynamicRoomMap[r.slug] = {
        name: r.name,
        price: r.discountPrice || r.basePrice,
        slug: r.slug,
      }
    })
  } else {
    dynamicRoomMap['superior-room'] = { name: 'Superior Room (22 m²)', price: 450000, slug: 'superior-room' }
    dynamicRoomMap['executive-room'] = { name: 'Executive Room (33 m²)', price: 750000, slug: 'executive-room' }
    dynamicRoomMap['royal-suite'] = { name: 'Royal Suite Room (54 m²)', price: 1450000, slug: 'royal-suite' }
  }

  const calculateNights = () => {
    const start = new Date(checkIn)
    const end = new Date(checkOut)
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24))
    return diff > 0 ? diff : 1
  }

  const nights = calculateNights()
  const selectedRoom = dynamicRoomMap[roomType] || Object.values(dynamicRoomMap)[0]
  const estimatedTotal = selectedRoom.price * nights

  const handleSubmit = (e: React.FormEvent) => {
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
      window.open(`https://wa.me/${cleanWa}?text=${waBookingMessage}`, '_blank', 'noopener,noreferrer')
      return
    }
    setIsModalOpen(true)
    setBookingSuccess(false)
  }

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val)
  }

  const cleanWa = (settings?.whatsapp || '+62 851 8309 3061').replace(/[^0-9]/g, '')

  const waBookingMessage = encodeURIComponent(
    locale === 'en'
      ? `Hello Padjadjaran Suites Resort & Convention,\nI would like to reserve a room:\n- Room Type: ${selectedRoom.name}\n- Check-in: ${checkIn}\n- Check-out: ${checkOut} (${nights} night(s))\n- Guests: ${guests} guest(s)\n- Estimated Total: ${formatRupiah(estimatedTotal)}\n\nPlease provide availability and direct reservation details. Thank you!`
      : `Halo Padjadjaran Suites Resort & Convention,\nSaya ingin melakukan reservasi kamar:\n- Tipe Kamar: ${selectedRoom.name}\n- Check-in: ${checkIn}\n- Check-out: ${checkOut} (${nights} malam)\n- Jumlah Tamu: ${guests} orang\n- Estimasi Tarif: ${formatRupiah(estimatedTotal)}\n\nMohon informasi ketersediaan dan panduan reservasi langsung. Terima kasih!`
  )

  return (
    <section id="booking-bar" className={`site-container ${styles.bookingBarWrapper}`}>
      <div className={styles.bookingCard}>
        <form className={styles.formGrid} onSubmit={handleSubmit}>
          {/* Check-In */}
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel} htmlFor="checkInInput">
              <Calendar size={14} color="#c5a55a" />
              {dict.checkIn}
            </label>
            <input
              id="checkInInput"
              type="date"
              className={styles.inputControl}
              value={checkIn}
              min={formatDate(today)}
              onChange={(e) => {
                setCheckIn(e.target.value)
                if (new Date(e.target.value) >= new Date(checkOut)) {
                  const nextDay = new Date(e.target.value)
                  nextDay.setDate(nextDay.getDate() + 1)
                  setCheckOut(formatDate(nextDay))
                }
              }}
              required
            />
          </div>

          {/* Check-Out */}
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel} htmlFor="checkOutInput">
              <Calendar size={14} color="#c5a55a" />
              {dict.checkOut}
            </label>
            <input
              id="checkOutInput"
              type="date"
              className={styles.inputControl}
              value={checkOut}
              min={checkIn}
              onChange={(e) => setCheckOut(e.target.value)}
              required
            />
          </div>

          {/* Tipe Kamar */}
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel} htmlFor="roomTypeSelect">
              <BedDouble size={14} color="#c5a55a" />
              {dict.roomType}
            </label>
            <select
              id="roomTypeSelect"
              className={styles.inputControl}
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
            >
              {Object.values(dynamicRoomMap).map((room) => (
                <option key={room.slug} value={room.slug}>
                  {room.name}
                </option>
              ))}
            </select>
          </div>

          {/* Tamu */}
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel} htmlFor="guestsSelect">
              <Users size={14} color="#c5a55a" />
              {dict.guests}
            </label>
            <select
              id="guestsSelect"
              className={styles.inputControl}
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            >
              <option value="1">{locale === 'en' ? '1 Guest' : '1 Orang Tamu'}</option>
              <option value="2">{locale === 'en' ? '2 Guests' : '2 Orang Tamu'}</option>
              <option value="3">{locale === 'en' ? '3 Guests' : '3 Orang Tamu'}</option>
              <option value="4">{locale === 'en' ? '4+ Guests / Family' : '4+ Tamu / Keluarga'}</option>
            </select>
          </div>

          {/* Submit */}
          <button type="submit" className={`btn-luxury-primary ${styles.submitBtn}`}>
            <Search size={16} />
            {dict.checkRates}
          </button>
        </form>
      </div>

      {/* Booking Summary Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>{locale === 'en' ? 'Direct Reservation Summary' : 'Detail Reservasi Langsung'}</h3>
              <button
                className={styles.modalCloseBtn}
                onClick={() => setIsModalOpen(false)}
                aria-label={locale === 'en' ? 'Close' : 'Tutup'}
              >
                <X size={20} />
              </button>
            </div>

            <div className={styles.modalBody}>
              {bookingSuccess ? (
                <div style={{ textAlign: 'center', padding: '24px 0' }}>
                  <CheckCircle2 size={56} color="#2e7d32" style={{ margin: '0 auto 16px' }} />
                  <h4 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>
                    {locale === 'en' ? 'Reservation Request Sent!' : 'Permintaan Reservasi Terkirim!'}
                  </h4>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
                    {locale === 'en'
                      ? 'The Padjadjaran Suites Resort reservation team will confirm your room availability shortly.'
                      : 'Tim reservasi Padjadjaran Suites Resort akan segera mengonfirmasi ketersediaan kamar Anda.'}
                  </p>
                  <button
                    className="btn-luxury-primary"
                    style={{ marginTop: '20px' }}
                    onClick={() => setIsModalOpen(false)}
                  >
                    {locale === 'en' ? 'Close' : 'Tutup'}
                  </button>
                </div>
              ) : (
                <>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
                    {locale === 'en'
                      ? 'Thank you for choosing Padjadjaran Suites Resort & Convention. Here are your booking details:'
                      : 'Terima kasih telah memilih Padjadjaran Suites Resort & Convention. Berikut rincian pemesanan Anda:'}
                  </p>

                  <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>{dict.roomType}:</span>
                    <span className={styles.summaryVal}>{selectedRoom.name}</span>
                  </div>
                  <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>{locale === 'en' ? 'Stay Period:' : 'Periode Menginap:'}</span>
                    <span className={styles.summaryVal}>
                      {checkIn} {locale === 'en' ? 'to' : 's/d'} {checkOut} ({nights} {locale === 'en' ? 'Night(s)' : 'Malam'})
                    </span>
                  </div>
                  <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>{dict.guests}:</span>
                    <span className={styles.summaryVal}>{guests} {locale === 'en' ? 'Guest(s)' : 'Orang'}</span>
                  </div>
                  <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>{locale === 'en' ? 'Rate per Night:' : 'Harga per Malam:'}</span>
                    <span className={styles.summaryVal}>{formatRupiah(selectedRoom.price)}</span>
                  </div>
                  <div className={styles.summaryRow} style={{ borderBottom: '2px solid var(--color-gold)' }}>
                    <span className={styles.summaryLabel} style={{ fontWeight: 'bold', color: 'var(--color-primary-dark)' }}>
                      {dict.estTotal}
                    </span>
                    <span className={styles.summaryVal} style={{ color: 'var(--color-gold-dark)', fontSize: '1.15rem' }}>
                      {formatRupiah(estimatedTotal)}
                    </span>
                  </div>

                  <div className={styles.directBookingOptions}>
                    {/* Option A: Direct WhatsApp Concierge */}
                    <a
                      href={`https://wa.me/${cleanWa}?text=${waBookingMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-luxury-primary"
                      style={{ background: '#128C7E', display: 'flex', justifyContent: 'center' }}
                      onClick={() => setBookingSuccess(true)}
                    >
                      <MessageCircle size={18} />
                      {dict.confirmWa}
                    </a>

                    {/* Option B: Online Payment Gateway (Midtrans) */}
                    <button
                      type="button"
                      className="btn-luxury-secondary"
                      style={{ display: 'flex', justifyContent: 'center' }}
                      onClick={() => {
                        alert(dict.simulatingMidtrans)
                        setBookingSuccess(true)
                      }}
                    >
                      <CreditCard size={18} color="#c5a55a" />
                      {dict.payOnline}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
