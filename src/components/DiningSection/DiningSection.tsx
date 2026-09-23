import React from 'react'
import { Clock, ArrowRight } from 'lucide-react'
import { getDiningData, getSiteSettingsData } from '@/lib/cmsData'
import { getDictionary, type Locale } from '@/lib/translations'
import styles from './DiningSection.module.css'

interface DiningSectionProps {
  locale?: Locale
  sectionHeader?: {
    subtitle?: string
    title?: string
    desc?: string
  }
}

export const DiningSection: React.FC<DiningSectionProps> = async ({ locale = 'id', sectionHeader }) => {
  const [venues, settings] = await Promise.all([
    getDiningData(locale),
    getSiteSettingsData(locale),
  ])
  const dict = getDictionary(locale).diningSection
  const cleanWa = settings.whatsapp.replace(/[^0-9]/g, '')

  const subtitle = sectionHeader?.subtitle || dict.subtitle
  const title = sectionHeader?.title || dict.title
  const desc = sectionHeader?.desc || dict.desc

  return (
    <section id="dining" className={`${styles.diningWrapper} section-padding`}>
      <div className="site-container">
        <div className="section-header-center">
          <span className="section-subtitle">{subtitle}</span>
          <h2 className="section-title">{title}</h2>
          <p className="section-desc">{desc}</p>
        </div>

        <div className={styles.diningGrid}>
          {venues.map((venue, idx) => (
            <div key={idx} className={styles.diningCard}>
              <div className={styles.imageBox}>
                <img src={venue.featuredImage} alt={venue.name} className={styles.diningImg} />
                <span className={styles.diningType}>{venue.type}</span>
              </div>

              <div className={styles.diningBody}>
                <h3 className={styles.diningTitle}>{venue.name}</h3>
                <div className={styles.diningHours}>
                  <Clock size={14} />
                  <span>{venue.openingHours}</span>
                </div>
                <p className={styles.diningDesc}>{venue.tagline || venue.description}</p>
                <a
                  href={`https://wa.me/${cleanWa}?text=${encodeURIComponent(
                    locale === 'en'
                      ? `Hello Padjadjaran Suites, I would like to reserve a table at ${venue.name}`
                      : `Halo Padjadjaran Suites, saya ingin reservasi meja di ${venue.name}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-luxury-ghost"
                >
                  {dict.reserveTable} <ArrowRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <a href="/dining" className="btn-luxury-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            {dict.moreVenuesBtn} <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  )
}
