'use client'

import React, { useState } from 'react'
import {
  Users,
  Maximize2,
  CheckCircle2,
  HeartHandshake,
  Send,
  Sparkles,
  MessageSquareQuote,
  ShieldCheck,
  Calendar,
  Building2,
  Calculator,
} from 'lucide-react'
import { EventItem } from '@/data/hotelData'
import type { Locale } from '@/lib/translations'
import { MicePlanner } from '@/components/MicePlanner/MicePlanner'

interface EventsClientProps {
  events: EventItem[]
  locale?: Locale
  settings?: {
    whatsapp?: string
  }
  bannerUrl?: string
  sectionHeader?: {
    subtitle?: string
    title?: string
    desc?: string
  }
}

export const EventsClient: React.FC<EventsClientProps> = ({
  events,
  locale = 'id',
  settings,
  bannerUrl,
  sectionHeader,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: 'wedding',
    date: '',
    pax: '200',
    notes: '',
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const cleanWa = (settings?.whatsapp || '+62 851 8309 3061').replace(/[^0-9]/g, '')

  const handleRfpSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)

    const waMsg = encodeURIComponent(
      locale === 'en'
        ? `Hello Padjadjaran Suites Event Team,\nI would like to request an event proposal:\n- Name: ${formData.name}\n- Contact: ${formData.phone} / ${formData.email}\n- Event Type: ${formData.eventType.toUpperCase()}\n- Planned Date: ${formData.date}\n- Estimated Guests: ${formData.pax} Pax\n- Notes: ${formData.notes || '-'}\n\nPlease contact me with package details. Thank you!`
        : `Halo Tim Event Padjadjaran Suites Resort,\nSaya ingin meminta penawaran proposal acara:\n- Nama: ${formData.name}\n- Kontak: ${formData.phone} / ${formData.email}\n- Jenis Acara: ${formData.eventType.toUpperCase()}\n- Rencana Tanggal: ${formData.date}\n- Perkiraan Peserta: ${formData.pax} Pax\n- Catatan: ${formData.notes || '-'}\n\nMohon dihubungi untuk konsultasi paket selengkapnya. Terima kasih!`
    )

    // Open WhatsApp with dynamic hotel WhatsApp number
    window.open(`https://wa.me/${cleanWa}?text=${waMsg}`, '_blank')
  }

  const bgImage = bannerUrl || 'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/ballroom-1.jpg.jpeg'
  const displaySubtitle =
    sectionHeader?.subtitle ||
    (locale === 'en' ? 'MICE & Premier Event Destination Bogor' : 'MICE & Destinasi Acara Akbar Bogor')
  const displayTitle =
    sectionHeader?.title ||
    (locale === 'en' ? 'Bale Pakuan Ballroom & Event Venues' : 'Bale Pakuan Ballroom & Ruang Pertemuan')
  const displayDesc =
    sectionHeader?.desc ||
    (locale === 'en'
      ? 'Featuring convention facilities for up to 1,000 guests and 20+ technologically equipped meeting rooms for grand weddings, international conferences, and corporate seminars.'
      : 'Menghadirkan fasilitas konvensi berkapasitas hingga 1.000 tamu dan lebih dari 20 ruang pertemuan berteknologi tinggi untuk konferensi, pameran akbar, maupun pesta pernikahan impian.')

  return (
    <div>
      {/* Header Banner */}
      <section
        style={{
          backgroundColor: 'var(--color-primary-dark)',
          padding: '160px 0 80px',
          color: '#ffffff',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url('${bgImage}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.32)',
          }}
        />
        <div className="site-container" style={{ position: 'relative', zIndex: 2, maxWidth: '840px' }}>
          <span className="section-subtitle" style={{ color: '#dfc888' }}>
            {displaySubtitle}
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', color: '#ffffff', marginBottom: '16px' }}>
            {displayTitle}
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#d1d5db', lineHeight: 1.7 }}>
            {displayDesc}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', marginTop: '28px', flexWrap: 'wrap' }}>
            <a href="#planner" className="btn-luxury-primary" style={{ padding: '12px 28px', fontSize: '0.9rem' }}>
              <Calculator size={18} />
              {locale === 'en' ? 'MICE Event Planner & Proposal Suite ↓' : 'Kalkulator & MICE Event Planner ↓'}
            </a>
            <a href="#venues" className="btn-luxury-secondary" style={{ color: '#ffffff', borderColor: 'rgba(255, 255, 255, 0.4)', padding: '12px 24px', fontSize: '0.9rem' }}>
              {locale === 'en' ? 'Explore Ballrooms & Venues' : 'Lihat Pilihan Ruangan'}
            </a>
          </div>
        </div>
      </section>

      {/* Venues Detail */}
      <section id="venues" className="section-padding" style={{ backgroundColor: 'var(--color-cream-light)' }}>
        <div className="site-container">
          {events.map((event) => (
            <div
              key={event.id}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(197, 165, 90, 0.25)',
                overflow: 'hidden',
                marginBottom: '56px',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))' }}>
                <div style={{ height: '420px', position: 'relative', overflow: 'hidden', background: '#121417' }}>
                  <img
                    src={event.featuredImage}
                    alt={event.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      top: '18px',
                      left: '18px',
                      background: 'rgba(18, 20, 23, 0.9)',
                      color: 'var(--color-gold)',
                      border: '1px solid var(--color-gold)',
                      padding: '6px 14px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {locale === 'en' ? `Capacity up to ${event.capacityMax} Pax` : `Kapasitas s/d ${event.capacityMax} Pax`}
                  </span>
                </div>

                <div style={{ padding: '36px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--color-primary-dark)', marginBottom: '8px' }}>
                      {event.name}
                    </h2>
                    <p style={{ color: 'var(--color-gold-dark)', fontWeight: 500, fontSize: '0.95rem', marginBottom: '16px' }}>
                      {event.tagline}
                    </p>

                    <div
                      style={{
                        display: 'flex',
                        gap: '20px',
                        padding: '12px 0',
                        borderTop: '1px solid #f0ede6',
                        borderBottom: '1px solid #f0ede6',
                        marginBottom: '18px',
                        fontSize: '0.88rem',
                        color: 'var(--color-text-main)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Maximize2 size={16} color="#c5a55a" />
                        <span>{locale === 'en' ? 'Area: ' : 'Luas: '}{event.areaSize}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Building2 size={16} color="#c5a55a" />
                        <span>{locale === 'en' ? 'Ceiling: ' : 'Plafon: '}{event.ceilingHeight}</span>
                      </div>
                    </div>

                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '20px' }}>
                      {event.description}
                    </p>

                    {event.layouts && event.layouts.length > 0 && (
                      <>
                        <h4 style={{ fontSize: '0.88rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-primary-dark)', marginBottom: '10px' }}>
                          {locale === 'en' ? 'Room Layout Capacities:' : 'Kapasitas Tata Letak Ruangan:'}
                        </h4>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '8px', marginBottom: '24px' }}>
                          {event.layouts.map((l, i) => (
                            <div key={i} style={{ background: 'var(--color-cream-base)', padding: '8px 12px', borderRadius: 'var(--radius-sm)', fontSize: '0.82rem' }}>
                              <span style={{ color: 'var(--color-text-muted)', display: 'block' }}>{l.style}</span>
                              <strong style={{ color: 'var(--color-primary-dark)' }}>{l.capacity} Pax</strong>
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    {event.features && event.features.length > 0 && (
                      <>
                        <h4 style={{ fontSize: '0.88rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-primary-dark)', marginBottom: '10px' }}>
                          {locale === 'en' ? 'Included Amenities & Services:' : 'Fasilitas Termasuk:'}
                        </h4>
                        <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '8px' }}>
                          {event.features.map((f, i) => (
                            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#4b5563' }}>
                              <CheckCircle2 size={15} color="#c5a55a" style={{ flexShrink: 0 }} />
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>

                  <div style={{ paddingTop: '24px', borderTop: '1px solid #f0ede6', marginTop: '24px' }}>
                    <a href="#rfp-form" className="btn-luxury-primary">
                      {locale === 'en' ? 'Request Proposal for This Venue' : 'Minta Penawaran Paket Ini'}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Dedicated Wedding & Celebrations Showcase */}
          <section
            id="wedding"
            style={{
              backgroundColor: '#1a221c',
              color: '#ffffff',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(197, 165, 90, 0.4)',
              boxShadow: 'var(--shadow-md)',
              padding: '60px 40px',
              marginBottom: '64px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 48px' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'var(--color-gold)',
                  fontSize: '0.82rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  marginBottom: '10px',
                }}
              >
                <HeartHandshake size={16} />
                {locale === 'en' ? 'Weddings & Celebrations' : 'Pernikahan & Perayaan Istimewa'}
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '2.4rem',
                  color: '#ffffff',
                  marginBottom: '14px',
                  lineHeight: 1.2,
                }}
              >
                {locale === 'en'
                  ? 'Crafting Your Dream Wedding in Bale Pakuan Grand Ballroom'
                  : 'Wujudkan Pernikahan Impian di Bale Pakuan Grand Ballroom'}
              </h2>
              <p style={{ color: '#d1d5db', fontSize: '1rem', lineHeight: 1.7 }}>
                {locale === 'en'
                  ? 'From solemn sacred ceremonies to lavish receptions of up to 1,000 guests, our wedding specialists curate every moment with five-star hospitality and breathtaking mountain backdrops.'
                  : 'Dari ikrar suci akad nikah yang khidmat hingga pesta resepsi megah berkapasitas 1.000 tamu, tim wedding specialist kami siap mewujudkan perayaan cinta Anda dengan keramahtamahan bintang lima berlatar Gunung Salak.'}
              </p>
            </div>

            {/* Wedding Highlights Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
                gap: '24px',
                marginBottom: '40px',
              }}
            >
              {/* Card 1 */}
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(197, 165, 90, 0.25)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '28px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      background: 'rgba(197, 165, 90, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-gold)',
                      marginBottom: '16px',
                    }}
                  >
                    <Sparkles size={20} />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--color-gold)', marginBottom: '10px' }}>
                    {locale === 'en' ? 'Grand Ballroom Grandeur' : 'Kemegahan Grand Ballroom'}
                  </h3>
                  <p style={{ color: '#9ca3af', fontSize: '0.88rem', lineHeight: 1.6 }}>
                    {locale === 'en'
                      ? 'Pillarless convention building with 7m high ceilings, crystal chandeliers, VIP bride holding suites, and spacious pre-function foyer.'
                      : 'Gedung konvensi megah tanpa pilar dengan ceiling 7 meter, lampu kristal megah, ruang rias pengantin VIP, dan area foyer pameran luas.'}
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(197, 165, 90, 0.25)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '28px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      background: 'rgba(197, 165, 90, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-gold)',
                      marginBottom: '16px',
                    }}
                  >
                    <HeartHandshake size={20} />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--color-gold)', marginBottom: '10px' }}>
                    {locale === 'en' ? 'Bespoke Catering & Suites' : 'Jamuan Kuliner & Suite Pengantin'}
                  </h3>
                  <p style={{ color: '#9ca3af', fontSize: '0.88rem', lineHeight: 1.6 }}>
                    {locale === 'en'
                      ? 'Customized buffet & food stall creations by our master chefs, food testing session, and complimentary romantic honeymoon night in Royal Suite.'
                      : 'Pilihan menu prasmanan & stall lezat kreasi master chef kami, sesi uji rasa (food tasting), serta menginap romantis di Royal Suite berpanorama gunung.'}
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(197, 165, 90, 0.25)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '28px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      background: 'rgba(197, 165, 90, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-gold)',
                      marginBottom: '16px',
                    }}
                  >
                    <Users size={20} />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--color-gold)', marginBottom: '10px' }}>
                    {locale === 'en' ? 'Wedding Specialist Concierge' : 'Pendampingan Wedding Specialist'}
                  </h3>
                  <p style={{ color: '#9ca3af', fontSize: '0.88rem', lineHeight: 1.6 }}>
                    {locale === 'en'
                      ? 'Dedicated event coordinator from planning to big day, complimentary pre-wedding photo access across the resort, and vast 300+ car parking.'
                      : 'Koordinator khusus mendampingi perencanaan hingga hari-H, izin foto pre-wedding gratis di seluruh area resor, serta parkir leluasa 300+ mobil.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Wedding Actions */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <a
                href={`https://wa.me/${cleanWa}?text=${encodeURIComponent(
                  locale === 'en'
                    ? 'Hello Padjadjaran Suites Wedding Team, I would like to consult about Bale Pakuan wedding packages and date availability'
                    : 'Halo Tim Wedding Padjadjaran Suites, saya ingin konsultasi paket wedding Bale Pakuan dan cek ketersediaan tanggal'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-luxury-primary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px' }}
              >
                <MessageSquareQuote size={18} />
                {locale === 'en' ? 'Consult Wedding Concierge (WA)' : 'Konsultasi Wedding Concierge (WA)'}
              </a>
              <a
                href="#rfp-form"
                className="btn-luxury-outline"
                style={{ padding: '14px 28px', color: '#ffffff', borderColor: 'var(--color-gold)' }}
              >
                {locale === 'en' ? 'Request Wedding Proposal (RFP)' : 'Minta Proposal Pernikahan (RFP)'}
              </a>
            </div>
          </section>

          {/* MICE Event Planner & Proposal Calculator Suite */}
          <MicePlanner locale={locale} whatsappNumber={settings?.whatsapp} />

          {/* Interactive Request for Proposal (RFP) Form */}
          <div
            id="rfp-form"
            style={{
              backgroundColor: '#ffffff',
              borderRadius: 'var(--radius-md)',
              border: '2px solid var(--color-gold)',
              boxShadow: 'var(--shadow-lg)',
              padding: '48px',
              maxWidth: '860px',
              margin: '0 auto',
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <span className="section-subtitle">{locale === 'en' ? 'Event Inquiry' : 'Konsultasi Acara'}</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: 'var(--color-primary-dark)', marginBottom: '12px' }}>
                {locale === 'en' ? 'Request for Proposal (RFP)' : 'Formulir Penawaran Proposal (RFP)'}
              </h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.98rem' }}>
                {locale === 'en'
                  ? 'Share your event requirements with us. Our hotel banquet specialists will formulate a comprehensive proposal within 24 hours.'
                  : 'Sampaikan rencana acara Anda. Tim spesialis MICE & Wedding Padjadjaran Suites Resort akan menyusun proposal penawaran khusus dalam waktu 1x24 jam.'}
              </p>
            </div>

            {isSubmitted ? (
              <div style={{ textAlign: 'center', padding: '36px 0' }}>
                <CheckCircle2 size={64} color="#2e7d32" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>
                  {locale === 'en' ? 'Proposal Request Sent!' : 'Permintaan Proposal Terkirim!'}
                </h3>
                <p style={{ color: 'var(--color-text-muted)', maxWidth: '500px', margin: '0 auto 24px' }}>
                  {locale === 'en'
                    ? 'We have forwarded your event requirements to the hotel banquet team via WhatsApp Concierge for prompt assistance.'
                    : 'Kami telah meneruskan rincian acara Anda ke tim banquet hotel via WhatsApp Concierge untuk respon kilat.'}
                </p>
                <button className="btn-luxury-secondary" onClick={() => setIsSubmitted(false)}>
                  {locale === 'en' ? 'Submit Another Event Request' : 'Kirim Permintaan Acara Lain'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleRfpSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-primary-dark)', marginBottom: '6px' }}>
                      {locale === 'en' ? 'Full Name / Organization *' : 'Nama Lengkap / Perusahaan *'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={locale === 'en' ? 'e.g. John Doe / Global Enterprises' : 'Contoh: Bpk. Bambang / PT Maju Mandiri'}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{ width: '100%', height: '46px', padding: '0 14px', borderRadius: 'var(--radius-sm)', border: '1px solid #d1d5db', fontSize: '0.9rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-primary-dark)', marginBottom: '6px' }}>
                      {locale === 'en' ? 'Active WhatsApp Number *' : 'Nomor WhatsApp Aktif *'}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder={locale === 'en' ? 'e.g. +62 812-3456-7890' : 'Contoh: 0812-3456-7890'}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{ width: '100%', height: '46px', padding: '0 14px', borderRadius: 'var(--radius-sm)', border: '1px solid #d1d5db', fontSize: '0.9rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-primary-dark)', marginBottom: '6px' }}>
                      {locale === 'en' ? 'Email Address *' : 'Alamat Email *'}
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="email@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{ width: '100%', height: '46px', padding: '0 14px', borderRadius: 'var(--radius-sm)', border: '1px solid #d1d5db', fontSize: '0.9rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-primary-dark)', marginBottom: '6px' }}>
                      {locale === 'en' ? 'Event Type *' : 'Jenis Acara *'}
                    </label>
                    <select
                      value={formData.eventType}
                      onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                      style={{ width: '100%', height: '46px', padding: '0 14px', borderRadius: 'var(--radius-sm)', border: '1px solid #d1d5db', fontSize: '0.9rem', backgroundColor: '#ffffff' }}
                    >
                      <option value="wedding">{locale === 'en' ? 'Wedding Reception' : 'Pernikahan (Wedding Reception)'}</option>
                      <option value="corporate-meeting">{locale === 'en' ? 'Corporate Meeting / Seminar' : 'Meeting Korporat / Seminar'}</option>
                      <option value="conference">{locale === 'en' ? 'Conference / Convention' : 'Konferensi / Kongres Akbar'}</option>
                      <option value="gathering">{locale === 'en' ? 'Family Gathering / Reunion' : 'Family Gathering / Reuni'}</option>
                      <option value="birthday">{locale === 'en' ? 'Birthday / Social Celebration' : 'Ulang Tahun / Sweet 17'}</option>
                      <option value="exhibition">{locale === 'en' ? 'Exhibition / Expo' : 'Pameran / Bazar'}</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-primary-dark)', marginBottom: '6px' }}>
                      {locale === 'en' ? 'Estimated Event Date' : 'Perkiraan Tanggal Acara'}
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      style={{ width: '100%', height: '46px', padding: '0 14px', borderRadius: 'var(--radius-sm)', border: '1px solid #d1d5db', fontSize: '0.9rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-primary-dark)', marginBottom: '6px' }}>
                      {locale === 'en' ? 'Estimated Attendance (Pax)' : 'Estimasi Jumlah Peserta (Pax)'}
                    </label>
                    <select
                      value={formData.pax}
                      onChange={(e) => setFormData({ ...formData, pax: e.target.value })}
                      style={{ width: '100%', height: '46px', padding: '0 14px', borderRadius: 'var(--radius-sm)', border: '1px solid #d1d5db', fontSize: '0.9rem', backgroundColor: '#ffffff' }}
                    >
                      <option value="50">20 - 50 Pax (Small Meeting)</option>
                      <option value="150">50 - 150 Pax (Medium Meeting)</option>
                      <option value="300">150 - 300 Pax</option>
                      <option value="500">300 - 500 Pax (Grand Ballroom)</option>
                      <option value="1000">500 - 1,000 Pax (Full Ballroom)</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-primary-dark)', marginBottom: '6px' }}>
                    {locale === 'en' ? 'Special Requirements / Additional Notes' : 'Kebutuhan Khusus / Catatan Tambahan'}
                  </label>
                  <textarea
                    rows={4}
                    placeholder={
                      locale === 'en'
                        ? 'e.g. Requires wedding stage, specific sound system, 30 committee hotel rooms, 2x coffee breaks and buffet luncheon...'
                        : 'Contoh: Memerlukan panggung pelaminan, sound system khusus, akomodasi menginap 30 kamar panitia, paket coffee break 2 kali dan makan siang prasmanan...'
                    }
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid #d1d5db', fontSize: '0.9rem', resize: 'vertical' }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-luxury-primary"
                  style={{ width: '100%', height: '52px', fontSize: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}
                >
                  <Send size={18} />
                  {locale === 'en' ? 'Submit Proposal Request via WhatsApp Concierge' : 'Kirim Permintaan Proposal via WhatsApp Concierge'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
