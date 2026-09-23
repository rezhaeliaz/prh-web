import React from 'react'
import { Metadata } from 'next'
import { getRoomsData, getHomePageData } from '@/lib/cmsData'
import { RoomsListClient } from './RoomsListClient'

export const metadata: Metadata = {
  title: 'Kamar & Suites Eksklusif | Padjadjaran Suites Resort Bogor',
  description:
    'Pilihan kamar dan suite mewah dengan pemandangan Gunung Salak dan kolam renang di Padjadjaran Suites Resort & Convention Hotel Bogor. Dapatkan harga promo langsung.',
}

import { cookies } from 'next/headers'
import type { Locale } from '@/lib/translations'

export default async function RoomsPage() {
  const cookieStore = await cookies()
  const locale = (cookieStore.get('NEXT_LOCALE')?.value as Locale) || 'id'
  const [rooms, homeData] = await Promise.all([
    getRoomsData(locale),
    getHomePageData(locale),
  ])

  return (
    <RoomsListClient
      initialRooms={rooms}
      locale={locale}
      bannerUrl={homeData?.subpageBanners?.roomsBannerUrl}
      sectionHeader={{
        subtitle: homeData?.sections?.roomsSubtitle,
        title: homeData?.sections?.roomsTitle,
        desc: homeData?.sections?.roomsDesc,
      }}
    />
  )
}
