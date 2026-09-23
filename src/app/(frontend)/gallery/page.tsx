import React from 'react'
import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import type { Locale } from '@/lib/translations'
import { getGalleriesData } from '@/lib/cmsData'
import type { GalleryItem } from '@/data/hotelData'
import { GalleryClient } from './GalleryClient'

export const metadata: Metadata = {
  title: 'Galeri Foto HD & Suasana Hotel | Padjadjaran Suites Resort',
  description:
    'Lihat dokumentasi foto resolusi tinggi kamar & suites, Bale Pakuan Grand Ballroom, Restoran Hegarmanah, kolam renang, dan lanskap Gunung Salak.',
  openGraph: {
    title: 'Galeri Foto & Suasana Padjadjaran Suites Resort Bogor',
    description:
      'Dokumentasi visual kemewahan bintang lima dan panorama alam asri di Bogor Nirwana Residence.',
  },
}

export default async function GalleryPage() {
  const cookieStore = await cookies()
  const locale = (cookieStore.get('NEXT_LOCALE')?.value as Locale) || 'id'

  // Fetch gallery items from CMS with complete photo dataset
  const cmsPhotos = await getGalleriesData(locale, false)

  const fullPhotos: GalleryItem[] = [
    {
      id: 'ballroom-1',
      slug: 'ballroom',
      title: 'Bale Pakuan Grand Ballroom',
      category: 'events',
      imageUrl: 'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/ballroom-1.jpg.jpeg',
      caption: locale === 'en' ? 'Pillarless convention building up to 1,000 guests' : 'Gedung konvensi mandiri tanpa pilar kapasitas 1.000 pax',
      isVirtualTour: true,
      order: 1,
    },
    {
      id: 'royal-1',
      slug: 'royal-suite',
      title: 'Royal Suite Living & Bedroom',
      category: 'rooms',
      imageUrl: 'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/royal.jpg.jpeg',
      caption: locale === 'en' ? 'Pinnacle of luxury 54 m² suite' : 'Suite termewah seluas 54 m² dengan panorama gunung',
      isVirtualTour: true,
      order: 2,
    },
    {
      id: 'executive-1',
      slug: 'executive-room',
      title: 'Executive Room King Bed',
      category: 'rooms',
      imageUrl: 'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/executive-2.jpg.jpeg',
      caption: locale === 'en' ? '33 m² comfort with ergonomic workspace' : 'Kenyamanan 33 m² dengan area kerja ergonomis',
      isVirtualTour: true,
      order: 3,
    },
    {
      id: 'superior-1',
      slug: 'superior-room',
      title: 'Superior Room Twin Setup',
      category: 'rooms',
      imageUrl: 'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/superior.jpg.jpeg',
      caption: locale === 'en' ? 'Modern minimalist 22 m² comfort' : 'Kamar minimalis modern 22 m² yang tenang',
      isVirtualTour: true,
      order: 4,
    },
    {
      id: 'hegarmanah-1',
      slug: 'hegarmanah',
      title: 'Restoran Hegarmanah Terrace',
      category: 'dining',
      imageUrl: 'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/hegarmanah-1.jpg.jpeg',
      caption: locale === 'en' ? 'Semi-outdoor scenic mountain dining' : 'Area santap terbuka dengan hawa sejuk pegunungan',
      isVirtualTour: true,
      order: 5,
    },
    {
      id: 'bancakan-1',
      slug: 'bancakan',
      title: 'Restoran Bancakan Sunda',
      category: 'dining',
      imageUrl: 'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/bancakan-1.jpg.jpeg',
      caption: locale === 'en' ? 'Authentic communal Sundanese dining' : 'Tradisi makan bersama khas Sunda dengan kehangatan',
      isVirtualTour: false,
      order: 6,
    },
    {
      id: 'pool-1',
      slug: 'swimming-pool',
      title: 'Resort Swimming Pool',
      category: 'facilities',
      imageUrl: 'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/pool-1.jpg.jpeg',
      caption: locale === 'en' ? 'Surrounded by lush tropical resort greenery' : 'Dikelilingi taman tropis asri dan udara sejuk',
      isVirtualTour: false,
      order: 7,
    },
    {
      id: 'spa-1',
      slug: 'nirwana-spa',
      title: 'Nirwana Spa & Wellness',
      category: 'facilities',
      imageUrl: 'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/spa-1.jpg.jpeg',
      caption: locale === 'en' ? 'Holistic traditional Sundanese therapies' : 'Perawatan relaksasi dan pijat tradisional Sunda',
      isVirtualTour: false,
      order: 8,
    },
    {
      id: 'gym-1',
      slug: 'fitness-center',
      title: 'Modern Fitness Center',
      category: 'facilities',
      imageUrl: 'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/gym-1.jpg.jpeg',
      caption: locale === 'en' ? 'Cardio & strength equipment' : 'Peralatan kardio & latihan beban lengkap',
      isVirtualTour: false,
      order: 9,
    },
    {
      id: 'meeting-1',
      slug: 'rancage-meeting',
      title: 'Rancage Meeting Room Suite',
      category: 'events',
      imageUrl: 'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/meeting.jpg.jpeg',
      caption: locale === 'en' ? 'Modern breakout rooms for 20-150 pax' : 'Ruang rapat modern untuk 20-150 delegasi',
      isVirtualTour: false,
      order: 10,
    },
    {
      id: 'lobby-1',
      slug: 'lobby-lounge',
      title: 'Grand Lobby & Reception Lounge',
      category: 'resort',
      imageUrl: 'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/lobby-loung-1.jpg.jpeg',
      caption: locale === 'en' ? 'Warm welcoming five-star hospitality' : 'Kemegahan sambutan hangat bintang lima',
      isVirtualTour: true,
      order: 11,
    },
    {
      id: 'facade-1',
      slug: 'resort-facade',
      title: 'Resort Facade & Mountain Backdrop',
      category: 'resort',
      imageUrl: 'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/bilding-1.jpg.jpeg',
      caption: locale === 'en' ? 'Iconic landmark in Bogor Nirwana Residence' : 'Arsitektur megah berlatar pemandangan Gunung Salak',
      isVirtualTour: false,
      order: 12,
    },
  ]

  // Merge CMS photos if available with fallback set
  const photoMap = new Map<string, GalleryItem>()
  fullPhotos.forEach((p) => photoMap.set(p.slug, p))
  cmsPhotos.forEach((p) => {
    if (p.slug) photoMap.set(p.slug, p)
  })

  const mergedPhotos = Array.from(photoMap.values())

  return <GalleryClient initialPhotos={mergedPhotos} locale={locale} />
}
