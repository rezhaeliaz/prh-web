import React from 'react'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { Clock, CheckCircle2 } from 'lucide-react'
import { getFacilitiesData, getHomePageData } from '@/lib/cmsData'
import { getDictionary, type Locale } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Fasilitas Resor Bintang 5 | Padjadjaran Suites Resort Bogor',
  description:
    'Fasilitas kolam renang outdoor, Nirwana spa tradisional Sunda, pusat kebugaran (fitness center), dan taman bermain anak di Padjadjaran Suites Resort Bogor.',
}

export default async function FacilitiesPage() {
  const cookieStore = await cookies()
  const locale = (cookieStore.get('NEXT_LOCALE')?.value as Locale) || 'id'
  const [facilities, homeData] = await Promise.all([
    getFacilitiesData(locale),
    getHomePageData(locale),
  ])
  const dict = getDictionary(locale).facilitiesPage
  const bannerUrl =
    homeData?.subpageBanners?.facilitiesBannerUrl ||
    'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/bilding.jpg.jpeg'

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
            backgroundImage: `url('${bannerUrl}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.35)',
          }}
        />
        <div className="site-container" style={{ position: 'relative', zIndex: 2, maxWidth: '820px' }}>
          <span className="section-subtitle" style={{ color: '#dfc888' }}>
            {dict.subtitle}
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', color: '#ffffff', marginBottom: '16px' }}>
            {dict.title}
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#d1d5db', lineHeight: 1.7 }}>
            {dict.desc}
          </p>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-cream-light)' }}>
        <div className="site-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '32px' }}>
            {facilities.map((fac) => (
              <div
                key={fac.id}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid rgba(197, 165, 90, 0.25)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ height: '240px', position: 'relative', background: '#1a1d21' }}>
                  <img
                    src={fac.featuredImage}
                    alt={fac.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      background: 'rgba(18, 20, 23, 0.88)',
                      color: 'var(--color-gold)',
                      border: '1px solid rgba(197, 165, 90, 0.4)',
                      padding: '4px 12px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                    }}
                  >
                    {fac.category}
                  </span>
                </div>

                <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--color-primary-dark)', marginBottom: '8px' }}>
                    {fac.name}
                  </h3>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--color-gold-dark)', marginBottom: '14px', fontWeight: 500 }}>
                    <Clock size={15} />
                    <span>{dict.openingHours} {fac.openingHours}</span>
                  </div>

                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', lineHeight: 1.65, marginBottom: '20px', flexGrow: 1 }}>
                    {fac.description}
                  </p>

                  {fac.features && fac.features.length > 0 && (
                    <div style={{ borderTop: '1px solid #f0ede6', paddingTop: '16px' }}>
                      <h5 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-muted)', marginBottom: '8px' }}>
                        {dict.keyFeatures}
                      </h5>
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {fac.features.map((feat, i) => (
                          <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: '#4b5563' }}>
                            <CheckCircle2 size={14} color="#c5a55a" style={{ flexShrink: 0 }} />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
