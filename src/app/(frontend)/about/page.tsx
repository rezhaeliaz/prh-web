import React from 'react'
import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import type { Locale } from '@/lib/translations'
import { getSiteSettingsData } from '@/lib/cmsData'
import { AboutClient } from './AboutClient'

export const metadata: Metadata = {
  title: 'Kisah Kami & Filosofi Hotel | Padjadjaran Suites Resort Bogor',
  description:
    'Mengenal warisan keramahan luhur Sunda Parahyangan, sejarah nama Padjadjaran Suites, pesona lokasi asri di Bogor Nirwana Residence (BNR), dan komitmen bintang lima.',
  openGraph: {
    title: 'Tentang Kami & Sejarah | Padjadjaran Suites Resort & Convention Hotel',
    description:
      'Harmoni kemewahan bintang lima dan kehangatan budaya Sunda di kaki Gunung Salak, Bogor, Jawa Barat.',
  },
}

export default async function AboutPage() {
  const cookieStore = await cookies()
  const locale = (cookieStore.get('NEXT_LOCALE')?.value as Locale) || 'id'

  const settings = await getSiteSettingsData(locale)

  return <AboutClient locale={locale} settings={settings} />
}
