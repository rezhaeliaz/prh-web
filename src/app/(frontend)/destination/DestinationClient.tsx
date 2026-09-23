'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  MapPin,
  Clock,
  Compass,
  CheckCircle2,
  ExternalLink,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react'
import { DestinationItem, CuratedItinerary } from '@/data/destinationsData'
import type { Locale } from '@/lib/translations'
import styles from './destination.module.css'

interface DestinationClientProps {
  destinations: DestinationItem[]
  itineraries: CuratedItinerary[]
  locale: Locale
}

export function DestinationClient({ destinations, itineraries, locale }: DestinationClientProps) {
  const isEn = locale === 'en'
  const [activeTab, setActiveTab] = useState<'destinations' | 'itineraries'>('destinations')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = [
    { id: 'all', label: isEn ? 'All Highlights' : 'Semua Destinasi' },
    { id: 'waterpark', label: isEn ? 'Water & Family' : 'Wahana Air & Keluarga' },
    { id: 'nature', label: isEn ? 'Nature & Offroad' : 'Alam & Offroad 4x4' },
    { id: 'heritage', label: isEn ? 'Botanical & Heritage' : 'Warisan & Botani' },
    { id: 'culinary', label: isEn ? 'Heritage Culinary' : 'Kuliner Legendaris' },
    { id: 'golf', label: isEn ? 'Championship Golf' : 'Olahraga Golf' },
  ]

  const filteredDestinations =
    selectedCategory === 'all'
      ? destinations
      : destinations.filter((d) => d.category === selectedCategory)

  return (
    <div className={styles.pageWrapper}>
      {/* Header Banner */}
      <section className={styles.headerSection}>
        <div className={styles.headerBg} />
        <div className={`site-container ${styles.headerInner}`}>
          <span className={styles.headerSubtitle}>
            {isEn ? 'Bogor Curated Destinations' : 'Eksplorasi Destinasi Terbaik'}
          </span>
          <h1 className={styles.headerTitle}>
            {isEn ? 'Explore Bogor & Serene Mountain Wonders' : 'Pesona Wisata & Destinasi Sekitar Resor'}
          </h1>
          <p className={styles.headerDesc}>
            {isEn
              ? 'Immerse yourself in world-renowned botanical gardens, legendary culinary streets, thrilling Mount Salak offroad trails, and family water attractions located just minutes from Padjadjaran Suites Resort.'
              : 'Jelajahi keajaiban Kebun Raya tertua di Asia Tenggara, petualangan offroad 4x4 kaki Gunung Salak, koridor kuliner legendaris Surya Kencana, dan wahana The Jungle BNR hanya selangkah dari hotel.'}
          </p>
        </div>
      </section>

      {/* Main Switcher: Destinations vs Curated Itineraries */}
      <div className="site-container">
        <div className={styles.mainTabNav}>
          <button
            className={`${styles.mainTabBtn} ${activeTab === 'destinations' ? styles.mainTabBtnActive : ''}`}
            onClick={() => setActiveTab('destinations')}
          >
            <Compass size={18} />
            {isEn ? 'Popular Destinations (Within 30 Mins)' : 'Destinasi Sekitar Resor (< 30 Mnt)'}
          </button>
          <button
            className={`${styles.mainTabBtn} ${activeTab === 'itineraries' ? styles.mainTabBtnActive : ''}`}
            onClick={() => setActiveTab('itineraries')}
          >
            <Calendar size={18} />
            {isEn ? 'Curated 2D1N Itineraries' : 'Rencana Perjalanan Rekomendasi (2H1M)'}
          </button>
        </div>

        {/* View 1: Destinations */}
        {activeTab === 'destinations' && (
          <div>
            {/* Filter Pills */}
            <div className={styles.filterBar}>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`${styles.filterBtn} ${selectedCategory === cat.id ? styles.filterBtnActive : ''}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Destinations Grid */}
            <div className={styles.destinationsGrid}>
              {filteredDestinations.map((item) => (
                <div key={item.id} className={styles.card}>
                  <div className={styles.imageWrapper}>
                    <img src={item.imageUrl} alt={item.name} className={styles.cardImg} />
                    <span className={styles.categoryTag}>{item.categoryLabel}</span>
                    <div className={styles.distanceBadge}>
                      <MapPin size={14} />
                      <span>{item.distance} • {item.travelTime}</span>
                    </div>
                  </div>

                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>{item.name}</h3>
                    <p className={styles.cardTagline}>{item.tagline}</p>
                    <p className={styles.cardDesc}>{item.description}</p>

                    <ul className={styles.highlightsList}>
                      {item.highlights.map((hl, idx) => (
                        <li key={idx} className={styles.highlightItem}>
                          <CheckCircle2 size={15} color="#c5a55a" style={{ flexShrink: 0 }} />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>

                    <div className={styles.cardFooter}>
                      <span style={{ fontSize: '0.8rem', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Sparkles size={13} color="#c5a55a" /> {item.recommendedFor}
                      </span>
                      {(() => {
                        const mapsHref =
                          item.googleMapsUrl &&
                          item.googleMapsUrl.trim().length > 0 &&
                          !item.googleMapsUrl.includes('k98t6nQ2k9xK3Rsm6') &&
                          !item.googleMapsUrl.includes('K6tZ3Qx5mP8C4p7i7') &&
                          !item.googleMapsUrl.includes('9QZJ2s6K5T7s8bX59') &&
                          !item.googleMapsUrl.includes('6z5YVn1B4w9U3m2L7') &&
                          !item.googleMapsUrl.includes('m3P8C4x5kP7s9R2B8')
                            ? item.googleMapsUrl
                            : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.name + ' Bogor')}`

                        return (
                          <a
                            href={mapsHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.mapLink}
                          >
                            {isEn ? 'Google Maps' : 'Peta Arah'} <ExternalLink size={14} />
                          </a>
                        )
                      })()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* View 2: Curated Itineraries */}
        {activeTab === 'itineraries' && (
          <div>
            {itineraries.map((itn) => (
              <div key={itn.id} className={styles.itineraryCard}>
                <div className={styles.itineraryHeader}>
                  <div>
                    <span style={{ color: 'var(--color-gold-dark)', fontSize: '0.82rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      {itn.targetAudience}
                    </span>
                    <h2 className={styles.itineraryTitle}>{itn.title}</h2>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', marginTop: '6px', maxWidth: '720px' }}>
                      {itn.description}
                    </p>
                  </div>
                  <span className={styles.itineraryBadge}>{itn.duration}</span>
                </div>

                <div className={styles.dayTimeline}>
                  {itn.days.map((d) => (
                    <div key={d.day} className={styles.dayBlock}>
                      <h4 className={styles.dayTitle}>
                        {isEn ? `Day ${d.day}: ` : `Hari ke-${d.day}: `} {d.title}
                      </h4>

                      <div className={styles.activityList}>
                        {d.activities.map((act, actIdx) => (
                          <div key={actIdx} className={styles.activityItem}>
                            <div className={styles.activityTime}>{act.time}</div>
                            <div className={styles.activityContent}>
                              <h5>{act.title}</h5>
                              <p>{act.desc}</p>
                              <span style={{ fontSize: '0.78rem', color: '#6b7280', display: 'inline-block', marginTop: '4px' }}>
                                📍 {act.location}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                  <Link href="/booking" className="btn-luxury-primary" style={{ padding: '12px 26px', fontSize: '0.9rem' }}>
                    {isEn ? 'Book Stay for This Itinerary' : 'Pesan Kamar untuk Paket Perjalanan Ini'} <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
