'use client'

import React, { useState, useEffect } from 'react'
import { MessageCircle, X, ChevronRight } from 'lucide-react'
import styles from './FloatingWhatsApp.module.css'

interface FloatingWhatsAppProps {
  settings?: {
    whatsapp?: string
    whatsappUrl?: string
  }
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ settings }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [whatsapp, setWhatsapp] = useState(settings?.whatsapp || '+62 851 8309 3061')

  useEffect(() => {
    fetch('/api/globals/site-settings')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.whatsapp) {
          setWhatsapp(data.whatsapp)
        }
      })
      .catch(() => {})
  }, [])

  const cleanWa = whatsapp.replace(/[^0-9]/g, '')

  const quickQuestions = [
    {
      label: 'Cek Ketersediaan Kamar Hari Ini',
      message: 'Halo Padjadjaran Suites, saya ingin cek ketersediaan kamar untuk hari ini / akhir pekan.',
    },
    {
      label: 'Paket Wedding di Bale Pakuan',
      message: 'Halo, saya ingin menanyakan brosur dan harga paket pernikahan di Bale Pakuan Ballroom.',
    },
    {
      label: 'Paket Meeting / MICE Kantor',
      message: 'Halo, saya ingin meminta proposal paket meeting corporate di Padjadjaran Suites.',
    },
  ]

  return (
    <div className={styles.waContainer}>
      {isOpen && (
        <div className={styles.chatPopup}>
          <div className={styles.popupHeader}>
            <div>
              <div className={styles.headerTitle}>Padjadjaran Suites Concierge</div>
              <div className={styles.headerSubtitle}>Online • Membalas dalam beberapa menit</div>
            </div>
            <button
              style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer' }}
              onClick={() => setIsOpen(false)}
              aria-label="Tutup Chat"
            >
              <X size={18} />
            </button>
          </div>

          <div className={styles.popupBody}>
            <div className={styles.chatBubble}>
              Halo! Selamat datang di Padjadjaran Suites Resort & Convention. Ada yang bisa kami bantu seputar reservasi kamar atau paket acara hari ini?
            </div>

            <div className={styles.quickOptions}>
              {quickQuestions.map((q, idx) => (
                <a
                  key={idx}
                  href={`https://wa.me/${cleanWa}?text=${encodeURIComponent(q.message)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.quickLink}
                >
                  <span>{q.label}</span>
                  <ChevronRight size={14} color="#9ca3af" />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      <button
        className={styles.waTrigger}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Hubungi Kami di WhatsApp"
      >
        <MessageCircle size={30} />
        <span className={styles.unreadDot} />
      </button>
    </div>
  )
}
