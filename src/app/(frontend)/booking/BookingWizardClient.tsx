'use client'

import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  Calendar,
  Users,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  CreditCard,
  MessageCircle,
  ShieldCheck,
  Bed,
  Coffee,
  Sparkles,
  Printer,
  Copy,
  Check,
  ExternalLink,
} from 'lucide-react'
import { RoomItem } from '@/data/hotelData'
import type { Locale } from '@/lib/translations'
import { getDictionary } from '@/lib/translations'
import styles from './booking.module.css'

interface BookingWizardClientProps {
  initialRooms: RoomItem[]
  settings?: {
    whatsapp?: string
    bookingEngineType?: string
    thirdPartyBookingUrl?: string
  }
  locale?: Locale
}

export function BookingWizardClient({
  initialRooms,
  settings,
  locale = 'id',
}: BookingWizardClientProps) {
  const t = getDictionary(locale).bookingWizard
  const searchParams = useSearchParams()

  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  const dayAfter = new Date(today)
  dayAfter.setDate(dayAfter.getDate() + 2)

  const formatDate = (d: Date) => d.toISOString().split('T')[0]

  // Form State
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1)
  const [checkIn, setCheckIn] = useState(searchParams.get('checkIn') || formatDate(tomorrow))
  const [checkOut, setCheckOut] = useState(searchParams.get('checkOut') || formatDate(dayAfter))
  const [guests, setGuests] = useState(searchParams.get('guests') || '2')
  const [selectedRoomSlug, setSelectedRoomSlug] = useState(searchParams.get('room') || initialRooms[0]?.slug || 'superior-room')

  // Add-ons State
  const [addons, setAddons] = useState<{
    breakfast: boolean
    extraBed: boolean
    spa: boolean
  }>({
    breakfast: false,
    extraBed: false,
    spa: false,
  })

  // Guest Details State
  const [guestDetails, setGuestDetails] = useState({
    name: '',
    email: '',
    phone: '',
    identity: '',
    notes: '',
  })

  // Booking result state
  const [bookingResult, setBookingResult] = useState<{
    bookingCode: string
    isProcessing: boolean
    copied: boolean
  }>({
    bookingCode: '',
    isProcessing: false,
    copied: false,
  })

  // Calculation helpers
  const roomsList = initialRooms && initialRooms.length > 0 ? initialRooms : []
  const selectedRoom = roomsList.find((r) => r.slug === selectedRoomSlug) || roomsList[0]

  const calculateNights = () => {
    const s = new Date(checkIn)
    const e = new Date(checkOut)
    const diff = Math.ceil((e.getTime() - s.getTime()) / (1000 * 3600 * 24))
    return diff > 0 ? diff : 1
  }

  const nights = calculateNights()
  const roomPricePerNight = selectedRoom?.discountPrice || selectedRoom?.basePrice || 450000
  const roomTotal = roomPricePerNight * nights

  const breakfastPrice = addons.breakfast ? 95000 * Number(guests) * nights : 0
  const extraBedPrice = addons.extraBed ? 250000 * nights : 0
  const spaPrice = addons.spa ? 200000 : 0
  const totalAddons = breakfastPrice + extraBedPrice + spaPrice
  const grandTotal = roomTotal + totalAddons

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val)
  }

  const cleanWa = (settings?.whatsapp || '+62 851 8309 3061').replace(/[^0-9]/g, '')

  // Final submit handler
  const handleFinalSubmit = async (method: 'midtrans' | 'whatsapp') => {
    setBookingResult((prev) => ({ ...prev, isProcessing: true }))

    try {
      // 1. Submit to internal CMS API to save booking
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guestName: guestDetails.name,
          guestEmail: guestDetails.email,
          guestPhone: guestDetails.phone,
          roomSlug: selectedRoom?.slug,
          roomName: selectedRoom?.name,
          checkInDate: checkIn,
          checkOutDate: checkOut,
          guestsCount: guests,
          totalAmount: grandTotal,
          specialRequests: guestDetails.notes,
          paymentMethod: method === 'midtrans' ? 'Midtrans Online' : 'WhatsApp Concierge',
        }),
      })

      const data = await response.json()
      const code = data.bookingCode || `PRH-2026-${Math.floor(1000 + Math.random() * 9000)}`

      setBookingResult({
        bookingCode: code,
        isProcessing: false,
        copied: false,
      })
      setStep(5)

      if (method === 'whatsapp') {
        const waMsgText = t.waMsgTemplate
          .replace('{code}', code)
          .replace('{name}', guestDetails.name)
          .replace('{room}', selectedRoom?.name || '')
          .replace('{checkIn}', checkIn)
          .replace('{checkOut}', checkOut)
          .replace('{nights}', String(nights))
          .replace('{guests}', String(guests))
          .replace('{total}', formatRupiah(grandTotal))
        const waMsg = encodeURIComponent(waMsgText)
        window.open(`https://wa.me/${cleanWa}?text=${waMsg}`, '_blank')
      } else {
        // Trigger Midtrans tokenizer
        try {
          const snapRes = await fetch('/api/midtrans/tokenizer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              orderId: code,
              grossAmount: grandTotal,
              customerDetails: {
                first_name: guestDetails.name,
                email: guestDetails.email,
                phone: guestDetails.phone,
              },
              itemDetails: [
                {
                  id: selectedRoom?.slug,
                  price: roomPricePerNight,
                  quantity: nights,
                  name: `${selectedRoom?.name} (${nights} ${t.nights})`,
                },
              ],
            }),
          })
          const snapData = await snapRes.json()
          if (snapData.redirect_url) {
            alert(
              locale === 'en'
                ? `[Midtrans Sandbox Simulation]: Active payment token (${snapData.token}). You can proceed to test payment via QRIS, Virtual Account, or Credit Card.`
                : `[Simulasi Midtrans Sandbox]: Token pembayaran aktif (${snapData.token}). Anda dapat melanjutkan pembayaran via QRIS, Virtual Account, atau Kartu Kredit.`
            )
          }
        } catch (e) {
          console.warn('Midtrans token call note:', e)
        }
      }
    } catch (err) {
      console.error(err)
      // Fallback to step 5 with client-generated code
      const fallbackCode = `PRH-2026-${Math.floor(1000 + Math.random() * 9000)}`
      setBookingResult({
        bookingCode: fallbackCode,
        isProcessing: false,
        copied: false,
      })
      setStep(5)
    }
  }

  const copyBookingCode = () => {
    navigator.clipboard.writeText(bookingResult.bookingCode)
    setBookingResult((prev) => ({ ...prev, copied: true }))
    setTimeout(() => {
      setBookingResult((prev) => ({ ...prev, copied: false }))
    }, 2000)
  }

  return (
    <div className={styles.bookingContainer}>
      <div className="site-container">
        {/* Wizard Header */}
        <div className={styles.wizardHeader}>
          <span className="section-subtitle">{t.badge}</span>
          <h1 className={styles.wizardTitle}>{t.title}</h1>
          <p className={styles.wizardSubtitle}>{t.subtitle}</p>
        </div>

        {/* Instant DIP Booking Engine Official Option */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(197, 165, 90, 0.12), rgba(15, 23, 42, 0.85))',
            border: '1px solid rgba(197, 165, 90, 0.4)',
            borderRadius: '16px',
            padding: '24px 28px',
            marginBottom: '36px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)',
          }}
        >
          <div style={{ maxWidth: '680px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span
                style={{
                  background: '#c5a55a',
                  color: '#0f172a',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: '50px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                {locale === 'en' ? 'Official Booking Engine' : 'Booking Engine Resmi Hotel'}
              </span>
              <span style={{ fontSize: '0.84rem', color: '#cbd5e1' }}>
                {locale === 'en' ? 'Instant Confirmation & Real-time Rates' : 'Konfirmasi Instan & Kamar Real-time'}
              </span>
            </div>
            <h3
              style={{
                fontSize: '1.25rem',
                color: '#f8fafc',
                margin: '0 0 6px 0',
                fontFamily: 'var(--font-playfair)',
              }}
            >
              {locale === 'en'
                ? 'Instant Online Booking & Payment (be.dip.id)'
                : 'Pesan Langsung via Booking Engine Resmi (DIP)'}
            </h3>
            <p style={{ fontSize: '0.86rem', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
              {locale === 'en'
                ? 'For instant reservation with live room availability, best rate guarantee, and automated payment (Credit Card, Virtual Account, QRIS).'
                : 'Pilihan paling cepat untuk konfirmasi kamar instan, jaminan harga terbaik, dan sistem pembayaran otomatis (Kartu Kredit, VA Bank BCA/Mandiri, QRIS).'}
            </p>
          </div>
          <div>
            <a
              href={`https://be.dip.id/booking/cekrooms?keyid=9de3264a0298106659401228618ea286&checkin=${checkIn}&checkout=${checkOut}&adults=${guests}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-luxury-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '13px 26px',
                fontSize: '0.9rem',
                whiteSpace: 'nowrap',
                boxShadow: '0 8px 20px rgba(197, 165, 90, 0.3)',
              }}
            >
              {locale === 'en' ? 'Open Instant Booking' : 'Buka Booking Instan'} <ExternalLink size={16} />
            </a>
          </div>
        </div>

        {/* Step Indicator */}
        <div className={styles.stepsBar}>
          {[
            { num: 1, label: t.step1Tab },
            { num: 2, label: t.step2Tab },
            { num: 3, label: t.step3Tab },
            { num: 4, label: t.step4Tab },
          ].map((s) => (
            <div
              key={s.num}
              className={styles.stepNode}
              onClick={() => {
                if (s.num < step && step !== 5) setStep(s.num as any)
              }}
            >
              <div
                className={`${styles.stepCircle} ${
                  step === s.num
                    ? styles.stepCircleActive
                    : step > s.num
                    ? styles.stepCircleCompleted
                    : ''
                }`}
              >
                {step > s.num ? <Check size={18} /> : s.num}
              </div>
              <span className={`${styles.stepLabel} ${step === s.num ? styles.stepLabelActive : ''}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Step 1: Kamar & Tanggal */}
        {step === 1 && (
          <div className={styles.formCard}>
            <h2 className={styles.stepHeaderTitle}>{t.step1Title}</h2>
            <p className={styles.stepHeaderDesc}>{t.step1Desc}</p>

            <div className={styles.inputGrid}>
              <div className={styles.inputField}>
                <label className={styles.inputLabel}>{t.checkInDate}</label>
                <input
                  type="date"
                  className={styles.inputControl}
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

              <div className={styles.inputField}>
                <label className={styles.inputLabel}>{t.checkOutDate}</label>
                <input
                  type="date"
                  className={styles.inputControl}
                  value={checkOut}
                  min={checkIn}
                  onChange={(e) => setCheckOut(e.target.value)}
                  required
                />
              </div>

              <div className={styles.inputField}>
                <label className={styles.inputLabel}>{t.adultGuests}</label>
                <select
                  className={styles.inputControl}
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                >
                  <option value="1">{t.adults1}</option>
                  <option value="2">{t.adults2}</option>
                  <option value="3">{t.adults3}</option>
                  <option value="4">{t.adults4}</option>
                </select>
              </div>

              <div className={styles.inputField}>
                <label className={styles.inputLabel}>{t.stayDuration}</label>
                <div style={{ height: '46px', display: 'flex', alignItems: 'center', fontWeight: 600, color: 'var(--color-primary-dark)' }}>
                  {nights} {t.nights}
                </div>
              </div>
            </div>

            <h3 style={{ fontSize: '1.1rem', marginBottom: '14px', color: 'var(--color-primary-dark)' }}>
              {t.selectRoomType}
            </h3>

            <div className={styles.roomSelectGrid}>
              {roomsList.map((room) => {
                const isSelected = selectedRoomSlug === room.slug
                const price = room.discountPrice || room.basePrice
                return (
                  <div
                    key={room.id}
                    className={`${styles.roomSelectCard} ${isSelected ? styles.roomSelectCardActive : ''}`}
                    onClick={() => setSelectedRoomSlug(room.slug)}
                  >
                    <img src={room.featuredImage} alt={room.name} className={styles.roomCardThumb} />

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <h4 style={{ fontSize: '1.15rem', color: 'var(--color-primary-dark)' }}>{room.name}</h4>
                        <span className="badge-gold" style={{ fontSize: '0.7rem' }}>
                          {room.badge}
                        </span>
                      </div>
                      <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '6px' }}>
                        {room.size} m² • {room.bedType} • {t.maxAdults.replace('{cap}', String(room.capacity))}
                      </p>
                      <p style={{ color: 'var(--color-text-muted)', fontSize: '0.84rem' }}>
                        {room.tagline}
                      </p>
                    </div>

                    <div className={styles.priceSelectRow}>
                      <span className={styles.pricePeriod}>{t.ratePerNight}</span>
                      <span className={styles.priceAmount}>{formatRupiah(price)}</span>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className={styles.wizardFooter}>
              <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                {t.estTotal} ({nights} {t.nights}):{' '}
                <strong style={{ color: 'var(--color-gold-dark)', fontSize: '1.1rem' }}>
                  {formatRupiah(roomTotal)}
                </strong>
              </div>
              <button className="btn-luxury-primary" onClick={() => setStep(2)}>
                {t.btnToStep2} <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Layanan Tambahan */}
        {step === 2 && (
          <div className={styles.formCard}>
            <h2 className={styles.stepHeaderTitle}>{t.step2Title}</h2>
            <p className={styles.stepHeaderDesc}>{t.step2Desc}</p>

            <div className={styles.addonsList}>
              {/* Addon 1: Sarapan */}
              <div
                className={`${styles.addonCard} ${addons.breakfast ? styles.addonCardActive : ''}`}
                onClick={() => setAddons((prev) => ({ ...prev, breakfast: !prev.breakfast }))}
              >
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <div className={styles.addonIconHolder}>
                    <Coffee size={22} color="#c5a55a" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', color: 'var(--color-primary-dark)', marginBottom: '4px' }}>
                      {t.addonBreakfastTitle}
                    </h4>
                    <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)' }}>
                      {t.addonBreakfastDesc}
                    </p>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 600, color: 'var(--color-primary-dark)', fontSize: '0.95rem' }}>
                    + {formatRupiah(95000 * Number(guests) * nights)}
                  </div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                    {t.forGuestsDays.replace('{guests}', String(guests)).replace('{nights}', String(nights))}
                  </span>
                </div>
              </div>

              {/* Addon 2: Extra Bed */}
              <div
                className={`${styles.addonCard} ${addons.extraBed ? styles.addonCardActive : ''}`}
                onClick={() => setAddons((prev) => ({ ...prev, extraBed: !prev.extraBed }))}
              >
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <div className={styles.addonIconHolder}>
                    <Bed size={22} color="#c5a55a" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', color: 'var(--color-primary-dark)', marginBottom: '4px' }}>
                      {t.addonExtraBedTitle}
                    </h4>
                    <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)' }}>
                      {t.addonExtraBedDesc}
                    </p>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 600, color: 'var(--color-primary-dark)', fontSize: '0.95rem' }}>
                    + {formatRupiah(250000 * nights)}
                  </div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                    {nights} {t.nights}
                  </span>
                </div>
              </div>

              {/* Addon 3: Spa Massage */}
              <div
                className={`${styles.addonCard} ${addons.spa ? styles.addonCardActive : ''}`}
                onClick={() => setAddons((prev) => ({ ...prev, spa: !prev.spa }))}
              >
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <div className={styles.addonIconHolder}>
                    <Sparkles size={22} color="#c5a55a" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', color: 'var(--color-primary-dark)', marginBottom: '4px' }}>
                      {t.addonSpaTitle}
                    </h4>
                    <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)' }}>
                      {t.addonSpaDesc}
                    </p>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 600, color: 'var(--color-primary-dark)', fontSize: '0.95rem' }}>
                    + {formatRupiah(200000)}
                  </div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                    {t.spaSession}
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.wizardFooter}>
              <button className="btn-luxury-secondary" onClick={() => setStep(1)}>
                <ArrowLeft size={16} /> {t.btnBack}
              </button>
              <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                {t.subtotal}{' '}
                <strong style={{ color: 'var(--color-gold-dark)', fontSize: '1.1rem' }}>
                  {formatRupiah(grandTotal)}
                </strong>
              </div>
              <button className="btn-luxury-primary" onClick={() => setStep(3)}>
                {t.btnToStep3} <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Data Tamu */}
        {step === 3 && (
          <div className={styles.formCard}>
            <h2 className={styles.stepHeaderTitle}>{t.step3Title}</h2>
            <p className={styles.stepHeaderDesc}>{t.step3Desc}</p>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                setStep(4)
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '24px' }}>
                <div className={styles.inputField}>
                  <label className={styles.inputLabel}>{t.fullName}</label>
                  <input
                    type="text"
                    required
                    className={styles.inputControl}
                    placeholder={t.namePlaceholder}
                    value={guestDetails.name}
                    onChange={(e) => setGuestDetails({ ...guestDetails, name: e.target.value })}
                  />
                </div>

                <div className={styles.inputField}>
                  <label className={styles.inputLabel}>{t.email}</label>
                  <input
                    type="email"
                    required
                    className={styles.inputControl}
                    placeholder="email@domain.com"
                    value={guestDetails.email}
                    onChange={(e) => setGuestDetails({ ...guestDetails, email: e.target.value })}
                  />
                </div>

                <div className={styles.inputField}>
                  <label className={styles.inputLabel}>{t.phone}</label>
                  <input
                    type="tel"
                    required
                    className={styles.inputControl}
                    placeholder="0812-xxxx-xxxx"
                    value={guestDetails.phone}
                    onChange={(e) => setGuestDetails({ ...guestDetails, phone: e.target.value })}
                  />
                </div>

                <div className={styles.inputField}>
                  <label className={styles.inputLabel}>{t.idNumber}</label>
                  <input
                    type="text"
                    className={styles.inputControl}
                    placeholder={locale === 'en' ? 'Passport / National ID' : '3201xxxxxxxxxxxx'}
                    value={guestDetails.identity}
                    onChange={(e) => setGuestDetails({ ...guestDetails, identity: e.target.value })}
                  />
                </div>
              </div>

              <div className={styles.inputField} style={{ marginBottom: '28px' }}>
                <label className={styles.inputLabel}>{t.specialRequests}</label>
                <textarea
                  rows={3}
                  className={styles.inputControl}
                  style={{ height: 'auto', padding: '12px', resize: 'vertical' }}
                  placeholder={t.specialRequestsPlaceholder}
                  value={guestDetails.notes}
                  onChange={(e) => setGuestDetails({ ...guestDetails, notes: e.target.value })}
                />
              </div>

              <div className={styles.wizardFooter}>
                <button type="button" className="btn-luxury-secondary" onClick={() => setStep(2)}>
                  <ArrowLeft size={16} /> {t.btnBack}
                </button>
                <button type="submit" className="btn-luxury-primary">
                  {t.btnToStep4} <ArrowRight size={16} />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 4: Pembayaran & Konfirmasi */}
        {step === 4 && (
          <div className={styles.formCard}>
            <h2 className={styles.stepHeaderTitle}>{t.step4Title}</h2>
            <p className={styles.stepHeaderDesc}>{t.step4Desc}</p>

            {/* Order Review Box */}
            <div style={{ background: '#faf8f5', borderRadius: 'var(--radius-sm)', border: '1px solid #e8e3d9', padding: '24px', marginBottom: '32px' }}>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--color-primary-dark)', marginBottom: '16px' }}>
                {t.bookingSummary}
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '18px', fontSize: '0.9rem' }}>
                <div>
                  <span style={{ color: 'var(--color-text-muted)', display: 'block', fontSize: '0.8rem' }}>{t.roomTypeLabel}</span>
                  <strong>{selectedRoom?.name}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--color-text-muted)', display: 'block', fontSize: '0.8rem' }}>{t.checkInLabel}</span>
                  <strong>{checkIn} {locale === 'en' ? '(14:00 GMT+7)' : '(14:00 WIB)'}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--color-text-muted)', display: 'block', fontSize: '0.8rem' }}>{t.checkOutLabel}</span>
                  <strong>{checkOut} {locale === 'en' ? '(12:00 GMT+7)' : '(12:00 WIB)'}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--color-text-muted)', display: 'block', fontSize: '0.8rem' }}>{t.durationLabel}</span>
                  <strong>{nights} {t.nights} ({guests} {t.persons})</strong>
                </div>
              </div>

              {/* Addons breakdown */}
              {totalAddons > 0 && (
                <div style={{ borderTop: '1px dashed #dcd7ce', paddingTop: '12px', marginTop: '12px', fontSize: '0.86rem', color: '#4b5563' }}>
                  {addons.breakfast && <div>• {t.breakfastAddon} {formatRupiah(breakfastPrice)}</div>}
                  {addons.extraBed && <div>• {t.extraBedAddon.replace('{nights}', String(nights))} {formatRupiah(extraBedPrice)}</div>}
                  {addons.spa && <div>• {t.spaAddon} {formatRupiah(spaPrice)}</div>}
                </div>
              )}

              {/* Total Row */}
              <div style={{ borderTop: '2px solid var(--color-gold)', paddingTop: '16px', marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '1.25rem', fontWeight: 'bold' }}>
                <span style={{ color: 'var(--color-primary-dark)' }}>{t.totalPayment}</span>
                <span style={{ color: 'var(--color-gold-dark)' }}>{formatRupiah(grandTotal)}</span>
              </div>
            </div>

            <h3 style={{ fontSize: '1.1rem', marginBottom: '14px', color: 'var(--color-primary-dark)' }}>
              {t.selectPaymentTitle}
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '28px' }}>
              {/* Choice 1: Midtrans Snap Payment */}
              <div
                style={{
                  border: '1px solid var(--color-gold)',
                  borderRadius: 'var(--radius-md)',
                  padding: '24px',
                  background: '#fdfcf9',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <CreditCard size={22} color="#c5a55a" />
                    <h4 style={{ fontSize: '1.1rem', color: 'var(--color-primary-dark)' }}>{t.midtransTitle}</h4>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: '16px' }}>
                    {t.midtransDesc}
                  </p>
                </div>
                <button
                  type="button"
                  className="btn-luxury-primary"
                  disabled={bookingResult.isProcessing}
                  onClick={() => handleFinalSubmit('midtrans')}
                  style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
                >
                  {bookingResult.isProcessing ? t.processingBtn : t.payOnlineBtn}
                </button>
              </div>

              {/* Choice 2: Direct WhatsApp Concierge */}
              <div
                style={{
                  border: '1px solid #25D366',
                  borderRadius: 'var(--radius-md)',
                  padding: '24px',
                  background: '#f9fdfa',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <MessageCircle size={22} color="#25D366" />
                    <h4 style={{ fontSize: '1.1rem', color: '#075e54' }}>{t.waTitle}</h4>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: '16px' }}>
                    {t.waDesc}
                  </p>
                </div>
                <button
                  type="button"
                  className="btn-luxury-primary"
                  disabled={bookingResult.isProcessing}
                  onClick={() => handleFinalSubmit('whatsapp')}
                  style={{ width: '100%', background: '#25D366', display: 'flex', justifyContent: 'center' }}
                >
                  {bookingResult.isProcessing ? t.processingBtn : t.waBtn}
                </button>
              </div>
            </div>

            <div className={styles.wizardFooter}>
              <button className="btn-luxury-secondary" onClick={() => setStep(3)}>
                <ArrowLeft size={16} /> {t.btnEditGuest}
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Bukti Reservasi Sukses */}
        {step === 5 && (
          <div className={styles.successCard}>
            <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: '#e8f5e9', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <CheckCircle2 size={40} color="#2e7d32" />
            </div>

            <h2 className={styles.successTitle}>{t.successTitle}</h2>
            <p className={styles.successDesc}>
              {t.successDesc.replace('{name}', guestDetails.name)}
            </p>

            <div
              style={{
                background: 'rgba(197, 165, 90, 0.1)',
                border: '1px dashed var(--color-gold)',
                borderRadius: 'var(--radius-sm)',
                padding: '20px',
                maxWidth: '440px',
                margin: '0 auto 32px',
              }}
            >
              <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-muted)' }}>
                {t.yourBookingCode}
              </span>
              <div
                style={{
                  fontFamily: 'monospace',
                  fontSize: '1.9rem',
                  fontWeight: 'bold',
                  color: 'var(--color-primary-dark)',
                  margin: '8px 0',
                  letterSpacing: '0.08em',
                }}
              >
                {bookingResult.bookingCode}
              </div>
              <button
                onClick={copyBookingCode}
                style={{
                  background: '#ffffff',
                  border: '1px solid #d1d5db',
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.8rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                }}
              >
                {bookingResult.copied ? <Check size={14} color="#2e7d32" /> : <Copy size={14} />}
                {bookingResult.copied ? t.copied : t.copyCode}
              </button>
            </div>

            <div style={{ maxWidth: '540px', margin: '0 auto 36px', textAlign: 'left', background: '#faf8f5', padding: '20px', borderRadius: 'var(--radius-sm)' }}>
              <h4 style={{ fontSize: '0.95rem', marginBottom: '10px', color: 'var(--color-primary-dark)' }}>
                {t.bookingSummary}
              </h4>
              <div style={{ fontSize: '0.88rem', color: '#4b5563', lineHeight: 1.8 }}>
                <div>• <strong>{t.roomTypeLabel}</strong> {selectedRoom?.name}</div>
                <div>• <strong>{t.durationLabel}</strong> {checkIn} {locale === 'en' ? 'to' : 's/d'} {checkOut} ({nights} {t.nights})</div>
                <div>• <strong>{t.adultGuests.replace(' *', '')}:</strong> {guests} {t.persons}</div>
                <div>• <strong>{t.totalPayment}</strong> {formatRupiah(grandTotal)}</div>
                <div>• <strong>WhatsApp:</strong> {guestDetails.phone}</div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <button
                className="btn-luxury-secondary"
                onClick={() => window.print()}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <Printer size={16} /> {t.printPdf}
              </button>
              <Link href="/" className="btn-luxury-primary">
                {t.backToHome}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
