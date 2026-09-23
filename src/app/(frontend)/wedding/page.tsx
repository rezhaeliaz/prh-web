import React from 'react'
import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import type { Locale } from '@/lib/translations'
import { getSiteSettingsData } from '@/lib/cmsData'
import { WeddingClient } from './WeddingClient'

export const metadata: Metadata = {
  title: 'Paket Pernikahan & Bale Pakuan Ballroom | Padjadjaran Suites Resort',
  description:
    'Wujudkan pernikahan impian berkapasitas hingga 1.000 tamu di Bale Pakuan Grand Ballroom Padjadjaran Suites Resort Bogor. Layanan katering bintang lima, bridal suite, dan panorama Gunung Salak.',
  openGraph: {
    title: 'Paket Pernikahan Megah Bale Pakuan | Padjadjaran Suites Resort',
    description:
      'Gedung konvensi mandiri tanpa pilar ceiling 7 meter untuk resepsi dan akad nikah terindah di Bogor Nirwana Residence (BNR).',
  },
}

export default async function WeddingPage() {
  const cookieStore = await cookies()
  const locale = (cookieStore.get('NEXT_LOCALE')?.value as Locale) || 'id'

  const settings = await getSiteSettingsData(locale)

  return <WeddingClient locale={locale} settings={settings} />
}
