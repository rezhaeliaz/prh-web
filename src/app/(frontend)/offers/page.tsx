import React from 'react'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { getOffersData, getSiteSettingsData } from '@/lib/cmsData'
import type { Locale } from '@/lib/translations'
import { OffersClient } from './OffersClient'

export const metadata: Metadata = {
  title: 'Paket & Penawaran Eksklusif | Padjadjaran Suites Resort Bogor',
  description:
    'Nikmati penawaran eksklusif terbaik: Honeymoon Package Royal Suite, promo Eat and Stay gratis voucher kamar, petualangan Family Offroad Jimny 4x4 ke Curug Putri, dan paket pernikahan Bale Pakuan Ballroom.',
}

export default async function OffersPage() {
  const cookieStore = await cookies()
  const locale = (cookieStore.get('NEXT_LOCALE')?.value as Locale) || 'id'

  const [offers, settings] = await Promise.all([
    getOffersData(locale),
    getSiteSettingsData(locale),
  ])

  return (
    <OffersClient
      initialOffers={offers}
      locale={locale}
      settings={settings}
    />
  )
}
