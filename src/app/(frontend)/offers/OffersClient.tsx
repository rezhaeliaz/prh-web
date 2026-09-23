'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  ShieldCheck,
  Clock,
  Sparkles,
  CalendarCheck,
  CheckCircle2,
  Calendar,
  MessageCircle,
  X,
  FileText,
  ArrowRight,
} from 'lucide-react'
import { OfferItem } from '@/data/hotelData'
import type { Locale } from '@/lib/translations'
import { getDictionary } from '@/lib/translations'
import styles from './offers.module.css'

interface OffersClientProps {
  initialOffers: OfferItem[]
  locale: Locale
  settings?: {
    whatsapp?: string
  }
}

export function OffersClient({ initialOffers, locale, settings }: OffersClientProps) {
  const t = getDictionary(locale).offersPage
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [activeTermsOffer, setActiveTermsOffer] = useState<OfferItem | null>(null)

  const cleanWa = (settings?.whatsapp || '+62 851 8309 3061').replace(/[^0-9]/g, '')

  const categories = [
    { id: 'all', label: t.tabAll },
    { id: 'stay', label: t.tabStay },
    { id: 'dining', label: t.tabDining },
    { id: 'adventure', label: t.tabAdventure },
    { id: 'events', label: t.tabEvents },
    { id: 'meeting', label: t.tabMeeting },
  ]

  const filteredOffers =
    selectedCategory === 'all'
      ? initialOffers
      : initialOffers.filter((offer) => offer.category === selectedCategory)

  return (
    <div className={styles.pageWrapper}>
      {/* Header Section */}
      <section className={styles.headerSection}>
        <div className={`site-container ${styles.headerInner}`}>
          <span className={styles.headerSubtitle}>{t.subtitle}</span>
          <h1 className={styles.headerTitle}>{t.title}</h1>
          <p className={styles.headerDesc}>{t.desc}</p>
        </div>
      </section>

      {/* Guarantee / Trust Bar */}
      <section className={styles.guaranteeSection}>
        <div className="site-container">
          <div className={styles.guaranteeGrid}>
            <div className={styles.guaranteeItem}>
              <div className={styles.guaranteeIcon}>
                <ShieldCheck size={24} />
              </div>
              <div>
                <div className={styles.guaranteeTitle}>{t.guarantee1Title}</div>
                <div className={styles.guaranteeDesc}>{t.guarantee1Desc}</div>
              </div>
            </div>

            <div className={styles.guaranteeItem}>
              <div className={styles.guaranteeIcon}>
                <Clock size={24} />
              </div>
              <div>
                <div className={styles.guaranteeTitle}>{t.guarantee2Title}</div>
                <div className={styles.guaranteeDesc}>{t.guarantee2Desc}</div>
              </div>
            </div>

            <div className={styles.guaranteeItem}>
              <div className={styles.guaranteeIcon}>
                <Sparkles size={24} />
              </div>
              <div>
                <div className={styles.guaranteeTitle}>{t.guarantee3Title}</div>
                <div className={styles.guaranteeDesc}>{t.guarantee3Desc}</div>
              </div>
            </div>

            <div className={styles.guaranteeItem}>
              <div className={styles.guaranteeIcon}>
                <CalendarCheck size={24} />
              </div>
              <div>
                <div className={styles.guaranteeTitle}>{t.guarantee4Title}</div>
                <div className={styles.guaranteeDesc}>{t.guarantee4Desc}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Offers Catalog Section */}
      <section style={{ padding: '20px 0 60px' }}>
        <div className="site-container">
          {/* Category Filter Tabs */}
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

          {/* Offers Grid */}
          <div className={styles.offersGrid}>
            {filteredOffers.map((offer) => {
              const waUrl =
                offer.ctaType === 'whatsapp' && offer.ctaLink.startsWith('https://wa.me/')
                  ? offer.ctaLink
                  : `https://wa.me/${cleanWa}?text=${encodeURIComponent(
                      locale === 'en'
                        ? `Hello Padjadjaran Suites, I am inquiring about the offer: "${offer.title}"`
                        : `Halo Padjadjaran Suites, saya ingin konsultasi mengenai promo: "${offer.title}"`
                    )}`

              return (
                <div key={offer.id} className={styles.offerCard}>
                  <div className={styles.imageContainer}>
                    <img
                      src={offer.featuredImage}
                      alt={offer.title}
                      className={styles.cardImg}
                      loading="lazy"
                    />
                    {offer.discountBadge && (
                      <span className={styles.badge}>{offer.discountBadge}</span>
                    )}
                  </div>

                  <div className={styles.cardBody}>
                    <span className={styles.categoryTag}>{offer.categoryLabel}</span>
                    <h3 className={styles.cardTitle}>{offer.title}</h3>
                    <div className={styles.priceTag}>{offer.price}</div>
                    <p className={styles.cardDesc}>{offer.shortDescription}</p>

                    {/* Inclusions Highlights */}
                    {offer.inclusions && offer.inclusions.length > 0 && (
                      <div className={styles.inclusionsBox}>
                        <div className={styles.inclusionsHeader}>{t.inclusionsTitle}</div>
                        <ul className={styles.inclusionsList}>
                          {offer.inclusions.slice(0, 4).map((inc, i) => (
                            <li key={i} className={styles.inclusionItem}>
                              <CheckCircle2 size={15} color="#c5a55a" style={{ flexShrink: 0, marginTop: '2px' }} />
                              <span>{inc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Validity Period */}
                    <div className={styles.validityRow}>
                      <Calendar size={14} />
                      <span>{t.validUntil} {offer.validUntil}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className={styles.cardActions}>
                      <div className={styles.btnActionGroup}>
                        {offer.ctaType === 'whatsapp' ? (
                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.btnWa}
                            style={{ flex: 1 }}
                          >
                            <MessageCircle size={16} />
                            <span>{offer.ctaText}</span>
                          </a>
                        ) : (
                          <Link
                            href={offer.ctaLink}
                            className={`btn-luxury-primary ${styles.btnPrimary}`}
                          >
                            <span>{offer.ctaText}</span>
                            <ArrowRight size={15} style={{ marginLeft: '6px' }} />
                          </Link>
                        )}

                        {offer.terms && offer.terms.length > 0 && (
                          <button
                            type="button"
                            className={styles.btnTerms}
                            onClick={() => setActiveTermsOffer(offer)}
                            aria-label="Lihat Syarat & Ketentuan"
                          >
                            <FileText size={14} />
                            <span>{t.viewTermsBtn}</span>
                          </button>
                        )}
                      </div>

                      {offer.ctaType !== 'whatsapp' && (
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            fontSize: '0.82rem',
                            color: '#2e7d32',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px',
                            textDecoration: 'none',
                            padding: '4px 0',
                          }}
                        >
                          <MessageCircle size={14} color="#25D366" />
                          <span>{t.consultWa}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Terms & Conditions Modal */}
      {activeTermsOffer && (
        <div
          className={styles.modalOverlay}
          onClick={() => setActiveTermsOffer(null)}
        >
          <div
            className={styles.modalBox}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>{activeTermsOffer.title}</h3>
              <button
                className={styles.closeBtn}
                onClick={() => setActiveTermsOffer(null)}
                aria-label="Tutup"
              >
                <X size={20} />
              </button>
            </div>

            <div className={styles.modalBody}>
              <div
                style={{
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  color: 'var(--color-gold, #c5a55a)',
                  letterSpacing: '0.08em',
                  marginBottom: '12px',
                }}
              >
                {t.termsTitle}
              </div>

              <ul className={styles.modalTermsList}>
                {activeTermsOffer.terms.map((term, idx) => (
                  <li key={idx} className={styles.modalTermItem}>
                    <CheckCircle2 size={16} color="#c5a55a" style={{ flexShrink: 0, marginTop: '3px' }} />
                    <span>{term}</span>
                  </li>
                ))}
              </ul>

              <div className={styles.modalFooter}>
                <button
                  type="button"
                  className="btn-luxury-secondary"
                  onClick={() => setActiveTermsOffer(null)}
                >
                  {t.closeTerms}
                </button>

                {activeTermsOffer.ctaType === 'whatsapp' ? (
                  <a
                    href={
                      activeTermsOffer.ctaLink.startsWith('https://wa.me/')
                        ? activeTermsOffer.ctaLink
                        : `https://wa.me/${cleanWa}?text=${encodeURIComponent(
                            `Halo Padjadjaran Suites, saya ingin konfirmasi promo "${activeTermsOffer.title}"`
                          )}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-luxury-primary"
                    style={{ background: '#25D366' }}
                  >
                    <MessageCircle size={15} style={{ marginRight: '6px' }} />
                    {activeTermsOffer.ctaText}
                  </a>
                ) : (
                  <Link
                    href={activeTermsOffer.ctaLink}
                    className="btn-luxury-primary"
                    onClick={() => setActiveTermsOffer(null)}
                  >
                    {activeTermsOffer.ctaText}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
