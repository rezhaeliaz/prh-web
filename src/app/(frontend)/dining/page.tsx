import React from 'react'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { Clock, Users, Utensils, MessageCircle, CheckCircle2 } from 'lucide-react'
import { getDiningData, getSiteSettingsData, getHomePageData } from '@/lib/cmsData'
import type { Locale } from '@/lib/translations'
import styles from './dining.module.css'

export const metadata: Metadata = {
  title: 'Restoran, Lounge & Kuliner Sunda | Padjadjaran Suites Resort Bogor',
  description:
    'Nikmati cita rasa khas Sunda dan hidangan internasional di Restoran Hegarmanah & Bale Bancakan Padjadjaran Suites Resort Bogor.',
}

export default async function DiningPage() {
  const cookieStore = await cookies()
  const locale = (cookieStore.get('NEXT_LOCALE')?.value as Locale) || 'id'

  const [venues, settings, homeData] = await Promise.all([
    getDiningData(locale),
    getSiteSettingsData(locale),
    getHomePageData(locale),
  ])

  const cleanWa = settings.whatsapp.replace(/[^0-9]/g, '')
  const headerBg =
    homeData?.subpageBanners?.diningBannerUrl ||
    'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/hegarmanah-1.jpg.jpeg'

  return (
    <div>
      {/* Page Header */}
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
            backgroundImage: `url('${headerBg}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.35)',
          }}
        />
        <div className="site-container" style={{ position: 'relative', zIndex: 2, maxWidth: '800px' }}>
          <span className="section-subtitle" style={{ color: '#dfc888' }}>
            {locale === 'en' ? 'Bogor Culinary Journey' : 'Wisata Kuliner Bogor'}
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', color: '#ffffff', marginBottom: '16px' }}>
            {locale === 'en' ? 'Dining, Lounges & Culinary Sanctuaries' : 'Restoran, Lounge & Jamuan Kuliner'}
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#d1d5db', lineHeight: 1.7 }}>
            {locale === 'en'
              ? 'Savor authentic flavors of sundanese spices and world-class international cuisines, served amidst refreshing mountain breezes.'
              : 'Nikmati cita rasa otentik Sunda yang kaya rempah dan menu internasional berkelas, disajikan di tengah suasana alam pegunungan yang menyejukkan.'}
          </p>
        </div>
      </section>

      {/* Venues Showcase List */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-cream-light)' }}>
        <div className="site-container">
          {venues.map((venue, idx) => (
            <div
              key={venue.id}
              className={idx % 2 === 0 ? styles.venueCard : styles.venueCardReverse}
            >
              {/* Image side */}
              <div className={styles.imageSide}>
                <img
                  src={venue.featuredImage}
                  alt={venue.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '18px',
                    left: '18px',
                    background: 'rgba(18, 20, 23, 0.88)',
                    backdropFilter: 'blur(8px)',
                    color: 'var(--color-gold)',
                    border: '1px solid rgba(197, 165, 90, 0.4)',
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  {venue.type}
                </span>
              </div>

              {/* Info side */}
              <div className={styles.infoSide}>
                <div>
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.85rem', color: 'var(--color-primary-dark)', marginBottom: '8px' }}>
                    {venue.name}
                  </h2>
                  <p style={{ color: 'var(--color-gold-dark)', fontWeight: 500, fontSize: '0.95rem', marginBottom: '16px' }}>
                    {venue.tagline}
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      gap: '24px',
                      padding: '12px 0',
                      borderTop: '1px solid #f0ede6',
                      borderBottom: '1px solid #f0ede6',
                      marginBottom: '20px',
                      fontSize: '0.88rem',
                      color: 'var(--color-text-main)',
                      flexWrap: 'wrap',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Clock size={16} color="#c5a55a" />
                      <span>{locale === 'en' ? 'Hours: ' : 'Jam Buka: '}{venue.openingHours}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Users size={16} color="#c5a55a" />
                      <span>{locale === 'en' ? 'Capacity: ' : 'Kapasitas: '}{venue.capacity}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Utensils size={16} color="#c5a55a" />
                      <span>{venue.cuisine}</span>
                    </div>
                  </div>

                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.98rem', lineHeight: 1.75, marginBottom: '24px' }}>
                    {venue.description}
                  </p>

                  {venue.specialties && venue.specialties.length > 0 && (
                    <>
                      <h4 style={{ fontSize: '0.92rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-primary-dark)', marginBottom: '12px' }}>
                        {locale === 'en' ? 'Chef Specialties & Selected Dishes:' : 'Menu & Hidangan Spesial Pilihan:'}
                      </h4>
                      <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginBottom: '28px' }}>
                        {venue.specialties.map((item, i) => (
                          <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: '#374151' }}>
                            <CheckCircle2 size={16} color="#c5a55a" style={{ flexShrink: 0 }} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap', paddingTop: '20px', borderTop: '1px solid #f0ede6' }}>
                  <a
                    href={`https://wa.me/${cleanWa}?text=${encodeURIComponent(
                      locale === 'en'
                        ? `Hello Padjadjaran Suites, I would like to reserve a table at ${venue.name}`
                        : `Halo Padjadjaran Suites, saya ingin reservasi meja di ${venue.name}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-luxury-primary"
                    style={{ padding: '12px 28px', fontSize: '0.88rem' }}
                  >
                    <MessageCircle size={18} />
                    {locale === 'en' ? 'Reserve a Table / Private Dining' : 'Reservasi Meja / Jamuan Khusus'}
                  </a>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                    {locale === 'en' ? 'Buffet packages & family celebrations available' : 'Tersedia paket prasmanan & arisan keluarga'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
