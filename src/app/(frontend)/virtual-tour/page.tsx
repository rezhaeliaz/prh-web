import React from 'react'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { getGalleriesData, getHomePageData } from '@/lib/cmsData'
import type { Locale } from '@/lib/translations'
import { VirtualTourClient } from './VirtualTourClient'

export const metadata: Metadata = {
  title: 'Virtual Tour 360° Interaktif | Padjadjaran Suites Resort Bogor',
  description:
    'Jelajahi keindahan Bale Pakuan Grand Ballroom, kamar Royal Suite, Restoran Hegarmanah, dan lobi Padjadjaran Suites Resort Bogor melalui tur virtual 360 derajat interaktif.',
}

export default async function VirtualTourPage() {
  const cookieStore = await cookies()
  const locale = (cookieStore.get('NEXT_LOCALE')?.value as Locale) || 'id'

  const [scenes, homeData] = await Promise.all([
    getGalleriesData(locale, true),
    getHomePageData(locale),
  ])

  return (
    <VirtualTourClient
      scenes={scenes}
      bannerBg={homeData?.subpageBanners?.virtualTourBannerUrl}
      locale={locale}
    />
  )
}
