import React from 'react'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { getDestinationsCMSData } from '@/lib/cmsData'
import type { Locale } from '@/lib/translations'
import { DestinationClient } from './DestinationClient'

export const metadata: Metadata = {
  title: 'Panduan Destinasi & Wisata Sekitar Bogor | Padjadjaran Suites Resort',
  description:
    'Jelajahi The Jungle Waterpark BNR, Kebun Raya Bogor, wisata petualangan offroad Curug Nangka kaki Gunung Salak, dan koridor kuliner legendaris Surya Kencana dekat Padjadjaran Suites Resort.',
}

export default async function DestinationPage() {
  const cookieStore = await cookies()
  const locale = (cookieStore.get('NEXT_LOCALE')?.value as Locale) || 'id'

  const { destinations, itineraries } = await getDestinationsCMSData(locale)

  return (
    <DestinationClient
      destinations={destinations}
      itineraries={itineraries}
      locale={locale}
    />
  )
}
