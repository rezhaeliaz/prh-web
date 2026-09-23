'use client'

import React from 'react'
import Link from 'next/link'
import {
  Compass,
  Award,
  Sparkles,
  Users,
  Mountain,
  UtensilsCrossed,
  ShieldCheck,
  Building,
  ArrowRight,
  HeartHandshake,
} from 'lucide-react'
import type { Locale } from '@/lib/translations'
import styles from './About.module.css'

interface AboutClientProps {
  locale?: Locale
  settings?: {
    phone?: string
    whatsapp?: string
  }
}

export const AboutClient: React.FC<AboutClientProps> = ({ locale = 'id', settings }) => {
  const isEn = locale === 'en'

  const pillars = [
    {
      icon: <Mountain size={26} />,
      title: isEn ? 'Pristine Mountain Enclave' : 'Kawasan Asri Kaki Gunung Salak',
      desc: isEn
        ? 'Nestled in the prestigious Bogor Nirwana Residence (BNR), offering clean mountain air, sweeping vistas of Mount Salak, and serene tropical tranquility away from urban traffic.'
        : 'Berada di kawasan prestisius Bogor Nirwana Residence (BNR) dengan udara sejuk alami pegunungan, pemandangan Gunung Salak tanpa halangan, dan ketenangan terbebas dari kebisingan kota.',
    },
    {
      icon: <Building size={26} />,
      title: isEn ? 'MICE & Convention Excellence' : 'Fasilitas Konvensi Akbar MICE',
      desc: isEn
        ? 'Home to the standalone Bale Pakuan Grand Ballroom with 7m high pillarless ceilings for up to 1,000 delegates, complemented by 20+ modern executive meeting venues.'
        : 'Memiliki gedung konvensi mandiri Bale Pakuan Grand Ballroom dengan ceiling 7 meter tanpa pilar untuk 1.000 delegasi, didukung lebih dari 20 ruang pertemuan modern.',
    },
    {
      icon: <UtensilsCrossed size={26} />,
      title: isEn ? 'Authentic Culinary Heritage' : 'Warisan Kuliner Otentik Sunda',
      desc: isEn
        ? 'Savor time-honored West Javanese recipes and international dining at Hegarmanah & Bancakan restaurants, prepared with five-star finesse and master chef expertise.'
        : 'Menyajikan kekayaan kuliner Parahyangan dan masakan internasional di Restoran Hegarmanah & Bancakan dengan standar higienitas dan kepiawaian master chef bintang lima.',
    },
    {
      icon: <ShieldCheck size={26} />,
      title: isEn ? 'Five-Star Safety & Hospitality' : 'Keramahan Luhur & Sertifikasi CHSE',
      desc: isEn
        ? 'Fully certified in Cleanliness, Health, Safety, and Environmental Sustainability (CHSE), upholding genuine warmth, bespoke service, and round-the-clock concierge attention.'
        : 'Tersertifikasi penuh CHSE (Cleanliness, Health, Safety, Environment) dari Kemenparekraf, menjunjung tinggi ketulusan adat keramahan Sunda dan layanan concierge 24 jam.',
    },
  ]

  return (
    <div className={styles.aboutWrapper}>
      {/* Hero Section */}
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
            {isEn ? 'Our Heritage & Philosophy' : 'Kisah & Warisan Keramahan'}
          </span>
          <h1 className={styles.heroTitle}>
            {isEn
              ? 'The Serene Symphony of Sundanese Warmth & Mountain Splendor'
              : 'Harmoni Luhur Keramahan Sunda di Kaki Gunung Salak'}
          </h1>
          <p className={styles.heroDesc}>
            {isEn
              ? 'Padjadjaran Suites Resort & Convention Hotel Bogor combines five-star luxury with the timeless wisdom of West Java, creating unforgettable retreats for leisure travelers and world-class convention delegates.'
              : 'Padjadjaran Suites Resort & Convention Hotel Bogor memadukan kemewahan resor bintang lima dengan kehangatan luhur budaya Parahyangan Sunda, menghadirkan peristirahatan penuh kedamaian serta panggung konvensi berskala internasional.'}
          </p>
        </div>
      </section>

      {/* Story & Philosophy Section */}
      <section className="section-padding">
        <div className="site-container">
          <div className={styles.storyGrid}>
            <div className={styles.storyVisual}>
              <img
                src="https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/ballroom-1.jpg.jpeg"
                alt="Padjadjaran Suites Resort Architecture"
              />
              <div className={styles.storyVisualBadge}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-gold)', fontWeight: 600, fontSize: '0.85rem' }}>
                  <Award size={18} />
                  <span>{isEn ? 'Bogor Premier Convention Resort' : 'Resor Konvensi Unggulan Kota Bogor'}</span>
                </div>
                <div style={{ fontSize: '0.78rem', color: '#d1d5db', marginTop: '4px' }}>
                  Bogor Nirwana Residence (BNR), Jawa Barat, Indonesia
                </div>
              </div>
            </div>

            <div className={styles.storyContent}>
              <span className="section-subtitle">
                {isEn ? 'The Philosophy' : 'Filosofi Nama'}
              </span>
              <h2>
                {isEn
                  ? 'Inspired by the Great Kingdom of Pajajaran'
                  : 'Terinspirasi Keagungan Kerajaan Pajajaran'}
              </h2>
              <p>
                {isEn
                  ? 'The name "Padjadjaran" is rooted in the glorious historical kingdom of West Java, renowned for peace, prosperity, and honorable hospitality toward every traveler who set foot upon its lands. We carry forward this noble spirit by welcoming every guest not merely as a customer, but as an honored dignitary.'
                  : 'Nama "Padjadjaran" berakar pada keagungan sejarah Kerajaan Sunda Pajajaran yang termasyhur dengan kearifan, kedamaian, dan penghormatan tulus kepada setiap tamu yang melintas. Semangat keluhuran budi pekerti inilah yang kami hidupkan kembali—menyambut setiap insan bukan sekadar sebagai tamu hotel, melainkan sebagai keluarga kehormatan.'}
              </p>
              <p>
                {isEn
                  ? 'Set against the awe-inspiring silhouette of Mount Salak, the resort harmoniously bridges contemporary architectural grandeur with traditional Sundanese motifs. From our sprawling gardens to the crystal-lit chandeliers of Bale Pakuan Grand Ballroom, every space is designed to instill a sense of calm, renewal, and celebration.'
                  : 'Berlatar kemegahan siluet Gunung Salak, arsitektur resor kami memadukan rancang bangun modern dengan sentuhan estetika Parahyangan yang hangat. Dari taman tropis yang rimbun hingga gemerlap lampu kristal di Bale Pakuan Grand Ballroom, setiap sudut dirancang untuk menghadirkan ketenangan jiwa dan kelancaran setiap acara akbar.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Stats Bar */}
      <section className={styles.statsSection}>
        <div className="site-container">
          <div className={styles.statsGrid}>
            <div>
              <div className={styles.statValue}>148</div>
              <div className={styles.statLabel}>{isEn ? 'Luxury Rooms & Suites' : 'Kamar & Suites Mewah'}</div>
            </div>
            <div>
              <div className={styles.statValue}>1.000</div>
              <div className={styles.statLabel}>{isEn ? 'Grand Ballroom Capacity' : 'Kapasitas Tamu Ballroom'}</div>
            </div>
            <div>
              <div className={styles.statValue}>20+</div>
              <div className={styles.statLabel}>{isEn ? 'Modern Meeting Venues' : 'Ruang Konvensi & Rapat'}</div>
            </div>
            <div>
              <div className={styles.statValue}>2</div>
              <div className={styles.statLabel}>{isEn ? 'Authentic Restaurants' : 'Restoran Otentik'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Pillars of Excellence */}
      <section className="section-padding">
        <div className="site-container">
          <div className="section-header-center">
            <span className="section-subtitle">
              {isEn ? 'Our Pillars of Distinction' : 'Empat Pilar Keunggulan'}
            </span>
            <h2 className="section-title">
              {isEn ? 'Setting the Standard for Five-Star Hospitality' : 'Dedikasi Standar Tertinggi Keramahan'}
            </h2>
            <p className="section-desc">
              {isEn
                ? 'We are committed to delivering seamless experiences that blend natural serenity, business efficiency, and culinary indulgence.'
                : 'Komitmen kami tertuang dalam setiap detail layanan—memadukan ketenangan alam, efisiensi bisnis korporat, dan kenikmatan gastronomi.'}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '24px' }}>
            {pillars.map((pillar, idx) => (
              <div key={idx} className={styles.pillarCard}>
                <div className={styles.pillarIconWrapper}>{pillar.icon}</div>
                <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                <p className={styles.pillarDesc}>{pillar.desc}</p>
              </div>
            ))}
          </div>

          {/* GM Quote Card */}
          <div className={styles.gmSection}>
            <div style={{ color: 'var(--color-gold)', marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
              <HeartHandshake size={36} />
            </div>
            <p className={styles.quoteText}>
              {isEn
                ? '"At Padjadjaran Suites Resort, luxury is not merely measured in gold chandeliers and marble finishes, but in the genuine sincerity with which our team attends to your every need. We invite you to experience the true soul of Sundanese hospitality."'
                : '"Bagi kami di Padjadjaran Suites Resort, kemewahan sejati tidak hanya diukur dari megahnya lampu kristal dan lantai marmer, melainkan dari ketulusan hati kami melayani setiap kebutuhan Anda. Selamat datang di rumah keramahan sejati Sunda."'}
            </p>
            <div className={styles.gmAuthor}>
              {isEn ? 'General Manager & Hotel Management' : 'General Manager & Manajemen Hotel'}
            </div>
            <div className={styles.gmTitle}>Padjadjaran Suites Resort & Convention Hotel Bogor</div>

            <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Link href="/rooms" className="btn-luxury-primary" style={{ padding: '12px 28px' }}>
                {isEn ? 'Explore Rooms & Suites' : 'Pilihan Kamar & Suites'}
              </Link>
              <Link href="/events" className="btn-luxury-outline" style={{ padding: '12px 28px' }}>
                {isEn ? 'Plan an Event / MICE' : 'Rencanakan Acara / MICE'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
