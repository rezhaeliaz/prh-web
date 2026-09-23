import React from 'react'
import Link from 'next/link'
import { Maximize2, Users, Bed, ArrowRight } from 'lucide-react'
import { getRoomsData } from '@/lib/cmsData'
import { getDictionary, type Locale } from '@/lib/translations'
import styles from './RoomsSection.module.css'

interface RoomsSectionProps {
  locale?: Locale
  sectionHeader?: {
    subtitle?: string
    title?: string
    desc?: string
  }
}

export const RoomsSection: React.FC<RoomsSectionProps> = async ({ locale = 'id', sectionHeader }) => {
  const rooms = await getRoomsData(locale)
  const dict = getDictionary(locale).roomsSection

  const subtitle = sectionHeader?.subtitle || dict.subtitle
  const title = sectionHeader?.title || dict.title
  const desc = sectionHeader?.desc || dict.desc

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val)
  }

  return (
    <section id="rooms" className={`section-padding site-container`}>
      <div className="section-header-center">
        <span className="section-subtitle">{subtitle}</span>
        <h2 className="section-title">{title}</h2>
        <p className="section-desc">{desc}</p>
      </div>

      <div className={styles.roomsGrid}>
        {rooms.map((room) => (
          <div key={room.slug} className={styles.roomCard}>
            <Link href={`/rooms/${room.slug}`} className={styles.imageWrapper}>
              <img src={room.featuredImage} alt={room.name} className={styles.roomImg} />
              <span className={styles.roomBadge}>{room.badge}</span>
            </Link>

            <div className={styles.cardBody}>
              <Link href={`/rooms/${room.slug}`} style={{ textDecoration: 'none' }}>
                <h3 className={styles.roomTitle}>{room.name}</h3>
              </Link>

              <div className={styles.roomSpecs}>
                <div className={styles.specItem}>
                  <Maximize2 size={14} color="#c5a55a" />
                  <span>{room.size} m²</span>
                </div>
                <div className={styles.specItem}>
                  <Bed size={14} color="#c5a55a" />
                  <span>{room.bedType}</span>
                </div>
                <div className={styles.specItem}>
                  <Users size={14} color="#c5a55a" />
                  <span>{locale === 'en' ? `Max. ${room.capacity} Guests` : `Maks. ${room.capacity} Tamu`}</span>
                </div>
              </div>

              <p className={styles.roomDesc}>{room.tagline || room.description}</p>

              <div className={styles.amenitiesList}>
                {room.amenities.slice(0, 4).map((item, i) => (
                  <span key={i} className={styles.amenityTag}>
                    {item.name}
                  </span>
                ))}
              </div>

              <div className={styles.cardFooter}>
                <div className={styles.priceBlock}>
                  <span className={styles.priceLabel}>{dict.startingFrom}</span>
                  <span className={styles.priceVal}>
                    {formatRupiah(room.discountPrice || room.basePrice)}
                    <span className={styles.priceUnit}> {dict.perNight}</span>
                  </span>
                </div>

                <a
                  href="https://be.dip.id/booking/cekrooms?keyid=9de3264a0298106659401228618ea286"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-luxury-primary"
                  style={{ padding: '8px 18px', fontSize: '0.8rem' }}
                >
                  {locale === 'en' ? 'Book' : 'Pesan'} <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <Link href="/rooms" className="btn-luxury-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          {dict.allRoomsBtn} <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  )
}
