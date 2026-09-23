import React, { Suspense } from 'react'
import { Metadata } from 'next'
import { getRoomsData, getSiteSettingsData } from '@/lib/cmsData'
import { BookingWizardClient } from './BookingWizardClient'

export const metadata: Metadata = {
  title: 'Reservasi Kamar Online Resmi | Padjadjaran Suites Resort Bogor',
  description:
    'Pesan kamar langsung dengan jaminan harga terbaik, pilihan metode pembayaran Midtrans (QRIS, VA, CC), dan konfirmasi instan.',
}

import { cookies } from 'next/headers'
import type { Locale } from '@/lib/translations'

export default async function BookingPage() {
  const cookieStore = await cookies()
  const locale = (cookieStore.get('NEXT_LOCALE')?.value as Locale) || 'id'

  const [rooms, settings] = await Promise.all([
    getRoomsData(locale),
    getSiteSettingsData(locale),
  ])

  return (
    <Suspense
      fallback={
        <div style={{ padding: '160px 0', textAlign: 'center', minHeight: '60vh', color: 'var(--color-primary-dark)' }}>
          {locale === 'en' ? 'Loading official hotel booking system...' : 'Memuat sistem reservasi resmi hotel...'}
        </div>
      }
    >
      <BookingWizardClient initialRooms={rooms} settings={settings} locale={locale} />
    </Suspense>
  )
}
