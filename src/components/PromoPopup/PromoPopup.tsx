'use client'

import React, { useState, useEffect } from 'react'
import { X, Sparkles, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import styles from './PromoPopup.module.css'

export interface PromoPopupProps {
  popup?: {
    isEnabled: boolean
    title: string
    content: string
    imageUrl: string | null
    buttonText: string
    buttonLink: string
  }
}

export const PromoPopup: React.FC<PromoPopupProps> = ({ popup }) => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!popup?.isEnabled) return

    // Check if dismissed in this session
    const isDismissed = sessionStorage.getItem('prh_promo_dismissed')
    if (!isDismissed) {
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 1800)
      return () => clearTimeout(timer)
    }
  }, [popup?.isEnabled])

  const handleClose = () => {
    setIsOpen(false)
    sessionStorage.setItem('prh_promo_dismissed', 'true')
  }

  if (!isOpen || !popup?.isEnabled) return null

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={handleClose} aria-label="Tutup Promo">
          <X size={20} />
        </button>

        {popup.imageUrl && (
          <div className={styles.imageWrapper}>
            <img src={popup.imageUrl} alt={popup.title} className={styles.image} />
          </div>
        )}

        <div className={styles.content}>
          <div className={styles.badge}>
            <Sparkles size={14} color="#dfc888" />
            <span>Penawaran Khusus</span>
          </div>

          <h3 className={styles.title}>{popup.title}</h3>

          {popup.content && <p className={styles.text}>{popup.content}</p>}

          <div className={styles.actions}>
            {popup.buttonLink ? (
              <Link href={popup.buttonLink} className="btn-luxury-primary" onClick={handleClose}>
                {popup.buttonText || 'Pelajari Selengkapnya'} <ArrowRight size={16} />
              </Link>
            ) : (
              <button className="btn-luxury-primary" onClick={handleClose}>
                {popup.buttonText || 'Mengerti'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
