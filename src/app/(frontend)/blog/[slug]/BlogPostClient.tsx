'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Calendar,
  Clock,
  User,
  Share2,
  MessageCircle,
  Copy,
  Check,
  ChevronRight,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import type { PostItem } from '@/lib/cmsData'
import type { Locale } from '@/lib/translations'
import styles from './BlogPost.module.css'

interface BlogPostClientProps {
  post: PostItem
  relatedPosts: PostItem[]
  locale?: Locale
}

export const BlogPostClient: React.FC<BlogPostClientProps> = ({
  post,
  relatedPosts,
  locale = 'id',
}) => {
  const [copied, setCopied] = useState(false)
  const isEn = locale === 'en'

  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  // Render markdown-like sections (headers and paragraphs)
  const renderContent = (content?: string) => {
    if (!content) return <p>{post.excerpt}</p>

    const lines = content.split('\n')
    const elements: React.ReactNode[] = []

    lines.forEach((line, idx) => {
      const trimmed = line.trim()
      if (!trimmed) return

      if (trimmed.startsWith('### ')) {
        elements.push(<h3 key={idx}>{trimmed.replace('### ', '')}</h3>)
      } else if (trimmed.startsWith('## ')) {
        elements.push(<h2 key={idx}>{trimmed.replace('## ', '')}</h2>)
      } else if (trimmed.startsWith('- ')) {
        elements.push(
          <li key={idx} style={{ marginLeft: '20px' }}>
            {trimmed.replace('- ', '')}
          </li>
        )
      } else {
        elements.push(<p key={idx}>{trimmed}</p>)
      }
    })

    return elements
  }

  return (
    <div className={styles.articleWrapper}>
      <div className={`site-container ${styles.articleContainer}`}>
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">{isEn ? 'Home' : 'Beranda'}</Link>
          <ChevronRight size={14} />
          <Link href="/blog">{isEn ? 'Journal' : 'Jurnal & Inspirasi'}</Link>
          <ChevronRight size={14} />
          <span style={{ color: '#9ca3af', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {post.title}
          </span>
        </nav>

        {/* Article Header */}
        <header>
          <span className={styles.categoryBadge}>{post.categoryLabel}</span>
          <h1 className={styles.articleTitle}>{post.title}</h1>
          <div className={styles.metaBar}>
            <span className={styles.metaItem}>
              <User size={15} color="#c5a55a" />
              {post.author}
            </span>
            <span className={styles.metaItem}>
              <Calendar size={15} color="#c5a55a" />
              {post.publishedAt}
            </span>
            <span className={styles.metaItem}>
              <Clock size={15} color="#c5a55a" />
              {post.readTime}
            </span>
          </div>
        </header>

        {/* Featured Image */}
        <div className={styles.featuredImageWrapper}>
          <img src={post.featuredImage} alt={post.title} className={styles.featuredImage} />
        </div>

        {/* Content Body */}
        <article className={styles.contentBody}>{renderContent(post.content)}</article>

        {/* Share Bar */}
        <div className={styles.shareBar}>
          <span className={styles.shareTitle}>
            <Share2 size={16} style={{ display: 'inline', marginRight: '6px' }} />
            {isEn ? 'Share this story:' : 'Bagikan artikel ini:'}
          </span>
          <div className={styles.shareButtons}>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`${post.title} - ${currentUrl}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.shareBtn} ${styles.shareBtnWa}`}
            >
              <MessageCircle size={15} /> WhatsApp
            </a>
            <button type="button" onClick={handleCopyLink} className={styles.shareBtn}>
              {copied ? (
                <>
                  <Check size={15} color="#10b981" /> {isEn ? 'Copied!' : 'Tersalin!'}
                </>
              ) : (
                <>
                  <Copy size={15} /> {isEn ? 'Copy Link' : 'Salin Tautan'}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Booking CTA Banner */}
        <div className={styles.ctaBanner}>
          <span
            style={{
              color: 'var(--color-gold)',
              fontSize: '0.8rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '8px',
            }}
          >
            <Sparkles size={14} />
            {isEn ? 'Plan Your Stay' : 'Rencanakan Liburan & Acara Anda'}
          </span>
          <h2 className={styles.ctaTitle}>
            {isEn
              ? 'Experience Five-Star Serenity in Bogor Nirwana Residence'
              : 'Rasakan Ketenangan Menginap Bintang 5 di Bogor Nirwana Residence'}
          </h2>
          <p className={styles.ctaDesc}>
            {isEn
              ? 'Book directly on our official website for guaranteed lowest rates, flexible reservations, and exclusive mountain view suites.'
              : 'Dapatkan jaminan harga termurah, fleksibilitas reservasi, dan kamar suite berpanorama Gunung Salak dengan memesan langsung di website resmi.'}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <Link href="/booking" className="btn-luxury-primary" style={{ padding: '12px 28px' }}>
              {isEn ? 'Check Rates & Book' : 'Pesan Kamar Sekarang'}
            </Link>
            <Link href="/contact" className="btn-luxury-outline" style={{ padding: '12px 28px', color: '#ffffff', borderColor: 'var(--color-gold)' }}>
              {isEn ? 'Contact Concierge' : 'Hubungi Concierge'}
            </Link>
          </div>
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className={styles.relatedSection}>
            <h3 className={styles.relatedTitle}>
              {isEn ? 'Related Stories & Guides' : 'Artikel & Panduan Terkait'}
            </h3>
            <div className={styles.relatedGrid}>
              {relatedPosts.map((rPost) => (
                <Link
                  key={rPost.id}
                  href={`/blog/${rPost.slug}`}
                  style={{
                    background: '#ffffff',
                    borderRadius: 'var(--radius-sm)',
                    overflow: 'hidden',
                    border: '1px solid rgba(0,0,0,0.06)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div style={{ height: '160px', overflow: 'hidden' }}>
                    <img
                      src={rPost.featuredImage}
                      alt={rPost.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <span
                      style={{
                        color: 'var(--color-gold)',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        marginBottom: '6px',
                      }}
                    >
                      {rPost.categoryLabel}
                    </span>
                    <h4
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.05rem',
                        color: 'var(--color-primary-dark)',
                        lineHeight: 1.35,
                        marginBottom: '8px',
                      }}
                    >
                      {rPost.title}
                    </h4>
                    <span
                      style={{
                        fontSize: '0.78rem',
                        color: '#9ca3af',
                        marginTop: 'auto',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      {isEn ? 'Read' : 'Baca'} <ArrowRight size={13} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
