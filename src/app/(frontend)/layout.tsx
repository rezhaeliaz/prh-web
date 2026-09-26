import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import '../../styles/globals.css'
import { Header } from '@/components/Header/Header'
import { Footer } from '@/components/Footer/Footer'
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp/FloatingWhatsApp'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#1c2a1e',
}

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'https://padjadjaransuitesresort.com'),
  title: 'Padjadjaran Suites Resort & Convention Hotel Bogor | Official Website',
  description:
    'Website resmi Padjadjaran Suites Resort & Convention Hotel Bogor. Resor bintang 5 dan fasilitas konvensi megah di kawasan Bogor Nirwana Residence (BNR). Pesan langsung dengan jaminan harga terbaik.',
  keywords: [
    'Padjadjaran Suites Resort',
    'Hotel Bintang 5 Bogor',
    'Bale Pakuan Ballroom',
    'Resort Bogor Nirwana Residence',
    'Paket Wedding Bogor',
    'Meeting Room Bogor',
    'Restoran Hegarmanah Bogor',
  ],
  openGraph: {
    title: 'Padjadjaran Suites Resort & Convention Hotel Bogor',
    description:
      'Where Luxury Meets Serene Mountain Views. Booking kamar & ballroom langsung dengan harga terbaik.',
    url: 'https://padjadjaransuitesresort.com',
    siteName: 'Padjadjaran Suites Resort',
    locale: 'id_ID',
    type: 'website',
  },
}

import { cookies } from 'next/headers'
import type { Locale } from '@/lib/translations'
import { getSiteSettingsData, getHeaderConfigData, getFooterConfigData, getPopupData } from '@/lib/cmsData'
import { PromoPopup } from '@/components/PromoPopup/PromoPopup'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const locale = (cookieStore.get('NEXT_LOCALE')?.value as Locale) || 'id'

  const [settings, headerConfig, footerConfig, popupData] = await Promise.all([
    getSiteSettingsData(locale),
    getHeaderConfigData(locale),
    getFooterConfigData(locale),
    getPopupData(locale),
  ])

  const hotelSchema = {
    '@context': 'https://schema.org',
    '@type': ['Hotel', 'Resort'],
    name: settings.name,
    image: [
      settings.logoUrl || 'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/bilding-1.jpg.jpeg',
      'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/ballroom-1.jpg.jpeg',
      'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/royal.jpg.jpeg',
    ],
    description:
      'Resor bintang 5 dan gedung konvensi terkemuka di kawasan Bogor Nirwana Residence (BNR), Bogor, Jawa Barat. Menghadirkan Bale Pakuan Grand Ballroom 1.000 pax, kamar suite berpanorama gunung, dan santapan Sunda modern.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: settings.address,
      addressLocality: 'Bogor',
      addressRegion: 'Jawa Barat',
      postalCode: '16132',
      addressCountry: 'ID',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -6.621245,
      longitude: 106.792518,
    },
    url: 'https://padjadjaransuitesresort.com',
    telephone: settings.phone,
    priceRange: 'Rp 380.000 - Rp 1.450.000',
    starRating: {
      '@type': 'Rating',
      ratingValue: '5',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1280',
    },
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Bale Pakuan Grand Ballroom 1.000 Pax', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Kolam Renang Outdoor & Kids Pool', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Nirwana Spa & Massage Sanctuary', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Restoran Hegarmanah & Bancakan', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Wi-Fi Kecepatan Tinggi', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Pusat Kebugaran (Gym)', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Virtual Tour 360 Derajat', value: true },
    ],
  }

  return (
    <html lang={locale} className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelSchema) }}
        />
      </head>
      <body>
        <Header settings={settings} headerConfig={headerConfig} currentLocale={locale} />
        <main>{children}</main>
        <Footer settings={settings} footerConfig={footerConfig} currentLocale={locale} />
        <FloatingWhatsApp settings={settings} />
        <PromoPopup popup={popupData} />
      </body>
    </html>
  )
}
