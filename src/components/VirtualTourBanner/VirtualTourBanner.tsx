'use client'

import React, { useState } from 'react'
import { Eye, X, Compass, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react'
import { getDictionary, type Locale } from '@/lib/translations'
import type { GalleryItem } from '@/lib/cmsData'
import styles from './VirtualTourBanner.module.css'

interface VirtualTourBannerProps {
  locale?: Locale
  scenes?: GalleryItem[]
  bannerBgUrl?: string
}

export const VirtualTourBanner: React.FC<VirtualTourBannerProps> = ({
  locale = 'id',
  scenes: cmsScenes,
  bannerBgUrl,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeScene, setActiveScene] = useState(0)
  const dict = getDictionary(locale).virtualTourBanner

  const defaultScenes = [
    {
      title: 'Bale Pakuan Grand Ballroom',
      img: 'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/ballroom-1.jpg.jpeg',
    },
    {
      title: 'Royal Suite Luxury Bedroom',
      img: 'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/royal.jpg.jpeg',
    },
    {
      title: 'Restoran Hegarmanah Open-Air',
      img: 'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/hegarmanah-1.jpg.jpeg',
    },
    {
      title: 'Lobby Lounge & Reception',
      img: 'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/lobby-loung-1.jpg.jpeg',
    },
  ]

  const activeScenes =
    cmsScenes && cmsScenes.length > 0
      ? cmsScenes.map((s) => ({ title: s.title, img: s.imageUrl }))
      : defaultScenes

  const bgImage =
    bannerBgUrl || 'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/sunset-view.jpg.jpeg'

  return (
    <section id="virtual-tour" className={styles.tourBanner}>
      <div
        className={styles.tourBg}
        style={{ backgroundImage: `url('${bgImage}')` }}
      />

      <div className={`site-container ${styles.tourContent}`}>
        <span className="section-subtitle" style={{ color: '#dfc888' }}>
          {dict.subtitle}
        </span>
        <h2 className={styles.tourTitle}>{dict.title}</h2>
        <p className={styles.tourDesc}>
          {dict.desc}
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '12px' }}>
          <button
            onClick={() => setIsOpen(true)}
            className="btn-luxury-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <Eye size={18} />
            {dict.buttonStart}
          </button>
          <a
            href="/virtual-tour"
            className="btn-luxury-secondary"
            style={{ color: '#ffffff', borderColor: 'rgba(255, 255, 255, 0.4)' }}
          >
            <Compass size={18} color="#c5a55a" />
            {locale === 'en' ? 'Full 360° Experience' : 'Halaman Lengkap 360°'}
          </a>
        </div>
      </div>

      {/* Interactive 360 Panoramic Preview Modal */}
      {isOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsOpen(false)}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className={styles.modalHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Compass size={20} color="#c5a55a" />
                <h3 className={styles.modalTitle}>
                  {activeScenes[activeScene]?.title}
                </h3>
              </div>
              <button onClick={() => setIsOpen(false)} className={styles.closeBtn}>
                <X size={20} />
              </button>
            </div>

            {/* Virtual Scene Viewer */}
            <div className={styles.viewerContainer}>
              <img
                src={activeScenes[activeScene]?.img}
                alt={activeScenes[activeScene]?.title}
                className={styles.viewerImg}
              />
              <div className={styles.viewerBadge}>
                <RotateCcw size={14} className={styles.spinIcon} />
                <span>{dict.modalViewBadge}</span>
              </div>
            </div>

            {/* Scene Selector Thumbnails */}
            <div className={styles.sceneSelector}>
              {activeScenes.map((scene, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveScene(idx)}
                  className={`${styles.sceneThumb} ${activeScene === idx ? styles.activeThumb : ''}`}
                >
                  <img src={scene.img} alt={scene.title} />
                  <span>{scene.title}</span>
                </button>
              ))}
            </div>

            {/* Controls */}
            <div className={styles.controlsBar}>
              <button
                onClick={() => setActiveScene((prev) => (prev > 0 ? prev - 1 : activeScenes.length - 1))}
                className={styles.navBtn}
              >
                <ChevronLeft size={18} /> {dict.prevScene}
              </button>
              <span style={{ fontSize: '0.88rem', color: '#9ca3af' }}>
                {activeScene + 1} / {activeScenes.length}
              </span>
              <button
                onClick={() => setActiveScene((prev) => (prev < activeScenes.length - 1 ? prev + 1 : 0))}
                className={styles.navBtn}
              >
                {dict.nextScene} <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
