'use client'

import React, { useState } from 'react'
import {
  Heart,
  Sparkles,
  CheckCircle2,
  Calendar,
  Users,
  Award,
  Clock,
  Camera,
  Utensils,
  Car,
  Bed,
  MessageCircle,
  Send,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react'
import type { Locale } from '@/lib/translations'
import styles from './Wedding.module.css'

interface WeddingClientProps {
  locale?: Locale
  settings?: {
    whatsapp?: string
    phone?: string
  }
}

export const WeddingClient: React.FC<WeddingClientProps> = ({ locale = 'id', settings }) => {
  const isEn = locale === 'en'
  const cleanWa = (settings?.whatsapp || '+62 851 8309 3061').replace(/[^0-9]/g, '')

  const [formData, setFormData] = useState({
    coupleName: '',
    phone: '',
    email: '',
    targetDate: '',
    pax: '500',
    selectedPackage: 'emerald',
    notes: '',
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)

    const waMsg = encodeURIComponent(
      isEn
        ? `Hello Padjadjaran Suites Wedding Concierge,\nI would like to request an official wedding proposal:\n\n` +
          `💍 WEDDING DETAILS:\n` +
          `- Couple Name: ${formData.coupleName}\n` +
          `- Contact: ${formData.phone} / ${formData.email}\n` +
          `- Estimated Wedding Date: ${formData.targetDate || 'TBD'}\n` +
          `- Estimated Guests: ${formData.pax} Guests\n` +
          `- Package Preference: ${formData.selectedPackage.toUpperCase()}\n` +
          `- Notes: ${formData.notes || '-'}\n\n` +
          `Please contact us with date availability and detailed quotation. Thank you!`
        : `Halo Tim Wedding Concierge Padjadjaran Suites Resort,\nSaya ingin meminta proposal penawaran paket pernikahan resmi:\n\n` +
          `💍 RINCIAN PERNIKAHAN:\n` +
          `- Nama Pasangan Calon Pengantin: ${formData.coupleName}\n` +
          `- Nomor Kontak: ${formData.phone} / ${formData.email}\n` +
          `- Rencana Tanggal Pernikahan: ${formData.targetDate || 'Belum Ditentukan'}\n` +
          `- Estimasi Jumlah Tamu: ${formData.pax} Undangan\n` +
          `- Pilihan Paket: ${formData.selectedPackage.toUpperCase()}\n` +
          `- Catatan/Kebutuhan Tambahan: ${formData.notes || '-'}\n\n` +
          `Mohon informasi ketersediaan tanggal dan brosur harga selengkapnya. Terima kasih!`
    )

    window.open(`https://wa.me/${cleanWa}?text=${waMsg}`, '_blank')
  }

  const packages = [
    {
      id: 'intimate',
      name: isEn ? 'Intimate Blessing / Akad Nikah' : 'Paket Akad & Intimate Blessing',
      capacity: isEn ? '100 – 250 Guests' : '100 – 250 Tamu Undangan',
      desc: isEn
        ? 'A sacred, heartfelt celebration in an elegant private setting with authentic buffet dining and dedicated coordinator.'
        : 'Nuansa sakral yang khidmat dan hangat dengan dekorasi elegan, jamuan prasmanan istimewa, dan pendampingan koordinator.',
      featured: false,
      features: isEn
        ? [
            '4 Hours Venue Usage at Private Suite / Ballroom',
            'Full Buffet Selection (1 Appetizer, 1 Soup, 5 Mains, 2 Desserts)',
            'Complimentary 1 Night Stay in Executive Room',
            'Standard Sound System 3.000 Watt & Wireless Microphones',
            'VIP Holding Room for Bride & Groom',
            'Free Pre-Wedding Photoshoot across the Resort',
          ]
        : [
            'Pemakaian Ruangan Selama 4 Jam',
            'Prasmanan Lengkap (1 Appetizer, 1 Sup, 5 Menu Utama, 2 Penutup)',
            'Complimentary Menginap 1 Malam di Executive Room',
            'Standard Sound System 3.000 Watt & 2 Mic Wireless',
            'Ruang Rias VIP Pengantin & Keluarga',
            'Izin Foto Pre-Wedding Gratis di Seluruh Area Resor',
          ],
    },
    {
      id: 'emerald',
      name: isEn ? 'Royal Emerald Grand Wedding' : 'Paket Royal Emerald Grand Wedding',
      capacity: isEn ? '600 – 1.000 Guests' : '600 – 1.000 Tamu Undangan',
      desc: isEn
        ? 'Our pinnacle grand wedding package held at the freestanding Bale Pakuan Grand Ballroom with opulent catering, live stalls, and honeymoon suite.'
        : 'Kemewahan pesta pernikahan akbar di Bale Pakuan Grand Ballroom dengan jamuan prasmanan lengkap, live cooking stall, dan suite bulan madu.',
      featured: true,
      features: isEn
        ? [
            'Exclusive Full Day Usage of Bale Pakuan Grand Ballroom',
            'Lavish Buffet Selection + 5 Premium Live Cooking Stalls',
            'Complimentary 2 Nights Stay in 54 m² Royal Suite with Mountain View',
            '2 Complimentary Executive Rooms for Parents',
            'Exclusive Food Tasting Session for 8 Family Members',
            'Dedicated Private Bridal Holding Suite & Family Makeup Room',
            'Professional Concert Sound System 10.000 Watt & Stage Lighting',
            'Free Pre-Wedding Photoshoot & VIP Valet Parking Services',
          ]
        : [
            'Eksklusif Pemakaian Seharian Bale Pakuan Grand Ballroom',
            'Prasmanan Mewah + 5 Pilihan Gubukan (Food Stalls) Spesial',
            'Complimentary Menginap 2 Malam di Royal Suite 54 m² (Honeymoon Setup)',
            '2 Kamar Executive Tambahan untuk Orang Tua Pengantin',
            'Sesi Uji Rasa (Food Tasting) Eksklusif untuk 8 Orang Keluarga',
            'Ruang Rias VIP Pengantin & Ruang Tunggu Keluarga',
            'Sound System Konser 10.000 Watt, Lighting Panggung & Red Carpet',
            'Akses Foto Pre-Wedding Gratis & Layanan Valet Parkir VIP',
          ],
    },
    {
      id: 'sapphire',
      name: isEn ? 'Sapphire Elegant Celebration' : 'Paket Sapphire Elegant Celebration',
      capacity: isEn ? '300 – 500 Guests' : '300 – 500 Tamu Undangan',
      desc: isEn
        ? 'A harmonious blend of grand ballroom grandeur and intimate warmth, tailored for modern memorable receptions.'
        : 'Perpaduan sempurna antara kemegahan ballroom dan kehangatan keluarga untuk resepsi pernikahan modern berkesan.',
      featured: false,
      features: isEn
        ? [
            '6 Hours Usage of Bale Pakuan Grand Ballroom',
            'Full Buffet Selection + 3 Popular Live Food Stalls',
            'Complimentary 1 Night Stay in Royal Suite with Mountain View',
            '1 Complimentary Executive Room for Parents',
            'Exclusive Food Tasting for 6 Family Members',
            'VIP Holding Room & Bridal Changing Suite',
            'Standard Sound System 5.000 Watt & Stage Lights',
            'Free Pre-Wedding Photoshoot across the Resort',
          ]
        : [
            'Pemakaian Bale Pakuan Grand Ballroom Selama 6 Jam',
            'Prasmanan Lengkap + 3 Pilihan Gubukan (Food Stalls) Populer',
            'Complimentary Menginap 1 Malam di Royal Suite Panorama Gunung',
            '1 Kamar Executive Tambahan untuk Orang Tua',
            'Sesi Uji Rasa (Food Tasting) untuk 6 Orang Keluarga',
            'Ruang Rias VIP Pengantin & Ruang Keluarga',
            'Standard Sound System 5.000 Watt & Tata Lampu Panggung',
            'Akses Foto Pre-Wedding Gratis di Seluruh Area Resor',
          ],
    },
  ]

  const inclusions = [
    {
      icon: <Bed size={26} />,
      title: isEn ? 'Royal Suite Honeymoon Sanctuary' : 'Bulan Madu di Royal Suite',
      desc: isEn
        ? 'Relax in our top-tier 54 m² suite featuring panoramic views of Mount Salak and breakfast in bed.'
        : 'Kamar suite termewah seluas 54 m² dengan panorama Gunung Salak dan sarapan romantis di kamar.',
    },
    {
      icon: <Camera size={26} />,
      title: isEn ? 'Free Pre-Wedding Photoshoot' : 'Foto Pre-Wedding Bebas Biaya',
      desc: isEn
        ? 'Full photo permit across our lush landscaped gardens, scenic poolside, and resort architecture.'
        : 'Izin foto pre-wedding gratis di taman tropis, area kolam renang bernuansa alam, dan arsitektur resor.',
    },
    {
      icon: <Utensils size={26} />,
      title: isEn ? 'Private Food Tasting Session' : 'Sesi Uji Rasa (Food Tasting)',
      desc: isEn
        ? 'Sample and curate your tailored banquet menu together with our master chefs before the big day.'
        : 'Pilih dan sempurnakan cita rasa menu prasmanan Anda langsung bersama Executive Chef kami.',
    },
    {
      icon: <Car size={26} />,
      title: isEn ? 'Vast 300+ Vehicles Parking' : 'Lahan Parkir Luas 300+ Mobil',
      desc: isEn
        ? 'Spacious parking lot within secure BNR enclave with dedicated traffic wardens and valet option.'
        : 'Area parkir leluasa di dalam kawasan aman BNR dengan petugas keamanan dan opsi layanan valet.',
    },
  ]

  return (
    <div className={styles.weddingWrapper}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div
          className={styles.heroBg}
          style={{
            backgroundImage:
              "url('https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/ballroom-1.jpg.jpeg')",
          }}
        />
        <div className={styles.heroOverlay} />
        <div className={`site-container ${styles.heroContent}`}>
          <div className={styles.heroBadge}>
            <Heart size={14} fill="#c5a55a" />
            <span>{isEn ? 'Bale Pakuan Weddings & Celebrations' : 'Pernikahan Megah di Bale Pakuan'}</span>
          </div>
          <h1 className={styles.heroTitle}>
            {isEn
              ? 'Where Eternal Love Meets Grand Royal Elegance'
              : 'Wujudkan Pernikahan Impian Berlatar Gunung Salak'}
          </h1>
          <p className={styles.heroDesc}>
            {isEn
              ? 'Celebrate your union in Bogor’s premier freestanding pillarless grand ballroom, surrounded by five-star hospitality, master-crafted banquet culinary, and mountain serenity.'
              : 'Rayakan ikrar cinta abadi Anda di gedung konvensi mandiri tanpa pilar paling megah di Bogor. Didukung pelayanan bintang lima, jamuan master chef, dan panorama Gunung Salak.'}
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <a href="#packages" className="btn-luxury-primary" style={{ padding: '14px 32px' }}>
              {isEn ? 'View Wedding Packages' : 'Pilihan Paket Pernikahan'}
            </a>
            <a
              href={`https://wa.me/${cleanWa}?text=${encodeURIComponent(
                isEn
                  ? 'Hello Padjadjaran Suites Wedding Team, I would like to consult about wedding packages and date availability'
                  : 'Halo Tim Wedding Padjadjaran Suites, saya ingin konsultasi paket pernikahan dan cek ketersediaan tanggal'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-luxury-outline"
              style={{ padding: '14px 32px', color: '#ffffff', borderColor: 'var(--color-gold)' }}
            >
              <MessageCircle size={16} style={{ display: 'inline', marginRight: '6px' }} />
              {isEn ? 'Consult Wedding Specialist (WA)' : 'Konsultasi Wedding Concierge (WA)'}
            </a>
          </div>
        </div>
      </section>

      {/* Ballroom Highlights Showcase */}
      <section className="section-padding">
        <div className="site-container">
          <div className="section-header-center">
            <span className="section-subtitle">
              {isEn ? 'The Iconic Venue' : 'Gedung Pernikahan Unggulan'}
            </span>
            <h2 className="section-title">
              {isEn ? 'Bale Pakuan Grand Ballroom' : 'Kemegahan Bale Pakuan Grand Ballroom'}
            </h2>
            <p className="section-desc">
              {isEn
                ? 'Designed specifically to deliver a palace-like atmosphere for up to 1,000 guests without obstructive pillars.'
                : 'Dirancang khusus menghadirkan suasana ballroom istana berkapasitas hingga 1.000 tamu tanpa tiang penghalang visual.'}
            </p>
          </div>

          <div className={styles.ballroomShowcase}>
            <div className={styles.ballroomImgWrapper}>
              <img
                src="https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/ballroom-1.jpg.jpeg"
                alt="Bale Pakuan Grand Ballroom Wedding Setup"
                className={styles.ballroomImg}
              />
            </div>
            <div className={styles.ballroomSpecs}>
              <span style={{ color: 'var(--color-gold)', fontSize: '0.82rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {isEn ? 'Pillarless Architecture' : 'Gedung Bebas Pilar'}
              </span>
              <h3>{isEn ? 'Spacious, Grand & Luxurious' : 'Luas, Megah & Berkelas'}</h3>
              <p style={{ color: '#6b7280', fontSize: '0.92rem', lineHeight: 1.7 }}>
                {isEn
                  ? 'Bale Pakuan Grand Ballroom is an independent convention facility. Its soaring 7-meter high ceiling allows wedding decorators to craft spectacular floral stages, grand arches, and custom LED lighting.'
                  : 'Bale Pakuan berdiri sebagai gedung konvensi mandiri. Ketinggian plafon 7 meter memberikan keleluasaan penuh bagi perancang dekorasi pelaminan untuk mendirikan panggung bunga megah, gapura kristal, dan pencahayaan spektakuler.'}
              </p>

              <ul className={styles.specList}>
                <li className={styles.specItem}>
                  <CheckCircle2 size={18} className={styles.specIcon} />
                  <span>{isEn ? 'Capacity up to 1,000 guests (standing/banquet)' : 'Kapasitas hingga 1.000 tamu (standing / round table)'}</span>
                </li>
                <li className={styles.specItem}>
                  <CheckCircle2 size={18} className={styles.specIcon} />
                  <span>{isEn ? '7-meter ceiling height with crystal chandeliers' : 'Langit-langit setinggi 7 meter dengan lampu kristal'}</span>
                </li>
                <li className={styles.specItem}>
                  <CheckCircle2 size={18} className={styles.specIcon} />
                  <span>{isEn ? 'Private VIP bridal holding suites & makeup room' : 'Ruang transit VIP pengantin & ruang rias keluarga'}</span>
                </li>
                <li className={styles.specItem}>
                  <CheckCircle2 size={18} className={styles.specIcon} />
                  <span>{isEn ? 'Spacious pre-function foyer for guest reception' : 'Foyer luas untuk registrasi & penyambutan tamu'}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Wedding Packages Section */}
      <section id="packages" className="section-padding" style={{ backgroundColor: '#ffffff' }}>
        <div className="site-container">
          <div className="section-header-center">
            <span className="section-subtitle">
              {isEn ? 'Curated Collections' : 'Koleksi Paket Pilihan'}
            </span>
            <h2 className="section-title">
              {isEn ? 'Bespoke Wedding Packages' : 'Paket Pernikahan Pilihan'}
            </h2>
            <p className="section-desc">
              {isEn
                ? 'Carefully crafted all-inclusive packages designed to make your wedding planning completely stress-free.'
                : 'Dirancang lengkap dan terpadu untuk memastikan hari bahagia Anda berjalan sempurna tanpa rasa khawatir.'}
            </p>
          </div>

          <div className={styles.packagesGrid}>
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`${styles.packageCard} ${pkg.featured ? styles.packageCardFeatured : ''}`}
              >
                {pkg.featured && (
                  <span className={styles.featuredRibbon}>
                    {isEn ? 'Most Popular' : 'Paling Favorit'}
                  </span>
                )}
                <div>
                  <h3 className={styles.packageName}>{pkg.name}</h3>
                  <div className={styles.packageCapacity}>
                    <Users size={15} style={{ display: 'inline', marginRight: '6px' }} />
                    {pkg.capacity}
                  </div>
                  <p className={styles.packageDesc}>{pkg.desc}</p>

                  <ul className={styles.featureList}>
                    {pkg.features.map((feat, fIdx) => (
                      <li key={fIdx} className={styles.featureItem}>
                        <CheckCircle2 size={16} color="#c5a55a" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="#rfp-form"
                  onClick={() => setFormData({ ...formData, selectedPackage: pkg.id })}
                  className={pkg.featured ? 'btn-luxury-primary' : 'btn-luxury-outline'}
                  style={{ width: '100%', textAlign: 'center' }}
                >
                  {isEn ? 'Request This Package' : 'Pilih & Minta Penawaran'}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inclusions & Benefits */}
      <section className="section-padding">
        <div className="site-container">
          <div className="section-header-center">
            <span className="section-subtitle">
              {isEn ? 'The Exclusive Perks' : 'Keistimewaan Pengantin'}
            </span>
            <h2 className="section-title">
              {isEn ? 'Unrivaled Complimentary Inclusions' : 'Fasilitas Eksklusif untuk Anda'}
            </h2>
          </div>

          <div className={styles.inclusionsGrid}>
            {inclusions.map((inc, idx) => (
              <div key={idx} className={styles.inclusionCard}>
                <div className={styles.inclusionIcon}>{inc.icon}</div>
                <h4 className={styles.inclusionTitle}>{inc.title}</h4>
                <p className={styles.inclusionDesc}>{inc.desc}</p>
              </div>
            ))}
          </div>

          {/* Interactive Request for Proposal (RFP) Form */}
          <div id="rfp-form" className={styles.rfpCard}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <span className="section-subtitle">
                {isEn ? 'Wedding Consultation' : 'Konsultasi Pernikahan'}
              </span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: 'var(--color-primary-dark)', marginBottom: '12px' }}>
                {isEn ? 'Request Your Wedding Proposal' : 'Permintaan Proposal Pernikahan'}
              </h2>
              <p style={{ color: '#6b7280', fontSize: '0.98rem' }}>
                {isEn
                  ? 'Tell us your envisioned wedding date and preferences. Our dedicated wedding specialists will formulate a bespoke proposal within 24 hours.'
                  : 'Sampaikan rencana tanggal pernikahan dan impian Anda. Tim Wedding Specialist kami akan menyusun penawaran khusus dalam waktu 1x24 jam.'}
              </p>
            </div>

            {isSubmitted ? (
              <div style={{ textAlign: 'center', padding: '36px 0' }}>
                <CheckCircle2 size={64} color="#2e7d32" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>
                  {isEn ? 'Proposal Request Sent!' : 'Permintaan Proposal Terkirim!'}
                </h3>
                <p style={{ color: '#6b7280', maxWidth: '500px', margin: '0 auto 24px' }}>
                  {isEn
                    ? 'We have connected you directly to our wedding specialist concierge via WhatsApp for priority consultation.'
                    : 'Rincian rencana pernikahan Anda telah diteruskan ke Wedding Specialist via WhatsApp untuk konsultasi langsung.'}
                </p>
                <button className="btn-luxury-secondary" onClick={() => setIsSubmitted(false)}>
                  {isEn ? 'Submit Another Request' : 'Kirim Permintaan Lain'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-primary-dark)', marginBottom: '6px' }}>
                      {isEn ? 'Bride & Groom Name *' : 'Nama Pasangan Calon Pengantin *'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={isEn ? 'e.g. Sarah & Michael' : 'Contoh: Rina & Dimas'}
                      value={formData.coupleName}
                      onChange={(e) => setFormData({ ...formData, coupleName: e.target.value })}
                      style={{ width: '100%', height: '46px', padding: '0 14px', borderRadius: 'var(--radius-sm)', border: '1px solid #d1d5db', fontSize: '0.9rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-primary-dark)', marginBottom: '6px' }}>
                      {isEn ? 'Active WhatsApp Number *' : 'Nomor WhatsApp Aktif *'}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0812-3456-7890"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{ width: '100%', height: '46px', padding: '0 14px', borderRadius: 'var(--radius-sm)', border: '1px solid #d1d5db', fontSize: '0.9rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-primary-dark)', marginBottom: '6px' }}>
                      {isEn ? 'Planned Wedding Date' : 'Rencana Tanggal Acara'}
                    </label>
                    <input
                      type="date"
                      value={formData.targetDate}
                      onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                      style={{ width: '100%', height: '46px', padding: '0 14px', borderRadius: 'var(--radius-sm)', border: '1px solid #d1d5db', fontSize: '0.9rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-primary-dark)', marginBottom: '6px' }}>
                      {isEn ? 'Estimated Guests (Pax) *' : 'Estimasi Jumlah Undangan *'}
                    </label>
                    <select
                      value={formData.pax}
                      onChange={(e) => setFormData({ ...formData, pax: e.target.value })}
                      style={{ width: '100%', height: '46px', padding: '0 14px', borderRadius: 'var(--radius-sm)', border: '1px solid #d1d5db', fontSize: '0.9rem', backgroundColor: '#ffffff' }}
                    >
                      <option value="150">100 - 200 Pax (Akad / Intimate)</option>
                      <option value="300">300 - 400 Pax</option>
                      <option value="500">500 - 700 Pax</option>
                      <option value="800">800 - 1.000 Pax (Grand Ballroom)</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-primary-dark)', marginBottom: '6px' }}>
                    {isEn ? 'Notes / Special Requests' : 'Catatan atau Konsep Impian Anda'}
                  </label>
                  <textarea
                    rows={3}
                    placeholder={isEn ? 'e.g. Traditional Sundanese ceremony, requires outdoor garden area for photo session...' : 'Contoh: Rencana adat Sunda, butuh sesi akad nikah outdoor sebelum resepsi...'}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid #d1d5db', fontSize: '0.9rem' }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-luxury-primary"
                  style={{ width: '100%', padding: '16px', fontSize: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
                >
                  <Send size={18} />
                  {isEn ? 'Send Wedding Proposal Request' : 'Kirim Permintaan Proposal Wedding'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
