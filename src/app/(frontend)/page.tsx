import React from 'react'
import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import type { Locale } from '@/lib/translations'
import { Hero } from '@/components/Hero/Hero'
import { BookingBar } from '@/components/BookingBar/BookingBar'
import { RoomsSection } from '@/components/RoomsSection/RoomsSection'
import { DiningSection } from '@/components/DiningSection/DiningSection'
import { EventsSection } from '@/components/EventsSection/EventsSection'
import { VirtualTourBanner } from '@/components/VirtualTourBanner/VirtualTourBanner'
import { ReviewsSection } from '@/components/ReviewsSection/ReviewsSection'

import {
  getRoomsData,
  getSiteSettingsData,
  getHomePageData,
  getGalleriesData,
} from '@/lib/cmsData'

export const metadata: Metadata = {
  title: 'Padjadjaran Suites Resort & Convention Hotel Bogor | Official Website',
  description:
    'Website resmi Padjadjaran Suites Resort & Convention Hotel Bogor. Resor bintang 5 dan fasilitas konvensi megah di kawasan Bogor Nirwana Residence (BNR). Pesan langsung dengan jaminan harga terbaik.',
  alternates: {
    canonical: 'https://padjadjaransuitesresort.com',
  },
  openGraph: {
    title: 'Padjadjaran Suites Resort & Convention Hotel Bogor',
    description:
      'Where Luxury Meets Serene Mountain Views. Booking kamar & ballroom langsung dengan jaminan harga terbaik.',
    url: 'https://padjadjaransuitesresort.com',
    siteName: 'Padjadjaran Suites Resort',
    images: [
      {
        url: '/api/media/file/gedung-utama-resor-padjadjaran-suites.jpg',
        width: 1200,
        height: 630,
        alt: 'Padjadjaran Suites Resort & Convention Hotel Bogor',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
}

export default async function HomePage() {
  const cookieStore = await cookies()
  const locale = (cookieStore.get('NEXT_LOCALE')?.value as Locale) || 'id'

  const [rooms, settings, homeData, tourScenes] = await Promise.all([
    getRoomsData(locale),
    getSiteSettingsData(locale),
    getHomePageData(locale),
    getGalleriesData(locale, true),
  ])

  return (
    <>
      <Hero locale={locale} data={homeData.hero} />
      <BookingBar rooms={rooms} settings={settings} locale={locale} />
      <RoomsSection
        locale={locale}
        sectionHeader={{
          subtitle: homeData.sections.roomsSubtitle,
          title: homeData.sections.roomsTitle,
          desc: homeData.sections.roomsDesc,
        }}
      />
      <DiningSection
        locale={locale}
        sectionHeader={{
          subtitle: homeData.sections.diningSubtitle,
          title: homeData.sections.diningTitle,
          desc: homeData.sections.diningDesc,
        }}
      />
      <EventsSection
        locale={locale}
        sectionHeader={{
          subtitle: homeData.sections.eventsSubtitle,
          title: homeData.sections.eventsTitle,
          desc: homeData.sections.eventsDesc,
        }}
      />
      <VirtualTourBanner
        locale={locale}
        scenes={tourScenes}
        bannerBgUrl={homeData.subpageBanners.virtualTourBannerUrl}
      />
      <ReviewsSection locale={locale} />
    </>
  )
}
