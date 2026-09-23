'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight, BookOpen, Compass } from 'lucide-react'
import type { PostItem } from '@/lib/cmsData'
import type { Locale } from '@/lib/translations'
import styles from './Blog.module.css'

interface BlogClientProps {
  initialPosts: PostItem[]
  locale?: Locale
}

export const BlogClient: React.FC<BlogClientProps> = ({ initialPosts, locale = 'id' }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const isEn = locale === 'en'

  const categories = [
    { id: 'all', label: isEn ? 'All Stories' : 'Semua Artikel' },
    { id: 'travel-guide', label: isEn ? 'Travel Guide' : 'Panduan Wisata' },
    { id: 'news', label: isEn ? 'MICE & Business' : 'MICE & Bisnis' },
    { id: 'wedding-tips', label: isEn ? 'Wedding Tips' : 'Tips Pernikahan' },
    { id: 'culinary', label: isEn ? 'Culinary & Dining' : 'Kuliner & Rasa' },
  ]

  const filteredPosts =
    activeCategory === 'all'
      ? initialPosts
      : initialPosts.filter((post) => post.category === activeCategory)

  return (
    <div className={styles.blogWrapper}>
      {/* Hero Header */}
      <section className={styles.heroSection}>
        <div
          className={styles.heroBg}
          style={{
            backgroundImage:
              "url('https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/bilding-1.jpg.jpeg')",
          }}
        />
        <div className={styles.heroOverlay} />
        <div className={`site-container ${styles.heroContent}`}>
          <span className={styles.heroSubtitle}>
            {isEn ? 'Journal & Resort Stories' : 'Jurnal & Kisah Resor'}
          </span>
          <h1 className={styles.heroTitle}>
            {isEn
              ? 'Inspirations, Destination Guides & Hospitality Stories'
              : 'Inspirasi Wisata, Panduan Bogor & Cerita Keramahan'}
          </h1>
          <p className={styles.heroDesc}>
            {isEn
              ? 'Explore our curated travel itineraries, culinary heritage, event planning tips, and the tranquil charm of Bogor Nirwana Residence.'
              : 'Temukan panduan perjalanan pilihan, eksplorasi kuliner Sunda, tips merencanakan konvensi & pernikahan, serta pesona alam asri Bogor Nirwana Residence.'}
          </p>
        </div>
      </section>

      {/* Category Filter Bar */}
      <div className={styles.filterBar}>
        <div className="site-container">
          <ul className={styles.filterList}>
            {categories.map((cat) => (
              <li key={cat.id}>
                <button
                  className={`${styles.filterBtn} ${activeCategory === cat.id ? styles.filterBtnActive : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Articles Grid */}
      <section className="section-padding">
        <div className="site-container">
          {filteredPosts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#6b7280' }}>
              <BookOpen size={48} style={{ margin: '0 auto 16px', opacity: 0.4 }} />
              <p>{isEn ? 'No articles found in this category.' : 'Belum ada artikel pada kategori ini.'}</p>
            </div>
          ) : (
            <div className={styles.articlesGrid}>
              {filteredPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className={styles.articleCard}>
                  <div className={styles.cardImageWrapper}>
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className={styles.cardImage}
                      loading="lazy"
                    />
                    <span className={styles.categoryBadge}>{post.categoryLabel}</span>
                  </div>
                  <div className={styles.cardBody}>
                    <div className={styles.metaInfo}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={13} />
                        {post.publishedAt}
                      </span>
                      <span>•</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={13} />
                        {post.readTime}
                      </span>
                    </div>
                    <h2 className={styles.cardTitle}>{post.title}</h2>
                    <p className={styles.cardExcerpt}>{post.excerpt}</p>
                    <span className={styles.readMoreLink}>
                      {isEn ? 'Read Article' : 'Baca Selengkapnya'} <ArrowRight size={15} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
