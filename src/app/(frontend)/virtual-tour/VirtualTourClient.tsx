'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Compass, ArrowRight } from 'lucide-react'
import type { GalleryItem } from '@/lib/cmsData'
import type { Locale } from '@/lib/translations'

interface VirtualTourClientProps {
  scenes: GalleryItem[]
  bannerBg?: string
  locale?: Locale
}

export function VirtualTourClient({
  scenes,
  bannerBg,
  locale = 'id',
}: VirtualTourClientProps) {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0)

  // Fallback if scenes is empty
  const safeScenes = scenes && scenes.length > 0 ? scenes : [
    {
      id: '1',
      slug: 'ballroom',
      title: 'Bale Pakuan Grand Ballroom',
      category: 'resort',
      imageUrl: 'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/ballroom-1.jpg.jpeg',
      caption: 'Ballroom & MICE',
      description: 'Gedung konvensi mandiri berkapasitas hingga 1.000 pax dengan langit-langit setinggi 7 meter dan lampu chandelier mewah.',
      isVirtualTour: true,
      order: 1,
    }
  ]

  const currentScene = safeScenes[activeSceneIndex] || safeScenes[0]

  const headerBg =
    bannerBg ||
    'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/ballroom-1.jpg.jpeg'

  return (
    <div>
      {/* Page Header */}
      <section
        style={{
          backgroundColor: 'var(--color-primary-dark)',
          padding: '160px 0 60px',
          color: '#ffffff',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url('${headerBg}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.32)',
          }}
        />
        <div className="site-container" style={{ position: 'relative', zIndex: 2, maxWidth: '820px' }}>
          <span className="section-subtitle" style={{ color: '#dfc888' }}>
            {locale === 'en' ? 'Interactive 360° Space Exploration' : 'Eksplorasi Ruangan Interaktif'}
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', color: '#ffffff', marginBottom: '14px' }}>
            {locale === 'en' ? 'Padjadjaran Suites 360° Virtual Tour' : 'Virtual Tour 360° Padjadjaran Suites'}
          </h1>
          <p style={{ color: '#d1d5db', fontSize: '1.05rem', lineHeight: 1.7 }}>
            {locale === 'en'
              ? 'Experience immersive visual tour to explore grand ballrooms, elegant luxury suites, and five-star resort facilities before your arrival.'
              : 'Nikmati tur panorama visual untuk menjelajahi kemegahan ballroom, keanggunan kamar suite, dan kenyamanan fasilitas resor sebelum kedatangan Anda.'}
          </p>
        </div>
      </section>

      {/* Main Tour Viewer */}
      <section style={{ backgroundColor: '#121417', padding: '0 0 80px', color: '#ffffff' }}>
        <div className="site-container">
          {/* Scene Selector Tabs */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '10px',
              padding: '24px 0',
              flexWrap: 'wrap',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              marginBottom: '24px',
            }}
          >
            {safeScenes.map((s, idx) => {
              const words = s.title.split(' ')
              const label = words.length > 2 ? `${words[0]} ${words[1]}` : s.title

              return (
                <button
                  key={s.id || idx}
                  onClick={() => setActiveSceneIndex(idx)}
                  style={{
                    background: activeSceneIndex === idx ? 'var(--color-gold)' : 'rgba(255, 255, 255, 0.08)',
                    color: activeSceneIndex === idx ? '#121417' : '#ffffff',
                    fontWeight: activeSceneIndex === idx ? 600 : 400,
                    border: '1px solid',
                    borderColor: activeSceneIndex === idx ? 'var(--color-gold)' : 'rgba(255, 255, 255, 0.15)',
                    padding: '8px 18px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.84rem',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                  }}
                >
                  {label}
                </button>
              )
            })}
          </div>

          {/* Interactive Screen */}
          <div
            style={{
              position: 'relative',
              height: 'clamp(420px, 60vh, 580px)',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              border: '1px solid rgba(197, 165, 90, 0.4)',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.6)',
              background: '#000000',
            }}
          >
            <img
              src={currentScene.imageUrl}
              alt={currentScene.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />

            {/* Compass badge on top left */}
            <div
              style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                background: 'rgba(18, 20, 23, 0.88)',
                backdropFilter: 'blur(8px)',
                padding: '8px 16px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid rgba(197, 165, 90, 0.4)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Compass size={18} color="#c5a55a" />
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-gold)' }}>
                360° Panorama View
              </span>
            </div>

            {/* Bottom info overlay */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(0deg, rgba(18, 20, 23, 0.95) 0%, transparent 100%)',
                padding: '32px 20px 20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                flexWrap: 'wrap',
                gap: '16px',
              }}
            >
              <div>
                <span style={{ color: 'var(--color-gold)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {currentScene.caption || currentScene.category}
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#ffffff', marginTop: '4px' }}>
                  {currentScene.title}
                </h3>
                <p style={{ color: '#d1d5db', fontSize: '0.92rem', maxWidth: '640px', marginTop: '6px' }}>
                  {currentScene.description}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <Link href="/rooms" className="btn-luxury-primary" style={{ padding: '10px 22px', fontSize: '0.84rem' }}>
                  {locale === 'en' ? 'Book This Room' : 'Pesan Kamar Ini'} <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
