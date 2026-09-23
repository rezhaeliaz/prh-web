'use client'

import React, { useState } from 'react'
import { MapPin, Phone, Mail, MessageCircle, Send, CheckCircle2, Car } from 'lucide-react'
import { getDictionary, type Locale } from '@/lib/translations'

interface ContactClientProps {
  locale?: Locale
  settings: {
    name: string
    tagline: string
    phone: string
    whatsapp: string
    whatsappUrl: string
    email: string
    address: string
    googleMapsUrl: string
  }
}

export const ContactClient: React.FC<ContactClientProps> = ({ locale = 'id', settings }) => {
  const dict = getDictionary(locale).contactPage
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const cleanWa = settings.whatsapp.replace(/[^0-9]/g, '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    const waText = encodeURIComponent(
      locale === 'en'
        ? `Hello Padjadjaran Suites Resort,\nWebsite Message:\n- Name: ${formData.name}\n- Email: ${formData.email}\n- Phone/WA: ${formData.phone}\n- Subject: ${formData.subject}\n- Message: ${formData.message}`
        : `Halo Padjadjaran Suites Resort,\nPesan dari Website:\n- Nama: ${formData.name}\n- Email: ${formData.email}\n- Telp/WA: ${formData.phone}\n- Topik: ${formData.subject}\n- Pesan: ${formData.message}`
    )
    window.open(`https://wa.me/${cleanWa}?text=${waText}`, '_blank')
  }

  return (
    <div>
      {/* Header */}
      <section
        style={{
          backgroundColor: 'var(--color-primary-dark)',
          padding: '160px 0 60px',
          color: '#ffffff',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <div className="site-container" style={{ maxWidth: '800px' }}>
          <span className="section-subtitle" style={{ color: '#dfc888' }}>
            {dict.subtitle}
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', color: '#ffffff', marginBottom: '14px' }}>
            {dict.title}
          </h1>
          <p style={{ color: '#d1d5db', fontSize: '1.05rem', lineHeight: 1.7 }}>
            {dict.desc}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-cream-light)' }}>
        <div className="site-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '48px', alignItems: 'start' }}>
            {/* Contact Information & Directions */}
            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--color-primary-dark)', marginBottom: '24px' }}>
                {locale === 'en' ? 'Official Contact Information' : 'Informasi Kontak Resmi'}
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '40px' }}>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '8px', background: 'var(--color-gold-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MapPin size={22} color="#c5a55a" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', color: 'var(--color-primary-dark)', marginBottom: '4px' }}>{dict.addressTitle}</h4>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                      {settings.address}
                    </p>
                    <a
                      href={settings.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'var(--color-gold-dark)', fontSize: '0.85rem', fontWeight: 600, display: 'inline-block', marginTop: '6px' }}
                    >
                      {dict.mapsDirection}
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '8px', background: 'var(--color-gold-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Phone size={22} color="#c5a55a" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', color: 'var(--color-primary-dark)', marginBottom: '4px' }}>{dict.operatorTitle}</h4>
                    <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem' }}>
                      {settings.phone}
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '8px', background: 'rgba(37, 211, 102, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MessageCircle size={22} color="#25D366" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', color: 'var(--color-primary-dark)', marginBottom: '4px' }}>{dict.conciergeTitle}</h4>
                    <a
                      href={settings.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#075e54', fontSize: '0.92rem', fontWeight: 500 }}
                    >
                      {settings.whatsapp}
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '8px', background: 'var(--color-gold-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Mail size={22} color="#c5a55a" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', color: 'var(--color-primary-dark)', marginBottom: '4px' }}>{dict.emailTitle}</h4>
                    <a href={`mailto:${settings.email}`} style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem' }}>
                      {settings.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* How to Get Here Guide */}
              <div
                style={{
                  background: '#ffffff',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid rgba(197, 165, 90, 0.25)',
                  padding: '24px',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <Car size={20} color="#c5a55a" />
                  <h4 style={{ fontSize: '1.05rem', color: 'var(--color-primary-dark)', margin: 0 }}>
                    {dict.directionsTitle}
                  </h4>
                </div>
                <ul style={{ listStyle: 'disc', paddingLeft: '20px', color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                  {locale === 'en' ? (
                    <>
                      <li>Only 15 minutes from the Baranangsiang / Jagorawi Toll Gate Bogor.</li>
                      <li>Strategically located in the integrated tourism area of Bogor Nirwana Residence (BNR).</li>
                      <li>Just 3 minutes to The Jungle Waterpark & Rumah Air Bogor.</li>
                      <li>Spacious parking area accommodating hundreds of private cars and tourism buses.</li>
                    </>
                  ) : (
                    <>
                      <li>Hanya 15 menit dari Pintu Tol Baranangsiang / Tol Jagorawi Bogor.</li>
                      <li>Terletak strategis di kawasan wisata terpadu Bogor Nirwana Residence (BNR).</li>
                      <li>Hanya 3 menit ke The Jungle Waterpark & Rumah Air Bogor.</li>
                      <li>Area parkir luas yang dapat menampung ratusan mobil dan bus pariwisata.</li>
                    </>
                  )}
                </ul>
              </div>
            </div>

            {/* Interactive Contact Form */}
            <div
              style={{
                background: '#ffffff',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-gold)',
                padding: '40px',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--color-primary-dark)', marginBottom: '8px' }}>
                {dict.formTitle}
              </h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>
                {dict.formDesc}
              </p>

              {submitted ? (
                <div style={{ textAlign: 'center', padding: '30px 0' }}>
                  <CheckCircle2 size={54} color="#2e7d32" style={{ margin: '0 auto 14px' }} />
                  <h4 style={{ fontSize: '1.25rem', marginBottom: '6px' }}>{dict.successTitle}</h4>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                    {dict.successDesc}
                  </p>
                  <button
                    className="btn-luxury-primary"
                    style={{ marginTop: '16px' }}
                    onClick={() => setSubmitted(false)}
                  >
                    {dict.sendAnother}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>{dict.fullName}</label>
                    <input
                      type="text"
                      required
                      style={{ height: '44px', border: '1px solid #dcd7ce', borderRadius: '4px', padding: '0 14px', background: '#faf8f5' }}
                      placeholder={locale === 'en' ? 'Your Full Name' : 'Nama Anda'}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>{dict.email}</label>
                      <input
                        type="email"
                        required
                        style={{ height: '44px', border: '1px solid #dcd7ce', borderRadius: '4px', padding: '0 14px', background: '#faf8f5' }}
                        placeholder="email@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>{dict.whatsappNum}</label>
                      <input
                        type="tel"
                        required
                        style={{ height: '44px', border: '1px solid #dcd7ce', borderRadius: '4px', padding: '0 14px', background: '#faf8f5' }}
                        placeholder="0812-xxxx-xxxx"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>{dict.subject}</label>
                    <select
                      style={{ height: '44px', border: '1px solid #dcd7ce', borderRadius: '4px', padding: '0 14px', background: '#faf8f5' }}
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    >
                      <option value="">{locale === 'en' ? 'Select Inquiry Topic...' : 'Pilih Topik...'}</option>
                      <option value="Reservasi Kamar">{locale === 'en' ? 'Room Reservation & Rates' : 'Reservasi Kamar & Ketersediaan'}</option>
                      <option value="Paket Pernikahan">{locale === 'en' ? 'Wedding Reception Package' : 'Paket Pernikahan Bale Pakuan'}</option>
                      <option value="Meeting / MICE">{locale === 'en' ? 'Corporate Meeting & Gathering' : 'Meeting Kantor & Gathering'}</option>
                      <option value="Restoran Hegarmanah">{locale === 'en' ? 'Dining & Table Reservation' : 'Restoran & Jamuan Makan'}</option>
                      <option value="Lainnya">{locale === 'en' ? 'Other Inquiry' : 'Pertanyaan Lainnya'}</option>
                    </select>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>{dict.message}</label>
                    <textarea
                      rows={4}
                      required
                      style={{ border: '1px solid #dcd7ce', borderRadius: '4px', padding: '10px 14px', background: '#faf8f5', resize: 'vertical' }}
                      placeholder={locale === 'en' ? 'Write your inquiry or request here...' : 'Tuliskan pertanyaan atau kebutuhan Anda di sini...'}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="btn-luxury-primary" style={{ height: '48px', marginTop: '6px' }}>
                    <Send size={16} />
                    {dict.sendBtn}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
