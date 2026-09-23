'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Maximize2, Bed, Users, ArrowRight, ShieldCheck, Clock } from 'lucide-react'
import { RoomItem } from '@/data/hotelData'
import { getDictionary, type Locale } from '@/lib/translations'
import styles from './rooms.module.css'

interface RoomsListClientProps {
  initialRooms: RoomItem[]
  locale?: Locale
  bannerUrl?: string
  sectionHeader?: {
    subtitle?: string
    title?: string
    desc?: string
  }
}

export const RoomsListClient: React.FC<RoomsListClientProps> = ({
  initialRooms,
  locale = 'id',
  bannerUrl,
  sectionHeader,
}) => {
  const dict = getDictionary(locale).roomsPage
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'superior' | 'executive' | 'royal-suite'>('all')

  const filteredRooms =
    selectedCategory === 'all'
      ? initialRooms
      : initialRooms.filter((r) => r.category === selectedCategory)

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val)
  }

  const displaySubtitle = sectionHeader?.subtitle || dict.subtitle
  const displayTitle = sectionHeader?.title || dict.title
  const displayDesc = sectionHeader?.desc || dict.desc

  return (
    <div>
      {/* Page Hero Header */}
      <section className={styles.roomsHeader}>
        <div
          className={styles.roomsHeaderBg}
          style={bannerUrl ? { backgroundImage: `url('${bannerUrl}')` } : undefined}
        />
        <div className={`site-container ${styles.roomsHeaderContent}`}>
          <span className="section-subtitle" style={{ color: '#dfc888' }}>
            {displaySubtitle}
          </span>
          <h1 className={styles.pageTitle}>{displayTitle}</h1>
          <p className={styles.pageSubtitle}>
            {displayDesc}
          </p>

          {/* Filter Bar */}
          <div className={styles.filterBar}>
            <button
              className={`${styles.filterBtn} ${selectedCategory === 'all' ? styles.filterBtnActive : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              {dict.filterAll}
            </button>
            <button
              className={`${styles.filterBtn} ${selectedCategory === 'superior' ? styles.filterBtnActive : ''}`}
              onClick={() => setSelectedCategory('superior')}
            >
              Superior Room (22 m²)
            </button>
            <button
              className={`${styles.filterBtn} ${selectedCategory === 'executive' ? styles.filterBtnActive : ''}`}
              onClick={() => setSelectedCategory('executive')}
            >
              Executive Room (33 m²)
            </button>
            <button
              className={`${styles.filterBtn} ${selectedCategory === 'royal-suite' ? styles.filterBtnActive : ''}`}
              onClick={() => setSelectedCategory('royal-suite')}
            >
              Royal Suite Room (54 m²)
            </button>
          </div>
        </div>
      </section>

      {/* Rooms List */}
      <section className={styles.roomsListSection}>
        <div className="site-container">
          {filteredRooms.map((room) => (
            <div key={room.id} className={styles.roomCardDetailed}>
              {/* Image side */}
              <div className={styles.roomCardImageSide}>
                <img src={room.featuredImage} alt={room.name} className={styles.roomCardImg} />
                <span className={styles.cardBadge}>{room.badge}</span>
              </div>

              {/* Information side */}
              <div className={styles.roomCardInfoSide}>
                <div>
                  <div className={styles.roomCardHeader}>
                    <h2 className={styles.roomName}>{room.name}</h2>
                    <p className={styles.roomTagline}>{room.tagline}</p>
                  </div>

                  <div className={styles.specsBar}>
                    <div className={styles.specItem}>
                      <Maximize2 size={16} color="#c5a55a" />
                      <span>{room.size} m²</span>
                    </div>
                    <div className={styles.specItem}>
                      <Bed size={16} color="#c5a55a" />
                      <span>{room.bedType}</span>
                    </div>
                    <div className={styles.specItem}>
                      <Users size={16} color="#c5a55a" />
                      <span>{locale === 'en' ? `Max. ${room.capacity} Adults` : `Maks. ${room.capacity} Dewasa`}</span>
                    </div>
                  </div>

                  <p className={styles.roomDesc}>{room.description}</p>

                  <div className={styles.amenitiesWrap}>
                    {room.amenities.slice(0, 5).map((amenity, idx) => (
                      <span key={idx} className={styles.amenityTag}>
                        {amenity.name}
                      </span>
                    ))}
                    {room.amenities.length > 5 && (
                      <span className={styles.amenityTag} style={{ color: 'var(--color-gold-dark)', fontWeight: 600 }}>
                        {locale === 'en'
                          ? `+${room.amenities.length - 5} More Amenities`
                          : `+${room.amenities.length - 5} Fasilitas Lainnya`}
                      </span>
                    )}
                  </div>
                </div>

                <div className={styles.cardFooterBar}>
                  <div className={styles.priceBlock}>
                    <span className={styles.priceFrom}>{dict.startingFrom}</span>
                    <span className={styles.priceMain}>
                      {formatRupiah(room.discountPrice || room.basePrice)}
                      <span className={styles.pricePeriod}> {dict.perNight}</span>
                    </span>
                  </div>

                  <div className={styles.actionBtns}>
                    <Link href={`/rooms/${room.slug}`} className="btn-luxury-secondary" style={{ padding: '10px 20px', fontSize: '0.84rem' }}>
                      {dict.viewDetail}
                    </Link>
                    <a
                      href="https://be.dip.id/booking/cekrooms?keyid=9de3264a0298106659401228618ea286"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-luxury-primary"
                      style={{ padding: '10px 24px', fontSize: '0.84rem' }}
                    >
                      {dict.bookNow} <ArrowRight size={15} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Hotel Policy Notice Banner */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(197, 165, 90, 0.3)',
              padding: '28px 36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px',
              flexWrap: 'wrap',
              marginTop: '40px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Clock size={28} color="#c5a55a" />
              <div>
                <h4 style={{ fontSize: '1.05rem', color: 'var(--color-primary-dark)', marginBottom: '4px' }}>
                  {dict.checkInOutPolicyTitle}
                </h4>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', margin: 0 }}>
                  {dict.checkInOutPolicyDesc}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <ShieldCheck size={20} color="#2e7d32" />
              <span style={{ fontSize: '0.88rem', color: '#1f2937', fontWeight: 500 }}>
                {dict.bestRateGuarantee}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
