'use client'

import React, { useState } from 'react'
import {
  Users,
  Layout,
  Layers,
  Sparkles,
  Printer,
  MessageCircle,
  Tv,
  Mic,
  Wifi,
  Building,
  CheckCircle2,
  FileText,
  Award,
  ChevronRight,
} from 'lucide-react'
import type { Locale } from '@/lib/translations'
import styles from './MicePlanner.module.css'

interface MicePlannerProps {
  locale?: Locale
  whatsappNumber?: string
}

export function MicePlanner({ locale = 'id', whatsappNumber = '+62 851 8309 3061' }: MicePlannerProps) {
  const isEn = locale === 'en'
  const cleanWa = whatsappNumber.replace(/[^0-9]/g, '')

  // State
  const [pax, setPax] = useState<number>(100)
  const [layout, setLayout] = useState<'classroom' | 'theatre' | 'ushape' | 'boardroom' | 'banquet'>('classroom')
  const [packageId, setPackageId] = useState<string>('fullday')
  const [selectedTech, setSelectedTech] = useState<string[]>(['sound', 'wifi', 'stationery'])
  const [orgName, setOrgName] = useState<string>('')
  const [eventName, setEventName] = useState<string>('')

  // Layouts
  const layouts = [
    { id: 'classroom', name: isEn ? 'Classroom' : 'Kelas (Meja & Kursi)', icon: '📐' },
    { id: 'theatre', name: isEn ? 'Theatre' : 'Teater (Kursi Saja)', icon: '🎭' },
    { id: 'ushape', name: isEn ? 'U-Shape' : 'Huruf U', icon: '🧲' },
    { id: 'boardroom', name: isEn ? 'Boardroom' : 'Rapat Direksi', icon: '💼' },
    { id: 'banquet', name: isEn ? 'Banquet' : 'Meja Bundar (Round Table)', icon: '🍽️' },
  ]

  // Packages
  const packages = [
    {
      id: 'halfday',
      name: isEn ? 'Half Day Meeting (4 Hours)' : 'Paket Half Day (4 Jam)',
      price: 385000,
      desc: isEn ? '1x Coffee Break, 1x Buffet Lunch or Dinner, 4 hours room rental' : '1x Coffee Break, 1x Makan Siang/Malam Prasmanan, 4 Jam Pemakaian Ruangan',
      inclusions: isEn
        ? ['Standard Sound System & 2 Wireless Mics', 'Flipchart & High-Speed WiFi', 'Meeting Notepad & Pens']
        : ['Sound System Standar & 2 Mic Nirkabel', 'Flipchart & Akses WiFi Cepat', 'Notepad & Pulpen'],
    },
    {
      id: 'fullday',
      name: isEn ? 'Full Day Meeting (8 Hours)' : 'Paket Full Day (8 Jam)',
      price: 485000,
      desc: isEn ? '2x Coffee Breaks, 1x Buffet Lunch, 8 hours room rental' : '2x Coffee Break, 1x Makan Siang Prasmanan, 8 Jam Pemakaian Ruangan',
      inclusions: isEn
        ? ['Morning & Afternoon Coffee Breaks', 'Standard Sound System & 2 Wireless Mics', 'Full AC & Podiums']
        : ['Coffee Break Pagi & Sore', 'Sound System & 2 Mic Nirkabel', 'Ruang Full AC & Podium Pidato'],
    },
    {
      id: 'oneday',
      name: isEn ? 'One Day Meeting (12 Hours)' : 'Paket One Day (12 Jam)',
      price: 625000,
      desc: isEn ? '2x Coffee Breaks, 1x Buffet Lunch, 1x Buffet Dinner, 12 hours room rental' : '2x Coffee Break, 1x Makan Siang, 1x Makan Malam, 12 Jam Ruangan',
      inclusions: isEn
        ? ['Lunch & Dinner Buffet at Hegarmanah', '2x Artisan Coffee Breaks with Sundanese snacks', 'Dedicated AV Technician']
        : ['Makan Siang & Malam Prasmanan di Hegarmanah', '2x Coffee Break Kudapan Tradisional', 'Teknisi AV Khusus Selama Acara'],
    },
    {
      id: 'residential-twin',
      name: isEn ? 'Residential Fullboard (Twin Share)' : 'Residential Fullboard (Kamar Twin)',
      price: 950000,
      desc: isEn ? '1 Night Stay (Twin Share), Breakfast, 2x Coffee Breaks, Lunch & Dinner' : 'Menginap 1 Malam (1 Kamar Berdua), Sarapan, 2x Coffee Break, Makan Siang & Malam',
      inclusions: isEn
        ? ['Superior/Executive Room Stay (Twin)', 'Complete 3-Meals & 2-Breaks Dining', 'Full Meeting Room Access & Amenities']
        : ['Menginap Kamar Superior/Executive (Twin)', 'Makan 3x & Coffee Break 2x Lengkap', 'Akses Penuh Ruang Meeting & Fasilitas'],
    },
    {
      id: 'residential-single',
      name: isEn ? 'Residential Fullboard (Single Private)' : 'Residential Fullboard (Kamar Single)',
      price: 1350000,
      desc: isEn ? '1 Night Stay (Single Occupancy), Breakfast, 2x Coffee Breaks, Lunch & Dinner' : 'Menginap 1 Malam (1 Kamar Sendiri), Sarapan, 2x Coffee Break, Makan Siang & Malam',
      inclusions: isEn
        ? ['Private Room Stay (Single Occupant)', 'Complete 3-Meals & 2-Breaks Dining', 'Full Meeting Room Access & Amenities']
        : ['Menginap Kamar Privat (1 Orang/Kamar)', 'Makan 3x & Coffee Break 2x Lengkap', 'Akses Penuh Ruang Meeting & Fasilitas'],
    },
  ]

  // Tech addons
  const techOptions = [
    {
      id: 'sound',
      name: isEn ? 'Five-Star Audio & Wireless Microphones' : 'Sound System Bintang 5 & Mic Nirkabel',
      price: 0,
      priceLabel: isEn ? 'Included in Package' : 'Sudah Termasuk',
    },
    {
      id: 'wifi',
      name: isEn ? 'Dedicated High-Speed WiFi VLAN (Hybrid Zoom)' : 'Internet Dedicated VLAN Cepat (Hybrid Zoom)',
      price: 0,
      priceLabel: isEn ? 'Included in Package' : 'Sudah Termasuk',
    },
    {
      id: 'stationery',
      name: isEn ? 'Meeting Stationery Kit (Notepads, Pens, Mints)' : 'Meeting Kit Lengkap (Notepad, Pen, Permen, Air)',
      price: 0,
      priceLabel: isEn ? 'Included in Package' : 'Sudah Termasuk',
    },
    {
      id: 'led',
      name: isEn ? 'Giant P3 High-Definition LED Videotron Screen' : 'Layar Raksasa LED Videotron P3 High Definition',
      price: 5000000,
      priceLabel: isEn ? '+ Rp 5.000.000 / day' : '+ Rp 5.000.000 / hari',
    },
    {
      id: 'secretariat',
      name: isEn ? 'Dedicated Secretariat / VIP Holding Room' : 'Ruang Sekretariat / Ruang Transit VIP Khusus',
      price: 1500000,
      priceLabel: isEn ? '+ Rp 1.500.000 / day' : '+ Rp 1.500.000 / hari',
    },
  ]

  // Venue Recommendation based on pax & layout
  const isLargeVenue = pax > 120 || (layout === 'banquet' && pax > 90)
  const recommendedVenue = isLargeVenue
    ? {
        name: isEn ? 'Bale Pakuan Grand Ballroom' : 'Bale Pakuan Grand Ballroom',
        badge: isEn ? 'Grand Convention Building (Up to 1,000 Pax)' : 'Gedung Konvensi Mandiri (Hingga 1.000 Pax)',
        desc: isEn
          ? 'Spacious freestanding convention ballroom with 7-meter ceiling height, crystal chandeliers, private VIP holding rooms, and grand foyer.'
          : 'Gedung konvensi megah dengan langit-langit 7 meter, lampu gantung kristal, ruang transit VIP, dan foyer luas untuk registrasi & pameran.',
      }
    : {
        name: isEn ? 'Rancage Meeting Rooms Suite (1–20)' : 'Rancage Meeting Rooms Suite (Ruang 1–20)',
        badge: isEn ? 'Flexible Meeting Rooms (20–150 Pax)' : 'Ruang Pertemuan Fleksibel (20–150 Pax)',
        desc: isEn
          ? '20+ customizable modern meeting rooms equipped with individual climate control, acoustic partitions, and high-definition projectors.'
          : 'Pilihan lebih dari 20 ruang rapat modern ber-AC dengan partisi kedap suara, proyektor tajam, dan pencahayaan alami yang fokus.',
      }

  // Calculations
  const selectedPkg = packages.find((p) => p.id === packageId) || packages[1]
  const packageTotal = selectedPkg.price * pax
  const techAddonsTotal = selectedTech.reduce((acc, curr) => {
    const item = techOptions.find((t) => t.id === curr)
    return acc + (item ? item.price : 0)
  }, 0)
  const grandTotal = packageTotal + techAddonsTotal

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val)
  }

  const toggleTech = (id: string) => {
    if (id === 'sound' || id === 'wifi' || id === 'stationery') return // Always included
    if (selectedTech.includes(id)) {
      setSelectedTech(selectedTech.filter((t) => t !== id))
    } else {
      setSelectedTech([...selectedTech, id])
    }
  }

  const handleSendWa = () => {
    const layoutLabel = layouts.find((l) => l.id === layout)?.name || layout
    const techLabels = selectedTech
      .map((id) => techOptions.find((t) => t.id === id)?.name)
      .filter(Boolean)
      .join('\n  • ')

    const waMsg = encodeURIComponent(
      isEn
        ? `Hello Padjadjaran Suites MICE Specialist,\nI would like to inquire about an official MICE Event proposal:\n\n` +
          `📋 EVENT DETAILS:\n` +
          `- Organization/Company: ${orgName || '-'}\n` +
          `- Event Title: ${eventName || '-'}\n` +
          `- Estimated Participants: ${pax} Pax\n` +
          `- Preferred Seating Style: ${layoutLabel}\n` +
          `- Recommended Venue: ${recommendedVenue.name}\n` +
          `- Package Selected: ${selectedPkg.name} (${formatRupiah(selectedPkg.price)}/pax)\n\n` +
          `⚙️ TECHNICAL & AV REQUIREMENTS:\n  • ${techLabels}\n\n` +
          `💰 ESTIMATED BUDGET: ${formatRupiah(grandTotal)}\n\n` +
          `Please provide a formal quotation and availability schedule. Thank you!`
        : `Halo Tim MICE Specialist Padjadjaran Suites Resort,\nSaya ingin mengajukan estimasi kebutuhan acara MICE & Meeting:\n\n` +
          `📋 RINCIAN ACARA:\n` +
          `- Nama Instansi/Perusahaan: ${orgName || '-'}\n` +
          `- Agenda Acara: ${eventName || '-'}\n` +
          `- Jumlah Peserta: ${pax} Orang\n` +
          `- Format Tempat Duduk: ${layoutLabel}\n` +
          `- Ruangan Rekomendasi: ${recommendedVenue.name}\n` +
          `- Pilihan Paket: ${selectedPkg.name} (${formatRupiah(selectedPkg.price)}/orang)\n\n` +
          `⚙️ KEBUTUHAN TEKNIS & AV:\n  • ${techLabels}\n\n` +
          `💰 ESTIMASI TOTAL BIAYA: ${formatRupiah(grandTotal)}\n\n` +
          `Mohon informasi ketersediaan tanggal dan penawaran resmi (Surat Penawaran). Terima kasih!`
    )

    window.open(`https://wa.me/${cleanWa}?text=${waMsg}`, '_blank')
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <section id="planner" className={styles.plannerSection}>
      {/* Header */}
      <div className={styles.plannerHeader}>
        <span className={styles.badge}>
          <Sparkles size={14} />
          {isEn ? 'Official MICE Event Configurator' : 'Kalkulator & Konfigurator Acara MICE'}
        </span>
        <h2 className={styles.plannerTitle}>
          {isEn ? 'Interactive MICE Planner & Proposal Suite' : 'Perencana Acara & Simulasi Kebutuhan MICE'}
        </h2>
        <p className={styles.plannerSubtitle}>
          {isEn
            ? 'Simulate your seating arrangement, banquet packages, and technical audiovisual requirements for corporate conventions, summits, and government meetings.'
            : 'Simulasikan kapasitas peserta, format kursi, paket meeting, dan kebutuhan teknis audiovisual untuk seminar kementerian, rapat kerja BUMN, serta konferensi korporat.'}
        </p>
      </div>

      {/* Body */}
      <div className={styles.plannerBody}>
        {/* Step 1: Pax & Seating */}
        <div className={styles.stepBlock}>
          <h3 className={styles.stepTitle}>
            <span className={styles.stepNum}>1</span>
            {isEn ? 'Participants & Seating Arrangement' : 'Jumlah Peserta & Format Tata Letak Kursi'}
          </h3>

          <div className={styles.paxRow}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users size={20} color="#c5a55a" />
              <strong style={{ fontSize: '1.25rem', color: 'var(--color-primary-dark)' }}>
                {pax} {isEn ? 'Participants' : 'Peserta'}
              </strong>
            </div>

            <div className={styles.paxPresets}>
              {[30, 75, 150, 300, 600, 1000].map((preset) => (
                <button
                  key={preset}
                  className={`${styles.paxBtn} ${pax === preset ? styles.paxBtnActive : ''}`}
                  onClick={() => setPax(preset)}
                >
                  {preset} Pax
                </button>
              ))}
            </div>
          </div>

          <div className={styles.sliderContainer}>
            <input
              type="range"
              min="20"
              max="1000"
              step="10"
              value={pax}
              onChange={(e) => setPax(Number(e.target.value))}
              className={styles.rangeSlider}
            />
          </div>

          {/* Layout Grid */}
          <div className={styles.layoutGrid}>
            {layouts.map((l) => (
              <div
                key={l.id}
                className={`${styles.layoutCard} ${layout === l.id ? styles.layoutCardActive : ''}`}
                onClick={() => setLayout(l.id as any)}
              >
                <div style={{ fontSize: '1.6rem', marginBottom: '6px' }}>{l.icon}</div>
                <div className={styles.layoutName}>{l.name}</div>
              </div>
            ))}
          </div>

          {/* Automatic Venue Recommendation Box */}
          <div className={styles.recommendBox}>
            <div>
              <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-gold-dark)', fontWeight: 600 }}>
                {isEn ? 'Recommended Venue' : 'Rekomendasi Ruangan Ideal'}
              </span>
              <div className={styles.recommendTitle}>{recommendedVenue.name}</div>
              <div className={styles.recommendDesc}>{recommendedVenue.desc}</div>
            </div>
            <div style={{ background: '#ffffff', padding: '6px 14px', borderRadius: '4px', border: '1px solid var(--color-gold)', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-primary-dark)' }}>
              {recommendedVenue.badge}
            </div>
          </div>
        </div>

        {/* Step 2: Package Selection */}
        <div className={styles.stepBlock}>
          <h3 className={styles.stepTitle}>
            <span className={styles.stepNum}>2</span>
            {isEn ? 'Select Meeting & Dining Package' : 'Pilihan Paket Meeting & Jamuan Makan'}
          </h3>

          <div className={styles.packageGrid}>
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`${styles.packageCard} ${packageId === pkg.id ? styles.packageCardActive : ''}`}
                onClick={() => setPackageId(pkg.id)}
              >
                <div className={styles.pkgName}>{pkg.name}</div>
                <div className={styles.pkgPrice}>
                  {formatRupiah(pkg.price)} <span className={styles.pkgUnit}>{isEn ? '/ pax' : '/ orang'}</span>
                </div>
                <p className={styles.pkgDesc}>{pkg.desc}</p>
                <ul className={styles.pkgInclusions}>
                  {pkg.inclusions.map((inc, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <CheckCircle2 size={13} color="#c5a55a" style={{ flexShrink: 0 }} />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Step 3: Technical & AV Checklist */}
        <div className={styles.stepBlock}>
          <h3 className={styles.stepTitle}>
            <span className={styles.stepNum}>3</span>
            {isEn ? 'Technical, Audiovisual & Secretarial Setup' : 'Perlengkapan Teknis, Audiovisual & Fasilitas Acara'}
          </h3>

          <div className={styles.techGrid}>
            {techOptions.map((t) => {
              const isChecked = selectedTech.includes(t.id)
              return (
                <div
                  key={t.id}
                  className={`${styles.techItem} ${isChecked ? styles.techItemActive : ''}`}
                  onClick={() => toggleTech(t.id)}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    readOnly
                    className={styles.techCheckbox}
                  />
                  <div>
                    <div className={styles.techLabel}>{t.name}</div>
                    <div className={styles.techPrice}>{t.priceLabel}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Step 4: Event Info & Summary Card */}
        <div className={styles.summaryCard}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--color-primary-dark)', marginBottom: '16px' }}>
            {isEn ? 'Estimated Proposal Summary' : 'Ringkasan Rencana Anggaran & Proposal'}
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-primary-dark)', marginBottom: '4px' }}>
                {isEn ? 'Organization / Company Name (Optional)' : 'Nama Instansi / Perusahaan (Opsional)'}
              </label>
              <input
                type="text"
                placeholder={isEn ? 'e.g. Ministry of Finance / PT ABC' : 'Contoh: PT Telkom Indonesia / Kementerian'}
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                style={{ width: '100%', height: '42px', padding: '0 12px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '0.88rem' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-primary-dark)', marginBottom: '4px' }}>
                {isEn ? 'Event Agenda / Working Title (Optional)' : 'Nama Agenda Acara (Opsional)'}
              </label>
              <input
                type="text"
                placeholder={isEn ? 'e.g. Annual Strategic Raker 2026' : 'Contoh: Rapat Kerja Nasional 2026'}
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                style={{ width: '100%', height: '42px', padding: '0 12px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '0.88rem' }}
              />
            </div>
          </div>

          <div className={styles.summaryRow}>
            <span>{isEn ? 'Venue & Seating:' : 'Ruangan & Format Duduk:'}</span>
            <strong>{recommendedVenue.name} ({layouts.find((l) => l.id === layout)?.name})</strong>
          </div>
          <div className={styles.summaryRow}>
            <span>{isEn ? 'Selected Package:' : 'Paket Meeting:'}</span>
            <span>{selectedPkg.name} ({formatRupiah(selectedPkg.price)} × {pax} Pax) = <strong>{formatRupiah(packageTotal)}</strong></span>
          </div>
          <div className={styles.summaryRow}>
            <span>{isEn ? 'Technical Add-ons:' : 'Tambahan Fasilitas Teknis:'}</span>
            <span><strong>{formatRupiah(techAddonsTotal)}</strong></span>
          </div>

          <div className={styles.summaryTotal}>
            <span>{isEn ? 'Estimated Total Budget:' : 'Perkiraan Total Investasi Acara:'}</span>
            <span style={{ color: 'var(--color-gold-dark)' }}>{formatRupiah(grandTotal)}</span>
          </div>

          <p style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '8px', fontStyle: 'italic' }}>
            {isEn
              ? '*Price estimation is an indicative simulation subject to official taxes, service charges, and seasonal promotions.'
              : '*Estimasi merupakan simulasi indikatif. Penawaran resmi, diskon korporasi, serta jadwal ketersediaan ruangan akan dikonfirmasi oleh tim Sales MICE.'}
          </p>

          <div className={styles.actionRow}>
            <button onClick={handleSendWa} className={styles.btnWaAction}>
              <MessageCircle size={20} />
              {isEn ? 'Send Rincian via WhatsApp MICE Specialist' : 'Kirim Simulasi ke WhatsApp Tim MICE Hotel'}
            </button>
            <button onClick={handlePrint} className={styles.btnPrintAction}>
              <Printer size={18} />
              {isEn ? 'Print / Save PDF' : 'Cetak / Simpan PDF'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
