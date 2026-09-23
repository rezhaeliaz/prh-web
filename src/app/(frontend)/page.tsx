import React from 'react'
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
