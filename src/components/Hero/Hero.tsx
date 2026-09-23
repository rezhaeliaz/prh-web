import React from 'react'
import { Sparkles, Compass, Eye, Mountain, UtensilsCrossed, CalendarCheck, Award } from 'lucide-react'
import { getDictionary, type Locale } from '@/lib/translations'
import type { HomePageData } from '@/lib/cmsData'
import { WeatherWidget } from '@/components/WeatherWidget/WeatherWidget'
import styles from './Hero.module.css'

interface HeroProps {
  locale?: Locale
  data?: HomePageData['hero']
}

export const Hero: React.FC<HeroProps> = ({ locale = 'id', data }) => {
  const dict = getDictionary(locale).hero

  const badge = data?.badge || dict.badge
  const titleLine1 = data?.titleLine1 || dict.titleLine1
  const titleAccent = data?.titleAccent || dict.titleAccent
  const titleLine2 = data?.titleLine2 || dict.titleLine2
  const subtitle = data?.subtitle || dict.subtitle
  const bgImage = data?.backgroundImageUrl || 'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/bilding-1.jpg.jpeg'
  const exploreRoomsText = data?.exploreRoomsText || dict.exploreRooms
  const virtualTourText = data?.virtualTourText || dict.virtualTour

  const defaultFeatures = [
    { title: dict.feature1, icon: 'mountain' },
    { title: dict.feature2, icon: 'calendar' },
    { title: dict.feature3, icon: 'dining' },
  ]
  const features = data?.features && data?.features.length > 0 ? data.features : defaultFeatures

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'calendar':
        return <CalendarCheck size={16} color="#c5a55a" />
      case 'dining':
        return <UtensilsCrossed size={16} color="#c5a55a" />
      case 'sparkle':
        return <Award size={16} color="#c5a55a" />
      case 'mountain':
      default:
        return <Mountain size={16} color="#c5a55a" />
    }
  }

  return (
    <section className={styles.heroWrapper}>
      {/* Background with luxury gradient overlay (Dynamic from CMS) */}
      <div
        className={styles.heroBg}
        style={{ backgroundImage: `url('${bgImage}')` }}
      />
      <div className={styles.heroOverlay} />

      <div className={`site-container ${styles.heroContent}`}>
        {/* Live Weather & Mount Salak View Widget */}
        <WeatherWidget locale={locale} />

        {/* Luxury Badge */}
        <div className={styles.luxuryBadge}>
          <Sparkles size={14} color="#dfc888" />
          <span>{badge}</span>
        </div>

        {/* Hero Title */}
        <h1 className={styles.heroTitle}>
          {titleLine1} <br />
          <span className={styles.heroTitleAccent}>{titleAccent}</span> {titleLine2}
        </h1>

        {/* Hero Subtitle */}
        <p className={styles.heroSubtitle}>
          {subtitle}
        </p>

        {/* Actions */}
        <div className={styles.heroActions}>
          <a href="#rooms" className="btn-luxury-primary">
            <Compass size={18} />
            {exploreRoomsText}
          </a>
          <a
            href="#virtual-tour"
            className="btn-luxury-secondary"
            style={{ color: '#ffffff', borderColor: 'rgba(255, 255, 255, 0.4)' }}
          >
            <Eye size={18} color="#c5a55a" />
            {virtualTourText}
          </a>
        </div>

        {/* Value Propositions Strip */}
        <div className={styles.featuresStrip}>
          {features.map((feat, idx) => (
            <div key={idx} className={styles.featureItem}>
              {renderIcon(feat.icon)}
              <span>{feat.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
