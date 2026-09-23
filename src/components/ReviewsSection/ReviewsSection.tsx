import React from 'react'
import { Star, CheckCircle } from 'lucide-react'
import { getReviewsData } from '@/lib/cmsData'
import { getDictionary, type Locale } from '@/lib/translations'
import styles from './ReviewsSection.module.css'

interface ReviewsSectionProps {
  locale?: Locale
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = async ({ locale = 'id' }) => {
  const testimonials = await getReviewsData(locale)
  const dict = getDictionary(locale).reviewsSection

  return (
    <section id="reviews" className="section-padding site-container">
      <div className="section-header-center">
        <span className="section-subtitle">{dict.subtitle}</span>
        <h2 className="section-title">{dict.title}</h2>
        <p className="section-desc">
          {dict.desc}
        </p>
      </div>

      <div className={styles.reviewsGrid}>
        {testimonials.map((t, idx) => (
          <div key={idx} className={styles.reviewCard}>
            <div className={styles.starsRow}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="#c5a55a" color="#c5a55a" />
              ))}
            </div>

            <p className={styles.reviewQuote}>"{t.quote}"</p>

            <div className={styles.authorBlock}>
              <div>
                <h4 className={styles.authorName}>{t.name}</h4>
                <span className={styles.stayInfo}>{t.stay}</span>
              </div>
              <span className={styles.reviewSource}>{t.source}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
