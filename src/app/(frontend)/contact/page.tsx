import React from 'react'
import { Metadata } from 'next'
import { getSiteSettingsData } from '@/lib/cmsData'
import { ContactClient } from './ContactClient'

export const metadata: Metadata = {
  title: 'Kontak & Lokasi Resmi | Padjadjaran Suites Resort & Convention Hotel Bogor',
  description:
    'Alamat lengkap, peta petunjuk arah Google Maps, nomor telepon resepsionis, dan WhatsApp Concierge resmi Padjadjaran Suites Resort Bogor.',
}

import { cookies } from 'next/headers'
import type { Locale } from '@/lib/translations'

export default async function ContactPage() {
  const cookieStore = await cookies()
  const locale = (cookieStore.get('NEXT_LOCALE')?.value as Locale) || 'id'
  const settings = await getSiteSettingsData(locale)

  return <ContactClient settings={settings} locale={locale} />
}
