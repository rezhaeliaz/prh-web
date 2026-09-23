import React from 'react'
import { Users, HeartHandshake, Cake, ArrowRight, MessageSquareQuote } from 'lucide-react'
import { getEventsData, getSiteSettingsData } from '@/lib/cmsData'
import { getDictionary, type Locale } from '@/lib/translations'
import styles from './EventsSection.module.css'

interface EventsSectionProps {
  locale?: Locale
  sectionHeader?: {
    subtitle?: string
    title?: string
    desc?: string
  }
}

export const EventsSection: React.FC<EventsSectionProps> = async ({ locale = 'id', sectionHeader }) => {
  const [events, settings] = await Promise.all([
    getEventsData(locale),
    getSiteSettingsData(locale),
  ])
  const dict = getDictionary(locale).eventsSection
  const cleanWa = settings.whatsapp.replace(/[^0-9]/g, '')

  const ballroom = events.find((e) => e.type === 'Grand Ballroom' || e.slug.includes('ballroom')) || events[0]

  const subtitle = sectionHeader?.subtitle || dict.subtitle
  const title = sectionHeader?.title || ballroom?.name || dict.titleFallback
  const desc = sectionHeader?.desc || dict.desc

  return (
    <section id="events" className={`${styles.eventsSection} section-padding`}>
      <div className="site-container">
        <div className="section-header-center">
          <span className="section-subtitle">{subtitle}</span>
          <h2 className="section-title" style={{ color: '#ffffff' }}>
            {title}
          </h2>
          <p className="section-desc" style={{ color: '#9ca3af' }}>
            {desc}
          </p>
        </div>

        <div className={styles.eventsGrid}>
          {/* Ballroom Visual Showcase */}
          <div className={styles.ballroomShowcase}>
            <img
              src={ballroom?.featuredImage || 'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/ballroom-1.jpg.jpeg'}
              alt={ballroom?.name || 'Bale Pakuan Grand Ballroom Padjadjaran Suites'}
              className={styles.showcaseImg}
            />
            <span className={styles.showcaseBadge}>
              {locale === 'en'
                ? `Capacity up to ${ballroom?.capacityMax || 1000} Guests`
                : `Kapasitas s/d ${ballroom?.capacityMax || 1000} Tamu`}
            </span>
            <div className={styles.showcaseFooter}>
              <h3 className={styles.showcaseTitle}>{ballroom?.name || 'Bale Pakuan Grand Ballroom'}</h3>
              <p className={styles.showcaseSubtitle}>
                {ballroom?.tagline ||
                  (locale === 'en'
                    ? 'Standalone pillarless grand ballroom with high ceilings, crystal chandeliers, and integrated AV system.'
                    : 'Gedung ballroom independen dengan langit-langit megah, tata lampu chandelier mewah, dan sistem audio-visual terintegrasi.')}
              </p>
            </div>
          </div>

          {/* Event Offerings List */}
          <div className={styles.eventsList}>
            {/* Wedding */}
            <div className={styles.eventItem}>
              <div className={styles.itemHeader}>
                <HeartHandshake size={22} color="#dfc888" />
                <h4 className={styles.itemTitle}>{dict.weddingTitle}</h4>
              </div>
              <p className={styles.itemDesc}>
                {dict.weddingDesc}
              </p>
            </div>

            {/* Corporate & Meeting */}
            <div className={styles.eventItem}>
              <div className={styles.itemHeader}>
                <Users size={22} color="#dfc888" />
                <h4 className={styles.itemTitle}>{dict.corporateTitle}</h4>
              </div>
              <p className={styles.itemDesc}>
                {dict.corporateDesc}
              </p>
            </div>

            {/* Social & Birthday */}
            <div className={styles.eventItem}>
              <div className={styles.itemHeader}>
                <Cake size={22} color="#dfc888" />
                <h4 className={styles.itemTitle}>{dict.socialTitle}</h4>
              </div>
              <p className={styles.itemDesc}>
                {dict.socialDesc}
              </p>
            </div>

            <div style={{ marginTop: '16px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a
                href="/events"
                className="btn-luxury-outline"
                style={{ flex: 1, textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
              >
                {dict.viewFloorplan} <ArrowRight size={16} />
              </a>
              <a
                href={`https://wa.me/${cleanWa}?text=${encodeURIComponent(
                  locale === 'en'
                    ? 'Hello Padjadjaran Suites Events team, I would like to consult about event/meeting/wedding packages'
                    : 'Halo tim Event Padjadjaran Suites, saya ingin konsultasi paket acara/meeting/wedding'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-luxury-primary"
                style={{ flex: 1, textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
              >
                <MessageSquareQuote size={18} />
                {dict.consultWa}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
