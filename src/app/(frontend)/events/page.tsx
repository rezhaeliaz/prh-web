import React from 'react'
import { Metadata } from 'next'
import { getEventsData, getSiteSettingsData, getHomePageData } from '@/lib/cmsData'
import { EventsClient } from './EventsClient'

export const metadata: Metadata = {
  title: 'Bale Pakuan Ballroom & Ruang Pertemuan MICE | Padjadjaran Suites Resort Bogor',
  description:
    'Gedung konvensi mandiri kapasitas hingga 1.000 tamu dan 20+ ruang meeting di Bogor Nirwana Residence. Paket pernikahan dan meeting lengkap bintang 5.',
}

import { cookies } from 'next/headers'
import type { Locale } from '@/lib/translations'

export default async function EventsPage() {
  const cookieStore = await cookies()
  const locale = (cookieStore.get('NEXT_LOCALE')?.value as Locale) || 'id'

  const [events, settings, homeData] = await Promise.all([
    getEventsData(locale),
    getSiteSettingsData(locale),
    getHomePageData(locale),
  ])

  return (
    <EventsClient
      events={events}
      settings={settings}
      locale={locale}
      bannerUrl={homeData?.subpageBanners?.eventsBannerUrl}
      sectionHeader={{
        subtitle: homeData?.sections?.eventsSubtitle,
        title: homeData?.sections?.eventsTitle,
        desc: homeData?.sections?.eventsDesc,
      }}
    />
  )
}
