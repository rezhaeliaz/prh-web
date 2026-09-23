'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Maximize2, X, ChevronLeft, ChevronRight, Camera, Sparkles } from 'lucide-react'
import type { GalleryItem } from '@/data/hotelData'
import type { Locale } from '@/lib/translations'
import styles from './Gallery.module.css'

interface GalleryClientProps {
  initialPhotos: GalleryItem[]
  locale?: Locale
}

export const GalleryClient: React.FC<GalleryClientProps> = ({ initialPhotos, locale = 'id' }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const isEn = locale === 'en'

  const categories = [
    { id: 'all', label: isEn ? 'All Photos' : 'Semua Foto' },
    { id: 'rooms', label: isEn ? 'Rooms & Suites' : 'Kamar & Suites' },
    { id: 'dining', label: isEn ? 'Dining & Restaurants' : 'Restoran & Kuliner' },
    { id: 'events', label: isEn ? 'Ballroom & Meetings' : 'Ballroom & Pertemuan' },
    { id: 'facilities', label: isEn ? 'Pool & Facilities' : 'Fasilitas & Kolam' },
    { id: 'resort', label: isEn ? 'Resort Ambiance' : 'Suasana & Lanskap' },
  ]

  const filteredPhotos =
    activeCategory === 'all'
      ? initialPhotos
      : initialPhotos.filter((p) => p.category === activeCategory)

  // Keyboard navigation for lightbox
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (lightboxIndex === null) return
      if (e.key === 'Escape') setLightboxIndex(null)
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev !== null ? (prev + 1) % filteredPhotos.length : 0
        )
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev !== null
            ? (prev - 1 + filteredPhotos.length) % filteredPhotos.length
            : 0
        )
      }
    },
    [lightboxIndex, filteredPhotos.length]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  const openLightbox = (idx: number) => setLightboxIndex(idx)
  const closeLightbox = () => setLightboxIndex(null)

  const activePhoto = lightboxIndex !== null ? filteredPhotos[lightboxIndex] : null

  return (
    <div className={styles.galleryWrapper}>
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
            {isEn ? 'Visual Showcase' : 'Galeri Visual'}
          </span>
          <h1 className={styles.heroTitle}>
            {isEn
              ? 'A Glimpse into Five-Star Mountain Serenity'
              : 'Pesona Resor Bintang 5 Berlatar Gunung Salak'}
          </h1>
          <p className={styles.heroDesc}>
            {isEn
              ? 'Explore our elegant suites, grand ballrooms, tranquil swimming pool, and authentic dining spaces captured in high-definition.'
              : 'Jelajahi keanggunan kamar & suite, kemegahan gedung konvensi Bale Pakuan, kolam renang bernuansa alam, dan sajian kuliner istimewa.'}
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
                  onClick={() => {
                    setActiveCategory(cat.id)
                    setLightboxIndex(null)
                  }}
                >
                  {cat.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Gallery Grid */}
      <section className="section-padding">
        <div className="site-container">
          <div className={styles.galleryGrid}>
            {filteredPhotos.map((photo, idx) => (
              <div
                key={photo.id || idx}
                className={styles.photoCard}
                onClick={() => openLightbox(idx)}
              >
                <img src={photo.imageUrl} alt={photo.title} className={styles.photoImg} loading="lazy" />
                <div className={styles.photoOverlay}>
                  <span className={styles.photoCategory}>
                    {categories.find((c) => c.id === photo.category)?.label || photo.category}
                  </span>
                  <h3 className={styles.photoTitle}>{photo.title}</h3>
                  {photo.caption && <p className={styles.photoCaption}>{photo.caption}</p>}
                </div>
                <div className={styles.zoomHint} title={isEn ? 'Click to zoom' : 'Klik untuk perbesar'}>
                  <Maximize2 size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && activePhoto && (
        <div className={styles.lightboxModal} onClick={closeLightbox}>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={closeLightbox}>
              <X size={20} /> {isEn ? 'Close (Esc)' : 'Tutup (Esc)'}
            </button>

            <button
              className={`${styles.navArrowBtn} ${styles.prevArrow}`}
              onClick={() =>
                setLightboxIndex(
                  (lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length
                )
              }
              aria-label="Previous Photo"
            >
              <ChevronLeft size={24} />
            </button>

            <div className={styles.lightboxImageWrapper}>
              <img
                src={activePhoto.imageUrl}
                alt={activePhoto.title}
                className={styles.lightboxImg}
              />
            </div>

            <button
              className={`${styles.navArrowBtn} ${styles.nextArrow}`}
              onClick={() =>
                setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length)
              }
              aria-label="Next Photo"
            >
              <ChevronRight size={24} />
            </button>

            <div className={styles.lightboxFooter}>
              <div>
                <h3 className={styles.lightboxTitle}>{activePhoto.title}</h3>
                {activePhoto.caption && (
                  <p className={styles.lightboxCaption}>{activePhoto.caption}</p>
                )}
              </div>
              <span className={styles.lightboxCounter}>
                {lightboxIndex + 1} / {filteredPhotos.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
